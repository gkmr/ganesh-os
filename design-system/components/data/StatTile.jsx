import React from "react";

/**
 * Ganesh OS — StatTile
 * A big tabular number over a muted label. The system's primary way of stating
 * load-bearing metrics (99 → 0, 27 agents, 0 cross-lane writes).
 */
export function StatTile({ value, label, size = "md", boxed = true, style = {}, ...rest }) {
  const sizes = { sm: 27, md: 30, lg: 40 };
  const inner = (
    <>
      <b
        style={{
          display: "block",
          fontSize: sizes[size],
          fontWeight: 900,
          color: "var(--ink)",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-.01em",
        }}
      >
        {value}
      </b>
      <span style={{ display: "block", fontSize: 13, color: "var(--muted)", marginTop: 8 }}>
        {label}
      </span>
    </>
  );

  if (!boxed) return <div style={style} {...rest}>{inner}</div>;

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: "var(--r-xl)",
        padding: 20,
        boxShadow: "var(--shadow-sm)",
        ...style,
      }}
      {...rest}
    >
      {inner}
    </div>
  );
}
