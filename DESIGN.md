# Design System: Alessandro Gonzaga Portfolio — "Operator Console"

The site presents a platform engineer's work the way he runs it: as a control plane.
Keyboard-first navigation, dense real information, every project shown as a service
with its stack and topology. Show, don't tell.

---

## Tokens (`tailwind.config.js`)

| Token | Value | Use |
| :--- | :--- | :--- |
| `ink` | `#0B0D0C` | page background (with a 32px hairline grid on `<body>`) |
| `panel` | `#0F1211` | panel fill |
| `raised` | `#141816` | hover / selected row |
| `line` / `line-strong` | `#1C211E` / `#2A322D` | 1px borders, dividers, SVG edges |
| `fg` / `mute` | `#D7DED9` / `#7C877F` | text / secondary text and labels |
| `signal` | `#3FD888` | the only accent: status, focus, active, links |
| `warn` | `#E0A84F` | amber — archived / warning states only |

- **Radius** is capped at 4px by overriding the scale (`rounded-3xl` → 4px); `rounded-full` is kept for status dots.
- **No** blur, glass, gradients-as-decoration, drop shadows on content, or background photography.

## Type

- **JetBrains Mono** — all UI chrome: nav, labels, headings, metadata, tables (`font-mono`, `font-heading`).
- **Inter** — prose only (bios, project write-ups, blog posts at ~68ch via `.prose-console`).
- Panel headers and column labels: 11px uppercase, `tracking-[0.14em]`, `text-mute`.

## Primitives (`src/index.css`)

`.panel`, `.panel-header`, `.label`, `.tag`, `.kbd`, `.btn`, `.btn-signal`, `.dot`,
`.page-title`, `.page-lede`, `.prose-console`. `GlassCard` / `GlassButton` keep their names
for compatibility but render flat panels/buttons.

## Shell

- **Top bar** (`Navbar.js`): `gnzaga.com` wordmark · breadcrumb (`~/projects/kaiwa`) · nav · palette trigger.
  One nav element for all breakpoints (wraps to a second row on mobile) so each `nav-*` agent target exists once.
- **Status bar** (`StatusBar.js`, fixed, 28px): current route, build commit + date, key hints.
  SHA/date are stamped at build time in `config-overrides.js` (`REACT_APP_GIT_SHA`, `REACT_APP_BUILD_DATE`);
  without git they read `dev`. Nothing is presented as live unless it is.
- **Command palette** (`CommandPalette.js`): `⌘K`/`Ctrl K` or `/`; fuzzy search (`utils/fuzzyMatch.js`) over
  pages, all projects, all posts and actions (open the ShipPilot agent via the `shippilot:open` event, download resume).
  `g h|p|b|a|e` chords jump to top-level pages. ARIA combobox + listbox, focus trap, focus restore.

## Data

`src/data/projects.js` is the single project registry (title, route, summary, stack, category, status,
agentTarget, components) plus `systemEdges` — each relationship cites the file that states it.
Consumed by the home system map, `/projects`, detail headers and the palette.

## Pages

- **Home**: `whoami` panel, SVG **system map** (hover/focus traces edges and shows their sources; stacked list <640px),
  `tail -n 5` activity log of posts, key map.
- **Projects**: sortable, filterable service-registry table (`?filter=` param preserved); rows become cards on mobile.
- **Project detail**: `ProjectHeader` (path, status, stack, components, depends-on/serves) + `ProjectSection` panels.
- **Experience**: `git log`-style timeline, mono date column. **Blog**: dense date/title/tags table.
  **BlogDetail**: Inter prose in a console frame with older/newer navigation.

## Motion

100–150ms colour/opacity transitions only; no slides, no scale-on-hover. Agent-mode highlights use stepped
outline pulses. `MotionConfig reducedMotion="user"` plus a global `prefers-reduced-motion` override.

## Agent (ShipPilot) contract

Every `data-agent-target` used by `src/utils/siteGraph.js` / `site-graph.json` exists exactly once per page:
`nav-*`, `project-*` (registry row) and `project-*-detail` (row link), `project-filters`, `blog-<slug>` and
`blog-<slug>-link`, `current-role`, `skills-section`, `experience-1..3`, `download-resume`.
