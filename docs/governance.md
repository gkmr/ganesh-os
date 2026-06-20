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

## 5. Governed change - propose, never auto-deploy

The system improves itself, but it cannot ship its own changes. The weekly self-improvement pass reads the logs, runs the evals, and proposes at most one change per agent, each snapshot-first. A human approves; only then is it applied, and the affected evals are re-run. If one regresses, it rolls back from the snapshot. This is change management for an autonomous system: bounded, reversible, reviewed, and never silent.

## 6. Human-in-the-loop - gate only the irreversible

The cheapest way to lose trust in an agent is to make it ask permission for everything (it becomes useless) or for nothing (it becomes dangerous). The line here is reversibility. Anything reversible - re-dating, re-prioritizing, re-tiering - flows automatically. Anything irreversible - deleting, sending - is gated on an explicit human decision. The human is the exception handler, not the bottleneck, and the irreversible actions are exactly the ones a human should own.

## Why this is the interesting part

Any of these six on its own is ordinary. Together they are a working template for the open problem of the moment: giving software genuine autonomy while keeping it auditable, recoverable, and trusted. The proving ground here is one person's operating life, because that is a domain with real stakes, wide surface area, and a single accountable owner - exactly the conditions under which the governance has to hold.
