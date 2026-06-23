# UI Kit — Operator dashboard

The Ganesh OS control room: the screen the operator glances at to see the whole life governed at once. A recreation that composes this design system's primitives, not a new design.

## Run it
Open `index.html`. Links `styles.css`, loads `_ds_bundle.js`, mounts from the section files.

## Surfaces
- `OpBar.jsx` — glassy sticky bar: brand, date/time, agent-health badge.
- `Panels.jsx` — `Metrics` (StatTile row), `DomainBalance` (four DomainLanes, one slot each), `ChangeLog` (the append-only ChangeLogLine spine with a blocked cross-lane write), `EvalGate` (CodeBlock CI trust gate), `FenceTable` (single-writer ownership Table).
- `DecisionQueue.jsx` — interactive: switch Apply-now / Prune tiers (SegmentedControl), apply decisions (Toast), confirm a gated prune (Dialog).

## Components composed
StatTile, DomainLane, ChangeLogLine, CodeBlock, Table, DecisionCanvas, SegmentedControl, Dialog, Toast, Badge, Button.

## Interactions
- "Apply decisions" stamps pending rows applied and fires a success toast.
- "Confirm prune" opens the gated dialog; confirming marks the prune rows applied with a warn toast.

## Fidelity notes
The operator view is implied by the product (the governance layer, the change-log, the eval gate, the decision canvas) rather than shown as a single screenshot in the repo. This kit assembles those documented surfaces into the dashboard they describe. Data is representative sample content.
