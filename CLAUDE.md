# CLAUDE.md

BLUF: this repo is a personal AI operating system - 27 scheduled Claude agents that run a daily life across work, health, people, and growth, coordinated by one rule: every field has exactly one owning agent. This file is the always-on context for working in the repo. It stays lean on purpose; the heavy reference lives in `docs/` and `skills/` and loads only when needed.

## What this is
- A design portfolio and reference architecture, not the live system. Architecture and patterns only, no personal data.
- The live system runs outside this repo against personal connectors (Apple Reminders, Calendar, Gmail, Slack, WhatsApp). It is never copied here.

## The one law (non-negotiable)
- Single-writer field fences: every mutable field has exactly one owning agent, and an agent may not write a field it does not own. Enforced by a behavioral eval over the change log (`evals/lane_fence.py`), in CI and as a hook.
- Irreversible actions (deletion, sending) are human-gated. Everything reversible flows.

## Conventions
- One agent is one `SKILL.md` prompt, fired by cron, one run at a time, behind a concurrency guard.
- State is plain Markdown plus one append-only, source-tagged change log. No database.
- Every write appends one change-log line: which agent, which field, why.
- Ids are read fresh from source immediately before a write, never reproduced across steps.
- Prose in docs: clean mechanics, no em dashes (use `" - "`), lead BLUF, structure over soggy paragraphs.
- Python for evals, plain POSIX shell for hooks, two-space indentation.

## Layout
- `agents/` - sanitized example agent prompts, the shared format contract, the manifest schema.
- `skills/` - example agents in `SKILL.md` form.
- `hooks/` - example lifecycle hooks (the determinism layer).
- `evals/` - the real behavioral checks, tests, and sample change-log data. Run `python3 -m pytest evals/`.
- `docs/` - architecture, governance, harness, ADRs, case studies, and `docs/claude-code-map.md`.
- `index.html`, `demo.html`, `design-system/` - the portfolio site and its design system.

## Out of scope (v1)
Multi-user or multi-tenant, auth, real-time collaboration, a query engine. This is one operator, batch (cron) cadence, correctness, and auditability. Naming what is out is half the design.

## Read this repo as an engineer
Start with `docs/claude-code-map.md` (how this maps to CLAUDE.md, skills, hooks, subagents, and MCP), then `evals/lane_fence.py` (the law, enforced), then a real prompt in `agents/`. `QUICKSTART.md` runs the core in a minute. The reusable core is the single-writer fence.
