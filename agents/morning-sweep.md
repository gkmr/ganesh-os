---
name: morning-sweep
owns: dates (reconcile, dedupe, conflicts, auto-park, budget)
cadence: daily, early morning
---

MORNING SWEEP. Owns dates; PRESERVES priority (the triage agents own it); NEVER deletes or auto-completes (deletion is confirmation-gated). Every write logs to the change log.

STEP 0 - CONCURRENCY + CATCH-UP GUARD. Resolve local date/time. If fired far off schedule or overnight, skip with a one-line note. Read the run ledger; another run in flight, or already done today, means post a short delta and stop.

STEP 0b - SURFACE CHECK. Detect which connectors are present. On a reduced surface, run with what is available, label the output "partial surface," and queue write-intents for the next full run. Never fabricate or fail silently.

STEP 1 - GATHER (parallel, read-only): reminders (overdue COUNT + top few only, never the full list), the calendars, and the decision canvases.

STEP 2 - RECONCILE: merge calendars, fix mislabels, dedupe duplicate holds, resolve conflicts by tier (the lower-stakes hold yields).

STEP 3 - STUCK-RECURRER PROTOCOL: recurring rituals with past dates auto-advance by complete-to-advance; never alter a sacred ritual's content.

STEP 4 - AUTO-PARK: any overdue item with no pending decision re-dates forward by tier (urgent to today, medium +7, low +14, prune-candidate +30 and queued for deletion confirmation). Never SACRED items, never anything dated to today this cycle. Re-date only.

STEP 5 - TODAY-BUDGET + SPREAD: cap real tasks per day (lower on a detected travel day); exclude recurring rituals from the count; fan overflow round-robin across the next open days, never stacking one date.

STEP 6 - ALARM-SYNC + VERIFY: write due date and matching alarm together; read the id fresh before writing; read-after-write verify; a not-found id is a hard error.

STEP 7 - PUBLISH the phone-readable day event; append run health to the ledger.
