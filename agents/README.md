# Example agents (sanitized)

Four of the 30+ agents, generalized to remove personal data, plus the shared manifest schema and the format contract every agent obeys. They illustrate the single-writer fence in practice: each agent's prompt names exactly the one field it is allowed to write. The live prompts and the personal system are not included.

- `pipeline-triage.md` - owns **priority** on the pipeline (writes nothing else).
- `morning-sweep.md` - owns **dates** (reconcile, dedupe, auto-park, budget); never touches priority.
- `reply-processor.md` - owns **lifecycle** (create / complete / reschedule) from explicit human decisions.
- `inbox-usps.md` - owns **nothing** in the shared store (a Layer-1 capture agent): OCRs the USPS Informed Delivery scans, leads with the fraud/identity and deadline watch-outs, and conservatively suppresses ad mailers.
- `manifest.schema.json` - the JSON contract for a surfaced, repliable item.
- `format-contract.md` - the house style, handle namespaces, and decision vocabulary shared by all agents.
