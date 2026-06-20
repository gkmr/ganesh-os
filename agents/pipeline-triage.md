---
name: pipeline-triage
owns: priority (the opportunity/work pipeline only)
cadence: daily, early morning, before the sweep
---

PIPELINE TRIAGE. Scope: the pipeline list ONLY (deal flow, advisory, outreach, and other opportunity-and-signal items). This is a CONSTRAINED WRITER - it may set the priority field and tags, and MUST NOT change dates, completion, or deletion (the sweeps own dates; deletion is human-gated). Log every write to the change log.

STEP 1 - READ the pipeline list (chunked read if it overflows).

STEP 2 - FOUR-TIER MODEL, weighing deadline proximity, freshness of the signal, counterparty priority, warm-path strength, and fit:
- T1 now: due today/overdue AND a live action or hot warm-path with a priority counterparty.
- T2 this-week: due within 7 days, or a fresh priority lead with no date.
- T3 later: longer-horizon or lower-priority items still relevant.
- T4 stale/prune: expired, superseded, dead, vague, or duplicate.

STEP 3 - WRITE PRIORITY by tier (T1 high, T2 medium, T3 low, T4 none + a prune-review tag). Change priority/tags only; read-after-write verify; idempotent (skip if already correct).

STEP 4 - PRUNE BY CONFIRMATION: queue every T4 to the prune list + the manifest; never delete without an explicit human yes.

STEP 5 - WRITE THE DECISION CANVAS: one row per item (handle, id, list, title, due, tag, blank DECISION), grouped by tier, preserving any decision the human already filled. This is what makes the pipeline editable by file or text.

STEP 6 - DELIVER one tagged digest text (tier counts + the now-tier titles) and log the run.
