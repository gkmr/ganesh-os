import React from "react";

/**
 * Ganesh OS — Badge
 * Small status/eyebrow marker. "kicker" = cyan pill with optional pulse dot
 * (the hero's live indicator); "tag" = mono uppercase chip; "status" = pass/fail.
 */
export function Badge({
  children,
  variant = "kicker",
  tone = "brand",
  pulse = false,
  style = {},
  ...rest
}) {
  const tones = {
    brand: { fg: "var(--brand-2)", bg: "rgba(34,211,238,.08)", bd: "rgba(34,211,238,.25)" },
    violet: { fg: "#e7e2ff", bg: "var(--brand-soft)", bd: "var(--line-2)" },
    pass: { fg: "var(--pass)", bg: "rgba(52,211,153,.12)", bd: "rgba(52,211,153,.4)" },
    fail: { fg: "var(--fail)", bg: "rgba(248,113,113,.1)", bd: "rgba(248,113,113,.45)" },
    neutral: { fg: "var(--body)", bg: "rgba(255,255,255,.04)", bd: "var(--line)" },
  };
  const t = tones[tone] || tones.brand;

  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    color: t.fg,
    background: t.bg,
    border: `1px solid ${t.bd}`,
    whiteSpace: "nowrap",
  };

  const variants = {
    kicker: {
      fontFamily: "var(--font-sans)",
      fontSize: 12.5,
      fontWeight: 600,
      padding: "6px 13px",
      borderRadius: "var(--r-pill)",
    },
    tag: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: ".05em",
      padding: "6px 11px",
      borderRadius: "var(--r-pill)",
    },
    square: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      fontWeight: 600,
      padding: "5px 8px",
      borderRadius: "var(--r-sm)",
    },
  };

  return (
    <span style={{ ...base, ...variants[variant], ...style }} {...rest}>
      {pulse && (
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: t.fg,
            boxShadow: `0 0 10px ${t.fg}`,
            animation: "gos-pulse 1.8s infinite",
          }}
        />
      )}
      {children}
      <style>{"@keyframes gos-pulse{0%,100%{opacity:1}50%{opacity:.3}}"}</style>
    </span>
  );
}
