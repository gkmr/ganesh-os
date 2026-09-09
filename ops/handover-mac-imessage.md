# Handover: Mac-side iMessage fixes (GK / Ganesh OS)

## How to run this
1. In the Claude desktop app ON THE MAC, start a NEW task (not the operator task, which is bound to scheduled tasks and cannot be linked).
2. When it offers, choose "Link to this computer" so the task can run local commands and reach iMessage.
3. Paste the PROMPT block at the bottom. It is self-contained.

## Context (why this is needed)
- Cloud lanes write iMessage nudges as handoff files into Google Drive folder "imessage-outbox" (id 15Yj2aksqPS_nd_RVkXNb75wFalIMY33r) inside Claude-Fleet-State (id 1j8c7Pid2Qd8pn3xEIATptSKDHPT2HDxB). Each file's TEXT is the message; food-log files end with a line `mfp://diary` (a deep link that only works in iMessage, not Telegram).
- Nothing on the Mac has ever consumed that folder: no file has a `.sent` marker, going back to 2026-08-19. So every cloud-written iMessage mirror (food-log, dashboard) was written correctly and sent nowhere.
- The Mac CAN send iMessage - the "[meetings]" briefs arrive fine - but that lane composes and sends locally and never reads the Drive folder. So the folder just needs a watcher.
- Recipient for these mirrors: iMessage to 6097212209 (the secondary/health number used by the food-log and dashboard lanes). Confirm this is the right handset before first send.

## Fix 1: iMessage outbox watcher (the food-log / dashboard nudges)
Stand up a small local loop on the Mac that, every ~2 minutes:
- Lists the Drive "imessage-outbox" folder (id 15Yj2aksqPS_nd_RVkXNb75wFalIMY33r).
- For each `.txt` file with no sibling `<name>.sent` marker: read its text, send it as an iMessage to 6097212209 via AppleScript (Messages), then create a `<name>.sent` marker (plain text, tiny, e.g. "sent <ISO ts>") in the same folder so it never re-sends.
- Skip any Google-Doc-typed file (mimeType application/vnd.google-apps.document) - those are malformed; log and leave them.
- Idempotency is the `.sent` marker. One send per file, ever.

AppleScript send (per message, phone in E.164 or 10-digit as the account expects):
```
osascript -e 'on run {msg}' -e 'tell application "Messages"' -e 'set svc to 1st service whose service type = iMessage' -e 'set buddy to buddy "6097212209" of svc' -e 'send msg to buddy' -e 'end tell' -e 'end run' "<message text>"
```
If iMessage service is not found or the send throws, do NOT mark `.sent`; log the error so the file retries next loop.

Install it as a launchd agent (com.ganesh.imessage-outbox) or add it to whatever supervises the existing Mac fleet lanes (the "mac-fleet" heartbeat lane that posted "training-log fresh" this morning is the sibling to model after). Send GK one line when it is live and after the first real send.

Backfill note: there are old unsent files in the folder from Aug 19 onward. Do NOT blast all of them. Only send TODAY's and going forward; mark the older ones `.sent` with a "skipped-backfill" note so they never fire.

## Fix 2: kill the A### reply legend on the Mac "meetings" lane
The Mac lane that sends the "[meetings] <time> brief ... Reply e.g. A304 A306" iMessage still prints the retired reply-verb legend. Every cloud lane already dropped it (2026-09-03). Bring this Mac lane in line:
- Find the lane/script that composes the "[meetings]" brief (search the Mac fleet code for "[meetings]" and "Reply e.g.").
- Remove the "Reply e.g. A304 A306" legend and any "A### cal/draft/rem" reply grammar from the OUTPUT. Keep the A### handles internally only if the lane needs them to parse GK's replies; never print them.
- Replace the footer with exactly three links, house style (sentence case, no em dashes):
  open in Claude: https://claude.ai/code/session_01C2UVGijivpuoTaE7giZxcX
  Today in TickTick: https://ticktick.com/webapp/#q/today
  Today on the calendar: https://calendar.google.com/calendar/r/day/<YYYY>/<M>/<D>
- Each action item named in the brief should carry its own TickTick task deep link (https://ticktick.com/webapp/#p/<projectId>/tasks/<taskId>) instead of a bare A### handle, so GK taps straight to the task.

## Verify before you finish
- Send yourself a test only if GK is watching; otherwise wait for the next real food-log slot (10:30a/2:30p/5:30p/8:30p ET) and confirm it lands in iMessage with the mfp://diary link tappable.
- Confirm the next "[meetings]" brief arrives with the three-link footer and no A### legend.

---
## PROMPT to paste into the new Mac-linked task
You are running on GK's Mac (Ganesh OS fleet). Do two fixes and report back in a few lines each.

1) iMessage outbox watcher. Cloud lanes drop message files into Google Drive folder "imessage-outbox" (id 15Yj2aksqPS_nd_RVkXNb75wFalIMY33r) under Claude-Fleet-State (id 1j8c7Pid2Qd8pn3xEIATptSKDHPT2HDxB) but nothing on this Mac sends them (no file has a .sent sibling, ever). Stand up a local launchd agent that every ~2 minutes lists that folder, and for each .txt with no <name>.sent sibling: reads its text, sends it as an iMessage to 6097212209 via Messages/AppleScript, then writes a tiny <name>.sent marker back into the folder. Skip Google-Doc-typed files. The .sent marker is the only idempotency; one send per file. Do NOT backfill the old Aug-19-onward files - mark them .sent "skipped-backfill" and only send today's and future ones. Model it on the existing mac-fleet supervisor. Confirm the recipient handset 6097212209 is correct before the first send.

2) Kill the reply legend on the "[meetings]" brief lane. Find the local lane that sends the "[meetings] <time> brief ... Reply e.g. A304 A306" iMessage. Remove the "Reply e.g." legend and the printed A### reply grammar from its output (keep A### only for internal parsing, never printed). Replace the footer with exactly three links, sentence case, no em dashes: "open in Claude: https://claude.ai/code/session_01C2UVGijivpuoTaE7giZxcX" ; "Today in TickTick: https://ticktick.com/webapp/#q/today" ; "Today on the calendar: https://calendar.google.com/calendar/r/day/<YYYY>/<M>/<D>". Give each named action item its own TickTick task deep link (https://ticktick.com/webapp/#p/<projectId>/tasks/<taskId>) instead of a bare handle.

Report: watcher installed + first send result; meetings-lane footer replaced + next-brief confirmation.