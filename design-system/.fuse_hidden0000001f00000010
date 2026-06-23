# Design-system adherence audit

_Generated 2026-06-18. Subject: the Ganesh OS website (`index.html`, `demo.html`, `docs/*.html`) audited against `design-system/`._

## Verdict: the site is the design system's reference implementation.

The website is the source these tokens were extracted from, so visual conformance is effectively total. Confirmed 1:1 against `design-system/tokens/`:

- **Color** — identical palette, including the exact `--line: rgba(255,255,255,.085)`, the four domain colors (work amber, health teal, people orange, growth violet), brand violet `#8b7bff` + cyan `#22d3ee`, the status colors, and the decorative orb colors.
- **Type** — Inter + JetBrains Mono; 17px body at 1.62 line-height; -.022em display tracking; uppercase mono eyebrows at .1em.
- **Spacing, shape, depth** — 84px section rhythm, the radius scale, the exact stacked shadow strings, and the violet `--glow`.
- The homepage runs ~390 token lookups.

## Naming bridge (applied)

The site's tokens predate the DS naming and use short names (`--mut`, `--brand2`, `--surface2`, `--sh`, `--max`, `--pri`). A zero-risk alias layer now maps the DS canonical names onto them in every page's `:root` (`--muted` to `--mut`, `--brand-2` to `--brand2`, `--surface-2` to `--surface2`, `--shadow-sm` to `--sh`, `--max-width` to `--max`, `--field-priority` to `--pri`, and so on), so the site speaks the DS vocabulary with no visual change.

## Off-token colors

Every color used in a CSS context is now a token. `#2a3550` (solid hairline strokes) became `--stroke`; `#e6ebf3` (a dimmed heading white) became `--ink-dim`; and three near-duplicates were collapsed onto existing tokens (`#5b6b86` to `--faint`, `#0c1326` to `--surface-2`, `#1a2236` to `--raise`).

The only remaining off-palette literals live **inside inline SVG presentation attributes** (`fill=`, `stroke=`) in the architecture, energy, and memory diagrams: `#141a2c`, `#4a3b7a`, `#3a4668`, `#cdb6ff`. CSS custom properties cannot be referenced from SVG XML attributes, so these stay as scoped, diagram-local literals, all within the dark-navy and brand-violet family. This is a deliberate, documented boundary, not drift.

## Responsiveness

Desktop and mobile readability verified: viewport meta set, roughly 30 media-query rules collapsing every multi-column grid 4 to 2 to 1, the nav left-aligned and horizontally scrollable on small screens, fluid `clamp()` type, and `prefers-reduced-motion` respected.

## Recommendation

Build the next surface (a new page or an app) from `design-system/components/` (React primitives with types and prompts) rather than hand-rolled HTML, so modularity compounds. The current site is visually modular via consistent card classes but is not componentized.
