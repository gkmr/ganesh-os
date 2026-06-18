import React from "react";

/**
 * Ganesh OS — DiagramFrame
 * The schematic-diagram surface from the source: near-black inset (#060a12),
 * hairline border, rounded, horizontal-scroll for wide SVGs. Put an <img> of a
 * real in-palette diagram (architecture.svg, hero.svg, system-flow) or inline
 * SVG inside it — never hand-draw new iconography here.
 */
export function DiagramFrame({ title, caption, children, style = {}, ...rest }) {
  return (
    <figure style={{ margin: 0, ...style }} {...rest}>
      <div
        style={{
          background: "#060a12",
          border: "1px solid var(--line-2)",
          borderRadius: "var(--r-xl)",
          padding: 22,
          boxShadow: "var(--shadow-lg)",
          overflowX: "auto",
        }}
      >
        {title && (
          <div style={{ font: "700 11px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: ".06em", color: "var(--muted)", marginBottom: 14 }}>
            {title}
          </div>
        )}
        <div style={{ minWidth: "min-content" }}>{children}</div>
      </div>
      {caption && (
        <figcaption style={{ fontSize: 13, color: "var(--muted)", marginTop: 12, lineHeight: 1.5 }}>{caption}</figcaption>
      )}
    </figure>
  );
}
