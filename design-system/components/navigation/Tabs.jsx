import React from "react";

/**
 * Ganesh OS — Tabs
 * Controlled tab strip in the brand pill style (active tab = violet gradient).
 * Renders only the strip; you render the active panel. Matches the landing nav.
 *
 * tabs: [{ value, label }] or [string]
 */
export function Tabs({ tabs = [], value, onChange, style = {}, ...rest }) {
  const items = tabs.map((t) => (typeof t === "string" ? { value: t, label: t } : t));
  return (
    <div role="tablist" style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--line)", ...style }} {...rest}>
      {items.map((t) => {
        const on = t.value === value;
        return (
          <button
            key={t.value}
            role="tab"
            aria-selected={on}
            onClick={() => onChange && onChange(t.value)}
            style={{
              border: "none", background: "none", cursor: "pointer",
              padding: "10px 14px", marginBottom: -1, fontSize: 13.5, fontWeight: 600,
              fontFamily: "var(--font-sans)", whiteSpace: "nowrap",
              color: on ? "var(--ink)" : "var(--muted)",
              borderBottom: `2px solid ${on ? "var(--brand)" : "transparent"}`,
              transition: "color .15s, border-color .15s",
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
