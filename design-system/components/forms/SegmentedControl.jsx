import React from "react";

/**
 * Ganesh OS — SegmentedControl. A pill row of 2-4 options; the active one gets the
 * violet gradient. Matches the landing nav/tab pill motif.
 * options: [{ value, label }] or [string]
 */
export function SegmentedControl({ options = [], value, onChange, size = "md", style = {}, ...rest }) {
  const opts = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  const pad = size === "sm" ? "6px 12px" : "8px 15px";
  const fs = size === "sm" ? 12.5 : 13.5;
  return (
    <div
      role="tablist"
      style={{
        display: "inline-flex", gap: 3, padding: 3,
        background: "var(--surface-2)", border: "1px solid var(--line)",
        borderRadius: "var(--r-pill)", ...style,
      }}
      {...rest}
    >
      {opts.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={on}
            onClick={() => onChange && onChange(o.value)}
            style={{
              border: "none", cursor: "pointer", padding: pad, fontSize: fs, fontWeight: 600,
              fontFamily: "var(--font-sans)", borderRadius: "var(--r-pill)", whiteSpace: "nowrap",
              color: on ? "#fff" : "var(--muted)",
              background: on ? "var(--grad-brand)" : "transparent",
              boxShadow: on ? "0 3px 12px rgba(139,123,255,.32)" : "none",
              transition: "color .15s, background .15s",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
