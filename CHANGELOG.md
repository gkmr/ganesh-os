# Changelog

## 2026-09-09
- Relay v7.9.4: self-diagnosing reply lane, server-side Supra board read every 6h, bootstrap proof line, gap report MAIN-only, guard note names the lane.
- Relay v7.9.5: self-heal keyed on update-counter evidence (webhook set, skipped queue, update_id jump > 3); 36h watchdog line to OPS; update-jump mirror rows.
- Lanes: dashboard weekday gate + PM text law; pipeline-funnel K1-K5; weekly-update second fire = retry (cron 2 15,17 * * 5); slot-watchdog reply-lane, Supra and iMessage-watcher checks; reply-applier silent-inbox signal; job scan reads supra-board-latest.json; food-log iMessage carries https and mfp:// links.
- Five Opus lanes pinned to claude-sonnet-4-5: job scan, weekly-update drafts, network-refresh, program-ingest reminder, tick-snapshot.
- Mac: imessage-outbox watcher (launchd com.ganesh.imessage-outbox) live; mtg-briefer legend removed.
- Docs: fleet map rebuilt in poster form.

## 2026-09-04
- Fleet common law appended to 34 lanes; false SEV-2s closed; evening-wrap and dashboard delivery laws; health dashboard v4 template; published operator-changes folder.

# Changelog

BLUF: the dated record of how the system evolved, newest first. Entries are reconstructed from the ADR dates in [`docs/decisions.md`](docs/decisions.md) and the repo history; each links to the document that carries the full detail. Sanitized, like everything here.

## 2026-08-19 (night) - v7.7.2: model tiering goes risk-based, and the fleet gets one model policy
- The whole fleet moved to the newest frontier model in one pass, then deliberately tiered
  back down by risk, not by convenience: judgment surfaces (both inbox digests plus the
  midday check, the role scanner and the weekly accountability drafts, every health and
  coaching anchor, the triage writer, the boards, the command lane) stay on the frontier
  tier under monitoring; mechanical preparers (the two write-only sweeps, the fallback
  sweep, the weekly delivery audit, the meeting briefer) run the mid tier; pure bookkeeping
  (the DST guard, the overdue watchdog, the nightly ops ledger, the reply applier, the slot
  watchdog) runs the small tier. The operating rule: anything that reads untrusted content,
  touches money or health, or writes prose the operator sends as himself earns the frontier
  model; anything whose output is a table, a diff, or a cron swap does not. Spend is watched
  daily by the fallback sweep's receipt scan, so the tiering is a measured decision, not a
  guess.
- The weekly accountability update now delivers the complete text of all three audience
  variants to the operator's phone (one message per audience, plus the combined card),
  replacing summary-only delivery - the drafts meet the operator where he reads, not where
  they were written.
- Permission posture made explicit: 18 of 24 scheduled tasks run fully auto-approved; the
  remaining six run under classifier auto-approval and have executed unattended without a
  single block. Permission mode is stamped at task creation, so the ledger now watches for
  the first permission stall as the trigger to recreate rather than churning task ids
  preemptively (id churn breaks the DST guard's trigger table - a known failure class).

## 2026-08-19 (later) - v7.7.1: the visual walkthrough, and three more incident laws
- docs/how-it-runs.html: an animated, executive-facing visual walkthrough of the whole
  system - the one-way loop, a day in the machine, the adaptive tone engine, the layered
  health stack, the reliability culture, and the human-sovereignty guarantees. Sanitized
  to architecture and patterns; written as the 3-minute tour for a reader deciding whether
  the operator can design the org AND write the code.
- Three incident laws from the same night's ops ledger: MARKER-FIRST (two guards died
  silently before their only write; every guard now logs "run started" before doing
  anything, so a half-written marker names where a run died), COURIER SELF-AUDIT (a courier
  skipped two undelivered cards; every run now records "delivered N" or "nothing pending
  (checked)" and the ledger flags the line's absence the same night), and REAL-LINK (a
  status message referenced its own artifact with a dead link; every reference now carries
  its captured URL or renders as plain text). The ops ledger also gained a corrected
  roster, a one-line nightly heartbeat to the main feed, and a stale-reply check so an
  unapplied human reply can never sit open unnoticed again.

## 2026-08-19 - v7.7: the board learns the calendar, and the quotes learn the operator
- State-aware quotes. The weekly quote generator still writes one program per week, but the
  three daily-composed slots (wake, workout, wind-down) now each carry three variants of the
  same day's thought - charged, steady, restore - and the daily consumers select the variant
  matching that day's actual state: recovery band, sleep score, strain and workout load, the
  mood index, and above all the operator's own words. A stated feeling outranks the sensors;
  an explicit "red day" reply outranks everything and reshapes every remaining quote,
  session suggestion, and coach's call for the day. Positive-state law is binding: every
  variant in every band encourages; a bad number is never scolded, always reframed as
  agency, and the restore register dignifies rest as the strong move - never "push
  through". Preambles are composed fresh daily and flavor in the day's shape (calendar
  density, the planned workout, meals so far, tonight's plans) without ever touching the
  chosen line. Watch-applied lines stay weekly and are written state-robust, because the
  wrist cannot see the morning's data.
- The domains board became calendar-true. Spec v2 adds a social-and-personal domain, deepens
  the job domains to ten rows, and writes the calendar-sync law: a task the operator has
  committed calendar time to is pinned to the top of its domain, and any time-block placed
  on the calendar writes back to the task store (top priority, due that day, a sync tag) so
  both systems tell the same story. Overdue-versus-blocks ordering became an operator-
  confirmed choice with remembered preferences, not a heuristic - the board asks once,
  stores the answer, and only re-asks on genuinely new contention.
- Plan far, write near. The nightly board now closes with a seven-day week-ahead view -
  fixed commitments, planned work, social plans, weekends always - but writes nothing
  beyond tomorrow; blocks materialize day-of through the morning anchor or an explicit ask.
  Thirteen social and travel commitments were captured as dated holds with booking
  deadlines the same evening.
- Self-healing became historically honest. After a lane came back from a multi-day gap
  having resumed only "current" work, the backfill law went fleet-wide: any lane returning
  from a dark window wider than a cycle reconstructs the window it missed - widened
  searches, diffs against the last good snapshot, seen-logs stamped with real dates - and
  the watchdog now drops backfill flags into a dead lane's state file so the healed lane
  finds its debt waiting.
- Four production defects from the first morning of the new daily shape were closed with
  both remediation and permanent law: document cards now ship byte-verbatim from the store
  with a decode-verify before every send (a re-encoded card had reached the phone
  unopenable), the newsletter digest earned its own card, the morning anchor learned to
  wait for the overnight health export instead of declaring the night unmeasured minutes
  before the data landed, and package tracking moved to the midday scanner with a same-day
  pass. The alarm-less-reminder incident that killed the medication reminders was written
  into canon with its guards: an API-created reminder has no alarm unless one is passed
  explicitly, silent-by-design is a valid protected state, and a sweep may never complete
  a recurring reminder for being alarm-less.

## 2026-08-17 (later) - v7.6.1: the second signal pass, and one reminder per fact
- The watchdog went live and earned its keep within its first ten minutes: a correct
  reply-lane staleness alert, a clean self-test, and then the real diagnosis - the inbound
  poller had never been broken at all. Update-id continuity proved zero messages had reached
  the bot in the silent window; the lane was idle, not dead. The correction was owned
  publicly: the earlier "six-day outage" read had the right symptom and the wrong cause,
  and only an instrumented poller could tell the difference. It now can.
- A second signal-to-noise pass closed four gaps the first one created or missed: the
  morning master shortlist was retired (the day brief's today-list had made it a duplicate
  voice 75 minutes apart); the evening inbox digest joined the morning one in secretless
  split delivery (the last untrusted-content reader still holding credentials - the exact
  class behind three refusal incidents); the nightly board became the evening's single
  voice, folding the inbox bottom line and tomorrow's draft into one message; and consumed
  operator replies can no longer boomerang back as proposed board rows.
- Status inflation got a structural fix: the weekly accountability update now carries an
  applied / not-applied truth table where "applied" requires documentary evidence, after a
  scan called an application "pending" that had never been submitted. A task existing is
  not progress. The work-in-progress limit was reconciled against the live task store the
  same evening - one keystone had died into a tombstone while the prompt still counted it.
- One-reminder-per-fact became law: a reminder lives in exactly one store. The watch-facing
  store wins for wrist nudges, the platform's own medication surface wins for meds, and the
  task store keeps tasks and content records, never duplicate alarms. The duplicate med
  mirrors were deleted with their clinical content preserved into a canonical record file
  the health lanes read.
- Deep links became law too: anything the operator would tap through to - a task, a posting,
  an email thread, a chat with a person - must carry its real link, with a hard
  no-fabrication rule. The job scan additionally got a link-completeness law (every role
  named anywhere links to its posting, passes included) and a transport-readability law
  (only messenger-supported tags in the text leg; text and card always in sync).

## 2026-08-17 - v7.6: the operating shape, and the watchdog that lives outside the walls
- The week exposed the system's deepest structural flaw: every monitor lived inside the
  environment it monitored. When the cloud execution environment died for three days (the
  second multi-day outage in ten days), schedules kept firing into a dead room, the watchdogs
  died with their patients, and the delivery ledger simply stopped - with no one to say so.
  The fix moved the alarm outside the walls: the relay (the one component on independent
  infrastructure, which survived every incident) now watches the delivery ledger's pulse and
  messages the operator directly when the fleet goes silent. A monitor is only as available
  as the failure domain it does NOT share ([first-principles](docs/first-principles.md)).
- A second silent failure hid inside a green checkmark for six days: the inbound reply poller
  treated an API-level error response identically to "no new messages" and returned quietly,
  so every execution showed Completed while the operator's replies fell on the floor. The
  poller now treats not-ok as failure, counts consecutive failures, and alerts; a cross-check
  alerts when outbound flows but inbound stays frozen (the second-consumer case, where the
  poll "succeeds" empty forever). Lesson for the ledger: a run that completes is not a run
  that worked - instrument the distinction ([applied-learnings](docs/applied-learnings.md)).
- The daily surface consolidated into an operating shape the operator chose option by option:
  one morning brief (health anchor + inbox bottom line + today's shortlist), one evening
  bookend (board + tomorrow's draft), midday deltas kept deliberately, and pre/post-meeting
  briefs for every real meeting - budget-conscious but chosen with eyes open.
- Two inversions of authority shipped with it. HUMAN-EDIT-WINS: the task store is the source
  of truth and the operator edits it by hand through deep links; any change the fleet did not
  make wins instantly and freezes that item against automated re-tiering for a week. And
  AUTO-BLOCK: the morning brief places a handful of color-coded focus blocks on the calendar
  for the day's top items - automation proposes the day, the human's edits reshape it, and an
  "unblock" is honored as the instruction it is.
- The weekly reviews learned to heal themselves: both Sunday reports now fire daily behind a
  silent guard - run only on Sunday or when more than a week has passed since the last
  success, exit wordlessly otherwise. A missed Sunday self-heals Monday morning instead of
  waiting a week. The slot watchdog keeps a one-day-later backstop and learned the hard
  lesson of the outage week: an alarm that detects a failure and stays silent has itself
  failed - alert delivery is non-optional, with a secretless fallback path.

## 2026-07-28 (later) - v7.5.2: names are still not identities
- The ghost folder struck twice. The morning inbox digest resolved the outbox folder BY NAME,
  and the name search returned the quarantined duplicate tree from the v7.4 folder incident -
  a folder no deliverer polls. The digest ran perfectly, wrote its artifacts, verified nothing,
  and reached zero endpoints. Twelve other lanes delivered normally all morning, which is what
  made it invisible: per-lane success hides a single-lane black hole.
- The safety net earned its keep: the daily fallback sweep detected the stranded digest within
  two hours, delivered its top three urgent items, and named the exact wrong folder - the first
  real catch by a layer built for exactly this. The stranded artifacts were rescued into the
  real outbox by hand and delivered end to end the same day.
- The law generalized from the instance to the class ([delivery-law](docs/delivery-law.md)):
  ADR-18 had pinned the RELAY's root folder by immutable id, but every other writer kept
  resolving by name - a rule enforced at one component recurs at every component that shares
  the anti-pattern. Canonical law now binds every writer on every lane: all store folders
  by immutable id, the quarantine tree is a banned write target, and a READ-BACK rule makes
  "delivered" mean verified-parent-id, not wrote-somewhere.
- Three watchers enforce it: the fallback sweep checks the ghost tree every day and
  auto-rescues anything found there (naming the producer); the weekly delivery audit fails
  any task that wrote there in the trailing week; and the operator approved deleting the
  ghost tree outright - the durable fix is that there is nothing left for a name search
  to find.
- Also in this release: the morning anchor gained a travel mode (away days swap the home
  training block for a hotel-friendly suggestion, zero guilt, auto-detected from the
  calendar); the quote feedback loop went live end to end (bare emoji reactions in the chat
  are captured to a store file the anchors read to tune their humor register, seeded with
  the operator's stated taste); and one-shot travel-day briefs bracket the week's trip.

## 2026-07-28 - v7.5.1: the sixth guard, and the feed learns to be funny on purpose
- The sixth relay guard shipped live within a day of the fifth: a queued message whose first
  line was a transport header (the front-matter leak - YAML-ish routing metadata that the
  JSON-only envelope detector waved through) posted 5KB of plumbing to the operator's main
  chat. The content guard now dead-letters any queued text opening with a routing-header
  prefix. Same pattern as the other five: the guard sits in deterministic code, at the exact
  line the failure crossed, shipped after one production occurrence
  ([delivery-law](docs/delivery-law.md)).
- The quote layer became a format law: every quote in every anchor ships as a two-line bit -
  a playful one-line preamble in the system's own steering voice, then the quote flagged with
  a speech-bubble glyph - and rides above the fold, never behind a mobile client's "read more"
  collapse. The trigger was operator forensics: the daily quotes HAD been sending, at message
  tails, and were provably unread. Placement is a delivery property, not a nicety.
- The morning fold completed the bookend symmetry: both daily sweeps are now write-only
  preparers (state files, proposals, calendar events) while exactly one anchor per bookend
  speaks. One voice per morning, one per evening.
- Notification policy became enforceable end to end: every muted-class cloud task was
  recreated with notifications disabled at the scheduler level - the registry column is now
  baked into the trigger objects rather than hoped into device settings. The scheduler's
  update API cannot change notification settings on an existing task, so the honest mechanism
  is delete-and-recreate; the DST guard's id table was rebuilt in the same pass (it had been
  carrying a dozen dead ids from earlier recreations - a rename-tracking lesson relearned).
- The roster got a spring clean: every disabled or retired scheduled task (superseded
  watchers, redundant applier lanes, spent one-shot reminders) was deleted outright, taking
  the scheduler list from fifty-plus entries to twenty-two live, family-named tasks. A list
  the operator can read at a glance is itself a monitoring surface.

## 2026-07-27 - v7.5: the relay grows reflexes, and the fleet gets a family tree
- Relay hardening shipped live, five guards in one release, each answering a production failure
  ([delivery-law](docs/delivery-law.md)): a script-level lock (overlapping timer runs had posted
  the same digest twice, sixteen seconds apart); a run time-box that ends a pass gracefully before
  the platform's execution ceiling (timeouts had been abandoning the outbox mid-sweep); an archive
  sweep that moves delivered outbox pairs older than a day out of the scan path (the backlog had
  been re-scanned on every five-minute tick); a content guard that dead-letters binary or
  document-format payloads queued as text (a doc file had passed a naive size check and posted as
  junk); and an eighteen-hour staleness gate that collapses an aged backlog into one ops-channel
  summary instead of a flood of stale sends.
- The message diet converged: nine anchors became six. The morning plan merged into the
  day-starter (one bookend, not two), the food ask folded into the evening wrap, and the evening
  sweep went write-only - it files its state and proposals, and the wrap speaks for the evening.
- The fleet got a family tree: every scheduled task renamed to a "family · task (lane)" scheme,
  every push now opens with an emoji plus its family/task tag, and a canonical registry in the
  store maps each task to its lane, slot, and notification setting. A push can be traced to the
  task that sent it from its first characters, and notification policy became a written law
  instead of a per-device accident.
- A slot watchdog joined the sys- cohort: it reads the fleet's run markers and reports missed
  slots to the ops channel, so the signal law's silence stays provable end to end.
- Quota economy: redundant lanes disabled (staggered appliers trimmed to one, the single-company
  careers watchers absorbed into the primary scan, the separate morning plan retired), tens of
  scheduled sessions per day removed - motivated by a spend-limit incident in which the fleet ran
  dark for a day: triggers fired, nothing wrote ([decisions](docs/decisions.md)).
- The weekly primacy audit ran end to end on the sent-log and found thirteen violations on the
  local message lane - the primary channel had been carrying less than a secondary on eight task
  classes. Dual-write patches were queued as an operator checklist; the audit class works.
- The goal layer revived: the first weekly goal review after five silently missed Sundays (the
  task lived on the local lane and the laptop was closed). Rebuilt cloud-native; its first run
  produced five improvement proposals and the operator applied all five in a single reply.
- Parity became re-applyable: fleet doctrine now lives in one canonical store file plus an
  idempotent patcher script stored beside it, because the synced skill library reverts local
  edits on every re-sync. Parity that can be wiped by a sync must be one command to restore.

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
