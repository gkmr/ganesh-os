# One shortlist - the single-writer law extended to lists

BLUF: [ADR-01](decisions.md#adr-01---concurrency-control-for-30-writers)'s single-writer fence was written for fields. The same law holds for lists: one owning store per domain, every other surface a rendering of it or a decision channel back into it, never a second store. This is that extension - the law, the board it produces, the reply contract that keeps it safe to run unattended, and two gates an independent review added.

## The failure mode

A task fleet grows by accretion. Every new capability needs "the list of things to do," and the path of least resistance is to keep a small one of its own: a scan of open reminders here, a triage decision canvas there, a tiered digest that quietly tracks its own state, an intake queue, a per-day plan file. None of these is wrong by itself. Together they are the problem: the same item now has an opinion in four places, no single surface is trustworthy on its own, and the human stops trusting any of them and starts reconstructing the day by hand. The system built to remove overwhelm becomes one more source of it.

## The law

One owning store per domain. Here that store is the OS-native reminders app - not because it is special, but because it is the one place a human can read and edit from a phone with no app-switching. Everything downstream of it is one of exactly two things:
- a **rendering** of the store - a read-only view, regenerated on schedule, never hand-edited for state, or
- a **decision channel** back into the store - a narrow write path the human uses to change it, applied by exactly one lifecycle-owning agent.

A new capability that wants "its own list" gets a rendering scoped to its own domain instead. Nothing downstream is ever a second store, no matter how convenient it would be to just track state locally rather than read it fresh.

## The one shortlist

The sharpest rendering is a single merged board, published twice a day, pulling every open item across every life domain into one ranked list instead of one silo per domain. Construction rules:
- **Per-domain caps**, so one loud domain cannot crowd the board the way an unbounded list crowds a single day.
- **Most-important-task first**, always the top row, never buried under raw recency or urgency.
- **Sacred items always visible** - a small, named set of commitments that never scroll off the board regardless of rank, so the board cannot silently deprioritize what must never slip.
- **A calendar-fitted proposed time slot per row.** The board does not just list what is open; it proposes when, checked against real calendar availability at render time.
- **A stable per-board handle, `S1..Sn`**, so a reply can reference a row without restating it.

## The human-in-the-loop contract

Automation does everything up to the decision: gather every source, dedupe against what is already tracked, rank it, propose a time slot, render the board, and notify. The human's whole job is to reply with one verb against one or more handles - `ok`, `block`, `push`, `done`, `drop`, or a priority `p1`-`p3`. Exactly one lifecycle-owning agent resolves every reply against the store, within minutes, so two renderers can never race to apply the same reply - the same single-writer fence that governs a field now governs the board's write-back path. The rule that makes this safe to run unattended: **a proposal never auto-books.** The board can suggest a slot on every render; only an explicit human reply turns a proposal into a calendar write.

## Namespace retirement

A recurring failure mode of "add a board" is that the old boards do not go away - the fleet ends up with a 15th competing list instead of one that replaced the first fourteen. The rule adopted here: a new handle namespace must name and retire every namespace it supersedes, in the same change. When the merged shortlist shipped, it retired two legacy per-domain namespaces outright rather than standing up a third alongside them. A namespace with no live renderer pointing at it is dead by construction, not by memory.

## Two micro-gates, from independent review

An outside pass over the reply contract found two places where a reasonable default could quietly do the wrong irreversible thing. Both are now hard gates, not conventions.

1. **A bare acknowledgement never books calendar time.** Replying `ok` to a board confirms the ranking, nothing more. Booking a proposed slot onto the calendar requires an explicit phrase that can only mean "book this." An acknowledgement and a booking are different speech acts, and the contract now makes the machine treat them as different.
2. **A hard same-day deadline is never silently re-dated.** Auto-park ([ADR-04](decisions.md#adr-04---forward-progress-vs-human-confirmation)) is safe for ordinary overdue items, but an item carrying a real same-day deadline is a different risk class - pushing it forward silently could mean it is quietly missed rather than quietly rescheduled. That class is excluded from auto-park and routed instead to a small, numbered decide-set the human is shown directly, every time.

## The success-ping diet

A side effect of running 30+ agents on one delivery contract was that a low-stakes, cheap-tier task's own success ping became noise - dozens of "ran fine" texts a day bury the rare one that matters. The fix is a diet, not a removal: cheap-tier tasks stop sending a per-run success ping, and one daily heartbeat carries proof-of-life for the whole cohort at once. The loud failure ping is untouched; it still fires the moment a task's core promise breaks. The result is the inverse of before - silence is normal, and a message is worth opening every time.

## Boot core

A related rot pattern showed up in doctrine files themselves: a prompt or config file that accumulates its amendment history in place becomes hundreds of lines a task has to load and re-parse on every run, most of it already superseded. The fix: the full amendment history stays in one canonical doctrine file, in order, with a `SUPERSEDED` banner stamped on anything a later entry overrides - nothing is ever deleted, so the history stays auditable. A separate, small, numbered boot file is compiled from that history: the current rules only, at roughly a fifth the size, and that boot file is what a task actually loads at run time. History is for the record; the boot file is for the run.
