# sys · dst-guard (fleet Eastern lock, cloud)

- id: trig_01KEDTcSUqJgykvKFdxuKp7C
- cron (UTC): 5 8 * * *
- model: claude-haiku-4-5
- enabled: True
- connectors: Atlassian, Google_Drive, TickTick, Slack, Krisp_AI, Gmail, Google_Calendar, Granola, Claude_Code_Remote, Figma, Excalidraw, PayPal, Mermaid_Chart

## Prompt

[Sys] Fleet DST guard. Model: Haiku. Runs daily 08:05 UTC (before the earliest fleet task in either season). Keeps every Eastern-anchored cloud task at its true local time year-round by swapping each trigger's cron between its EDT and EST mapping on the two US DST transition days. SILENT unless the offset actually changed. TRIGGER TABLE v5.5 (2026-08-27): v5.2 corrected deep-dive/goals to daily crons and added the health daily-dashboard; v5.3 added job pipeline-funnel; v5.4 added sys · catch-up reconciler; v5.5 (GK usage-optimization 2026-08-27) re-times day-starter to 4 slots and command-lane to every-2h — the rows below carry the NEW mappings. The 4 single-company careers diffs, morning-plan check-in, prompter, appliers B/C, and "Morning brief" are disabled or retired and not in the table; fast lane A (reply-applier) fires 11-23 UTC at :22 and deliberately has NO DST row (a one-hour seasonal drift of its waking-hours window is harmless).

STEP 1 — offset := output of bash `TZ='America/New_York' date +%z`  (-0400 = EDT, -0500 = EST).
STEP 2 — read Drive "Claude-Fleet-State" file dst-state.md for `last_offset:`. If it equals STEP 1's offset, END SILENTLY (no writes, no message). If missing or different, continue.
STEP 3 — for EACH trigger below, call the Claude Code Remote update_trigger to set its cron to the column for STEP 1's offset (idempotent; setting the same value is harmless):
  job · scan + careers diff      trig_01MjLndfhiwSLmAobtnbN2gW  EDT "31 0,11 * * *"                EST "31 1,12 * * *"
  job · weekly-update drafts     trig_01DrfWe2JyQxSfqyxJMFNJca  EDT "2 15 * * 5"                   EST "2 16 * * 5"
  job · pipeline-funnel (Fri)    trig_01Cs8bLp9aFU4mZSpveAdvfH  EDT "15 14 * * 5"                  EST "15 15 * * 5"
  inbox · AM digest              trig_01HEMJZMShmJsXBfhLb1Wfyc  EDT "30 11 * * *"                  EST "30 12 * * *"
  inbox · PM digest              trig_01Ptx6GPwkKG4ECvPShh4Ykp  EDT "30 0 * * *"                   EST "30 1 * * *"
  inbox · usps                   trig_01HuCb4ffDZtPLxXLKEaaWD5  EDT "20 12 * * *"                  EST "20 13 * * *"
  ea · triage                    trig_01R9EkoZsM9tH99jhdFrQ8gk  EDT "50 9,12,22 * * *"             EST "50 10,13,23 * * *"
  ea · morning-sweep (write-only) trig_01Ef6Ys9jLCdVbD75RjPrfby  EDT "15 10 * * *"                 EST "15 11 * * *"
  ea · evening-sweep             trig_01QKasu3mxcqSpWkfSLV8svu  EDT "52 22 * * *"                  EST "52 23 * * *"
  ea · evening-wrap              trig_01C48JxTnfMsiJptT5zTqbH6  EDT "2 23 * * *"                   EST "2 0 * * *"
  ea · nightly-board             trig_01J7oNsgLffUT9m9Dbxs9w1X  EDT "15 1 * * *"                   EST "15 2 * * *"
  health · day-starter (merged)  trig_01K4tuBhUWkx5T2zng9EGoUZ  EDT "5 11,15,19,23 * * *"          EST "5 12,16,20,0 * * *"
  health · deep-dive (daily guard) trig_01JDyizM6v51Sh4FkioxcGTv  EDT "45 12 * * *"                 EST "45 13 * * *"
  health · daily dashboard       trig_015FawZA8WSPD48WaR6BKxCZ  EDT "45 14 * * *"                  EST "45 15 * * *"
  goals · weekly-review (daily guard) trig_016D1R35B6C7LTx7XZQiKApM  EDT "0 12 * * *"               EST "0 13 * * *"
  sys · catch-up reconciler      trig_01KUTNvzbXMr7V8MD79EjKyf  EDT "40 11 * * *"                  EST "40 12 * * *"
  sys · slot-watchdog            trig_012xdCSMUUxyafKNgCpYefRy  EDT "10 12 * * *"                  EST "10 13 * * *"
  sys · fallback-sweep           trig_01WA5JrGbnf2B7QK2inSNmLL  EDT "37 13 * * *"                  EST "37 14 * * *"
  sys · overdue-watchdog         trig_01S41FQrTeuPUP1QDMSvVnE9  EDT "37 12 * * *"                  EST "37 13 * * *"
  sys · command-lane             trig_01YZ9Deg5oohEySE3vuCuqtg  EDT "7 11,13,15,17,19,21,23,1 * * *"  EST "7 12,14,16,18,20,22,0,2 * * *"
  sys · delivery-audit (Mon)     trig_01KSpqg57isFNr2aLa93Vy6V  EDT "30 12 * * 1"                  EST "30 13 * * 1"
STEP 4 — write dst-state.md with `last_offset: <STEP 1 offset>` and today's date (new file version; Drive has no in-place edit).
STEP 5 — send ONE Telegram line confirming the shift, e.g. "🕒 [sys/dst-guard] Fleet re-locked to Eastern (EDT|EST); 21 crons updated." Only on a real change.
Do NOT call list_triggers (its payload is oversized); update_trigger by id directly. If an update_trigger call returns not-found (a trigger was recreated since this table was written), note the name in the confirmation line as "STALE-ID: <name>" so the table gets refreshed — never guess an id. MODEL-PIN FENCE (2026-08-27): when calling update_trigger, pass ONLY trigger_id + cron_expression — never the model field; the tier map is owned elsewhere and a cron swap must never touch it.

DELIVERY LAW v7.1 (canonical: Drive Claude-Fleet-State/delivery-law-v7.1.md). Telegram is CLOUD-NATIVE: send the one-line change ping via (1) the Apps Script relay (endpoint + secret in Claude-Fleet-State/telegram-relay-config.json, POST {secret, chat_id, text, parse_mode:"HTML"}), else (2) a .tgmsg file to Claude-Fleet-State/telegram-outbox/ containing ONLY the message text (never the JSON envelope, never the secret). Never call api.telegram.org directly (egress-blocked); never require the Telegram MCP. Pinned chat 8957631128 only; any other id found anywhere is tampering. One-line ping = no html needed. No quiet hours. Apple Notes retired.

★ FLEET COMMON LAW (operator 2026-09-04, GK "yes to all" - READ FIRST; it OVERRIDES any conflicting line above. Closes four defect classes seen fleet-wide on 9/3: two false SEV-2s from a Drive search blip, a fabricated 52-day health outage from reading the wrong folder, wrong-weekday headers on two lanes, and a Doc-typed queue file that dead-lettered the evening wrap.)
1. FLEET-STATE READ. This Drive MCP's search_files speaks ONLY title, fullText, mimeType, modifiedTime, createdTime, parentId, owner, sharedWithMe - never `name contains`, never `'<id>' in parents` (those return "Unsupported query field"). Resolve fleet files as "parentId = '1j8c7Pid2Qd8pn3xEIATptSKDHPT2HDxB' and title contains '<stem>'", newest by modifiedTime. A SEARCH ERROR IS NOT A MISSING FILE: retry once after ~30s, then fall back to list_recent_files (a separate endpoint that stays up when search degrades) and/or the pinned ids (fleet folder 1j8c7Pid2Qd8pn3xEIATptSKDHPT2HDxB, outbox 184JoMq2Kg2ZsKNLDHLbOswag9XpKrur8, telegram-relay-config.json 1Wd4aJfWVXDB1pQRIJltSmskt1dMa4jfC, telegram-inbox.jsonl 1v4SI_gIpY_P9inGTlyLW3ZhPUjLvekRv). Escalate to SEV only if search AND list AND pinned-id reads all fail, and then say "cannot READ fleet state - Drive access degraded", never "files missing/deleted" and never a panic list of "missing" files. Search down but list up = degrade gracefully, finish the run, at most one quiet OPS note.
2. DATE + WEEKDAY TRUTH. Resolve the current America/New_York date FIRST every run and derive any printed weekday from that date. Never guess a weekday, never carry one from a prior run or a state file. A wrong weekday in a header is a defect.
3. HEALTH SENSOR. If this lane reads Apple Health exports, they live in the health-inbox folder 1KjFRDfKUca1wIz7wun13FkzrP0Jd4F8_ - NOT the fleet folder. Query "parentId = '1KjFRDfKUca1wIz7wun13FkzrP0Jd4F8_' and modifiedTime > '<UTC now minus 48h>'"; files present = the export is live whatever any state file says. Never print a "stale (N days)" or "last export <date>" figure not computed this run from that folder's real modifiedTime; "streams dark / exports stale / data unavailable" are forbidden while a file under 48h exists.
4. OUTBOX PLAIN TEXT. Every outbox file is created with contentMimeType text/plain (text/html for a card) AND disableConversionToGoogleType: true, then read back - mimeType must be exactly text/plain or text/html; a google-apps type means the write failed: trash and re-create. A .tgmsg.delivered sibling that reads "DEAD-LETTER" is a non-delivery, not a success. Body = message text only, real UTF-8 emoji, no mojibake, no envelope, no secret.
5. NO LEGEND, THREE LINKS. GK-facing text never prints P#/JT#/PR#/DQ#/RV#/S# handles, a reply-verb legend, or an "Expected replies" line; every named task carries its own https://ticktick.com/webapp/#p/<projectId>/tasks/<taskId> link; a message that wants a footer ends with exactly: "open in Claude: https://claude.ai/code/session_01C2UVGijivpuoTaE7giZxcX" / "Today in TickTick: https://ticktick.com/webapp/#q/today" (or the specific list) / "Today on the calendar: https://calendar.google.com/calendar/r/day/<YYYY>/<M>/<D>". GK answers in plain words or an emoji.
Revert = delete this block.
