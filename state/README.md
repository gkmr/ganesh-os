# state/ - the git-backed store (ADR-16), sanitized example

BLUF: this is the persistence layer the fleet reads and writes, made concrete and stripped of personal data. Per [ADR-16](../docs/decisions.md#adr-16---state-store-for-unattended-mobile-first-operation), the store stays plain Markdown and a jsonl change log; a private git repo is its durability and sync. A cloud run clones this at start, rebuilds its world from disk, writes through the change log, and pushes at the end. Nothing here is live - the real store is a separate private repo that is never copied here.

## What lives here
- `index.md` - the read-first routing index. A run loads this small map before any full file, so the context window stays lean (`hooks/session-start.sh` cats it on startup).
- `changelog.jsonl` - the append-only, source-tagged change log. Every owned-field write appends one line: which agent, which field, before, after, why. This is the audit spine and the input the lane-fence eval reads. The format is the law; the file is just where it currently lives.
- `<agent>/` - per-agent owned memory. Example: `inbox-usps/junk-senders.json`, the USPS digest's only owned artifact (its learned ad/spam senders).

## The sync discipline (why git is enough)
The single-writer fence plus one-run-at-a-time is what makes a git repo a safe store:
- **Run start:** the wrapper pulls the state repo, so the run rebuilds from the latest committed world.
- **During the run:** the agent writes only the one field it owns, appending a change-log line per write.
- **Run end:** the wrapper commits and pushes. Because runs are serialized and each agent owns disjoint fields, two runs never race the same field, so a fast-forward push is the normal case and a conflict is the rare exception, not the rule.

See `schedules/run-agent.sh` for the wrapper, and `schedules/pilot-inbox-usps.md` for standing the first agent up on a cloud routine against this store.

## When this moves to a database
ADR-16 names the trigger: when mobile write throughput becomes the bottleneck, the change log becomes an append-only audit table and the lane-fence check runs against it instead of the file. The law does not change; only this substrate does.
