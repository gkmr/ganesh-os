---
name: pipeline-triage
description: Tier and prioritize the opportunity pipeline (deal flow, advisory, outreach, and other signal items) into now / this-week / later / prune, set priority only, and write the decision canvas. Fires daily before the sweep. A constrained writer - it sets priority and tags and nothing else.
---

# Pipeline triage

BLUF: tier every open pipeline item into one of four buckets and set its priority. Nothing else. Dates belong to the sweeps; deletion is human-gated. Every write hits the change log.

## Owns
Priority and tags on the pipeline list only. It must not change dates, completion, or deletion. This is the single-writer fence in action: triage owns priority, the sweeps own dates, the reply-processor owns lifecycle. Pair this with `skills/morning-brief/SKILL.md`, which owns nothing - together they show the read-only and the constrained-writer ends of the fence.

## Steps
1. Read the pipeline list, chunked if it overflows the window.
2. Tier each item against five signals - deadline proximity, signal freshness, counterparty priority, warm-path strength, and fit:
   - T1 now: due today or overdue, and a live action or a hot warm-path with a priority counterparty.
   - T2 this-week: due within 7 days, or a fresh priority lead with no date.
   - T3 later: longer-horizon or lower-priority but still relevant.
   - T4 prune: expired, superseded, dead, vague, or duplicate.
3. Write priority by tier (T1 high, T2 medium, T3 low, T4 none plus a prune-review tag). Priority and tags only. Read-after-write verify. Idempotent - skip if already correct.
4. Prune by confirmation: queue every T4 to the prune list and the manifest. Never delete without an explicit human yes.
5. Write the decision canvas: one row per item (handle, id, list, title, due, tag, a blank DECISION column), grouped by tier, preserving any decision the human already filled. This is what makes the pipeline editable by file or by text.
6. Deliver one tagged digest (tier counts plus the now-tier titles) and log the run.

## Guardrails
- Constrained writer. Touching dates, completion, or deletion is a cross-lane write, and the fence rejects it.
- No em dashes in the digest. Use `" - "`.
