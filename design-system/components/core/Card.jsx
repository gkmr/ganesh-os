import React from "react";

/**
 * Ganesh OS — Card
 * The system's default surface: #111829, hairline border, large radius, soft
 * stacked shadow. Optional domain top-accent (work/health/people/growth) and
 * a hover lift + violet glow.
 */
const DOMAIN = {
  work: "var(--work)",
  health: "var(--health)",
  people: "var(--people)",
  growth: "var(--growth)",
  brand: "var(--brand)",
};

export function Card({
  children,
  accent,
  accentSide = "top",
  interactive = false,
  gradientSurface = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const c = accent ? DOMAIN[accent] || accent : null;

  const base = {
    background: gradientSurface ? "var(--grad-surface)" : "var(--surface)",
    border: "1px solid var(--line)",
    borderRadius: "var(--r-xl)",
    padding: "18px 20px",
    boxShadow: "var(--shadow-sm)",
    transition: "transform .18s var(--ease), box-shadow .18s var(--ease), border-color .18s",
  };

  if (c) {
    if (accentSide === "top") base.borderTop = `2px solid ${c}`;
    else base.borderLeft = `2px solid ${c}`;
  }

  const hoverStyle =
    interactive && hover
      ? { transform: "translateY(-4px)", boxShadow: "var(--glow)", borderColor: "var(--line-2)" }
      : {};

  return (
    <div
      style={{ ...base, ...hoverStyle, ...style }}
      onMouseEnter={interactive ? () => setHover(true) : undefined}
      onMouseLeave={interactive ? () => setHover(false) : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}

/** Mono uppercase label, optionally tinted to a domain color. */
export function CardEyebrow({ children, accent = "brand", style = {} }) {
  const c = DOMAIN[accent] || accent;
  return (
    <div
      style={{
        font: "700 11px/1 var(--font-mono)",
        textTransform: "uppercase",
        letterSpacing: ".05em",
        color: c,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Small mono "owner" pill used on life/agent cards. */
export function CardOwner({ children, style = {} }) {
  return (
    <span
      style={{
        display: "inline-block",
        font: "500 11px/1 var(--font-mono)",
        color: "var(--body)",
        background: "rgba(255,255,255,.04)",
        border: "1px solid var(--line)",
        borderRadius: "7px",
        padding: "6px 8px",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
