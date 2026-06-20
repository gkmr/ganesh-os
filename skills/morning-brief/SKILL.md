---
name: morning-brief
description: Build the morning brief - the single most important task plus a cross-domain top three, ranked across work, health, people, and growth, then deliver it to the operator before they open an app. Fires once each morning. Reads the triage canvases, the calendar, and the change log; writes nothing it can clobber.
---

# Morning brief

BLUF: turn a multi-tool scan into one ranked text before the operator opens an app. Rank by importance times goal-fit, reserve one slot per domain before urgency votes, deliver four ways.

## Owns
Nothing it can clobber. It is read-only over the task store and writes only its own calendar event. Single-writer fence: it never sets priority or dates, because those are owned by triage and the sweeps.

## Inputs
- The two triage decision canvases (priority and tier per item, with stable handles).
- The reconciled calendar.
- The append-only change log (what the night handled).

## Steps
1. Load the read-first index, then only the canvases, the calendar, and recent change-log lines. Do not open the full store.
2. Rank open items by importance times goal-fit.
3. Take the top item as the most important task. Then reserve one slot each for work, health or life, and people before urgency gets a vote. That is the cross-domain top three.
4. Compose one message: the most important task, the top three, and a one-line "handled while you slept" pulled from the change log.
5. Deliver four ways: chat, a phone-readable calendar event, an SMS, and the vault file.

## Output contract
- A leading source tag, the most important task, the ranked top three (one per domain), the overnight summary, and counts.
- Every line traceable to a change-log entry.

## Guardrails
- Read-only on the task store. If a connector is down, label the brief "partial surface" and proceed; never block.
- No em dashes in the delivered text. Use `" - "`.
