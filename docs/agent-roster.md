# The 30+ agents, in plain language

A one-line description of what each of the 30+ agents actually does - the context, not the full agenda. They run on a schedule, never call each other, and each one is allowed to write exactly one thing (its **owns** field); everything else it treats as read-only. Task ids carry a project prefix (`job-`, `health-`, `ea-`, `inbox-`, `brief-`, `mtg-`, `review-`, `write-`, `sys-`) so an id says which life domain a run serves. For cadence, owned field, and exact output in table form, see the [agent catalog](agent-catalog.md); for how they hand off, see the [system map](system-map.md).

## Layer 1 - Capture & digest (read-only, just surfaces)

Eight agents read every channel so nothing has to be checked by hand. They summarize and flag, but never change anything.

1. **`inbox-whatsapp`** (`7:30a · 8:30p`) - Summarizes every unread chat with a key quote and archives the verbatim text, then sends one SMS. Owns: **nothing**.
2. **`inbox-imessage`** (`7:30a · 8:30p`) - Summarizes unread threads and flags phishing links; one SMS. Owns: **nothing**.
3. **`inbox-slack`** (`7:30a · 8:30p`) - Surfaces unread DMs, mentions, and threads waiting on me; one SMS. Owns: **nothing**.
4. **`inbox-googlevoice`** (`7:30a · 8:30p`) - Collects unread texts and voicemails, surfaced via email; one SMS. Owns: **nothing**.
5. **`inbox-gmail`** (`7:30a · 8:30p`) - Signal-vs-noise inbox triage with a key quote per thread; one SMS. Owns: **nothing**.
6. **`inbox-usps`** (`8:45a`) - Reads the USPS Informed Delivery email, OCRs the mailpiece scan images, and surfaces a ranked text with the watch-outs first - fraud/identity early-warnings, the mail-theft gap, money/government/legal/medical/deadline mail, and package anomalies - while conservatively suppressing ad mailers (suppress only when junk fires and no signal fires; when ambiguous, surface). One SMS. Owns: **nothing** (read-only; keeps its own junk-sender memory).
7. **`mtg-briefer`** (`8:40a · 1:40p · 6:40p · 8:40p`) - Pre-briefs upcoming meetings and post-briefs finished ones across Granola + Krisp; the 8:40p run is an end-of-day rollup of still-open next steps. Proposes calendar, reminder, and draft actions - gated on my reply. Owns: **nothing**.
8. **`mtg-reconciliation`** (`10 min before each briefer`) - Matches Krisp transcripts (which lack calendar access) to Granola's calendar-true metadata, correcting title, attendees, and stream. Owns: **a local crosswalk**.

## Layer 2 - Triage (sets priority only, non-destructive)

Two agents decide what matters most. They set priority and tags - never dates, completion, or deletion.

9. **`job-reminders-triage`** (`5:45a`) - Four-tier re-ranking of the deal pipeline by deadline, freshness, company priority, and warm-path strength; writes the pipeline decision canvas, and runs just before the morning sweep. Owns: **priority on the pipeline**.
10. **`ea-todo-triage`** (`5:50a`) - The same four tiers across every other list, including the default and inbox lists; writes the to-do decision canvas. Prune candidates are queued for per-item human confirmation, never auto-deleted. Owns: **priority on every other list**.

## Layer 3 - Reconcile & surface (turns the pile into one ranked day)

Nine agents reconcile everything against the calendars and produce the day I actually see.

11. **`ea-morning-sweep`** (`6:00a`) - Reconciles reminders against six calendars, advances recurring items, auto-parks overdue by tier, enforces the daily budget, and publishes the morning calendar event, then chains into the morning brief. Owns: **dates, dedupe, conflicts, auto-park**.
12. **`ea-evening-sweep`** (`6:45p`) - A mirror of the morning sweep; runs the weekly deep reconciliation on Sundays and chains into the evening brief. Owns: **same as morning sweep**.
13. **`brief-morning-digest`** (`7:02a`) - The ranked day: one most-important task plus a cross-domain top three, delivered four ways - chat, a vault md + html file, a phone calendar event, and SMS. Owns: **nothing** (read-only + its calendar event).
14. **`brief-evening-digest`** (`8:18p`) - The evening wrap plus tomorrow's setup, same four-surface delivery. Owns: **nothing**.
15. **`ea-tomorrow-plan`** (`7:20p`) - The time-ordered master shortlist for the next day, fusing calendar blocks, reminders due, and tiers; writes a DECISION column the sync applies. Owns: **nothing**.
16. **`ea-reminders-sync`** (`every 30m · 6a–11:59p`) - Applies my decisions - whether typed into a canvas file or sent as a text - and mirrors reminders back to a file for two-way sync. Owns: **lifecycle** (create / complete / reschedule).
17. **`ea-reminders-changelog-am`** (`8:53a`) - A reply-able `[rem-log]` SMS of every reminder edit the automation made since the last watermark, so I can undo or adjust any of them. Owns: **a reply-able changelog**.
18. **`ea-reminders-changelog-pm`** (`7:47p`) - The evening companion to the AM changelog; shares its watermark so an edit is never double-reported. Owns: **same (shared watermark)**.
19. **`job-weekly-status`** (`Fri 9:07a`) - A tiered weekly accountability summary assembled from the week's artifacts. Owns: **nothing**.

## Layer 4 - Wellbeing coaching (health, energy, recovery)

Seven agents make sure the quiet domains - body, sleep, food - get their own slots, not just whatever work leaves behind.

20. **`health-weighin-7am`** (`7:00a`) - Prompts weight, body-fat, sleep, and how the body feels; the reply feeds the metrics brain. Owns: **nothing** (capture).
21. **`health-readiness`** (`6:50a`) - Reads last night's recovery, scores readiness, and recommends an energy-timed day to a text and the dashboard; never writes dates. Owns: **nothing** (advisory).
22. **`health-food-prompt`** (`9a · 1p · 7p`) - Context-aware meal prompts that read the last 48–72h and carry a goal-tied coaching line; the 7p one also asks about workout and feeling. Owns: **nothing**.
23. **`health-food-logger`** (`8:47p`) - Logs food, macros, workout, and health stats vs goals; an adaptive-TDEE loop calibrates the calorie target against the actual weight trend, with a coaching SMS. Owns: **a daily health log file**.
24. **`health-workout-coach`** (`7:00a preview + pre-session`) - Previews the day's training and nudges ~60 min before each session, joint-aware. Owns: **its own state file**.
25. **`health-sleep-coach`** (`10:15p`) - Wind-down and recovery framing that names tomorrow's first move; sleep-quality-aware. Owns: **nothing**.
26. **`health-metrics-dashboard`** (`9:10p`) - Runs silently: captures weigh-in, sleep, feeling, device stats, and ritual adherence, tracks every trend, and regenerates the holistic dashboard. Owns: **the metrics file + the dashboard**.

## Layer 5 - Reflection & growth (does the system get better?)

Three agents grade the day, the week, and the goals - and propose improvements without ever shipping them unattended.

27. **`review-end-of-day`** (`9:35p`) - Diffs the morning plan against what actually happened, grades the day, and sends coaching and motivation by SMS. Owns: **a daily scorecard file and a note**.
28. **`review-weekly-self-improvement`** (`Sun 4p`) - Error analysis across the logs, a lint of the knowledge base, the regression checks, and at most one proposed change per agent - never self-deploying. Owns: **a proposal report only**.
29. **`review-goal-weekly`** (`Sun 8a`) - Reads the week's signals, updates each goal's state and next action, runs the goal evals, and flags stalls with one gated tactic change. Owns: **the goals file**.

## Monitoring & delivery (the `sys-` layer - watches the rest)

Three system agents sit above the producing fleet. None of them owns a domain field; they exist so a silent failure cannot hide and every run proves it happened.

30. **`sys-fleet-health`** (`8:48a · 1:48p · 9:48p`) - Reads every task's run marker and classifies the fleet into four failure shapes: a missed slot, a degraded run, a mid-run crash (a started run with no completion marker), and a connector outage. The morning pass sends one all-clear `N/N ran clean` heartbeat so a quiet day still has proof-of-life; the later passes are silent unless something is wrong. Owns: **nothing** (watchdog).
31. **`sys-catchup-controller`** (`7a · 12p · 6p`) - Detects today's missed slots from the run markers and the scheduler's last-run times, then re-fires the still-fresh ones by running each agent's own prompt, idempotently. Freshness-gated, silent unless it backfills; it absorbed the former weekday catch-up. Owns: **nothing** (re-fires others).
32. **`sys-overdue-watchdog`** (`8:37a`) - Verifies the morning sweep actually drove overdue to zero and alerts only on an unexpected non-recurring, non-sacred survivor. Owns: **nothing** (watchdog).

Every producing agent also obeys one delivery and notification contract: a substantive output ships three ways (chat, a vault md file, a self-contained html file), every run writes one marker to a single fleet-wide log, and each task pings quietly on success and loudly (a failure iMessage) the moment its primary output fails. Pure one-line coaching prompts are SMS-only and exempt from the file surfaces.

## How they fit together

The agents never call each other. They coordinate through three shared surfaces: the **decision canvases** (triage writes, the human edits, the sync applies), the **manifest** (digests write, the sync reads), and a single append-only **change log** (everyone writes, the weekly pass reads). Priority flows from triage to the sweep, which preserves it, to the brief, which ranks by it - so one human decision in a canvas propagates through the whole chain by the next morning. That single-writer fence is what makes 30+ autonomous agents safe to run unattended.
