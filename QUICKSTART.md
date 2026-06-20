# Quickstart - run the core in a minute

BLUF: the heart of this system is one rule, enforced. You can watch it work without any of the live connectors.

## See the fence catch a bad write
```
git clone https://github.com/gkmr/ganesh-os
cd ganesh-os
pip install pytest
python3 -m pytest evals/ -q
```
`evals/data/` ships a clean sample change log and a violating one. The test passes on the clean log and fails loud on the cross-lane write in `changelog.violation.jsonl`. That failure is the governance guarantee, made executable.

## The minimal mental model, four files
- `CLAUDE.md` - the always-on law and conventions.
- `skills/morning-brief/SKILL.md` - one agent, in skill form.
- `hooks/post-edit-fence.sh` - the fence as a hook that fires every time, outside the model loop.
- `evals/lane_fence.py` - the fence itself, as deterministic code.

## Adopt the pattern
Give every mutable field in your own agent stack exactly one owning agent, and enforce it with a lane-fence check in CI or a hook. That single move is the reusable core. Everything else is context management: load the right context when it matters, leave the rest out. Start small, add a rung only when a real frustration forces it.
