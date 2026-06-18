import React from "react";

/**
 * Ganesh OS — DecisionCanvas
 * Pattern #3, the two-way edit channel. Triage writes rows and sets priority; the
 * human edits only the DECISION cell (here or by replying to the handle). The
 * processor applies each decision and stamps the row `applied` so it never re-fires.
 * Mirrors samples/decision-canvas.md. Grouped by tier (T1 apply now / T2 week / T4 prune).
 *
 * rows: [{ handle, list, title, due, tag, decision, applied }]
 */
const NS = {
  W: "var(--brand-2)", M: "var(--brand-2)", K: "var(--brand-2)", V: "var(--people)",
  E: "var(--health)", I: "var(--work)", P: "var(--fail)", J: "var(--work)",
};
function nsColor(id) {
  const ns = (String(id).match(/^[A-Z]+/) || ["M"])[0];
  return NS[ns] || "var(--brand)";
}

export function DecisionCanvas({ title, rows = [], style = {}, ...rest }) {
  return (
    <div
      style={{
        background: "var(--surface-2)",
        border: "1px solid var(--line)",
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
        ...style,
      }}
      {...rest}
    >
      {title && (
        <div style={{ padding: "11px 15px", borderBottom: "1px solid var(--line)", font: "700 11px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: ".06em", color: "var(--muted)" }}>
          {title}
        </div>
      )}
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)" }}>
        <thead>
          <tr>
            {["handle", "title", "due", "tag", "decision"].map((h) => (
              <th key={h} style={{ textAlign: "left", padding: "8px 14px", font: "700 10px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: ".06em", color: "var(--faint)", borderBottom: "1px solid var(--line)" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const c = nsColor(r.handle);
            return (
              <tr key={i} style={{ background: r.applied ? "rgba(52,211,153,.05)" : "transparent" }}>
                <td style={cell}>
                  <code style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, fontWeight: 700, color: c, border: `1px solid ${c}`, borderRadius: "var(--r-sm)", padding: "2px 6px" }}>{r.handle}</code>
                </td>
                <td style={{ ...cell, color: "var(--body)", fontSize: 13.5 }}>
                  {r.title}
                  {r.list && <span style={{ color: "var(--faint)", fontFamily: "var(--font-mono)", fontSize: 11, marginLeft: 7 }}>{r.list}</span>}
                </td>
                <td style={{ ...cell, color: r.due === "overdue" ? "var(--fail)" : "var(--muted)", fontFamily: "var(--font-mono)", fontSize: 12 }}>{r.due}</td>
                <td style={cell}>
                  {r.tag && <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", background: "rgba(255,255,255,.04)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", padding: "2px 7px" }}>{r.tag}</span>}
                </td>
                <td style={cell}>
                  {r.decision ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: r.applied ? "var(--pass)" : "var(--ink)" }}>
                      {r.applied && <span style={{ color: "var(--pass)" }}>✓</span>}
                      {r.decision}
                      {r.applied && <span style={{ color: "var(--faint)", fontWeight: 400 }}>applied</span>}
                    </span>
                  ) : (
                    <span style={{ display: "inline-block", minWidth: 64, height: 22, borderRadius: 6, border: "1px dashed var(--line-2)", background: "rgba(255,255,255,.02)" }} />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const cell = { padding: "10px 14px", borderBottom: "1px solid var(--line)", verticalAlign: "middle" };
