import pathlib
import pytest
from lane_fence import (
    load_jsonl, check_lane_fence, check_overdue_zero, check_per_day_budget,
)

DATA = pathlib.Path(__file__).parent / "data"


def test_clean_changelog_passes():
    assert check_lane_fence(load_jsonl(DATA / "changelog.sample.jsonl")) == "PASS"


def test_planted_cross_lane_write_is_caught():
    # a sweep writing 'priority' must be rejected
    with pytest.raises(AssertionError, match="CROSS-LANE"):
        check_lane_fence(load_jsonl(DATA / "changelog.violation.jsonl"))


def test_overdue_is_zero_after_sweep():
    # the one overdue item is sacred + recurring, so it is correctly excluded
    assert check_overdue_zero(load_jsonl(DATA / "store.sample.jsonl"), "2026-06-16") == "PASS"


def test_no_day_over_budget():
    assert check_per_day_budget(load_jsonl(DATA / "store.sample.jsonl")) == "PASS"


def test_overbudget_day_is_caught():
    store = [{"id": str(i), "due": "2026-06-22"} for i in range(13)]  # 13 > cap 12
    with pytest.raises(AssertionError, match="OVER BUDGET"):
        check_per_day_budget(store)
