// Ganesh OS — Operator panels: domain balance, change-log spine, eval gate, fence table.
const { DomainLane, ChangeLogLine, CodeBlock, Cg, Cc, Cr, Table, StatTile } = window.GaneshOSDesignSystem_462320;

function Panel({ title, right, children, style }) {
  return (
    <section style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-xl)", boxShadow: "var(--e1)", overflow: "hidden", ...style }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 18px", borderBottom: "1px solid var(--line)" }}>
        <h3 style={{ margin: 0, font: "700 11px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: ".07em", color: "var(--muted)" }}>{title}</h3>
        {right}
      </div>
      <div style={{ padding: 18 }}>{children}</div>
    </section>
  );
}

function DomainBalance() {
  return (
    <Panel title="Domain balance · today" right={<span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--brand-2)" }}>one slot each</span>}>
      <DomainLane name="Work / company" sub="build, GTM, capital" domain="work" count="6 today" />
      <DomainLane name="Health" sub="lift, cardio, PT" domain="health" count="2 today" delay={0.5} />
      <DomainLane name="People" sub="partner, family" domain="people" count="1 today" delay={1.0} />
      <DomainLane name="Growth" sub="panels, writing" domain="growth" count="1 today" delay={1.5} />
    </Panel>
  );
}

function ChangeLog() {
  return (
    <Panel title="Change-log spine · live" right={<span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--faint)" }}>append-only</span>}>
      <ChangeLogLine time="05:48" agent="pipeline-triage" field="priority(J04)" />
      <ChangeLogLine time="06:04" agent="morning-sweep" field="auto-park ×63" note="# overdue → 0" />
      <ChangeLogLine time="06:05" agent="morning-sweep" field="due_date(M51)" note="# read-after-write ✓" />
      <ChangeLogLine time="07:41" agent="manifest-build" field="brief(P1)" />
      <ChangeLogLine time="14:02" agent="todo-triage" field="due_date(M51)" verdict="CROSS-LANE" blocked />
    </Panel>
  );
}

function EvalGate() {
  return (
    <Panel title="CI trust gate" right={<span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--pass)" }}>passing</span>}>
      <CodeBlock title="evals/ · pre-merge">
        <Cc># single-writer fence + day-budget</Cc>{"\n"}
        <Cc>$ pytest evals/  →  </Cc><Cg>5 passed</Cg>{"\n"}
        <Cg>lane-fence</Cg>{"   clean · 0 cross-lane writes"}{"\n"}
        <Cg>day-budget</Cg>{"  ok · no day over cap"}{"\n"}
        <Cr>blocked</Cr>{"     todo-triage → due_date (not owner)"}
      </CodeBlock>
    </Panel>
  );
}

function FenceTable() {
  const owner = (v) => <span style={{ color: "var(--ink)" }}>{v}</span>;
  return (
    <Panel title="Single-writer fences" right={<span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--faint)" }}>one owner per field</span>}>
      <Table
        columns={[
          { key: "field", header: "Field", mono: true },
          { key: "owner", header: "Owning agent", render: owner },
          { key: "who", header: "Who else may write", align: "right" },
        ]}
        rows={[
          { field: "priority", owner: "triage agents", who: "read-only" },
          { field: "due_date", owner: "the sweeps", who: "read-only" },
          { field: "lifecycle", owner: "reply-processor", who: "read-only" },
          { field: "delete", owner: "nobody", who: "you approve" },
        ]}
      />
    </Panel>
  );
}

function Metrics() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
      <StatTile value="99 → 0" label="overdue, held at zero" />
      <StatTile value="63" label="auto-parked today" />
      <StatTile value="0" label="cross-lane writes" />
      <StatTile value="5/5" label="evals passing" />
    </div>
  );
}

Object.assign(window, { OpPanel: Panel, DomainBalance, ChangeLog, EvalGate, FenceTable, Metrics });
