# Docs index

BLUF: every document in `docs/`, grouped by reading goal. The 5-minute path is in the [root README](../README.md#read-this-in-5-minutes); this page is the full shelf. Most docs also have an `.html` twin styled for the site; the `.md` is canonical.

## Start here

| Doc | One line |
|---|---|
| [`architecture-map.md`](architecture-map.md) | The current end state: one cloud store, two lanes, the delivery plane, the heartbeat pair, model tiering, the lane-fit law, orchestrator/worker/advisor |
| [`claude-code-map.md`](claude-code-map.md) | This system translated into Claude Code primitives: CLAUDE.md, skills, hooks, subagents, MCP |
| [`decisions.md`](decisions.md) | The ADR log - every major decision as context, options, verdict, consequences |

## Architecture and governance

| Doc | One line |
|---|---|
| [`../ARCHITECTURE.md`](../ARCHITECTURE.md) | Layers, fences, daily data flow, failure modes |
| [`governance.md`](governance.md) | The six governance properties, in depth |
| [`harness.md`](harness.md) | Harness engineering: scheduler, context, tools, contract, log, evals |
| [`design-patterns.md`](design-patterns.md) | The reusable patterns, each as problem and solution with tradeoffs |
| [`one-shortlist.md`](one-shortlist.md) | The single-writer law extended from fields to lists: one owning store, every other surface a rendering |
| [`unattended-deployment.md`](unattended-deployment.md) | Moving the fleet off a laptop: data locality first, runtime second |

## Decision records (the long-form ADRs)

| Doc | One line |
|---|---|
| [`adr-13-channel-strategy.md`](adr-13-channel-strategy.md) | Channel strategy: official APIs first, mirrored channels, outbox daemons, the pause and re-entry ladder |
| [`adr-14-one-store-triple-channel.md`](adr-14-one-store-triple-channel.md) | One store, three channels: connector registry, dual-engine cutover, HITL calendar lockstep |
| [`adr-17-store-cutover-two-lane.md`](adr-17-store-cutover-two-lane.md) | The store-of-record cutover, the two-lane end state, the GV-class reader, the injection pause |

Shorter ADRs (01 through 12, 15, 16) live inline in [`decisions.md`](decisions.md).

## The fleet

| Doc | One line |
|---|---|
| [`agent-catalog.md`](agent-catalog.md) | All 30+ agents in table form: cadence, owned field, exact output |
| [`agent-roster.md`](agent-roster.md) | The same fleet in plain language, one line per agent |
| [`system-map.md`](system-map.md) | The wiring: how the agents hand off across the day |

## Depth, craft, and proof

| Doc | One line |
|---|---|
| [`ai-depth.md`](ai-depth.md) | What makes it AI-native: the model/correctness split, multimodal channels, the memory moat |
| [`craft.md`](craft.md) | The PM/eng loop per agent: PRD, wireframe, prototype, tests, review, tradeoff log |
| [`case-studies.md`](case-studies.md) | Real incidents traced symptom to root cause to durable fix, each ending in an eval |
| [`learnings.md`](learnings.md) | Standing log of what running the system teaches |
| [`applied-learnings.md`](applied-learnings.md) | What the first-principles audit changed: prevention over detection |
| [`first-principles.md`](first-principles.md) | The context ladder, and this system scored against it |

## The operator and the record

| Doc | One line |
|---|---|
| [`story.md`](story.md) | The story, the jobs to be done, and the proof |
| [`operator.md`](operator.md) | Who runs this: the two roles, the functions led, the throughline |
| [`SECURITY-SCAN.md`](SECURITY-SCAN.md) | The PII and security review of this repository |

The dated evolution of the whole system is in the root [`CHANGELOG.md`](../CHANGELOG.md).
