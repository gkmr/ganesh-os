# Format contract (shared by every agent)

One contract, one behavior. Every agent that surfaces or syncs obeys it.

## Message house style
- Lead with the originating agent's tag in brackets, e.g. `[gmail]`, `[intake-scan]`.
- Line 1 is a one-line summary with counts and "N need you."
- Action items first, each with a tappable handle; FYIs compressed; spam on one line at the end.
- No markdown links, no em dashes; bare URLs and numbers only.

## Handle namespaces
Each repliable item gets a short, stable, namespaced handle: `W#` chat A, `M#` chat B, `K#` chat C, `V#` voice, `E#` email, `D#` USPS mail-or-package (Informed Delivery), `I#` intake-or-opportunity, `P#` day-plan, `PR#` prune-confirmation. The handle goes in both the message and the manifest.

## The manifest
One JSON line per repliable item (see `manifest.schema.json`). The reply processor reads it to turn a reply into the right store action.

## Decision vocabulary (canvas cell or reply text)
`blank`/`keep` = no change · `done` = complete · `push <when>` = reschedule · `drop` = delete (confirmation-gated) · `list <name>` = move · `p1`/`p2`/`p3` = priority · `new: <title> | <list> | <due>` = create.

## Single-writer fences
Priority is owned by the triage agents; dates by the sweeps; lifecycle by the reply processor; intake creation by the scan; deletion by nobody (always confirmation-gated). No agent writes a field it does not own; the lane-fence eval enforces it.

## Verify
Read the id fresh from source immediately before a write; read-after-write verify by id; a not-found id is a hard error, never a silent skip.
