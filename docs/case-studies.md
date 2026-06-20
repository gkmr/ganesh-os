# Case studies

Four real incidents, each traced from symptom to root cause to a durable fix. Names and data are generalized; the engineering is exactly as it happened. Every one ends the same way: an eval is added so the class of bug cannot silently return. That last step is the difference between a demo and a system you trust with a life.

---

## 1. The overdue collapse: 99 to 0, then held there

*A system can be perfectly polite and still fail you. This one waited so respectfully for permission that it let a life pile up in red.*

**Status quo.** The triage and sweep agents were deliberately non-destructive: they set priority and surfaced decisions, but waited for a human confirmation before changing any date. Safe by design.

**Symptom.** The reminders store showed 99 items in "today and overdue" and a 63-item pure-overdue pile that kept growing no matter how often it was triaged.

**Investigation.** Two root causes. First, with no confirmation ever given, nothing moved - so overdue accumulated while the system sat politely waiting. The bottleneck was the human decision step, not the agents. Second, a one-time review snapshot silently omitted two lists (the default "uncategorized" list and the inbox), so a whole cluster of real commitments was invisible to triage and never tiered.

**Fix.** An auto-park rule in the sweeps: any overdue item with no pending decision is automatically re-dated forward by its tier (urgent to today, medium a week out, low to a two-week backlog, prune-candidates a month out and queued for deletion confirmation), never touching sacred or recurring items. The loop now advances on its own and surfaces only exceptions. Separately, triage was made to enumerate every list dynamically, with an explicit guard naming the previously-skipped lists, and the snapshot was stamped non-canonical.

**Outcome.** Overdue went to zero in one pass and is now held there automatically. A behavioral regression check (overdue-zero after a sweep) was added so the failure cannot silently return.

**Lesson.** A human-in-the-loop system must still make forward progress autonomously. Gate only the irreversible actions; let everything reversible flow.

---

## 2. The single-day pileup: distribution as a first-class concern

*The tiers were right. The shape was wrong. A correct ranking, stacked on one day, is just a pile with better labels.*

**Status quo.** Triage assigned importance tiers correctly and a bulk re-tier had just run across the backlog.

**Symptom.** One day held about 48 tasks while neighboring days were nearly empty. The "today" view became noise and lost the user's trust.

**Investigation.** Triage had no notion of per-day capacity, so every "do this week" item landed on the same date. The day was further inflated because recurring rituals (hydration, a daily mobility protocol, two standing habits) were counted as if they were tasks. And ranking purely by urgency made a high-volume opportunity flow crowd out health and relationship items entirely.

**Fix.** Three coordinated changes. A per-day budget caps real-task load (lower on travel days, auto-detected from the calendar) and excludes recurring rituals from the count. A spread mandate fans overflow round-robin across the next open days instead of stacking one date. And the daily top three is now constructed with one slot per domain (work, health-or-life, relationship-or-anchor), so no single domain can monopolize the ranked view.

**Outcome.** A 48-item day was redistributed to roughly a dozen real tasks, the rest spread across the week, with the ranked top three always spanning domains. A per-day-budget check enforces it going forward.

**Lesson.** Prioritization without distribution is just a different pile. Capacity and balance have to be modeled explicitly.

---

## 3. From notification stream to action surface

*Awareness is not throughput. A digest that tells you about ten things and lets you do none of them is just a louder badge.*

**Status quo.** Five message channels produced clean daily digests of "here's what's unread and what matters."

**Symptom.** Each surfaced item still required the user to switch apps and act, so the digests created awareness but not throughput. Items sat for days between being surfaced and being done.

**Investigation.** The digests summarized well but dead-ended. There was no path from "here is an item" to "do something about it" without leaving the phone, and the desktop store was awkward to bulk-edit anyway.

**Fix.** Every surfaced item now gets a short namespaced handle and a line in a daily machine-readable manifest (handle, source, summary, suggested list, suggested due, and the underlying id when one exists). The store is also mirrored into decision-canvas files where each row carries that handle, the id, and a blank decision cell. The user acts by replying to a handle from the phone ("done 3", "push 2 to Thursday") or by editing the decision cell in a file. An hourly processor resolves the reply against the manifest, applies the right store action with read-after-write verification, stamps the row so it never re-fires, and re-mirrors.

**Outcome.** The same item can be acted on from a text, a file, or the desktop and stays consistent everywhere. Digests became an action surface; the round trip from "surfaced" to "done" no longer requires leaving the phone.

**Lesson.** A notification is only useful if the reply path is as cheap as the alert. Design the action surface, not just the feed.

---

## 4. The stale id: a silent write that did nothing

*Every other failure here was loud. This one was the dangerous kind - it succeeded quietly and was wrong. The fix wasn't a patch; it was making silence impossible.*

**Status quo.** The reply-processor applied store actions by id, carrying ids forward across steps in a single run for efficiency.

**Symptom.** Writes occasionally failed with record-not-found, and a handful of "completes" silently did nothing. The user marked something done; the system agreed; nothing changed.

**Investigation.** An id was reproduced from memory across steps - effectively transcribed - instead of read fresh from source immediately before the write. Between the read and the write the record had moved, so the stale id pointed at nothing. Worse, a not-found result was being swallowed as a no-op rather than raised.

**Fix.** Read every id fresh from source immediately before any write; read-after-write verify by id to confirm the change landed; and treat a not-found id as a hard error that surfaces, never a silent skip. An id-freshness check now runs in CI, so the whole class of bug is fenced out rather than patched once.

**Outcome.** Failed and silent writes went to zero. Status: CLOSED. The system will now rather shout than lie.

**Lesson.** Silent failure is the only unforgivable one. Make the failure loud, then fence the class of it out with an eval.
