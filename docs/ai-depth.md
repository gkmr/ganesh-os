# What makes this AI-native

Plenty of "AI" projects are a rules engine with a language model bolted on. This one is built around what the models are actually good at, and around what they should never be trusted with. Four design choices make it AI-native rather than AI-flavored.

## 1. The model/correctness split

The hardest design decision in an agent system is where to put judgment and where to put determinism.

- **Language models do the judgment.** Reading forty messages and surfacing the three that are real. Summarizing a thread to one quote and the ask. Deciding that a memo gating a vote outranks a newsletter. Ranking a day across competing domains. None of this is expressible as rules; all of it is what an LLM does well.
- **Deterministic code does the correctness.** Calendar math, alarm-sync, the per-day budget, the id lookups. None of this should ever be "probably right."

The skill is not choosing one. It is drawing the line between them and defending it. The line is why the system can be trusted to act on its own.

## 2. Multimodal, multi-channel by design

The system is one coordinated presence across the surfaces a person actually lives on, not a single app:

- It **reads** WhatsApp, iMessage, Slack, Gmail, Google Voice voicemail, and six calendars.
- It **writes** to a phone-readable calendar event, a text, and a set of files.
- It **resolves** a reply that arrives as free text, by voice-to-text, or as a decision typed into a file.

One coach, many surfaces, one shared memory. The channel is wherever the human is, not wherever the app is.

## 3. The memory is the moat

Longitudinal context is only an advantage if you can store it without rot and recall it without lying. The mental model is a diary the system never erases: when a fact changes, the old line stays and gets stamped "true until today," and the new one goes underneath. So it knows not just what is true, but what was true and when.

**How a fact gets created**, walked through one (the morning weigh-in):

1. The system prompts; the human replies in plain text ("182, slept 6.5, knee still cranky").
2. That raw reply is saved word-for-word in an archive that is never edited - the source of truth to fall back to.
3. A reader agent pulls the facts out of the text (weight, sleep, a flagged joint).
4. Each fact is written with three things: a "valid from" stamp, a source tag (which agent, which message), and one line in the append-only change log.
5. A newer value supersedes the old one - the old fact is never overwritten, it gets a "superseded by" stamp and the new one is written below it.

The same path runs for a message, an email, or a calendar event. The split that makes it trustworthy: the model does the reading-and-extracting, code does the stamping, the source tag, the id, and the log line. Model judges, code records. Because nothing is overwritten, a wrong fact is superseded and stays traceable, never silently replaced.

Two layers, because this is the part people misread: the raw archive is just the verbatim messages, the receipts. The actual knowledge lives in a compiled layer above it - the extracted values, plus a synthesized "about me" profile the system rewrites weekly from patterns across many messages (including where stated preferences and real behavior diverge), not from any single text. The raw layer is for tracing a fact to its source; the compiled layer is the abstraction. Honest limitation: this is closer to time-stamped notes plus a profile than a full entity-and-relation knowledge graph, which is lighter to read and diff but weaker at cross-fact reasoning.

Two things sit on top: a **read-first index**, so an agent loads a small routing map before opening any full file (the Karpathy LLM-wiki layout: raw, wiki, index, log), and a **weekly lint** that flags any fact past its validity window for re-verification, so the memory compounds instead of drifting. The cross-agent layer (gbrain) is plain second-brain / PKM thinking: every agent reads the same compiled knowledge and writes only its own lane.

The borrowed ideas, named honestly: versioning a fact in time instead of mutating it is an old database move (bitemporal); the index-before-you-read layout is Karpathy's "LLM wiki"; the shared memory is second-brain / PKM. "MemPalace" and "gbrain" are those ideas with a name on them.

**Bounding cost and reprocessing.** A run never reprocesses the whole store. The read-first index loads a small routing map plus only the files that task needs, so cost scales with what one task touches, not with total memory. The weekly rewrite consolidates the week's messages into a compact profile, the closest thing to an offline "dream" pass, so the active layer stays small while the raw archive grows. The raw archive is append-only and gets rotated and archived rather than loaded, so its growth is a storage cost, not a runtime one. The honest residual: nothing aggressively prunes the raw store yet, and per-agent cost is not instrumented (it has sat comfortably under a flat monthly plan because it runs scheduled, not continuously).

**Push, not a query box.** The deeper trap is that constant reprocessing turns an agent into a slow search engine that talks like a person. The design choice here is to push, not pull: the system precomputes on a schedule and hands over the synthesized answer (the morning and evening briefings) before it is asked, so the reprocessing has already happened by the time it is needed. That is the closest this gets to anticipating a need, and it sidesteps query latency. Instant recall the moment you ask is still the open problem; precomputing offline hides most of the latency rather than removing it.

Honest state: the verbatim archive, the validity stamps, the change log, and the model-vs-code split are solid. Two honest gaps: read-after-write confirms a value landed, not that the model pulled the right value out of the text (a misread number is stored faithfully, caught by monitoring rather than prevented), and resurfacing the right fact at the right moment, plus the weekly re-verification pass, are still rough. Storing is mostly solved; extracting correctly and recalling the right thing at the right time are the open problems.

## 4. Self-improvement that cannot regress

A weekly auto-research pass reads the logs, runs the frozen evals, and proposes at most one change per agent. It is snapshot-first and human-approved, and it rolls back if an eval regresses. Autonomy with a brake. This is the continual-learning pattern reduced to something that runs unattended and stays safe.

---

## Four ways to read this system

The same artifact holds up under four kinds of scrutiny at once.

- **A research scientist** sees the memory architecture with validity windows, the LLM-wiki substrate, and the auto-research loop under a frozen-eval gate.
- **A product leader** sees the model-versus-correctness line, the multimodal reach, and prioritization that is demonstrated, not asserted.
- **An investor** sees a working governance thesis: guardrails, an audit trail, and evals as a continuous trust gate.
- **An engineer** sees idempotency, read-after-write verification, and a lane-fence check that fails on the first violation in CI.

AI depth is not one claim. It is one system that survives all four readings.
