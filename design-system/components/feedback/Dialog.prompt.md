Centered modal over a blurred scrim, closes on Escape/overlay. The brand uses it for confirmation-gated destructive actions (the only thing agents can't do unattended).

```jsx
<Dialog open={open} onClose={() => setOpen(false)} title="Confirm prune">
  <p style={{ color: "var(--body)" }}>Drop PR2 (stale lead, posting closed)? This is irreversible.</p>
  <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 18 }}>
    <Button variant="ghost" onClick={() => setOpen(false)}>Keep</Button>
    <Button onClick={confirm}>Drop it</Button>
  </div>
</Dialog>
```
