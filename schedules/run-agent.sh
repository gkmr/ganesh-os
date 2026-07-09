#!/usr/bin/env bash
# run-agent.sh - the git-backed run wrapper (ADR-16), sanitized example.
# Ties one schedule entry to the git-backed state store: pull the world at
# start, run the agent behind a concurrency guard, push the world at end.
# Illustrative; the launcher and the state repo are the operator's own.
set -euo pipefail

AGENT="${1:?usage: run-agent.sh <agent-run-id>}"
ENTRY="schedules/${AGENT}.schedule.json"
STATE_DIR="${GANESH_STATE_DIR:-state}"
STATE_REPO="${GANESH_STATE_REPO:?set GANESH_STATE_REPO to the private state repo}"
LOCK="${STATE_DIR}/.locks/${AGENT}.lock"

[ -f "$ENTRY" ] || { echo "no schedule entry: $ENTRY" >&2; exit 1; }

# STEP 0 - CONCURRENCY GUARD. One run at a time per agent; a redundant fire is a no-op.
mkdir -p "$(dirname "$LOCK")"
if ! ( set -o noclobber; : > "$LOCK" ) 2>/dev/null; then
  echo "[$AGENT] already running (lock held) - no-op"; exit 0
fi
trap 'rm -f "$LOCK"' EXIT

# STEP 1 - PULL THE WORLD. Rebuild from the latest committed state (ADR-16 sync).
if [ -d "${STATE_DIR}/.git" ]; then
  git -C "$STATE_DIR" pull --ff-only --quiet
else
  git clone --quiet "$STATE_REPO" "$STATE_DIR"
fi

# STEP 2 - RUN. The launcher fires the skill named by the entry; GANESH_AGENT is
# what the lane-fence and changelog hooks key on. Read cron/skill from the entry.
SKILL="$(python3 -c 'import json,sys;print(json.load(open(sys.argv[1])).get("skill",""))' "$ENTRY")"
export GANESH_AGENT="$AGENT" GANESH_RISK="LOW"
"${GANESH_LAUNCHER:-claude}" --skill "${SKILL:-$AGENT}" \
  --changelog "${STATE_DIR}/changelog.jsonl" \
  --ledger "${STATE_DIR}/run-ledger.jsonl"

# STEP 3 - STAMP + PUSH. Write the run marker, commit the world, push it.
date -u +"%Y-%m-%dT%H:%M:%SZ" >> "${STATE_DIR}/markers/${AGENT}.last"
git -C "$STATE_DIR" add -A
if ! git -C "$STATE_DIR" diff --cached --quiet; then
  git -C "$STATE_DIR" commit -q -m "run: ${AGENT} $(date -u +%Y-%m-%dT%H:%MZ)"
  # Serialized runs + single-writer fields make a fast-forward the normal case;
  # a rare conflict means re-pull and let the next run reconcile, never force.
  git -C "$STATE_DIR" push --quiet || { git -C "$STATE_DIR" pull --ff-only --quiet && git -C "$STATE_DIR" push --quiet; }
fi
echo "[$AGENT] done"
