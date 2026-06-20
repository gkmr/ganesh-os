#!/usr/bin/env bash
# PostToolUse hook - independent change-log receipt for every store write.
# Writes one minimal line to a SEPARATE hook-owned log, so diffing it against
# the agent's own change log reveals any write the agent forgot to record.
# This is the "changelog completeness" check automated and made independent.
set -euo pipefail
HOOK_JSON="$(cat)"; export HOOK_JSON
: "${GANESH_HOOKLOG:=state/changelog.hooklog.md}"
python3 -c '
import json, os, sys, datetime
d  = json.loads(os.environ["HOOK_JSON"])
ti = d.get("tool_input", {}) or {}
tr = d.get("tool_response", {}) or {}
name = str(d.get("tool_name", ""))
err = isinstance(tr, dict) and (tr.get("isError") or tr.get("error"))
action = str(ti.get("action", "")).lower()
OP = {"create":"CREATE","update":"UPDATE","complete":"COMPLETE","delete":"DELETE"}.get(action, (action or "WRITE").upper())
if "reminder" in name:
    src = "SOURCE=reminders LIST=\"" + str(ti.get("list") or ti.get("listName") or "") + "\""
elif "calendar" in name or "event" in name:
    src = "SOURCE=calendar:" + str(ti.get("calendarId") or "")
else:
    sys.exit(0)
item = str(ti.get("title") or ti.get("summary") or ti.get("id") or "")[:80].replace(chr(34), chr(8217))
status = "ok" if not err else "failed:" + str(err)[:40]
now = datetime.datetime.now().astimezone().isoformat(timespec="seconds")
agent  = os.environ.get("GANESH_AGENT", "unknown")
reason = os.environ.get("GANESH_REASON", "auto (hook)").replace(chr(34), chr(8217))
risk   = os.environ.get("GANESH_RISK", "LOW")
line = ("- [" + now + "] CH=hook AGENT=" + agent + " OP=" + OP + " " + src +
        " ITEM=\"" + item + "\" BEFORE={} AFTER={} REASON=\"" + reason + "\" RISK=" + risk +
        " STATUS=" + status + "\n")
path = os.path.expanduser(os.environ.get("GANESH_HOOKLOG", "state/changelog.hooklog.md"))
d2 = os.path.dirname(path)
if d2:
    os.makedirs(d2, exist_ok=True)
with open(path, "a") as f:
    f.write(line)
'
