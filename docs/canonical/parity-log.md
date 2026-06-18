# Scheduled-task parity log

Purpose: record which paired/sibling scheduled tasks have been reconciled to shared-scaffold parity, and the deliberate exceptions, so the Sunday weekly-self-improvement diagnostic does not re-flag intentional divergences as drift.

Last reconciled: 2026-06-16 (by request).

## Synced pairs / sets

### Briefings — morning-briefing-7am ↔ evening-briefing-7pm
- Evening brought up to morning: STEP 5 now carries the GOAL-ALIGNED MIT (reads GOALS.md), and STEP 2.2 now reads the job-search triage files (job-search-triage-<today>.md + triage/master/job-search.md).
- Deliberate AM/PM differences (NOT drift): window (today vs tonight+tomorrow), event name 🗓 AM vs 🌙 PM, Gmail look-back 2d vs 1d, "Morning brief" vs "Evening wrap", capacity line detail.

### EA sweeps — ea-pa-morning-sweep-6am ↔ ea-pa-evening-sweep-645pm
- Evening up to morning: STEP 7 EXECUTE now references RE-DATE/STRIP-DATE/CREATE per known-quirks.md.
- Morning up to evening: STEP 7d now has "BATCH-COLLAPSE (strip-date members under one dated umbrella)" and "sort-key dates always strip"; STEP 7b standardized to the annotated form ("(GK 2026-06-05)", "🍍 pings", "if overshoot").
- Deliberate AM/PM differences (NOT drift): fire time, window, event name, "asleep" vs "awake" confidence calibration, BIG WEEKLY ownership (evening/Sun PM).

### Triage siblings — reminders-triage-545am (Job Search) ↔ todo-triage-550am (all other lists)
- todo-triage STEP 3 now spells out numeric priority codes (high (1), medium (5), low (9), none (0)), matching reminders-triage.
- reminders-triage STEP 0 now has the "skip 11 PM-5 AM" overnight guard that todo-triage already had.
- Deliberate differences (NOT drift): scope (Job Search vs all other lists), company-priority model, job-triage.md/JT# vs todo-triage.md/TD# canvases, SMS prefixes.

### Jobs-check pair — anthropic-jobs-check-daily ↔ openai-jobs-check-daily
- Already in parity (guard, JS-shell fallback, NEW/REMOVED diff, manifest format, snapshot logging). No edit needed.
- Deliberate differences (NOT drift): company-specific filters/flags, 🅰️/AN# vs 🤖/OA# handles, anthropic's extra "role retriage" closing note.

### Reply-processor — imessage-reply-processor
- Added explicit citation of references/known-quirks.md alarm-sync rule in STEP 5 (behavior was already correct; citation added for traceability).

### Digest siblings — gmail / slack / imessage / whatsapp unread digests
- Harmonized manifest suggested_list to "Inbox" across slack/imessage/whatsapp (was "Reminders"), matching gmail and the reply-processor's documented default ("otherwise Inbox").
- Deliberate difference (NOT drift): the imessage digest skips its "none need you" SMS while the others send one (redundant on the iMessage channel).

### Self-improvement — weekly-self-improvement-sun
- Now reads parity-log.md in STEP 1 and STEP 2b, and STEP 2 instructs it not to flag recorded deliberate exceptions as drift.

## Deliberate exceptions (do NOT auto-"fix")

1. Date-operation pointers (known-quirks.md RE-DATE/STRIP-DATE/CREATE) are scoped to the two EA sweeps and the reply-processor — the only tasks that write dates/alarms/completion. They are intentionally ABSENT from the two triage tasks, which are constrained writers that set priority/tags only and must NEVER re-date or complete. known-quirks.md is entirely about the dueDate↔alarm sync issue, so it has no relevance to a priority-only writer.

2. The imessage-unread-digest intentionally SKIPS its SMS when nothing needs action, while gmail/slack/whatsapp send a "none need you" line. Leaving as-is (a self-directed "0 actionable iMessages" text is redundant on the iMessage channel).

## Skill-level deliberate exceptions (career skills, added 2026-06-17)

These are divergences between installed SKILLS (resume-tailor and linkedin-profile-optimizer), not scheduled tasks, recorded here because weekly-self-improvement-sun consults this file for intentional exceptions. The underlying candidate facts (org size, ARR, acquisitions, case studies) MUST stay identical across both surfaces; only the framing below differs.

3. Lead-word identity. The resume leads "GENERAL MANAGER. FOUNDER. ENGINEER." while LinkedIn leads "Product Builder, Founder, Engineer" with the title node "VP of Product | AI Platforms." Intentional: the resume optimizes for ATS job-description keyword match (the posted title is often GM), while LinkedIn optimizes for recruiter title-node search (VP of Product). Do not unify the lead word; do not flag as drift.

4. The $XX metric placeholder is ALLOWED on the resume (private, tailored per application, a working state) and FORBIDDEN on LinkedIn (public, persistent, reads as unfinished or evasive). Do not flag the resume's $XX as an error; never allow $XX to reach LinkedIn output.

## Sweep coverage (2026-06-16)

Unpaired tasks checked for stray drift, none found:
- food-log-prompt + daily-food-logger — consistent and explicitly cross-referenced as siblings (prompt feeds the logger's STEP 1; logger excludes "[food-prompt]" messages).
- weekday-catchup-11am — defers to morning-briefing-7am by reference ("mirror the morning-briefing-7am steps exactly" / use the bidaily-briefing skill), so it inherits morning's logic automatically and stays in sync.
- weekly-status-update, weekly-self-improvement-sun — follow the shared conventions (vault paths, guards, completion ping).

## Open items

- None. The digest suggested_list divergence was resolved 2026-06-16 (all comms digests now write suggested_list "Inbox").
