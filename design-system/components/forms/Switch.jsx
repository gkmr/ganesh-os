import React from "react";

/** Ganesh OS — Switch. Pill toggle; violet track when on. */
export function Switch({ checked, onChange, label, disabled = false, style = {}, ...rest }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, userSelect: "none", ...style }}>
      <input type="checkbox" role="switch" checked={checked} onChange={onChange} disabled={disabled} {...rest}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
      <span style={{
        width: 38, height: 22, flex: "none", borderRadius: 999, position: "relative",
        background: checked ? "var(--grad-brand)" : "var(--raise)",
        border: `1px solid ${checked ? "transparent" : "var(--line-2)"}`,
        transition: "background .2s",
      }}>
        <span style={{
          position: "absolute", top: 2, left: checked ? 18 : 2,
          width: 16, height: 16, borderRadius: "50%", background: "#fff",
          transition: "left .2s var(--ease)", boxShadow: "0 1px 3px rgba(0,0,0,.5)",
        }} />
      </span>
      {label && <span style={{ fontSize: 14, color: "var(--body)" }}>{label}</span>}
    </label>
  );
}
