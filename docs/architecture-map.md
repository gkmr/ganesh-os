# Architecture map - the post-cutover end state

BLUF: one store, two lanes, one human. The store of record is a cloud task API reachable from everywhere; the hosted lane reads, analyzes, and asks; the local lane adapts channels, watches health, and relays one dataset the cloud cannot reach. A high-frequency heartbeat stamp plus a hosted sentinel makes either lane's death loud. No frontier models run on a schedule: cheap gates decide whether a mid-tier worker fires at all. This file is the map [ADR-17](adr-17-store-cutover-two-lane.md) promised; the decision record explains why, this explains what runs where.

## The map

```
                 ┌─────────────────────────────┐
                 │   STORE OF RECORD           │
                 │   (cloud task API)          │
                 │   single-writer fences      │
                 └──────────────┬──────────────┘
          API reads + writes    │    verb writes + native app
     ┌──────────────────────────┼──────────────────────────┐
     ▼                          ▼                          ▼
┌──────────────────┐   ┌──────────────────────┐   ┌──────────────────┐
│ HOSTED LANE      │   │ LOCAL LANE           │   │ THE OPERATOR     │
│ discovery diffs  │   │ channel adapter      │   │ native store app │
│ triage writes    │   │ reply verb-applier   │   │ replies from any │
│ inbox digests    │   │ monitor stack        │   │ channel, verbs   │
│ ask loop         │   │ one data relay       │   │ are the API      │
│ analysis         │   │                      │   └──────────────────┘
│ drive-folder     │   │ heartbeat stamper    │
│ state + drafts   │   │ (every cycle)        │
│ handoff          │   │                      │
└────────┬─────────┘   └──────────┬───────────┘
         │                        │
         │  heartbeat: the local applier stamps a marker each cycle;
         └─ the hosted sentinel reads the stamp hourly and alerts
            when the local lane goes dark.
```

## Store of record

The task corpus lives in a consumer task platform with a real cloud API ([ADR-17](adr-17-store-cutover-two-lane.md)). Both lanes read and write the same substrate, so lane placement is a capability and scheduling decision, not a data-access one. The single-writer fences are unchanged: priority belongs to the triage agents, dates to the sweeps, lifecycle to the reply processor, deletion to nobody without confirmation. Boards, digests, and files remain renderings of the store, never a second store.

## Hosted lane - stateless-ish readers and analysts

The hosted lane runs where the laptop lid does not matter: discovery diffs, the primary broad scan, triage writes through the store's API, the inbox digests, the meeting crosswalk, the weekly goal review, the ask loop (morning plan, evening wrap, an operator command lane), and the metrics analysis. Its tasks are stateless-ish by design: each run reads its prior state file from one hosted drive folder, does its work through connectors and web only, and writes a new same-named version carrying full history forward. Anything that needs an irreversible decision goes out as a decisions-draft handoff - a draft the operator confirms, never a send.

## Local lane - reduced to what the cloud cannot reach

The local lane shrank to three jobs plus one courier:

- **Channel adapter** - the consumer-messaging digests in, the mirrored deliveries out, with an outbox fallback when a bridge is down. One channel is read-only permanently (the GV-class reader of ADR-17).
- **Reply verb-applier** - the high-frequency loop that turns operator replies (stable handles + a small verb set) into fenced writes on the store.
- **Monitor stack** - the catch-up controller, the fleet-health watchdog, the bridge-health check, and the extension-patch check.
- **Data relay** - one scheduled copy of an on-device health export into the hosted drive folder, so the hosted analyst can read what only the device produces.

## Heartbeat

Liveness is asymmetric on purpose. The local applier already runs every cycle, so it doubles as the stamper: one run marker per pass, nearly free. The hosted sentinel reads that stamp hourly and alerts when the local lane goes dark - the watcher lives on infrastructure that does not share the watched machine's failure modes. The local watchdogs cover the reverse direction. Neither lane is trusted to report its own death.

## Model tiering

Two tiers, no exceptions on a schedule: cheap **gates** and mid-tier **workers**. A gate (the cheapest model) answers one question - is there anything to do - and exits; a worker (mid-tier) runs only when the answer was yes or the task always has real work. Frontier models are reserved for interactive sessions, never pinned to cron. The pins are explicit per task, and a controller audits the tiering rather than trusting it.

## Token diet

Four patterns keep the fleet cheap enough to run forever:

- **One-lane law** - every mission runs in exactly one lane; the other lane's copy is disabled, not duplicated. Two lanes doing the same read is drift, not redundancy.
- **Ping diet** - per-run success pings are dropped in favor of one daily heartbeat; only actionable sends, boards, failure pings, and files reach the mirror channel.
- **Fast-exit** - high-frequency tasks are gated no-ops: read the delta, find nothing, exit before loading anything heavy.
- **Cadence shoulders** - schedules run inside waking shoulders (early morning to late evening) instead of around the clock; nothing burns tokens while the operator sleeps.


## The lane-fit law (added after the blind-copy incident)

BLUF: a prompt copied across lanes carries its surface assumptions with it. A task is cloud-eligible only if every read, every write, and every delivery channel it names is reachable from the hosted lane (connectors, cloud file state, plain HTTP). Five tasks were found running as verbatim local prompts inside hosted schedules - each fired daily, reached none of its sources (local files, the on-device message channel, the local automation bridge), and degraded politely instead of failing loudly. One even reported its own emptiness for days without anyone noticing, because degrade-gracefully is the fleet's default posture.

The correction and the rule it produced:
- Hosted-lane tasks must be purpose-built for the hosted surface, never pasted from a local twin. The lane is part of the prompt contract.
- Degrade-gracefully needs a counterweight: a task that degrades on EVERY run is a placement bug, not resilience. The weekly self-review now treats "N consecutive fully-degraded runs" as a structural flag, not business as usual.
- The judgment tier (weekly reviews reading local state) moved back to the local lane, where its sources live. Discovery, triage, and the ask loop stay hosted. Ownership of a mission follows the lane that can actually see the data.


Follow-through, same night:
- **Probation dissolved by audit, not by calendar.** The wait-a-week gate existed to verify hosted twins; the audit showed several twins never existed. Verification replaced waiting: tasks with no real twin were promoted to keep-forever, tasks whose mission had ended were deleted the same night.
- **One tiering writer.** The general triage task retired into the job triage task, which now tiers every project - the single-writer fence applies to missions, not just fields.
- **Pointer stubs for superseded docs.** "Supersedes is not a migration": a retired doc keeps a one-paragraph stub at its old path pointing at the successor, so every stale citation resolves while the knowledge layer catches up to the fleet.
- **Honest partial coverage.** Large fan-in reads get a size cap plus a named "not read this run" list - silent truncation is a failure mode, a named partial is an output.
- **Telemetry floor.** Run duration is stamped as an integer even on no-op runs; a blank measurement breaks percentile and miss detection fleet-wide.


## The delivery plane (added after the egress audit)

BLUF: hosted sandboxes have connectors-only egress - no raw HTTP to arbitrary hosts. The push channel's API is therefore unreachable from the hosted lane no matter what credential a task holds; a token is a credential, not a network path. The fix is a store-and-forward delivery plane: hosted tasks write finished outputs (message text plus a templated report file) to an outbox folder in the cloud file store they CAN reach, and a tiny always-on relay with real internet polls that folder and posts to the push channel, acking each file with a delivered-marker (create-only stores make markers, not deletions, the idempotency primitive). The local lane keeps a grace-window fallback flush of the same folder, so a relay outage degrades to delayed delivery, never loss.

```
 hosted lane ──write──> cloud file store /outbox ──poll──> relay (always-on, $0) ──post──> push channel
     │                        ▲      │ .delivered markers        (send-only; the reply
     │                        │      └───────────────────────────  lane stays with the
 local lane ──fallback flush──┘                                     local applier)
```

Relay implementation lesson: the first host chosen (a container PaaS trial) had a runtime ceiling that an always-on poller exhausts immediately, and its launcher silently rewrote the service config with an auto-stop HTTP service - fatal for a listener-less background process. The durable answer was the platform-native scripting runtime of the file store itself (runs as the operator, native folder access, free scheduled triggers, no card, no server). Lesson named: for a poller whose only privileged surface is the file store, run the poller INSIDE the file store's own runtime.

## Orchestrator, workers, advisor (the three-tier loop, mapped)

The pattern circulating in multi-agent engineering writing - an orchestrator that plans and verifies, cheap parallel workers with one scoped brief each, and a consulted-but-never-executing advisor - maps directly onto this fleet and earns its keep here:

- **Orchestrator** = the interactive sessions and the command lane. Plans waves, dispatches, verifies every result before it counts. The store cutover and the delivery-plane build were both orchestrator work: many workers, one verifying brain.
- **Workers** = the scheduled fleet and its subagent fan-outs. One SKILL.md brief each, no shared context, no cross-talk - the single-writer fence is what makes stateless parallel workers safe against a shared store.
- **Advisor** = the independent-review pass and the weekly deep-model reviews. Consulted before big changes and before ship; proposes, never deploys. The injection-pause incident and the blind-copy audit were both advisor-shaped saves: an out-of-hot-path judge catching what the executing lane normalized.

Cost note that makes the pattern sustainable: frequency times capability is the whole budget. The advisor tier runs a handful of times weekly on the deep model; the worker spine runs dozens of times daily on the mid model; probes and prompts run hourly on the small model. A weekly deep-model review costs less than one day of an over-modeled 15-minute loop.

## End-state dependency map

After the cutover, the audit, and the delivery plane, the local machine is load-bearing for exactly three things: reading the on-device message channels (the OS binds them to signed-in hardware), local files (vault, device exports, extension patches), and fleet meta that watches the local scheduler itself. Everything else - store, discovery, triage, planning boards, health prompts, mail digests, delivery - runs hosted against remote APIs and connectors. The design goal was never "no local machine"; it was "the local machine is a peripheral, not a dependency."

See [`decisions.md`](decisions.md) for the running record and [`system-map.md`](system-map.md) for the agent-level view.

## The control plane and the audit loop (added 2026-07-15)

BLUF: once routine pushes went quiet, two pieces closed the observability gap - a single merged
control-plane view and a nightly output audit that drafts its own fixes.

- One control plane, not two. The fleet dashboard and the task runner converged into one persisted
  view: live roster from the scheduler API, per-task run/pause, and GROUP RUNS (preset bundles that
  dispatch in dependency order - e.g. reconciliation before the briefer). Lesson: two views over the
  same store drift apart; the merge deleted a whole class of "which dashboard is right" questions.
- Quiet is a contract, not an absence. When no-news tasks stopped pushing, silence became ambiguous
  (healthy? crashed?). The fix is the quiet-contract proof: a silent pass MUST advance its watermark;
  the watchdog treats silence-without-evidence as a failure class of its own.
- The audit drafts, a human applies. The nightly output audit lints the day's real artifacts on both
  lanes (format contract, channel parity, plumbing markers, state freshness) and attaches a verbatim
  find/replace patch to every defect. Applying is a separate, human-invoked step with read-back
  verification. Detection and remediation stay different hands - the same separation as
  propose-only boards and human-gated deletes.
- Publish where the dashboard can read. The watchdog writes a compact verdict file to the shared
  store each run; the control plane renders it. The dashboard never computes health itself - one
  writer, many readers, same fence as everywhere else.

## Delivery v7 and the content-ownership pass (added 2026-07-16)

BLUF: full parity broke twice in one day - first as duplicates, then as noise - and both fixes
were ownership rules, not more plumbing.

- Universal parity, one path per leg. Every push now lands on both channels with a rendered
  html card, no per-task exemptions. That surfaced the CLAIM-BEFORE-SEND rule (a deliverer
  creates the delivered-marker BEFORE sending, so three redundant transports can coexist
  without double-posting) and the ONE-PATH LAW (each leg travels the direct tool OR the
  store-and-forward outbox, never both - a fallback fired alongside its primary is a duplicate
  generator, not redundancy).
- Marker and stub hygiene. Bookkeeping markers and sub-1KB stub files are data, not content;
  every deliverer's pending-filter excludes them. Learned the loud way: a 2-byte marker and a
  230-byte stub both got posted to the push channel as documents.
- Content ownership: one describer per item. With every agent pushing on both channels, the
  morning became four agents re-describing the same items under different handles. The fix is
  an ownership map for content, the same shape as the write fences: the planning board owns the
  full list, triage digests are delta-only, inbox digests carry comms handles only, sweeps
  report actions taken plus a pointer. The same item is fully described at most once per
  half-day, by its owner; every other mention is a cross-reference handle.
- Label truth. A cloud digest stamped its own header with raw UTC labeled as local time - the
  same timezone-label disease that once shifted calendar events, now on the agent's own clock.
  New output eval: every printed timestamp must sit within minutes of the actual fire time,
  and slot names must match the clock ("midday" delivered at 8 AM is a mislabel).
- The audit loop closed for real. The nightly output audit's drafted patches were applied by a
  human-invoked pass that found the last live hour-gate hiding in a safety-net clause the
  doctrine pass had missed twice. Detection by eval, remediation by separate hands, verification
  by the next night's audit - the full loop, exercised on a production defect.
