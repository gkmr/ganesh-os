---
name: catchup-controller
description: Layer-2 resilience. A few times a day, detect scheduled agents that missed today's slot (host asleep, or a startup failure) from run markers plus the scheduler's last-run times, then re-fire only the still-useful ones by following each task's own idempotent steps. Freshness-gated, silent unless it backfills. Owns nothing.
---

# Catch-up controller

BLUF: heal the one failure an agent cannot heal itself - a run that never executed. Read the run markers and the scheduler's last-run times, find slots that were missed, and re-fire the still-fresh ones idempotently. It owns no field, writes no domain state, and stays silent unless it actually backfills.

## Owns
Nothing. This is the orchestrator end of the single-writer fence: it triggers other agents but never writes a field they own. Its only output is its own run marker and, when it backfills, one line saying what it re-fired and why. Pair it with the agents it protects - they are idempotent by construction, which is the property that makes re-firing safe. Pair this with `skills/pipeline-triage/SKILL.md` (a constrained writer) and `skills/morning-brief/SKILL.md` (owns nothing) to see all three positions against the fence.

## Why two layers
A transient error inside a run that already started is that run's own job to retry-then-degrade (the shared resilience contract). A run that never executed - the host asleep at the fire time, or a startup failure - is invisible from inside and can only be healed from outside. That second class is this task. The two layers are not redundant; they cover different failures.

## Steps
1. For each enabled task (skip self, manual, and disabled), find the latest slot that should have fired earlier today, then read its last-run time and its dated output marker. A task is a confirmed miss two ways: **never-fired** (nothing dispatched after the slot), or **fired-but-no-output** (a run dispatched and stamped a last-run time but left no output marker for today). Trust the actual output, not the clock alone - a stamped-but-empty run is still a gap.
2. Bucket each miss by freshness:
   - **Catch up always** (value persists): the high-value daily runs - the morning sweep, triage, the day's brief, the planning pass, the weekly reviews.
   - **Catch up only within the same half-day**: the per-channel digests (a 7:30a digest is worth a 10a replay, not a 9p one).
   - **Never catch up** (self-healing or stale by nature): the high-frequency reply-processor (it heals on its own next run), the several-times-daily meetings tasks, and the time-of-day nudges (a wake or bedtime prompt replayed hours late has negative value).
3. Re-fire each still-useful miss by following that task's own `SKILL.md`. Add no per-task logic here; the target's concurrency guard turns a redundant fire into a no-op, so this can never double-act.
4. If nothing was missed, or everything missed is stale, exit silently. Speak only when you backfill, then one line per re-fired task.
5. Log the run, and any backfills, to the change log.

## Guardrails
- Owns no field. Re-firing a task is allowed; writing a field a task owns is a cross-lane write the fence rejects.
- Freshness-gate every replay. A stale slot is skipped, never re-fired.
- Idempotent and silent. A clean pass writes only its own run marker and says nothing.
- Write a run marker on every run, even a no-op. The controller can only re-fire what a task can prove it missed, so an absent marker is the miss signal.
- Resolve now and the freshness gates to the operator's local timezone from the clock, not the host's cron label. The host may run a different timezone than the operator; read the operator's current timezone from a one-line override file (home tz by default).
- No clock-hour gates. Quiet hours are retired fleet-wide: the operator's device Do-Not-Disturb owns notification timing, and this controller re-fires a still-fresh miss at any hour. (Historical bug: this controller's own hour-gates once stamped "quiet-hours skip" on eight tasks during a 2 AM catch-up burst - a retired rule surviving as buried prompt text. Freshness and concurrency are the only legitimate gates.)
- No em dashes in any output. Use `" - "`.
