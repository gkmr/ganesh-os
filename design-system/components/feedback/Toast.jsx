import React from "react";

/**
 * Ganesh OS — Toast
 * A single transient notice. Tone tints the left accent + dot. Auto-dismisses after
 * `duration` ms (0 = sticky). Position it yourself (e.g. fixed bottom-right).
 */
const TONES = { info: "var(--brand)", success: "var(--pass)", warn: "var(--work)", error: "var(--fail)" };

export function Toast({ tone = "info", title, children, duration = 4000, onDismiss, style = {} }) {
  React.useEffect(() => {
    if (!duration || !onDismiss) return;
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [duration, onDismiss]);

  const c = TONES[tone] || TONES.info;
  return (
    <div
      role="status"
      style={{
        display: "flex", alignItems: "flex-start", gap: 11,
        minWidth: 280, maxWidth: 380,
        background: "var(--surface)", border: "1px solid var(--line-2)",
        borderLeft: `3px solid ${c}`, borderRadius: "var(--r-md)",
        padding: "13px 15px", boxShadow: "var(--shadow-lg)",
        fontFamily: "var(--font-sans)",
        animation: "gos-toast .24s var(--ease-out)",
        ...style,
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: c, marginTop: 6, flex: "none", boxShadow: `0 0 10px ${c}` }} />
      <div style={{ flex: 1 }}>
        {title && <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{title}</div>}
        {children && <div style={{ fontSize: 13, color: "var(--muted)", marginTop: title ? 3 : 0, lineHeight: 1.5 }}>{children}</div>}
      </div>
      {onDismiss && (
        <button aria-label="Dismiss" onClick={onDismiss} style={{ border: "none", background: "none", color: "var(--faint)", cursor: "pointer", fontSize: 14, lineHeight: 1 }}>✕</button>
      )}
      <style>{"@keyframes gos-toast{from{opacity:0;transform:translateY(10px)}}"}</style>
    </div>
  );
}
