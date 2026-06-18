// Ganesh OS — Operator dashboard. Top bar with brand, date, surface status.
const { Badge } = window.GaneshOSDesignSystem_462320;

function OpBar() {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 90,
      background: "rgba(8,11,20,.78)", backdropFilter: "saturate(160%) blur(14px)",
      borderBottom: "1px solid var(--line)",
    }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <span style={{ width: 26, height: 26, borderRadius: 8, background: "var(--grad-mark)", boxShadow: "0 0 22px rgba(139,123,255,.6)" }} />
          <b style={{ color: "var(--ink)", fontSize: 15.5, fontWeight: 800 }}>Ganesh OS</b>
          <span style={{ color: "var(--faint)", fontSize: 13.5, fontFamily: "var(--font-mono)" }}>operator</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--muted)" }}>Tue 17 Jun · 7:42</span>
          <Badge variant="tag" tone="pass" pulse>27 agents nominal</Badge>
        </div>
      </div>
    </header>
  );
}
window.OpBar = OpBar;
