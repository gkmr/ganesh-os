# Change log (sample, sanitized)

Every reminder or calendar change, from any source, appends one channel-tagged line here. This is the single source of truth for what changed and why. Channels: sms, file-triage, reminders-app, cowork-chat, calendar, sweep, intake-scan, pipeline-triage, todo-triage, eod.

## <date> - morning sweep (channel sweep)
- AUTO-PARK: 14 overdue items re-dated forward by tier (T2 +7d, T3 +14d), spread across the next 4 open days under the daily cap. 0 deletions. Overdue now 0.
- DEDUPE: merged 2 duplicate holds at 11am; lower-tier yielded. Read-after-write verified.

## <date> - intake scan (channel intake-scan)
- CREATE reminder "Intake: <company> <signal>" | list Pipeline | undated backlog | id <id> | handle JS3. Tier-1; surfaced + SMS.

## <date> - reply processor (channel sms)
- COMPLETE id <id> (handle J02) from text reply "done J02". Verified completed. Row stamped applied.
- RESCHEDULE id <id> (handle J07) to Fri 9am + matching alarm, from "push J07 to Fri 9a".

## <date> - triage decisions (channel cowork-chat)
- Re-tiered 36 pipeline items; spread a single overloaded day across the week; priorities preserved by the next sweep.
