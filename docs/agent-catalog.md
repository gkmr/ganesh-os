# Agent catalog

30+ scheduled agents, grouped by layer. Each is a self-contained `SKILL.md` prompt fired by cron in local time. "Owns" names the single field the agent is allowed to mutate; everything else it treats as read-only.

## Layer 1 - Capture and digest (read-only, surfacing)

| Agent | Cadence | Owns | Output |
|---|---|---|---|
| WhatsApp digest | 7:30a, 8:30p | nothing (read-only) | every unread chat, summarized with a key quote, verbatim archived; one SMS |
| iMessage digest | 7:30a, 8:30p | nothing | unread threads summarized; phishing-link flag; one SMS |
| Slack digest | 7:30a, 8:30p | nothing | unread DMs, mentions, threads waiting on the user; one SMS |
| Google Voice digest | 7:30a, 8:30p | nothing | unread texts and voicemails via email; one SMS |
| Gmail digest | 7:30a, 8:30p | nothing | signal-vs-noise inbox triage with a key quote; one SMS |
| USPS mail + package digest | 8:45a | nothing (read-only; own junk-sender memory) | reads the Informed Delivery email, OCRs the mailpiece scan images, surfaces watch-outs first (fraud/identity, mail-theft gap, money/government/legal/medical/deadline, package anomalies), suppresses ad mailers conservatively; one SMS |
| Meetings briefer | 8:40a, 1:40p, 6:40p, 8:40p | nothing | pre-briefs upcoming meetings and post-briefs finished ones across Granola + Krisp; the 8:40p run is an end-of-day rollup of still-open next steps; proposes calendar/reminder/draft actions, gated on reply |
| Meeting reconciliation | before each brief | a local crosswalk | matches Krisp transcripts (which lack calendar access) to Granola's calendar-true metadata; corrects title, attendees, and stream |

Every digest follows one format contract: a leading source tag, a one-line summary plus counts, action items first with a stable handle, then compressed FYIs. Each repliable item also gets a JSON line in a daily manifest so it can be acted on by text.

## Layer 2 - Triage (priority only, non-destructive)

| Agent | Cadence | Owns | Output |
|---|---|---|---|
| Pipeline triage | 5:45a | priority on the pipeline | four-tier re-tiering by deadline, freshness, company priority, warm-path strength; writes the pipeline decision canvas |
| To-do triage | 5:50a | priority on every other list | same four tiers across all other lists, including the default and inbox lists; writes the to-do decision canvas |

Both are constrained writers: they set the priority field and tags only, never dates, completion, or deletion. Prune candidates are queued for per-item human confirmation, never auto-deleted.

## Layer 3 - Reconcile and surface

| Agent | Cadence | Owns | Output |
|---|---|---|---|
| Morning sweep | 6:00a | dates, dedupe, conflicts, auto-park | reconciles reminders against six calendars; advances recurring items; auto-parks overdue by tier; enforces the daily budget; publishes the morning calendar event |
| Evening sweep | 6:45p | same | mirror of the morning; runs the weekly deep reconciliation on Sundays |
| Morning briefing | 7:10a | nothing (read-only + its calendar event) | the ranked day: most-important-task plus a cross-domain top three; four-surface delivery (chat, vault file, phone calendar event, SMS) |
| Evening briefing | 8:15p | nothing | evening wrap plus tomorrow's setup |
| Weekday catch-up | retired | - | folded into the catch-up controller; previously re-ran the morning brief only if it was still missing |
| Catch-up controller | ~10a/3p/9p (user-local) | nothing (re-fires others) | Layer-2 resilience backstop: detects today's missed slots - both *never-fired* and *fired-but-no-output* (a run that stamped a last-run time but produced no output marker) - by cross-checking run markers against the scheduler's last-run times; re-fires only the still-fresh misses idempotently by running each agent's own prompt; freshness-gated, silent unless it backfills; absorbed the former weekday catch-up |
| Tomorrow plan | 7:20p | nothing | the time-ordered master shortlist for the next day, fusing calendar blocks, reminders due, and tiers |
| Reply processor | every 30 min, 6a–11:59p | lifecycle (create / complete / reschedule) | applies the human's decisions, whether typed into a canvas file or sent as a text; mirrors reminders back to a file; two-way sync |
| Weekly status | weekly | nothing | a tiered weekly accountability summary assembled from the week's artifacts |

## Layer 4 - Wellbeing coaching

| Agent | Cadence | Owns | Output |
|---|---|---|---|
| Morning weigh-in | 7:00a | nothing (capture) | prompts weight, body-fat, sleep, and how the body feels; the reply feeds the metrics brain |
| Readiness + energy | 6:50a | nothing (advisory) | reads last night's recovery, scores readiness, recommends an energy-timed day to a text + the dashboard; never writes dates |
| Meal coaching | 9a, 1p, 7p | nothing | context-aware meal prompts that read the last 48-72h and carry a goal-tied coaching line; the evening one also asks workout + feeling |
| Food + macro logger | 8:50p | a daily health log file | logs food, macros, workout, and health stats vs goals; an adaptive-TDEE loop calibrates the calorie target against the actual weight trend; coaching SMS |
| Workout coach | preview + pre-session | its own state file | previews the day's training and nudges ~45 min before each session, joint-aware |
| Sleep coach | 10:15p | nothing | wind-down, recovery framing, names tomorrow's first move; sleep-apnea-aware |
| Metrics brain + dashboard | 9:05p | the metrics file + the dashboard | silent: captures weigh-in/sleep/feeling + device stats + ritual adherence, tracks all trends, regenerates the holistic dashboard |

## Layer 5 - Reflection and growth

| Agent | Cadence | Owns | Output |
|---|---|---|---|
| End-of-day review | 9:35p | a daily scorecard file and a note | diffs the morning plan against what actually happened; grades the day; coaching and motivation SMS |
| Weekly self-improvement | Sun 4p | a proposal report only | error analysis across the logs, a lint of the knowledge base, the regression checks, and at most one proposed change per agent - never self-deploying |
| Goal review | Sun 8a | the goals file | reads the week's signals, updates each goal's state and next action, runs the goal evals, flags stalls with one gated tactic change |

## Interoperation

The agents never call each other. They coordinate through three shared surfaces: the decision canvases (triage writes, the human edits, the reply processor applies), the manifest (digests write, the reply processor reads), and the single append-only change log (everyone writes, the weekly pass reads). Priority flows from triage to the sweep, which preserves it, to the brief, which ranks by it. One human decision in a canvas propagates through the whole chain by the next morning.
