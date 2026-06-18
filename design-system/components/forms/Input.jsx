import React from "react";

/** Ganesh OS — Input. Dark hairline field with violet focus ring. */
export function Input({ invalid = false, prefix, style = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const box = {
    display: "flex", alignItems: "center", gap: 8,
    background: "var(--surface-2)",
    border: `1px solid ${invalid ? "var(--fail)" : focus ? "var(--brand)" : "var(--line-2)"}`,
    borderRadius: "var(--r-sm)",
    padding: "0 12px", height: 40,
    boxShadow: focus ? "0 0 0 3px var(--focus-ring)" : "none",
    transition: "border-color .15s, box-shadow .15s",
  };
  return (
    <div style={{ ...box, ...style }}>
      {prefix && <span style={{ color: "var(--faint)", fontFamily: "var(--font-mono)", fontSize: 13 }}>{prefix}</span>}
      <input
        onFocus={(e) => { setFocus(true); rest.onFocus && rest.onFocus(e); }}
        onBlur={(e) => { setFocus(false); rest.onBlur && rest.onBlur(e); }}
        {...rest}
        style={{
          flex: 1, minWidth: 0, background: "none", border: "none", outline: "none",
          color: "var(--ink)", fontFamily: "var(--font-sans)", fontSize: 14.5, height: "100%",
        }}
      />
    </div>
  );
}
