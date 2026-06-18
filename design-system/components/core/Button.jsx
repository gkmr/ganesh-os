import React from "react";

/**
 * Ganesh OS — Button
 * Pill-shaped action. Primary = violet gradient with glow-on-hover;
 * ghost = transparent with hairline border.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  as = "button",
  disabled = false,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: "8px 14px", fontSize: 13 },
    md: { padding: "10px 17px", fontSize: 14 },
    lg: { padding: "13px 22px", fontSize: 15 },
  };

  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    border: "none",
    borderRadius: "var(--r-pill)",
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    lineHeight: 1,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "transform .15s var(--ease), box-shadow .15s var(--ease), background .15s",
    ...sizes[size],
  };

  const variants = {
    primary: {
      background: "var(--grad-brand)",
      color: "#fff",
    },
    ghost: {
      background: "transparent",
      color: "var(--ink)",
      border: "1px solid var(--line-2)",
    },
    soft: {
      background: "var(--brand-soft)",
      color: "#e7e2ff",
      border: "1px solid var(--line-2)",
    },
  };

  const Comp = as;
  const [hover, setHover] = React.useState(false);
  const hoverStyle =
    hover && !disabled
      ? variant === "primary"
        ? { transform: "translateY(-1px)", boxShadow: "var(--glow)" }
        : { transform: "translateY(-1px)", borderColor: "var(--brand)", background: "rgba(255,255,255,.05)" }
      : {};

  return (
    <Comp
      style={{ ...base, ...variants[variant], ...hoverStyle, ...style }}
      disabled={as === "button" ? disabled : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {children}
    </Comp>
  );
}
