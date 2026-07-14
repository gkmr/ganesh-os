# Architecture map - the post-cutover end state

BLUF: one store, two lanes, one human. The store of record is a cloud task API reachable from everywhere; the hosted lane reads, analyzes, and asks; the local lane adapts channels, watches health, and relays one dataset the cloud cannot reach. A high-frequency heartbeat stamp plus a hosted sentinel makes either lane's death loud. No frontier models run on a schedule: cheap gates decide whether a mid-tier worker fires at all. This file is the map [ADR-16](adr-16-store-cutover-two-lane.md) promised; the decision record explains why, this explains what runs where.

## The map

```
                 ┌─────────────────────────────┐
                 │   STORE OF RECORD           │
                 │   (cloud task API)          │
                 │   single-writer fences      │
                 └──────────────┬──────────────┘
          API reads + writes    │    verb writes + native app
     ┌──────────────────────────┼──────────────────────────┐
     ▼                          ▼                          ▼
┌──────────────────┐   ┌──────────────────────┐   ┌──────────────────┐
│ HOSTED LANE      │   │ LOCAL LANE           │   │ THE OPERATOR     │
│ discovery diffs  │   │ channel adapter      │   │ native store app │
│ triage writes    │   │ reply verb-applier   │   │ replies from any │
│ inbox digests    │   │ monitor stack        │   │ channel, verbs   │
│ ask loop         │   │ one data relay       │   │ are the API      │
│ analysis         │   │                      │   └──────────────────┘
│ drive-folder     │   │ heartbeat stamper    │
│ state + drafts   │   │ (every cycle)        │
│ handoff          │   │                      │
└────────┬─────────┘   └──────────┬───────────┘
         │                        │
         │  heartbeat: the local applier stamps a marker each cycle;
         └─ the hosted sentinel reads the stamp hourly and alerts
            when the local lane goes dark.
```

## Store of record

The task corpus lives in a consumer task platform with a real cloud API ([ADR-16](adr-16-store-cutover-two-lane.md)). Both lanes read and write the same substrate, so lane placement is a capability and scheduling decision, not a data-access one. The single-writer fences are unchanged: priority belongs to the triage agents, dates to the sweeps, lifecycle to the reply processor, deletion to nobody without confirmation. Boards, digests, and files remain renderings of the store, never a second store.

## Hosted lane - stateless-ish readers and analysts

The hosted lane runs where the laptop lid does not matter: discovery diffs, the primary broad scan, triage writes through the store's API, the inbox digests, the meeting crosswalk, the weekly goal review, the ask loop (morning plan, evening wrap, an operator command lane), and the metrics analysis. Its tasks are stateless-ish by design: each run reads its prior state file from one hosted drive folder, does its work through connectors and web only, and writes a new same-named version carrying full history forward. Anything that needs an irreversible decision goes out as a decisions-draft handoff - a draft the operator confirms, never a send.

## Local lane - reduced to what the cloud cannot reach

The local lane shrank to three jobs plus one courier:

- **Channel adapter** - the consumer-messaging digests in, the mirrored deliveries out, with an outbox fallback when a bridge is down. One channel is read-only permanently (the GV-class reader of ADR-16).
- **Reply verb-applier** - the high-frequency loop that turns operator replies (stable handles + a small verb set) into fenced writes on the store.
- **Monitor stack** - the catch-up controller, the fleet-health watchdog, the bridge-health check, and the extension-patch check.
- **Data relay** - one scheduled copy of an on-device health export into the hosted drive folder, so the hosted analyst can read what only the device produces.

## Heartbeat

Liveness is asymmetric on purpose. The local applier already runs every cycle, so it doubles as the stamper: one run marker per pass, nearly free. The hosted sentinel reads that stamp hourly and alerts when the local lane goes dark - the watcher lives on infrastructure that does not share the watched machine's failure modes. The local watchdogs cover the reverse direction. Neither lane is trusted to report its own death.

## Model tiering

Two tiers, no exceptions on a schedule: cheap **gates** and mid-tier **workers**. A gate (the cheapest model) answers one question - is there anything to do - and exits; a worker (mid-tier) runs only when the answer was yes or the task always has real work. Frontier models are reserved for interactive sessions, never pinned to cron. The pins are explicit per task, and a controller audits the tiering rather than trusting it.

## Token diet

Four patterns keep the fleet cheap enough to run forever:

- **One-lane law** - every mission runs in exactly one lane; the other lane's copy is disabled, not duplicated. Two lanes doing the same read is drift, not redundancy.
- **Ping diet** - per-run success pings are dropped in favor of one daily heartbeat; only actionable sends, boards, failure pings, and files reach the mirror channel.
- **Fast-exit** - high-frequency tasks are gated no-ops: read the delta, find nothing, exit before loading anything heavy.
- **Cadence shoulders** - schedules run inside waking shoulders (early morning to late evening) instead of around the clock; nothing burns tokens while the operator sleeps.

See [`decisions.md`](decisions.md) for the running record and [`system-map.md`](system-map.md) for the agent-level view.
