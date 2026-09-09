/** ═══════════════════════════════════════════════════════════════════════
 *  v7.9.3 (2026-09-03) — op:"version". POST {secret, op:"version"} answers
 *  {ok:true, version, ops:[...]} and sends NOTHING to Telegram, so a lane can
 *  prove which code the /exec URL is serving before relying on a newer op.
 *  (The 04:33Z run found the configured /exec URL still answering with pre-7.9
 *  code: "need text or html_base64". Deploy > Manage deployments > EDIT the
 *  EXISTING deployment > New version. A brand-new deployment gets a NEW URL
 *  that telegram-relay-config.json does not know about.)
 *
 *  v7.9.2 (2026-09-03) — SERVER-SIDE RECENCY INDEX + DRIVE GET. The Drive MCP
 *  caps downloads at 10 MB and cloud lanes cannot reach googleapis.com, so the
 *  17.5 MB LinkedIn messages.csv could never be read by a lane. Now the relay
 *  reads it INSIDE Google: POST {secret, op:"recency_index"} parses the newest
 *  messages.csv in job-search-network and writes network-recency.json there
 *  (per-person LinkedIn slug -> last/first message date and counts; NO names,
 *  subjects or content ever stored). Also POST {secret, op:"drive_get", folder,
 *  name|file_id, offset, length} returns a base64 slice (<= 4 MB) of any file in
 *  the three allowlisted folders, so a lane can stream a big file in chunks.
 *  Editor: Function dropdown -> buildRecencyIndex -> Run does the same by hand.
 *
 *  v7.9.1 (2026-09-03) — DRIVE PUT. POST {secret, op:"drive_put", folder:"fleet"|
 *  "network"|"outbox", name, mime, base64} writes a plain file into that Drive
 *  folder (up to 40 MB). Cloud lanes use it to store big files (the 600 KB
 *  network map, the messages.csv recency index) straight from disk.
 *
 *  v7.9 (2026-09-03, operator session) — REPLY-LINK FOOTER. Every MAIN send
 *  (text, edit, document caption when it fits) ends with "↩️ reply to Claude ·
 *  task <id> · run <id>" so GK can answer inside Claude instead of Telegram.
 *  ONE PASTE, NOTHING ELSE: replace Code.gs with this file, Deploy > Manage
 *  deployments > Edit > New version > Deploy. Token and secret carry over.
 *  Optional Script Property REPLY_LINKS (JSON) overrides the operator URL,
 *  adds task_url / run_url templates ({trig}, {run}) and extra tag→trig pairs.
 *
 *  v7.8 (2026-09-02, operator session) — MIRROR + TOKEN-TO-PROPERTY.
 *  COMPLETE FILE, replaces everything in Code.gs. Built on the live v7.7 source GK
 *  pasted 2026-09-02, every v7.7 line carried verbatim except where marked v7.8.
 *
 *  ═══════════ v7.8.1 ACTIVATION — ONE PASTE, NOTHING ELSE ═══════════
 *  1. Code.gs → Select ALL → delete → paste this entire file → Save (Cmd+S).
 *  2. Deploy → Manage deployments → ✏️ on the existing web app → Version: "New version"
 *     → Deploy.
 *  That is all. Script Properties: NO CHANGES REQUIRED (the token is inline below,
 *  exactly as it was in v7.7). Triggers: NO CHANGES.
 *
 *  Optional, any time later: put the token in a Script Property named BOT_TOKEN and
 *  the inline value stops being used (the property wins). Nothing breaks either way.
 *  Optional check: Function dropdown → mirrorSelfTest → Run. Writes ONE local test row
 *  and sends nothing to Telegram. Expect "mirror ok: telegram-mirror-YYYY-MM-DD.jsonl".
 *
 *  WHAT v7.8 ADDS
 *  1. TELEGRAM MIRROR   Claude-Fleet-State/telegram-mirror/telegram-mirror-YYYY-MM-DD.jsonl
 *                       (ET day). One JSON row per message in EITHER direction:
 *                       {ts, dir:"out"|"in", chat:"main"|"ops", kind, mid, family, lane,
 *                        task_id, project_id, reply_to, silent, edited, text (FULL, never
 *                        truncated), doc_name, chars, chunks, sha256, from, update_id,
 *                        applied, emoji}. Outbound rows are written from inside logSent_
 *                       (which every successful send already passes through, with the
 *                       message_id since v7.7), so no send path is missed. Inbound rows
 *                       are written from pollInbox right after it appends to
 *                       telegram-inbox.jsonl, so messages, reactions and button taps all
 *                       land. The relay's own watchdog alerts (wdSend_) are mirrored too.
 *                       sent-log and inbox files are UNCHANGED; the mirror is additive.
 *  2. MID-GAP REPORT    every ~30 min main() appends ONE {kind:"gap-report"} row per day
 *                       listing message_ids in today's range that the relay neither sent
 *                       nor received. Human replies show up there (expected); anything
 *                       else is a foreign sender worth a look.
 *  3. TOKEN RESOLUTION  BOT prefers Script Property BOT_TOKEN when it exists and falls
 *                       back to the inline constant, so this file works with zero setup
 *                       and can be hardened later without another paste. GK 2026-09-02:
 *                       inline is fine. Note the token still sits in the three archived
 *                       v7.4.x .gs copies in Drive; trash those when convenient.
 *  4. OUTBOX DOC MIDS   the two sendDocument sites in relayTelegram now parse and log
 *                       the message_id like doPost already did (tiny gap closed).
 *  Nothing else changed. Every mirror entry point is try/catch: a Drive failure logs an
 *  error and the send still goes through. Revert = paste v7.7 back.
 *  ═══════════════════════════════════════════════════════════════════════ */
/** ═══════════════════════════════════════════════════════════════════════
 *  v7.7 (2026-09-01, operator session) — SIGNAL LAYER. All additive, all behind
 *  body flags; a lane that sends {secret, text} exactly as before gets exactly the
 *  v7.6.2 behaviour. Deploy: paste over Code.gs, Save, Deploy → Manage deployments →
 *  New version. Script Properties: NO required changes (optional OPS_TOPICS, see 8).
 *  Triggers: NO changes.
 *
 *  1. SILENT SENDS      body.silent:true → disable_notification on text + documents.
 *  2. BLUF CAPTIONS     body.caption already existed; documents now also accept
 *                       silent / reply_to / thread. Caption max 1024 chars (Telegram).
 *  3. LIVING MESSAGES   body.edit_family:"food-log" → the first send of the ET day
 *                       creates the message, later sends EDIT it in place
 *                       (editMessageText). Falls back to a new send when the edit is
 *                       rejected (older than 48h, unchanged text, multi-chunk).
 *  4. PIN               body.pin:true (+ body.family) → pins the message silently and
 *                       unpins the previous pin of the same family.
 *  5. REACTIONS         body.op:"react", message_id, emoji → setMessageReaction from the
 *                       bot. Inbound: GK's reactions on bot messages arrive as
 *                       message_reaction updates, land in telegram-inbox.jsonl as
 *                       kind:"reaction" and instant-apply when the message carried a
 *                       task_id (✅ done · ⏰ push tomorrow · 👍 keep · ❌ abandon→lanes).
 *  6. THREADING         body.reply_to:<message_id> → reply_to_message_id. Every send
 *                       now returns message_id and the sent-log line carries
 *                       mid / family / task_id / project_id, so lanes and the relay can
 *                       resolve "which message was this a reply to".
 *  7. INLINE KEYBOARDS  body.buttons:[[{text,data}],...] → reply_markup inline keyboard.
 *                       callback_data convention: "t|<taskId24>|<cmd>" or plain "<cmd>".
 *                       Taps land in the inbox as kind:"callback" and instant-apply.
 *  8. OPS TOPICS        body.thread:"<name>" (OPS only) → message_thread_id resolved
 *                       from Script Property OPS_TOPICS = {"relay":123,"fleet":456,...}.
 *                       Property absent → ignored, message lands in General.
 *  9. NATURAL REPLIES   Replies that QUOTE a line, or reply to a bot message, resolve
 *                       the task from (a) the sent-log mid map, (b) a 24-hex TickTick id
 *                       in the quoted text, (c) a legacy handle; then apply plain
 *                       English: done · keep · tomorrow · tue · push 9/14 · p1/p3/p5.
 *                       Legacy "JT3 done" still works. Abandon/close is NEVER instant -
 *                       it is recorded for the applier lanes (human veto window).
 * 10. ROTATION CARRY-FORWARD  when the sent-log rotates at ~1 MB, the last 48h of
 *                       lines are copied into the fresh file, so VERDICT-BY-SENT-LOG
 *                       and every idempotency check keep their memory on rotation day
 *                       (2026-09-01 incident: rotation at 12:19p ET blinded the couriers,
 *                       which replayed the previous evening's digests into MAIN).
 * 11. INBOUND ENCODING GUARD  outbox .tgmsg files are checked for UTF-8 mojibake
 *                       ("Ã°", "Â") and repaired before posting; unrepairable → dead-letter.
 *  ═══════════════════════════════════════════════════════════════════════ */
/** ganesh-os-relay v7.6.2 (2026-08-27) — COMPLETE FILE, replaces everything in Code.gs.
 *  = v7.6.1 + REPLY-LANE FALSE-ALARM FIX (GK 2026-08-27). PROVEN TODAY: the reply
 *    lane was never broken. GK texted "ping test" at 19:43:46Z and pollInbox captured
 *    it into telegram-inbox.jsonl by 19:46:55Z — about three minutes, working exactly
 *    as designed. The ⚠️ REPLY LANE STALE alerts (177h and climbing) were firing
 *    because GK simply had not texted the bot since 2026-08-19; he steers the fleet
 *    from the Cowork chat, so a quiet inbox is NORMAL, not a fault. A watchdog that
 *    cries wolf every six hours trains you to ignore it, which is worse than no
 *    watchdog. Two changes, nothing else touched:
 *    1. WD_INBOX_QUIET_HOURS (was a hardcoded 48) is now 168 — a full week of silence
 *       before the lane is even questioned.
 *    2. The alert text is HONEST about the ambiguity: cloud cannot distinguish "your
 *       messages are being eaten" from "you have not sent any", so it now says so and
 *       asks for the one-text test instead of asserting a failure.
 *  = v7.6.1 OPS ROUTING FIX (verified live 2026-08-27): chat_id "-5198293797" routes
 *  = v7.6 + OPS ROUTING FIX (GK 2026-08-26, after the portal-live message mis-routed
 *    to MAIN): doPost now honors chat_id when it names the pinned OPS group — a POST
 *    with chat_id "-5198293797" (or ops:true, unchanged) goes to OPS. Any OTHER
 *    chat_id value is still ignored (anti-tamper: only the two pinned chats exist).
 *  = v7.5 (below, carried unchanged) + CODA PROXY (GK 2026-08-26, Supra job board):
 *  • doPost now accepts { op:"coda" } and proxies a read-only REST call to the
 *    Superhuman Docs / Coda API (coda.io/apis/v1) server-side on Google's infra,
 *    because the cloud fleet's egress allowlist blocks coda.io directly. Same
 *    pattern as the Telegram relay: cloud → this script → coda.io → JSON back.
 *  • Token resolution: body.coda_token wins if present; otherwise the script
 *    falls back to Script Property CODA_TOKEN (recommended home — the token
 *    then never leaves Google's side).
 *  • Guards: path must be relative (no "://"), GET/HEAD only unless
 *    body.allow_write === true, response body capped at 200 KB.
 *  • Everything else — Telegram lanes, TickTick, USPS, watchdog, pollInbox —
 *    is v7.5 verbatim. Script Properties: ADD CODA_TOKEN (optional but
 *    recommended). Triggers: NO CHANGES.
 *
 *  ═══ v7.5 header below, carried unchanged ═══
 *  = v7.4.6 (below, carried unchanged) + THE WATCHDOG + INBOX HARDENING (GK 2026-08-17,
 *  after two silent multi-day failures the cloud fleet could not report on itself):
 *  1. FLEET-SILENCE ALERT: this script runs on Google's infra and survived both cloud
 *     outages (8/8-8/10 ~45h, 8/14-8/17 ~72h) — so IT now watches the fleet. If
 *     telegram-sent-log.jsonl goes >20h with no writes while this trigger is alive,
 *     you get ONE direct Telegram alert on MAIN (re-alert at most every 6h).
 *  2. INBOX FAILURE ALERTS: pollInbox died silently 8/11-8/17 — getUpdates returned
 *     ok:false (or empty forever) and the old code's `if (!data.ok || ...) return;`
 *     swallowed it, so every execution showed "Completed". v7.5 splits that check:
 *     ok:false now counts as a FAILURE (3 in a row = one Telegram alert naming the
 *     error), and a separate cross-check alerts when sends flow but the inbox file
 *     hasn't been written in >48h (catches the second-consumer case where getUpdates
 *     succeeds but always comes back empty).
 *  3. OFFSET SELF-HEAL: a corrupted tg_offset (NaN / negative) is reset to 0 instead
 *     of poisoning every future getUpdates call.
 *  4. DIAGNOSTICS you can run by hand from the editor (function dropdown → Run):
 *     wdDiagnoseInbox()  — prints webhook state, raw getUpdates response, offset, and
 *                          file freshness to the Execution log, with a plain-English
 *                          verdict line. Consumes nothing; safe to run any time.
 *     wdClearWebhook()   — removes a stray webhook (the 409 fix). Run once if the
 *                          diagnostic shows 409/conflict.
 *     wdResetOffset()    — clears tg_offset. Run if the diagnostic says to.
 *     watchdogSelfTest() — sends one 🧪 line to MAIN so you know alerts can reach you.
 *
 *  ═══ everything below the constants is v7.4.6 verbatim except where marked v7.5 ═══
 *
 *  = v7.4.5 + two READABILITY fixes (GK 2026-08-11: raw <b> tags and mid-word
 *  splits were showing in main — the old chunker cut blindly at 4000 chars, which could
 *  split an HTML tag/entity; Telegram then rejected the chunk and the plain retry showed
 *  raw tag soup):
 *  1. NEWLINE-AWARE CHUNKING: long texts split at the last newline before 4000 chars,
 *     never mid-word or mid-tag (hard cut only if a single line exceeds ~2000).
 *  2. CLEAN PLAIN FALLBACK: when an HTML chunk is rejected, the retry now STRIPS tags
 *     and unescapes entities (&amp; → &) before sending — readable text, never markup.
 *  = v7.4.5 MAIN-PROBE GUARD (§15) + LINK PREVIEWS OFF.
 *  = v7.4.4 NEAR-DUP GUARD: (dest + name-prefix tag) keyed for 15 min; "allow_dup"
 *    bypasses the near guard; 🆘 never suppressed. Documents keyed on digit-stripped name.
 *  = v7.4.3 DEDUPE GUARD: identical sends dropped for 15 min (CacheService).
 *  = v7.4.2 OPS-CHAT CAPTURE + OPS REPLIES ACTIONABLE + FULL-TEXT SENT-LOG.
 *  = v7.4.1 FRONT-MATTER GUARD in looksBinaryOrDoc_.
 *  = v7.4 LOCK (no overlapping runs), TIME-BOX (4.5 min), ARCHIVE SWEEP,
 *    STALENESS GATE (main content >18h never replayed), CONTENT GUARD (no PDFs/Docs).
 *  = v7.3 sent log + ops routing + folder-by-ID + text-before-card pairing.
 *  CARRIED UNCHANGED: v3 lanes (ticktick-outbox, USPS export), v4/v6 doPost
 *  (direct sends + health ingest ?src=health), v5 pollInbox instant apply,
 *  envelope guard + secret redaction.
 */

// v7.8.1: Script Property BOT_TOKEN wins when set; otherwise the inline value is used,
// so pasting this file alone is enough. Both paths are supported permanently.
var BOT_INLINE = '';  // REDACTED in git: set Script Property BOT_TOKEN in the Apps Script project (the code prefers it)
var BOT  = (function () {
  try { return PropertiesService.getScriptProperties().getProperty('BOT_TOKEN') || BOT_INLINE; }
  catch (e) { return BOT_INLINE; }
})();
var CHAT = '8957631128';
var OPS  = '-5198293797';   // Ganesh OS — Ops group (system/debug lane)
var FLEET_ID = '1j8c7Pid2Qd8pn3xEIATptSKDHPT2HDxB';   // Claude-Fleet-State, pinned by ID (v7.3)
var RELAY_VERSION = '7.9.3'; // v7.9 reply-link footer + v7.9.1 drive_put + v7.9.2 recency_index/drive_get + v7.9.3 op:version (2026-09-03)

// ===================== v7.9 REPLY-LINK FOOTER =====================
// GK 2026-09-03: every message that reaches him ends with links he can tap to
// reply INSIDE Claude instead of in Telegram, stack-ranked: (1) the operator
// session, (2) the scheduled task that produced the message, (3) that run's
// own session. Rendered here once, so no lane prompt has to carry it.
// Override any of this without a redeploy via Script Property REPLY_LINKS
// (JSON with the same keys). Templates use {trig} and {run} placeholders.
// An empty template means "omit that link"; the trig id still prints as text.
var REPLY_LINKS_DEFAULT = {
  operator: 'https://claude.ai/code/session_01C2UVGijivpuoTaE7giZxcX',
  task_url: '',      // e.g. 'https://claude.ai/code/routines/{trig}' once GK confirms the format
  run_url:  '',      // e.g. 'https://claude.ai/code/{run}'  (run = cse_... session id, passed by the lane as run_id)
  tags: {
    '[health/day-starter]':   'trig_01K4tuBhUWkx5T2zng9EGoUZ',
    '[health/dashboard]':     'trig_015FawZA8WSPD48WaR6BKxCZ',
    '[health/food-log]':      'trig_01NefDkKLay4w9h3hq4uwHCy',
    '[health/deep-dive]':     'trig_01JDyizM6v51Sh4FkioxcGTv',
    '[health/program-ingest]':'trig_01QNjVRPMc8ikFkyGstvE7SU',
    '[health/quote-rotor]':   'trig_019T7RGV32FCCL8FTTs4peyB',
    '[ea/evening-wrap]':      'trig_01C48JxTnfMsiJptT5zTqbH6',
    '[ea/nightly-board]':     'trig_01J7oNsgLffUT9m9Dbxs9w1X',
    '[ea/domains]':           'trig_01J7oNsgLffUT9m9Dbxs9w1X',
    '[ea/shortlist]':         'trig_01J7oNsgLffUT9m9Dbxs9w1X',
    '[ea/triage]':            'trig_01R9EkoZsM9tH99jhdFrQ8gk',
    '[ea/decisions]':         'trig_01Anr8ffut2HitUNoAsLaPRC',
    '[ea/reflect]':           'trig_018qctz95VRFhrmPkmTT3kzb',
    '[ea/morning-sweep]':     'trig_01Ef6Ys9jLCdVbD75RjPrfby',
    '[ea/evening-sweep]':     'trig_01QKasu3mxcqSpWkfSLV8svu',
    '[inbox/am]':             'trig_01HEMJZMShmJsXBfhLb1Wfyc',
    '[inbox/mid]':            'trig_016msLq5qw4bySHk6ENodUk5',
    '[inbox/pm]':             'trig_01Ptx6GPwkKG4ECvPShh4Ykp',
    '[mtg/pre]':              'trig_01TmYQRWtboU7Ue3JjbnqHQr',
    '[mtg/post]':             'trig_01TmYQRWtboU7Ue3JjbnqHQr',
    '[mtg/briefer]':          'trig_01TmYQRWtboU7Ue3JjbnqHQr',
    '[job/scan]':             'trig_01MjLndfhiwSLmAobtnbN2gW',
    '[job/pipeline]':         'trig_01Cs8bLp9aFU4mZSpveAdvfH',
    '[job/weekly-update]':    'trig_01DrfWe2JyQxSfqyxJMFNJca',
    '[goals/weekly-review]':  'trig_016D1R35B6C7LTx7XZQiKApM',
    '[sys/command-lane]':     'trig_01YZ9Deg5oohEySE3vuCuqtg',
    '[sys/fallback-sweep]':   'trig_01WA5JrGbnf2B7QK2inSNmLL',
    '[sys/spend-watch]':      'trig_01WA5JrGbnf2B7QK2inSNmLL',
    '[sys/catch-up]':         'trig_01KUTNvzbXMr7V8MD79EjKyf',
    '[sys/overdue-watchdog]': 'trig_01S41FQrTeuPUP1QDMSvVnE9',
    '[sys/slot-watchdog]':    'trig_012xdCSMUUxyafKNgCpYefRy',
    '[sys/tick-snapshot]':    'trig_01Va91pV8tPka8hH8HiyHuZN',
    '[job/referrals]':        'trig_013uk4K3kV4SZy2E2UVxYSVD',
    '[job/network-refresh]':  'trig_011Zo8jbrvLevPwsdtavtQx2'
  }
};
function replyLinks_() {
  var cfg = JSON.parse(JSON.stringify(REPLY_LINKS_DEFAULT));
  try {
    var raw = PropertiesService.getScriptProperties().getProperty('REPLY_LINKS');
    if (raw) { var o = JSON.parse(raw); for (var k in o) { if (k === 'tags') { for (var t in o.tags) cfg.tags[t] = o.tags[t]; } else cfg[k] = o[k]; } }
  } catch (e) {}
  return cfg;
}
function esc_(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
/** v7.9: append the reply-link footer to a MAIN text. Idempotent; strips a
 *  lane-written "↩️ task:" line so the rendered footer is the only one. */
function withReplyFooter_(text, parseMode, hints) {
  try {
    hints = hints || {};
    var cfg = replyLinks_();
    var t = String(text);
    if (cfg.operator && t.indexOf(cfg.operator) !== -1) return t;            // already footed
    t = t.replace(/\n+↩️ task:[^\n]*$/, '');                                   // lane-written text footer → replaced
    var tag = nameTag_(t);
    var trig = hints.trig_id || (tag && cfg.tags[tag]) || null;
    var run = hints.run_id || null;
    var html = (String(parseMode || '').toUpperCase() === 'HTML');
    var parts = [];
    if (cfg.operator) parts.push(html ? '<a href="' + cfg.operator + '">reply to Claude</a>' : 'reply: ' + cfg.operator);
    if (trig) {
      var tu = cfg.task_url ? String(cfg.task_url).replace('{trig}', trig) : '';
      parts.push(tu ? (html ? '<a href="' + tu + '">task</a>' : 'task: ' + tu) : (html ? 'task <code>' + esc_(trig) + '</code>' : 'task ' + trig));
    }
    if (run) {
      var ru = cfg.run_url ? String(cfg.run_url).replace('{run}', run) : '';
      parts.push(ru ? (html ? '<a href="' + ru + '">this run</a>' : 'run: ' + ru) : (html ? 'run <code>' + esc_(run) + '</code>' : 'run ' + run));
    }
    if (!parts.length) return t;
    return t + '\n\n↩️ ' + parts.join(' · ');
  } catch (e) { return String(text); }
}

var WD_SILENT_HOURS  = 20;  // v7.5: fleet considered dead after this many hours of sent-log silence
var WD_INBOX_FAILS   = 3;   // v7.5: consecutive pollInbox failures before alerting
var WD_INBOX_QUIET_HOURS = 168; // v7.6.2: hours of inbound silence before the reply lane is questioned (was 48; GK often goes a week without texting the bot)
var WD_REALERT_HOURS = 6;   // v7.5: minimum gap between repeat alerts of the same kind

var MIRROR_FOLDER = 'telegram-mirror';   // v7.8
var MIRROR_TZ = 'America/New_York';      // v7.8

var RUN_START = 0;                       // v7.4 time box
var RUN_BUDGET_MS = 270000;              // 4.5 min hard stop; the 5-min trigger resumes the rest
function timeLeft_() { return RUN_START ? (RUN_BUDGET_MS - (Date.now() - RUN_START)) : RUN_BUDGET_MS; }

function fleetRoot_() {
  try { return DriveApp.getFolderById(FLEET_ID); } catch (e) { return null; }
}

function main() {
  // v7.4 LOCK: a second overlapping run exits instantly — double-sends are dead.
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return;
  RUN_START = Date.now();
  try {
    try { relayTelegram(); } catch (e) { console.error('relayTelegram', e); }
    if (timeLeft_() > 0) { try { relayTickTick(); } catch (e) { console.error('relayTickTick', e); } }
    if (timeLeft_() > 0) { try { relayUsps(); }     catch (e) { console.error('relayUsps', e); } }
    if (timeLeft_() > 0) {
      try { pollInbox(); }
      catch (e) { console.error('pollInbox', e); watchdogInboxFail_(e); }      // v7.5: thrown errors also count
    }
    if (timeLeft_() > 30000) { try { archiveSweep_(); } catch (e) { console.error('archiveSweep', e); } }
    if (timeLeft_() > 10000) { try { watchdogTick_(); } catch (e) { console.error('watchdogTick', e); } } // v7.5
    if (timeLeft_() > 20000) { try { mirrorGapReport_(); } catch (e) { console.error('mirrorGapReport', e); } } // v7.8
  } finally {
    lock.releaseLock();
  }
}

// ===================== v7.5 WATCHDOG =====================
/** Runs at the end of every main() tick. Cheap: two Drive metadata reads. */
function watchdogTick_() {
  var props = PropertiesService.getScriptProperties();
  var now = Date.now();
  var root = fleetRoot_(); if (!root) return;

  // 1) FLEET-SILENCE: the sent-log hasn't grown in WD_SILENT_HOURS while THIS
  //    trigger is clearly alive (it's running right now) → the cloud env is down.
  var slog = newestByName_(root, 'telegram-sent-log.jsonl');
  var slogAgeH = slog ? (now - slog.getLastUpdated().getTime()) / 36e5 : null;
  if (slogAgeH !== null && slogAgeH > WD_SILENT_HOURS) {
    if (wdShouldAlert_(props, 'wd_last_silent_alert', now)) {
      wdSend_('🚨 [relay/watchdog] FLEET SILENT — no Telegram deliveries logged in ' +
              slogAgeH.toFixed(1) + 'h (last sent-log write ' + slog.getLastUpdated() + '). ' +
              'The cloud env is likely down; scheduled tasks are firing into a dead ' +
              'environment. Nothing cloud-side can tell you this — that is why this alert ' +
              'lives in the relay. Self-heal guards will backfill when it recovers.');
      props.setProperty('wd_last_silent_alert', String(now));
    }
  } else {
    props.deleteProperty('wd_last_silent_alert');   // healthy again → re-arm
  }

  // 2) REPLY-LANE STALENESS: sends flowing but the inbox file untouched >48h ⇒ the
  //    reply lane is dead even if getUpdates "succeeds" (e.g. a second consumer is
  //    eating the updates, so every poll comes back ok+empty).
  var inbox = newestByName_(root, 'telegram-inbox.jsonl');
  var inboxAgeH = inbox ? (now - inbox.getLastUpdated().getTime()) / 36e5 : null;
  if (inboxAgeH !== null && inboxAgeH > WD_INBOX_QUIET_HOURS && slogAgeH !== null && slogAgeH < 24) {
    if (wdShouldAlert_(props, 'wd_last_inboxstale_alert', now)) {
      wdSend_('⚠️ [relay/watchdog] no inbound Telegram messages captured in ' +
              inboxAgeH.toFixed(0) + 'h (sends are flowing normally). This is EXPECTED if ' +
              'you simply have not texted the bot — I cannot tell that apart from a broken ' +
              'reply lane. One-text test: send "ping test" here; if it lands in ' +
              'telegram-inbox.jsonl within ~5 min the lane is healthy and you can ignore ' +
              'this. If it does NOT land, run wdDiagnoseInbox() in the Apps Script editor ' +
              '(a second getUpdates consumer or a stray webhook is the usual culprit). ' +
              'Telegram only retains unconsumed updates ~24h.');
      props.setProperty('wd_last_inboxstale_alert', String(now));
    }
  } else if (inboxAgeH !== null && inboxAgeH <= WD_INBOX_QUIET_HOURS) {
    props.deleteProperty('wd_last_inboxstale_alert');
  }
}

/** Called on every pollInbox success (including "nothing new"). */
function watchdogInboxOk_() {
  PropertiesService.getScriptProperties().deleteProperty('wd_inbox_fail_count');
}

/** Called when getUpdates errors (ok:false / non-200 / thrown). Alerts after
 *  WD_INBOX_FAILS consecutive failures, at most every WD_REALERT_HOURS. */
function watchdogInboxFail_(err) {
  try {
    var props = PropertiesService.getScriptProperties();
    var n = Number(props.getProperty('wd_inbox_fail_count') || '0') + 1;
    props.setProperty('wd_inbox_fail_count', String(n));
    var msg = String(err && err.message || err).slice(0, 200);
    var is409 = msg.indexOf('409') >= 0 || /conflict/i.test(msg) || /webhook/i.test(msg);
    if (n >= WD_INBOX_FAILS && wdShouldAlert_(props, 'wd_last_inboxfail_alert', Date.now())) {
      wdSend_('🚨 [relay/watchdog] pollInbox FAILING (' + n + 'x in a row): ' + msg +
              (is409 ? ' — 409/webhook conflict: another getUpdates consumer or a webhook is ' +
                       'stealing updates. Fix: run wdClearWebhook() in the editor, then ensure ' +
                       'nothing else polls this bot.'
                     : ' — run wdDiagnoseInbox() in the editor.') +
              ' Your Telegram replies are NOT being captured.');
      props.setProperty('wd_last_inboxfail_alert', String(Date.now()));
    }
  } catch (e) { console.error('watchdogInboxFail_', e); }
}

function wdShouldAlert_(props, key, now) {
  var last = Number(props.getProperty(key) || '0');
  return (now - last) / 36e5 > WD_REALERT_HOURS;
}

/** Direct sendMessage — deliberately NOT via sendText_/sent-log: a stale sent-log is
 *  often exactly what it's reporting, and dedupe/probe guards must never eat an alarm.
 *  Rate-limiting is done by the wd_last_* properties instead. v7.8: mirrored, so the
 *  mirror is the one place that sees every message including alarms. */
function wdSend_(text) {
  var r = UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT + '/sendMessage', {
    method: 'post', contentType: 'application/json', muteHttpExceptions: true,
    payload: JSON.stringify({ chat_id: CHAT, text: text })
  });
  try {                                                                         // v7.8
    var mid = null;
    if (r.getResponseCode() === 200) { try { mid = JSON.parse(r.getContentText()).result.message_id; } catch (e) {} }
    mirrorOut_('watchdog', text, 'main', { mid: mid, family: 'watchdog' });
  } catch (e) {}
}

/** Manual: verify alerts can reach you. Expect one 🧪 message in MAIN. */
function watchdogSelfTest() {
  wdSend_('🧪 [relay/watchdog] self-test ok — fleet-silence threshold ' + WD_SILENT_HOURS +
          'h · inbox-fail threshold ' + WD_INBOX_FAILS + 'x · re-alert gap ' + WD_REALERT_HOURS + 'h.');
  Logger.log('Self-test sent to MAIN. If no Telegram message arrived, the BOT token or chat id is wrong.');
}

/** Manual: prints the full inbox diagnosis to the Execution log (bottom panel of the
 *  editor after Run — NOT the Executions page). Consumes nothing; safe any time. */
function wdDiagnoseInbox() {
  var props = PropertiesService.getScriptProperties();
  var rawOffset = props.getProperty('tg_offset');
  Logger.log('0) bot token source: ' + (PropertiesService.getScriptProperties().getProperty('BOT_TOKEN') ? 'Script Property BOT_TOKEN' : 'inline constant') + ', ' + BOT.length + ' chars');  // v7.8.1
  Logger.log('1) tg_offset property: ' + rawOffset);

  var w = UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT + '/getWebhookInfo',
                            { muteHttpExceptions: true });
  Logger.log('2) getWebhookInfo: ' + w.getContentText().slice(0, 400));

  var offset = Number(rawOffset || 0);
  if (!isFinite(offset) || offset < 0) offset = 0;
  var res = UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT +
    '/getUpdates?timeout=0&offset=' + (offset + 1), { muteHttpExceptions: true });
  Logger.log('3) getUpdates HTTP ' + res.getResponseCode() + ': ' + res.getContentText().slice(0, 600));

  var root = fleetRoot_();
  var inbox = root ? newestByName_(root, 'telegram-inbox.jsonl') : null;
  var slog  = root ? newestByName_(root, 'telegram-sent-log.jsonl') : null;
  Logger.log('4) telegram-inbox.jsonl last written: ' + (inbox ? inbox.getLastUpdated() : 'NOT FOUND'));
  Logger.log('5) telegram-sent-log.jsonl last written: ' + (slog ? slog.getLastUpdated() : 'NOT FOUND'));

  Logger.log('VERDICT GUIDE — read line 3:\n' +
    '  • "ok":false with 409/conflict/webhook → a webhook or second consumer is stealing updates. Run wdClearWebhook(), re-run this.\n' +
    '  • "ok":false with 401/unauthorized → bot token wrong/revoked (BotFather).\n' +
    '  • "ok":true,"result":[] AND you texted the bot in the last few minutes → either the offset is wrong (run wdResetOffset(), text the bot, re-run) or another consumer already ate the update (find and kill it — nothing else may call getUpdates on this bot).\n' +
    '  • "ok":true with your message visible in result → capture works; the next main() tick will process and log it. If line 4 stays stale anyway, tell the Cowork chat.');
}

/** Manual: remove a stray webhook (the 409 fix). */
function wdClearWebhook() {
  var r = UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT + '/deleteWebhook',
                            { muteHttpExceptions: true });
  Logger.log('deleteWebhook: ' + r.getContentText());
}

/** Manual: clear a stuck/corrupt offset. Next poll starts from Telegram's oldest retained update. */
function wdResetOffset() {
  PropertiesService.getScriptProperties().deleteProperty('tg_offset');
  Logger.log('tg_offset cleared. Text the bot something, wait one trigger cycle, then check telegram-inbox.jsonl (or re-run wdDiagnoseInbox).');
}

// ===================== v7.8 TELEGRAM MIRROR =====================
/** Outbound row. Called from inside logSent_ (every successful send) and wdSend_.
 *  content = full message text, or the file name for documents. extra = the same
 *  bag logSent_ receives (mid, family, task_id, project_id, reply_to, silent, edited). */
function mirrorOut_(kind, content, dest, extra) {
  try {
    extra = extra || {};
    var text = String(content == null ? '' : content);
    var isDoc = (kind === 'document');
    var lf = mirrorLane_(isDoc ? '' : text);
    var row = {
      ts: new Date().toISOString(),
      dir: 'out',
      chat: (dest === 'ops' || String(dest) === OPS) ? 'ops' : 'main',
      kind: kind,
      mid: extra.mid || null,
      family: extra.family || lf.family || null,
      lane: lf.lane,
      task_id: extra.task_id || null,
      project_id: extra.project_id || null,
      reply_to: extra.reply_to || null,
      silent: extra.silent === true ? true : undefined,
      edited: extra.edited === true ? true : undefined,
      text: isDoc ? '' : text,
      doc_name: isDoc ? text : null,
      chars: text.length,
      chunks: isDoc ? 1 : Math.max(1, Math.ceil(text.length / 4000)),
      sha256: mirrorSha_(text)
    };
    mirrorAppend_([row]);
  } catch (e) { console.error('mirrorOut_', e); }
}

/** Inbound rows. Called from pollInbox with the SAME JSON strings it just appended to
 *  telegram-inbox.jsonl, so the two files can never disagree. */
function mirrorInLines_(lines) {
  try {
    var rows = [];
    for (var i = 0; i < lines.length; i++) {
      var r; try { r = JSON.parse(lines[i]); } catch (e) { continue; }
      var text = String(r.text || '');
      var lf = mirrorLane_(text);
      rows.push({
        ts: r.ts ? new Date(Number(r.ts) * 1000).toISOString() : new Date().toISOString(),
        dir: 'in',
        chat: r.chat === 'ops' ? 'ops' : 'main',
        kind: r.kind || 'text',
        mid: r.message_id || null,
        family: r.family || lf.family || null,
        lane: lf.lane,
        task_id: r.task_id || null,
        reply_to: r.reply_to || null,
        emoji: r.emoji || undefined,
        text: text,
        quote: r.quote || undefined,
        chars: text.length,
        from: r.from || null,
        update_id: r.update_id || null,
        applied: !!r.applied,
        sha256: mirrorSha_(text)
      });
    }
    if (rows.length) mirrorAppend_(rows);
  } catch (e) { console.error('mirrorInLines_', e); }
}

/** Once per ~30 min: message_id gaps per chat inside today's observed range. Human
 *  replies are expected gaps; anything else is a foreign sender. One row per change. */
function mirrorGapReport_() {
  var cache = null;
  try { cache = CacheService.getScriptCache(); if (cache.get('mirror_gap')) return; cache.put('mirror_gap', '1', 1800); } catch (e) {}
  var f = mirrorFile_(false);
  if (!f) return;
  var rows = f.getBlob().getDataAsString().split('\n').filter(String);
  var seen = { main: {}, ops: {} }, lo = { main: Infinity, ops: Infinity }, hi = { main: -Infinity, ops: -Infinity };
  var lastSig = null;
  for (var i = 0; i < rows.length; i++) {
    var r; try { r = JSON.parse(rows[i]); } catch (e) { continue; }
    if (r.kind === 'gap-report') { lastSig = r.sig; continue; }
    var mid = Number(r.mid || 0);
    if (!mid || !seen[r.chat]) continue;
    seen[r.chat][mid] = true;
    if (mid < lo[r.chat]) lo[r.chat] = mid;
    if (mid > hi[r.chat]) hi[r.chat] = mid;
  }
  var gaps = {};
  ['main', 'ops'].forEach(function (c) {
    if (!isFinite(lo[c]) || hi[c] - lo[c] > 5000) return;
    var g = [];
    for (var m = lo[c]; m <= hi[c]; m++) if (!seen[c][m]) g.push(m);
    if (g.length) gaps[c] = g;
  });
  var sig = JSON.stringify(gaps);
  if (sig === lastSig || !Object.keys(gaps).length) return;
  mirrorAppend_([{ ts: new Date().toISOString(), dir: 'meta', kind: 'gap-report', sig: sig, gaps: gaps,
                   note: 'message_ids in today\'s range the relay neither sent nor received; human messages are expected here' }]);
}

/** Manual: writes ONE local test row, sends nothing to Telegram. */
function mirrorSelfTest() {
  mirrorAppend_([{ ts: new Date().toISOString(), dir: 'test', kind: 'selftest',
                   text: 'mirror self test ' + new Date().toISOString(), sha256: mirrorSha_('selftest') }]);
  var f = mirrorFile_(false);
  var n = f ? f.getBlob().getDataAsString().split('\n').filter(String).length : 0;
  Logger.log('mirror ok: ' + (f ? f.getName() : 'NO FILE') + ' (' + n + ' rows)');
}

function mirrorFolder_() {
  var root = fleetRoot_();
  if (!root) return null;
  var it = root.getFoldersByName(MIRROR_FOLDER);
  return it.hasNext() ? it.next() : root.createFolder(MIRROR_FOLDER);
}

function mirrorFile_(create) {
  var folder = mirrorFolder_();
  if (!folder) return null;
  var name = 'telegram-mirror-' + Utilities.formatDate(new Date(), MIRROR_TZ, 'yyyy-MM-dd') + '.jsonl';
  var it = folder.getFilesByName(name), best = null;
  while (it.hasNext()) { var f = it.next(); if (!best || f.getDateCreated() < best.getDateCreated()) best = f; }
  if (!best && create) best = folder.createFile(name, '', MimeType.PLAIN_TEXT);
  return best;
}

/** No LockService here: main() already holds the script lock and a nested tryLock
 *  would only stall. A doPost racing a main() tick can, rarely, drop one row; the
 *  sent-log and inbox files stay authoritative for that case. */
function mirrorAppend_(rows) {
  var f = mirrorFile_(true);
  if (!f) return;
  var add = rows.map(function (r) { return JSON.stringify(r); }).join('\n') + '\n';
  f.setContent(f.getBlob().getDataAsString() + add);
}

/** "[family/lane]" or "[lane]" at the head of a message → {family, lane}. */
function mirrorLane_(text) {
  var m = String(text || '').match(/^\s*(?:\S{1,4}\s+)?\[([a-z0-9._-]+)(?:\/([a-z0-9._-]+))?\]/i);
  if (!m) return { family: null, lane: null };
  return m[2] ? { family: m[1].toLowerCase(), lane: m[2].toLowerCase() }
              : { family: null, lane: m[1].toLowerCase() };
}

function mirrorSha_(s) {
  var d = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(s), Utilities.Charset.UTF_8);
  var h = '';
  for (var i = 0; i < d.length; i++) { var b = (d[i] + 256) % 256; h += (b < 16 ? '0' : '') + b.toString(16); }
  return h;
}

// ===================== doPost (v6 health ingest + v7 doc logging) =====================
function doPost(e) {
  try {
    var secret = PropertiesService.getScriptProperties().getProperty('RELAY_SECRET');

    // v6 HEALTH INGEST: Health Auto Export authenticates via URL query params.
    if (e && e.parameter && e.parameter.src === 'health') {
      if (!secret || e.parameter.k !== secret) return json_({ ok: false, error: 'bad secret' });
      return json_(saveHealth_(e));
    }

    // v4/v5 contract, unchanged: JSON body with the secret inside.
    var body = JSON.parse(e.postData.contents);
    if (!secret || body.secret !== secret) return json_({ ok: false, error: 'bad secret' });

    // ── v7.9.3 VERSION PROBE: no Telegram traffic, no Drive writes.
    if (body.op === 'version') {
      return json_({ ok: true, version: RELAY_VERSION,
                     ops: ['text', 'document', 'react', 'edit_family', 'coda', 'drive_put', 'drive_get', 'recency_index', 'version'] });
    }

    // ── v7.9.1 DRIVE PUT (2026-09-03): lets a cloud lane write a LARGE file to Drive
    // by POSTing bytes from disk (python requests), so the content never has to pass
    // through the model's context. Secret-gated; destination folders allowlisted.
    if (body.op === 'drive_put') {
      var PUT_FOLDERS = {
        fleet:   FLEET_ID,                                   // Claude-Fleet-State
        network: '1zhfQM1drFs8-PdxSdLm1thOpsNGsMJpa',        // job-search-network
        outbox:  '184JoMq2Kg2ZsKNLDHLbOswag9XpKrur8'         // telegram-outbox
      };
      var fid = PUT_FOLDERS[String(body.folder || '')] || null;
      if (!fid) return json_({ ok: false, error: 'drive_put: folder must be one of fleet|network|outbox' });
      var pname = String(body.name || '').replace(/[\\/:*?"<>|]/g, '_').slice(0, 200);
      if (!pname) return json_({ ok: false, error: 'drive_put: need name' });
      if (!body.base64) return json_({ ok: false, error: 'drive_put: need base64' });
      var pmime = String(body.mime || 'text/plain');
      var pbytes;
      try { pbytes = Utilities.base64Decode(body.base64); } catch (e) { return json_({ ok: false, error: 'drive_put: bad base64' }); }
      if (pbytes.length > 40 * 1024 * 1024) return json_({ ok: false, error: 'drive_put: over 40 MB' });
      var pblob = Utilities.newBlob(pbytes, pmime, pname);
      var pfile = DriveApp.getFolderById(fid).createFile(pblob);     // plain file, never converted
      try { logSent_('drive_put', pname, 'ops', { folder: body.folder, bytes: pbytes.length, file_id: pfile.getId() }); } catch (e) {}
      return json_({ ok: true, file_id: pfile.getId(), name: pfile.getName(), bytes: pbytes.length, mime: pfile.getMimeType() });
    }

    // ── v7.9.2 RECENCY INDEX (2026-09-03): build network-recency.json from the
    // newest messages.csv WITHOUT the bytes ever leaving Google. Dates + counts only.
    if (body.op === 'recency_index') {
      return json_(buildRecencyIndex_(body.gk_slug ? String(body.gk_slug) : ''));
    }

    // ── v7.9.2 DRIVE GET (2026-09-03): chunked base64 read of a file in an
    // allowlisted folder, for files over the Drive MCP's 10 MB download cap.
    if (body.op === 'drive_get') {
      var GET_FOLDERS = { fleet: FLEET_ID, network: NETWORK_FOLDER_ID, outbox: '184JoMq2Kg2ZsKNLDHLbOswag9XpKrur8' };
      var gfile = null;
      if (body.file_id) {
        try { gfile = DriveApp.getFileById(String(body.file_id)); } catch (e) { return json_({ ok: false, error: 'drive_get: no such file_id' }); }
        var okParent = false, pars = gfile.getParents();
        while (pars.hasNext()) { var pid = pars.next().getId(); for (var k in GET_FOLDERS) if (GET_FOLDERS[k] === pid) okParent = true; }
        if (!okParent) return json_({ ok: false, error: 'drive_get: file is not in an allowlisted folder' });
      } else {
        var gfid = GET_FOLDERS[String(body.folder || '')];
        if (!gfid) return json_({ ok: false, error: 'drive_get: folder must be one of fleet|network|outbox' });
        if (!body.name) return json_({ ok: false, error: 'drive_get: need name or file_id' });
        gfile = newestFileNamed_(gfid, String(body.name));
        if (!gfile) return json_({ ok: false, error: 'drive_get: no file named ' + body.name });
      }
      var gbytes = gfile.getBlob().getBytes();
      var goff = Math.max(0, Number(body.offset || 0));
      var glen = Math.min(Math.max(1, Number(body.length || 4194304)), 4194304);
      var gslice = gbytes.slice(goff, Math.min(gbytes.length, goff + glen));
      return json_({ ok: true, file_id: gfile.getId(), name: gfile.getName(), size: gbytes.length, offset: goff,
                     length: gslice.length, eof: goff + gslice.length >= gbytes.length,
                     modified: gfile.getLastUpdated().toISOString(), base64: Utilities.base64Encode(gslice) });
    }

    // ── v7.6 CODA PROXY: read the Supra member job board (Superhuman Docs =
    // Coda) server-side, because the cloud fleet's egress allowlist blocks
    // coda.io. Auth: body.coda_token, else Script Property CODA_TOKEN.
    if (body.op === 'coda') {
      var CODA_BASES = ['https://coda.io/apis/v1',
                        'https://docs.superhuman.com/developers/apis/v1'];
      var bi = Number(body.base_index || 0);
      if (!(bi >= 0 && bi < CODA_BASES.length)) bi = 0;
      var codaTok = body.coda_token ||
        PropertiesService.getScriptProperties().getProperty('CODA_TOKEN');
      var codaPath = String(body.path || '');
      if (!codaTok) return json_({ ok: false, error: 'coda: no token (send coda_token or set Script Property CODA_TOKEN)' });
      if (!codaPath) return json_({ ok: false, error: 'coda: need path' });
      if (codaPath.indexOf('://') !== -1) return json_({ ok: false, error: 'coda: path must be relative, no host' });
      if (codaPath.charAt(0) !== '/') codaPath = '/' + codaPath;
      var codaMethod = String(body.method || 'get').toLowerCase();
      if (codaMethod !== 'get' && codaMethod !== 'head' && body.allow_write !== true) {
        return json_({ ok: false, error: 'coda: read-only proxy (GET/HEAD); pass allow_write:true to override' });
      }
      var cr = UrlFetchApp.fetch(CODA_BASES[bi] + codaPath, {
        method: codaMethod, muteHttpExceptions: true, followRedirects: true,
        headers: { 'Authorization': 'Bearer ' + codaTok, 'Accept': 'application/json' }
      });
      return json_({ ok: cr.getResponseCode() < 400, status: cr.getResponseCode(),
                     base: CODA_BASES[bi],
                     body: cr.getContentText().slice(0, 200000) });
    }

    var dest = (body.ops || String(body.chat_id || '') === OPS) ? OPS : CHAT; // v7.2 + v7.6.1 chat_id OPS routing
    var opts = {                                                              // v7.7 signal-layer flags (all optional)
      silent: body.silent === true, replyTo: body.reply_to || null, buttons: Array.isArray(body.buttons) ? body.buttons : null,
      thread: body.thread || null, editFamily: body.edit_family || null, pin: body.pin === true,
      family: body.family || null, taskId: body.task_id || null, projectId: body.project_id || null,
      trigId: body.trig_id || null, runId: body.run_id || null                 // v7.9 reply-link hints
    };
    var out;
    if (body.op === 'react') {                                                // v7.7 reactions
      if (!body.message_id) return json_({ ok: false, error: 'react: need message_id' });
      out = reactTo_(dest, body.message_id, body.emoji);
      if (out.ok) logSent_('reaction', String(body.emoji || '👍'), dest === OPS ? 'ops' : 'main', { reply_to: Number(body.message_id) });
    } else if (body.html_base64) {
      var docKey = 'doc|' + dest + '|' + (body.html_name || 'digest.html');    // v7.4.3
      if (isDupSend_(docKey)) return json_({ ok: true, deduped: true, detail: 'duplicate document suppressed (15-min window)' });
      var ndocKey = 'ndoc|' + dest + '|' + (body.html_name || 'digest.html').replace(/\d+/g, '#'); // v7.4.4
      if (body.allow_dup !== true && isDupSend_(ndocKey)) return json_({ ok: true, deduped: true, near: true, detail: 'near-duplicate document suppressed (same name shape, 15-min window)' });
      var blob = Utilities.newBlob(Utilities.base64Decode(body.html_base64), 'text/html',
                                   body.html_name || 'digest.html');
      var capRaw = String(body.caption || body.html_name || '');
      var capHtml = !!(body.caption && body.caption_html === true);
      if (dest === CHAT) {                                                    // v7.9 footer on the caption when it fits
        var capFooted = withReplyFooter_(capHtml ? capRaw : esc_(capRaw), 'HTML', { trig_id: opts.trigId, run_id: opts.runId });
        if (capFooted.length <= 1024) { capRaw = capFooted; capHtml = true; }
      }
      var dp = { chat_id: dest, caption: capRaw.slice(0, 1024), document: blob };
      if (capHtml) dp.parse_mode = 'HTML';
      sendExtras_(dp, dest, opts, true);                                       // v7.7 silent / reply_to / thread
      var r = UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT + '/sendDocument',
        { method: 'post', muteHttpExceptions: true, payload: dp });
      var okDoc = r.getResponseCode() === 200, docMid = null;
      if (okDoc) { try { docMid = JSON.parse(r.getContentText()).result.message_id; } catch (e) {} }
      if (okDoc) { logSent_('document', body.html_name || 'document', dest === OPS ? 'ops' : 'main',
                            { mid: docMid, family: opts.family, task_id: opts.taskId, silent: opts.silent ? true : undefined, reply_to: opts.replyTo });
                   markSent_(docKey); markSent_(ndocKey); } // v7.2 + v7.4.3 + v7.4.4
      if (okDoc && opts.pin && docMid) pinMessage_(dest, docMid, opts.family || 'doc');
      out = { ok: okDoc, message_id: docMid, detail: r.getContentText().slice(0, 300) };
    } else if (body.text) {
      out = sendText_(body.text, body.parse_mode || 'HTML', dest, body.allow_dup === true, opts); // v7.2 + v7.4.4 + v7.7
    } else {
      out = { ok: false, error: 'need text or html_base64 (or op:"react")' };
    }
    return json_(out);
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// ===================== v6 health ingest helper =====================
function saveHealth_(e) {
  var raw = (e.postData && e.postData.contents) || '';
  if (!raw) return { ok: false, error: 'empty body' };
  if (raw.length > 25 * 1024 * 1024) return { ok: false, error: 'payload too large' };

  var root = fleetRoot_();
  if (!root) return { ok: false, error: 'no fleet folder' };

  var sub = root.getFoldersByName('health-inbox');
  var inbox = sub.hasNext() ? sub.next() : root.createFolder('health-inbox');

  var name = 'health-export-' +
    Utilities.formatDate(new Date(), 'America/New_York', 'yyyy-MM-dd_HHmmss') + '.json';
  inbox.createFile(name, raw, MimeType.PLAIN_TEXT);

  // Heartbeat marker so cloud tasks can cheaply check ingest freshness.
  var props = PropertiesService.getScriptProperties();
  props.setProperty('health_last_ingest', new Date().toISOString());

  return { ok: true, saved: name, bytes: raw.length };
}

// ===================== v7 sent-log helper =====================
function logSent_(kind, content, dest, extra) {
  try { mirrorOut_(kind, content, dest, extra); } catch (e) {}                 // v7.8: the mirror sees every logged send
  try {
    var root = fleetRoot_();
    if (!root) return;
    var rec = {
      ts: new Date().toISOString(),
      kind: kind,
      dest: dest || 'main',
      chars: String(content).length,
      head: String(content)                    // v7.4.2: full text (was 200-char head)
    };
    if (extra) Object.keys(extra).forEach(function (k) { if (extra[k] !== undefined && extra[k] !== null && extra[k] !== '') rec[k] = extra[k]; }); // v7.7
    var line = JSON.stringify(rec);
    var it = root.getFilesByName('telegram-sent-log.jsonl'), best = null;
    while (it.hasNext()) { var f = it.next(); if (!best || f.getDateCreated() > best.getDateCreated()) best = f; }
    if (best && best.getSize() > 1000000) {                                    // rotate at ~1 MB
      var carry = '';                                                          // v7.7 ROTATION CARRY-FORWARD (48h)
      try {
        var cutoff = Date.now() - 48 * 3600000;
        var old = best.getBlob().getDataAsString().split('\n');
        var keep = [];
        for (var i = old.length - 1; i >= 0; i--) {
          var l = old[i]; if (!l) continue;
          var m = l.match(/"ts":"(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})/);
          if (!m) continue;
          if (Date.parse(m[1] + 'Z') < cutoff) break;
          keep.unshift(l);
        }
        carry = keep.length ? keep.join('\n') + '\n' : '';
      } catch (e2) { carry = ''; }
      best.setName('telegram-sent-log-' +
        Utilities.formatDate(new Date(), 'America/New_York', 'yyyy-MM-dd') + '.jsonl');
      root.createFile('telegram-sent-log.jsonl', carry + line + '\n', MimeType.PLAIN_TEXT);
      return;
    }
    if (best) best.setContent(best.getBlob().getDataAsString() + line + '\n');
    else root.createFile('telegram-sent-log.jsonl', line + '\n', MimeType.PLAIN_TEXT);
  } catch (e) { /* logging must never break sending */ }
}

// ===================== sendText_ (v7: logs on success) =====================
function sendText_(text, parseMode, chatId, allowDup, opts) {
  opts = opts || {};                                                           // v7.7
  var dest = chatId || CHAT;                                                   // v7.2
  var bare = String(text).trim().toLowerCase();                                // v7.4.5 main-probe guard (§15)
  if (dest === CHAT && (bare === 'placeholder' || bare === 'test' || bare === 'ping' ||
      bare === 'test-connectivity-ignore' || bare.length < 4)) {
    return sendText_('🧪 [relay-guard] main-blocked probe rerouted: "' + String(text).slice(0, 60) + '"',
                     '', OPS, true);
  }
  if (dest === CHAT) text = withReplyFooter_(text, parseMode, { trig_id: opts.trigId, run_id: opts.runId }); // v7.9
  var chunks = smartChunks_(text, 4000);                                       // v7.4.6
  var props = PropertiesService.getScriptProperties();

  // v7.7 LIVING MESSAGE: one message per family per ET day, edited in place.
  if (opts.editFamily && chunks.length === 1) {
    var ek = 'edit_' + dest + '_' + String(opts.editFamily).replace(/[^a-z0-9-]/gi, '') + '_' +
             Utilities.formatDate(new Date(), 'America/New_York', 'yyyy-MM-dd');
    var prevMid = props.getProperty(ek);
    if (prevMid) {
      var ep = { chat_id: dest, message_id: prevMid, text: chunks[0], disable_web_page_preview: 'true' };
      if (parseMode) ep.parse_mode = parseMode;
      if (opts.buttons) ep.reply_markup = JSON.stringify({ inline_keyboard: opts.buttons });
      var er = UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT + '/editMessageText',
        { method: 'post', muteHttpExceptions: true, payload: ep });
      if (er.getResponseCode() === 200) {
        logSent_('edit', text, dest === OPS ? 'ops' : 'main',
                 { mid: Number(prevMid), family: opts.editFamily, task_id: opts.taskId, project_id: opts.projectId, edited: true });
        return { ok: true, message_id: Number(prevMid), edited: true };
      }
      var ed = String(er.getContentText());
      if (/message is not modified/i.test(ed)) return { ok: true, message_id: Number(prevMid), edited: false, detail: 'unchanged' };
      // any other edit failure (deleted, too old) → fall through to a fresh send
    }
  }

  if (!opts.editFamily) {                                                      // dedupe guards apply to fresh sends only
    var dKey = 'txt|' + dest + '|' + text;                                     // v7.4.3
    if (isDupSend_(dKey)) return { ok: true, deduped: true, detail: 'duplicate suppressed (15-min window)' };
    var tag = nameTag_(text);                                                  // v7.4.4
    var isSOS = String(text).indexOf('🆘') === 0;                              // distress calls (§13) never near-suppressed
    var nKey = (tag && !isSOS) ? 'ntxt|' + dest + '|' + tag : null;
    if (!allowDup && nKey && isDupSend_(nKey)) return { ok: true, deduped: true, near: true, detail: 'near-duplicate suppressed (same ' + tag + ' to same chat, 15-min window)' };
  }

  var last = null, lastMid = null;
  for (var ci = 0; ci < chunks.length; ci++) {
    var chunk = chunks[ci];
    var payload = { chat_id: dest, parse_mode: parseMode, text: chunk, disable_web_page_preview: 'true' }; // v7.4.5
    sendExtras_(payload, dest, opts, ci === 0);                                // v7.7 silent / reply_to / thread / buttons
    last = UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT + '/sendMessage',
      { method: 'post', muteHttpExceptions: true, payload: payload });
    if (last.getResponseCode() !== 200) {  // HTML parse error → strip tags, retry plain (v7.4.6)
      var p2 = { chat_id: dest, text: htmlToPlain_(chunk), disable_web_page_preview: 'true' };
      sendExtras_(p2, dest, opts, ci === 0);
      last = UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT + '/sendMessage',
        { method: 'post', muteHttpExceptions: true, payload: p2 });
    }
    if (last.getResponseCode() === 200) { try { lastMid = JSON.parse(last.getContentText()).result.message_id; } catch (e) {} }
  }
  var ok = last && last.getResponseCode() === 200;
  if (ok) {
    logSent_('text', text, dest === OPS ? 'ops' : 'main',
             { mid: lastMid, family: opts.family || opts.editFamily, task_id: opts.taskId, project_id: opts.projectId,
               silent: opts.silent ? true : undefined, reply_to: opts.replyTo });          // v7.2 + v7.7
    if (!opts.editFamily) { markSent_(dKey); if (nKey) markSent_(nKey); }     // v7.4.3 + v7.4.4
    if (opts.editFamily && chunks.length === 1 && lastMid) props.setProperty(ek, String(lastMid));
    if (opts.pin && lastMid) pinMessage_(dest, lastMid, opts.family || opts.editFamily || 'default');
  }
  return { ok: ok, message_id: lastMid, detail: last ? last.getContentText().slice(0, 300) : 'no text' };
}

/** v7.7: shared payload extras for sendMessage/sendDocument. */
function sendExtras_(payload, dest, opts, firstChunk) {
  if (opts.silent) payload.disable_notification = 'true';
  if (opts.replyTo && firstChunk) { payload.reply_to_message_id = String(opts.replyTo); payload.allow_sending_without_reply = 'true'; }
  if (opts.buttons && firstChunk) payload.reply_markup = JSON.stringify({ inline_keyboard: opts.buttons });
  if (opts.thread && dest === OPS) {
    var tid = opsTopicId_(opts.thread);
    if (tid) payload.message_thread_id = String(tid);
  }
}

/** v7.7: OPS forum topic name → thread id, from Script Property OPS_TOPICS (JSON). */
function opsTopicId_(name) {
  try {
    var raw = PropertiesService.getScriptProperties().getProperty('OPS_TOPICS');
    if (!raw) return null;
    var map = JSON.parse(raw);
    var v = map[String(name).toLowerCase()];
    return v ? Number(v) : null;
  } catch (e) { return null; }
}

/** v7.7: pin silently, unpin the previous pin of the same family. */
function pinMessage_(dest, mid, family) {
  try {
    var props = PropertiesService.getScriptProperties();
    var key = 'pin_' + dest + '_' + String(family).replace(/[^a-z0-9-]/gi, '');
    var prev = props.getProperty(key);
    if (prev && String(prev) !== String(mid)) {
      UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT + '/unpinChatMessage',
        { method: 'post', muteHttpExceptions: true, payload: { chat_id: dest, message_id: prev } });
    }
    var r = UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT + '/pinChatMessage',
      { method: 'post', muteHttpExceptions: true, payload: { chat_id: dest, message_id: mid, disable_notification: 'true' } });
    if (r.getResponseCode() === 200) props.setProperty(key, String(mid));
  } catch (e) { /* pinning must never break sending */ }
}

/** v7.7: bot reacts to a message (acknowledgment without a new message). */
function reactTo_(dest, mid, emoji) {
  var r = UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT + '/setMessageReaction',
    { method: 'post', contentType: 'application/json', muteHttpExceptions: true,
      payload: JSON.stringify({ chat_id: dest, message_id: Number(mid),
                                reaction: [{ type: 'emoji', emoji: emoji || '👍' }] }) });
  return { ok: r.getResponseCode() === 200, detail: r.getContentText().slice(0, 200) };
}

/** v7.7: resolve a bot message id → {task_id, project_id, family} from the sent-log (newest file, scanned from the end). */
function findByMid_(root, dest, mid) {
  try {
    var f = newestByName_(root, 'telegram-sent-log.jsonl');
    if (!f) return null;
    var lines = f.getBlob().getDataAsString().split('\n');
    var want = '"mid":' + Number(mid);
    for (var i = lines.length - 1; i >= 0; i--) {
      var l = lines[i];
      if (l.indexOf(want) === -1) continue;
      var o = JSON.parse(l);
      if (o.mid !== Number(mid)) continue;
      if ((o.dest || 'main') !== (dest === OPS ? 'ops' : 'main')) continue;
      return o;
    }
  } catch (e) {}
  return null;
}

/** v7.7: UTF-8 mojibake repair for outbox files written with the wrong charset. */
function fixMojibake_(s) {
  s = String(s);
  if (!/Ã.|Â.|â€/.test(s)) return s;
  try {
    var bytes = [];
    for (var i = 0; i < s.length; i++) { var c = s.charCodeAt(i); if (c > 255) return s; bytes.push(c); }
    var fixed = Utilities.newBlob(bytes).getDataAsString('UTF-8');
    return /�/.test(fixed) ? s : fixed;
  } catch (e) { return s; }
}


// ===================== v7.9.2 recency index (server-side) =====================
var NETWORK_FOLDER_ID = '1zhfQM1drFs8-PdxSdLm1thOpsNGsMJpa';   // job-search-network

/** Newest non-trashed file in a folder whose name equals `name` (or, if none,
 *  whose name starts with `name`). */
function newestFileNamed_(folderId, name) {
  var folder = DriveApp.getFolderById(folderId), best = null, bestT = 0;
  var it = folder.getFiles();
  while (it.hasNext()) {
    var f = it.next(); if (f.isTrashed()) continue;
    var n = f.getName();
    if (n === name || n.toLowerCase() === name.toLowerCase() || n.toLowerCase().indexOf(name.toLowerCase()) === 0) {
      var t = f.getLastUpdated().getTime();
      if (n === name) t += 1e12;                       // exact name always wins
      if (t > bestT) { bestT = t; best = f; }
    }
  }
  return best;
}

/** Editor entry point: Function dropdown -> buildRecencyIndex -> Run. */
function buildRecencyIndex() {
  var r = buildRecencyIndex_('');
  Logger.log(JSON.stringify(r));
  return r;
}

function slugOf_(url) {
  var m = String(url || '').match(/linkedin\.com\/in\/([^\/?#,\s]+)/i);
  return m ? m[1].toLowerCase() : '';
}

/** Parses the newest messages.csv in job-search-network and writes
 *  network-recency.json {slug: {last, first, count, from_gk, to_gk}}.
 *  Stores dates and counts ONLY. Names, subjects and content are never kept. */
function buildRecencyIndex_(gkSlug) {
  var t0 = Date.now();
  var src = newestFileNamed_(NETWORK_FOLDER_ID, 'messages.csv');
  if (!src) return { ok: false, error: 'recency_index: no messages.csv in job-search-network' };
  var text = src.getBlob().getDataAsString('UTF-8');
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
  var rows;
  try { rows = Utilities.parseCsv(text); } catch (e) { return { ok: false, error: 'recency_index: parseCsv failed: ' + e }; }
  text = null;
  if (!rows || rows.length < 2) return { ok: false, error: 'recency_index: csv has no rows' };
  var head = rows[0].map(function (h) { return String(h || '').trim().toUpperCase(); });
  function col(names) { for (var i = 0; i < names.length; i++) { var j = head.indexOf(names[i]); if (j >= 0) return j; } return -1; }
  var cFromUrl = col(['SENDER PROFILE URL']), cToUrl = col(['RECIPIENT PROFILE URLS', 'RECIPIENT PROFILE URL']),
      cDate = col(['DATE']), cDraft = col(['IS MESSAGE DRAFT']);
  if (cFromUrl < 0 || cToUrl < 0 || cDate < 0)
    return { ok: false, error: 'recency_index: missing columns; header = ' + head.join('|') };

  // GK's own slug: given, else the sender URL that appears most often.
  var senderCount = {};
  for (var r = 1; r < rows.length; r++) { var s0 = slugOf_(rows[r][cFromUrl]); if (s0) senderCount[s0] = (senderCount[s0] || 0) + 1; }
  var gk = String(gkSlug || '').toLowerCase(), gkN = -1;
  if (!gk) for (var s in senderCount) if (senderCount[s] > gkN) { gkN = senderCount[s]; gk = s; }

  var people = {}, used = 0, skipped = 0;
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    if (cDraft >= 0 && String(row[cDraft] || '').trim().toLowerCase() === 'yes') { skipped++; continue; }
    var d = String(row[cDate] || '').slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) { skipped++; continue; }
    var from = slugOf_(row[cFromUrl]);
    var tos = String(row[cToUrl] || '').split(/[,\s]+/).map(slugOf_).filter(function (x) { return x; });
    var others = [], fromGk = (from === gk);
    if (!fromGk && from) others.push(from);
    for (var q = 0; q < tos.length; q++) if (tos[q] !== gk && others.indexOf(tos[q]) < 0) others.push(tos[q]);
    if (!others.length) { skipped++; continue; }
    used++;
    for (var p = 0; p < others.length; p++) {
      var slug = others[p], rec = people[slug] || (people[slug] = { last: d, first: d, count: 0, from_gk: 0, to_gk: 0 });
      rec.count++; if (fromGk) rec.from_gk++; else rec.to_gk++;
      if (d > rec.last) rec.last = d; if (d < rec.first) rec.first = d;
    }
  }
  rows = null;
  var out = {
    generated_at: new Date().toISOString(),
    generator: 'relay v' + RELAY_VERSION + ' recency_index (server-side)',
    source_file: src.getName(), source_file_id: src.getId(),
    source_modified: src.getLastUpdated().toISOString(), source_bytes: src.getSize(),
    gk_slug: gk, rows_used: used, rows_skipped: skipped, people_count: Object.keys(people).length,
    note: 'dates and counts only; no names, subjects or message content are stored',
    people: people
  };
  var name = 'network-recency.json';
  var folder = DriveApp.getFolderById(NETWORK_FOLDER_ID);
  var olds = folder.getFilesByName(name); while (olds.hasNext()) { var o = olds.next(); if (!o.isTrashed()) o.setTrashed(true); }
  var f = folder.createFile(Utilities.newBlob(JSON.stringify(out), 'application/json', name));
  try { logSent_('recency_index', name, 'ops', { people: out.people_count, rows: used, file_id: f.getId(), ms: Date.now() - t0 }); } catch (e) {}
  return { ok: true, file_id: f.getId(), name: name, people_count: out.people_count, rows_used: used, rows_skipped: skipped,
           gk_slug: gk, source_file: out.source_file, source_modified: out.source_modified, ms: Date.now() - t0 };
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// ===================== v7.4.6 readability helpers =====================
/** Split at newline boundaries, never mid-word/mid-tag; hard cut only for a single
 *  monster line. */
function smartChunks_(text, max) {
  var out = [], s = String(text);
  while (s.length > max) {
    var cut = s.lastIndexOf('\n', max);
    if (cut < max * 0.5) cut = max;
    out.push(s.slice(0, cut));
    s = s.slice(cut).replace(/^\n+/, '');
  }
  if (s.length) out.push(s);
  return out;
}
/** Strip HTML tags + unescape common entities for the plain-text retry. */
function htmlToPlain_(s) {
  return String(s)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]{1,200}>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

// ===================== v7.4.4 near-dup tag =====================
/** Extracts the NAME-PREFIX LAW tag ("[family/task]") from the first 120 chars, lowercased.
 *  Returns null when absent (internal confirms, untagged notes) — near guard then skips. */
function nameTag_(text) {
  try {
    var m = String(text).slice(0, 120).match(/\[[a-z0-9-]+\/[a-z0-9-]+\]/i);
    return m ? m[0].toLowerCase() : null;
  } catch (e) { return null; }
}

// ===================== v7.4.3 dedupe guard =====================
/** True if this exact send already succeeded in the last 15 min. Marks the
 *  key only AFTER a successful send (markSent_), so failures retry freely. */
function isDupSend_(key) {
  try { return CacheService.getScriptCache().get(dedupeKey_(key)) !== null; }
  catch (e) { return false; }                    // cache down → never block sends
}
function markSent_(key) {
  try { CacheService.getScriptCache().put(dedupeKey_(key), '1', 900); }        // 15 min
  catch (e) { /* never break sending */ }
}
function dedupeKey_(s) {
  var d = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, String(s), Utilities.Charset.UTF_8);
  var h = '';
  for (var i = 0; i < d.length; i++) { var b = (d[i] + 256) % 256; h += (b < 16 ? '0' : '') + b.toString(16); }
  return 'dd_' + h;
}

// ===================== shared folder + queue helpers =====================
function box(name) {
  var root = fleetRoot_();
  if (!root) return null;
  var sub = root.getFoldersByName(name);
  return sub.hasNext() ? sub.next() : null;
}

function archiveBox_(b) {                                                      // v7.4
  var it = b.getFoldersByName('archive');
  return it.hasNext() ? it.next() : b.createFolder('archive');
}

function pending(folder) {
  var names = {}, out = [];
  var it0 = folder.getFiles();
  while (it0.hasNext()) { names[it0.next().getName()] = true; }
  var it = folder.getFiles();
  while (it.hasNext()) {
    var f = it.next(), n = f.getName();
    if (/\.(delivered|imessaged|fails|claimed)$/i.test(n)) continue;
    if (f.getSize() < 10 && f.getMimeType() !== MimeType.GOOGLE_DOCS) continue;
    if (/\.html?$/i.test(n) && f.getSize() < 1024) continue; // stub html, never deliver
    if (!names[n + '.delivered']) out.push(f);
  }
  return out;
}

function noteFailure(b, f, why) {
  var props = PropertiesService.getScriptProperties();
  var key = 'fail_' + f.getId();
  var fails = Number(props.getProperty(key) || 0) + 1;
  if (fails >= 3) {
    try { b.createFile(f.getName() + '.delivered',
      'DEAD-LETTER after 3 failures: ' + String(why).slice(0, 300),
      MimeType.PLAIN_TEXT); } catch (ignored) {}
    props.deleteProperty(key);
  } else {
    props.setProperty(key, String(fails));
  }
}
function clearFailure(f) {
  PropertiesService.getScriptProperties().deleteProperty('fail_' + f.getId());
}

// ===================== v7.4 content guard =====================
/** True if a queued "text" file must NOT be posted as text: Google-Doc-typed
 *  queue file (writer bug — the law says plain text), PDF bytes, or mostly
 *  non-printable content. Dead-letter + one ops note, never GK's chat. */
function looksBinaryOrDoc_(f, t) {
  if (f.getMimeType() === MimeType.GOOGLE_DOCS) return 'google-doc-typed queue file';
  var head = String(t).slice(0, 8);
  if (head.indexOf('%PDF') === 0) return 'PDF bytes in a text file';
  // v7.4.1: transport front-matter queued as message text (chat_id:/parse_mode:/slot:)
  var firstLine = String(t).split('\n')[0].trim();
  if (/^(chat_id|parse_mode|slot)\s*:/i.test(firstLine)) {
    return 'transport front-matter queued as message text (writer task must emit plain text)';
  }
  var sample = String(t).slice(0, 2000), bad = 0;
  for (var i = 0; i < sample.length; i++) {
    var c = sample.charCodeAt(i);
    if (c < 9 || (c > 13 && c < 32) || c === 65533) bad++;
  }
  if (sample.length > 100 && bad / sample.length > 0.1) return 'mostly non-printable content';
  return null;
}

// ===================== telegram-outbox lane (v7.4: time-box + guards + staleness) =====================
function unwrapEnvelope_(raw) {
  raw = String(raw).trim();
  if (raw.charAt(0) === '{') {
    try {
      var env = JSON.parse(raw);
      if (env && typeof env.text === 'string') return env.text;
      if (env && env.secret) return '[relay] suppressed a malformed envelope (no text field).';
    } catch (ignored) { /* not JSON, fall through */ }
  }
  var secret = PropertiesService.getScriptProperties().getProperty('RELAY_SECRET');
  if (secret && secret.length > 10 && raw.indexOf(secret) !== -1) {
    raw = raw.split(secret).join('[secret redacted]');
  }
  return raw;
}

/** v7.8: message_id out of a sendDocument response, or null. */
function docMid_(resp) {
  try { return JSON.parse(resp.getContentText()).result.message_id || null; } catch (e) { return null; }
}

function relayTelegram() {
  var b = box('telegram-outbox'); if (!b) return;
  // v7.3 PAIRING ORDER: text before its html sibling, pairs adjacent, one pass.
  var files = pending(b).sort(function (a, bF) {
    var an = a.getName(), bn = bF.getName();
    var ab = an.replace(/\.(tgmsg|md|txt|html?)$/i, ''), bb = bn.replace(/\.(tgmsg|md|txt|html?)$/i, '');
    if (ab !== bb) return ab < bb ? -1 : 1;              // group by basename
    return (/\.html?$/i.test(an) ? 1 : 0) - (/\.html?$/i.test(bn) ? 1 : 0);  // text first
  });
  var staleSkipped = [];                                                       // v7.4
  var processed = 0;
  files.forEach(function (f) {
    if (timeLeft_() < 40000 || processed >= 20) return;                        // v7.4 time box
    var n = f.getName();
    try {
      var ok = true;
      var dest = /\.ops\./i.test(n) ? OPS : CHAT;                              // v7.2

      // v7.4 STALENESS GATE: main-chat content older than 18h is never replayed.
      var ageH = (Date.now() - f.getDateCreated().getTime()) / 3600000;
      if (dest === CHAT && ageH > 18) {
        b.createFile(n + '.delivered', 'stale-skipped at ' + new Date().toISOString(),
                     MimeType.PLAIN_TEXT);
        staleSkipped.push(n);
        processed++;
        return;
      }

      if ((/\.(md|txt|tgmsg)$/i).test(n)) {
        var t = fixMojibake_(unwrapEnvelope_(f.getBlob().getDataAsString()));   // v7.7 encoding guard
        var why = looksBinaryOrDoc_(f, t);                                     // v7.4 content guard
        if (why) {
          b.createFile(n + '.delivered', 'DEAD-LETTER (content guard): ' + why,
                       MimeType.PLAIN_TEXT);
          sendText_('🔧 [relay-guard] refused to post "' + n + '" — ' + why +
                    '. The writer task should emit plain text (delivery law). File dead-lettered.',
                    '', OPS);
          processed++;
          return;
        }
        if (t.length < 12000) {
          ok = sendText_(t, 'HTML', dest).ok;
        } else {
          var rBig = UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT + '/sendDocument',
            { method: 'post', muteHttpExceptions: true,
              payload: { chat_id: dest, document: Utilities.newBlob(t, 'text/plain', n + '.txt') } });
          ok = (rBig.getResponseCode() === 200);
          if (ok) logSent_('document', n, dest === OPS ? 'ops' : 'main', { mid: docMid_(rBig) });   // v7.8: mid
        }
        if (!ok) console.error(n, 'sendMessage failed');
      } else {
        var r2 = UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT + '/sendDocument',
          { method: 'post', muteHttpExceptions: true,
            payload: { chat_id: dest, document: f.getBlob() } });
        ok = (r2.getResponseCode() === 200);
        if (ok) logSent_('document', n, dest === OPS ? 'ops' : 'main', { mid: docMid_(r2) });      // v7.2 + v7.8 mid
        if (!ok) console.error(n, 'sendDocument', r2.getResponseCode(),
                               r2.getContentText().slice(0, 300));
      }
      if (ok) { b.createFile(n + '.delivered', 'ok', MimeType.PLAIN_TEXT); clearFailure(f); }
      else    { noteFailure(b, f, 'telegram send failed'); }
      processed++;
    } catch (e) {
      console.error(n, e);
      noteFailure(b, f, e);
    }
  });
  if (staleSkipped.length) {                                                   // v7.4: one ops line, not N replays
    sendText_('🔧 [relay] staleness gate held ' + staleSkipped.length +
              ' backlog file(s) out of main: ' + staleSkipped.slice(0, 6).join(', ') +
              (staleSkipped.length > 6 ? ' …' : '') + ' (marked delivered, content in outbox archive)',
              '', OPS);
  }
}

// ===================== v7.4 archive sweep (keeps pending() scans fast) =====================
/** Moves finished pairs (file + its .delivered marker) into archive/ so the
 *  outbox stays small. Clock-limited; finishes over multiple ticks. */
function archiveSweep_() {
  var b = box('telegram-outbox'); if (!b) return;
  var arch = archiveBox_(b);
  var byName = {}, list = [];
  var it = b.getFiles();
  while (it.hasNext()) { var f = it.next(); byName[f.getName()] = f; list.push(f); }
  var moved = 0;
  for (var i = 0; i < list.length; i++) {
    if (timeLeft_() < 20000 || moved >= 40) break;
    var f2 = list[i], n = f2.getName();
    if (/\.(delivered|imessaged|fails|claimed)$/i.test(n)) continue;
    var marker = byName[n + '.delivered'];
    if (!marker) continue;
    var ageH = (Date.now() - f2.getDateCreated().getTime()) / 3600000;
    if (ageH < 24) continue;                       // keep the last day visible in place
    try { f2.moveTo(arch); marker.moveTo(arch); moved += 2; } catch (e) { /* skip */ }
  }
}

// ===================== ticktick-outbox lane (v3, unchanged) =====================
function relayTickTick() {
  var b = box('ticktick-outbox'); if (!b) return;
  var tok = PropertiesService.getScriptProperties().getProperty('TICKTICK_TOKEN');
  if (!tok) return;
  pending(b).forEach(function (f) {
    if (timeLeft_() < 30000) return;                                           // v7.4
    var n = f.getName();
    if (!(/\.json$/i).test(n)) return;
    try {
      var r = UrlFetchApp.fetch('https://api.ticktick.com/open/v1/task', {
        method: 'post', contentType: 'application/json', muteHttpExceptions: true,
        headers: { Authorization: 'Bearer ' + tok },
        payload: f.getBlob().getDataAsString() });
      var code = r.getResponseCode();
      if (code >= 200 && code < 300) {
        b.createFile(n + '.delivered', code + ': ' + r.getContentText().slice(0, 500),
                     MimeType.PLAIN_TEXT);
        clearFailure(f);
        sendText_('✅ [relay] TickTick task created via API: ' + n, 'HTML');
      } else {
        console.error(n, 'ticktick', code, r.getContentText().slice(0, 300));
        noteFailure(b, f, 'ticktick ' + code);
        if (code === 401)
          sendText_('⚠️ [relay] TickTick API 401 - token expired or rotated. Update TICKTICK_TOKEN in Script properties.', '');
      }
    } catch (e) {
      console.error(n, e);
      noteFailure(b, f, e);
    }
  });
}

// ===================== USPS export lane (v3, unchanged) =====================
function relayUsps() {
  var root = fleetRoot_();
  if (!root) return;
  var today = Utilities.formatDate(new Date(), 'America/New_York', 'yyyy-MM-dd');
  var inboxIt = root.getFoldersByName('usps-inbox');
  var inbox = inboxIt.hasNext() ? inboxIt.next() : root.createFolder('usps-inbox');
  var dayIt = inbox.getFoldersByName(today);
  if (dayIt.hasNext()) return;
  var threads = GmailApp.search(
    'from:USPSInformeddelivery@email.informeddelivery.usps.com newer_than:1d', 0, 1);
  if (!threads.length) return;
  var msg = threads[0].getMessages().slice(-1)[0];
  var atts = msg.getAttachments({ includeInlineImages: true, includeAttachments: true })
                .filter(function (a) { return /image\/(jpe?g|png)/.test(a.getContentType()); });
  if (!atts.length) return;
  var day = inbox.createFolder(today);
  atts.forEach(function (a) { day.createFile(a.copyBlob()).setName(a.getName()); });
  day.createFile('manifest.md', 'exported ' + atts.length + ' mailpiece image(s) from msg ' +
    msg.getId() + ' at ' + new Date().toISOString(), MimeType.PLAIN_TEXT);
}

// ===================== v5 reply poller + INSTANT APPLY (v7.5: loud failures) =====================
function pollInbox() {
  var props = PropertiesService.getScriptProperties();
  var offset = Number(props.getProperty('tg_offset') || 0);
  if (!isFinite(offset) || offset < 0) offset = 0;                             // v7.5 offset self-heal
  var allowed = encodeURIComponent(JSON.stringify(['message', 'edited_message', 'callback_query', 'message_reaction'])); // v7.7
  var res = UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT +
    '/getUpdates?timeout=0&offset=' + (offset + 1) + '&allowed_updates=' + allowed, { muteHttpExceptions: true });

  if (res.getResponseCode() !== 200) {                                         // v7.5: 409/401/5xx are FAILURES, not silence
    watchdogInboxFail_('getUpdates HTTP ' + res.getResponseCode() + ': ' +
                       res.getContentText().slice(0, 150));
    return;
  }
  var data = JSON.parse(res.getContentText());
  if (!data.ok) {                                                              // v7.5: ok:false is a FAILURE, not silence
    watchdogInboxFail_('getUpdates ok:false — ' + String(data.description || '').slice(0, 150));
    return;
  }
  watchdogInboxOk_();                                                          // v7.5: reaching here = the poll itself works
  if (!data.result.length) return;

  var root = fleetRoot_();
  if (!root) return;
  var maps = loadHandleMaps_(root);
  var lines = [], confirmsMain = [], confirmsOps = [], reactBack = [];

  data.result.forEach(function (u) {
    offset = Math.max(offset, u.update_id);

    // ── v7.7 REACTIONS: GK reacts on a bot message ──
    if (u.message_reaction) {
      var rx = u.message_reaction, rsrc = String(rx.chat.id);
      if (rsrc !== CHAT && rsrc !== OPS) return;
      if (rx.user && rx.user.is_bot) return;
      var emojis = (rx.new_reaction || []).filter(function (r) { return r.type === 'emoji'; }).map(function (r) { return r.emoji; });
      if (!emojis.length) return;                                              // reaction removed → nothing to apply
      var ctx = findByMid_(root, rsrc, rx.message_id);
      var confirms = (rsrc === OPS) ? confirmsOps : confirmsMain;
      var cmd = reactionToCmd_(emojis[0]);
      var applied = false;
      if (ctx && ctx.task_id && ctx.project_id && cmd) {
        applied = applyCmd_({ taskId: ctx.task_id, projectId: ctx.project_id }, cmd, shortLabel_(ctx), confirms);
        if (applied) reactBack.push({ chat: rsrc, mid: rx.message_id });
      }
      lines.push(JSON.stringify({ update_id: u.update_id, ts: rx.date, chat: rsrc === OPS ? 'ops' : 'main',
                                  kind: 'reaction', emoji: emojis[0], message_id: rx.message_id,
                                  task_id: ctx ? ctx.task_id : null, family: ctx ? ctx.family : null,
                                  text: cmd || emojis[0], from: rx.user ? rx.user.id : null, applied: applied }));
      return;
    }

    // ── v7.7 INLINE KEYBOARD TAPS ──
    if (u.callback_query) {
      var cq = u.callback_query, csrc = cq.message ? String(cq.message.chat.id) : '';
      try { UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT + '/answerCallbackQuery',
        { method: 'post', muteHttpExceptions: true, payload: { callback_query_id: cq.id } }); } catch (e) {}
      if (csrc !== CHAT && csrc !== OPS) return;
      var dataStr = String(cq.data || ''), cconf = (csrc === OPS) ? confirmsOps : confirmsMain;
      var ctask = null, ccmd = dataStr;
      var tm = dataStr.match(/^t\|([0-9a-f]{24})\|(.+)$/i);
      if (tm) { ccmd = tm[2]; ctask = taskFromId_(root, tm[1], cq.message ? findByMid_(root, csrc, cq.message.message_id) : null); }
      else { var cctx = cq.message ? findByMid_(root, csrc, cq.message.message_id) : null; if (cctx && cctx.task_id) ctask = { taskId: cctx.task_id, projectId: cctx.project_id }; }
      var capplied = ctask ? applyCmd_(ctask, ccmd, 'tap', cconf) : tryApply_(ccmd, maps, cconf);
      lines.push(JSON.stringify({ update_id: u.update_id, ts: Math.floor(Date.now() / 1000), chat: csrc === OPS ? 'ops' : 'main',
                                  kind: 'callback', text: dataStr, message_id: cq.message ? cq.message.message_id : null,
                                  task_id: ctask ? ctask.taskId : null, from: cq.from ? cq.from.id : null, applied: capplied }));
      return;
    }

    var m = u.message || u.edited_message;
    if (!m) return;
    var src = String(m.chat.id);                       // v7.4.2: capture BOTH pinned chats
    if (src !== CHAT && src !== OPS) return;
    if (m.from && m.from.is_bot) return;
    var text = m.text || m.caption || '';
    var confirms2 = (src === OPS) ? confirmsOps : confirmsMain;

    // ── v7.7 NATURAL REPLIES: quoted line / reply-to bot message → task context ──
    var replyTo = m.reply_to_message ? m.reply_to_message.message_id : null;
    var quote = (m.quote && m.quote.text) ? String(m.quote.text) : '';
    var rctx = replyTo ? findByMid_(root, src, replyTo) : null;
    var task = null;
    var idIn = (quote + ' ' + text).match(/\b([0-9a-f]{24})\b/i);
    if (rctx && rctx.task_id && rctx.project_id) task = { taskId: rctx.task_id, projectId: rctx.project_id };
    else if (idIn) task = taskFromId_(root, idIn[1], rctx);
    var applied2 = false;
    if (task) applied2 = applyCmd_(task, text.replace(/\b[0-9a-f]{24}\b/i, '').trim(), shortLabel_(rctx || { head: quote }), confirms2);
    if (!applied2) applied2 = tryApply_(text, maps, confirms2);              // legacy "JT3 done" still works
    if (applied2 && replyTo) reactBack.push({ chat: src, mid: m.message_id });

    lines.push(JSON.stringify({ update_id: u.update_id, ts: m.date,
                                chat: src === OPS ? 'ops' : 'main', text: text,
                                message_id: m.message_id,                   // v7.8: inbound mid for the mirror + gap report
                                reply_to: replyTo, quote: quote || undefined,
                                task_id: task ? task.taskId : undefined, family: rctx ? rctx.family : undefined,
                                from: m.from ? m.from.id : null, applied: applied2 }));
  });

  if (lines.length) { appendJsonl_(root, 'telegram-inbox.jsonl', lines); mirrorInLines_(lines); }   // v7.8: mirror inbound
  props.setProperty('tg_offset', String(offset));

  // v7.7: acknowledge applied replies with a reaction instead of a new message.
  reactBack.forEach(function (rb) { try { reactTo_(rb.chat, rb.mid, '👍'); } catch (e) {} });
  if (confirmsMain.length && !reactBack.length) {
    sendText_('⚡ instant-applied: ' + confirmsMain.join(' · ') +
              ' (anything else waits for the applier lanes)', '', CHAT, false, { silent: true });
  }
  if (confirmsOps.length && !reactBack.length) {                            // v7.4.2: confirm where the command came from
    sendText_('⚡ instant-applied: ' + confirmsOps.join(' · ') +
              ' (anything else waits for the applier lanes)', '', OPS, false, { silent: true });
  }
}

/** v7.7: emoji → command. ❌/👎 deliberately map to "abandon", which applyCmd_ never executes
 *  (it is recorded for the applier lanes, so a human veto window stays in front of every abandon). */
function reactionToCmd_(e) {
  var map = { '✅': 'done', '👌': 'done', '✔️': 'done', '👍': 'keep', '❤': 'keep', '❤️': 'keep', '🔥': 'keep',
              '⏰': 'tomorrow', '🕐': 'tomorrow', '😴': 'tomorrow', '❌': 'abandon', '👎': 'abandon', '🗑': 'abandon' };
  return map[e] || null;
}

function shortLabel_(ctx) {
  try {
    var h = String((ctx && ctx.head) || '').replace(/<[^>]+>/g, '').split('\n')[0];
    return h.slice(0, 48) || 'task';
  } catch (e) { return 'task'; }
}

/** v7.7: build a task ref from a bare TickTick id: project from the reply context when present,
 *  else look the id up in the handle maps / state files (the task's project is required by the Open API). */
function taskFromId_(root, id, ctx) {
  if (ctx && ctx.project_id && String(ctx.task_id) === String(id)) return { taskId: id, projectId: ctx.project_id };
  try {
    var names = ['ticktick-review-state.md', 'triage-state.md', 'sboard-state.md', 'task-index.md'];
    for (var i = 0; i < names.length; i++) {
      var f = newestByName_(root, names[i]); if (!f) continue;
      var body = f.getBlob().getDataAsString();
      var re = new RegExp(id + '\\s*\\|\\s*([0-9a-f]{24})', 'i');
      var m = body.match(re);
      if (m) return { taskId: id, projectId: m[1] };
    }
  } catch (e) {}
  return null;
}

/** v7.7: plain-English command on a resolved task. Returns true only when a write succeeded
 *  (or "keep" acknowledged). abandon/close/drop are recorded, never executed here. */
function applyCmd_(t, cmd, label, confirms) {
  cmd = String(cmd || '').trim().toLowerCase().replace(/^[\s\-–:]+/, '');
  if (!cmd) return false;
  var ok = false;
  if (/^(done|complete|completed|finished|did it|✅)\b/.test(cmd)) {
    ok = ttComplete_(t);
    if (ok) confirms.push('✅ done - ' + label);
  } else if (/^(keep|save|hold|leave it|👍)\b/.test(cmd)) {
    ok = true; confirms.push('👍 kept - ' + label);                         // no write: the veto is the action
  } else if (/^p([135])\b/.test(cmd) || /^(high|low|medium)\b/.test(cmd)) {
    var pr = /^high/.test(cmd) ? 5 : /^medium/.test(cmd) ? 3 : /^low/.test(cmd) ? 1 : Number(cmd.match(/^p([135])/)[1]);
    ok = ttUpdate_(t, { priority: pr });
    if (ok) confirms.push('→ p' + pr + ' - ' + label);
  } else if (/^(push|park|move|tomorrow|today|next|mon|tue|wed|thu|fri|sat|sun|\d{1,2}\/\d{1,2}|\d{4}-\d{2})/.test(cmd)) {
    var ds = cmd.replace(/^(push|park|move)( it)?( to)?\s*/, '').replace(/^next\s+/, '');
    var d = parseDate_(ds);
    if (d) {
      ok = ttUpdate_(t, { dueDate: d, startDate: d, timeZone: 'America/New_York' });
      if (ok) confirms.push('→ ' + d.slice(0, 10) + ' - ' + label);
    }
  } else if (/^(abandon|close|drop|kill|❌)\b/.test(cmd)) {
    ok = false;                                                                // human-gated: applier lanes handle it
  }
  return ok;
}

/** Apply every simple command in a reply; return true only if EVERY segment
 *  was applied (partially-handled replies still reach the LLM lanes). */
function tryApply_(text, maps, confirms) {
  if (!text || text.length > 500) return false;
  var segs = text.split(/\s*(?:·|;|\n|,\s+(?=(?:RV|S|JT)\d))\s*/i).filter(String);
  var any = false, all = true;
  segs.forEach(function (seg) {
    var m = seg.match(/^(RV|S|JT)(\d+)\s+(.+)$/i);
    if (!m) { all = false; return; }
    var key = (m[1] + m[2]).toUpperCase();
    var t = maps[key];
    if (!t) { all = false; return; }
    var ok = applyCmd_(t, m[3], key, confirms);                                // v7.7: shared natural-language applier
    if (ok) any = true; else all = false;
  });
  return any && all;
}

function loadHandleMaps_(root) {
  var maps = {};
  ['ticktick-review-state.md', 'triage-state.md', 'sboard-state.md'].forEach(function (name) {
    var f = newestByName_(root, name);
    if (!f) return;
    var body = f.getBlob().getDataAsString();
    var re = /\b(RV|S|JT)(\d+)\s*\|\s*([0-9a-f]{24})\s*\|\s*([0-9a-f]{24})/gi, m;
    while ((m = re.exec(body)) !== null) {
      maps[(m[1] + m[2]).toUpperCase()] = { taskId: m[3], projectId: m[4] };
    }
  });
  return maps;
}

function ttComplete_(t) {
  var tok = PropertiesService.getScriptProperties().getProperty('TICKTICK_TOKEN');
  if (!tok) return false;
  var r = UrlFetchApp.fetch('https://api.ticktick.com/open/v1/project/' + t.projectId +
    '/task/' + t.taskId + '/complete', {
      method: 'post', muteHttpExceptions: true,
      headers: { Authorization: 'Bearer ' + tok } });
  return r.getResponseCode() >= 200 && r.getResponseCode() < 300;
}

function ttUpdate_(t, fields) {
  var tok = PropertiesService.getScriptProperties().getProperty('TICKTICK_TOKEN');
  if (!tok) return false;
  var body = { id: t.taskId, projectId: t.projectId };
  Object.keys(fields).forEach(function (k) { body[k] = fields[k]; });
  var r = UrlFetchApp.fetch('https://api.ticktick.com/open/v1/task/' + t.taskId, {
    method: 'post', contentType: 'application/json', muteHttpExceptions: true,
    headers: { Authorization: 'Bearer ' + tok },
    payload: JSON.stringify(body) });
  return r.getResponseCode() >= 200 && r.getResponseCode() < 300;
}

/** "7/22", "8/15/26", "2026-07-22", "tue", "tomorrow", "today" → dueDate at 9:00a ET. */
function parseDate_(s) {
  s = String(s || '').trim().toLowerCase();
  var now = new Date(), target = null;
  var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  var mIso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  var mUs = s.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?/);
  if (mIso) target = new Date(Number(mIso[1]), Number(mIso[2]) - 1, Number(mIso[3]));
  else if (mUs) {
    var y = mUs[3] ? Number(mUs[3]) : now.getFullYear();
    if (y < 100) y += 2000;
    target = new Date(y, Number(mUs[1]) - 1, Number(mUs[2]));
    if (!mUs[3] && target < now) target.setFullYear(y + 1);
  } else if (s.indexOf('tomorrow') === 0) { target = new Date(now.getTime() + 864e5); }
  else if (s.indexOf('today') === 0) { target = now; }
  else {
    for (var i = 0; i < 7; i++) {
      if (s.indexOf(days[i]) === 0) {
        var delta = (i - now.getDay() + 7) % 7 || 7;
        target = new Date(now.getTime() + delta * 864e5);
        break;
      }
    }
  }
  if (!target) return null;
  return Utilities.formatDate(target, 'America/New_York', 'yyyy-MM-dd') + 'T13:00:00+0000';
}

function newestByName_(root, name) {
  var it = root.getFilesByName(name), best = null;
  while (it.hasNext()) {
    var f = it.next();
    if (!best || f.getDateCreated() > best.getDateCreated()) best = f;
  }
  return best;
}

function appendJsonl_(root, name, lines) {
  var f = newestByName_(root, name);
  if (f) f.setContent(f.getBlob().getDataAsString() + lines.join('\n') + '\n');
  else root.createFile(name, lines.join('\n') + '\n', MimeType.PLAIN_TEXT);
}