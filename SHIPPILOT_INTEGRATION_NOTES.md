# ShipPilot Integration — Divergence Report

What it actually took to integrate ShipPilot into this site, measured against the
advertised happy path. Written 2026-07-06 on branch `feature/shippilot-openrouter`.
Useful both as a record and as dogfooding feedback for the ShipPilot library itself.

## The baseline (what "just install it" looks like)

Per ShipPilot's intended flow, integration should be:

1. `npm install @shippilot/core @shippilot/react`
2. `npx shippilot init` → edit `shippilot.config.json`
3. `npx shippilot scan` → generates `site-graph.json`
4. Wrap the app in `<ShipPilotProvider>` + render `<ChatWidget />` (~25 lines)
5. Add `createChatMiddleware` to the Express server (~10 lines)
6. Set the API key env var, run the build

Expected consumer-side footprint: **~35–40 lines across 4 files, zero webpack
configuration, zero custom UI code.**

## Summary of divergences

| # | Divergence | Consumer code required | Severity |
|---|-----------|------------------------|----------|
| 1 | Dual-React runtime crash (symlinked `file:` deps) | 29 lines + 1 devDep + build-tool swap | Blocker |
| 2 | Stock widget can't match the site's design | 209 lines (full custom widget) | Major |
| 3 | Navigation highlight draws squares around pills/cards | 23 lines of `!important` CSS | Minor |
| 4 | `siteContext` must be hand-authored and hand-maintained | ~60 lines of content inventory | Ongoing cost |
| 5 | Committed site graph goes silently stale | re-run `scan` + review (+151/−19 lines churn) | Process |
| 6 | Config duplication between CLI config and server runtime | 2 places to keep in sync | Papercut |

Total consumer-side divergence: **~320 lines of code that the happy path says
shouldn't exist**, plus one build-tool substitution (`react-scripts` →
`react-app-rewired`), plus 2 remediation commits in the library itself.
Roughly **8× the expected integration footprint**.

---

## 1. Dual-React runtime crash — the blocker (commit `203ae90`)

**Expected:** install the packages, build, done.

**What happened:** the app compiled cleanly but crashed at runtime on mount with
`Cannot read properties of null (reading 'useState')` inside `ShipPilotProvider`.

**Root cause chain:**
- The packages are consumed as local `file:../../ShipPilot/packages/*` deps; npm
  installs those as **symlinks**.
- CRA's webpack resolves symlinks to their real path (`resolve.symlinks: true`,
  not configurable through CRA), so module resolution for `import 'react'` inside
  the library walks up from `/Users/alex/ShipPilot/packages/react/dist/` — and
  finds the React copy pnpm installed there for the library's own tests.
- Result: two React 18.3.1 instances in one bundle → null hooks dispatcher.
- The library had already done everything right (peerDeps + tsup
  `--external react react-dom` — commits `e054926`, `0e1f2d9` in the ShipPilot
  repo, **2 remediation commits made specifically for this integration**).
  Library-side externalization cannot fix consumer-side symlink resolution.

**Divergence work:**
- Swap `react-scripts` → `react-app-rewired` in `start`/`build` scripts (+1 devDep)
- `config-overrides.js` (21 lines): alias `react`, `react-dom`, `react/jsx-runtime`
  to the app's `node_modules` and remove CRA's `ModuleScopePlugin`
- An earlier abandoned attempt (preserved in `stash@{0}`) also tried npm
  `overrides` — insufficient alone; this problem stalled the original
  integration branch for ~3 months

**Cost:** 29 lines + build-tool swap + the historical stall. The insidious part:
`npm run build` **succeeds** — only runtime exposes it.

## 2. Stock ChatWidget vs. site design (commit `b2ad8da`)

**Expected:** theme the widget via config (`theme`, `accentColor`, `position`).

**What happened:** the stock widget is hardcoded inline styles — flat `#1a1a1a`
panel, its own border radii, no blur, no motion. The config surface (an accent
color CSS variable) cannot express this site's design system (glassmorphism:
`bg-black/70 backdrop-blur-xl border-white/10 rounded-3xl`, green palette,
FontAwesome icons, markdown rendering, expand/collapse). The `theme: 'light'`
option doesn't even branch any styles in the current implementation.

**Divergence work:** `src/components/ShipPilotWidget.js` (201 lines) — a fully
custom widget. Presentation was lifted from the site's original ChatBot;
`useShipPilotChat` supplies 100% of the logic (streaming, history, nav
confirmation, agent mode). Plus 8 lines changed in `ShipPilotRoot.js` to swap
the widgets.

**Cost:** 209 lines. Mitigating credit: the headless hook made this clean —
zero logic was reimplemented. The library's real theming story is "bring your
own widget," and that should be the documented path.

## 3. Square highlight rings on pill buttons (commit `caedaed`)

**Expected:** agent navigation highlights match the elements they point at.

**What happened:** the library injects
`.shippilot-nav-highlight { box-shadow: 0 0 0 3px <accent>; }` at runtime. On
`/projects` the nav target is the square `<Link>` wrapper around a pill-shaped
(`rounded-full`) button — producing a green rectangle around a pill. Same issue
for `.shippilot-highlight` (hardcoded 8px radius) on `rounded-3xl` cards.

**Divergence work:** 23 lines in `src/index.css` overriding the injected classes
with shape-aware radii and the site's existing agent-glow animations. The
overrides need `!important` because the library appends its stylesheet to
`<head>` at mount, after the app's CSS.

**Cost:** 23 lines. Library takeaway: the injected ring should inherit the
target's border-radius (or the classes should be documented as override points
with lower specificity).

## 4. Hand-authored siteContext (part of commit `5a582cc`)

**Expected:** `shippilot scan` gives the model what it needs to talk about the site.

**What happened:** `scan` produces the **route graph** only. Everything the
assistant knows about the content — who Alex is, what the 13 projects are, all
18 blog posts with summaries — is a ~50-line template literal (`SITE_CONTEXT`)
hand-written in `server.js`, compiled by reading `src/pages/Projects.js` and all
of `src/data/blogPosts/*.js`. The previous attempt (in the stash) had already
drifted: it was missing 6 posts that existed on master.

**Cost:** ~60 lines now, plus a permanent maintenance rule: **every new project
or blog post requires a matching `SITE_CONTEXT` edit**, with no tooling to catch
drift. This is the most likely thing to rot. (ShipPilot's RAG mode +
`contentSources` might replace this; unevaluated — it's disabled in our config.)

## 5. Stale committed site graph (part of commit `5a582cc`)

**Expected:** the graph tracks the app.

**What happened:** `site-graph.json` is a generated artifact committed to the
repo. The one from the original integration (April 2026, 18 pages) silently
missed 4 routes added since (`/projects/k8s-automation`, `/projects/agent-mesh`,
`/projects/matrix-server`, `/projects/agent-orchestration`). Nothing fails when
it's stale — the assistant just can't navigate to newer pages.

**Divergence work:** re-run `npx shippilot scan` (now 21 pages), review the
+151/−19 diff. Same maintenance rule as #4: new route → re-scan. A CI check
comparing a fresh scan against the committed graph would close this hole.

## 6. Config duplication (papercut)

`shippilot.config.json` holds a `model` block (`endpoint`, `modelName`,
`apiKeyEnv`) that only the CLI reads; the Express middleware takes its own
`model` object (with the **raw key**, not an env name) in `server.js`. Both had
to be updated for the OpenRouter switch and can drift apart. Also noted: the
middleware swallows upstream error bodies into a generic 502, so a bad key is
indistinguishable from a bad endpoint without curling the provider directly.

---

## What was NOT divergence (for fairness)

- `ShipPilotProvider` wiring + router adapter: ~29 lines, exactly as designed
- `createChatMiddleware` server block: worked first try against OpenRouter's
  OpenAI-compatible endpoint, streaming included
- `shippilot scan` route detection: found all 21 react-router routes in a
  CRA/lazy-loaded `App.js` without configuration beyond `entryPoint`
- `useShipPilotChat`: carried the entire custom widget with no logic changes

## Ledger

| Commit | What | Lines (± non-lockfile) |
|--------|------|------------------------|
| `203ae90` | react-app-rewired + alias workaround | +29/−4 |
| `5a582cc` | OpenRouter backend, siteContext, graph regen | +205/−19 |
| `b2ad8da` | Custom site-styled widget | +205/−4 |
| `caedaed` | Highlight shape CSS overrides | +23/−0 |
| ShipPilot `e054926`, `0e1f2d9` | Library-side React externalization | 2 commits upstream |

Happy-path expectation: ~40 lines. Actual: **~460 lines added on the consumer
side, of which ~320 are pure divergence**, plus a build-tool swap and two
upstream library fixes — and two standing maintenance obligations (#4, #5)
that the tooling doesn't yet enforce.
