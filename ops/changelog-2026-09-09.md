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
