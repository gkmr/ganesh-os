# System map — how the agents connect

_A living map of the chains and dependencies across the [27 agents](agent-catalog.md). The catalog is the index (every agent, its one owned field); this is the wiring (how they hand off). Architecture only, no personal data. Generated 2026-06-17 from the live schedule._

## Two coordination surfaces

The agents never call each other. They coordinate through two shared surfaces:

1. **The append-only change log** — the spine. Every write, from any agent, appends one source-tagged line. Audit trail, eval input, and the reason 27 writers stay reconstructable.
2. **A single self-message thread** — the bus for the wellbeing layer. Prompts post tagged questions, the human replies in the same thread, and silent readers parse the replies and write files. Because it is a self-thread, each message appears twice (sent + received), so every reader collapses identical text+timestamp doubles first. A stable bracket prefix on each prompt lets each reader take only its own slice, and a prompt is never mis-read as a reply.

## Wellbeing chain (Layer 4)

**Prompts — send only, log nothing.** Each carries a distinct prefix and stops if it finds its own prefix already sent today (no double-prompts).

| Prompt | Time | Asks / sends |
|---|---|---|
| Readiness + energy | 6:50a | advisory readiness score + an energy-timed plan (not a question) |
| Weigh-in | 7:00a | weight, body-fat, body-feel + hip/ankle, sleep hours + quality |
| Workout coach | 7:00a preview + ~45 min pre-session | today's sessions + joint-aware nudges, max one per session |
| Meal coaching | 9a / 1p / 7p | food; the 7p run also asks workout + feeling |
| Sleep coach | 10:15p | wind-down nudge + tomorrow's first move (reply optional) |

**Readers / brains — parse replies, write files.**

| Reader | Time | Owns |
|---|---|---|
| Food + macro logger | 8:50p | the food log; sends the one nightly summary |
| Metrics brain + dashboard | 9:05p | the metrics file + the dashboard (silent); adaptive-TDEE + workout volume/overload/1RM |
| Readiness + energy | 6:50a | the readiness file + the dashboard readiness hero / Today panel (advisory; never writes dates) |

**How the evening reply splits by field:** food → the logger; workout → the logger (logs it) + the metrics brain (volume/overload/1RM); feeling → the logger (next-day plan) + the metrics brain (mood trend); weight + sleep → the metrics brain via the weigh-in reply and the device export.

## Task + calendar engine (Layers 2–3)

- **Two EA sweeps** (6:04a, 6:52p) are the primary writers of reminders + calendar: reconcile against six calendars, dedupe, auto-park overdue by tier, enforce a per-day budget. Each chains into the briefing at the end of its run.
- **Triage** (5:45a pipeline, 5:50a every other list) sets priority and tags only — never dates, completion, or deletion.
- **Two-way sync** runs every 30 minutes: mirrors reminders to a file, captures manual edits, and applies the human's approved replies and file decisions back into reminders/calendar, read-after-write verified.
- **Tomorrow-plan** (7:20p) writes a DECISION column the sync applies.
- **Briefings** (7:10a, 8:15p, plus an 11a weekday catch-up backstop) read the triage canvases + calendar + messages and produce the ranked day, delivered four ways.

## Capture (Layer 1)

- **Five per-channel digests**, twice daily, each owning only its own output file, otherwise read-only.
- **Meetings:** reconciliation runs ~10 minutes before the briefer (8:30a / 1:30p / 6:30p / 8:30p), building a local Granola↔Krisp crosswalk that is read-only on both apps; the briefer (8:40a / 1:40p / 6:40p, plus an 8:40p end-of-day rollup) pre/post-briefs and proposes calendar / reminder / draft actions, all gated on a reply.

## Reflection + growth (Layer 5)

- **End-of-day** (9:35p) diffs the morning plan against what actually happened and grades the day.
- **Weekly status** (Fri), **goal review** (Sun, owns the goals file), and a **diagnostic self-improvement pass** (Sun) that proposes at most one change per agent and never deploys.

## Single-writer file ownership (sample)

| File | Owner | Everyone else |
|---|---|---|
| food log | food + macro logger | read-only |
| health metrics + the dashboard | metrics brain | read-only |
| dashboard readiness hero + Today panel | readiness + energy | read-only |
| workout-coach state | workout coach | read-only |
| goals | goal review | read-only |

A lane-fence eval blocks any cross-write in CI. This is the property that lets the fleet run unattended.

## Cross-links

- Both EA sweeps chain into the briefing.
- Reconciliation always runs ~10 minutes before the briefer.
- Tomorrow-plan writes DECISIONs the two-way sync applies.
- A set of private intake agents (opportunity scanning) runs on the same engine but is intentionally kept out of this public catalog.

---

_Companion to [`agent-catalog.md`](agent-catalog.md). The catalog answers "what is each agent?"; this answers "how do they connect?"_
