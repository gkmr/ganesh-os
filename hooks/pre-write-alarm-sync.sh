#!/usr/bin/env bash
# PreToolUse hook - reminders alarm-sync fence.
# Blocks any reminders write that sets/changes a due date without a matching
# alarm, or strips the due date without clearing the alarm. Prevents the class
# where smart-list state (today/overdue) never updates because the alarm was
# left at the old date - a failure every after-the-fact verification read missed.
# Deterministic, runs outside the model loop, zero context cost.
set -euo pipefail
HOOK_JSON="$(cat)"; export HOOK_JSON
python3 -c '
import json, os, sys
d = json.loads(os.environ["HOOK_JSON"])
ti = d.get("tool_input", {}) or {}
action = str(ti.get("action", "")).lower()
if action not in ("create", "update"):
    sys.exit(0)
def empty(v): return v is None or v == "" or v == "0000-00-00"
has_due_key   = "dueDate" in ti
setting_due   = has_due_key and not empty(ti.get("dueDate"))
stripping_due = has_due_key and empty(ti.get("dueDate"))
alarms = ti.get("alarms", None)
has_alarms = isinstance(alarms, list) and len(alarms) > 0
clears = ti.get("clearAlarms") is True or (isinstance(alarms, list) and len(alarms) == 0)
if setting_due and not has_alarms:
    sys.stderr.write("BLOCKED alarm-sync: dueDate is set but a matching alarms[].absoluteDate is missing. "
                     "Re-issue with the alarm equal to the due date in the SAME call.\n")
    sys.exit(2)
if stripping_due and not clears:
    sys.stderr.write("BLOCKED alarm-sync: dueDate is being stripped but alarms are not cleared. "
                     "Add clearAlarms:true (or alarms:[]) in the SAME call.\n")
    sys.exit(2)
sys.exit(0)
'
