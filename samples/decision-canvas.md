# Decision canvas (sample, sanitized)

The two-way edit channel. Triage writes the rows and sets priority; the human edits only the DECISION cell, from this file or by replying to the handle in a text. The reply processor (every 30 min) applies each decision, stamps it applied, and re-mirrors. Vocabulary: blank/keep, done, push <when>, drop, list <name>, p1/p2/p3, merge <handle>.

## T1 - act now
| handle | id | list | title | due | tag | DECISION |
|---|---|---|---|---|---|---|
| I01 | <id> | Pipeline | Intro: <company> founder intro | today 4pm | act | |
| I02 | <id> | Pipeline | Intro ask: <contact> at <company> | today 10am | warm | done |

## T2 - this week
| handle | id | list | title | due | tag | DECISION |
|---|---|---|---|---|---|---|
| I07 | <id> | Pipeline | Follow up: <contact> thread | Wed | contact | push Fri 9a |
| M03 | <id> | Health | Book <specialty> appointment | Thu | call | |

## T4 - prune (confirmation-gated)
| handle | id | list | title | due | tag | DECISION |
|---|---|---|---|---|---|---|
| P02 | <id> | Pipeline | Stale lead, no longer active | overdue | prune-review | drop |

Notes: each row's `id` is the only safe write key and is read fresh from source immediately before any write. A row marked `done` or `drop` is acted on once, then stamped `applied <timestamp>` so it never re-fires.
