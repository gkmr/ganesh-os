#!/usr/bin/env bash
# Session-start hook: rebuild the agent's world from disk, lean.
# Fires once when a session opens. Zero context cost; runs outside the model loop.
# Illustrative and sanitized; paths point at a local state/ dir in the live system.
set -euo pipefail

# Load the small routing index first, never the full store. Keeps the window lean.
INDEX="state/index.md"
[ -f "$INDEX" ] && cat "$INDEX"

# Surface only the most recent change-log lines (the durable memory), not the whole log.
LOG="state/changelog.jsonl"
[ -f "$LOG" ] && tail -n 20 "$LOG"
