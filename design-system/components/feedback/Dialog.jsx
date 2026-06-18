import React from "react";

/**
 * Ganesh OS — Dialog
 * Centered modal over a blurred dark scrim. Closes on overlay click and Escape.
 * Provide your own footer actions as children. Renders nothing when !open.
 */
export function Dialog({ open, onClose, title, children, width = 460, style = {} }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape" && onClose) onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        display: "grid", placeItems: "center", padding: 24,
        background: "rgba(4,7,14,.66)", backdropFilter: "blur(6px)",
        animation: "gos-fade .18s var(--ease-out)",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: width,
          background: "var(--surface)", border: "1px solid var(--line-2)",
          borderRadius: "var(--r-2xl)", boxShadow: "var(--shadow-lg)",
          padding: "24px 26px", animation: "gos-pop .2s var(--ease-out)",
          ...style,
        }}
      >
        {title && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "var(--ink)" }}>{title}</h3>
            <button aria-label="Close" onClick={onClose} style={{ border: "none", background: "none", color: "var(--muted)", cursor: "pointer", fontSize: 17, lineHeight: 1 }}>✕</button>
          </div>
        )}
        {children}
      </div>
      <style>{"@keyframes gos-fade{from{opacity:0}}@keyframes gos-pop{from{opacity:0;transform:translateY(8px) scale(.98)}}"}</style>
    </div>
  );
}
