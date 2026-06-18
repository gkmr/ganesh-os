import React from "react";

/**
 * Ganesh OS — DomainScorecard
 * The nightly grade: an MIT-met headline with a grade chip, wins, what slipped,
 * a per-domain readout, and tomorrow's first move. Mirrors samples/end-of-day-
 * scorecard.md. Grades: exceeded / strong / solid / partial / reset.
 *
 * domains: [{ domain, label, value, ok }]
 */
const GRADE = {
  exceeded: "var(--neon)", strong: "var(--pass)", solid: "var(--brand-2)",
  partial: "var(--work)", reset: "var(--muted)",
};
const DOMAIN = { work: "var(--work)", health: "var(--health)", people: "var(--people)", growth: "var(--growth)" };

export function DomainScorecard({
  date = "That night",
  grade = "strong",
  headline,
  wins = [],
  slipped = [],
  domains = [],
  tomorrow,
  style = {},
  ...rest
}) {
  const gc = GRADE[grade] || "var(--pass)";
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderTop: `2px solid ${gc}`,
        borderRadius: "var(--r-xl)",
        padding: "20px 22px",
        boxShadow: "var(--shadow-lg)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ font: "700 11px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: ".07em", color: "var(--muted)" }}>
          🌙 {date} · scorecard
        </span>
        <span style={{ font: "700 11px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: ".06em", color: gc, background: "rgba(255,255,255,.04)", border: `1px solid ${gc}`, borderRadius: "var(--r-pill)", padding: "5px 11px" }}>
          {grade}
        </span>
      </div>

      {headline && <div style={{ fontSize: 16, color: "var(--ink)", fontWeight: 700, marginBottom: 14, lineHeight: 1.35 }}>{headline}</div>}

      <Section label="Wins" color="var(--pass)" items={wins} />
      <Section label="Slipped to tomorrow" color="var(--work)" items={slipped} />

      {domains.length > 0 && (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "12px 0 2px" }}>
          {domains.map((d, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--body)", background: "rgba(255,255,255,.03)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", padding: "6px 10px" }}>
              <span style={{ width: 8, height: 8, borderRadius: 3, background: DOMAIN[d.domain] || "var(--brand)" }} />
              <b style={{ color: "var(--ink)", fontWeight: 600 }}>{d.label}</b>
              <span style={{ color: d.ok ? "var(--pass)" : "var(--muted)" }}>{d.value}</span>
            </span>
          ))}
        </div>
      )}

      {tomorrow && (
        <div style={{ marginTop: 13, paddingTop: 13, borderTop: "1px solid var(--line)", fontSize: 13.5, color: "var(--body)", lineHeight: 1.5 }}>
          <b style={{ color: "var(--brand-2)" }}>Tomorrow.</b> {tomorrow}
        </div>
      )}
    </div>
  );
}

function Section({ label, color, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div style={{ marginBottom: 9 }}>
      <span style={{ font: "700 10.5px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: ".07em", color }}>{label}</span>
      <ul style={{ margin: "6px 0 0", paddingLeft: 16, color: "var(--body)", fontSize: 13.5, lineHeight: 1.6 }}>
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </div>
  );
}
