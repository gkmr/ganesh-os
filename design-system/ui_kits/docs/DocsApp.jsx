// Ganesh OS — Docs site. Left route nav, prose column (brand heading system), right TOC.
const { Badge, CodeBlock, Cg, Cc } = window.GaneshOSDesignSystem_462320;

const ROUTES = [
  { g: "Start", items: ["Story", "Operator", "Craft"] },
  { g: "System", items: ["Design patterns", "Governance", "Architecture", "Agent catalog"] },
  { g: "Proof", items: ["Case studies", "Decisions", "Harness", "Security scan"] },
];

// The 9 patterns, lifted from docs/design-patterns.md (problem → pattern).
const PATTERNS = [
  ["Single-writer fences", "Many agents writing one store clobber each other.", "Give every mutable field exactly one owner. Priority to triage, dates to the sweeps, lifecycle to the reply processor, deletion to nobody. A lane-fence check verifies it. This one rule makes unattended multi-agent writing safe."],
  ["Forward progress, human-in-the-loop", "Wait on every decision and you build a backlog; decide everything and you lose trust.", "The loop advances on its own and surfaces only exceptions. Overdue items auto-park forward by priority. Destructive actions stay gated. Progress is the default; the human is the exception handler."],
  ["The decision canvas", "The source of truth is awkward to bulk-edit; a separate planning doc drifts.", "Mirror the store into a file where each row carries a handle, the id, and a blank decision cell. An hourly processor applies decisions with read-after-write verification, stamps them applied, and re-mirrors."],
  ["Manifest and reply contract", "A digest that just notifies you is a dead end.", "Every surfaced item gets a handle and a JSON manifest line. The human replies by handle or in natural language; a processor resolves it into the right store action. The digest becomes an action surface."],
  ["Today-budget and spread", "A bulk re-tier dumps forty items on one day and the today view becomes noise.", "Cap the visible load per day (lower on travel days). Exclude recurring rituals. Fan overflow round-robin across the next open days under the cap. A per-day-budget check enforces it."],
  ["Cross-domain ranking", "Ranking by urgency lets one loud domain crowd out everything else.", "Build the daily top-3 with one slot per domain, filling from the next-highest only when a domain is empty, and saying so. The ranked day is structurally never single-domain."],
  ["Knowledge that resists rot", "A growing pile of notes goes stale and contradicts itself.", "A read-first index, a shared format contract, an append-only change log, and temporal-validity stamps with a weekly lint that flags stale or contradicted claims."],
  ["Frozen and behavioral evals", "A self-modifying system can quietly regress.", "Keep frozen binary checks plus behavioral ones from real incidents. The weekly pass runs them before a change and re-runs after; a regression is rolled back from a snapshot, not shipped."],
  ["Idempotent, degradable jobs", "Cron on an intermittently awake host double-fires or misses.", "Every agent opens with a concurrency guard and a surface check. A missed or doubled fire degrades to a short delta, never a duplicate or a crash."],
];

function DocsApp() {
  const [active, setActive] = React.useState("Design patterns");
  // collapse the side rails on narrow viewports
  const [narrow, setNarrow] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener ? mq.addEventListener("change", on) : mq.addListener(on);
    return () => (mq.removeEventListener ? mq.removeEventListener("change", on) : mq.removeListener(on));
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: narrow ? "1fr" : "230px 1fr 200px", minHeight: "100vh" }}>
      {/* left nav — full rail on desktop, horizontal route scroller on mobile */}
      <aside style={narrow
        ? { position: "sticky", top: 0, zIndex: 20, background: "rgba(8,11,20,.86)", backdropFilter: "saturate(160%) blur(12px)", borderBottom: "1px solid var(--line)", padding: "12px 16px" }
        : { borderRight: "1px solid var(--line)", padding: "26px 20px", position: "sticky", top: 0, alignSelf: "start", height: "100vh", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: narrow ? 10 : 26 }}>
          <span style={{ width: 26, height: 26, borderRadius: 8, background: "var(--grad-mark)" }} />
          <b style={{ color: "var(--ink)", fontWeight: 800 }}>Ganesh OS</b>
        </div>
        {narrow ? (
          <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 2 }}>
            {ROUTES.flatMap((r) => r.items).map((it) => {
              const on = it === active;
              return (
                <a key={it} onClick={() => setActive(it)} style={{
                  flex: "none", padding: "7px 12px", borderRadius: 999, cursor: "pointer", whiteSpace: "nowrap",
                  fontSize: 12.5, fontWeight: 600, color: on ? "#fff" : "var(--muted)",
                  background: on ? "var(--grad-brand)" : "rgba(255,255,255,.04)",
                  border: "1px solid var(--line)",
                }}>{it}</a>
              );
            })}
          </div>
        ) : ROUTES.map((r) => (
          <div key={r.g} style={{ marginBottom: 18 }}>
            <div style={{ font: "700 10px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: ".08em", color: "var(--faint)", marginBottom: 9 }}>{r.g}</div>
            {r.items.map((it) => {
              const on = it === active;
              return (
                <a key={it} onClick={() => setActive(it)} style={{
                  display: "block", padding: "6px 10px", marginBottom: 2, borderRadius: 7, cursor: "pointer",
                  fontSize: 13.5, color: on ? "var(--ink)" : "var(--muted)",
                  background: on ? "var(--brand-soft)" : "transparent",
                  borderLeft: `2px solid ${on ? "var(--brand)" : "transparent"}`,
                }}>{it}</a>
              );
            })}
          </div>
        ))}
      </aside>

      {/* prose */}
      <main style={{ padding: narrow ? "32px 22px 56px" : "56px 64px", maxWidth: 820 }}>
        <div style={{ font: "700 12px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: ".1em", color: "var(--brand-2)", marginBottom: 16 }}>System · the reusable ideas</div>
        <h1 style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-.03em", margin: "0 0 16px", background: "var(--grad-ink)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Design patterns</h1>
        <p style={{ fontSize: 19, lineHeight: 1.6, color: "var(--body)", margin: "0 0 36px", maxWidth: "64ch" }}>
          The reusable ideas behind Ganesh OS, each stated as a problem and the pattern that solves it, so they transfer to any multi-agent personal or operational system.
        </p>

        {PATTERNS.map((p, i) => (
          <section key={i} id={"p" + i} style={{ marginBottom: 34, scrollMarginTop: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.02em", color: "var(--ink)", margin: "0 0 6px", display: "flex", alignItems: "baseline", gap: 12 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--brand)", fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}</span>
              {p[0]}
            </h2>
            <p style={{ margin: "0 0 8px", color: "var(--muted)", fontSize: 15.5, lineHeight: 1.55 }}><b style={{ color: "var(--fail)", fontWeight: 600 }}>Problem.</b> {p[1]}</p>
            <p style={{ margin: 0, color: "var(--body)", fontSize: 15.5, lineHeight: 1.65 }}><b style={{ color: "var(--brand-2)", fontWeight: 600 }}>Pattern.</b> {p[2]}</p>
          </section>
        ))}

        <div style={{ margin: "10px 0 50px" }}>
          <CodeBlock title="evals/ · the patterns are checked, not asserted">
            <Cc># each pattern has a binary or behavioral eval</Cc>{"\n"}
            <Cc>$ pytest evals/  →  </Cc><Cg>5 passed</Cg>
          </CodeBlock>
        </div>
      </main>

      {/* right TOC — desktop only */}
      {!narrow && (
        <nav style={{ borderLeft: "1px solid var(--line)", padding: "56px 18px", position: "sticky", top: 0, alignSelf: "start", height: "100vh", overflowY: "auto" }}>
          <div style={{ font: "700 10px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: ".08em", color: "var(--faint)", marginBottom: 12 }}>On this page</div>
          {PATTERNS.map((p, i) => (
            <a key={i} href={"#p" + i} style={{ display: "block", padding: "5px 0", fontSize: 12.5, color: "var(--muted)", lineHeight: 1.4 }}>{p[0]}</a>
          ))}
        </nav>
      )}
    </div>
  );
}
window.DocsApp = DocsApp;
