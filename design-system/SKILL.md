---
name: ganesh-os-design
description: Use this skill to generate well-branded interfaces and assets for Ganesh OS, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map
- `README.md` - the full design guide: product context, content & visual foundations, iconography, manifest.
- `styles.css` - link this one file to inherit every token (`@import` manifest).
- `tokens/` - colors, typography, spacing/radius/shadow/motion as CSS custom properties.
- `guidelines/` - foundation specimen cards (type, color, spacing, brand).
- `components/` - React UI primitives (`core/`: Button, Badge, Card · `data/`: DomainLane, StatTile, CodeBlock, ChangeLogLine).
- `ui_kits/landing/` - interactive recreation of the Ganesh OS landing page.
- `assets/` - logo, glyph, hero/architecture imagery.

## The one-liner
Dark "mission-control at night" system: near-black navy surfaces, violet (`#8b7bff`) + electric cyan (`#22d3ee`) brand, four color-coded life domains (work amber · health teal · people orange · growth violet), Inter + JetBrains Mono, soft large radii, hairline borders, a signature violet glow, and an "engineering receipt" voice that proves trust in numbers and change-logs.
