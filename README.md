![Ganesh OS](assets/hero.svg)

[![License: MIT](https://img.shields.io/badge/License-MIT-7c5cff.svg)](LICENSE)
![agents](https://img.shields.io/badge/agents-30%2B-7c5cff)
![governance](https://img.shields.io/badge/auditable-yes-22c55e)
![personal data](https://img.shields.io/badge/personal%20data-none-22c55e)
[![evals](https://github.com/gkmr/ganesh-os/actions/workflows/evals.yml/badge.svg)](https://github.com/gkmr/ganesh-os/actions/workflows/evals.yml)

<p align="center"><img src="assets/hero.gif" alt="Ganesh OS - 99 overdue to zero, four life domains rebalanced, one morning text" width="100%"></p>

**BLUF: Ganesh OS is a personal AI operating system - 30+ scheduled Claude agents that run one person's whole life across work, health, people, and growth, kept safe by a handful of enforced laws.** It is real software, running daily, and this repo is the sanitized design record: the architecture, the laws, the incidents, and the decision log, with all personal data removed. The reason it matters: everyone is shipping autonomous agents, and almost no one can govern them. This is a working answer - autonomy that stays auditable, recoverable, and trusted - pressure-tested on the hardest test bed there is, a real life.

**How it reaches the operator:** on the channels already in use - iMessage, SMS, WhatsApp, Telegram, and email. Replies in plain English steer it. No app, no dashboard.

> **Why it was built.** Work has a Slack, a sprint board, an on-call alert. Health, the people you love, and your own growth share a sticky note, so work always wins and the quiet things slip quietly. That is not a discipline problem, it is a coordination problem: many demands, one person, no system holding the line. So the fix was a system: 30+ agents running all of it as one governed fleet, and at 7:42 a.m. one text that names the single thing that matters in each domain.

**[▶ Watch one day in motion (60s)](demo.html)**, or open the full site at **https://gkmr.github.io/ganesh-os/** - a plain problem, outcome, and how walkthrough up top, then the build for technical readers.

---

## The moment

It is 7:42 on a Tuesday. Before a single app is opened, this text is already on the phone:

```
[brief] 🗓 Tue
MIT: ship the diligence memo before noon (it gates the IC vote).
Today: 1 work · ship memo. 2 health · 11am lift (only slot this week).
        3 people · call back the founder you went quiet on.
0 overdue. 11 real tasks. 6 things I handled while you slept.
```

Overnight, 30+ agents read five message channels, reconciled six calendars, re-ranked every open item, cleared the overdue pile to zero, and decided - out of everything - that the memo, the lift, and the founder are what today is actually for. Nobody planned that. The system did, and it can show its work for every line.

That is the product. The rest of this page is how it is built so you can trust it.

## Read this in 5 minutes

The guided path, in order. Each step is one artifact:

1. **The map** - [`docs/architecture-map.md`](docs/architecture-map.md). One store, two lanes, the delivery plane, the heartbeat pair, model tiering. The whole end state on one screen.
2. **The law, enforced** - [`evals/lane_fence.py`](evals/lane_fence.py). The single-writer fence as deterministic code that CI runs on every change. [`QUICKSTART.md`](QUICKSTART.md) runs it in a minute.
3. **One real agent** - [`agents/pipeline-triage.md`](agents/pipeline-triage.md). A constrained writer: it may set priority and nothing else. The shared rules every agent obeys are in [`agents/format-contract.md`](agents/format-contract.md).
4. **The judgment** - [`docs/decisions.md`](docs/decisions.md). Seventeen ADRs: context, options, verdict, consequences. Seniority shows in the roads declined, so each record names them.

If you live in Claude Code, start instead with [`docs/claude-code-map.md`](docs/claude-code-map.md) - it translates this system's vocabulary (harness, `SKILL.md`, change log, fence) into CLAUDE.md, skills, hooks, subagents, and MCP. For everything else, [`docs/README.md`](docs/README.md) indexes every document.

## The laws

Five rules do most of the governing. Each earned its place from a real failure, not a whiteboard:

1. **Single-writer field fences.** Every mutable field has exactly one owning agent; an agent cannot write a field it does not own. Enforced by a behavioral eval over the change log, in CI and as a hook. This is the one non-negotiable.
2. **One append-only, source-tagged change log.** Every autonomous write appends one line: which agent, which field, why. Auditability is one grep.
3. **Human-gated irreversibles.** Deletion and sending wait for a human; everything reversible flows. The human is the exception handler, not the bottleneck ([ADR-04](docs/decisions.md)).
4. **The lane-fit law.** A task is cloud-eligible only if every read, write, and delivery channel it names is reachable from the hosted lane. A prompt pasted across lanes carries its surface assumptions with it - found the hard way in the blind-copy audit ([architecture-map](docs/architecture-map.md#the-lane-fit-law-added-after-the-blind-copy-incident)).
5. **The one-lane law.** Every mission runs in exactly one lane; the other lane's copy is disabled, not duplicated. Two lanes doing the same read is drift, not redundancy.

The first law is not asserted, it is executed. The actual check CI runs over the change log:

```python
# evals/lane_fence.py - fails on the first cross-lane write.
OWNER = {
    "priority":    {"pipeline-triage", "todo-triage"},
    "due_date":    {"morning-sweep", "evening-sweep"},
    "lifecycle":   {"reply-processor"},   # create / complete / reschedule
    "create_item": {"intake-scan"},
    "delete":      set(),                 # nobody: deletion is human-gated
}

def check_lane_fence(changelog):
    for e in changelog:
        owners = OWNER[e.field]
        assert e.agent in owners, f"CROSS-LANE: {e.agent} wrote {e.field}"
    return "PASS"   # a regression blocks the change and rolls back from a snapshot
```

Full depth: **[the governance model](docs/governance.md)** · **[architecture](ARCHITECTURE.md)** · **[the design patterns](docs/design-patterns.md)**.

## The architecture, current state

The system converged this month to the shape mapped in [`docs/architecture-map.md`](docs/architecture-map.md):

- **One store of record** - the task corpus lives in a cloud task API both lanes can reach ([ADR-17](docs/adr-17-store-cutover-two-lane.md) records the migration: manifested, backref'd, two-engine coexistence, gated retirement). The knowledge layer stays plain Markdown plus the append-only change log.
- **Two lanes** - a hosted lane (discovery, triage writes, digests, the ask loop, analysis) that runs regardless of any laptop lid, and a local lane reduced to what the cloud cannot reach: channel adaptation, the reply verb-applier, the monitor stack, and one data relay.
- **A delivery plane** - hosted sandboxes have connectors-only egress, so a token is a credential, not a network path. Finished outputs go store-and-forward: an outbox folder in the cloud file store, a tiny always-on relay with real internet that polls and posts, delivered-markers as the idempotency primitive, and a local grace-window fallback so a relay outage means delay, never loss.
- **An asymmetric heartbeat** - the local applier stamps a marker every cycle; a hosted sentinel reads it hourly and alerts when the local lane goes dark. Neither lane is trusted to report its own death.
- **Model tiering** - cheap gates decide whether a mid-tier worker fires at all; frontier models are reserved for interactive sessions, never pinned to cron. A controller audits the tiering rather than trusting it.

The design goal was never "no local machine"; it was "the local machine is a peripheral, not a dependency."

## The delivery law

Delivery has its own law now, and it lives in the trusted layer. A rollout incident made the case:
a doctrine block distributed through synced skill files - claiming to "supersede" task constraints -
was refused by the fleet's own agents as suspected injection. They were wrong about the source (it
was the operator's own rule) and right about the shape: unsigned supersession in a tamperable file
IS what an attack looks like. So the law moved into every task prompt plus one canonical store file
that wins on drift, with pinned recipients as an anti-tamper tripwire (any other destination
appearing anywhere = refuse and flag) and a one-mutex delivery plane (claim-before-send, one path
per leg) that keeps three redundant transports from double-posting. The full ten rules and the
incident: [`docs/delivery-law.md`](docs/delivery-law.md).

## Orchestrator, workers, advisor

The three-tier pattern from multi-agent engineering practice maps directly onto this fleet:

- **Orchestrator** - the interactive sessions and the command lane: plans waves, dispatches, verifies every result before it counts. The store cutover and the delivery-plane build were both orchestrator work.
- **Workers** - the scheduled fleet and its subagent fan-outs: one `SKILL.md` brief each, no shared context, no cross-talk. The single-writer fence is what makes stateless parallel workers safe against a shared store.
- **Advisor** - the independent-review pass and the weekly deep-model reviews: consulted before big changes, proposes, never deploys.

The cost note that makes it sustainable: frequency times capability is the whole budget. A weekly deep-model review costs less than one day of an over-modeled 15-minute loop. Full mapping in [`docs/architecture-map.md`](docs/architecture-map.md#orchestrator-workers-advisor-the-three-tier-loop-mapped).

## Results

**Scale and steady state:**
- 30+ agents, dozens of runs a day, running daily for months on a $200/month Claude Max plan without hitting usage limits.
- 99 overdue items cleared in one pass, then held at zero by auto-park (exact counts from the change log; method in [ADR-08](docs/decisions.md)).
- Four domains protected: a slot reserved per domain before urgency votes, so no loud lane starves the quiet three.

**Incidents caught by design, not by luck:**
- **The injection pause.** An in-band message tried to redirect where personal-message digests were delivered. The agents refused to follow it and paused delivery until first-party confirmation - the safety architecture working as designed ([ADR-17](docs/adr-17-store-cutover-two-lane.md)).
- **The blind-copy audit.** Five tasks were found running as verbatim local prompts inside hosted schedules, reaching none of their sources and degrading politely instead of failing loudly. The save came from the advisor tier, an out-of-hot-path review catching what the executing lane had normalized. It produced the lane-fit law and a new structural flag: a task that degrades on every run is a placement bug, not resilience ([architecture-map](docs/architecture-map.md#the-lane-fit-law-added-after-the-blind-copy-incident)).

**Three judgment calls**, each traced symptom to root cause to fix in [docs/case-studies.md](docs/case-studies.md):
1. **Gate the irreversible, let the reversible flow.** A confirmation-gated loop never advanced, so work piled up. Fix: auto-recover everything reversible, human-gate only deletion.
2. **Prioritization without distribution is just a different pile.** A bulk re-tier overloaded one day. Fix: a per-day budget plus spread, and a slot per domain so none starves.
3. **A notification is only useful if the reply path is as cheap as the alert.** A surfacing layer that dead-ended became an action surface via a manifest and reply-by-text.

## What the AI actually does (and a rules engine can't)

The agents are AI-native on purpose. Language models do the judgment a rules engine can't: reading forty messages and surfacing the three that are real, summarizing a thread to one quote and the ask, deciding that "memo gates the IC vote" outranks "reply to a newsletter." Classical code does the parts that must be exact: calendar math, alarm-sync, the per-day budget, id handling. The split is the design - **LLM judgment where nuance lives, deterministic code where correctness lives** ([ADR-05](docs/decisions.md)) - and it is what turns a pile of channels into one ranked decision you can act on by replying to a text.

## Built with the full craft, not vibes

Every agent went through the loop an AI product and engineering org actually runs, and the repo is the receipt:

- **Define** - a one-page PRD per capability: the job to be done, non-goals, and the acceptance check (for the brief: "done when overdue is zero and the day is ranked one-per-domain").
- **Design** - the surface is wireframed as a phone-readable text *before* any logic; the output is the interface, so it is prototyped first.
- **Build** - a self-contained scheduled prompt that names the single field it may write; coordination happens through shared files, never shared state (see `agents/` and `agents/format-contract.md`).
- **Verify** - unit tests on the parsers, **behavioral evals** on the invariants in CI (`evals/`), a self-review against the format contract that stands in for **PR review**, and a **system-design note** that records each tradeoff and the rejected alternatives (`docs/design-patterns.md`, `ARCHITECTURE.md`).

This is the same discipline at the scale of one life that it is at the scale of a team: PRD, wireframe, prototype, unit tests, review, system-design pass, tradeoff log. The full walkthrough is in [`docs/craft.md`](docs/craft.md).

## The memory is the moat

Longitudinal context only helps if it is stored without rot and recalled without lying. The mental model is a diary the system never erases: when a fact changes, the old line stays and gets stamped "true until today," the new one goes underneath, so it always knows what was true and when. Nothing is overwritten; a stale value is superseded, not replaced, and every fact traces back to the message it came from. A read-first index sits on top so an agent loads a small routing map before any full file, and a weekly lint flags facts past their validity window. The ideas are borrowed and named honestly: bitemporal versioning from databases, the index-before-you-read layout from Karpathy's "LLM wiki," second-brain thinking for the shared cross-agent memory. The honest limit: it is time-stamped notes plus a profile, not an entity-and-relation knowledge graph. Storing memory is mostly solved; recalling the right thing at the right moment is the part still being hardened. Full walk-through in **[docs/ai-depth.md](docs/ai-depth.md)**.

## The stack, and what's actually running

A system doc that oversells is worthless, so here is the candid version.

**Running today:**
- **Models:** Claude, tiered - cheap gates that answer "is there anything to do," mid-tier workers that fire only when the answer is yes, deep models reserved for interactive and weekly-review work. Pins are explicit per task and audited by a controller.
- **Harness:** a scheduled-agent runtime across two lanes. Each agent is a `SKILL.md` prompt fired by cron, one run at a time, behind a concurrency guard so a missed or doubled fire is a no-op.
- **State:** the task corpus in a cloud task API behind the single-writer fences ([ADR-17](docs/adr-17-store-cutover-two-lane.md)); the knowledge layer in plain Markdown plus one append-only change log. Boards, digests, and files are renderings of the store, never a second store.
- **Memory:** file-based, with valid-from and superseded-by stamps so facts age out instead of being silently overwritten.
- **Connectors:** Apple Reminders, Calendar, and Notes, Gmail, Slack, WhatsApp, Telegram, iMessage, and meeting-transcript sources.
- **Delivery:** the store-and-forward delivery plane for the hosted lane, mirrored channel delivery for the local lane, an outbox fallback when a bridge is down.
- **Resilience and monitoring:** a shared contract every agent carries (bounded retry with backoff, degrade-and-queue, a per-run marker, freshness-gated replay), a catch-up controller that re-fires a missed run from its marker, a fleet-health watchdog that classifies missed / degraded / crashed / connector-out runs, and the cross-lane heartbeat pair. Hardened over real failure cycles rather than newly added.

**Honest residuals:**
- Zero-miss scheduling is shrunk, not solved: the hosted lane removed the laptop-lid class of misses, but a local startup failure can still drop a local-lane slot until the next wake or catch-up pass.
- The structural evals (the fence, fresh ids) have clean criteria and are trusted. The judgment evals (did the brief rank the right thing, is the coaching any good) still have soft criteria and a thin golden set. Hand-labeling continues; that part is not solved.
- Per-agent cost is not instrumented; a run-duration telemetry floor now exists (an integer stamp even on no-op runs), and per-role telemetry in the change log is the named next step.

## Out of scope (v1)

Naming what is out is half the design. This is one operator, batch (cron) cadence, correctness, and auditability. Deliberately excluded: multi-user or multi-tenant operation, auth, real-time collaboration, a query engine, real-time streaming triggers, and a telemetry stack one person does not need. Each exclusion is revisited only when a real bottleneck forces it (the ADRs record two such revisits already: the store in [ADR-16](docs/decisions.md) and again in [ADR-17](docs/adr-17-store-cutover-two-lane.md)).

## For engineers, start here

If you live in Claude Code, read [`docs/claude-code-map.md`](docs/claude-code-map.md) first. It maps this system's vocabulary (harness, `SKILL.md`, change log, fence) to the primitives you know (CLAUDE.md, skills, hooks, subagents, MCP). Then:
- `CLAUDE.md` - the always-on law and conventions.
- `skills/` - agents in skill form: `morning-brief` (owns nothing), `pipeline-triage` (a constrained writer), `catchup-controller` (the Layer-2 resilience healer), and `inbox-usps` (the unattended-lane pilot).
- `hooks/` - the determinism layer, the fence as a hook.
- `evals/lane_fence.py` - the law as deterministic code; [`QUICKSTART.md`](QUICKSTART.md) runs it in a minute.
- `schedules/` and `state/` - the unattended-lane scaffolding from [ADR-16](docs/decisions.md).

## Getting started

```bash
git clone https://github.com/gkmr/ganesh-os
cd ganesh-os

# 1. Watch the governance checks pass (this is the trust gate, runnable)
pip install pytest && pytest evals/ -q

# 2. Open the product - the animated day  (live: https://gkmr.github.io/ganesh-os/demo.html)
open demo.html            # or just double-click it; no build, no deps

# 3. Read how an agent is built, and the contract they share
#    agents/  (sanitized example prompts + the manifest schema)
```

This is a design repo, not an installable app: the live system runs against personal connectors, which are intentionally not included. To **adopt the pattern**, start with `agents/` and `evals/`, then apply the single-writer fence to your own agent stack - give every mutable field one owning agent and enforce it with a lane-fence check in CI. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

To run the showcase as a live site, enable **GitHub Pages** (Settings → Pages → `main` / root); `index.html` and `demo.html` then serve at `https://gkmr.github.io/ganesh-os/`.

## Who runs this - and what they lead

Built by **Ganesh Kumar**, an operator-investor. Two roles, one discipline:

- **VC partner (invest)** - backing AI-native companies: sourcing, technical and governance diligence, hands-on portfolio support.
- **Fractional CPO / CTO (build)** - leading the **AI/ML product**, **platform engineering**, **design**, and **go-to-market** functions for AI-native teams.

Scope, generalized so the repo stays clean: AI product leadership at **billions-scale** consumer platforms; GM of a consumer-hardware line past **$300M ARR**; CPO/CTO who scaled a **fraud-detection** company. Ganesh OS is that same job - AI product, platform, design, GTM, and the governance that makes autonomy safe - compressed to the scale of one life. Full detail in **[docs/operator.md](docs/operator.md)**.

Open to **board & advisory roles, fractional CPO/CTO engagements, panels & talks, and angel investing / diligence** on making autonomous AI auditable and safe. The reusable core is the single-writer fence (one agent owns each field, enforced in CI); fork it, and if you build something with it, an issue or a link is welcome.

**Contact:** [gkmr@umich.edu](mailto:gkmr@umich.edu) · [linkedin.com/in/reachgkumar](https://www.linkedin.com/in/reachgkumar)

## What's in here

| Path | What it is |
|---|---|
| [`index.html`](index.html) | The full site: a plain problem / outcome / how walkthrough, then the build (best via GitHub Pages) |
| [`demo.html`](demo.html) | The animated day - the product, in 60 seconds |
| [`CHANGELOG.md`](CHANGELOG.md) | Dated record of how the system evolved, newest first |
| [`docs/README.md`](docs/README.md) | The index of every document, grouped by reading goal |
| [`docs/architecture-map.md`](docs/architecture-map.md) | The current end state: one cloud store, two lanes, the delivery plane, the heartbeat pair, model tiering, the lane-fit law, orchestrator/worker/advisor |
| [`docs/claude-code-map.md`](docs/claude-code-map.md) | This system translated into Claude Code primitives |
| [`docs/decisions.md`](docs/decisions.md) | Architecture decision records - context, options, verdict, consequences |
| [`docs/adr-17-store-cutover-two-lane.md`](docs/adr-17-store-cutover-two-lane.md) | ADR-17: the store-of-record cutover, the two-lane end state, the GV-class reader, the injection pause |
| [`docs/adr-13-channel-strategy.md`](docs/adr-13-channel-strategy.md) | ADR-13: official-API-first channels, mirrored delivery, outbox daemons, the concurrent-edit protocol, the HITL board |
| [`docs/delivery-law.md`](docs/delivery-law.md) | The delivery law v7.1: law in the trusted layer, pinned recipients as anti-tamper, claim-before-send, the self-injection incident |
| [`docs/one-shortlist.md`](docs/one-shortlist.md) | The one-shortlist pattern - the single-writer law extended to lists |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Layers, fences, daily data flow, failure modes |
| [`docs/harness.md`](docs/harness.md) | Harness engineering: scheduler, context, tools, contract, log, evals |
| [`docs/governance.md`](docs/governance.md) | The six governance properties, in depth |
| [`docs/case-studies.md`](docs/case-studies.md) | Three governance decisions, end to end |
| [`docs/design-patterns.md`](docs/design-patterns.md) | The design patterns + tradeoffs and alternatives |
| [`docs/agent-catalog.md`](docs/agent-catalog.md) | All 30+ agents and the one field each owns |
| [`docs/ai-depth.md`](docs/ai-depth.md) | What makes it AI-native: the model/correctness split, the memory moat |
| [`docs/craft.md`](docs/craft.md) | The PM/eng craft: PRD, wireframe, prototype, tests, PR review, system-design tradeoffs |
| [`docs/operator.md`](docs/operator.md) | Who runs this: the two roles, the functions led, and the throughline |
| [`evals/`](evals/) | The real behavioral checks, run in CI |
| [`agents/`](agents/) | Sanitized example agent prompts + the manifest schema |
| [`design-system/`](design-system/) | The Ganesh OS design system: tokens, ~40 React components, guidelines, UI kits |

## No personal data

Architecture and patterns only, authored in a generalized voice and scanned for PII ([review](docs/SECURITY-SCAN.md)). The live personal system is not included.

## License

MIT (see [`LICENSE`](LICENSE)). The architecture and patterns here are free to use, fork, and build on, including commercially - the only condition is keeping the copyright notice. Two things sit outside that grant because they are not in this repo: the personal data (none is included) and the live system, which runs privately against the operator's own connectors. Patterns stay open; any commercial core stays private. Fork the fence, and if you ship something with it, an issue or a link is welcome.

> If the single-writer-fence idea is useful to you, a ⭐ helps others find it.
