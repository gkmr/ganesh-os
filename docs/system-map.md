# System map - how the agents connect

_A living map of the chains and dependencies across the [30+ agents](agent-catalog.md). The catalog is the index (every agent, its one owned field); this is the wiring (how they hand off). Architecture only, no personal data. Task ids carry a project prefix (`job-`, `health-`, `ea-`, `inbox-`, `brief-`, `mtg-`, `review-`, `write-`, `sys-`)._

## Two coordination surfaces

The agents never call each other. They coordinate through two shared surfaces:

1. **The append-only change log** - the spine. Every write, from any agent, appends one source-tagged line. Audit trail, eval input, and the reason 30+ writers stay reconstructable.
2. **A single self-message thread** - the bus for the wellbeing layer. Prompts post tagged questions, the human replies in the same thread, and silent readers parse the replies and write files. Because it is a self-thread, each message appears twice (sent + received), so every reader collapses identical text+timestamp doubles first. A stable bracket prefix on each prompt lets each reader take only its own slice, and a prompt is never mis-read as a reply.

## Wellbeing chain (Layer 4)

**Prompts - send only, log nothing.** Each carries a distinct prefix and stops if it finds its own prefix already sent today (no double-prompts).

| Prompt | Time | Asks / sends |
|---|---|---|
| `health-readiness` | 6:50a | advisory readiness score + an energy-timed plan (not a question) |
| `health-weighin-7am` | 7:00a | weight, body-fat, body-feel + hip/ankle, sleep hours + quality |
| `health-workout-coach` | 7:00a preview + ~60 min pre-session | today's sessions + joint-aware nudges, max one per session |
| `health-food-prompt` | 9a / 1p / 7p | food; the 7p run also asks workout + feeling |
| `health-sleep-coach` | 10:15p | wind-down nudge + tomorrow's first move (reply optional) |

**Readers / brains - parse replies, write files.**

| Reader | Time | Owns |
|---|---|---|
| `health-food-logger` | 8:47p | the food log; sends the one nightly summary |
| `health-metrics-dashboard` | 9:10p | the metrics file + the dashboard (silent); adaptive-TDEE + workout volume/overload/1RM |
| `health-readiness` | 6:50a | the readiness file + the dashboard readiness hero / Today panel (advisory; never writes dates) |

**How the evening reply splits by field:** food → the logger; workout → the logger (logs it) + the metrics brain (volume/overload/1RM); feeling → the logger (next-day plan) + the metrics brain (mood trend); weight + sleep → the metrics brain via the weigh-in reply and the device export.

## Task + calendar engine (Layers 2–3)

- **Two EA sweeps** (`ea-morning-sweep` 6:00a, `ea-evening-sweep` 6:45p) are the primary writers of reminders + calendar: reconcile against six calendars, dedupe, auto-park overdue by tier, enforce a per-day budget. Each chains into the briefing at the end of its run.
- **Triage** (`job-reminders-triage` 5:45a on the pipeline, `ea-todo-triage` 5:50a on every other list) sets priority and tags only - never dates, completion, or deletion.
- **Two-way sync** (`ea-reminders-sync`) runs every 30 minutes: mirrors reminders to a file, captures manual edits, and applies the human's approved replies and file decisions back into reminders/calendar, read-after-write verified.
- **Tomorrow-plan** (`ea-tomorrow-plan` 7:20p) writes a DECISION column the sync applies.
- **Reminder changelogs** (`ea-reminders-changelog-am` 8:53a, `ea-reminders-changelog-pm` 7:47p) send a reply-able `[rem-log]` SMS of the automation's edits, sharing one watermark so nothing is double-reported.
- **Briefings** (`brief-morning-digest` 7:02a, `brief-evening-digest` 8:18p) read the triage canvases + calendar + messages and produce the ranked day, delivered four ways (chat, vault md + html, calendar event, SMS).

## Capture (Layer 1)

- **Five per-channel digests** (`inbox-whatsapp`, `inbox-imessage`, `inbox-slack`, `inbox-googlevoice`, `inbox-gmail`), twice daily at 7:30a / 8:30p, each owning only its own output file, otherwise read-only.
- **Meetings:** `mtg-reconciliation` runs ~10 minutes before the briefer (8:30a / 1:30p / 6:30p / 8:30p), building a local Granola↔Krisp crosswalk that is read-only on both apps; `mtg-briefer` (8:40a / 1:40p / 6:40p, plus an 8:40p end-of-day rollup) pre/post-briefs and proposes calendar / reminder / draft actions, all gated on a reply.

## Reflection + growth (Layer 5)

- **`review-end-of-day`** (9:35p) diffs the morning plan against what actually happened and grades the day.
- **`job-weekly-status`** (Fri 9:07a), **`review-goal-weekly`** (Sun 8a, owns the goals file), and a diagnostic **`review-weekly-self-improvement`** pass (Sun 4p) that proposes at most one change per agent and never deploys.

## Monitoring + delivery (the `sys-` layer)

A system cohort watches the producing fleet and standardizes how every run is proven. None of it owns a domain field.

- **`sys-fleet-health`** (8:48a / 1:48p / 9:48p) reads every task's run marker and classifies the fleet: missed slot, degraded run, mid-run crash (a started run with no completion marker), and connector outage. The morning pass sends one all-clear `N/N ran clean` heartbeat; the later passes stay silent unless something is missed or degraded.
- **`sys-catchup-controller`** (7a / 12p / 6p) cross-checks run markers against the scheduler's last-run times to find runs that missed their slot (host asleep, or a startup failure that stamped a last-run time but produced no output) and re-fires only the still-fresh ones idempotently, freshness-gated and silent unless it backfills. It absorbed the former weekday brief catch-up.
- **`sys-overdue-watchdog`** (8:37a) verifies the morning sweep actually drove overdue to zero and alerts only on an unexpected non-recurring, non-sacred survivor.

Every producing agent obeys one delivery and notification contract: a substantive output ships as chat + a vault md file + a self-contained html file; every run writes one completion row to a single fleet-wide log (the substrate `sys-fleet-health` reads); each task pings quietly on success and loudly (a failure iMessage) the moment its primary output fails. The daily heartbeat is the floor that covers even a silent-by-design task.

## Single-writer file ownership (sample)

| File | Owner | Everyone else |
|---|---|---|
| food log | `health-food-logger` | read-only |
| health metrics + the dashboard | `health-metrics-dashboard` | read-only |
| dashboard readiness hero + Today panel | `health-readiness` | read-only |
| workout-coach state | `health-workout-coach` | read-only |
| goals | `review-goal-weekly` | read-only |

A lane-fence eval blocks any cross-write in CI. This is the property that lets the fleet run unattended.

## Cross-links

- Both EA sweeps chain into the briefing.
- Reconciliation always runs ~10 minutes before the briefer.
- Tomorrow-plan writes DECISIONs the two-way sync applies.
- `sys-fleet-health` reads the run markers every other task leaves; `sys-catchup-controller` re-fires the misses it can still recover.
- A set of private intake agents (opportunity scanning) and the relationship-pulse cohort run on the same engine and contract but are intentionally generalized or kept out of this public catalog.

---

_Companion to [`agent-catalog.md`](agent-catalog.md). The catalog answers "what is each agent?"; this answers "how do they connect?"_
