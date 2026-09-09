# Your to-do list (about 10 minutes on a laptop)

Everything else is already done from the cloud. These are the only things that need your hands.

## Step 1. Paste the new relay code (5 minutes)

You need the file ganesh-os-relay-Code-v7.9.4.gs (attached in this chat, also in Drive > Claude-Fleet-State).

1. Open the file on the laptop and copy ALL of its text (click inside, Cmd+A, Cmd+C).
2. Open the script editor: https://script.google.com/d/16DYpzuxZGua5ARZPSWDb2-4u9glCJ-Ic5QIIqypm9-9pLF-vRhJxUCgx/edit
3. In the left file list click Code.gs.
4. Click inside the code, Cmd+A (select all), Cmd+V (paste over it). The first line should now say "v7.9.4 (2026-09-09)".
5. Save: Cmd+S (or the floppy-disk icon).
6. Top right, click Deploy > Manage deployments.
7. You will see ONE existing deployment (type Web app). Click the pencil icon on it.
8. In the Version dropdown choose "New version". Leave everything else as is. Check that "Who has access" says "Anyone".
9. Click Deploy. If Google asks you to authorize, click through and allow. Then Done.

Do NOT click "New deployment". That makes a new web address and breaks every lane.

You never have to pick or run a function. The timer that already exists runs the new code by itself.

## Step 2. Check it worked (5 minutes later, on your phone)

Open the Telegram OPS group. Within 5 minutes you should see a line starting:
🛠 [relay] v7.9.4 live on the trigger ...

If it is there, Step 1 worked. If nothing appears after 10 minutes, tell me "no 🛠 line" and I will walk you through the Triggers page (clock icon on the left of the script editor: there should be one trigger, main, every 5 minutes).

## Step 3. Text the bot (30 seconds)

In the Telegram MAIN chat with the bot, type any single word (for example: hi) and send it.

Within 10 minutes one of two things happens:
- It lands: nothing visible right away, but within the hour the bot reacts to your message and your replies are working again.
- It does not land: a line starting 🩺 [relay/self-heal] appears in OPS saying what it found (a webhook it deleted, a cursor it reset, or "another client is consuming getUpdates"). Screenshot that line to me.

## Step 4. Supra job board token (only if OPS tells you to)

Within 6 hours of Step 1 the relay reads the Supra board by itself. If it cannot, OPS gets one line starting 🔧 [relay/supra] with the reason. If it says 401 or 403:

1. Sign in to the account that can open the Supra board in the browser.
2. Go to https://coda.io/account (Superhuman Docs is the same account), scroll to API settings, Generate API token. Give it no doc restriction.
3. Copy the token.
4. In the script editor: gear icon (Project Settings) on the left > Script Properties > Edit script properties > find CODA_TOKEN > paste the new value > Save script properties.
5. Nothing to deploy. Within 6 hours OPS goes quiet on Supra and the morning job scan shows board rows again.

## Step 5. Mac lane (whenever convenient, 10 minutes on the Mac)

1. Open the Claude desktop app on the Mac.
2. Start a NEW task (not this one).
3. When it offers, choose "Link to this computer".
4. Paste the text from the file handover-mac-imessage.md (attached; the part under "PROMPT to paste").
5. Let it run. It will tell you when the watcher is installed and after the first real send.

## Nothing else is yours

The six lane prompt changes, the dashboard fix, the job-scan change, and the cleanup are already live. A check runs in this chat at 11:40 AM ET today and reports five pass/fail lines.

## If anything goes wrong in Step 1

Paste ganesh-os-relay-Code-v7.9.3-rollback.gs the same way (Steps 1.1 to 1.9). That is the exact code that was running before.
