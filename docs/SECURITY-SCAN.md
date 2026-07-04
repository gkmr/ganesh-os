# Security and PII scan

Reviewed: 2026-06-29 (latest re-scan). Scope: every file in this repository.

## Method

The repo was authored in a generalized, no-PII voice from the start (the subject is "the user" / "the operator," never a real identity), so it is born clean rather than scrubbed after the fact. It was then scanned with pattern matching across all files as a verification gate.

Patterns checked:
- Phone numbers (10-digit and dashed/parenthesized formats).
- Email addresses (any `name@domain.tld`).
- Personal names (partner, family, inbound contacts, colleagues, contacts referenced in the live system).
- Medical terms and the user's health specifics.
- Government, insurance, and benefit identifiers.
- Home address fragments.
- Named target companies (opportunity-scan privacy check).

## Result: clean

| Category | Hits | Action |
|---|---|---|
| Phone numbers | 0 | none needed |
| Email addresses | 0 | none needed |
| Personal / family / contact names | 0 | none needed |
| Medical details and IDs | 0 | none needed |
| Government / insurance / benefit IDs | 0 | none needed |
| Home address | 0 | none needed |
| Named target companies | 0 | none needed |

The only matches the company-name pass returned were false positives: the HTML `<meta>` tag, and "Google" appearing as the connector name "Google Calendar / Google Voice." Both are platform-tool references, not targets or personal data, and are correct to keep.

## Standing guards

- `.gitignore` explicitly excludes any accidental copy of the live system: logs, message archives, the reply inbox, triage canvases, the contacts map, manifests, the change log, the health plan, goals, and the reminders mirror.
- The repository deliberately contains no live `SKILL.md` files from the running system, no logs, and no data exports. It is architecture and patterns only.
- Author name in `LICENSE` is intentional attribution for a personal portfolio, not sensitive data; remove it if you prefer to publish anonymously.

## If you later add real artifacts

If you ever want to include real prompt files or sample outputs for depth, run them through the same scan first and replace: phone with `<phone>`, emails with `<email>`, names with role labels ("partner," "contact," "colleague"), IDs with `<id>`, and company targets with "a priority employer." Keep the live system out of the repo and copy only sanitized excerpts.

## Re-scan after the persona/operator restructure (2026-06-16)

The site was restructured (landing + persona router + tabbed deck in `index.html`, a prominent multimodal/channel band, expanded case studies, and a new `docs/operator.md`) and re-scanned in full. Result unchanged on PII: 0 phone numbers, 0 emails, 0 personal/family/contact names, 0 medical details or IDs, 0 home address, 0 named target companies.

One intentional change in posture, recorded here for transparency: the new Operator section and `docs/operator.md` now state the author's **professional scope** on purpose - VC partner and fractional CPO/CTO, with generalized career scale ("billions-scale consumer platforms," "consumer-hardware line past $300M ARR," "a fraud-detection company"). This is deliberate professional attribution for a portfolio, not sensitive data: **no employer names, no dates, no locations, no contacts**. Outward-facing availability is represented only by the public "open to panels, talks, advisory, mentoring, networking" framing; nothing about any private career intent is surfaced. If you prefer to publish anonymously, remove the Operator section, `docs/operator.md`, and the name in `LICENSE`.

## Re-scan after the world-class upgrade (2026-06-16)

The repo was rebuilt (new `index.html`, `demo.html`, `evals/lane_fence.py`, reframed `README.md`, added failure-modes and tradeoffs sections, case studies, samples) and re-scanned in full. Result unchanged: 0 phone numbers, 0 emails (only the literal `name@domain.tld` placeholder in this file), 0 personal/family/contact names, 0 medical details or IDs, 0 home address, 0 named target companies. The `evals/lane_fence.py` agent names ("pipeline-triage," "morning-sweep," etc.) are generic role labels, not personal data. The only external dependency is a Google Fonts link in `index.html` for typography, which degrades gracefully to system fonts offline and transmits no personal data.

## Re-scan after the Learnings section (2026-06-20)

A Learnings section was added (`docs/learnings`, `docs/first-principles`, `docs/applied-learnings`), along with five enforcement hooks in `hooks/` and `evals/test_hooks.py`. All were authored in the same no-PII voice. Re-scanned: 0 phone numbers, 0 emails, 0 personal/family/contact names, 0 medical details or IDs, 0 home address, 0 named target companies. The figure "62 reminders" and the connector names (Apple Reminders, Calendar) are platform-tool references, not personal data, consistent with the standing posture above.

## Re-scan after the resilience + voice pass (2026-06-23)

Two posture-relevant cleanups, recorded for transparency. (1) The design-system samples and the handle taxonomy were genericized so the public repo's privacy posture is uniform: the job-role handle was folded into the neutral intake/opportunity handle, and sample content was rewritten from interview/application phrasing to neutral pipeline examples (intro calls, diligence calls, partner intros). Nothing about a private job search is surfaced anywhere public. (2) An internal design brief that pointed at now-removed private docs was moved out of the public repo into `private/`. The em-dash ban was enforced repo-wide in the same pass, and the agent count reconciled to "30+" everywhere. Re-scan result unchanged: 0 phone numbers, 0 emails, 0 personal/family/contact names, 0 medical details or IDs, 0 home address, 0 named target companies.

## Re-scan after the taxonomy + monitoring/delivery pass (2026-06-29)

The docs were updated to match the live system after three changes: the fleet was renamed to project-prefixed task ids (`job-`, `health-`, `ea-`, `inbox-`, `brief-`, `mtg-`, `review-`, `write-`, `sys-`), a `sys-` monitoring layer (fleet-health, catch-up controller, overdue watchdog) was documented, and a shared delivery + notification contract was added across `ARCHITECTURE.md`, `docs/governance.md`, `docs/design-patterns.md`, the three roster docs, `README.md`, `docs/decisions.md` (new ADR-12), and `docs/harness.md`. Re-scanned in full. Result unchanged: 0 phone numbers, 0 emails, 0 personal/family/contact names, 0 medical details or IDs, 0 home address, 0 named target companies. Two posture notes for transparency: (1) the new prefixed task ids are generic domain/role labels (`brief-morning-digest`, `health-food-logger`, `sys-fleet-health`), not personal data, consistent with the standing posture on agent names; the `job-` prefix names a domain, never an employer, and the careers-diff / opportunity-scan internals remain generalized and out of the public catalog. (2) `README.md` and `docs/harness.md` now list Apple Notes and Google Voice in the connectors set; like the existing Apple Reminders / Calendar / Gmail entries these are platform-tool references, not personal data. The public agent count remains reconciled to "30+" everywhere (the live fleet is ~40 enabled tasks; the public figure is deliberately the rounded floor, and the lone CSS comment in `index.html` that still read "22-agent" was corrected to "30+" in this pass).
