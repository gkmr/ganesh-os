import React from "react";

/**
 * Ganesh OS — Handle
 * The stable namespaced item handle (W#, M#, K#, V#, E#, I#, P#, PR#, J#) that
 * makes a surfaced item repliable and links it to the daily manifest. Mono pill,
 * tinted by namespace. Optionally renders a trailing decision verb.
 */
const NS = {
  W: "var(--brand-2)",   // chat A
  M: "var(--brand-2)",   // chat B
  K: "var(--brand-2)",   // chat C
  V: "var(--people)",    // voice
  E: "var(--health)",    // email
  I: "var(--work)",      // intake / opportunity
  P: "var(--growth)",    // day-plan
  PR: "var(--fail)",     // prune-confirmation
  J: "var(--work)",      // job-role
};

export function Handle({ id = "M51", decision, style = {}, ...rest }) {
  const ns = (String(id).match(/^[A-Z]+/) || ["M"])[0];
  const c = NS[ns] || "var(--brand)";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, ...style }} {...rest}>
      <code
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          fontWeight: 700,
          color: c,
          background: "rgba(255,255,255,.04)",
          border: `1px solid ${c}`,
          borderRadius: "var(--r-sm)",
          padding: "2px 7px",
          letterSpacing: ".02em",
        }}
      >
        {id}
      </code>
      {decision && (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>
          {decision}
        </span>
      )}
    </span>
  );
}
