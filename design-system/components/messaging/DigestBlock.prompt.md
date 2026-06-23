One channel's digest in the canonical house style: bracket tag, a one-line count summary with "N need you", action items first (each repliable by handle), compressed FYIs, and filtered noise on the last line.

```jsx
<DigestBlock
  channel="gmail"
  summary="7 unread that matter, 2 need you."
  items={[
    { handle: "E1", text: "A prospect wants times for an intro call. Reply with 2 slots." },
    { handle: "E2", text: "A founder replied, next step is a diligence call. Decide if in." },
  ]}
  fyis={["Newsletter weekly issue", "Receipt from vendor", "Calendar invite already on your calendar"]}
  noise="12 promotional/social messages filtered out."
/>
```

The human replies by handle (`done E1`, `push E2 to Thu`). Keep copy sentence-case, no em dashes, bare numbers.
