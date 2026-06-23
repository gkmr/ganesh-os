A single audit-log row - the brand's proof that every write is attributable to one owner. Stack several to form the change-log spine.

```jsx
<ChangeLogLine time="06:00" agent="morning-sweep" field="due_date(M51)" note="# read-after-write ✓" />
<ChangeLogLine time="13:40" agent="reply-processor" field="lifecycle(I02)" />
<ChangeLogLine time="14:02" agent="todo-triage" field="due_date(M51)" verdict="CROSS-LANE" blocked />
```

`blocked` flips the row to the red failed-eval state. Pair with a `CodeBlock` running `pytest evals/` for the full "trust gate" motif.
