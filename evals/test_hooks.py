"""Behavioral evals for the determinism-layer hooks.

Runs each hook script with sample tool-call JSON on stdin and asserts the
block (exit 2) or allow (exit 0) decision. This is the author-time gate that
pairs with lane_fence.py's change-log gate. Run: python3 -m pytest evals/
"""
import json
import os
import subprocess
import sys
from pathlib import Path

HOOKS = Path(__file__).resolve().parent.parent / "hooks"


def run_sh(script, payload, env=None):
    e = dict(os.environ)
    if env:
        e.update(env)
    return subprocess.run(
        ["bash", str(HOOKS / script)],
        input=json.dumps(payload),
        capture_output=True, text=True, env=e,
    )


def run_py(script, env=None):
    e = dict(os.environ)
    if env:
        e.update(env)
    return subprocess.run(
        [sys.executable, str(HOOKS / script)],
        capture_output=True, text=True, env=e,
    )


# alarm-sync ---------------------------------------------------------------
def test_alarm_sync_blocks_due_without_alarm():
    r = run_sh("pre-write-alarm-sync.sh",
               {"tool_input": {"action": "update", "dueDate": "2026-06-21"}})
    assert r.returncode == 2


def test_alarm_sync_allows_due_with_alarm():
    r = run_sh("pre-write-alarm-sync.sh",
               {"tool_input": {"action": "update", "dueDate": "2026-06-21",
                               "alarms": [{"absoluteDate": "2026-06-21"}]}})
    assert r.returncode == 0


# lane-fence ---------------------------------------------------------------
def test_lane_fence_blocks_cross_lane_priority():
    r = run_sh("pre-write-lane-fence.sh",
               {"tool_input": {"action": "update", "priority": 1}},
               env={"GANESH_AGENT": "briefing"})
    assert r.returncode == 2


def test_lane_fence_allows_owner_priority():
    r = run_sh("pre-write-lane-fence.sh",
               {"tool_input": {"action": "update", "priority": 1}},
               env={"GANESH_AGENT": "triage"})
    assert r.returncode == 0


def test_lane_fence_blocks_unconfirmed_delete():
    r = run_sh("pre-write-lane-fence.sh",
               {"tool_input": {"action": "delete"}},
               env={"GANESH_AGENT": "sweep"})
    assert r.returncode == 2


def test_lane_fence_allows_confirmed_delete():
    r = run_sh("pre-write-lane-fence.sh",
               {"tool_input": {"action": "delete"}},
               env={"GANESH_AGENT": "reply-processor", "GANESH_CONFIRMED_DELETE": "1"})
    assert r.returncode == 0


# char-sanitize ------------------------------------------------------------
def test_char_sanitize_blocks_em_dash():
    r = run_sh("pre-write-char-sanitize.sh",
               {"tool_input": {"title": "Call back — follow up"}})
    assert r.returncode == 2


def test_char_sanitize_allows_clean():
    r = run_sh("pre-write-char-sanitize.sh",
               {"tool_input": {"title": "Call back - follow up"}})
    assert r.returncode == 0


# changelog receipt --------------------------------------------------------
def test_changelog_receipt_writes_line(tmp_path):
    log = tmp_path / "hooklog.md"
    r = run_sh("post-write-changelog.sh",
               {"tool_name": "mcp__apple-reminders__reminders_tasks",
                "tool_input": {"action": "update", "list": "Backlog", "title": "Ship it"},
                "tool_response": {"ok": True}},
               env={"GANESH_AGENT": "sweep", "GANESH_HOOKLOG": str(log)})
    assert r.returncode == 0
    assert "OP=UPDATE" in log.read_text()


# fence-verify -------------------------------------------------------------
def test_fence_verify_flags_bad_delete(tmp_path):
    log = tmp_path / "changelog.md"
    log.write_text('- [2026-06-20T06:00:00-04:00] OP=DELETE SOURCE=reminders LIST="Home" '
                   'ITEM="x" BEFORE={} AFTER={} REASON="stale" RISK=LOW STATUS=ok\n')
    r = run_py("fence-verify.py", env={"GANESH_CHANGELOG": str(log)})
    assert r.returncode == 1


def test_fence_verify_passes_clean(tmp_path):
    log = tmp_path / "changelog.md"
    log.write_text('- [2026-06-20T06:00:00-04:00] OP=UPDATE SOURCE=reminders LIST="Home" '
                   'ITEM="x" BEFORE={} AFTER={} REASON="carry" RISK=LOW STATUS=ok\n')
    r = run_py("fence-verify.py", env={"GANESH_CHANGELOG": str(log)})
    assert r.returncode == 0
