# Agent catalog

30+ scheduled agents, grouped by layer. Each is a self-contained `SKILL.md` prompt fired by cron in local time. "Owns" names the single field the agent is allowed to mutate; everything else it treats as read-only. Task ids carry a project prefix - `job-`, `health-`, `ea-`, `inbox-`, `brief-`, `mtg-`, `review-`, `write-`, `sys-` - so an id says which life domain a run serves.

## Layer 1 - Capture and digest (read-only, surfacing)

| Agent | Cadence | Owns | Output |
|---|---|---|---|
| `inbox-whatsapp` | 7:30a, 8:30p | nothing (read-only) | every unread chat, summarized with a key quote, verbatim archived; one SMS |
| `inbox-imessage` | 7:30a, 8:30p | nothing | unread threads summarized; phishing-link flag; one SMS |
| `inbox-slack` | 7:30a, 8:30p | nothing | unread DMs, mentions, threads waiting on the user; one SMS |
| `inbox-googlevoice` | 7:30a, 8:30p | nothing | unread texts and voicemails via email; one SMS |
| `inbox-gmail` | 7:30a, 8:30p | nothing | signal-vs-noise inbox triage with a key quote; one SMS |
| `inbox-usps` | 8:45a | nothing (read-only; own junk-sender memory) | reads the Informed Delivery email, OCRs the mailpiece scan images, surfaces watch-outs first (fraud/identity, mail-theft gap, money/government/legal/medical/deadline, package anomalies), suppresses ad mailers conservatively; one SMS |
| `mtg-briefer` | 8:40a, 1:40p, 6:40p, 8:40p | nothing | pre-briefs upcoming meetings and post-briefs finished ones across Granola + Krisp; the 8:40p run is an end-of-day rollup of still-open next steps; proposes calendar/reminder/draft actions, gated on reply |
| `mtg-reconciliation` | 10 min before each briefer | a local crosswalk | matches Krisp transcripts (which lack calendar access) to Granola's calendar-true metadata; corrects title, attendees, and stream |

Every digest follows one format contract: a leading source tag, a one-line summary plus counts, action items first with a stable handle, then compressed FYIs. Each repliable item also gets a JSON line in a daily manifest so it can be acted on by text.

## Layer 2 - Triage (priority only, non-destructive)

| Agent | Cadence | Owns | Output |
|---|---|---|---|
| `job-reminders-triage` | 5:45a | priority on the pipeline | four-tier re-tiering by deadline, freshness, company priority, warm-path strength; writes the pipeline decision canvas; runs before the morning sweep |
| `ea-todo-triage` | 5:50a | priority on every other list | same four tiers across all other lists, including the default and inbox lists; writes the to-do decision canvas |

Both are constrained writers: they set the priority field and tags only, never dates, completion, or deletion. Prune candidates are queued for per-item human confirmation, never auto-deleted.

## Layer 3 - Reconcile and surface

| Agent | Cadence | Owns | Output |
|---|---|---|---|
| `ea-morning-sweep` | 6:00a | dates, dedupe, conflicts, auto-park | reconciles reminders against six calendars; advances recurring items; auto-parks overdue by tier; enforces the daily budget; publishes the morning calendar event; chains into the morning brief |
| `ea-evening-sweep` | 6:45p | same | mirror of the morning; runs the weekly deep reconciliation on Sundays; chains into the evening brief |
| `brief-morning-digest` | 7:02a | nothing (read-only + its calendar event) | the ranked day: most-important-task plus a cross-domain top three; delivered as chat, a vault md + html file, a phone calendar event, and an SMS |
| `brief-evening-digest` | 8:18p | nothing | evening wrap plus tomorrow's setup; same four-surface delivery |
| `ea-tomorrow-plan` | 7:20p | nothing | the time-ordered master shortlist for the next day, fusing calendar blocks, reminders due, and tiers; writes a DECISION column the sync applies |
| `ea-reminders-sync` | every 30 min, 6a-11:59p | lifecycle (create / complete / reschedule) | applies the human's decisions, whether typed into a canvas file or sent as a text; mirrors reminders back to a file; two-way sync |
| `ea-reminders-changelog-am` | 8:53a | a reply-able changelog | a `[rem-log]` SMS of the automation's reminder edits since the last watermark, repliable to undo or adjust |
| `ea-reminders-changelog-pm` | 7:47p | same (shared watermark) | the evening companion; shares the AM watermark so an edit is never double-reported |
| `job-weekly-status` | Fri 9:07a | nothing | a tiered weekly accountability summary assembled from the week's artifacts |

## Layer 4 - Wellbeing coaching

| Agent | Cadence | Owns | Output |
|---|---|---|---|
| `health-weighin-7am` | 7:00a | nothing (capture) | prompts weight, body-fat, sleep, and how the body feels; the reply feeds the metrics brain |
| `health-readiness` | 6:50a | nothing (advisory) | reads last night's recovery, scores readiness, recommends an energy-timed day to a text + the dashboard; never writes dates |
| `health-food-prompt` | 9a, 1p, 7p | nothing | context-aware meal prompts that read the last 48-72h and carry a goal-tied coaching line; the 7p one also asks workout + feeling |
| `health-food-logger` | 8:47p | a daily health log file | logs food, macros, workout, and health stats vs goals; an adaptive-TDEE loop calibrates the calorie target against the actual weight trend; coaching SMS |
| `health-workout-coach` | 7:00a preview + pre-session | its own state file | previews the day's training and nudges ~60 min before each session, joint-aware |
| `health-sleep-coach` | 10:15p | nothing | wind-down, recovery framing, names tomorrow's first move; sleep-quality-aware |
| `health-metrics-dashboard` | 9:10p | the metrics file + the dashboard | silent: captures weigh-in/sleep/feeling + device stats + ritual adherence, tracks all trends, regenerates the holistic dashboard |

## Layer 5 - Reflection and growth

| Agent | Cadence | Owns | Output |
|---|---|---|---|
| `review-end-of-day` | 9:35p | a daily scorecard file and a note | diffs the morning plan against what actually happened; grades the day; coaching and motivation SMS |
| `review-weekly-self-improvement` | Sun 4p | a proposal report only | error analysis across the logs, a lint of the knowledge base, the regression checks, and at most one proposed change per agent - never self-deploying |
| `review-goal-weekly` | Sun 8a | the goals file | reads the week's signals, updates each goal's state and next action, runs the goal evals, flags stalls with one gated tactic change |

## Monitoring and delivery (the `sys-` layer)

A small system cohort sits above the producing fleet. None of it owns a domain field; its job is to make a silent failure impossible and standardize how every run is proven.

| Agent | Cadence | Owns | Output |
|---|---|---|---|
| `sys-fleet-health` | 8:48a, 1:48p, 9:48p | nothing (watchdog) | reads every task's run marker and classifies the fleet: missed slot, degraded run, mid-run crash (a started run with no completion marker), connector outage. The morning pass sends one all-clear `N/N ran clean` heartbeat; the later passes stay silent unless something is missed or degraded |
| `sys-catchup-controller` | 7a, 12p, 6p | nothing (re-fires others) | detects today's missed slots from run markers + the scheduler's last-run times and re-fires the still-fresh ones idempotently by running each agent's own prompt; freshness-gated, silent unless it backfills; absorbed the former weekday catch-up |
| `sys-overdue-watchdog` | 8:37a | nothing (watchdog) | verifies the morning sweep actually drove overdue to zero; alerts only on an unexpected non-recurring, non-sacred survivor |

Every producing agent obeys one delivery and notification contract instead of inventing its own. A substantive artifact is delivered three ways (chat, a vault Markdown file, a self-contained HTML file); pure one-line coaching prompts are SMS-only and exempt. Every task writes one completion row to a single fleet-wide log on success, skip, or degrade. That one log is the substrate `sys-fleet-health` reads. Notification has two paths: a quiet success ping (the task's own tagged SMS) when the core promise was kept, and a loud failure iMessage the moment the primary output fails or a step still fails after the in-run retries. Above all of it, the daily heartbeat is the floor that covers even a silent-by-design task.

## Interoperation

The agents never call each other. They coordinate through three shared surfaces: the decision canvases (triage writes, the human edits, the sync applies), the manifest (digests write, the sync reads), and the single append-only change log (everyone writes, the weekly pass reads). Priority flows from triage to the sweep, which preserves it, to the brief, which ranks by it. One human decision in a canvas propagates through the whole chain by the next morning. A set of private intake agents (opportunity scanning) and the relationship-pulse cohort run on the same engine and contract but are intentionally generalized or kept out of this public catalog.
