# The governance model

Autonomous agents are easy to start and hard to trust. The moment more than one agent writes to shared state on its own, you need answers to four questions a regulator, a security reviewer, or your own future self will ask: Can it corrupt itself? Can I see what it did? Will it recover when something breaks? Can it change without my approval? Ganesh OS answers all four with concrete mechanisms, not policy documents. Here is each, in depth.

## 1. Guardrails - single-writer fences

Every mutable field has exactly one owning agent. Priority belongs to the triage agents; dates to the sweeps; lifecycle to the reply processor; intake creation to the scan; deletion to nobody. An agent does not merely *avoid* writing a field it does not own; the design treats any such write as a violation that the lane-fence eval catches. This is the strongest form of safety because it does not depend on an agent behaving well - it makes the dangerous action detectable and blockable. It is the multi-agent analog of least-privilege: each actor can touch only what it is responsible for.

## 2. Audit trail - one append-only log

Every change to the shared state, from any agent or any human channel, appends one line to a single append-only change log, tagged with the source, the field, the item, and the reason. Nothing mutates state silently. If you want to know why an item moved, who moved it, and when, it is one grep. This is the difference between an agent system you can operate and one you can only hope about: when something looks wrong, you can reconstruct exactly what happened.

## 3. Trust gate - behavioral evals in CI

The invariants are not asserted in prose; they are checked by code that runs in CI on every change. The lane fence, a clean-sweep invariant, and a per-day budget are behavioral evals derived from real incidents. A proposed change that regresses any of them is blocked before it ships. This converts "the system is safe" from a claim into a green check, and it means safety is enforced continuously, not audited occasionally.

## 4. Self-healing - idempotent, degradable, self-clearing

Real environments are hostile: the host sleeps through a scheduled run, a connector goes down, work piles up faster than a human clears it. The system survives all three without intervention. A concurrency guard and run-ledger make a missed or doubled fire degrade to a harmless delta. A surface check lets an agent run on whatever connectors are present and queue the rest. An auto-park rule re-organizes overdue work by priority instead of letting a backlog metastasize. The system tends itself.

Resilience is deliberately two layers, because a failure has two shapes. A transient error *inside* a run that already started (a 500, a timeout, a rate-limit) is handled in-run: bounded retry with backoff, then degrade-and-queue rather than abort. A failure that stops the run from ever executing (a startup error, or the host asleep at the fire time) can only be healed from outside, so a shared resilience contract has every agent write a run marker on each run, and a separate catch-up controller reads those markers plus the scheduler's last-run times to find slots that were missed, then re-fires the still-useful ones by following each task's own idempotent steps. Every replay is freshness-gated: a high-value daily run is worth catching up hours later, a time-of-day nudge is not, so the controller buckets misses into catch-up-always, same-half-day-only, and never. The honest residual: a missed startup still drops a slot until the next wake or catch-up pass, so this shrinks missed work rather than eliminating it.

Self-healing is only trustworthy if a failure cannot pass unnoticed, so a central watchdog sits above the fleet. `sys-fleet-health` runs three times a day, reads every task's run marker, and classifies the fleet into four failure shapes: a missed slot, a degraded run, a mid-run crash (a run that stamped a start but never wrote a completion), and a connector outage. On a normal morning it sends one all-clear `N/N ran clean` heartbeat, so a quiet day produces positive proof-of-life rather than ambiguous silence; the later passes speak up only when something is actually missed or degraded. A second watchdog, `sys-overdue-watchdog`, checks that the morning sweep truly drove overdue to zero and alerts only on an unexpected survivor. The principle is that "it probably ran" is not a guarantee. A self-healing system has to be able to prove it healed, which means every run leaves a marker and one watchdog is responsible for reading them all.

That proof rests on a single delivery and notification contract every producer obeys, so monitoring is uniform rather than per-agent guesswork. A producer delivers its substantive output three ways - chat, a Markdown file, and a self-contained HTML file - and writes one completion row to a single fleet-wide log on success, skip, or degrade; that one log is the substrate the watchdog reads. Notification has two paths tied to reversibility-of-impact: a quiet success ping (the task's own tagged text) when the core promise was kept, and a loud failure iMessage the moment the primary output fails or a step still fails after the in-run retries. The test is whether the task can still keep its core promise this run: if yes it degrades quietly with a "partial surface" note, if no it pings loudly. Above all of it, the daily heartbeat is the floor, so even a task that is silent by design is still covered by central proof that the fleet ran.

## 5. Governed change - propose, never auto-deploy

The system improves itself, but it cannot ship its own changes. The weekly self-improvement pass reads the logs, runs the evals, and proposes at most one change per agent, each snapshot-first. A human approves; only then is it applied, and the affected evals are re-run. If one regresses, it rolls back from the snapshot. This is change management for an autonomous system: bounded, reversible, reviewed, and never silent.

## 6. Human-in-the-loop - gate only the irreversible

The cheapest way to lose trust in an agent is to make it ask permission for everything (it becomes useless) or for nothing (it becomes dangerous). The line here is reversibility. Anything reversible - re-dating, re-prioritizing, re-tiering - flows automatically. Anything irreversible - deleting, sending - is gated on an explicit human decision. The human is the exception handler, not the bottleneck, and the irreversible actions are exactly the ones a human should own.

## Why this is the interesting part

Any of these six on its own is ordinary. Together they are a working template for the open problem of the moment: giving software genuine autonomy while keeping it auditable, recoverable, and trusted. The proving ground here is one person's operating life, because that is a domain with real stakes, wide surface area, and a single accountable owner - exactly the conditions under which the governance has to hold.
