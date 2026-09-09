# Relay v7.9.6 - one full paste, no line edits (3 minutes)

Use the file ganesh-os-relay-Code-v7.9.6-EDITOR.gs (attached). It is the complete script, token included, identical to what is running now plus one addition: on its first tick it moves the bot token into the Script Property BOT_TOKEN by itself.

1. Open the attached file, select all, copy.
2. Script editor: https://script.google.com/d/16DYpzuxZGua5ARZPSWDb2-4u9glCJ-Ic5QIIqypm9-9pLF-vRhJxUCgx/edit
3. Click Code.gs, select all, paste, save. First line reads "v7.9.6 (2026-09-09)".
4. Deploy > Manage deployments > pencil on the EXISTING deployment > Version: New version > Deploy.
5. Within 5 minutes OPS shows: 🛠 [relay] v7.9.6 live on the trigger. token MIGRATED inline -> Script Property BOT_TOKEN ...

After that line appears, the token lives in the property. From then on, whenever you paste code into the editor, use relay/Code.gs from GitHub (token blank): it is always the complete file and always safe. You never edit a line by hand again.

Rollback: paste the attached v7.9.5 file the same way.
