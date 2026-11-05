#!/usr/bin/env bash
# run-agent.sh - the git-backed run wrapper (ADR-16), sanitized example.
# Ties one schedule entry to the git-backed state store: pull the world at
# start, run the agent behind a concurrency guard, push the world at end.
# Illustrative; the launcher and the state repo are the operator's own.
#
# v2 (2026-11-05), fixes reported in issues #8, #9 and #10:
#   - the lock lives outside the state clone, so a first run can clone and the
#     lock is never committed (#8)
#   - a rejected push is retried with a rebase, and a run that still cannot push
#     writes a "push failed" ledger line and exits non-zero instead of going
#     silent; STEP 1 also rebases, so a clone left with an unpushed run commit
#     recovers on the next fire (#9)
#   - the lock records pid and start time; a lock whose process is gone, or which
#     is older than GANESH_LOCK_TTL seconds, is taken over and logged (#10)
set -euo pipefail

AGENT="${1:?usage: run-agent.sh <agent-run-id>}"
ENTRY="schedules/${AGENT}.schedule.json"
STATE_DIR="${GANESH_STATE_DIR:-state}"
STATE_REPO="${GANESH_STATE_REPO:?set GANESH_STATE_REPO to the private state repo}"
LOCK_DIR="${GANESH_LOCK_DIR:-${TMPDIR:-/tmp}}"
LOCK="${LOCK_DIR%/}/ganesh-${AGENT}.lock"
LOCK_TTL="${GANESH_LOCK_TTL:-3600}"   # seconds; set it above the agent's own timeout

[ -f "$ENTRY" ] || { echo "no schedule entry: $ENTRY" >&2; exit 1; }

now() { date -u +%s; }
stamp() { date -u +"%Y-%m-%dT%H:%M:%SZ"; }

# Ledger line for a run that did its work but could not finish cleanly, so a
# stuck lane shows up in the ledger instead of reading as a quiet success.
ledger_fail() {
  mkdir -p "$STATE_DIR" 2>/dev/null || true
  printf '{"ts":"%s","agent":"%s","status":"failed","reason":"%s"}\n' "$(stamp)" "$AGENT" "$1" \
    >> "${STATE_DIR}/run-ledger.jsonl" 2>/dev/null || true
  echo "[$AGENT] FAILED: $1" >&2
}

# STEP 0 - CONCURRENCY GUARD. One run at a time per agent; a redundant fire is a no-op.
take_lock() { ( set -o noclobber; printf '%s %s\n' "$$" "$(now)" > "$LOCK" ) 2>/dev/null; }
mkdir -p "$LOCK_DIR"
if ! take_lock; then
  read -r held_pid held_at < "$LOCK" 2>/dev/null || { held_pid=""; held_at=0; }
  held_at="${held_at:-0}"; case "$held_at" in ''|*[!0-9]*) held_at=0 ;; esac
  age=$(( $(now) - held_at ))
  if [ -n "$held_pid" ] && kill -0 "$held_pid" 2>/dev/null && [ "$age" -lt "$LOCK_TTL" ]; then
    echo "[$AGENT] already running (pid $held_pid, ${age}s) - no-op"; exit 0
  fi
  echo "[$AGENT] stale lock (pid ${held_pid:-unknown}, ${age}s old) - taking over" >&2
  rm -f "$LOCK"
  take_lock || { echo "[$AGENT] lost the lock race - no-op"; exit 0; }
fi
trap 'rm -f "$LOCK"' EXIT

# STEP 1 - PULL THE WORLD. Rebuild from the latest committed state (ADR-16 sync).
# --rebase replays a run commit an earlier fire could not push, instead of failing.
if [ -d "${STATE_DIR}/.git" ]; then
  git -C "$STATE_DIR" pull --rebase --autostash --quiet || { ledger_fail "pull failed at STEP 1"; exit 1; }
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
mkdir -p "${STATE_DIR}/markers"
stamp >> "${STATE_DIR}/markers/${AGENT}.last"
git -C "$STATE_DIR" add -A
if ! git -C "$STATE_DIR" diff --cached --quiet; then
  git -C "$STATE_DIR" commit -q -m "run: ${AGENT} $(date -u +%Y-%m-%dT%H:%MZ)"
  # Serialized runs + single-writer fields make a fast-forward the normal case.
  # A rejected push means the remote moved while this run worked: rebase this
  # run's commit on top (safe, agents own disjoint fields) and push again; never force.
  if ! git -C "$STATE_DIR" push --quiet 2>/dev/null; then
    if ! { git -C "$STATE_DIR" pull --rebase --autostash --quiet && git -C "$STATE_DIR" push --quiet; }; then
      git -C "$STATE_DIR" rebase --abort 2>/dev/null || true
      ledger_fail "push failed after rebase retry; run commit kept locally"
      exit 1
    fi
  fi
fi
echo "[$AGENT] done"
