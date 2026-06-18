// Ganesh OS — one-day digest. A phone frame whose conversation advances:
// overnight pipeline → 7:42 morning brief → reply by handle → evening scorecard.
const { MessageBubble, DayPlan, DomainScorecard, DigestBlock, SegmentedControl, Button } = window.GaneshOSDesignSystem_462320;

function Phone({ children }) {
  return (
    <div style={{ width: 390, margin: "0 auto", background: "#05080f", border: "1px solid var(--line-2)", borderRadius: 44, padding: 12, boxShadow: "var(--e3)" }}>
      <div style={{ background: "var(--bg)", borderRadius: 33, overflow: "hidden", height: 720, display: "flex", flexDirection: "column", position: "relative" }}>
        <div style={{ height: 30, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <span style={{ width: 92, height: 22, background: "#05080f", borderRadius: 999, position: "absolute", top: 6 }} />
        </div>
        <div style={{ padding: "4px 16px 10px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 30, height: 30, borderRadius: 9, background: "var(--grad-mark)" }} />
          <div><b style={{ color: "var(--ink)", fontSize: 14 }}>Ganesh OS</b><div style={{ fontSize: 11, color: "var(--faint)", fontFamily: "var(--font-mono)" }}>your quiet co-pilot</div></div>
        </div>
        <div id="thread" style={{ flex: 1, overflowY: "auto", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 14 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

const STEPS = ["overnight", "morning", "reply", "evening"];

function OneDay() {
  const [step, setStep] = React.useState(0);
  const at = (i) => step >= i;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <SegmentedControl size="sm"
          options={[{ value: "0", label: "Overnight" }, { value: "1", label: "7:42 brief" }, { value: "2", label: "Reply" }, { value: "3", label: "That night" }]}
          value={String(step)} onChange={(v) => setStep(Number(v))} />
      </div>

      <Phone>
        {at(0) && (
          <MessageBubble from="them" emoji="🌙" time="2:10 AM">
            While you slept: read 7 inboxes, filtered 51 promos, tiered 128 to-dos. Nothing that matters slipped.
          </MessageBubble>
        )}
        {at(1) && (
          <div style={{ animation: "fadeup .4s var(--ease-out)" }}>
            <DayPlan date="Tue · 7:42"
              mit="1 pm parents call. Lock the July dates, and move the 1:1 that collides with it."
              top={[
                { domain: "work", text: "Ship the diligence memo before noon (gates the IC vote)." },
                { domain: "health", text: "Confirm the 6 pm lift. Front-load protein." },
                { domain: "people", text: "Finalize the July trip. Call today." },
              ]}
              tiers={{ today: 6, week: 29, later: 68, prune: 4 }} />
          </div>
        )}
        {at(2) && (
          <React.Fragment>
            <MessageBubble from="me" time="7:43 AM">done M51</MessageBubble>
            <MessageBubble from="them" time="7:43 AM">Marked done, stamped, re-mirrored. Next: confirm the 6 pm lift.</MessageBubble>
            <MessageBubble from="me" time="7:44 AM">push the lift to 7</MessageBubble>
            <MessageBubble from="them" time="7:44 AM">Moved to 7 pm. Protected block, so nothing will bump it.</MessageBubble>
          </React.Fragment>
        )}
        {at(3) && (
          <div style={{ animation: "fadeup .4s var(--ease-out)" }}>
            <DomainScorecard grade="strong"
              headline="MIT met. Top 3 ≈ 2.5 of 3. 23 things done."
              wins={["Shipped both coaching deadlines", "Cleared a work blocker", "Handled a doctor callback"]}
              slipped={["Two items, now tomorrow's first move"]}
              domains={[{ domain: "health", label: "Protein", value: "66 / 180 g", ok: false }]}
              tomorrow="Guard 9–11 am before the meeting wall, and front-load protein at breakfast." />
          </div>
        )}
        <style>{"@keyframes fadeup{from{opacity:0;transform:translateY(10px)}}"}</style>
      </Phone>

      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 22 }}>
        <Button variant="ghost" size="sm" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>← Back</Button>
        <Button size="sm" onClick={() => setStep((s) => Math.min(3, s + 1))} disabled={step === 3}>
          {step === 3 ? "Day complete" : "Advance the day →"}
        </Button>
      </div>
    </div>
  );
}
window.OneDay = OneDay;
