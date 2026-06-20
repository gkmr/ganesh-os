# Learnings

A standing section for what running this system teaches. The first entry is a first-principles audit of the whole fleet against the context ladder, and what it changed.

## Why this section exists

The rest of this repo documents how the system is built. This section documents what it got wrong and corrected, because a governance architecture is only as honest as its willingness to audit itself. Each entry states a principle, the evidence that forced it, and the change that followed.

## Entries

- [First principles - the context ladder](first-principles.html). The mental model the audit used as its rubric: when to reach for CLAUDE.md, rules, skills, hooks, subagents, and MCP, and how this system scores against each rung.
- [What a first-principles audit changed](applied-learnings.html). The through-line - the system had climbed the whole ladder but enforced its hardest invariants probabilistically. The fixes: a real determinism layer, gather-once-from-disk, and a standing subtract pass.

## The one idea

Subtract as deliberately as you add. The ladder is usually taught as a climb - add a rung when friction forces it. The other half is the descent: convert the top invariants to prevention and delete the checks they retire, read each source once and delete the duplicate fetches, merge agents on a quota. A system that only ever adds is one that has stopped being designed.
