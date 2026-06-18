The human's edit channel. Triage writes the rows and priority; the human fills only the DECISION cell (here or by texting the handle); the hourly processor applies each decision and stamps it `applied` so it never re-fires.

```jsx
<DecisionCanvas
  title="T1 — apply now"
  rows={[
    { handle: "J01", list: "Pipeline", title: "Intro: founder intro", due: "today 4pm", tag: "act", decision: "" },
    { handle: "J02", list: "Pipeline", title: "Referral ask at company", due: "today 10am", tag: "warm", decision: "done", applied: true },
    { handle: "P02", list: "Pipeline", title: "Stale lead, posting closed", due: "overdue", tag: "prune-review", decision: "drop" },
  ]}
/>
```

A blank `decision` renders an editable placeholder cell. Decision vocab: keep · done · push <when> · drop · list <name> · p1/p2/p3. The `id` (not shown) is the only safe write key.
