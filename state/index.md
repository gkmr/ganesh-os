# Read-first routing index (example)

The small map a run loads before any full file. Each line: an agent, what it reads, what it writes. Keeps the window lean - a run opens only what its job needs, never the whole store.

## Capture (read-only)
- inbox-usps -> reads: gmail (Informed Delivery), state/inbox-usps/junk-senders.json; writes: state/inbox-usps/junk-senders.json (own memory), the daily manifest, one changelog line per learned sender.
- inbox-gmail, inbox-slack -> read: their channel; write: manifest only.

## Triage (priority only)
- job-reminders-triage -> reads: the pipeline list; writes: priority + tags, one changelog line per change.
- ea-todo-triage -> reads: every other list; writes: priority + tags.

## Reconcile (dates)
- ea-morning-sweep, ea-evening-sweep -> read: reminders + calendars + canvases; write: due_date, one changelog line per change.

## Lifecycle
- ea-reminders-sync -> reads: decision canvases + reply texts; writes: create / complete / reschedule from explicit human decisions.

## Where the durable memory is
- changelog.jsonl - the append-only audit spine (everyone appends, the weekly pass and the lane-fence eval read).
- inbox-usps/junk-senders.json - the USPS digest's owned learning file.
