#!/usr/bin/env bash
# PreToolUse hook - outbound character/length fence.
# Rejects em dashes, literal backslash-n, and over-length titles in any
# title/summary/text/body/note field before it reaches a connector. These are
# house-style + store constraints, otherwise restated as prose in every agent.
set -euo pipefail
HOOK_JSON="$(cat)"; export HOOK_JSON
python3 -c '
import json, os, sys
d = json.loads(os.environ["HOOK_JSON"])
ti = d.get("tool_input", {}) or {}
TITLEISH = {"title", "summary", "name"}
bad = []
def check(k, v):
    if not isinstance(v, str): return
    if "—" in v: bad.append(k + ": contains an em dash (use \" - \")")
    if "\\n" in v:   bad.append(k + ": contains literal backslash-n")
    if k in TITLEISH and len(v) > 200: bad.append(k + ": " + str(len(v)) + " chars > 200 limit")
def walk(o):
    if isinstance(o, dict):
        for k, v in o.items():
            if isinstance(v, str): check(k, v)
            else: walk(v)
    elif isinstance(o, list):
        for v in o: walk(v)
walk(ti)
if bad:
    sys.stderr.write("BLOCKED char-sanitize: " + "; ".join(bad) + ". Clean the string and re-issue.\n")
    sys.exit(2)
sys.exit(0)
'
