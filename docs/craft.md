# The craft

The same system can be read as a product-and-engineering discipline, not just a result. Each agent went through the loop below, and the artifacts are real and sanitized here. This is what "built with the full craft" means: a written spec, a designed surface, a prototype, tests, a review against a contract, and a system-design pass that records the tradeoff.

## 1. PRD (one page, per capability)

Every capability starts as a one-pager, not code. Example, the morning brief:

- **Job to be done.** When I wake up, I want to know the single most important thing to do today, balanced across my domains, so I can start moving without scanning six tools and guessing.
- **Non-goals.** Not a full agenda. Not a second inbox. Not a place I have to open; it comes to me.
- **Acceptance check.** Done when: overdue is zero, the day is ranked, the top three reserve one slot per domain, and the whole thing fits in one phone-readable text.
- **Inputs / owners.** Reads priority (owned by triage) and dates (owned by the sweeps); writes nothing to the store; emits one text and one calendar event.

## 2. Wireframe and prototype (the surface before the logic)

The interface is the output, so it is designed first, as a literal text mock, before any logic exists:

```
[brief] 🗓 Tuesday
Work · ship the diligence memo before noon (gates the IC vote)
Health · 6pm lift, held (only clean slot this week)
People · call the founder you went quiet on
Growth · 20m on the panel talk, kept not dropped
0 overdue · 11 real tasks · 6 handled while you slept
```

The mock is the prototype. If it does not read well as a text on a phone at 7:42 a.m., the spec is wrong, not the implementation.

## 3. System-design note + tradeoffs (RFC style)

Each non-trivial decision is recorded with the alternative that was rejected and why. A sample:

| Decision | Alternatives rejected | Reason |
|---|---|---|
| Coordinate through shared files, no shared state | A central database; a message queue | A scheduled, restartable, single-writer-per-field fleet is simpler to reason about and audit; the change log is the queue. |
| Auto-park overdue forward by tier | Keep human-gated; delete stale | A human-gated loop never advanced (see case study 1); deletion is irreversible, so it stays gated. |
| Per-day budget + spread | Rank purely by urgency | Urgency-only stacked one day and starved whole domains (case study 2). |
| Fallback model chain | One best model everywhere | A single model is a single point of failure and multiplies cost across unattended runs; degrade instead of fail. |

The full set is in [`docs/design-patterns.md`](design-patterns.md); failure modes are in [`ARCHITECTURE.md`](../ARCHITECTURE.md).

## 4. Tests, evals, and review

- **Unit tests** on the deterministic parts: the manifest parser, date math, the reply-vocabulary resolver.
- **Behavioral evals** on the invariants, run in CI ([`evals/`](../evals)): the lane fence (no agent writes a field it does not own), overdue-zero after a sweep, and the per-day budget. These are the tests that guard the failures that actually happened.
- **PR review, against a contract.** Every agent is reviewed against [`agents/format-contract.md`](../agents/format-contract.md): does it write only its owned field, read ids fresh from source, verify read-after-write, and emit the house format. A change that violates the contract fails the lane-fence eval before it can merge.
- **Post-mortems** for real incidents, each ending in an eval so the class of bug is fenced out, not just patched ([`docs/case-studies.md`](case-studies.md)).

## 5. The loop, end to end

`PRD → wireframe → prototype → build (one-field agent) → unit tests → behavioral evals in CI → self-review vs contract → system-design note → ship → weekly self-improvement under a frozen-eval gate.`

The point is not the ceremony. It is that an autonomous fleet you run unattended has to earn trust the same way a production service does, and the artifacts are the evidence that it did.
