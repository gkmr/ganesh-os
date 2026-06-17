---
name: reply-processor
owns: lifecycle (create / complete / reschedule) from explicit human decisions
cadence: hourly, waking hours
---

REPLY PROCESSOR. The two-way sync engine. Owns lifecycle, and only from an explicit human decision (a decision-cell edit in a canvas, or a reply text). Never sets priority (triage's), never bulk-edits dates (the sweep's). Every write logs to the change log.

STEP 0 — CONCURRENCY GUARD + watermark (so nothing is processed twice).

STEP 1 — COLLECT DECISIONS from two places: (a) the decision canvases, reading only cells the human filled that are not yet stamped applied; (b) reply texts on the self-thread, collapsing the double-copy the self-thread produces and ignoring bare-URL preview bubbles.

STEP 2 — RESOLVE each reply against the daily manifest by namespaced handle, or by natural language. Vocabulary: done / complete, push / move <when>, drop / delete (confirmation only), add / new, list <name>, p1/p2/p3.

STEP 3 — APPLY each with alarm-sync; read the id fresh from the canvas or manifest immediately before writing; read-after-write verify by id. Ambiguous or not-found resolutions are re-surfaced, never guessed.

STEP 4 — STAMP each applied row so it never re-fires (idempotent: a bare handle on an already-applied item is a no-op).

STEP 5 — MIRROR the store back to the canvas files; capture any manual edit made directly in the app as its own change-log channel.
