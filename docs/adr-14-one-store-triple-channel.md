# ADR-14 - One store, three channels: connector registry, dual-engine cutover, and HITL calendar lockstep

**Status:** Accepted · 2026-07-07 · extends [ADR-13](adr-13-channel-strategy.md)

BLUF: one evening produced four coupled failures, and the fixes compose into a single posture: name every connector layer in doctrine, mirror every operator-facing message across three channels so any one can die quietly, treat platform-consent (TCC) boundaries as architecture rather than annoyance, migrate engines by running two against one shared store behind a gated cutover, and collapse list state into ONE store so every file is a view and every calendar write has a human gate.

## Context

Four things happened in one session, each exposing a structural gap:

1. The desktop app hit a malformed config file and REGENERATED it, silently dropping every locally-registered MCP server. The reminders engine and the messaging bridge vanished from every session - interactive and scheduled - and nothing in the system could say why, because no doc named where connectors live.
2. The messaging channel of record (an unofficial bridge, per ADR-13 already on notice) was suspended by its platform mid-evening, logging out the linked device and deleting the session store. Every mirror and file delivery on that channel began failing at once.
3. The operator reported overwhelm, and the diagnosis was architectural: list state had leaked into views. Multiple job lists, digests carrying their own item state, and triage files half-owning items meant no single surface could be trusted, so every surface demanded attention.
4. Three distinct macOS TCC (consent) boundaries bit in one night: an extension child process cannot read user folders its parent app can; launchd agents cannot read them without Full Disk Access; and a live Contacts lookup from a background process hangs forever because its consent prompt can never render.

## Options

- Patch each failure locally (restore the config, wait out the suspension, add another digest) - treats symptoms, guarantees recurrence.
- Move everything to one hosted platform with no local connectors - abandons the local-first design and the data-ownership premise.
- **Name the layers, mirror the channels, codify the TCC laws, gate the migration, and collapse state into one store - five moves, one posture.**

## Decision

1. **Connector registry in doctrine.** Three connector layers are named in the shared contract: config-file servers (regenerable, edit only via parse-safe round-trip), packaged extensions (survive config wipes), and cloud connectors (managed elsewhere). A session that finds tools absent consults the registry FIRST. A parse error in the config now costs a documented hazard, not a mystery.
2. **Triple-channel mirroring (channel-mirroring v3).** Every operator-facing send mirrors: canonical text channel first, official-API bot channel second (rich text + documents), legacy bridge third and only while its health marker says UP. Replies are equivalent inputs from any channel with first-seen dedupe and per-channel watermarks. A dead channel is a quiet partial surface, never a run failure - proven the same night when the watchdog's own alert delivered on two channels while the third failed silently, exactly as specified.
3. **TCC laws as architecture.** Extension-child config lives at a TCC-free home path with an env override; files sent by extensions stage through /tmp; the watch-folder sender's interpreter gets Full Disk Access once; live Contacts lookups are BANNED in scheduled runs in favor of a terminal-refreshed local map (the consent prompt renders in the foreground exactly once, then every agent greps a file). The general law: know which process tree will run a call before assuming its permissions.
4. **Dual-engine cutover for the reminders store.** The replacement EventKit server was installed ALONGSIDE the incumbent and validated by cross-engine read-back: an item created by the new engine was read by the old engine under the same id, proving one shared store and zero drift risk. The incumbent retires only after a prompt sweep migrates tool names and one full day runs clean - a gated migration with a one-line rollback, instead of a cliff.
5. **One store, one shortlist, human-gated calendar.** The reminders store is the ONLY store of actionable items; every file, digest, and board is a rendering of it or a decision channel writing back to it. One merged cross-domain shortlist with stable row handles proposes calendar blocks fitted around real events; only a human reply books one. Apply-time refit re-checks the window at approval (proposals never auto-book, approvals never double-book); event-reminder linkback ids let the sweeps reconcile moved or deleted blocks in both directions; deletion stays confirmation-gated everywhere.

## Consequences

Channel loss became a non-event: parity held through a mid-evening platform suspension with zero missed operator notifications. Config regeneration is a named, checkable hazard. The migration pattern turns an engine swap into a reversible experiment with evidence gates. The one-store law attacks overwhelm at its root: surfaces stopped competing for trust because only one of them owns state. The costs, named: a third channel must be kept terse or it triples noise (the format contract owns that); the registry is documentation that can rot (the nightly consistency spot-check now includes it); dual engines double read paths until retirement; and the human gate adds one reply of latency to every calendar block - accepted deliberately, because the block is the irreversible act the whole design exists to protect.

See [`decisions.md`](decisions.md) for the running record and [ADR-13](adr-13-channel-strategy.md) for the channel-strategy groundwork this extends.
