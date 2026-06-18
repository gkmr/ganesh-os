# UI Kit — Docs site

A reading layout for the Ganesh OS documentation (`docs/*.html` in the repo). Three columns: route nav, prose, on-page TOC. Renders the real `docs/design-patterns.md` content faithfully.

## Run it
Open `index.html`. Links `styles.css`, loads `_ds_bundle.js`, mounts `DocsApp`.

## Surfaces
- `DocsApp.jsx` — left route nav grouped Start / System / Proof; a prose column using the brand heading system (mono eyebrow, gradient h1, numbered h2s, problem/pattern voice); a right on-page TOC; and a `CodeBlock` eval-gate callout.

## Components composed
Badge, CodeBlock (+ syntax spans).

## Responsive
Above 860px it's the three-column desktop reading view. At ≤860px the side rails collapse: the route nav becomes a horizontal pill scroller pinned to the top, the on-page TOC hides, and the prose goes full-width with tighter padding.

## Fidelity notes
The doc body is lifted from `docs/design-patterns.md` (all nine patterns, problem → pattern). The nav routes mirror the repo's `docs/` set; only the Design patterns page is wired with content here. Prose follows house style (sentence case, no em dashes).
