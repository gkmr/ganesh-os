# Schedules - the fire-time layer

BLUF: the repo declares *when* each agent fires; the live harness *does* the firing. This directory is the machine-readable source of truth for cadence - one schedule entry per agent - so a fire time lives next to the agent it fires, not only in a human table or a private crontab. The [agent catalog](../docs/agent-catalog.md) is the human view of the same cadences; a schedule entry here is the executable view.

## Why this exists
Cadence used to live in two soft places: the catalog's `Cadence` column (for humans) and whatever crontab or routine ran in the live system (invisible from the repo). That drifts. A schedule entry makes the fire time a committed artifact with a schema, so the catalog, the agent prompt, and the actual trigger cannot silently disagree.

## What a schedule entry is
One JSON file per agent, validated by `schedule.schema.json`. It names the agent's run id, the skill it runs, the cron in operator-local time, and the deployment facts that decide *where* it can fire:

- `catchup` - the freshness bucket the `sys-catchup-controller` uses when a slot is missed: `always` (value persists), `half-day` (worth a same-half-day replay only), or `never` (self-healing or stale by nature).
- `runtime` - which lane fires it, from the [unattended-deployment assessment](../docs/unattended-deployment.md): `routine` (managed cloud, no laptop), `desktop-task` or `device-box` (must run on the device the data lives on), `ci-cron`, or `gateway` (a self-hosted 24/7 gateway).
- `connectors` - the data it touches, scope-tagged (e.g. `gmail:read`). This is what decides whether the agent is cloud-ready or device-bound.

## How the harness consumes it
The scheduler reads a schedule entry, fires the named skill at the cron time in the operator's local timezone, one run at a time behind the concurrency guard, and stamps a run marker. Nothing here fires on its own - the repo is the reference, the harness is the runtime. A managed cloud routine maps one-to-one: the `cron` becomes the routine schedule, the `skill` the prompt, the `connectors` the authorized scope.

## Files
- `schedule.schema.json` - the contract for one schedule entry.
- `inbox-usps.schedule.json` - the first concrete entry: the USPS Informed Delivery digest, and the `routine`-lane pilot for the migration (Gmail read-only, no device dependency, so it fires unattended in the cloud).
