Hairline dark table with mono header and row hover. Use `mono` columns for ids, counts, timestamps.

```jsx
<Table
  columns={[
    { key: "agent", header: "Agent" },
    { key: "owns", header: "Owns field", mono: true },
    { key: "runs", header: "Runs/day", align: "right", mono: true },
  ]}
  rows={[
    { agent: "morning-sweep", owns: "due_date", runs: 1 },
    { agent: "pipeline-triage", owns: "priority", runs: 4 },
  ]}
/>
```
