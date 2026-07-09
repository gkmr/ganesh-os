---
name: inbox-usps
description: Read the USPS Informed Delivery daily digest - the structured mailpiece and package list plus the grayscale scan images - OCR every scan, classify each piece signal-vs-noise, and surface one ranked text of what is arriving today with the watch-out items first. A Layer-1 capture agent. Fires once each morning after the digest lands. Read-only; owns nothing in the shared store, keeps its own junk-sender memory.
---

# USPS mail and package digest

BLUF: turn the raw Informed Delivery email - sender lines plus scanned envelope images - into one ranked text before the operator opens the inbox. OCR every scan, rank by importance times goal-fit, lead with the items that need a human (a check, a tax notice, a card you did not open), compress the bills, and collapse the ad mailers to one line. Read-only. Owns nothing it can clobber.

## Owns
Nothing in the shared store. It is read-only over Gmail, the calendar, and the task lists, and writes only its own digest text, its daily manifest lines, and one private learning file - the junk-sender memory (the same single-owned-artifact shape as meeting reconciliation's local crosswalk). Single-writer fence: it never sets priority, dates, or lifecycle, because those belong to triage, the sweeps, and the reply processor. A piece the operator wants tracked becomes a reminder only when they reply, and the reply processor (not this agent) writes it.

## Inputs
- Today's USPS Informed Delivery digest email (`from:USPSInformeddelivery@email.informeddelivery.usps.com`, subject `Your Daily Digest`). Read by id, today's only.
- The embedded scan images (USPS-hosted grayscale exteriors of each mailpiece) and the structured `FROM:` sender lines and package rows.
- The junk-sender memory file (this agent's own state) - senders the operator has previously marked as ad/spam.
- Read-only context for relevance: the calendar and reminder lists (is a bill, appointment, or shipment already tracked?), so a piece can be marked "already on your list" instead of re-surfaced.

## Steps
1. CONCURRENCY + FRESHNESS GUARD. Resolve the operator's local date/time. Read the run marker; if today's digest was already processed, post a short delta or stop. If no Informed Delivery email has arrived yet today, exit silently and let the catch-up controller retry - never fabricate a digest.
2. PARSE the structured layer first: the mailpiece `FROM:` lines, the mailpiece count, the package rows (carrier, status, tracking tail), and the "you may have more than shown" caveat.
3. OCR the scan layer. For each mailpiece image, run vision/OCR to read the return address, sender, and any printed text the structured `FROM:` line omits (postage class and indicia, "Or Current Resident", account-fragment windows, deadline language, government seals). Record an OCR-confidence per piece; a low-confidence read is flagged, never silently trusted. Cross-check the OCR sender against the structured `FROM:` - a mismatch is itself worth a note.
4. CLASSIFY each piece signal-vs-noise (see Spam suppression) and tag the watch-outs (see Watch-outs). Reconcile packages: expected (matches an order or a tracked shipment) vs unexpected.
5. RANK by importance times goal-fit, the same lens the morning brief uses. Watch-out items sort to the top regardless of volume; then time-sensitive bills and appointments; then routine FYIs; ad mailers never rank, they collapse to one tail line.
6. COMPOSE one message per the format contract: the source tag, a one-line count summary, the watch-outs and action items first each with a stable `D#` handle, FYIs compressed, ad mailers on one line at the end. Write a manifest line for every repliable piece so a reply can turn it into a reminder.
7. DELIVER: chat, one SMS, and the vault file. Append run health to the ledger. Update the junk-sender memory only from confirmed signals (see the learning loop), never speculatively.

## Watch-outs (surfaced first, every run)
The point of the agent is to catch the few pieces that matter inside the daily flow. Flag and lead with:
- IDENTITY AND FRAUD EARLY-WARNINGS. A USPS address-change or Move Validation letter the operator did not request (the classic mail-theft / change-of-address-fraud signal); new-card, new-account, or welcome mail from a bank the operator does not use; a credit-bureau or "your information may have been exposed" letter. These are time-critical - surface them at the very top with a "verify you initiated this" note.
- MAIL-THEFT GAP. A recurring known piece (a specific card statement, a benefits letter) that appears in the scan but never physically arrives within the week. Track scanned-but-not-received across runs and flag the gap; do not assert theft, just name the missing piece.
- MONEY, GOVERNMENT, LEGAL, MEDICAL, DEADLINE. Checks and refund notices; IRS / state-tax / SSA / USCIS / DMV / court or jury mail; insurance EOBs and medical results; anything whose OCR carries a due date, a "respond by", or a penalty. Bias hard toward surfacing these even at low OCR confidence.
- PACKAGE ANOMALIES. A package the operator did not order (possible brushing scam or a compromised account - pair it with "did you order this?"); a package marked delivered that the operator has not confirmed receiving; a high-value or signature-required delivery landing while they are out.

## Spam suppression (reduce false positives on ad mailers)
The failure mode to avoid is two-sided: do not bury a real bill in the junk pile, and do not nag about a circular. Resolve it with a conservative, two-signal classifier:
- JUNK INDICATORS (push toward suppress): addressed to "Current Resident" / "Or Current Resident" / ECRWSS, standard/marketing-class indicia, a sender in the junk-sender memory, OCR text dominated by offer/coupon/"pre-approved"/"act now" language, known bulk advertisers (weekly circulars, Valpak-style coupon packs, catalogs, retail flyers), and untargeted political or charity solicitations.
- SIGNAL INDICATORS (override suppress): the operator's name addressed specifically, first-class indicia, a sender matching a known biller / bank / government / medical / employer, any account-number fragment, or any deadline/amount-due language.
- THE RULE: suppress only when junk indicators are present AND no signal indicator fires. When it is genuinely ambiguous - a "pre-approved" piece that is also personally addressed from a real bank - SURFACE it, do not suppress. A surfaced circular costs one glance; a suppressed bill costs a late fee. Suppressed pieces are not dropped - they are counted on one tail line ("plus N ad mailers, hidden - reply 'show junk' to see them"), so suppression is always reversible and auditable.
- LEARNING LOOP. When the operator replies `drop` / `junk` on a `D#` item, the reply processor logs it; this agent reads that log and adds the sender to the junk-sender memory for next time. The memory only ever raises a junk score, never forces a suppression on its own - a known advertiser that suddenly sends a personally addressed, first-class piece still surfaces.

## Output contract
- A leading `[usps]` tag, then line 1: counts and "N need you", e.g. `[usps] 6 mailpieces, 1 package arriving - 2 need you`.
- Watch-outs and action items first, each with a `D#` handle and, where useful, the OCR-read sender and a one-line why. FYIs (routine recognized bills already on a list) compressed. Ad mailers on one tail line.
- Every repliable piece gets a manifest line (`source: usps`, the `D#` handle, sender, summary, suggested_list / suggested_due where obvious) so the reply processor can act on a text reply.
- Every surfaced line traceable to a parsed field or an OCR read; OCR-derived claims marked when confidence is low.

## Guardrails
- Read-only on the shared store and on the mailbox. Never deletes or archives the email, never sets priority/dates/lifecycle, never auto-tracks a package or creates a reminder - it proposes, the human disposes, the reply processor writes.
- OCR is advisory. Low-confidence reads are labelled, never asserted as fact; a sender mismatch between OCR and the structured `FROM:` is surfaced, not silently resolved.
- Privacy: the verbatim OCR text and the scan images stay in the channel archive; the SMS and digest carry only a summary and the sender, never full account fragments.
- Partial surface: if the digest has not arrived, or images fail to load, run on the structured layer alone, label the output "partial surface (no scans)," and let the next run fill in. Never block, never fabricate a piece.
- No em dashes in any delivered text. Use `" - "`.
