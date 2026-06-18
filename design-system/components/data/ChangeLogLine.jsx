import React from "react";

/**
 * Ganesh OS — ChangeLogLine
 * One row of the audit spine: timestamp · owning agent · field it wrote · verdict.
 * The visual proof that every autonomous write is attributable. `blocked` flips it
 * to the red cross-lane / failed state.
 */
export function ChangeLogLine({
  time,
  agent,
  field,
  verdict = "OK",
  note,
  blocked = false,
  style = {},
  ...rest
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 10,
        alignItems: "center",
        padding: "9px 11px",
        borderRadius: 9,
        background: blocked ? "rgba(248,113,113,.08)" : "rgba(255,255,255,.03)",
        border: `1px solid ${blocked ? "rgba(248,113,113,.5)" : "var(--line)"}`,
        margin: "7px 0",
        fontFamily: "var(--font-mono)",
        fontSize: 12.5,
        color: blocked ? "#fecaca" : "var(--body)",
        ...style,
      }}
      {...rest}
    >
      <span>
        <span style={{ color: "var(--neon)" }}>{time}</span>
        {"  "}
        <span style={{ color: blocked ? "#fecaca" : "var(--brand)" }}>{agent}</span>
        {"  → "}
        <span style={{ color: blocked ? "#fecaca" : "var(--body)" }}>{field}</span>
        {note && <span style={{ color: "#5b6b86" }}>{"  " + note}</span>}
      </span>
      <span style={{ fontWeight: 600, color: blocked ? "var(--fail)" : "var(--pass)" }}>
        {verdict}
      </span>
    </div>
  );
}
