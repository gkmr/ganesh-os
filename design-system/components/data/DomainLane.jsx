import React from "react";

/**
 * Ganesh OS — DomainLane
 * The signature "four domains" row: a right-aligned name + sub-label, a flowing
 * progress track in the domain color, and a mono count. `quiet` dims a starved lane.
 */
const DOMAIN = {
  work: "var(--work)",
  health: "var(--health)",
  people: "var(--people)",
  growth: "var(--growth)",
  brand: "var(--brand)",
};

export function DomainLane({
  name,
  sub,
  domain = "work",
  count,
  quiet = false,
  flow = true,
  delay = 0,
  style = {},
  ...rest
}) {
  const c = DOMAIN[domain] || domain;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "132px 1fr 66px",
        alignItems: "center",
        gap: 14,
        margin: "13px 0",
        opacity: quiet ? 0.38 : 1,
        transition: "opacity .9s var(--ease)",
        ...style,
      }}
      {...rest}
    >
      <div style={{ fontSize: 12.5, fontWeight: 600, textAlign: "right", color: "#cdd6e8" }}>
        {name}
        {sub && (
          <small style={{ display: "block", color: "var(--faint)", fontWeight: 400, fontSize: 11 }}>
            {sub}
          </small>
        )}
      </div>
      <div
        style={{
          position: "relative",
          height: 12,
          borderRadius: "var(--r-pill)",
          background: "rgba(255,255,255,.05)",
          overflow: "hidden",
        }}
      >
        <i
          style={{
            position: "absolute",
            top: 0,
            left: "-32%",
            height: "100%",
            width: "32%",
            borderRadius: "var(--r-pill)",
            background: c,
            opacity: 0.95,
            animation: flow ? "gos-flow 3.4s linear infinite" : "none",
            animationDelay: `${delay}s`,
          }}
        />
      </div>
      <div
        style={{
          fontVariantNumeric: "tabular-nums",
          fontSize: 12,
          color: "var(--muted)",
          fontFamily: "var(--font-mono)",
        }}
      >
        {count}
      </div>
      <style>{"@keyframes gos-flow{to{left:132%}}"}</style>
    </div>
  );
}
