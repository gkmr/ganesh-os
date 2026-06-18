import React from "react";
import { ChannelTag } from "../content/ChannelTag.jsx";
import { Handle } from "../content/Handle.jsx";

/**
 * Ganesh OS — DigestBlock
 * One channel's digest in house style: bracket tag + one-line summary with counts
 * and "N need you", action items first (each with a handle), FYIs compressed, and
 * filtered noise on one line at the end. Mirrors samples/digest-sms.txt.
 *
 * items:  [{ handle, text, decision }]
 * fyis:   [string]
 * noise:  string (e.g. "12 promotional/social messages filtered out.")
 */
export function DigestBlock({
  channel = "gmail",
  summary,
  items = [],
  fyis = [],
  noise,
  style = {},
  ...rest
}) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: "var(--r-lg)",
        padding: "16px 18px",
        boxShadow: "var(--shadow-sm)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
        <ChannelTag channel={channel} />
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{summary}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", gap: 9, alignItems: "baseline" }}>
            <Handle id={it.handle} decision={it.decision} style={{ flex: "none" }} />
            <span style={{ fontSize: 13.5, color: "var(--body)", lineHeight: 1.5 }}>{it.text}</span>
          </div>
        ))}
      </div>

      {fyis.length > 0 && (
        <div style={{ marginTop: 13, paddingTop: 12, borderTop: "1px solid var(--line)" }}>
          <div style={{ font: "700 10.5px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: ".07em", color: "var(--faint)", marginBottom: 7 }}>
            FYI
          </div>
          <ul style={{ margin: 0, paddingLeft: 16, color: "var(--muted)", fontSize: 13, lineHeight: 1.65 }}>
            {fyis.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      )}

      {noise && (
        <div style={{ marginTop: 11, fontSize: 12, color: "var(--faint)", fontStyle: "italic" }}>
          {noise}
        </div>
      )}
    </div>
  );
}
