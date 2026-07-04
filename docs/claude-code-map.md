# Reading this in Claude Code terms

BLUF: this system runs on the Claude agent runtime, but it uses its own vocabulary - harness, `SKILL.md` prompt, change log, single-writer fence. If you live in Claude Code, here is the one-to-one map so the whole repo reads in primitives you already know. The organizing principle is the same one Claude Code is built around: context management, keeping the right context in front of the model and the wrong context out.

## The map

| This system | Claude Code primitive | Where it lives |
|---|---|---|
| The always-on law and conventions | **CLAUDE.md** | `CLAUDE.md` at the root, loaded every run |
| Context-scoped conventions | **Rules** | `agents/format-contract.md` - the field-ownership table and handle namespaces every agent obeys |
| One agent is one scheduled prompt | **Skill** | `skills/` - a short description loads at startup, the full steps load on invocation |
| The determinism layer | **Hooks** | `hooks/` and `.github/workflows/evals.yml` - the fence fires every time, not when the model feels like it |
| 30+ agents coordinated by cron, each free to fan out to subagents within its run | **Orchestration, at two levels** | the scheduler orchestrates the fleet; an agent orchestrates its own subagents; see the note below |
| Connectors (Reminders, Gmail, Slack...) | **MCP** | the connection layer to everything outside the local files |
| Package it for the next person | **Plugin** | the reusable core is the single-writer fence; `QUICKSTART.md` is the seed |

## One important difference: a cron fleet, not one mega-agent (but agents do use subagents)
A Claude Code reader will assume "30+ agents" means a single main agent spawning 30 subagents. It does not. The fleet is 30+ separate sessions fired by cron, one at a time; no master agent spawns them, they never call each other, and they coordinate only through shared files and the append-only change log. That keeps the blast radius small: a bug degrades one function instead of rippling across a swarm.

Within a single run, though, an agent is free to fan out to subagents. The morning sweep and the evening briefing both spawn parallel subagents (calendar, reminders, meetings, clips), gather, dedupe, and synthesize. So it is subagents in the small (inside one run, for speed) and a cron fleet in the large (across the day, for isolation), not one swarm.

## Context management is the spine
Every design choice here answers the Claude Code question of what to load and when:
- The read-first index loads a small routing map before any full file, so the window stays lean.
- Each agent owns one field and reads only what its job needs - least context, least blast radius.
- The append-only change log is the durable memory that survives once a session closes, which is the fix for convention drift.
- Skills keep heavy reference out of the always-on window until they are invoked.

## Each agent prompt is a /goal
Every agent's `SKILL.md` is written as a finish line, not a vague instruction, so a run knows when it is done and an evaluator can confirm it. Nine sections, in order: Background, Guard rails, Start here (the STEP 0 guard), How to work (numbered steps), Report back (`[DONE]` / `[BLOCKED]`), **Finish line** (verifiable end conditions), **Prove it** (the evidence to print), **Show me** (the human handoff), and **Safety net** (idempotent, a turn cap, stop after the same step fails three times, degrade rather than crash).

The loop closes itself: before the handoff, a cheap evaluator subagent re-reads the Prove-it evidence against the Finish line and fixes only the unmet item. That, plus the catch-up controller re-firing a missed run, is what lets the fleet run unattended instead of waiting on a human to say "keep going." Two rules keep it honest: a finish line must be verifiable from the printed evidence (no "improve" or "tidy"), and one task owns one finish line (a compound goal is split into sequential ones).

## The standard ladder, where each rung shows up here
1. Raw prompting - the agents are prompts at the core.
2. CLAUDE.md and rules - `CLAUDE.md` plus the format contract.
3. Skills - `skills/`, one per capability.
4. Hooks - `hooks/` plus CI, the determinism the governance claim rests on.
5. Orchestration - a cron fleet across the day (scheduler-as-orchestrator), with each run free to fan out to subagents.
6. MCP - the connectors.
7. Plugin - the starter.

One line: if you know Claude Code, you already know this - it is CLAUDE.md plus skills plus a hard hook, fanned out over a cron fleet (with subagents inside each run), and a change log as the shared memory across them.
