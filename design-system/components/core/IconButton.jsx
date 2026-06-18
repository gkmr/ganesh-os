import React from "react";

/**
 * Ganesh OS — IconButton
 * Square/round icon-only control for toolbars and message rows. Takes a glyph
 * (unicode char or text) as children. Ghost by default; solid violet for primary.
 */
export function IconButton({
  children,
  variant = "ghost",
  size = "md",
  round = false,
  label,
  disabled = false,
  style = {},
  ...rest
}) {
  const dims = { sm: 30, md: 36, lg: 44 };
  const d = dims[size];
  const [hover, setHover] = React.useState(false);

  const variants = {
    ghost: { background: "transparent", color: "var(--muted)", border: "1px solid var(--line)" },
    solid: { background: "var(--grad-brand)", color: "#fff", border: "none" },
    soft: { background: "var(--brand-soft)", color: "#e7e2ff", border: "1px solid var(--line-2)" },
  };

  const hoverStyle =
    hover && !disabled
      ? variant === "solid"
        ? { boxShadow: "var(--glow)", transform: "translateY(-1px)" }
        : { color: "var(--ink)", borderColor: "var(--line-2)", background: "rgba(255,255,255,.05)" }
      : {};

  return (
    <button
      aria-label={label}
      title={label}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: d,
        height: d,
        display: "inline-grid",
        placeItems: "center",
        padding: 0,
        borderRadius: round ? "50%" : "var(--r-md)",
        fontSize: size === "lg" ? 18 : 15,
        lineHeight: 1,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        fontFamily: "var(--font-sans)",
        transition: "color .15s, background .15s, box-shadow .15s, transform .15s, border-color .15s",
        ...variants[variant],
        ...hoverStyle,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
