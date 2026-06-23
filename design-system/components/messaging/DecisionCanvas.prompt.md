The human's edit channel. Triage writes the rows and priority; the human fills only the DECISION cell (here or by texting the handle); the reply processor (every 30 min) applies each decision and stamps it `applied` so it never re-fires.

```jsx
<DecisionCanvas
  title="T1 - act now"
  rows={[
    { handle: "I01", list: "Pipeline", title: "Intro: founder intro", due: "today 4pm", tag: "act", decision: "" },
    { handle: "I02", list: "Pipeline", title: "Intro ask: a partner at a firm", due: "today 10am", tag: "warm", decision: "done", applied: true },
    { handle: "P02", list: "Pipeline", title: "Stale lead, no longer active", due: "overdue", tag: "prune-review", decision: "drop" },
  ]}
/>
```

A blank `decision` renders an editable placeholder cell. Decision vocab: keep · done · push <when> · drop · list <name> · p1/p2/p3. The `id` (not shown) is the only safe write key.
