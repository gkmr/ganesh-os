# Running the fleet unattended - a deployment assessment

BLUF: moving a cron fleet of single-writer agents off a laptop is not a scheduler choice, it is a data-locality and auth choice. Every cloud runtime hits the same wall - it cannot reach data that lives on a personal device (a phone's health store, a Mac's reminders and message threads). So decide the data architecture first, and the runtime falls out. This doc audits the options against what the fleet actually needs, separates the one law that must survive from the file format that need not, and gives a staged path.

## The reframe: the runtime is not the blocker

The instinct is to compare schedulers - managed cloud routines vs CI cron vs a self-hosted gateway. That comparison matters, but it is second order. The first-order fact is where each agent's data lives:

- Data behind a **cloud OAuth/token connector** (mail, calendar, chat) is reachable from any unattended runner once authorized.
- Data that lives **on a personal device** (on-device health, a desktop-local task store, a device-paired messenger) is reachable only by something running on that device.

No orchestrator changes that second line. Picking a different scheduler does not teleport a cloud VM onto your phone or your Mac. So the audit below sorts agents by data locality, not by schedule.

## Connector audit - the three buckets

Sort every agent by the connector it depends on:

- **Cloud-ready** - the connector is a hosted OAuth/token MCP (mail, calendar, team chat). Authorize once, then any unattended runner can use it. Roughly the capture digests and anything file-only.
- **Token-with-work** - a third-party MCP that accepts a static token or refresh token (meeting tools, vendor device APIs). Ports, but you own the token plumbing and its expiry.
- **Device-bound** - the data lives on a personal device with no headless path: a desktop-local task/reminders store, a device-paired messenger, on-device health. These do not move to the cloud without re-platforming the underlying store.

A useful sub-finding: the agents that are pure file-or-compute (the resilience controller, the weekly reviews, the end-of-day grade) are trivially cloud-ready - they touch no external connector at all. The blockers cluster entirely in the device-bound bucket.

## The runtime matrix

Audited against the requirements that matter for an unattended single-writer fleet:

| Runtime | Laptop can be off | Recurring schedule | Cloud OAuth connectors | Device-bound data | Who hosts |
|---|---|---|---|---|---|
| Managed cloud routines | yes | yes (plus an API fire trigger) | yes, authorize-once | no - no device in the cloud | the vendor |
| Interactive cloud session (one-shot) | yes | no - manual, single task | yes | no | the vendor |
| Phone-to-desktop remote control | **no - needs the desktop awake** | no - interactive | local | yes (the local machine) | you |
| Desktop scheduled tasks | **no - needs the machine awake** | yes | local | yes (if on the right device) | you |
| CI cron (e.g. Actions) + headless CLI | yes | yes | static token only | no | the CI vendor |
| Agent SDK / managed agents | yes | yes (schedule or webhook) | token-passed | no | the vendor |
| Self-hosted VM + CLI cron | yes | yes | refresh-token | no - unless the VM is that device | you |
| Always-on device (the right OS) + native scheduler | yes - the device is the server | yes | yes | **yes** | you |
| Self-hosted agent gateway (OpenClaw, Hermes, etc.) | yes - gateway runs 24/7 | yes, with a run-lock | yes, persisted-token | only if the gateway runs on that device | you |

Read the device-bound column top to bottom. It is "no" for everything that is not physically the device the data lives on. That single column is the whole decision.

Two runtimes are disqualified for an unattended goal outright, because they need a machine awake: phone-to-desktop remote control (this is interactive remote control, not scheduling) and desktop scheduled tasks.

## Two paths

The fork is not which scheduler. It is what you do about the device-bound bucket.

- **Path A - keep the device stack.** Run the device-bound agents on an always-on instance of the right device (a small always-on machine of that OS). The "runtime" choice then collapses to which scheduler runs on that box - the native task scheduler is simplest; a self-hosted gateway buys consumer-channel routing and persisted-token MCP if you need them. Cloud routines cannot help these agents. One piece of hardware keeps the system whole.
- **Path B - re-platform the store and the bus.** Move the task store off the desktop-local app to a cloud-native store, and move the notification bus off the device-paired messenger to a token-auth channel. Now every agent is cloud-ready and managed routines win outright - no hardware, fire by schedule or API, state in a synced store. More upfront work, zero hardware at the end.

Most real answers are hybrid: Path B for the cloud-ready majority now, Path A on one always-on box for the device-bound holdouts until they are re-platformed too.

## Three lanes for the next generation

Splitting by interaction model, not just by schedule, is cleaner than forcing everything into cron:

1. **Push - scheduled and unattended.** The capture digests and file-only reviews. These run on a managed cloud routine, no laptop, fire by schedule. This is the bulk of the fleet and the easy lane.
2. **Pull - interactive and mobile.** Anything whose data lives on the phone and is best answered on demand - notably **on-device health**. The phone's on-device health store is read-only and, by design, is never exported to the cloud, so reading it is interactive-only - it cannot be made to run in a headless routine. That is a fixed architectural constraint (on-device privacy), not a feature gap to wait out. Treat these agents as things you invoke on the go in the mobile app, not as cron jobs. Two practical consequences. First, a real simplification: vendor devices (scale, ring, watch) that sync into the single on-device store are all readable through that one connector, so you read one store instead of integrating each vendor API separately - the individual vendor APIs become optional enrichment, not blockers to launch. Second, the only headless health path is a separate server-side clinical-records connector, which is a different data class (medical records, not day-to-day fitness) - reach for it only if an agent genuinely needs clinical data unattended. The scheduled piece of these agents shrinks to a nudge ("log this now") that you answer in-app where the data is.
3. **Holdout - device-bound until re-platformed.** The desktop-local task store and the device-paired messenger. Path A (always-on box) or Path B (re-platform). Pick per agent.

## Law versus substrate - keep the fence, the markdown is optional

A natural objection to several runtimes and to mobile-first operation is "but my state is plain markdown." Separate the two ideas:

- **The law is the single-writer fence plus the append-only, source-tagged change log**, enforced by an eval. This is the asset. It is what makes many autonomous writers safe and auditable.
- **The substrate is the file format.** Plain markdown was a convenient substrate, not the guarantee.

These are independent. You can drop plain-`.md` files for a mobile-syncable store and keep every bit of the guarantee by making the change log an **append-only audit table** that the same eval reads. Field ownership becomes a write constraint; the lane-fence check runs against the table instead of the file. Drop the format if mobile, laptop-free use needs it - but do not drop the discipline with it, or you have traded away the only thing that made the fleet trustworthy.

This also resolves the build-vs-adopt question below: once the substrate is negotiable, a database-backed runtime is no longer disqualified on a state-format mismatch. It is judged on its merits.

## Build versus adopt

Self-hosted agent gateways exist that bundle exactly the gaps an unattended fleet feels: a 24/7 scheduler with a concurrency lock, persisted-token MCP auth, and consumer-channel routing. Two notes on adopting one wholesale:

- The genuine win is narrow and real - **headless MCP/OAuth token persistence on an always-on host** is precisely the plumbing you would otherwise write yourself. Borrowing that primitive is sensible.
- The genuine risk is the **autonomy posture**. A gateway whose agents self-modify their own skills is at odds with a deterministic, single-writer, human-gated-on-irreversible design. Adopt the plumbing as a reference primitive; do not hand the fleet's governance to a runtime whose defaults contradict the fence.

Net: keep the architecture, treat external gateways as reference implementations of the cron-plus-MCP-auth layer, and keep the fence and change log as your own.

## Recommended sequence

1. **Authorize the cloud connectors once** (mail, calendar, chat). This unblocks the entire push lane on a managed routine.
2. **Pilot one cloud-ready, read-only agent** end to end on the managed routine plus a synced state store - prove the loop with the lowest blast radius before touching the rest.
3. **Move the push lane** (capture digests, file-only reviews) onto routines in a batch.
4. **Stand up the pull lane** for on-device data (health) as mobile-interactive, reading the single on-device store that vendor devices sync into. No vendor-API integration required to start, and no reason to wait on one - the interactive-only constraint is fixed, so design for it rather than around it.
5. **Decide Path A vs B per holdout** for the device-bound store and bus. Re-platform where the cloud payoff is worth it; keep an always-on box for the rest.
6. **Carry the fence across** whatever substrate you land on - the append-only audit and the lane-fence eval are the invariant, the file format is not.
