# Contributing

This is a design portfolio repo — architecture, patterns, and the evals that enforce them. It contains no personal data and no live system. You are welcome to fork the patterns (the single-writer fence especially) into your own multi-agent system.

## Run the evals locally

```bash
pip install pytest
pytest evals/ -q
```

The evals are behavioral, not structural: `check_lane_fence` fails on a cross-lane write, `check_overdue_zero` asserts a clean sweep, `check_per_day_budget` asserts no day restacks. They run on committed sample data in `evals/data/` and in CI on every push (see `.github/workflows/evals.yml`).

## Repo layout

- `ARCHITECTURE.md`, `docs/` — the design and the patterns.
- `evals/` — the real checks + sample data.
- `agents/` — sanitized example agent prompts + the manifest schema.
- `index.html`, `demo.html`, `assets/` — the visual showcase.

## If you adopt the pattern

The reusable core is **single-writer field ownership**: give every mutable field exactly one owning agent, make everyone else read-only, and enforce it with a lane-fence check. If you build something with it, an issue or a link is welcome.
