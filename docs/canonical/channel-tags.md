# Channel-tag registry

Every outbound automation leads its message with one bracket tag (house-style.md rule 1). The portfolio format-contract only gave tags as "e.g." examples, so tags were minted per task with no collision control. This is the enumerated registry: one tag, one owning task, one purpose.

Rule for minting a new tag: add a row here first. A tag is reserved by its owner; do not reuse a tag for a different task, and do not let two tasks emit the same tag. Keep tags lowercase, hyphenated, single word where possible.

Tags confirmed 2026-06-17 against the live task prompts.

| Tag | Owning task | Purpose | Cadence |
|---|---|---|---|
| [job-scan] | daily-job-scan-810am | Net-new web + Gmail role hits | 7:30a + 8:30p |
| [anthropic-jobs] | anthropic-jobs-check-daily | Anthropic careers diff | 7:30a |
| [openai-jobs] | openai-jobs-check-daily | OpenAI careers diff | 7:30a |
| [slack-jobs] | slack-job-sweep (skill) | Multi-workspace Slack role sweep | on demand |
| [gmail] | gmail-unread-digest | Unread inbox signal-vs-noise | 7:30a + 8:30p |
| [slack] | slack-unread-digest | Unread Slack DMs/mentions | 7:30a + 8:30p |
| [imessage] | imessage-unread-digest | Unread iMessage threads | 7:30a + 8:30p |
| [whatsapp] | whatsapp-unread-digest | Unread WhatsApp chats | 7:30a + 8:30p |
| [googlevoice] | googlevoice-unread-digest | Google Voice texts/voicemail | 7:30a + 8:30p |
| [meetings] | meetings-briefer | Pre/post meeting briefs | 4x/day |
| [readiness] | readiness-energy-brain | Readiness + energy-timed plan | 6:50a |
| [goals] | goal-review-sunday | Weekly goal scoreboard | Sun 8a |
| [eod] | end-of-day-review | End-of-day accountability scorecard | 9:35p |
| [sleep] | sleep-coach-1015pm | Wind-down + tomorrow first move | 10:15p |
| [workout] | workout-coach | Session preview + nudge | 7a + pre-session |
| [weigh-in] | health-weighin-7am | Wake-up weigh-in prompt | 7a |
| [food-prompt] | food-log-prompt | Food/macros coaching prompt | 9a/1p/7p |

Reserved distinctions to preserve:
- [slack] is the unread-comms digest; [slack-jobs] is the job sweep. Do not merge.
- The three job tags ([job-scan], [anthropic-jobs], [openai-jobs]) are separate surfaces by design and dedupe independently.

Consumers: the imessage-reply-processor reads these tags and the house-style handles to route replies; keep this registry and the handle namespace in house-style.md in sync.
