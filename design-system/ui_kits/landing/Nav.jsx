// Ganesh OS landing — Nav. Glassy sticky bar with brand glyph, tab links, Watch CTA.
const { Button } = window.GaneshOSDesignSystem_462320;

function Nav({ active, onNav }) {
  const tabs = ["Story", "Product", "Governance", "Architecture", "Agents", "Operator"];
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 90,
      background: "rgba(8,11,20,.72)", backdropFilter: "saturate(160%) blur(14px)",
      borderBottom: "1px solid var(--line)",
    }}>
      <div style={{
        maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, gap: 16,
      }}>
        <a href="#top" onClick={(e)=>{e.preventDefault();onNav("top");}} style={{
          display: "flex", alignItems: "center", gap: 11, fontWeight: 800,
          color: "var(--ink)", fontSize: 16, textDecoration: "none", whiteSpace: "nowrap",
        }}>
          <span style={{
            width: 26, height: 26, borderRadius: 8, background: "var(--grad-mark)",
            boxShadow: "0 0 22px rgba(139,123,255,.6)",
          }} /> Ganesh OS
        </a>
        <div style={{ display: "flex", gap: 3, alignItems: "center", overflowX: "auto" }}>
          {tabs.map((t) => {
            const id = t.toLowerCase();
            const on = active === id;
            return (
              <a key={t} href={"#" + id} onClick={(e)=>{e.preventDefault();onNav(id);}} style={{
                color: on ? "#fff" : "var(--muted)", fontSize: 13.5, fontWeight: 600, cursor: "pointer",
                whiteSpace: "nowrap", padding: "8px 12px", borderRadius: 999, textDecoration: "none",
                background: on ? "var(--grad-brand)" : "transparent",
                boxShadow: on ? "0 4px 14px rgba(139,123,255,.35)" : "none",
                transition: "color .15s, background .15s",
              }}>{t}</a>
            );
          })}
        </div>
        <Button as="a" href="#" onClick={(e)=>e.preventDefault()}>▶ Watch</Button>
      </div>
    </nav>
  );
}
window.Nav = Nav;
