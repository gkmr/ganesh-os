# Design patterns

The reusable ideas behind Ganesh OS. Each is stated as a problem and the pattern that solves it, so they transfer to any multi-agent personal or operational system.

## 1. Single-writer fences

**Problem.** Many autonomous agents writing the same store will clobber each other: one normalizes a priority another just set, two both reschedule the same item, a cleanup deletes something mid-edit.

**Pattern.** Give every mutable field exactly one owner. Priority belongs to triage; dates to the sweeps; lifecycle to the reply processor; intake creation to an intake agent; deletion to nobody (it is always confirmation-gated). Every other agent treats those fields as read-only. A lane-fence check verifies it. This single rule is what makes unattended multi-agent writing safe.

## 2. Autonomous forward progress with human-in-the-loop

**Problem.** A system that waits for the human on every decision becomes a backlog generator; a system that decides everything itself becomes untrustworthy.

**Pattern.** The loop advances on its own and surfaces only exceptions. Overdue items auto-park forward by priority rather than waiting for a confirmation that may never come. Destructive actions (delete) stay gated. The human steers with cheap, reversible decisions (a one-word edit in a canvas or a text); the machine does the mechanical reconciliation. Progress is the default; the human is the exception handler.

## 3. The decision canvas (two-way sync)

**Problem.** The source of truth (a reminders store) is awkward to bulk-edit and reason over, but a separate planning doc drifts out of sync.

**Pattern.** Mirror the store into a file where each row carries a stable handle, the item id, and a blank decision cell. The human edits only the decision cell - from the file, from a text message, or in chat. A reply processor (every 30 minutes) reads the decisions, applies each to the store with read-after-write verification, stamps the row as applied so it never re-fires, and re-mirrors. The store stays canonical; the file is a controlled, idempotent edit channel.

## 4. The manifest and reply contract

**Problem.** A digest that just tells you about an unread message is a dead end; you still have to go act on it.

**Pattern.** Every surfaced item gets a short namespaced handle and a JSON line in a daily manifest (handle, source, summary, suggested list, suggested due, and the underlying id when one exists). The human replies by handle ("done 3", "push 2 to Thursday") or in natural language. A processor resolves the reply against the manifest and turns it into the right store action. The digest becomes an action surface, not a notification.

## 5. Today-budget and spread

**Problem.** A bulk re-tier dumps forty items onto one day; the "today" view becomes noise and the human stops trusting it.

**Pattern.** Cap the visible real-task load per day (lower on travel days, auto-detected from the calendar). Exclude recurring rituals from the count so the number reflects real work. When overflow or auto-park would stack a single day, fan it round-robin across the next open days under the cap. A per-day-budget check enforces it.

## 6. Cross-domain ranking

**Problem.** Ranking purely by urgency makes one loud domain (here, a high-volume opportunity flow) crowd out everything else, so health and relationships silently lose.

**Pattern.** Construct the daily top three with one slot per domain - one work, one health-or-life-admin, one relationship-or-dominant-anchor - filling from the next-highest only when a domain is empty, and saying so. The ranked day is structurally never single-domain.

## 7. Knowledge substrate that resists rot

**Problem.** A growing pile of notes and configs goes stale, contradicts itself, and no agent knows which file is authoritative.

**Pattern.** Four conventions borrowed from the "LLM wiki" and continual-learning literature, reduced to plain Markdown:
- A **read-first index** so an agent loads a small routing layer before opening any full file.
- A **shared format contract** that every agent obeys, so behavior is uniform.
- An **append-only change log** as the single record of what changed and why.
- **Temporal-validity stamps** ("as of <date>") on anything that can go stale, with a weekly lint that flags an old or contradicted claim. Snapshots are explicitly marked non-canonical and point to the live source.

## 8. Frozen and behavioral evals, evals-gated self-improvement

**Problem.** A self-modifying system can quietly regress; structural checks ("the file exists") miss the failures that actually happen.

**Pattern.** Keep a frozen set of binary checks plus behavioral ones derived from real incidents - overdue-zero after a sweep, no day over budget, every list covered. The weekly improvement pass runs them before proposing a change and re-runs the affected ones after an approved change; a change that regresses a check is rolled back from a snapshot, not shipped. Proposals are diagnostic only and capped at one per agent per week; nothing self-deploys.

## 9. Idempotent, degradable scheduled jobs, with two-layer resilience

**Problem.** Cron jobs on an intermittently awake host double-fire, miss, or run on the wrong surface. And a failure has two shapes that need different fixes: an error *inside* a run that started, versus a failure that stops the run from executing at all (a startup error, or the host asleep at the fire time). A job can retry the first; it can do nothing about the second, because its own code never ran.

**Pattern.** Every agent opens with a concurrency guard (a run ledger plus an off-schedule skip) and a surface check (detect present connectors; on a reduced surface, run partially, note the gap, and queue intents for the next full run). A missed or doubled fire degrades to a short delta, never a duplicate or a crash. That is layer one, in-run: bounded retry with backoff on a transient error, then degrade-and-queue rather than abort. Layer two is external, because the second failure shape can only be healed from outside the failed run. Every agent writes a run marker on each run via a shared resilience contract, and a separate catch-up controller reads those markers plus the scheduler's last-run times to find missed slots and re-fire the still-useful ones, each by following its own idempotent steps. The controller cannot double-act (the target's own concurrency guard turns a re-fire into a no-op) and every replay is freshness-gated: catch up a high-value daily run hours later, never replay a time-of-day nudge. The key insight is the substrate - a system can only catch up what it can prove it missed, so the run marker is what makes external healing possible.

## 10. The delivery and notification contract

**Problem.** Once a fleet of agents runs unattended, two failures hide in plain sight. A run can fail silently, with nobody the wiser until something downstream is wrong, and each agent left to invent its own output and alerting drifts into inconsistency, so monitoring becomes per-agent guesswork rather than one checkable rule.

**Pattern.** Make delivery and notification a single contract every producer obeys, so the fleet is observable by construction:
- **Three delivery surfaces.** A substantive artifact ships as chat, a Markdown file, and a self-contained HTML file - the same content in the channel you read on a phone, the channel you grep, and the channel you share. Pure one-line coaching prompts are SMS-only by nature and exempt.
- **One uniform run marker.** Every task, producer or prompt, writes a completion row to a single fleet-wide log on success, skip, or degrade. That one file is the substrate the monitor reads, which is why a per-domain log is never enough on its own.
- **A success ping and a loud failure ping.** Success is the task's own tagged text (or a terse one-liner where it has none). Failure of the primary output, or a step that still fails after the in-run retries, sends a loud failure message. The decision rule is reversibility-of-impact: if the task can still keep its core promise this run, degrade quietly with a "partial surface" note; if it cannot, ping loudly.
- **A central heartbeat as the floor.** Above the per-task pings, one watchdog reads all the markers and sends a daily all-clear `N/N ran clean`, so a clean day produces positive proof-of-life and even a silent-by-design task is covered.

The throughline with pattern 9: resilience keeps a run alive, and this contract makes the outcome of every run visible. A task adopts both by reference rather than restating them, so the contract is one source of truth, not thirty copies.

## Tradeoffs and alternatives considered

The roads not taken, because seniority shows in what you reject and why.

- **Single-writer fences over a transaction log or optimistic locking.** A real lock manager or MVCC would be the textbook answer, but the substrate is a consumer reminders store with no transactions and a hard token budget per run. Field ownership achieves the same safety property (no lost or clobbered writes) with zero infrastructure, and it is auditable by a one-rule eval. The cost is that ownership is a convention enforced by review and a check, not by the platform; acceptable for a single-operator system.
- **Markdown files over a real database (SQLite/Postgres).** A database would give queries and constraints. But every agent run is stateless and the human needs to read and hand-edit the state from a phone. Plain Markdown is the lowest-friction store both a model and a person can read and write, it diffs cleanly in the change log, and it needs no migration story. If grep ever stops scaling, a local SQLite index is the planned next step; it has not been needed.
- **30+ small agents over one orchestrator.** A single mega-agent would avoid coordination entirely. It was rejected for blast radius and observability: a bug in one small agent degrades one function, each agent has its own guard and eval, and the schedule itself is the orchestration. The cost is the coordination layer (the fences, the manifest, the change log) - which is exactly the part worth showing.
- **Auto-park over wait-for-confirmation.** The original design gated every date change on human confirmation, which was safer but produced a permanent backlog. The shift was to gate only irreversible actions (deletion) and let everything reversible flow. The cost is that an item can be auto-moved without the human's say-so; mitigated by tier-aware destinations, sacred-item exclusions, and a report of every auto-park.
- **Estimated outcome metrics over instrumented dashboards.** Building real telemetry was deliberately skipped as over-engineering for a single user; honest before/after estimates with a stated method are enough to be truthful and to survive an expert probe.
