# Relay v7.9.5 - same paste as before (3 minutes)

What changed since the v7.9.4 you pasted this morning:
- The self-heal now fires only on real evidence of lost replies (a webhook set on the bot, a queue the cursor skipped, or Telegram's update counter jumping between two of your messages). Pin service messages no longer count, so no false 🩺 lines.
- The "no inbound in N hours" watchdog line moves from MAIN to OPS and says plainly that silence is normal when you have not texted.
- Every inbound now records the update-counter jump; a jump over 3 writes an "update-jump" row to the mirror so we can prove or rule out a second consumer.

Steps (identical to this morning):
1. Open ganesh-os-relay-Code-v7.9.5.gs (attached), select all, copy.
2. Script editor: https://script.google.com/d/16DYpzuxZGua5ARZPSWDb2-4u9glCJ-Ic5QIIqypm9-9pLF-vRhJxUCgx/edit
3. Click Code.gs, Cmd+A, Cmd+V, Cmd+S. First line should read "v7.9.5 (2026-09-09".
4. Deploy > Manage deployments > pencil on the EXISTING deployment > Version: New version > Deploy.
5. Within 5 minutes OPS shows: 🛠 [relay] v7.9.5 live on the trigger ...

Nothing else to run. Rollback = paste v7.9.4 the same way.
