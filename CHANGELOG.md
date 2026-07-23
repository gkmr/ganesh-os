# Changelog

BLUF: the dated record of how the system evolved, newest first. Entries are reconstructed from the ADR dates in [`docs/decisions.md`](docs/decisions.md) and the repo history; each links to the document that carries the full detail. Sanitized, like everything here.

## 2026-07-23 - v7.4: the feed goes quiet on purpose
- The signal law: silence by clock is forbidden, silence by no-new-content is the default.
  Status-class agents send only when there is something new to say; a silent run still writes
  its state file and a run marker, so debugging moved from the chat into files. The trigger for
  the redesign was blunt and external - an outside reader called 48 hours of the feed "noisy and
  not actionable" - and the fix was structural, not cosmetic ([delivery-law](docs/delivery-law.md)).
- The channel split: the operator's main chat now carries only what he acts on (nine daily
  anchors plus true alerts); a second ops channel carries the engine room - audits, self-tests,
  incident notes, operator checklists. The relay routes by an explicit ops flag in the payload
  or an `.ops.` marker in a queued filename, and the operator pinned a one-card "message diet"
  contract listing exactly what arrives where ([delivery-law](docs/delivery-law.md)).
- The sent-log: the relay now appends every outbound send - kind, destination, size, a short
  head - to an append-only store log with rotation. The chat stopped being the audit trail;
  the log is. A primacy audit reads it weekly to enforce that the primary channel carries the
  max of every surface (a richer secondary channel is now a named defect class).
- The duplicate-folder incident: a local task re-created the store's root folder by name,
  and every by-name lookup went nondeterministic - the sent-log froze and health payloads
  filed into the wrong tree for two days. Fix: the relay pins the store root by immutable
  folder id, never by name; the stray folder was quarantined and the stranded files rescued
  with history intact ([decisions](docs/decisions.md)).
- Rituals became habits, not tasks: device-time routines (hydration, posture, wind-down)
  moved from dated tasks to native habit objects with device reminders, excluded from triage,
  boards, and overdue counts by standing law - ending a class of daily nag that a failed
  migration chat had been generating. The migration chat itself was retired
  ([decisions](docs/decisions.md)).
- The wellbeing layer graduated from summaries to computed KPIs: recovery, strain, and sleep
  scores calculated in-run from the operator's own rolling baselines (never population norms),
  each with a one-line plain-language "why" naming its drivers, one personalized coaching call
  per morning, and a propose-only protocol for moving a booked hard session on a red morning.

## 2026-07-19 - v7.3: the plane starts listening, and the day gets a voice
- The delivery plane gained its third direction: data in. The operator's phone pushes its Apple
  Health export straight to the serverless relay, which files dated JSON into a store inbox
  folder - no laptop in the path; the old local export lane demoted itself to fallback
  ([delivery-law](docs/delivery-law.md)).
- Auth moved to the layer that can enforce it: the exporting app cannot carry a body secret and
  the serverless layer cannot read headers, so the health branch authenticates on the query
  string while every other caller keeps the body-secret contract.
- The wellbeing layer became a daily bookend on real data: a guaranteed morning day-starter
  (session or a concrete push to train anyway, week-over-week trend arrows, a readiness note),
  an evening "did you train today?" line with the weekly count, and a Sunday deep-dive with
  four-week charts. Tone is law: celebrate streaks, stay kind on down weeks, never scold, never
  guess ([ARCHITECTURE](ARCHITECTURE.md)).
- The day got a deliberate voice: a warm funny wake-up line, a deadpan shower thought, a calm
  wind-down close - three registers, freshly invented daily, never repeated.
- Ingest monitoring ships with an onboarding state: quiet-for-two-days flags, but a lane that
  has never fired reports "awaiting first export," not failure.
- A context bridge closed the last blind spot in the personal-pulse layer: interactive
  conversations and scheduled runs append dated one-line operator-side facts to a rolling store
  file the pulses read as an extra channel; entries fade after two weeks and never leave the
  private store.

## 2026-07-17 (later) - v7.2: the reply loop closes at conversation speed
- A nightly review board turns the whole task store into a numbered decision list (all
  true-overdue, tomorrow's docket, a stale-rotation cohort, an undated-backlog sample), with a
  persistent rotation so the entire backlog cycles through human eyes over weeks - the store gets
  fresher instead of staler ([delivery-law](docs/delivery-law.md)).
- Reply latency collapsed from an hour to conversation speed: the relay poller now applies the
  simple grammar (done, priority, push/park with real dates) deterministically on its 5-minute
  tick via the task-store API, confirming back into the chat; staggered applier lanes catch
  judgment calls within fifteen minutes. Live-measured simple round trip: 3m40s.
- The board-to-relay contract is a machine-readable handle map in the store; operator-dated
  decisions carry a protected tag no automation may re-date.
- The envelope leak: a correct fallback wrote its transport envelope (secret included) into the
  outbox as content and the drainer posted it verbatim. Fixed twice - the rule now says the
  fallback carries only message text, and the drainer independently detects envelopes, extracts
  the message, and redacts secrets. Guards that matter exist once as instruction and once as code.
- Architecture diagrams added across README, ARCHITECTURE, and the delivery-law doc (delivery
  plane and reply loop, rendered natively on GitHub).

## 2026-07-17 - delivery law v7.1: law moves into the trusted layer
- The self-injection incident: a parity doctrine block distributed via synced skill files was
  refused by the fleet's own agents as suspected injection - wrong about the source, right about
  the shape. Delivery law relocated from tamperable skill files into every task prompt plus one
  canonical store file that wins on drift; skill-file "supersede" blocks declared void by the law
  itself ([delivery-law](docs/delivery-law.md)).
- The hosted push leg went cloud-native: a serverless relay with real egress as primary, the
  store outbox as automatic fallback - a hosted task can no longer believe delivery requires the
  local machine, and silent delivery skips are outlawed (the outbox write always succeeds).
- Every hosted scheduled trigger deleted and recreated carrying the law verbatim; two new scan
  tasks added; the DST-guard's id table rebuilt against the live roster with a report-not-guess
  rule for stale ids.
- Drifted twin scans ended structurally: one became a thin alias delegating to the other -
  don't reconcile duplicates, delete the duplicate class.
- Drafts demoted: email drafts are no longer a delivery surface for anything the operator must
  see; machine-state drafts remain for appliers only.
- Temporal law: stamp TODAY as the first action, catch up missed slots multi-day; plus a
  stale-posting guard after an eight-month-old listing headlined as net-new.
- Reply capture converged on one poller appending to an inbox file with offset state - the
  single-consumer fence, now structural instead of behavioral.

## 2026-07-16 - delivery v7.3: parity's failure modes are ownership problems
- Universal two-channel parity with an html card on every push; zero per-task exemptions.
- CLAIM-BEFORE-SEND mutex (marker created before sending) after redundant transports raced a
  backlog clear into duplicates; ONE-PATH LAW (direct tool OR outbox per leg, never both) after
  a fallback fired alongside its primary.
- Marker/stub hygiene: bookkeeping markers and sub-1KB stubs never delivered as content.
- Content-ownership map: board owns the full list, triage is delta-only, inbox digests carry
  comms handles only, sweeps report actions + pointer - one full description per item per
  half-day; everything else is a handle.
- Label-truth eval after a cloud run stamped raw UTC as local time on its own header - the
  calendar timezone-label bug, relocated to the agent's own clock.
- Quiet-hours retirement completed: buried clause-level gates survived the doctrine change for
  two days; a prompt-lint eval purged them clause by clause. Explicit prompt text beats doctrine
  references, and only an eval proves a purge.
- Audit-to-apply loop exercised end to end on production: the nightly audit drafted the patch,
  a human-invoked apply pass found and fixed the final straggler with read-back verification.

## 2026-07-14
- Delivery plane: store-and-forward outbox for the hosted lane, an always-on relay, delivered-markers as the idempotency primitive, and the relay-in-the-store lesson ([architecture-map](docs/architecture-map.md#the-delivery-plane-added-after-the-egress-audit)).
- Orchestrator/worker/advisor mapping and the end-state dependency map: the local machine is a peripheral, not a dependency ([architecture-map](docs/architecture-map.md)).

## 2026-07-13
- Lane-fit law: cloud eligibility is part of the prompt contract, after the blind-copy audit found five hosted tasks degrading politely on every run ([architecture-map](docs/architecture-map.md#the-lane-fit-law-added-after-the-blind-copy-incident)).
- Lane-fit follow-through, same night: audit over calendar-gates, one tiering writer, pointer stubs for superseded docs, honest partial coverage, a telemetry floor.
- ADR-17: the store-of-record cutover to a cloud task API, the two-lane end state, the GV-class read-only reader, and the injection-pause incident ([adr-17](docs/adr-17-store-cutover-two-lane.md)).
- Architecture map published for the post-cutover end state; the store-cutover ADR renumbered to 17 ([architecture-map](docs/architecture-map.md)).

## 2026-07-09
- ADR-16: git-backed Markdown as the state store for unattended, mobile-first operation; the fence and change log carry across untouched ([decisions](docs/decisions.md)).
- Schedules layer and the inbox-usps routine pilot: the first agent scaffolded for the unattended lane, with daily SMS and Telegram delivery.
- ADR-14: one store, three channels - connector registry, dual-engine cutover, HITL calendar lockstep ([adr-14](docs/adr-14-one-store-triple-channel.md)).
- One-shortlist S# board and verb set, OK-gate and decide-set micro-gates, success-ping diet, boot-core compilation ([one-shortlist](docs/one-shortlist.md)).
- Catch-up controller marker-table regeneration: a rename must rebuild the freshness table in the same change (ADR-15 item 8).

## 2026-07-08
- Channel pause and re-entry ladder: an at-risk third-party channel is fully paused silently and re-enters only via a verdict-gated ladder (ADR-13 addendum).
- Inbound auth gate: a public bot executes commands only from a pinned chat id; every other sender is logged, never executed.
- Two-engine law: a load-bearing engine is never swapped in place; the replacement runs alongside until a runbook-gated cutover (ADR-15).

## 2026-07-07
- ADR-13: channel strategy v2 - official-API-first channels, mirrored delivery, outbox senders, dual-store state, the concurrent-edit protocol, the HITL board ([adr-13](docs/adr-13-channel-strategy.md)).

## 2026-07-04
- ADR-12 documented: project-prefixed task ids, the sys- monitoring layer, and the delivery contract, adopted incrementally 2026-06-24 through 2026-06-29.

## 2026-06-29
- USPS Informed Delivery mail and package digest agent added (later renamed inbox-usps).

## 2026-06-24
- Fleet-wide taxonomy rename to project-prefixed ids; the sys- cohort (fleet-health watchdog, catch-up controller, overdue watchdog) stood up above the producing fleet; delivery and notification unified into one contract (ADR-12).

## 2026-06-22
- ADR-11: two-class failure model - bounded in-run retry-then-degrade, plus an external catch-up controller that re-fires missed runs from run markers.

## 2026-06-20
- ADR-09: determinism layer - lifecycle hooks that block a bad write before it lands, gated in CI.
- ADR-10: gather once, fan out from disk - one gather wave writes dated snapshots, roughly halving morning connector fan-outs.
- First-principles audit and the applied-learnings doc.

## 2026-06-16 to 2026-06-20
- Initial public release: the single-writer architecture for a personal multi-agent system - the lane-fence eval, hooks, sanitized agent prompts, the ADR log, and the portfolio site.

## 2026-07-15 - control plane merge + audit loop
- Merged the two ops dashboards into one Fleet Control view: live roster, group runs with preset
  bundles (dependency-ordered), pause/resume, skill-parity column, nightly audit verdict panel.
- Nightly output audit added to the watchdog: lints the day's artifacts on both lanes, proves
  quiet-contract silences against watermarks, and auto-drafts a verbatim fix patch per defect;
  applying stays human-invoked (apply-audit-patches).
- Delivery contract v6: html-only artifacts to the push channel, full two-channel parity,
  anchored push budget (no-news = no push), HITL proposal manifest (PR# ok/no/later), and a
  single-consumer fence on the reply-polling API (a second consumer silently steals updates).

## 2026-07-15 (later) - the eval system catches its first real bug, same day it shipped
- The in-session smoke run of the new eval suite flagged a P-check failure: a second consumer on
  the single-consumer reply-polling API (the food logger still polled directly), which meant one
  channel's replies were being silently lost. Patch drafted by the audit, applied with read-back,
  regression baseline updated. Lesson recorded: a fence is only real once an eval enforces it -
  the same rule had been written in doctrine for two days while the violation sat live.
- Second smoke finding: a one-time task created minutes before its fire time missed dispatch
  entirely. Operational floor added: one-times get >=15 minutes of lead, or a manual first run.
