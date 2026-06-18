import React from "react";

/**
 * Ganesh OS — CodeBlock
 * The recurring "neon terminal" surface: near-black body, macOS traffic-light
 * bar, mono type. Pass pre-formatted children (with <span> syntax spans) or a
 * plain string. Helper span components export the brand's syntax colors.
 */
export function CodeBlock({ title, children, style = {}, ...rest }) {
  return (
    <div
      style={{
        background: "#060a12",
        border: "1px solid var(--line-2)",
        borderRadius: 13,
        overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
        fontFamily: "var(--font-mono)",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "9px 13px",
          background: "rgba(255,255,255,.03)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f56" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ffbd2e" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#27c93f" }} />
        {title && (
          <span style={{ marginLeft: 8, fontSize: 11.5, color: "var(--muted)" }}>{title}</span>
        )}
      </div>
      <pre
        style={{
          margin: 0,
          padding: "15px 16px",
          fontSize: 12.7,
          lineHeight: 1.65,
          color: "#d7e0ee",
          overflowX: "auto",
        }}
      >
        {children}
      </pre>
    </div>
  );
}

/* Syntax color spans — match the brand's neon palette. */
export const Cg = ({ children }) => <span style={{ color: "var(--neon)" }}>{children}</span>;     // green / strings, ok
export const Cc = ({ children }) => <span style={{ color: "#5b6b86" }}>{children}</span>;          // comment
export const Ck = ({ children }) => <span style={{ color: "#c4a6ff" }}>{children}</span>;          // keyword
export const Cs = ({ children }) => <span style={{ color: "#7fd1ff" }}>{children}</span>;          // string
export const Cr = ({ children }) => <span style={{ color: "var(--fail)" }}>{children}</span>;      // error
export const Cy = ({ children }) => <span style={{ color: "var(--work)" }}>{children}</span>;      // warn
