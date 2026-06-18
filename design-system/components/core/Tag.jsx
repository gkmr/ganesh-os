import React from "react";

/**
 * Ganesh OS — Tag
 * A small labelled chip with an optional leading domain dot and an optional
 * remove affordance. Distinct from Badge (a status marker): Tag labels or
 * categorizes content, e.g. a life-domain or list name.
 */
const DOMAIN = {
  work: "var(--work)",
  health: "var(--health)",
  people: "var(--people)",
  growth: "var(--growth)",
  brand: "var(--brand)",
};

export function Tag({
  children,
  domain,
  onRemove,
  size = "md",
  style = {},
  ...rest
}) {
  const c = domain ? DOMAIN[domain] || domain : null;
  const pad = size === "sm" ? "4px 9px" : "6px 11px";
  const fs = size === "sm" ? 11.5 : 12.5;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: pad,
        fontSize: fs,
        fontWeight: 600,
        fontFamily: "var(--font-sans)",
        color: "var(--body)",
        background: "rgba(255,255,255,.04)",
        border: "1px solid var(--line)",
        borderRadius: "var(--r-pill)",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {c && (
        <span style={{ width: 8, height: 8, borderRadius: 3, background: c, flex: "none" }} />
      )}
      {children}
      {onRemove && (
        <button
          aria-label="Remove"
          onClick={onRemove}
          style={{
            border: "none",
            background: "none",
            color: "var(--faint)",
            cursor: "pointer",
            fontSize: 13,
            lineHeight: 1,
            padding: 0,
            marginLeft: 1,
          }}
        >
          ✕
        </button>
      )}
    </span>
  );
}
