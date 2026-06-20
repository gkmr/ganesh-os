# Hooks - the determinism layer

BLUF: skills and prompts are probabilistic; hooks are not. A hook is a shell command that fires on a lifecycle event, every time, outside the model loop, at zero context cost. This is where the governance guarantee actually lives. The lane-fence is not a request to the model, it is a check that runs no matter what the model does.

Two examples here, both sanitized and illustrative:

- `session-start.sh` - runs the instant a session opens. Loads the small read-first index so the agent rebuilds its world from disk instead of from a stale window. This is the convention-drift fix.
- `post-edit-fence.sh` - runs right after the change log is written. Runs the lane-fence and fails loud on a cross-lane write, so a bad write is caught at the moment it happens, not in review.

In the live system the same fence also runs in CI (`.github/workflows/evals.yml`) as a second, independent gate. Hook for immediacy, CI for the merge gate. Two gates, one rule.

## Enforcement hooks (the live determinism layer)

The two examples above gate the repo. These five gate live writes - the same laws, enforced at the moment of the write instead of by prose plus an after-the-fact check. See [the learnings](../docs/applied-learnings.md) for why this matters.

| File | Event | Makes impossible |
|---|---|---|
| `pre-write-alarm-sync.sh` | PreToolUse, reminders writes | a due-date change with no matching alarm, or a strip that leaves the alarm |
| `pre-write-lane-fence.sh` | PreToolUse, reminders + calendar writes | an agent writing a field it does not own; an unconfirmed delete (the format contract as code) |
| `pre-write-char-sanitize.sh` | PreToolUse, title/text writes | em dashes, literal newlines, over-length titles reaching a connector |
| `post-write-changelog.sh` | PostToolUse, store writes | a silent write - an independent receipt whose diff against the agent log reveals a drop |
| `fence-verify.py` | post-run, runtime-agnostic | the portable fallback for runtimes that do not execute hooks |

The agent declares itself via `GANESH_AGENT` (and `GANESH_CONFIRMED_DELETE=1` to release a confirmed delete). A PreToolUse hook exits 2 to block and 0 to allow. `evals/test_hooks.py` exercises every block and allow path in CI. Prevention should let verification shrink: each hook earns the deletion of a probabilistic check.
