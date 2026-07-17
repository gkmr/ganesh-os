# Changelog

BLUF: the dated record of how the system evolved, newest first. Entries are reconstructed from the ADR dates in [`docs/decisions.md`](docs/decisions.md) and the repo history; each links to the document that carries the full detail. Sanitized, like everything here.

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
