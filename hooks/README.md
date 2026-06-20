# Hooks - the determinism layer

BLUF: skills and prompts are probabilistic; hooks are not. A hook is a shell command that fires on a lifecycle event, every time, outside the model loop, at zero context cost. This is where the governance guarantee actually lives. The lane-fence is not a request to the model, it is a check that runs no matter what the model does.

Two examples here, both sanitized and illustrative:

- `session-start.sh` - runs the instant a session opens. Loads the small read-first index so the agent rebuilds its world from disk instead of from a stale window. This is the convention-drift fix.
- `post-edit-fence.sh` - runs right after the change log is written. Runs the lane-fence and fails loud on a cross-lane write, so a bad write is caught at the moment it happens, not in review.

In the live system the same fence also runs in CI (`.github/workflows/evals.yml`) as a second, independent gate. Hook for immediacy, CI for the merge gate. Two gates, one rule.
