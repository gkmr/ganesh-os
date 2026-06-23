# What a first-principles audit changed

The system was audited against the context ladder on the previous page. It already had the lean CLAUDE.md, the single-writer law, an append-only change log, evals, and a gated self-improvement loop. The finding was not a missing level. It was a divergence between what the architecture documents and what the runtime enforces.

## The through-line: detection where you want prevention

The single-writer fence, the alarm-sync rule, and the changelog-on-every-write are laws. They were enforced at runtime by prose instructions plus a final-check subagent that re-reads state after the fact. That is detection, not prevention.

The proof is the alarm-sync incident. Apple Reminders keeps two date fields, and its smart lists filter on the alarm, not the due date. A sweep updated 62 due dates, every verification read passed, and the items still showed as overdue because the alarms were left untouched. The failure was invisible to the system and caught only by a human glancing at the phone. The fix shipped at the time was another prose rule ("also write the alarm"), still one forgotten field away from recurring.

A pre-write hook that rejects any due-date change without a matching alarm makes that whole class impossible, at zero context cost, and lets the matching verification check be deleted. That is the principle: convert the top invariants to prevention, then subtract the checks they retire.

## The determinism layer

Four lifecycle hooks plus a runtime-agnostic verifier now express the laws as code rather than instruction. See [`hooks/`](../hooks/README.md).

- alarm-sync - blocks a due-date write with no matching alarm (the 62-item class).
- lane-fence - blocks any agent writing a field it does not own, and any non-confirmed delete. This is the format contract, enforced.
- char-sanitize - blocks em dashes, literal newlines, and over-length titles before they reach a connector.
- changelog receipt - appends an independent log line on every write, so a diff against the agent's own log reveals a silent drop.
- fence-verify - the portable fallback: reads the live change log and fails on any violated invariant, for runtimes that do not execute hooks.

Verification should shrink as prevention grows. Each hook earns the deletion of a probabilistic check.

## Gather once, fan out from disk

The same raw sources were read three to five times every cycle by different agents: the sweep, the briefing, and the per-channel digests each re-fetched the same inboxes. Reading each source once into a dated snapshot and letting downstream agents consume the snapshot (with a freshness fallback to a live read) cut morning connector fan-outs from roughly 36 to 19 and removed the briefing's entire re-gather. It is the context-economy principle applied to raw inbound, and it is pure subtraction.

## Subtract as deliberately as you add

A self-improvement loop that only ever proposes "one change" grows the system forever. The audit added a standing subtract pass: each cycle must be able to retire or merge a task, a redundant verification check, or a dead code path, with the win condition being fewer moving parts at equal coverage. Complexity has a carrying cost, and an audit that only adds is half an audit.

## Holes worth naming

- Documented is not enforced. An invariant written down and eval-gated in the design repo can still run on prose in the live runtime. Keep a conformance table between the two.
- Verification scales badly. More after-the-fact checks cost tokens and only catch what they already know to look for. Prefer a fence that makes the bad state unreachable.
- Operator-absent mode. Human-gated items need a default action and a time-to-live, or queues grow silently when the operator goes heads-down.
- Cost has no ceiling. Many always-on agents fanning out subagents needs a budget tally and a circuit breaker.
- Inbound is untrusted. Agents that read arbitrary messages and then propose writes should treat message bodies as data, never instructions, with irreversible actions human-gated.

## Resilience: a 500 has two shapes

The self-healing layer was hardened in the same spirit as the determinism layer - prevent the class, do not just react to the instance.

- **A 500 has two shapes, and they need different fixes.** An error inside a run that started is the agent's to retry; a failure that stopped the run from ever executing (a startup error, the host asleep) is invisible from inside and can only be healed from outside. "Retry yourself" is the wrong instruction for the second shape. The fix has to be two layers: in-run retry-then-degrade, and an external catch-up controller.
- **Run markers are the catch-up substrate.** A system can only recover what it can prove it missed. Wiring a one-line run marker into the busiest agents first is what later made external catch-up possible - the resilience passes were not independent, the run-recording made the healer buildable.
- **Freshness-gate every catch-up.** Replaying a stale slot has negative value. A high-value daily run is worth re-firing hours late; a wake or bedtime nudge replayed late is worse than skipping it. Bucket misses by freshness instead of blindly replaying.
- **Wire shared behavior through a contract, not bespoke copies.** The retry, degrade, and run-marker rules live in one shared resilience contract that every agent references by a single pointer line, so the rollout is uniform and reversible, not thirty hand-edited variations.

## On the weekly improvement pass that produced these

- **Snapshot-first, then diff against the snapshot to prove each edit was surgical.** Diffing forty-plus edits against a pre-change snapshot is what catches accidental collateral (a file creeping over its line ceiling, a stray reference) before it ships.
- **Additive-only is how you change a frozen baseline safely.** New eval blocks are added; existing eval lines are never touched in the same pass, so a regression baseline stays honest and nothing can silently weaken.
- **Separate the gate from the run.** The frozen eval set is read-only during a reflection and edited only in a deliberate follow-on pass, so the thing that judges a change is never quietly edited by the same change.
- **A "supersedes" claim is not a migration.** Introduce a consolidating doc and you must finish the repoint and record the division in the index, or the old and new both linger and drift.
- **Reconcile against the schedule, not the displayed time.** Published cron jitter looks like drift but is not; scope staleness checks to facts that actually go stale, or a static table just generates noise.
