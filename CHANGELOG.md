# Changelog

BLUF: the dated record of how the system evolved, newest first. Entries are reconstructed from the ADR dates in [`docs/decisions.md`](docs/decisions.md) and the repo history; each links to the document that carries the full detail. Sanitized, like everything here.

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
