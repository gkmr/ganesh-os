import React from "react";

/**
 * Ganesh OS — ChannelTag
 * The bracket source tag that leads every outbound agent line: [gmail], [slack],
 * [imessage], [whatsapp], [voice], [intake]. Mono, lowercase, per-channel tint.
 */
const CHANNELS = {
  gmail: "var(--brand-2)",
  email: "var(--brand-2)",
  slack: "var(--growth)",
  imessage: "var(--health)",
  sms: "var(--health)",
  whatsapp: "var(--pass)",
  voice: "var(--people)",
  intake: "var(--work)",
};

export function ChannelTag({ channel = "imessage", style = {}, ...rest }) {
  const key = String(channel).toLowerCase();
  const c = CHANNELS[key] || "var(--muted)";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-mono)",
        fontSize: 11.5,
        fontWeight: 600,
        color: c,
        background: "rgba(255,255,255,.03)",
        border: "1px solid var(--line)",
        borderRadius: "var(--r-sm)",
        padding: "3px 7px",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      [{key}]
    </span>
  );
}
