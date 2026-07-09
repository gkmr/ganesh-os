# Pilot: inbox-usps on a cloud routine

BLUF: the first agent to leave the laptop. `inbox-usps` is the ideal pilot - Gmail read-only, owns nothing in the shared store, no device dependency - so it proves the whole unattended loop (managed routine + git-backed state + the fence) at the lowest possible blast radius. This is the runbook to stand it up and the line to roll it back.

## Why this one first
- **Cloud-ready connector.** It reads the USPS Informed Delivery email through the hosted Gmail connector - authorize once, then a headless routine can use it. No device-bound data (contrast the reminders and iMessage agents, which stay on an always-on box until re-platformed).
- **Read-only.** It sets no priority, date, or lifecycle; its only write is its own `junk-senders.json`. A bug cannot corrupt the shared store.
- **Self-guarding.** The SKILL's concurrency + freshness guard makes a no-digest-yet run a silent no-op, so an early or doubled fire is harmless.

## Prerequisites
1. **Authorize Gmail once** at `claude.ai/customize/connectors` (read scope). Hosted connectors auth on claude.ai and are then available to cloud routines automatically.
2. **Create the private state repo** (ADR-16) and seed it from `state/` here (the read-first index, an empty `changelog.jsonl`, and `inbox-usps/junk-senders.json`). Set `GANESH_STATE_REPO` to it.

## Stand it up
The schedule entry `schedules/inbox-usps.schedule.json` is the source of truth: `cron: "45 8 * * *"`, `runtime: routine`, `connectors: [gmail:read]`, `catchup: half-day`.

1. Create a routine that fires `skills/usps-mail-digest/SKILL.md` on that cron in operator-local time.
2. Point the run at the state repo via `schedules/run-agent.sh inbox-usps` (pull at start, run, commit + push at end), or map the routine's own environment to clone the state repo on start and push on finish.
3. Scope the routine to the Gmail connector only - nothing else.

## Verify the first run
- Trigger a run now (do not wait for 8:45a). Confirm it either produces a `[usps]` digest or, if no Informed Delivery email has arrived, exits silently as a no-op - both are correct.
- Check the state repo got one commit: a run marker, and a `junk-senders.json` change only if you exercised a `drop` reply.
- Confirm no shared-store field was written (the lane-fence stays green because the agent owns none).
- Reply `drop` on a junk `D#` item and confirm the sender lands in `junk-senders.json` on the next run (the learning loop).

## Rollback
Disable the routine. Because the agent is read-only and owns only its own memory file, there is nothing to unwind in the shared store - stopping the routine is the entire rollback. Revert `junk-senders.json` from git history if a bad `drop` was learned.

## Success criteria (promote the pattern)
When inbox-usps has run unattended for a week - digests land, no-ops stay silent, the state repo shows clean per-run commits, and the fence never trips - the loop is proven. Then batch the rest of the push lane (the other cloud-ready capture and file-only agents) onto routines the same way, per the [deployment assessment](../docs/unattended-deployment.md).
