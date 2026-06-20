# Reading this in Claude Code terms

BLUF: this system runs on the Claude agent runtime, but it uses its own vocabulary - harness, `SKILL.md` prompt, change log, single-writer fence. If you live in Claude Code, here is the one-to-one map so the whole repo reads in primitives you already know. The organizing principle is the same one Claude Code is built around: context management, keeping the right context in front of the model and the wrong context out.

## The map

| This system | Claude Code primitive | Where it lives |
|---|---|---|
| The always-on law and conventions | **CLAUDE.md** | `CLAUDE.md` at the root, loaded every run |
| Context-scoped conventions | **Rules** | `agents/format-contract.md` - the field-ownership table and handle namespaces every agent obeys |
| One agent is one scheduled prompt | **Skill** | `skills/` - a short description loads at startup, the full steps load on invocation |
| The determinism layer | **Hooks** | `hooks/` and `.github/workflows/evals.yml` - the fence fires every time, not when the model feels like it |
| 30+ agents coordinated by cron | **Orchestration, but not subagents** | the scheduler is the orchestrator; see the note below |
| Connectors (Reminders, Gmail, Slack...) | **MCP** | the connection layer to everything outside the local files |
| Package it for the next person | **Plugin** | the reusable core is the single-writer fence; `QUICKSTART.md` is the seed |

## One important difference: scheduler, not subagents
A Claude Code reader will assume "30+ agents" means subagents a main agent spawns. It does not. These are 30+ separate sessions fired by cron, one at a time. The schedule is the orchestrator. They never talk to each other; they coordinate only through shared files and the append-only change log. That is a deliberate choice: a bug degrades one function instead of rippling across a swarm, and the blast radius stays small.

## Context management is the spine
Every design choice here answers the Claude Code question of what to load and when:
- The read-first index loads a small routing map before any full file, so the window stays lean.
- Each agent owns one field and reads only what its job needs - least context, least blast radius.
- The append-only change log is the durable memory that survives once a session closes, which is the fix for convention drift.
- Skills keep heavy reference out of the always-on window until they are invoked.

## The standard ladder, where each rung shows up here
1. Raw prompting - the agents are prompts at the core.
2. CLAUDE.md and rules - `CLAUDE.md` plus the format contract.
3. Skills - `skills/`, one per capability.
4. Hooks - `hooks/` plus CI, the determinism the governance claim rests on.
5. Orchestration - the cron fleet (scheduler-as-orchestrator), not main-agent subagents.
6. MCP - the connectors.
7. Plugin - the starter.

One line: if you know Claude Code, you already know this - it is CLAUDE.md plus skills plus a hard hook, fanned out over cron instead of subagents, with a change log as the shared memory.
