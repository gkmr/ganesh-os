import React from "react";

/**
 * Ganesh OS — Tooltip
 * Hover/focus tooltip: a small dark glassy bubble above (or below) the trigger.
 * Wraps a single child trigger.
 */
export function Tooltip({ content, side = "top", children, style = {} }) {
  const [open, setOpen] = React.useState(false);
  const pos = side === "bottom"
    ? { top: "calc(100% + 8px)" }
    : { bottom: "calc(100% + 8px)" };
  return (
    <span
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && content && (
        <span
          role="tooltip"
          style={{
            position: "absolute", left: "50%", transform: "translateX(-50%)", ...pos,
            zIndex: 50, whiteSpace: "nowrap", pointerEvents: "none",
            background: "rgba(13,19,34,.96)", backdropFilter: "blur(8px)",
            border: "1px solid var(--line-2)", borderRadius: "var(--r-sm)",
            padding: "7px 10px", fontSize: 12, color: "var(--body)",
            fontFamily: "var(--font-sans)", boxShadow: "var(--shadow-sm)",
            ...style,
          }}
        >
          {content}
        </span>
      )}
    </span>
  );
}
