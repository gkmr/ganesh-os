# Telegram delivery audit — 2026-09-04 .. 2026-09-08

Source files (Drive → local mirror dir): telegram-mirror-2026-09-0{4..8}.jsonl, telegram-sent-log.jsonl, telegram-inbox.jsonl, outbox-listing.json. All lines parsed with json.loads (0 failures in this batch; regex extraction fallback was wired in but never triggered).

## 0. Key findings

- **No inbound at all.** Zero `dir=in` rows in all five mirror files and the inbox file has nothing after 2026-09-03 20:20Z (a ❤ "keep" reaction). Either GK sent nothing 9/4–9/8 or the reply lane stopped recording; the 9/8 slot-watchdog itself flagged "telegram-inbox.jsonl silent 4.5d".
- **9/4 (Fri) was the bad day:** day-starter 11:05 never fired (delivered 19:11, +8h), triage/inbox-digest/job-scan all absent, weekly-update absent; ops-run-ledger scored it 8✅/11❌ of 32, with a ~22-slot command-lane gap. 9/5–9/8 recovered to near-full coverage.
- **Recurring misses:** triage 12:50 slot never appears as text (only the triage-qa AM html doc at ~11:17); the triage-qa PM doc lands ~01:16Z next day (+147 min vs 22:50) every day; inbox-digest PM html is consistently delivered the *next* morning (9/6→9/7 17:41, 9/7→9/8 11:28) or at 01:18Z; job-scan PM missing 9/4, 9/5, 9/8; evening-wrap missing 9/5; day-starter 23:05 missing 9/4 and 9/7; food-log snack 9/5 dead-lettered (doc-typed .tgmsg) and dinner 9/7 missing.
- **relay-guard refusals (doc-typed queue files):** referrals-2026-09-04.tgmsg (9/4 14:01Z) and food-log-2026-09-05-snack.tgmsg (9/5 21:36Z) — both dead-lettered. Sent-log shows the same failure class on 9/2 (evening-wrap parts 1+2), 9/3 (clarify-reaction-2502, evening-wrap-2026-09-03).
- **Drive/relay outage 9/5–9/6:** ganesh-os-relay Apps Script returned "Page Not Found"/error pages; job scans down 9/5 PM; SEV-2 "fleet state unverifiable" raised 9/7 01:47Z; recovered by 9/7 11:48Z catch-up.
- **Outbox (9/8–9/9 only):** 62 files, 0 Doc-typed, 0 undelivered payloads, all 30 `.delivered` bodies = `ok`, max create→deliver lag 5.2 min. Nothing from 9/4–9/7 remains in the folder.
- **No mojibake** (â / Ã / ðŸ) anywhere in the five mirror files; emoji are clean UTF-8.

## 1. Schemas

**Mirror line (dir=out):** `ts` (ISO-8601 UTC, e.g. 2026-09-04T11:36:44.367Z), `dir` (out|meta — no `in` rows exist in any of the 5 files), `chat` (main|ops), `kind` (text|document), `mid` (Telegram message id, int), `family` (health|ea|sys|job|mtg|null), `lane` (e.g. food-log, day-starter; null for un-tagged sends), `task_id`, `project_id`, `reply_to` (all null in this batch), `text`, `doc_name` (for kind=document), `chars`, `chunks`, `sha256`, optional `silent` (bool).

**Mirror line (dir=meta, kind=gap-report):** `ts`, `dir`, `kind`, `sig`, `gaps` ({main:[mids], ops:[mids]}), `note` ("message_ids in today's range the relay neither sent nor received; human messages are expected here").

**Sent-log line:** `ts` (ISO UTC), `kind` (text|document), `dest` (main|ops), `chars`, `head` (message text, full), `mid` (missing on 29/301 rows), optional `family`, `silent`, `edited`, `people`, `rows`, `file_id`, `ms`. There is NO `lane` field and NO `ok`/`error` field in the sent-log; lane is only inferable from the `[family/lane]` tag at the head of `head`.

**Inbox line:** `update_id`, `ts` (UNIX epoch seconds, int), `text`, `from` (Telegram user id 8957631128), `applied` (bool, missing on 3 rows), optional `chat` (main|ops), `kind` (reaction), `emoji`, `message_id` (the message reacted to), `family`, `seed`.

## 2. Per-day counts, lanes, last out, gaps

| day | out MAIN | out OPS | in | meta | distinct lanes that sent | last out (UTC) | ends early? |
|---|---|---|---|---|---|---|---|
| 2026-09-04 | 19 | 6 | 0 | 4 | -/mac-fleet, -/relay-guard, ea/decisions, ea/evening-wrap, health/day-starter, health/food-log, job/pipeline, mtg/post, mtg/pre, sys/command-lane, sys/fallback-sweep, sys/ops-run-ledger | 2026-09-05 01:49Z (file); last row dated 2026-09-04: 23:27Z | no |
| 2026-09-05 | 38 | 1 | 0 | 3 | -/relay-guard, ea/decisions, ea/triage, health/day-starter, health/food-log, inbox/mid, mtg/post, mtg/pre, sys/ops-run-ledger, sys/overdue-watchdog | 2026-09-06 01:51Z (file); last row dated 2026-09-05: 23:26Z | no |
| 2026-09-06 | 34 | 6 | 0 | 10 | -/mac-fleet, board/nightly-board, ea/evening-wrap, health/day-starter, health/food-log, health/program-ingest, inbox/mid, mtg/pre, sys/catch-up, sys/ops-run-ledger, sys/overdue-watchdog, sys/relay-canary | 2026-09-07 01:47Z (file); last row dated 2026-09-06: 23:47Z | no |
| 2026-09-07 | 29 | 3 | 0 | 9 | -/mac-fleet, ea/decisions, ea/domains, ea/triage, health/day-starter, health/food-log, job/network-refresh, mtg/pre | 2026-09-08 01:48Z (file); last row dated 2026-09-07: 23:11Z | no |
| 2026-09-08 | 39 | 3 | 0 | 9 | -/mac-fleet, ea/decisions, ea/evening-wrap, ea/reflect, ea/triage, health/day-starter, health/food-log, mtg/post, mtg/pre, sys/canary, sys/catch-up, sys/overdue-watchdog, sys/slot-watchdog | 2026-09-09 01:26Z (file); last row dated 2026-09-08: 23:17Z | no |

Note: each daily file spills into the next UTC day (rows up to ~02:30Z next day; PM dashboards/ops-run-ledger). "last out" shows both the file's final out row and the last out row stamped with the file's own date. Every file's first out row is ≥11:00Z (no rows 03:00–10:00Z), which is consistent with the ET overnight quiet window.

**Gaps >4h between consecutive out rows (window 10:00Z→03:00Z next day):**

- none

## 3. Per-lane slot coverage (UTC)

Matching rules: day-starter/food-log/evening-wrap/triage = `[family/lane]` tag (plus untagged "EVENING WRAP" text and meal keyword for food-log); health-dashboard/inbox-digest = document named `<lane>-<date>-AM|PM.html` searched across ALL five files (so a digest delivered the next day is still found and shown as late); job-scan = text headed "Job Scan AM/PM", "AM FULL SWEEP", "AM Scan", "PM DELTA", "JOB SCAN" or `job-scan-digest-<date>-AM|PM.json`. Window for timed slots: -100 min .. +240 min; LATE = >30 min after slot. "Slot" times with +1 are the next UTC day.

### 2026-09-04 (Friday)

| lane | slot | status | actual send (UTC) | delay min | mid |
|---|---|---|---|---|---|
| day-starter | 11:05 | MISSING — nearest candidate 09-04 19:11 (+487 min, mid 2538) | | | |
| day-starter | 19:05 | present | 09-04 19:11 | +7 | 2538 |
| day-starter | 23:05 | MISSING — nearest candidate 09-04 19:11 (-233 min, mid 2538) | | | |
| health-dashboard | 15:05 (AM) | present | 09-04 13:37 | -88 | 2528 (+ re-send mid 2532 at 14:26) |
| health-dashboard | 01:05+1 (PM) | LATE | 09-05 01:36 | +32 | 2548 |
| food-log | 14:30 | present | 09-04 14:36 | +7 | 2535 |
| food-log | 18:30 | present | 09-04 18:36 | +7 | 2537 |
| food-log | 21:30 | present | 09-04 21:36 | +7 | 2542 |
| food-log | 00:30+1 | present | 09-05 00:37 | +7 | 2545 |
| evening-wrap | 23:02 | present | 09-04 23:06 | +5 | 2543 |
| triage | 09:50 | MISSING | | | |
| triage | 12:50 | MISSING (no [ea/triage] text and no triage-qa-2026-09-04-AM doc) | | | |
| triage | 22:50 | MISSING (no [ea/triage] text and no triage-qa-2026-09-04-PM doc) | | | |
| inbox-digest | AM | MISSING | | | |
| inbox-digest | PM | MISSING | | | |
| job-scan | AM | MISSING | | | |
| job-scan | PM | MISSING | | | |
| pipeline-funnel | 14:15 | present | 09-04 14:33 | +18 | 2533 |
| weekly-update | 15:02 | MISSING | | | |

Other tagged lanes this day: -/mac-fleet, -/relay-guard, ea/decisions, mtg/post, mtg/pre, sys/command-lane, sys/fallback-sweep, sys/ops-run-ledger

Untagged (lane=null) sends: 13:36 2527 🟢 CHARGED - sleep landed 7:13h  PROOF: export; 13:37 2528 health-dashboard-2026-09-04-AM.html; 14:26 2532 health-dashboard-2026-09-04-AM-v4.html; 14:33 2534 job-pipeline-funnel-2026-09-04.html; 01:36 2547 📊 Health PM 9/4  😴 7h 39m sleep (11:56p–7:46a; 01:36 2548 health-dashboard-2026-09-04-PM.html; 01:49 2550 🧾 fleet today: 4 issues: lane gap, inbox down

### 2026-09-05 (Saturday)

| lane | slot | status | actual send (UTC) | delay min | mid |
|---|---|---|---|---|---|
| day-starter | 11:05 | present | 09-05 11:11 | +7 | 2554 |
| day-starter | 19:05 | present | 09-05 19:11 | +7 | 2568 |
| day-starter | 23:05 | present | 09-05 23:11 | +7 | 2575 |
| health-dashboard | 15:05 (AM) | present | 09-05 15:16 | +12 | 2565 |
| health-dashboard | 01:05+1 (PM) | present | 09-06 01:13 | +8 | 2581 |
| food-log | 14:30 | present | 09-05 14:32 | +2 | 2563 |
| food-log | 18:30 | present | 09-05 18:36 | +7 | 2567 |
| food-log | 21:30 | MISSING | | | |
| food-log | 00:30+1 | present | 09-06 00:36 | +7 | 2580 |
| evening-wrap | 23:02 | MISSING | | | |
| triage | 09:50 | present | 09-05 09:57 | +8 | 2551 |
| triage (triage-qa AM doc) | 12:50 | present | 09-05 11:17 | -93 | 2557 |
| triage (triage-qa PM doc) | 22:50 | LATE | 09-06 01:16 | +147 | 2585 |
| inbox-digest | AM | present | 09-05 15:16 | - | 2564 |
| inbox-digest | PM | MISSING — only [inbox/mid] / MID doc seen: 19:23 mid 2571, 19:25 mid 2572, 23:12 mid 2577, 23:15 mid 2578, 01:13 mid 2583, 01:15 mid 2584 | | | |
| job-scan | AM | present | 09-05 11:37 | - | 2558 (🟡 <b>Job Scan AM — 5 net-new roles</b>  ) |
| job-scan | PM | MISSING | | | |

Other tagged lanes this day: -/relay-guard, ea/decisions, mtg/post, mtg/pre, sys/ops-run-ledger, sys/overdue-watchdog

Untagged (lane=null) sends: 09:58 2552 fleet-digest-sat-sep5.html; 11:11 2555 HEALTH - Saturday, September 5  Weight: 180.3; 11:17 2557 triage-qa-2026-09-05-AM.html; 11:37 2558 🟡 <b>Job Scan AM — 5 net-new roles</b>  <b>Ti; 11:37 2559 ✅ Delivery confirmed  ↩️ <a href="https://cla; 12:12 2560 🏆 WEEKLY GOAL REVIEW — Saturday Sep 5, 2026 B; 15:16 2564 inbox-digest-2026-09-05-AM.html; 15:16 2565 health-dashboard-2026-09-05-AM.html; 19:11 2569 HEALTH - Saturday, September 5 - Midday Updat; 19:22 2570 newsletter-digest-2026-09-05-AM.html; 19:25 2572 inbox-digest-2026-09-05-MID.html; 23:11 2576 HEALTH - Saturday, September 5 - Evening Upda; 23:15 2578 inbox-digest-2026-09-05-MID.html; 01:13 2581 health-dashboard-2026-09-05-PM.html; 01:15 2584 inbox-digest-2026-09-05-MID.html; 01:16 2585 triage-qa-2026-09-05-PM.html; 01:34 2586 🗂 REVIEW BOARD — Saturday Sep 6 2026═══ 🎯 MAS; 01:34 2587 📊 Review Board HTML Card  ↩️ <a href="https:/; 01:34 2589 🗂 REVIEW BOARD — Saturday Sep 6 2026═══ 🎯 JOB; 01:51 2590 🧾 fleet today: 15✅ of 19 — one alert: job sca

### 2026-09-06 (Sunday)

| lane | slot | status | actual send (UTC) | delay min | mid |
|---|---|---|---|---|---|
| day-starter | 11:05 | present | 09-06 11:11 | +7 | 2595 |
| day-starter | 19:05 | present | 09-06 19:11 | +7 | 2616 |
| day-starter | 23:05 | present | 09-06 23:16 | +12 | 2632 |
| health-dashboard | 15:05 (AM) | present | 09-06 15:17 | +12 | 2614 |
| health-dashboard | 01:05+1 (PM) | present | 09-07 01:16 | +12 | 2639 |
| food-log | 14:30 | present | 09-06 14:31 | +2 | 2612 |
| food-log | 18:30 | present | 09-06 18:36 | +7 | 2615 |
| food-log | 21:30 | present | 09-06 21:36 | +7 | 2622 |
| food-log | 00:30+1 | present | 09-07 00:31 | +2 | 2637 |
| evening-wrap | 23:02 | present | 09-06 23:06 | +5 | 2629 |
| triage | 09:50 | present | 09-06 10:07 | +17 | 2594 |
| triage (triage-qa AM doc) | 12:50 | present | 09-06 11:17 | -93 | 2597 |
| triage | 22:50 | MISSING (no [ea/triage] text and no triage-qa-2026-09-06-PM doc) | | | |
| inbox-digest | AM | present (text digest, no html doc) | 09-06 11:25 | - | 2599 |
| inbox-digest | PM | present (delivered next day) | 09-07 17:41 | - | 2684 |
| job-scan | AM | present | 09-06 11:39 | - | 2602 (🔎 AM FULL SWEEP · Sun 09.06 · 7 net-new ) |
| job-scan | PM | present | 09-07 00:36 | - | 2638 (📋 JOB SCAN · 2 net-new (BACKFILL)  1️⃣ B) |

Other tagged lanes this day: -/mac-fleet, board/nightly-board, health/program-ingest, mtg/pre, sys/catch-up, sys/ops-run-ledger, sys/overdue-watchdog, sys/relay-canary

Untagged (lane=null) sends: 10:07 2594 📊 TickTick Triage — Saturday Sep 6 5:50a ET  ; 11:16 2596 📋 **Decision Board 2026-09-06-AM**  **SHORTLI; 11:17 2597 triage-qa-2026-09-06-AM.html; 11:25 2599 📥 [inbox/gmail-slack-gvoice AM]  **BLUF:** 15; 11:32 2600 Test message from cloud command lane  ↩️ <a h; 11:33 2601 📥 AM digest courier test  ↩️ <a href="https:/; 11:39 2602 🔎 AM FULL SWEEP · Sun 09.06 · 7 net-new  ⭐ In; 12:19 2604 🏆 WEEKLY GOAL REVIEW — 2026-09-06 (Sun)  Wind; 12:20 2605 goals-review-2026-09-06.html; 12:51 2607 WEEK ENDING SEP 6, 2026 - DEGRADED BUILD  Dat; 12:56 2608 health-deep-dive-2026-09-06.html; 13:50 2610 📋 <b>Fallback Sweep 2026-09-06</b>  <b>System; 13:52 2611 📋 <b>Fallback Sweep 2026-09-06</b>  <b>System; 15:16 2613 🟡 STEADY - recovery not scored yet  The score; 15:17 2614 health-dashboard-2026-09-06-AM.html; 23:15 2631 inbox-digest-2026-09-06-MID.html; 23:16 2633 ## HEALTH - SUNDAY SEP 6 EVENING  **Sleep (la; 00:36 2638 📋 JOB SCAN · 2 net-new (BACKFILL)  1️⃣ BlackR; 01:16 2639 health-dashboard-2026-09-06-PM.html; 01:26 2644 nightly-board-2026-09-06.html; 01:47 2648 🆘 fleet today: 0✅ — SEV-2 escalated to ops (6

### 2026-09-07 (Monday)

| lane | slot | status | actual send (UTC) | delay min | mid |
|---|---|---|---|---|---|
| day-starter | 11:05 | present | 09-07 11:21 | +17 | 2656 |
| day-starter | 19:05 | present | 09-07 19:12 | +7 | 2690 |
| day-starter | 23:05 | MISSING — nearest candidate 09-07 19:12 (-233 min, mid 2690) | | | |
| health-dashboard | 15:05 (AM) | present | 09-07 15:16 | +12 | 2677 |
| health-dashboard | 01:05+1 (PM) | present | 09-08 01:16 | +12 | 2704 |
| food-log | 14:30 | present | 09-07 14:36 | +7 | 2664 |
| food-log | 18:30 | present | 09-07 18:36 | +7 | 2689 |
| food-log | 21:30 | present | 09-07 21:36 | +7 | 2692 |
| food-log | 00:30+1 | MISSING | | | |
| evening-wrap | 23:02 | present | 09-07 23:11 | +10 | 2697 |
| triage | 09:50 | present | 09-07 09:57 | +7 | 2654 |
| triage | 12:50 | MISSING (no [ea/triage] text and no triage-qa-2026-09-07-AM doc) | | | |
| triage (triage-qa PM doc) | 22:50 | LATE | 09-08 01:16 | +147 | 2705 |
| inbox-digest | AM | present | 09-07 17:23 | - | 2681 |
| inbox-digest | PM | present (delivered next day) | 09-08 11:28 | - | 2718 |
| job-scan | AM | present | 09-07 11:37 | - | 2661 (<b>☀️ AM Scan — 7 new fits</b>  <b>1. As) |
| job-scan | PM | present | 09-08 00:36 | - | 2698 (<b>📡 PM DELTA · 1 net-new</b>  • <b>Akam) |

Other tagged lanes this day: -/mac-fleet, ea/decisions, ea/domains, job/network-refresh, mtg/pre

Untagged (lane=null) sends: 11:21 2657 💪 HEALTH - Monday, September 7  **SLEEP**: 6.; 11:29 2659 🔥 [inbox/gmail-slack-gvoice AM]  201 emails r; 11:31 2660 🎯 **Decision Board 2026-09-07-AM**  **SHORTLI; 11:37 2661 <b>☀️ AM Scan — 7 new fits</b>  <b>1. Asana</; 11:48 2662 🔄 Fleet Catch-Up — Mon Sep 7  ✅ OPERATIONAL —; 15:16 2676 🟢 CHARGED - ready to spend  Green morning. La; 15:16 2677 health-dashboard-2026-09-07-AM.html; 17:23 2681 inbox-digest-2026-09-07-AM.html; 17:31 2682 newsletter-digest-2026-09-07-AM.html; 17:36 2683 201 emails scanned (7 AM–8:40 PM EDT), 2 need; 17:41 2684 inbox-digest-2026-09-06-PM.html; 17:53 2687 newsletter-digest-2026-09-06-PM.html; 19:12 2691 HEALTH - Monday afternoon check  Sleep: 6.5h ; 23:11 2697 EVENING WRAP · Monday, September 7, 2026  ━━━; 00:36 2698 <b>📡 PM DELTA · 1 net-new</b>  • <b>Akamai</b; 01:16 2704 health-dashboard-2026-09-07-PM.html; 01:16 2705 triage-qa-2026-09-07-PM.html; 01:23 2708 "🎯 SHORTLIST TUE 9/8\n\n📌 VERIFY late-Sep can; 01:25 2709 nightly-board-2026-09-08.html; 01:48 2710 <b>🧾 [sys/ops-run-ledger] 2026-09-07 — 14✅ 0🤫; 01:48 2711 🧾 fleet today: 1 issue: day-starter timing — 

### 2026-09-08 (Tuesday)

| lane | slot | status | actual send (UTC) | delay min | mid |
|---|---|---|---|---|---|
| day-starter | 11:05 | present | 09-08 11:16 | +12 | 2714 |
| day-starter | 19:05 | present | 09-08 19:11 | +7 | 2750 |
| day-starter | 23:05 | present | 09-08 23:16 | +12 | 2759 |
| health-dashboard | 15:05 (AM) | present | 09-08 15:17 | +12 | 2740 |
| health-dashboard | 01:05+1 (PM) | present | 09-09 01:17 | +13 | 2766 |
| food-log | 14:30 | present | 09-08 14:37 | +7 | 2738 |
| food-log | 18:30 | present | 09-08 18:36 | +7 | 2749 |
| food-log | 21:30 | present | 09-08 21:36 | +7 | 2753 |
| food-log | 00:30+1 | present | 09-09 00:36 | +7 | 2761 |
| evening-wrap | 23:02 | present | 09-08 23:09 | +7 | 2758 |
| triage | 09:50 | present | 09-08 09:57 | +7 | 2712 |
| triage (triage-qa AM doc) | 12:50 | present | 09-08 11:17 | -93 | 2717 |
| triage (triage-qa PM doc) | 22:50 | LATE | 09-09 01:18 | +148 | 2768 |
| inbox-digest | AM | present | 09-08 11:37 | - | 2719 |
| inbox-digest | PM | present (delivered next day) | 09-09 01:18 | - | 2769 |
| job-scan | AM | present | 09-08 11:37 | - | 2720 (<b>🔎 Job Scan AM</b> · 2 net-new roles  ) |
| job-scan | PM | MISSING | | | |

Other tagged lanes this day: -/mac-fleet, ea/decisions, ea/reflect, mtg/post, mtg/pre, sys/canary, sys/catch-up, sys/overdue-watchdog, sys/slot-watchdog

Untagged (lane=null) sends: 11:16 2715 HEALTH - Tuesday, September 8  SLEEP: Still s; 11:17 2717 triage-qa-2026-09-08-AM.html; 11:28 2718 inbox-digest-2026-09-07-PM.html; 11:37 2719 inbox-digest-2026-09-08-AM.html; 11:37 2720 <b>🔎 Job Scan AM</b> · 2 net-new roles  <b>1.; 11:42 2721 job-scan-digest-2026-09-08-AM.json; 12:51 2731 # Week ending Sunday, September 6, 2026  DATA; 12:52 2732 health-deep-dive-2026-09-06.html; 13:33 2734 newsletter-digest-2026-09-08-AM.html; 13:57 2736 Citi - applications due today 9:25am  Beth Cl; 15:16 2739 🟡 STEADY - recovery pending sleep  HRV 50.3 m; 15:17 2740 health-dashboard-2026-09-08-AM.html; 19:11 2751 HEALTH NUMBERS - Tuesday, September 8  💤 Slee; 23:17 2760 💪 HEALTH - Tuesday, September 8  **Weigh-in**; 01:17 2766 health-dashboard-2026-09-08-PM.html; 01:18 2768 triage-qa-2026-09-08-PM.html; 01:18 2769 inbox-digest-2026-09-08-PM.html; 01:20 2770 🎯 NIGHTLY BOARD — Tue Sep 8 9:15PM ET  📊 SNAP; 01:26 2771 newsletter-digest-2026-09-08-PM.html

## 4. Rows with error/stale/mojibake markers

| day | chat | lane | mid | ts | matched | excerpt |
|---|---|---|---|---|---|---|
| 2026-09-04 | ops | sys/command-lane | 2526 | 09-04T13:22 | stale | 📥 [sys/command-lane] courier: stale-skipped 6 digest files · 09-03-AM (26h 39m old), 09-04 |
| 2026-09-04 | main | - | 2527 | 09-04T13:36 | stale | m this morning). The Sept 3 PM "52 days stale / all streams dark" was a false outage - it read the f |
| 2026-09-04 | main | - | 2527 | 09-04T13:36 | streams dark | ng). The Sept 3 PM "52 days stale / all streams dark" was a false outage - it read the fleet folder  |
| 2026-09-04 | ops | sys/fallback-sweep | 2530 | 09-04T13:41 | dead-letter | ests missing from sent-log (lane may be dead-lettered/stalled) • Health-liveness: OK (export age <1h |
| 2026-09-04 | ops | -/relay-guard | 2531 | 09-04T14:01 | dead-letter | ld emit plain text (delivery law). File dead-lettered.  |
| 2026-09-04 | ops | -/relay-guard | 2531 | 09-04T14:01 | refused to post | 🔧 [relay-guard] refused to post "referrals-2026-09-04.tgmsg" — google-doc-ty |
| 2026-09-04 | ops | sys/command-lane | 2540 | 09-04T21:11 | stale | s/command-lane] courier: 6 digest files stale-skipped (>12h old per §26.2)  inbox-digest-2026-09-03- |
| 2026-09-04 | main | ea/evening-wrap | 2543 | 09-04T23:06 | stale | 45-5:15 PM) 4. Trim session: Job Search stale (163) + Health trim + social list 5. Banff follow-up # |
| 2026-09-04 | main | ea/decisions | 2546 | 09-05T01:12 | stale | get. Full board would include overdue + stale items. Core tomorrow shortlist captured above.  Answer |
| 2026-09-05 | main | health/day-starter | 2554 | 09-05T11:11 | stale | **CONFLICT** - Trim session (Job Search stale + Health trim + social list) vs Banff follow-up #2 (Po |
| 2026-09-05 | ops | -/relay-guard | 2574 | 09-05T21:36 | dead-letter | ld emit plain text (delivery law). File dead-lettered.  |
| 2026-09-05 | ops | -/relay-guard | 2574 | 09-05T21:36 | refused to post | 🔧 [relay-guard] refused to post "food-log-2026-09-05-snack.tgmsg" — google-d |
| 2026-09-05 | main | sys/ops-run-ledger | 2591 | 09-06T01:51 | error |  (Apps Script ganesh-os-relay returning errors) — no career scans for the day. Recommend restart.  ✅ |
| 2026-09-06 | main | - | 2599 | 09-06T11:25 | error | y down (ganesh-os-relay returning Drive errors). 5 LinkedIn job alerts, travel bookings confirmed (N |
| 2026-09-06 | main | - | 2599 | 09-06T11:25 | Page Not Found | tine reports ganesh-os-relay returning "Page Not Found" errors for all Drive requests. PM DELTA scan |
| 2026-09-06 | main | - | 2602 | 09-06T11:39 | error | elay failed this run (endpoint returned error page)  ↩️ <a href="https://claude.ai/code/session_01C2 |
| 2026-09-06 | ops | sys/catch-up | 2603 | 09-06T11:45 | error | 3-9/4, partial 9/5 (Drive issues, relay errors visible in ops log) • Fleet itself remained operation |
| 2026-09-06 | main | - | 2607 | 09-06T12:51 | Data unavailable | EK ENDING SEP 6, 2026 - DEGRADED BUILD  Data unavailable: This week's deep-dive cannot compute Recov |
| 2026-09-06 | ops | sys/ops-run-ledger | 2647 | 09-07T01:47 | SEV | 🆘 [sys/ops-run-ledger] SEV-2 — Fleet state unverifiable  Cannot complete nightly au |
| 2026-09-06 | main | - | 2648 | 09-07T01:47 | SEV | 🆘 fleet today: 0✅ — SEV-2 escalated to ops (6-day signal gap, unverifiable state |
| 2026-09-07 | main | - | 2659 | 09-07T11:29 | error |  Apps Script) — Sept 6 6:16 AM, "server error occurred" during time-based trigger run. Impacts USPS  |
| 2026-09-07 | main | - | 2660 | 09-07T11:31 | STALE | hu 12:15 PM    🎯 Job Search · ask #1  **STALE (2)** 1. 🎯 APPLY #1 Thu 2:30 PM — Google DeepMind Sr D |
| 2026-09-08 | main | ea/triage | 2712 | 09-08T09:57 | STALE | day 9/8 5:50a FULL — 995 tasks  ⚠️ DATA STALE: Using Monday 9/7 8:54pm snapshot (9h old) - sys·tick- |
| 2026-09-08 | main | - | 2731 | 09-08T12:51 | DATA GAP |  Week ending Sunday, September 6, 2026  DATA GAP: This weekly deep-dive cannot be built to spec. The |

## 5. Inbound (dir=in) rows

Mirror files contain **0 dir=in rows** across all 5 days. GK replies therefore have to be read from telegram-inbox.jsonl (section 8) — of its 29 rows, the ones with epoch ts inside 2026-09-04..09-08 are:

- (none — the newest inbox row is 2026-09-03 20:20Z, update_id 159757263, a ❤ reaction on mid 2502; no GK text or reaction was recorded 9/4–9/8. The 9/8 12:16Z [sys/slot-watchdog] row corroborates: "reply lane: telegram-inbox.jsonl silent 4.5d".)

The gap-reports (dir=meta) also list mids the relay "neither sent nor received" — those are where human messages would sit: 9/4 main [2530,2531,2540,2541,2549]; the relay never mirrored inbound text for them.

## 6. Outbox listing summary

Query `parentId=184JoMq2Kg2ZsKNLDHLbOswag9XpKrur8 and modifiedTime > 2026-09-04T00:00:00Z` returned **62 files in a single page (no nextPageToken)**. Every file is dated 2026-09-08 or 2026-09-09 — nothing from 9/4–9/7 remains in the folder (presumably archived/moved by the courier), so 9/4–9/7 outbox delivery can only be judged from the mirror/sent-log.

**Doc-typed (application/vnd.google-apps.*) files:** none

**Payloads created before 9/9 with NO .delivered sibling:** none

(created on 9/9, no .delivered yet: none)

**.delivered bodies:** all 30 downloaded; every body is exactly `ok` (2 bytes). None starts with DEAD-LETTER.

**Age gap createdTime(payload) → modifiedTime(.delivered):**

| payload | created | delivered | gap min |
|---|---|---|---|
| health-dashboard-2026-09-08-PM.html | 09-09T01:14 | 09-09T01:18 | 3.2 |
| triage-qa-2026-09-08-PM.html | 09-09T01:14 | 09-09T01:18 | 4.1 |
| triage-qa-2026-09-08-PM.tgmsg | 09-09T01:13 | 09-09T01:18 | 5.2 |
| food-log-2026-09-08-dinner.tgmsg | 09-09T00:32 | 09-09T00:36 | 4.9 |
| day-starter-2026-09-08-evening-2.tgmsg | 09-08T23:12 | 09-08T23:17 | 4.9 |
| day-starter-2026-09-08-evening-1.tgmsg | 09-08T23:12 | 09-08T23:17 | 4.9 |
| evening-wrap-2026-09-08-1905.tgmsg | 09-08T23:10 | 09-08T23:11 | 1.5 |
| food-log-2026-09-08-snack.tgmsg | 09-08T21:32 | 09-08T21:36 | 4.5 |
| mtg-pre-4r7shlshgl9ojtg1em2a70d7ga-2026-09-08.tgmsg | 09-08T20:23 | 09-08T20:26 | 3.5 |
| day-starter-2026-09-08-1905-2.tgmsg | 09-08T19:09 | 09-08T19:12 | 2.3 |
| day-starter-2026-09-08-1905-1.tgmsg | 09-08T19:09 | 09-08T19:11 | 2.4 |
| food-log-2026-09-08-lunch.tgmsg | 09-08T18:32 | 09-08T18:36 | 4.1 |
| mtg-pre-581dhcqgfbkr9pigi9pnmfofde-2026-09-08.tgmsg | 09-08T18:22 | 09-08T18:26 | 4.1 |
| mtg-post-mpfnn6n6d56opp9vcar4prddcs_20260908T163000Z-2026-09-08.tgmsg | 09-08T17:23 | 09-08T17:27 | 4.2 |
| ea-reflect-2026-09-08-1213ET.tgmsg | 09-08T16:21 | 09-08T16:21 | 0.1 |
| mtg-pre-mpfnn6n6d56opp9vcar4prddcs-2026-09-08.tgmsg | 09-08T15:23 | 09-08T15:26 | 3.8 |
| health-dashboard-2026-09-08-AM.tgmsg | 09-08T15:13 | 09-08T15:16 | 3.3 |
| health-dashboard-2026-09-08-AM.html | 09-08T15:13 | 09-08T15:17 | 3.7 |
| food-log-2026-09-08-breakfast.tgmsg | 09-08T14:32 | 09-08T14:37 | 5.1 |
| mtg-pre-e0a79oputqmgbm99hee06bq7fo-2026-09-08.tgmsg | 09-08T14:23 | 09-08T14:27 | 3.6 |
| referrals-2026-09-08.tgmsg | 09-08T13:56 | 09-08T13:57 | 0.7 |
| health-deep-dive-2026-09-06.html | 09-08T12:50 | 09-08T12:52 | 1.2 |
| health-deep-dive-2026-09-06.tgmsg | 09-08T12:50 | 09-08T12:51 | 1.6 |
| mtg-pre-57s4e5a5fkhu7sft0n6ilb6j5a-2026-09-08.tgmsg | 09-08T12:25 | 09-08T12:26 | 1.0 |
| slot-watchdog-ops-2026-09-08-12-13.tgmsg | 09-08T12:14 | 09-08T12:16 | 2.0 |
| job-scan-digest-2026-09-08-AM.json | 09-08T11:38 | 09-08T11:42 | 3.8 |
| day-starter-2026-09-08-0705-2.tgmsg | 09-08T11:15 | 09-08T11:17 | 1.4 |
| day-starter-2026-09-08-0705-1.tgmsg | 09-08T11:15 | 09-08T11:16 | 1.3 |
| triage-qa-2026-09-08-AM.html | 09-08T11:13 | 09-08T11:17 | 4.1 |
| triage-qa-2026-09-08-AM.tgmsg | 09-08T11:12 | 09-08T11:17 | 4.4 |
| triage-2026-09-08-0550-FULL.tgmsg | 09-08T09:58 | 09-08T10:01 | 3.0 |

## 7. Sent-log

301 rows, 2026-09-01T16:19:16.845Z → 2026-09-09T01:26:28.266Z. No row has an `ok` or `error` field (schema has none); rows lacking `mid` = 29. Per-day sent-log counts: 2026-09-04:22, 2026-09-05:34, 2026-09-06:43, 2026-09-07:31, 2026-09-08:44

**Last 15 entries:**

- 2026-09-08T18:36:52.392Z dest=main kind=text mid=2749 lane=health/food-log silent= :: '🍽 [health/food-log] lunch check Log it while it is fresh: https://www.myfitnesspal.com/food/diary Or just text'
- 2026-09-08T19:11:52.262Z dest=main kind=text mid=2750 lane=health/day-starter silent= :: '💪 [health/day-starter] - Tuesday, September 8  "The work is not done when the pitch lands — the work is done w'
- 2026-09-08T19:12:00.248Z dest=main kind=text mid=2751 lane=- silent= :: 'HEALTH NUMBERS - Tuesday, September 8  💤 Sleep: 5.1 hours (2:25 AM - 7:38 AM) Core: 3.2h · REM: 1.3h · Deep: 0'
- 2026-09-08T20:26:53.782Z dest=main kind=text mid=2752 lane=mtg/pre silent= :: '🤝 [mtg/pre] Prasad / GK — Yelp CPO mock: BUSINESS JUDGMENT - 5:30 PM  WHO Prasad Nellipudi, prasnell@gmail.com'
- 2026-09-08T21:36:52.356Z dest=main kind=text mid=2753 lane=health/food-log silent= :: '🍽 [health/food-log] snack check Log it while it is fresh: https://www.myfitnesspal.com/food/diary Or just text'
- 2026-09-08T23:09:27.846Z dest=main kind=text mid=2758 lane=ea/evening-wrap silent= :: '🌆 [ea/evening-wrap] — Tuesday, September 8  🌙 Tonight\'s menu from the Bureau of Ordinary Victories:  💬 "Tuesda'
- 2026-09-08T23:16:57.503Z dest=main kind=text mid=2759 lane=health/day-starter silent= :: '💪 [health/day-starter] - Tuesday, September 8  "The scoreboard takes care of itself when you take care of the '
- 2026-09-08T23:17:05.500Z dest=main kind=text mid=2760 lane=- silent= :: '💪 HEALTH - Tuesday, September 8  **Weigh-in**: Data syncing (Apple export processing - health numbers will upd'
- 2026-09-09T00:36:53.058Z dest=main kind=text mid=2761 lane=health/food-log silent= :: '🍽 [health/food-log] dinner check Log it while it is fresh: https://www.myfitnesspal.com/food/diary Or just tex'
- 2026-09-09T01:18:00.097Z dest=main kind=document mid=2766 lane=- silent= :: 'health-dashboard-2026-09-08-PM.html'
- 2026-09-09T01:18:09.830Z dest=main kind=text mid=2767 lane=ea/decisions silent= :: "🗳 [ea/decisions] Tonight's calls - Tue Sep 8, 9:06p ET  3 shortlist candidates (1 tagged now) + 6 overdue. Ans"
- 2026-09-09T01:18:20.456Z dest=main kind=document mid=2768 lane=- silent= :: 'triage-qa-2026-09-08-PM.html'
- 2026-09-09T01:18:32.427Z dest=main kind=document mid=2769 lane=- silent= :: 'inbox-digest-2026-09-08-PM.html'
- 2026-09-09T01:20:47.115Z dest=main kind=text mid=2770 lane=- silent= :: '🎯 NIGHTLY BOARD — Tue Sep 8 9:15PM ET  📊 SNAPSHOT: 1002 undone · 208 overdue · 17 due tomorrow    (as of 8:49P'
- 2026-09-09T01:26:28.266Z dest=main kind=document mid=2771 lane=- silent= :: 'newsletter-digest-2026-09-08-PM.html'

**Entries whose head mentions error/FAILED/DEAD-LETTER:**

- 2026-09-01T22:56:48.615Z dest=ops mid=- [SEV-2] :: '🆘 [ea/triage] SEV-2 - token budget excee' … '🆘 [ea/triage] SEV-2 - token budget exceeded processing  SLOT: 2026-09-01 05:50 ET (FULL pass, 13h late) GAP: 8 missed sl'
- 2026-09-02T11:48:13.743Z dest=ops mid=2405 [error] :: '🔄 [sys/catchup-reconciler] — Mon Sep 2, ' … 'st-8/27 recovery. Initial command-lane assessment error corrected (summary cited stale marker; actual run was 23:22Z yes'
- 2026-09-02T13:37:04.514Z dest=ops mid=2413 [error] :: '⚠️ [ops] courier: stale-skipped inbox-di' … ' inbox-digest-2026-09-02-AM.txt not found (entity error), delivered HTML-only'
- 2026-09-02T15:29:29.051Z dest=main mid=2421 [failed] :: '💪 [health/day-starter] — Wednesday, Sept' … 'day, September 2, 2026 ⚠️ Late anchor — 7:05 fire failed silently  🔋 RECOVERY & SESSION Health data unavailable (export '
- 2026-09-02T23:11:56.396Z dest=ops mid=2438 [refused to post] :: '🔧 [relay-guard] refused to post "evening' … '🔧 [relay-guard] refused to post "evening-wrap-20260902-part1.tgmsg" — google-doc-typed queue file. The writer task shoul'
- 2026-09-02T23:12:02.868Z dest=ops mid=2439 [refused to post] :: '🔧 [relay-guard] refused to post "evening' … '🔧 [relay-guard] refused to post "evening-wrap-20260902-part2.tgmsg" — google-doc-typed queue file. The writer task shoul'
- 2026-09-02T23:12:55.693Z dest=main mid=2440 [failed] :: '💪 [health/day-starter] — Wednesday, Sept' … 'ednesday, September 2 (LATE ANCHOR - morning fire failed)  ⚠️ **Morning anchor never sent — delivered 12h late at 7:08 P'
- 2026-09-03T04:56:06.587Z dest=ops mid=2461 [error] :: '[job/network-refresh] recency index: rel' … 'nfig endpoint answers {&quot;ok&quot;:false,&quot;error&quot;:&quot;need text or html_base64 (or op:\\&quot;react\\&quot;)'
- 2026-09-03T05:16:04.098Z dest=ops mid=2463 [FAILED] :: '[job/network-refresh] recency index FAIL' … '[job/network-refresh] recency index FAILED (fire #3 follow-up): op:version returned {&quot;ok&quot;:false,&quot;error&qu'
- 2026-09-03T21:26:54.757Z dest=ops mid=2506 [refused to post] :: '🔧 [relay-guard] refused to post "clarify' … '🔧 [relay-guard] refused to post "clarify-reaction-2502.tgmsg" — google-doc-typed queue file. The writer task should emit'
- 2026-09-03T22:26:58.294Z dest=ops mid=2512 [SEV-2] :: '🆘 SEV-2: Telegram reply applier cannot r' … '🆘 SEV-2: Telegram reply applier cannot run - Google Drive state files unreachable  Lane: ea-telegram-reply-applier (fast'
- 2026-09-03T22:58:36.942Z dest=ops mid=2515 [SEV-2] :: '🆘 [ea/triage] SEV-2 - Missing all requir' … '🆘 [ea/triage] SEV-2 - Missing all required state files  TIME: 2026-09-03 18:51 ET (22:51 UTC) SLOT: 6:50p DELTA pass SEV'
- 2026-09-03T23:12:02.910Z dest=ops mid=2520 [refused to post] :: '🔧 [relay-guard] refused to post "evening' … '🔧 [relay-guard] refused to post "evening-wrap-2026-09-03.tgmsg" — google-doc-typed queue file. The writer task should em'
- 2026-09-04T13:42:02.502Z dest=ops mid=2530 [dead-letter] :: '🧹 [sys/fallback-sweep] — Wed Sep 4, 9:37' … ' AM/PM digests missing from sent-log (lane may be dead-lettered/stalled) • Health-liveness: OK (export age <1h, last pus'
- 2026-09-04T14:01:54.272Z dest=ops mid=2531 [refused to post] :: '🔧 [relay-guard] refused to post "referra' … '🔧 [relay-guard] refused to post "referrals-2026-09-04.tgmsg" — google-doc-typed queue file. The writer task should emit '
- 2026-09-05T21:36:57.316Z dest=ops mid=2574 [refused to post] :: '🔧 [relay-guard] refused to post "food-lo' … '🔧 [relay-guard] refused to post "food-log-2026-09-05-snack.tgmsg" — google-doc-typed queue file. The writer task should '
- 2026-09-06T01:52:02.903Z dest=main mid=2591 [errors] :: '🧾 [sys/ops-run-ledger] Friday, September' … 'relay down (Apps Script ganesh-os-relay returning errors) — no career scans for the day. Recommend restart.  ✅ All deliv'
- 2026-09-06T11:25:11.417Z dest=main mid=2599 [errors] :: '📥 [inbox/gmail-slack-gvoice AM]  **BLUF:' … ' scan relay down (ganesh-os-relay returning Drive errors). 5 LinkedIn job alerts, travel bookings confirmed (Nov trips t'
- 2026-09-06T11:39:35.885Z dest=main mid=2602 [failed] :: '🔎 AM FULL SWEEP · Sun 09.06 · 7 net-new ' … 'l added to Scan Intake for triage  ⚠️ Supra relay failed this run (endpoint returned error page)  ↩️ <a href="https://cl'
- 2026-09-06T11:45:43.326Z dest=ops mid=2603 [errors] :: '🔁 [sys/catch-up] — Sun Sep 6, 7:40 AM ET' … ' missed 9/3-9/4, partial 9/5 (Drive issues, relay errors visible in ops log) • Fleet itself remained operational through'
- 2026-09-06T12:19:42.805Z dest=main mid=2604 [failed] :: '🏆 WEEKLY GOAL REVIEW — 2026-09-06 (Sun) ' … 'AT order) unactioned 34 days. In-network callback failed for over a month. → Decide sleep: WatchPAT by Sep 13 or call 85'
- 2026-09-07T01:47:04.526Z dest=ops mid=2647 [SEV-2] :: '🆘 [sys/ops-run-ledger] SEV-2 — Fleet sta' … '🆘 [sys/ops-run-ledger] SEV-2 — Fleet state unverifiable  Cannot complete nightly audit: telegram-sent-log shows zero ent'
- 2026-09-07T01:47:45.825Z dest=main mid=2648 [SEV-2] :: '🆘 fleet today: 0✅ — SEV-2 escalated to o' … '🆘 fleet today: 0✅ — SEV-2 escalated to ops (6-day signal gap, unverifiable state)  ↩️ <a href="https://claude.ai/code/se'
- 2026-09-07T11:29:46.211Z dest=main mid=2659 [error] :: '🔥 [inbox/gmail-slack-gvoice AM]  201 ema' … 're (Google Apps Script) — Sept 6 6:16 AM, "server error occurred" during time-based trigger run. Impacts USPS relay and '
- 2026-09-08T12:26:52.209Z dest=main mid=2727 [failed] :: '🤝 [mtg/pre] Omair / GK — Yelp CPO mock: ' … "s and can name the shape. If he can't, the answer failed. He'll interrupt the moment he's lost.  YOUR GOAL Run the 90-se"

## 8. Inbox: last 10 lines

- 2026-08-10 17:20Z update_id=159757250 chat=main kind=text msg_id= applied=False :: '1) do your best rec\n2) follow your rec'
- 2026-08-11 00:06Z update_id=159757251 chat=main kind=text msg_id= applied=False :: 'Done rc7'
- 2026-08-11 13:12Z update_id=159757252 chat=main kind=text msg_id= applied=False :: 'Fix export'
- 2026-08-18 00:40Z update_id=159757253 chat=main kind=text msg_id= applied=False :: 'done'
- 2026-08-19 17:57Z update_id=159757254 chat=main kind=text msg_id= applied=False :: "Ankur's not a Yelp referrer"
- 2026-08-27 19:43Z update_id=159757255 chat=main kind=text msg_id= applied=False :: 'ping test'
- 2026-09-02 23:09Z update_id=159757256 chat=main kind=reaction msg_id=2437 applied=False :: 'keep'
- 2026-09-03 06:10Z update_id=159757259 chat=main kind=reaction msg_id=2464 applied=False :: 'keep'
- 2026-09-03 18:32Z update_id=159757261 chat=main kind=reaction msg_id=2501 applied=False :: 'keep'
- 2026-09-03 20:20Z update_id=159757263 chat=main kind=reaction msg_id=2502 applied=False :: 'keep'