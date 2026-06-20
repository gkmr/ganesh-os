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
