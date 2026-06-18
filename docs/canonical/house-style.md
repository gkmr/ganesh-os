# House style (canonical voice and format contract)

One statement of how any GK agent formats an outbound message. This supersedes the inline restatements scattered across the scheduled tasks. Tasks reference this file; they do not re-describe the rules. It consolidates the prior three sources: the live sms-digest-style.md, the published portfolio agents/format-contract.md, and the channel-format map inside gk-writing-style.

Division of labor: this file owns FORMAT. The gk-writing-style skill (Mode B for unattended runs) owns VOICE when an agent drafts prose in GK's own words. Mechanical digests use FORMAT only; drafted prose uses both.

## Universal rules (every channel)
- Lead with the originating agent's bracket tag, e.g. [gmail]. Tags are enumerated in channel-tags.md.
- Line 1 is a one-line summary with counts and "N need you."
- Action items first, each with a stable namespaced handle; FYIs compressed; spam or noise on one line at the end.
- No em dashes anywhere. Use periods, commas, colons, or parentheses.
- No markdown links. Bare URLs and bare numbers only.
- Sentence case. Never all-lowercase, never dropped capitals or punctuation, even in casual registers.
- Banned words per banned-words.md still apply to any drafted prose.

## Per-channel format
- iMessage / SMS: plain text only. No markdown, no bullets, no asterisks, no headers. Short. Lead emoji allowed where the task defines one (for example a leading status emoji). Handles inline.
- WhatsApp: WhatsApp markup only. Bold is *single asterisk*. No markdown headers or hyphen bullets.
- Slack: Slack mrkdwn. *bold* with single asterisks, no markdown headers.
- Gmail draft: normal email prose, send-disabled draft, no em dashes, no markdown link syntax.
- Chat (Cowork) and files (.md/.html): full markdown is fine; the universal rules still apply to tone and em dashes.

## Handles
Repliable items use the stable namespaces defined in the portfolio format-contract: W# chat A, M# chat B, K# chat C, V# voice, E# email, I# intake or opportunity, P# day-plan, PR# prune-confirmation. The handle goes in both the message and the manifest line.

Open reconciliation: the job scanners use per-role handles (JS#, AN#, OA#) and one of them reuses K#, which collides with chat C. Reconcile the job handles into a non-colliding namespace (suggested: J# job-role, with source as a suffix, e.g. J12a Anthropic) and record the change here.

## Decision vocabulary (reply text or canvas cell)
blank/keep = no change; done = complete; push <when> = reschedule; drop = delete (confirmation-gated); list <name> = move; p1/p2/p3 = priority; new: <title> | <list> | <due> = create.

## Single-writer fences (who may write what)
Priority is owned by the triage agents; dates by the sweeps; lifecycle by the reply processor; intake creation by the scan; deletion by nobody (always confirmation-gated). No agent writes a field it does not own.

## Verify
Read the id fresh from source immediately before a write; read-after-write verify by id; a not-found id is a hard error, never a silent skip.
