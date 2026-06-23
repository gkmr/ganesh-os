# The 30+ agents, in plain language

A one-line description of what each of the 30+ agents actually does - the context, not the full agenda. They run on a schedule, never call each other, and each one is allowed to write exactly one thing (its **owns** field); everything else it treats as read-only. For cadence, owned field, and exact output in table form, see the [agent catalog](agent-catalog.md); for how they hand off, see the [system map](system-map.md).

## Layer 1 - Capture & digest (read-only, just surfaces)

Seven agents read every channel so nothing has to be checked by hand. They summarize and flag, but never change anything.

1. **WhatsApp digest** (`7:30a · 8:30p`) - Summarizes every unread chat with a key quote and archives the verbatim text, then sends one SMS. Owns: **nothing**.
2. **iMessage digest** (`7:30a · 8:30p`) - Summarizes unread threads and flags phishing links; one SMS. Owns: **nothing**.
3. **Slack digest** (`7:30a · 8:30p`) - Surfaces unread DMs, mentions, and threads waiting on me; one SMS. Owns: **nothing**.
4. **Google Voice digest** (`7:30a · 8:30p`) - Collects unread texts and voicemails, surfaced via email; one SMS. Owns: **nothing**.
5. **Gmail digest** (`7:30a · 8:30p`) - Signal-vs-noise inbox triage with a key quote per thread; one SMS. Owns: **nothing**.
6. **Meetings briefer** (`8:40a · 1:40p · 6:40p · 8:40p`) - Pre-briefs upcoming meetings and post-briefs finished ones across Granola + Krisp; the 8:40p run is an end-of-day rollup of still-open next steps. Proposes calendar, reminder, and draft actions - gated on my reply. Owns: **nothing**.
7. **Meeting reconciliation** (`before each brief`) - Matches Krisp transcripts (which lack calendar access) to Granola's calendar-true metadata, correcting title, attendees, and stream. Owns: **a local crosswalk**.

## Layer 2 - Triage (sets priority only, non-destructive)

Two agents decide what matters most. They set priority and tags - never dates, completion, or deletion.

8. **Pipeline triage** (`5:45a`) - Four-tier re-ranking of the deal pipeline by deadline, freshness, company priority, and warm-path strength; writes the pipeline decision canvas. Owns: **priority on the pipeline**.
9. **To-do triage** (`5:50a`) - The same four tiers across every other list, including the default and inbox lists; writes the to-do decision canvas. Prune candidates are queued for per-item human confirmation, never auto-deleted. Owns: **priority on every other list**.

## Layer 3 - Reconcile & surface (turns the pile into one ranked day)

Eight agents reconcile everything against the calendars and produce the day I actually see.

10. **Morning sweep** (`6:00a`) - Reconciles reminders against six calendars, advances recurring items, auto-parks overdue by tier, enforces the daily budget, and publishes the morning calendar event. Owns: **dates, dedupe, conflicts, auto-park**.
11. **Evening sweep** (`6:45p`) - A mirror of the morning sweep; runs the weekly deep reconciliation on Sundays. Owns: **same as morning sweep**.
12. **Morning briefing** (`7:10a`) - The ranked day: one most-important task plus a cross-domain top three, delivered four ways - chat, vault file, phone calendar event, and SMS. Owns: **nothing** (read-only + its calendar event).
13. **Evening briefing** (`8:15p`) - The evening wrap plus tomorrow's setup. Owns: **nothing**.
14. **Catch-up controller** (`10a · 3p · 9p`) - The resilience backstop (replaces the retired weekday catch-up). Detects today's missed runs - both never-fired and fired-but-no-output (a run that stamped a last-run time but produced no output) - by cross-checking run markers against the scheduler's last-run times, then re-fires only the still-fresh ones by running each agent's own prompt, idempotently. Freshness-gated, silent unless it backfills. Owns: **nothing** (re-fires others).
15. **Tomorrow plan** (`7:20p`) - The time-ordered master shortlist for the next day, fusing calendar blocks, reminders due, and tiers. Owns: **nothing**.
16. **Reply processor** (`every 30m · 6a–11:59p`) - Applies my decisions - whether typed into a canvas file or sent as a text - and mirrors reminders back to a file for two-way sync. Owns: **lifecycle** (create / complete / reschedule).
17. **Weekly status** (`weekly`) - A tiered weekly accountability summary assembled from the week's artifacts. Owns: **nothing**.

## Layer 4 - Wellbeing coaching (health, energy, recovery)

Seven agents make sure the quiet domains - body, sleep, food - get their own slots, not just whatever work leaves behind.

18. **Morning weigh-in** (`7:00a`) - Prompts weight, body-fat, sleep, and how the body feels; the reply feeds the metrics brain. Owns: **nothing** (capture).
19. **Readiness + energy** (`6:50a`) - Reads last night's recovery, scores readiness, and recommends an energy-timed day to a text and the dashboard; never writes dates. Owns: **nothing** (advisory).
20. **Meal coaching** (`9a · 1p · 7p`) - Context-aware meal prompts that read the last 48–72h and carry a goal-tied coaching line; the evening one also asks about workout and feeling. Owns: **nothing**.
21. **Food + macro logger** (`8:50p`) - Logs food, macros, workout, and health stats vs goals; an adaptive-TDEE loop calibrates the calorie target against the actual weight trend, with a coaching SMS. Owns: **a daily health log file**.
22. **Workout coach** (`preview + pre-session`) - Previews the day's training and nudges ~45 min before each session, joint-aware. Owns: **its own state file**.
23. **Sleep coach** (`10:15p`) - Wind-down and recovery framing that names tomorrow's first move; sleep-apnea-aware. Owns: **nothing**.
24. **Metrics brain + dashboard** (`9:05p`) - Runs silently: captures weigh-in, sleep, feeling, device stats, and ritual adherence, tracks every trend, and regenerates the holistic dashboard. Owns: **the metrics file + the dashboard**.

## Layer 5 - Reflection & growth (does the system get better?)

Three agents grade the day, the week, and the goals - and propose improvements without ever shipping them unattended.

25. **End-of-day review** (`9:35p`) - Diffs the morning plan against what actually happened, grades the day, and sends coaching and motivation by SMS. Owns: **a daily scorecard file and a note**.
26. **Weekly self-improvement** (`Sun 4p`) - Error analysis across the logs, a lint of the knowledge base, the regression checks, and at most one proposed change per agent - never self-deploying. Owns: **a proposal report only**.
27. **Goal review** (`Sun 8a`) - Reads the week's signals, updates each goal's state and next action, runs the goal evals, and flags stalls with one gated tactic change. Owns: **the goals file**.

## How they fit together

The agents never call each other. They coordinate through three shared surfaces: the **decision canvases** (triage writes, the human edits, the reply processor applies), the **manifest** (digests write, the reply processor reads), and a single append-only **change log** (everyone writes, the weekly pass reads). Priority flows from triage to the sweep, which preserves it, to the brief, which ranks by it - so one human decision in a canvas propagates through the whole chain by the next morning. That single-writer fence is what makes 30+ autonomous agents safe to run unattended.
