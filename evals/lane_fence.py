"""
Behavioral evals for Ganesh OS.

Three checks, each derived from a real incident, run in CI over committed sample
data (evals/data/). They are the machine-checkable form of the architecture's
claims: single-writer ownership, overdue-zero after a sweep, and a per-day budget.

Run:  pytest evals/ -q     (see evals/test_lane_fence.py)
"""
from __future__ import annotations
import json
import datetime
from collections import Counter
from pathlib import Path

# Every mutable field has exactly one set of owning agents. Deletion has none:
# it is always confirmation-gated.
OWNER = {
    "priority":    {"pipeline-triage", "todo-triage"},
    "due_date":    {"morning-sweep", "evening-sweep"},
    "lifecycle":   {"reply-processor"},   # create / complete / reschedule
    "create_item": {"intake-scan"},
    "delete":      set(),
}


def load_jsonl(path) -> list[dict]:
    return [json.loads(line) for line in Path(path).read_text().splitlines() if line.strip()]


def check_lane_fence(changelog: list[dict]) -> str:
    """Fail on the first write to a field the agent does not own."""
    for e in changelog:
        field, agent = e["field"], e["agent"]
        if field not in OWNER:
            raise AssertionError(f"UNKNOWN FIELD: {field} written by {agent}")
        if agent not in OWNER[field]:
            owners = OWNER[field] or "none (deletion is confirmation-gated)"
            raise AssertionError(f"CROSS-LANE WRITE: {agent} wrote '{field}' (owners = {owners})")
    return "PASS"


def check_overdue_zero(store: list[dict], today: str) -> str:
    """After a sweep, nothing is dated before today except sacred/recurring items."""
    t = datetime.date.fromisoformat(today)
    offenders = [
        i["id"] for i in store
        if not i.get("completed") and not i.get("sacred") and not i.get("recurring")
        and i.get("due") and datetime.date.fromisoformat(i["due"]) < t
    ]
    assert not offenders, f"OVERDUE NOT ZERO: {offenders}"
    return "PASS"


def check_per_day_budget(store: list[dict], cap: int = 12, travel_days=()) -> str:
    """No weekday holds more than the cap of dated non-recurring tasks (6 on travel days)."""
    counts = Counter(i["due"] for i in store if i.get("due") and not i.get("recurring"))
    for day, n in counts.items():
        limit = 6 if day in set(travel_days) else cap
        assert n <= limit, f"DAY OVER BUDGET: {day} has {n} (cap {limit})"
    return "PASS"
