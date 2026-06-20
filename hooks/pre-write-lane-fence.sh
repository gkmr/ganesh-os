#!/usr/bin/env bash
# PreToolUse hook - single-writer lane fence (see agents/format-contract.md).
# Every mutable field has exactly one owning agent; a write to a field this
# agent does not own is denied. Deletion is owned by nobody and is denied
# unless GANESH_CONFIRMED_DELETE=1 (confirmation-gated via the prune queue).
# The firing agent declares itself via GANESH_AGENT. This is the format
# contract enforced as code instead of by prose plus after-the-fact detection.
set -euo pipefail
HOOK_JSON="$(cat)"; export HOOK_JSON
: "${GANESH_AGENT:=unknown}"
python3 -c '
import json, os, sys
agent = os.environ.get("GANESH_AGENT", "unknown")
confirmed_delete = os.environ.get("GANESH_CONFIRMED_DELETE", "") == "1"
d = json.loads(os.environ["HOOK_JSON"])
ti = d.get("tool_input", {}) or {}
action = str(ti.get("action", "")).lower()

# Field -> the agents allowed to write it (from format-contract.md). Tune freely.
OWNERS = {
    "priority":  {"triage"},
    "completed": {"reply-processor"},
    "dueDate":   {"sweep", "reply-processor"},
    "alarms":    {"sweep", "reply-processor"},
    "startTime": {"sweep"},
    "endTime":   {"sweep"},
}

if action == "delete" and not confirmed_delete:
    sys.stderr.write("BLOCKED lane-fence: deletion is confirmation-gated and owned by no agent. "
                     "Route through the prune queue; set GANESH_CONFIRMED_DELETE=1 only after confirmation.\n")
    sys.exit(2)

viol = []
for field, owners in OWNERS.items():
    if field in ti and ti.get(field) is not None and agent not in owners:
        viol.append((field, "/".join(sorted(owners))))
if viol:
    msg = "; ".join(f"{f} (owned by {o}, not {agent})" for f, o in viol)
    sys.stderr.write("BLOCKED lane-fence: agent \"" + agent + "\" tried to write a field it does not own: "
                     + msg + ". See agents/format-contract.md.\n")
    sys.exit(2)
sys.exit(0)
'
