import React from "react";

/**
 * Ganesh OS — DayPlan
 * The morning plan: one MIT (most important thing), the top-3 built one-slot-per-
 * domain (cross-domain ranking), and the tiered backlog budget (today/week/later/
 * prune). Mirrors samples/morning-brief.md. Caps the visible today-load.
 *
 * top: [{ domain, text }]   tiers: { today, week, later, prune }
 */
const DOMAIN = { work: "var(--work)", health: "var(--health)", people: "var(--people)", growth: "var(--growth)" };
const LABEL = { work: "Work", health: "Health", people: "People", growth: "Growth" };

export function DayPlan({ date = "Tue · 7:42", mit, top = [], tiers = {}, style = {}, ...rest }) {
  return (
    <div
      style={{
        background: "var(--grad-surface)",
        border: "1px solid var(--line)",
        borderRadius: "var(--r-xl)",
        padding: "20px 22px",
        boxShadow: "var(--shadow-lg)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <span style={{ font: "700 11px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: ".07em", color: "var(--brand-2)" }}>
          Morning brief
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>{date}</span>
      </div>

      {mit && (
        <div style={{ marginBottom: 16, padding: "13px 15px", borderRadius: "var(--r-md)", background: "var(--brand-soft)", border: "1px solid var(--line-2)" }}>
          <div style={{ font: "700 10.5px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: ".08em", color: "var(--brand)", marginBottom: 6 }}>
            🗓 MIT · the one thing
          </div>
          <div style={{ fontSize: 15, color: "var(--ink)", fontWeight: 600, lineHeight: 1.4 }}>{mit}</div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {top.map((t, i) => (
          <div key={i} style={{ display: "flex", gap: 11, alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--faint)", width: 14 }}>{i + 1}</span>
            <span style={{ width: 9, height: 9, borderRadius: 3, flex: "none", background: DOMAIN[t.domain] || "var(--brand)" }} />
            <span style={{ width: 54, flex: "none", font: "600 10.5px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: ".05em", color: DOMAIN[t.domain] || "var(--brand)" }}>
              {LABEL[t.domain] || t.domain}
            </span>
            <span style={{ fontSize: 13.5, color: "var(--body)", lineHeight: 1.4 }}>{t.text}</span>
          </div>
        ))}
      </div>

      {(tiers.today != null) && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
          {[["today", tiers.today, "var(--pass)"], ["this week", tiers.week, "var(--brand-2)"], ["later", tiers.later, "var(--muted)"], ["to prune", tiers.prune, "var(--fail)"]].map(([k, v, c]) => (
            <span key={k} style={{ display: "inline-flex", alignItems: "baseline", gap: 6, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)", background: "rgba(255,255,255,.03)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", padding: "5px 9px" }}>
              <b style={{ color: c, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{v}</b> {k}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
