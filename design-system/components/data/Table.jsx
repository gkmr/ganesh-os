import React from "react";

/**
 * Ganesh OS — Table
 * Hairline-separated dark table. Pass columns (with optional align/width/render)
 * and row objects. Mono uppercase header, tabular-friendly cells, row hover.
 *
 * columns: [{ key, header, align, width, mono, render }]
 */
export function Table({ columns = [], rows = [], style = {}, ...rest }) {
  const [hover, setHover] = React.useState(-1);
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: "var(--r-lg)", overflow: "hidden", ...style }} {...rest}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)" }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={{
                textAlign: c.align || "left", width: c.width,
                padding: "9px 14px", background: "var(--surface-2)",
                font: "700 10px/1 var(--font-mono)", textTransform: "uppercase", letterSpacing: ".06em",
                color: "var(--faint)", borderBottom: "1px solid var(--line)",
              }}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)}
              style={{ background: hover === i ? "rgba(255,255,255,.03)" : "transparent", transition: "background .12s" }}>
              {columns.map((c) => (
                <td key={c.key} style={{
                  textAlign: c.align || "left",
                  padding: "11px 14px", borderBottom: "1px solid var(--line)",
                  fontSize: c.mono ? 12.5 : 13.5,
                  fontFamily: c.mono ? "var(--font-mono)" : "var(--font-sans)",
                  fontVariantNumeric: c.mono ? "tabular-nums" : "normal",
                  color: "var(--body)", verticalAlign: "middle",
                }}>{c.render ? c.render(r[c.key], r) : r[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
