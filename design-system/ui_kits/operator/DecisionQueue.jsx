// Ganesh OS — Operator decision queue. Interactive: apply decisions, confirm a prune via Dialog, Toast on apply.
const { DecisionCanvas, SegmentedControl, Dialog, Toast, Button, DayPlan } = window.GaneshOSDesignSystem_462320;

const SEED = {
  today: [
    { handle: "J01", list: "Pipeline", title: "Intro: founder intro", due: "today 4pm", tag: "act", decision: "" },
    { handle: "J02", list: "Pipeline", title: "Referral ask at company", due: "today 10am", tag: "warm", decision: "done", applied: true },
    { handle: "M03", list: "Health", title: "Book specialty appointment", due: "Thu", tag: "call", decision: "" },
  ],
  prune: [
    { handle: "P02", list: "Pipeline", title: "Stale lead, posting closed", due: "overdue", tag: "prune-review", decision: "drop" },
    { handle: "P05", list: "Intake", title: "Cold thread, no reply 28d", due: "overdue", tag: "prune-review", decision: "drop" },
  ],
};

function DecisionQueue() {
  const [tier, setTier] = React.useState("today");
  const [rows, setRows] = React.useState(SEED);
  const [confirm, setConfirm] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  const applyTodo = () => {
    setRows((r) => ({ ...r, today: r.today.map((x) => (x.decision && !x.applied ? { ...x, applied: true } : x.decision ? x : { ...x, decision: "done", applied: true })) }));
    setToast({ tone: "success", title: "Decisions applied", body: "Stamped and re-mirrored. The store stays canonical." });
  };
  const doPrune = () => {
    setRows((r) => ({ ...r, prune: r.prune.map((x) => ({ ...x, applied: true })) }));
    setConfirm(false);
    setToast({ tone: "warn", title: "2 items pruned", body: "Irreversible, so it needed you. Logged with timestamps." });
  };

  return (
    <section style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-xl)", boxShadow: "var(--e1)", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 18px", borderBottom: "1px solid var(--line)", gap: 12, flexWrap: "wrap" }}>
        <h3 style={{ margin: 0, font: "700 11px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: ".07em", color: "var(--muted)" }}>Decision queue</h3>
        <SegmentedControl size="sm" options={[{ value: "today", label: "Apply now" }, { value: "prune", label: "Prune · gated" }]} value={tier} onChange={setTier} />
      </div>
      <div style={{ padding: 18 }}>
        <DecisionCanvas rows={rows[tier]} />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 14 }}>
          {tier === "today"
            ? <Button size="sm" onClick={applyTodo}>Apply decisions →</Button>
            : <Button size="sm" onClick={() => setConfirm(true)}>Confirm prune (2) →</Button>}
        </div>
      </div>

      <Dialog open={confirm} onClose={() => setConfirm(false)} title="Confirm prune">
        <p style={{ color: "var(--body)", margin: 0, fontSize: 14, lineHeight: 1.55 }}>
          Drop 2 stale items? Deletion is the one thing no agent can do unattended, so it needs you.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 18 }}>
          <Button variant="ghost" size="sm" onClick={() => setConfirm(false)}>Keep them</Button>
          <Button size="sm" onClick={doPrune}>Drop both</Button>
        </div>
      </Dialog>

      {toast && (
        <div style={{ position: "fixed", right: 24, bottom: 24, zIndex: 120 }}>
          <Toast tone={toast.tone} title={toast.title} onDismiss={() => setToast(null)}>{toast.body}</Toast>
        </div>
      )}
    </section>
  );
}
window.DecisionQueue = DecisionQueue;
