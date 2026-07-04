# Architecture decision records (ADRs)

The roads taken and the roads rejected. Seniority shows in what you decline and why, so each record names the options considered, the verdict, and the consequences accepted. These map to the patterns in [`design-patterns.md`](design-patterns.md) and the structure in [`../ARCHITECTURE.md`](../ARCHITECTURE.md).

Format: **Context → Options → Decision → Consequences.**

---

## ADR-01 - Concurrency control for 30+ writers

**Status:** Accepted · core invariant.

**Context.** Many autonomous agents write the same store. Two agents touching the same field will clobber each other: one normalizes a priority another just set, two reschedule the same item, a cleanup deletes mid-edit. The substrate is a consumer reminders store with no transactions and a hard token budget per run.

**Options.**
- A real lock manager / MVCC / optimistic locking - the textbook answer.
- Optimistic retries with version stamps.
- **Single-writer field fences** - every mutable field has exactly one owning agent; everyone else treats it read-only.

**Decision.** Single-writer field fences, verified by a lane-fence eval that fails on the first cross-lane write.

**Consequences.** Same safety property (no lost or clobbered write) with zero infrastructure, auditable by a one-rule check. The cost: ownership is a convention enforced by review and CI, not by the platform. Acceptable for a single-operator system; the eval makes the convention load-bearing.

---

## ADR-02 - State store

**Status:** Accepted.

**Context.** Every agent run is stateless and reloads context from disk. The human must be able to read and hand-edit the state from a phone.

**Options.**
- SQLite / Postgres - real queries, constraints, indices.
- A SaaS task API as the source of truth.
- **Plain Markdown files** on disk.

**Decision.** Markdown files as the canonical store; the reminders store is mirrored into decision-canvas files.

**Consequences.** Lowest-friction store a model and a person can both read and write; diffs cleanly into the append-only change log; no migration story. The cost: no query engine and no DB-enforced constraints. If grep stops scaling, a local SQLite index is the planned next step - it has not been needed.

---

## ADR-03 - One orchestrator vs. many agents

**Status:** Accepted.

**Context.** Coordination between 30+ agents is the hard part. A single mega-agent would avoid it entirely.

**Options.**
- One orchestrator agent that does everything in-process.
- A central queue/broker with workers.
- **30+ small, single-purpose scheduled agents**, coordinated through shared files and the cron schedule.

**Decision.** Many small agents; the schedule itself is the orchestration.

**Consequences.** A bug degrades one function, not the whole system; each agent has its own concurrency guard and eval; observability is per-agent. The cost is the coordination layer - the fences, the manifest, the change log - which is exactly the part worth showing. This is Conway's law on purpose: the architecture is the org chart.

---

## ADR-04 - Forward progress vs. human confirmation

**Status:** Accepted · replaced the original design.

**Context.** The first design gated every date change on human confirmation. It was safe and produced a permanent, growing backlog - the system sat politely waiting while overdue piled up (see [case study 1](case-studies.md)).

**Options.**
- Confirm every mutation (original).
- Confirm nothing (untrustworthy).
- **Auto-advance the reversible, gate only the irreversible.**

**Decision.** Overdue items auto-park forward by tier; only deletion and sending stay human-gated. The human is the exception handler, not the bottleneck.

**Consequences.** The loop makes progress on its own and surfaces only exceptions. The cost: an item can be auto-moved without an explicit say-so; mitigated by tier-aware destinations, sacred-item exclusions, and a report of every auto-park.

---

## ADR-05 - Where the model judges and where code decides

**Status:** Accepted · the AI-native line.

**Context.** The hardest call in an agent system is where to put probabilistic judgment and where to put determinism.

**Options.**
- Rules engine with an LLM bolted on (AI-flavored).
- LLM end-to-end, including arithmetic and id handling (unsafe).
- **A drawn line:** LLM judgment where nuance lives, deterministic code where correctness lives.

**Decision.** Language models read forty messages and surface the three real ones, summarize a thread to one quote and the ask, and rank a day across competing domains. Deterministic code does calendar math, the per-day budget, id lookups, and the lane-fence. On-device / classical methods stay where latency and exactness matter.

**Consequences.** The system can be trusted to act on its own, because the parts that must be exact never depend on a sample. The line is defensible under expert review and visible in the code. The cost: two implementation styles to maintain and a boundary to police.

---

## ADR-06 - Delivery surface

**Status:** Accepted.

**Context.** The coach is only useful if it reaches the human where they already are, in whatever modality arrives.

**Options.**
- A dedicated app the user must open.
- A single channel (email, or SMS).
- **Channel-agnostic delivery** across iMessage, WhatsApp, email, voice, and calendar, over one shared memory.

**Decision.** Read across WhatsApp, iMessage, Slack, Gmail, voicemail, and six calendars; write a phone-readable event, a text, and files; resolve replies as free text, voice-to-text, or a decision typed in a file. WhatsApp is treated as a first-class rail for reach outside SMS-friendly regions.

**Consequences.** The channel is wherever the human is, not wherever an app is, and the surface can change without resetting context. The cost: per-connector adapters and a surface-degradation path when a connector is down (queue write-intents for the next full run).

---

## ADR-07 - Self-improvement safety

**Status:** Accepted.

**Context.** A self-modifying system can quietly regress, and structural checks ("the file exists") miss the failures that actually happen.

**Options.**
- Free-running auto-tuning.
- No self-improvement at all.
- **Eval-gated, snapshot-first, human-approved proposals**, capped at one change per agent per week.

**Decision.** A weekly pass runs error analysis, lints for rot, and runs frozen + behavioral evals before proposing; an approved change is snapshot-first and rolled back if any affected eval regresses. Nothing self-deploys.

**Consequences.** Autonomy with a brake - the continual-learning pattern reduced to something safe to run unattended. The cost: improvement is slow by construction (one change per agent per week) and needs a human in the approval loop.

---

## ADR-08 - Outcome measurement

**Status:** Accepted.

**Context.** The system runs for one user. Real telemetry would be a project of its own.

**Options.**
- Instrument everything with dashboards.
- Claim outcomes with no method.
- **Exact counts from the change log where they exist, plus honest before/after estimates with a stated method.**

**Decision.** Backlog and item counts are reported exactly (99→0, the 48-item day); time figures are stated as before/after estimates, not instrumented metrics.

**Consequences.** Truthful and defensible under an expert probe without building a telemetry stack one person doesn't need. The cost: time-savings figures are estimates, and labeled as such.

---

## ADR-09 - Determinism layer: prevention over detection

**Status:** Accepted · 2026-06-20.

**Context.** The single-writer fence, alarm-sync, and changelog-on-write were enforced at runtime by prose plus an after-the-fact final-check subagent. Detection let a 62-item alarm desync pass every verification read; it was caught only by a human glancing at the phone.

**Options.**
- Add more verification checks after the write - more tokens, still detection.
- Trust the prompt to remember the rule.
- **Lifecycle hooks that block the bad write before it lands, plus a runtime-agnostic verifier where hooks are unavailable.**

**Decision.** A determinism layer in `hooks/`: PreToolUse fences (alarm-sync, lane, char-sanitize), a PostToolUse changelog receipt, and `fence-verify.py`, all gated in CI by `evals/test_hooks.py`.

**Consequences.** The top invariants become impossible to violate at zero context cost, and the matching verification checks can be retired - verification shrinks as prevention grows. The cost: hooks only pre-block where the runtime executes them; elsewhere the verifier runs as a post-step. See [`../docs/applied-learnings.md`](applied-learnings.md).

---

## ADR-10 - Gather once, fan out from disk

**Status:** Accepted · 2026-06-20.

**Context.** The same raw sources (mail, chat, calendar, reminders) were read three to five times per cycle by the sweep, the briefing, and the per-channel digests.

**Options.**
- Let each agent fetch what it needs independently - simplest, and what existed.
- A shared cache service - infrastructure one operator does not need.
- **One gather wave writes dated snapshots; downstream agents consume them with a freshness fallback to a live read.**

**Decision.** The gather wave publishes per-source snapshots; read-only agents consume the snapshot; write-bearing agents keep fresh reads for the items they mutate.

**Consequences.** Morning connector fan-outs roughly halve (about 36 to 19) and the briefing's re-gather disappears, with graceful degradation when a snapshot is missing or stale. The cost: a snapshot can be up to one cycle old, acceptable for summaries but not for a mutated item. Pure subtraction.

---

## ADR-11 - Two-class failure and an external catch-up controller

**Status:** Accepted · 2026-06-22 · extended by [ADR-12](#adr-12---taxonomy-rename-the-delivery--notification-contract-and-fleet-health-hardening).

**Context.** "Retry on a 500" hid two different failures. A 500 (or timeout, or rate-limit) *inside* a run that started can be retried in-run. But a failure at startup, or the host asleep at the fire time, means the agent's own code never executed - nothing inside that task can save it. The existing concurrency guard and auto-park covered double-fires and backlog, but a whole-run miss on a quiet day was only healed by chance at the next scheduled slot.

**Options.**
- Tell each agent to "retry itself" - useless for a run that never started.
- An always-on supervisor process - infrastructure beyond a single host.
- **A two-layer contract: bounded in-run retry-then-degrade for the first class, plus a separate scheduled catch-up controller that heals the second class from outside.**

**Decision.** A shared resilience contract makes every agent write a run marker each run and retry-then-degrade on transient errors. A separate catch-up controller (a scheduled task, a few times a day) reads the markers and the scheduler's last-run times, finds missed slots, and re-fires the still-useful ones by following each task's own idempotent steps. Replays are freshness-gated into catch-up-always, same-half-day-only, and never; the controller stays silent unless it actually backfills.

**Consequences.** A missed run on a quiet day is recovered within hours instead of waiting a full cycle, with no per-task catch-up logic (the target's own idempotency does the work) and no risk of double-action. The honest residual: a missed startup still drops a slot until the next wake or catch-up pass, so this shrinks missed work rather than eliminating it; cutting misses at the source is a host power-setting, left as a note, not automated. The keystone dependency: external catch-up only works because every agent now leaves a run marker - the system can only recover what it can prove it missed. See [`../docs/applied-learnings.md`](applied-learnings.md).

---

## ADR-12 - Taxonomy rename, the delivery + notification contract, and fleet-health hardening

**Status:** Accepted · 2026-06-24 to 2026-06-29 · extends [ADR-11](#adr-11---two-class-failure-and-an-external-catch-up-controller).

**Context.** ADR-11 made a missed run *recoverable*, but three gaps remained once the fleet grew past 30 agents. (1) Task ids were ad-hoc and time-stamped (`morning-briefing-7am`, `reminders-triage-545am`), so a name said when a task ran, not which life domain it served, and the catch-up controller leaned on hard-coded id lists that a rename would silently break. (2) A run could still fail *silently*: ADR-11 could re-fire a miss, but nothing proved on a clean day that the fleet had actually run, and a mid-run crash that stamped a start but produced no output was invisible. (3) Each producer invented its own delivery and alerting, so monitoring was per-agent guesswork rather than one checkable rule.

**Options.**
- Leave ids as-is and keep extending the controller's id lists - brittle, and every rename risks dropping coverage.
- Add monitoring per agent (each task self-reports health) - inconsistent, and a dead task cannot report that it is dead.
- **Rename the whole fleet to project-prefixed ids, derive catch-up/health coverage from each task's description + cron instead of id lists, add a central fleet-health watchdog above the fleet, and make delivery + notification one shared contract every producer obeys.**

**Decision.** Three coupled changes, treated as one decision because they share a substrate (the run marker):
1. **Taxonomy.** Every task was renamed on 2026-06-24 to a project prefix - `job-`, `health-`, `ea-`, `inbox-`, `brief-`, `mtg-`, `review-`, `write-`, `sys-` - so an id declares its domain. Catch-up class and health tolerance are now derived from each task's description (a `cu:` token) and cron (multi-slot = self-healing), not a hard-coded id list, so a rename can never again drop coverage.
2. **Monitoring layer.** A `sys-` cohort sits above the producing fleet: `sys-fleet-health` (3x daily) reads every run marker and classifies missed / degraded / mid-run-crash / connector-outage, and sends one daily `N/N ran clean` heartbeat so a clean day has positive proof-of-life; `sys-catchup-controller` (the ADR-11 controller, renamed) re-fires fresh missed slots; `sys-overdue-watchdog` checks the sweep cleared overdue.
3. **Delivery + notification contract.** Every producer emits chat + md + html, writes one completion row to a single fleet-wide log (the substrate the watchdog reads), and pings on both paths: a quiet success ping (its own tagged SMS) plus a loud failure iMessage the moment its primary output fails or a step still fails after the in-run retries. Pure one-line coaching prompts are SMS-only and exempt from the file surfaces.

**Consequences.** A silent failure is now structurally hard: every run leaves a marker, one watchdog reads them all, and a clean day is confirmed rather than merely quiet. Delivery and alerting are uniform, so a new agent inherits both by reference instead of reinventing them, and the contract is one source of truth rather than thirty copies. The taxonomy makes the fleet self-documenting and rename-proof. The costs: the rename was a one-time migration with a window where stale id references had to be scrubbed, the loud-failure path adds one more place a bug could page the operator (mitigated by the reversibility-of-impact test: degrade quietly when the core promise still holds, ping loudly only when it does not), and the heartbeat is one more daily message to keep terse. Adopted incrementally 2026-06-24 through 2026-06-29. See [`design-patterns.md`](design-patterns.md) pattern 10 and the [agent catalog](agent-catalog.md) `sys-` layer.
