import React from "react";

/** Ganesh OS — Textarea. Multiline field matching Input. */
export function Textarea({ invalid = false, rows = 4, style = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <textarea
      rows={rows}
      onFocus={(e) => { setFocus(true); rest.onFocus && rest.onFocus(e); }}
      onBlur={(e) => { setFocus(false); rest.onBlur && rest.onBlur(e); }}
      {...rest}
      style={{
        width: "100%", resize: "vertical",
        background: "var(--surface-2)",
        border: `1px solid ${invalid ? "var(--fail)" : focus ? "var(--brand)" : "var(--line-2)"}`,
        borderRadius: "var(--r-sm)",
        padding: "10px 12px",
        color: "var(--ink)", fontFamily: "var(--font-sans)", fontSize: 14.5, lineHeight: 1.55,
        outline: "none",
        boxShadow: focus ? "0 0 0 3px var(--focus-ring)" : "none",
        transition: "border-color .15s, box-shadow .15s",
        ...style,
      }}
    />
  );
}
