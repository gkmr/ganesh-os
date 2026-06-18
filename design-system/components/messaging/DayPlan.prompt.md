The morning brief surface: one MIT, a top-3 built one-slot-per-domain (so the day is structurally never single-domain), and the tiered backlog budget.

```jsx
<DayPlan
  date="Tue · 7:42"
  mit="1 pm parents call. Lock the July dates, and move the 1:1 that collides with it."
  top={[
    { domain: "work", text: "Ship the diligence memo before noon (gates the IC vote)." },
    { domain: "health", text: "Confirm the 6 pm lift. Front-load protein at breakfast." },
    { domain: "people", text: "Finalize the July trip. Pick a time and call today." },
  ]}
  tiers={{ today: 6, week: 29, later: 68, prune: 4 }}
/>
```

Counts are tabular. Keep `top` to one item per domain; fill from the next-highest only when a domain is empty.
