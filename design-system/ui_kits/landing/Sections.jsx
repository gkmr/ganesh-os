// Ganesh OS landing — content sections: persona router, life grid, governance fence, agent catalog, footer.
const { Button, Badge, Card, CardEyebrow, CardOwner, CodeBlock, Cg, Cc, ChangeLogLine } = window.GaneshOSDesignSystem_462320;

function SectionHead({ eyebrow, title, sub }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <p style={{ font: "var(--text-eyebrow)", textTransform: "uppercase", letterSpacing: ".1em", color: "var(--brand-2)", margin: "0 0 14px", fontWeight: 700 }}>{eyebrow}</p>
      <h2 style={{
        fontSize: "clamp(27px,3.6vw,42px)", lineHeight: 1.08, fontWeight: 800, margin: "0 0 18px", maxWidth: "24ch",
        background: "var(--grad-ink)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
      }}>{title}</h2>
      {sub && <p style={{ fontSize: 18, color: "var(--body)", maxWidth: "66ch", margin: "0 0 8px" }}>{sub}</p>}
    </div>
  );
}

const PERSONAS = [
  { ic: "P", b: "Product leader", q: "Does this person ship?", path: ["Product", "Strategy", "Craft"] },
  { ic: "I", b: "Investor", q: "Is the thinking sound?", path: ["Governance", "Cases", "Operator"] },
  { ic: "R", b: "Research scientist", q: "Where's the rigor?", path: ["Memory", "Architecture", "Agents"] },
  { ic: "E", b: "Engineer", q: "Show me the system.", path: ["Architecture", "Governance", "Agents"] },
];

function PersonaRouter({ onNav }) {
  const [sel, setSel] = React.useState(null);
  return (
    <section id="router" style={{ padding: "84px 0", borderTop: "1px solid var(--line)", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px" }}>
        <SectionHead eyebrow="Start where you are" title="Tell me who's reading. I'll route the proof."
          sub="Five lenses on the same system. Pick yours and the page reorders to what you came to verify." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(238px,1fr))", gap: 14, marginTop: 30 }}>
          {PERSONAS.map((p) => (
            <Card key={p.b} interactive gradientSurface onClick={() => setSel(p.b)}
              style={{ cursor: "pointer", borderRadius: 16, borderColor: sel === p.b ? "var(--line-2)" : "var(--line)" }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, display: "grid", placeItems: "center", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 16, marginBottom: 13, background: "var(--brand-soft)", color: "var(--brand)" }}>{p.ic}</div>
              <b style={{ display: "block", color: "var(--ink)", fontSize: 17 }}>{p.b}</b>
              <span style={{ display: "block", color: "var(--body)", fontSize: 13.5, marginTop: 6, fontStyle: "italic" }}>{p.q}</span>
              <div style={{ marginTop: 14, paddingTop: 13, borderTop: "1px solid var(--line)", font: "600 11.5px/1.5 var(--font-mono)", color: "var(--muted)" }}>
                route → {p.path.map((x, i) => <span key={x}>{i > 0 && " · "}<em style={{ color: "var(--brand-2)", fontStyle: "normal" }}>{x}</em></span>)}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const LIFE = [
  { c: "work", lt: "Work", h: "The company", p: "Build, GTM, capital, the pipeline. The loud lane — fenced so it can't eat the others.", own: "owns: pipeline priority" },
  { c: "health", lt: "Lifting", h: "Strength", p: "The 6 p.m. lift is a protected block with one owning agent. No sweep can bump it.", own: "held: streak-aware" },
  { c: "health", lt: "Recovery", h: "PT & health", p: "Physio sets, mobility, sleep and food logged nightly with one line of coaching.", own: "scored at 9:35 p.m." },
  { c: "people", lt: "Partner", h: "Date night", p: "A protected block, not a suggestion — the relationship gets a guaranteed slot.", own: "sacred: never auto-moved" },
  { c: "people", lt: "Friends", h: "The people you drift from", p: "The friend you went quiet on gets surfaced before months pass, not after.", own: "re-surfaced on decay" },
  { c: "growth", lt: "Growth", h: "Panels, writing, mentoring", p: "The work on yourself competes on equal footing — one ranked slot before urgency votes.", own: "one growth slot/day" },
];

function LifeGrid() {
  return (
    <section id="story" style={{ padding: "84px 0", borderTop: "1px solid var(--line)", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px" }}>
        <SectionHead eyebrow="The whole life · not a work hack" title="It doesn't run my tasks. It runs my life — all of it."
          sub="Most productivity systems optimize the domain that was already winning. This one protects the ones that weren't. Each lane has its own owning agents, protected slots, and an honest scorecard." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 12, marginTop: 30 }}>
          {LIFE.map((l) => (
            <Card key={l.h} accent={l.c} interactive style={{ padding: 16 }}>
              <CardEyebrow accent={l.c}>{l.lt}</CardEyebrow>
              <h3 style={{ fontSize: 15.5, margin: "9px 0 5px", color: "var(--ink)" }}>{l.h}</h3>
              <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>{l.p}</p>
              <CardOwner style={{ marginTop: 10 }}>{l.own}</CardOwner>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const FENCES = [
  { c: "var(--field-priority)", f: "priority", d: "now / this-week / later / prune", o: "pipeline-triage", os: "todo-triage" },
  { c: "var(--field-date)", f: "due_date", d: "calendar reconcile + auto-park", o: "morning-sweep", os: "evening-sweep" },
  { c: "var(--field-sync)", f: "lifecycle", d: "create / complete / reschedule", o: "reply-processor", os: "" },
  { c: "var(--fail)", f: "delete", d: "irreversible — human-gated", o: "nobody", os: "you approve" },
];

function Governance() {
  return (
    <section id="governance" style={{ padding: "84px 0", borderTop: "1px solid var(--line)", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px" }}>
        <SectionHead eyebrow="Under the hood · a governance layer" title="One rule keeps a fleet of writers safe."
          sub="Every mutable field has exactly one owning agent — an agent literally cannot write a field it does not own. The guardrail is enforced in CI, not asserted in a slide." />
        <div style={{
          background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: 22,
          padding: "28px 30px", boxShadow: "var(--shadow-lg)", marginTop: 26,
        }}>
          {FENCES.map((r) => (
            <div key={r.f} style={{ display: "grid", gridTemplateColumns: "1fr 210px", gap: 14, alignItems: "center", padding: "13px 0", borderTop: "1px solid var(--line)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <span style={{ width: 11, height: 11, borderRadius: 4, flex: "none", background: r.c }} />
                <div>
                  <b style={{ color: "#fff", fontWeight: 600, fontSize: 15, fontFamily: "var(--font-mono)" }}>{r.f}</b>
                  <span style={{ display: "block", color: "var(--muted)", fontSize: 12.5 }}>{r.d}</span>
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#e6ebf3", textAlign: "right" }}>
                {r.o}
                {r.os && <small style={{ display: "block", color: "var(--faint)", fontWeight: 400, fontSize: 11.5 }}>{r.os}</small>}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 18, alignItems: "start" }}>
          <CodeBlock title="evals/lane_fence.py · CI trust gate">
            <Cc># fails on the first cross-lane write</Cc>{"\n"}
            <Cc>$ pytest evals/  →  </Cc><Cg>5 passed</Cg>{"\n"}
            <Cc># lane-fence clean · 0 cross-lane writes</Cc>
          </CodeBlock>
          <div>
            <ChangeLogLine time="05:48" agent="pipeline-triage" field="priority(J04)" />
            <ChangeLogLine time="06:04" agent="morning-sweep" field="auto-park ×63" note="# overdue → 0" />
            <ChangeLogLine time="14:02" agent="todo-triage" field="due_date(M51)" verdict="CROSS-LANE" blocked />
          </div>
        </div>
      </div>
    </section>
  );
}

const AGENTS = [
  { c: "work", g: "Triage & priority", items: [["pipeline-triage", "priority"], ["todo-triage", "priority"], ["intake-scan", "create_item"]] },
  { c: "health", g: "Calendar & dates", items: [["morning-sweep", "due_date"], ["evening-sweep", "due_date"], ["slot-guard", "protected"]] },
  { c: "people", g: "Lifecycle & reply", items: [["reply-processor", "lifecycle"], ["manifest-build", "manifest"], ["mirror-back", "ack"]] },
];

function AgentCatalog() {
  return (
    <section id="agents" style={{ padding: "84px 0", borderTop: "1px solid var(--line)", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px" }}>
        <SectionHead eyebrow="The fleet · 27 agents, one field each" title="Every agent owns exactly one field."
          sub="Coordination happens through shared files, never shared state. Here's a slice of the catalog, grouped by concern." />
        {AGENTS.map((grp) => (
          <div key={grp.g} style={{ marginTop: 18 }}>
            <div style={{ font: "700 11px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: ".06em", color: `var(--${grp.c})`, marginBottom: 9, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 9, height: 9, borderRadius: 3, background: `var(--${grp.c})` }} />{grp.g}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
              {grp.items.map((it) => (
                <Card key={it[0]} accent={grp.c} accentSide="left" interactive style={{ borderRadius: 11, padding: "12px 13px" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{it[0]}</div>
                  <div style={{ font: "500 11px/1.35 var(--font-mono)", color: "var(--muted)", marginTop: 5 }}>
                    owns <b style={{ color: "var(--brand-2)" }}>{it[1]}</b>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "46px 0", color: "var(--muted)", fontSize: 13.5, borderTop: "1px solid var(--line)", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 22, height: 22, borderRadius: 7, background: "var(--grad-mark)" }} />
          <span style={{ color: "var(--body)", fontWeight: 700 }}>Ganesh OS</span>
          <span>— autonomous agents, made safe to run unattended.</span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Button variant="ghost" size="sm" as="a" href="#" onClick={(e)=>e.preventDefault()}>★ Star on GitHub</Button>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { SectionHead, PersonaRouter, LifeGrid, Governance, AgentCatalog, Footer });
