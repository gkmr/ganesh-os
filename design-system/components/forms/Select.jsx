import React from "react";

/** Ganesh OS — Select. Native select styled to the dark field, with a chevron. */
export function Select({ invalid = false, children, style = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ position: "relative", display: "inline-flex", width: style.width || "100%" }}>
      <select
        onFocus={(e) => { setFocus(true); rest.onFocus && rest.onFocus(e); }}
        onBlur={(e) => { setFocus(false); rest.onBlur && rest.onBlur(e); }}
        {...rest}
        style={{
          appearance: "none", WebkitAppearance: "none", width: "100%",
          background: "var(--surface-2)",
          border: `1px solid ${invalid ? "var(--fail)" : focus ? "var(--brand)" : "var(--line-2)"}`,
          borderRadius: "var(--r-sm)",
          padding: "0 34px 0 12px", height: 40,
          color: "var(--ink)", fontFamily: "var(--font-sans)", fontSize: 14.5,
          outline: "none", cursor: "pointer",
          boxShadow: focus ? "0 0 0 3px var(--focus-ring)" : "none",
          transition: "border-color .15s, box-shadow .15s",
          ...style,
        }}
      >
        {children}
      </select>
      <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none", fontSize: 12 }}>▾</span>
    </div>
  );
}
