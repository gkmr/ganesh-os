# Harness engineering

A model is the engine. The harness is the rest of the car. An LLM call is one component; everything that makes thirty-plus of them run unattended, safely, every day is harness engineering. This is the layer most "agent" demos skip, and the layer that decides whether a system is a toy or something you trust with a life.

## What the harness is

The harness is the runtime plus the conventions layered on top of it that turn a prompt into a reliable, governed agent. Six components, each load-bearing:

| Layer | Responsibility | Why it matters |
|---|---|---|
| **Scheduler** | Fires each agent as a cron'd prompt in local time, only while the host is awake, serialized one at a time. | A concurrency guard + run-ledger makes a missed or doubled fire a no-op, never a duplicate. Time is the orchestrator. |
| **Context assembly** | Rebuilds each run's world from disk: a read-first routing index, then only the canvases, manifest, and memory the run needs. | Every run is stateless; the harness is what re-hydrates it. This forces external state and clean reloads. |
| **Tools & connectors** | File tools, a sandboxed shell, and connectors (Reminders, Calendar ×6, Slack, Gmail, WhatsApp, iMessage). | A surface check degrades gracefully when a connector is down and queues write-intents for the next full run. |
| **Format contract** | The shared house style: handle namespaces, the decision vocabulary, and the single field each agent may write. | This is where the single-writer fence is actually enforced. Uniform behavior across all agents. |
| **Change log** | Every write from any agent appends one source-tagged line to a single append-only file. | The audit spine, the input to the evals, and the thing that makes 27 autonomous writers reconstructable. |
| **Evals** | Frozen + behavioral checks read the change log and block a run that breaks an invariant. | The harness can refuse its own agents. This is the property that makes unattended operation safe. |

## How agents, skills, and memory relate to the harness

- **Agents run inside the harness.** An agent is a scheduled prompt that owns exactly one field. It cannot fire itself, assemble its own context, or skip the contract - the harness does all of that around it. Take the harness away and an agent is just a paragraph of text.
- **Skills are capabilities the harness exposes.** Each `SKILL.md` is a reusable capability the runtime can load - a triage skill, a sweep skill, a brief skill. The harness decides which skill runs when, with what context, and under which contract. Skills are the verbs; the harness is the grammar.
- **Memory is the state the harness re-hydrates.** MemPalace (validity windows), the Karpathy LLM-wiki substrate (`raw / wiki / index / log`), and gbrain (the shared second brain) are files the harness reads on every run and writes through the change log. Memory is what survives between stateless runs; the harness is the read/write discipline that keeps it from rotting. See [`ai-depth.md`](ai-depth.md).

## The design consequence

Because the harness - not the model - owns scheduling, context, tools, the contract, the log, and the evals, the system has a single place to enforce safety and a single place to audit it. That is why single-writer fences, the append-only audit trail, and evals-as-CI-gate are not aspirations bolted on at the end: they are properties of the harness, and every agent inherits them by construction. See [`../ARCHITECTURE.md`](../ARCHITECTURE.md) and [`governance.md`](governance.md).
