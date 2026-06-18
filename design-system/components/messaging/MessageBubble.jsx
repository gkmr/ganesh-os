import React from "react";

/**
 * Ganesh OS — MessageBubble
 * A plain iMessage/SMS bubble. `from="them"` (incoming, dark surface, left) or
 * `from="me"` (outgoing, violet gradient, right). Optional lead status emoji and
 * a timestamp. Plain text only, per the house format contract.
 */
export function MessageBubble({
  children,
  from = "them",
  emoji,
  time,
  style = {},
  ...rest
}) {
  const me = from === "me";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: me ? "flex-end" : "flex-start",
        gap: 4,
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          maxWidth: "78%",
          padding: "10px 14px",
          borderRadius: 18,
          borderBottomRightRadius: me ? 5 : 18,
          borderBottomLeftRadius: me ? 18 : 5,
          background: me ? "var(--grad-brand)" : "var(--raise)",
          color: me ? "#fff" : "var(--body)",
          border: me ? "none" : "1px solid var(--line)",
          fontSize: 14.5,
          lineHeight: 1.45,
          fontFamily: "var(--font-sans)",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {emoji && <span style={{ marginRight: 6 }}>{emoji}</span>}
        {children}
      </div>
      {time && (
        <span style={{ fontSize: 10.5, color: "var(--faint)", fontFamily: "var(--font-mono)", padding: "0 4px" }}>
          {time}
        </span>
      )}
    </div>
  );
}
