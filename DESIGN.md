# Design System: Alessandro Gonzaga Portfolio

**Direction: Editorial.** The site reads like a well-edited engineering journal: case studies and writing are the product, decoration gets out of the way. Light "paper" first, with a dark variant that follows the OS.

---

## Color

Tokens live on `:root` in `src/index.css` as RGB channels and are exposed to Tailwind in `tailwind.config.js` (`bg-paper`, `text-ink`, `text-muted`, `border-rule`, `text-accent`, `bg-surface`; opacity modifiers work, e.g. `bg-accent/10`). Dark values swap in under `@media (prefers-color-scheme: dark)`.

| Token | Light | Dark | Use | Contrast on paper (L / D) |
| :--- | :--- | :--- | :--- | :--- |
| `paper` | `#FAF8F3` | `#171612` | page background | — |
| `surface` | `#F2EFE7` | `#21201B` | code, inset boxes | — |
| `ink` | `#1A1A17` | `#ECE8DF` | body text, headings | 16.4 / 14.8 |
| `muted` | `#55544F` | `#A6A298` | metadata, summaries | 7.2 / 7.1 |
| `rule` | `#DCD8CD` | `#36342D` | hairlines | — |
| `accent` | `#1F5F43` | `#8CC7A6` | links, list markers, active nav | 7.1 / 9.3 |

One accent only. No gradients, glass, glows or background photos.

## Type

Loaded from Google Fonts in `src/index.css`.

- **Display** — Newsreader (`font-display` / `font-heading`), weight 500, used for all `h1–h4`, the home thesis and list titles.
- **Reading** — Source Serif 4 (`font-serif`, the body default), 17px / 1.7.
- **Metadata** — IBM Plex Mono (`font-mono`) via `.meta` (dates, stacks, captions) and `.kicker` (uppercase section labels).
- Reading measure: `max-w-measure` (68ch).

## Components & utilities

- **Masthead** (`Navbar.js`) — name left, text links right (Work, Writing, About, Experience), hairline below; links wrap on mobile. Nav links carry the ShipPilot `nav-*` targets.
- **Footer** (`Footer.js`) — hairline colophon with plain links.
- **Figure** (`Figure.js`) — personal photos as captioned figures; data in `src/data/photos.js` (home: Santa Barbara, About: Door Peninsula).
- **Case study** — `CaseStudy.js` provides the shared header (kicker, title, dek, mono stack/links row) and footer (back link, related writing, GitHub); `ProjectSection.js` is a serif h2 over a hairline with a `.prose-editorial` column. All 13 pages in `src/pages/projects/` use these.
- **`.prose-editorial`** — long-form column: paragraph rhythm, hanging bullets with accent markers, mono code. Rules use `:where()` so utilities inside detail pages still win.
- **`.link`** — accent text with a hairline underline.
- `GlassCard` / `GlassButton` keep their names for existing consumers but are now a hairline box and a quiet square button.

## Data

`src/data/projects.js` is the single source for project metadata (title, dek, summary, stack, year of first write-up, links, `featured`, `agentTarget`). Read by the home page, `/projects` and every case-study header/footer. `?filter=<tech>` on `/projects` filters by `stack`.

## Layout

- Container `max-w-5xl`, 16px side gutter on mobile (`px-4`), 32px from `sm`.
- Lists are typographic: numbered rows separated by `border-rule` hairlines, mono metadata underneath.
- Home: thesis + figure, Selected work (4), Recent writing (5), contact line with résumé.
- Writing index grouped by year; Experience as a résumé timeline with a mono date column.

## Motion

A 200ms opacity fade on page mount (`PageTransition.js`), nothing else. No hover scaling. `MotionConfig reducedMotion="user"` plus a global reduced-motion CSS rule.

## Agent mode (ShipPilot)

`.shippilot-*` and `.agent-*` classes in `src/index.css` use the accent token: a tight ring and faint tint on highlighted links and rows, an inset accent border around the viewport while navigating. The chat widget (`ShipPilotWidget.js`) is a paper panel with surface/accent bubbles. Keep every `data-agent-target` in place when editing pages (see `src/utils/siteGraph.js`).
