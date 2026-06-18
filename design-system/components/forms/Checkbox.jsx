import React from "react";

/** Ganesh OS — Checkbox. Custom dark check with violet fill when on. */
export function Checkbox({ checked, onChange, label, disabled = false, style = {}, ...rest }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 9, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, userSelect: "none", ...style }}>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} {...rest}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
      <span style={{
        width: 18, height: 18, flex: "none", borderRadius: 5,
        display: "grid", placeItems: "center",
        background: checked ? "var(--grad-brand)" : "var(--surface-2)",
        border: `1px solid ${checked ? "transparent" : "var(--line-2)"}`,
        color: "#fff", fontSize: 12, transition: "background .15s",
      }}>{checked ? "✓" : ""}</span>
      {label && <span style={{ fontSize: 14, color: "var(--body)" }}>{label}</span>}
    </label>
  );
}
