/* @ds-bundle: {"format":3,"namespace":"GaneshOSDesignSystem_462320","components":[{"name":"ChannelTag","sourcePath":"components/content/ChannelTag.jsx"},{"name":"Handle","sourcePath":"components/content/Handle.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"CardEyebrow","sourcePath":"components/core/Card.jsx"},{"name":"CardOwner","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"ChangeLogLine","sourcePath":"components/data/ChangeLogLine.jsx"},{"name":"CodeBlock","sourcePath":"components/data/CodeBlock.jsx"},{"name":"Cg","sourcePath":"components/data/CodeBlock.jsx"},{"name":"Cc","sourcePath":"components/data/CodeBlock.jsx"},{"name":"Ck","sourcePath":"components/data/CodeBlock.jsx"},{"name":"Cs","sourcePath":"components/data/CodeBlock.jsx"},{"name":"Cr","sourcePath":"components/data/CodeBlock.jsx"},{"name":"Cy","sourcePath":"components/data/CodeBlock.jsx"},{"name":"DomainLane","sourcePath":"components/data/DomainLane.jsx"},{"name":"StatTile","sourcePath":"components/data/StatTile.jsx"},{"name":"Table","sourcePath":"components/data/Table.jsx"},{"name":"DiagramFrame","sourcePath":"components/diagrams/DiagramFrame.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"DayPlan","sourcePath":"components/messaging/DayPlan.jsx"},{"name":"DecisionCanvas","sourcePath":"components/messaging/DecisionCanvas.jsx"},{"name":"DigestBlock","sourcePath":"components/messaging/DigestBlock.jsx"},{"name":"DomainScorecard","sourcePath":"components/messaging/DomainScorecard.jsx"},{"name":"MessageBubble","sourcePath":"components/messaging/MessageBubble.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/content/ChannelTag.jsx":"9a1ba9a3b78d","components/content/Handle.jsx":"1395b9bffeea","components/core/Badge.jsx":"e164e9b439e5","components/core/Button.jsx":"6d0b364b0d9e","components/core/Card.jsx":"d6c8f0fc4354","components/core/IconButton.jsx":"1316e4161b46","components/core/Tag.jsx":"a519b6d132db","components/data/ChangeLogLine.jsx":"f5472b062cb0","components/data/CodeBlock.jsx":"20375a398a8f","components/data/DomainLane.jsx":"cc4469b72ea2","components/data/StatTile.jsx":"db2bb5a0cde8","components/data/Table.jsx":"93c32f9a892a","components/diagrams/DiagramFrame.jsx":"8321d472e45a","components/feedback/Dialog.jsx":"6b7f57e21f2e","components/feedback/Toast.jsx":"0b374361d5cd","components/feedback/Tooltip.jsx":"bec200ee0bf6","components/forms/Checkbox.jsx":"115cc226c7a7","components/forms/Input.jsx":"5e24c1115e8c","components/forms/SegmentedControl.jsx":"5275c1809588","components/forms/Select.jsx":"a39670a96e94","components/forms/Switch.jsx":"2960affcbd1f","components/forms/Textarea.jsx":"f51060482188","components/messaging/DayPlan.jsx":"d0828743b658","components/messaging/DecisionCanvas.jsx":"63d9b98f20f8","components/messaging/DigestBlock.jsx":"8be999cfd409","components/messaging/DomainScorecard.jsx":"a7d8aecfb0a4","components/messaging/MessageBubble.jsx":"551547e28c19","components/navigation/Tabs.jsx":"5b7c38b31bda","ui_kits/digest/OneDay.jsx":"93d0069e3d0d","ui_kits/docs/DocsApp.jsx":"f272cdcb9961","ui_kits/landing/Hero.jsx":"59470bd9bf90","ui_kits/landing/Nav.jsx":"9e45fecf06f5","ui_kits/landing/Sections.jsx":"e6e8ebd90da1","ui_kits/operator/DecisionQueue.jsx":"5ebff3a93d71","ui_kits/operator/OpBar.jsx":"8a23e41dcb20","ui_kits/operator/Panels.jsx":"321d3c93157c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GaneshOSDesignSystem_462320 = window.GaneshOSDesignSystem_462320 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/ChannelTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  intake: "var(--work)"
};
function ChannelTag({
  channel = "imessage",
  style = {},
  ...rest
}) {
  const key = String(channel).toLowerCase();
  const c = CHANNELS[key] || "var(--muted)";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), "[", key, "]");
}
Object.assign(__ds_scope, { ChannelTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ChannelTag.jsx", error: String((e && e.message) || e) }); }

// components/content/Handle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ganesh OS — Handle
 * The stable namespaced item handle (W#, M#, K#, V#, E#, I#, P#, PR#, J#) that
 * makes a surfaced item repliable and links it to the daily manifest. Mono pill,
 * tinted by namespace. Optionally renders a trailing decision verb.
 */
const NS = {
  W: "var(--brand-2)",
  // chat A
  M: "var(--brand-2)",
  // chat B
  K: "var(--brand-2)",
  // chat C
  V: "var(--people)",
  // voice
  E: "var(--health)",
  // email
  I: "var(--work)",
  // intake / opportunity
  P: "var(--growth)",
  // day-plan
  PR: "var(--fail)",
  // prune-confirmation
  J: "var(--work)" // job-role
};
function Handle({
  id = "M51",
  decision,
  style = {},
  ...rest
}) {
  const ns = (String(id).match(/^[A-Z]+/) || ["M"])[0];
  const c = NS[ns] || "var(--brand)";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("code", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      fontWeight: 700,
      color: c,
      background: "rgba(255,255,255,.04)",
      border: `1px solid ${c}`,
      borderRadius: "var(--r-sm)",
      padding: "2px 7px",
      letterSpacing: ".02em"
    }
  }, id), decision && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "var(--muted)"
    }
  }, decision));
}
Object.assign(__ds_scope, { Handle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Handle.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ganesh OS — Badge
 * Small status/eyebrow marker. "kicker" = cyan pill with optional pulse dot
 * (the hero's live indicator); "tag" = mono uppercase chip; "status" = pass/fail.
 */
function Badge({
  children,
  variant = "kicker",
  tone = "brand",
  pulse = false,
  style = {},
  ...rest
}) {
  const tones = {
    brand: {
      fg: "var(--brand-2)",
      bg: "rgba(34,211,238,.08)",
      bd: "rgba(34,211,238,.25)"
    },
    violet: {
      fg: "#e7e2ff",
      bg: "var(--brand-soft)",
      bd: "var(--line-2)"
    },
    pass: {
      fg: "var(--pass)",
      bg: "rgba(52,211,153,.12)",
      bd: "rgba(52,211,153,.4)"
    },
    fail: {
      fg: "var(--fail)",
      bg: "rgba(248,113,113,.1)",
      bd: "rgba(248,113,113,.45)"
    },
    neutral: {
      fg: "var(--body)",
      bg: "rgba(255,255,255,.04)",
      bd: "var(--line)"
    }
  };
  const t = tones[tone] || tones.brand;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    color: t.fg,
    background: t.bg,
    border: `1px solid ${t.bd}`,
    whiteSpace: "nowrap"
  };
  const variants = {
    kicker: {
      fontFamily: "var(--font-sans)",
      fontSize: 12.5,
      fontWeight: 600,
      padding: "6px 13px",
      borderRadius: "var(--r-pill)"
    },
    tag: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: ".05em",
      padding: "6px 11px",
      borderRadius: "var(--r-pill)"
    },
    square: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      fontWeight: 600,
      padding: "5px 8px",
      borderRadius: "var(--r-sm)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, rest), pulse && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: t.fg,
      boxShadow: `0 0 10px ${t.fg}`,
      animation: "gos-pulse 1.8s infinite"
    }
  }), children, /*#__PURE__*/React.createElement("style", null, "@keyframes gos-pulse{0%,100%{opacity:1}50%{opacity:.3}}"));
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ganesh OS — Button
 * Pill-shaped action. Primary = violet gradient with glow-on-hover;
 * ghost = transparent with hairline border.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  as = "button",
  disabled = false,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "8px 14px",
      fontSize: 13
    },
    md: {
      padding: "10px 17px",
      fontSize: 14
    },
    lg: {
      padding: "13px 22px",
      fontSize: 15
    }
  };
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    border: "none",
    borderRadius: "var(--r-pill)",
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    lineHeight: 1,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "transform .15s var(--ease), box-shadow .15s var(--ease), background .15s",
    ...sizes[size]
  };
  const variants = {
    primary: {
      background: "var(--grad-brand)",
      color: "#fff"
    },
    ghost: {
      background: "transparent",
      color: "var(--ink)",
      border: "1px solid var(--line-2)"
    },
    soft: {
      background: "var(--brand-soft)",
      color: "#e7e2ff",
      border: "1px solid var(--line-2)"
    }
  };
  const Comp = as;
  const [hover, setHover] = React.useState(false);
  const hoverStyle = hover && !disabled ? variant === "primary" ? {
    transform: "translateY(-1px)",
    boxShadow: "var(--glow)"
  } : {
    transform: "translateY(-1px)",
    borderColor: "var(--brand)",
    background: "rgba(255,255,255,.05)"
  } : {};
  return /*#__PURE__*/React.createElement(Comp, _extends({
    style: {
      ...base,
      ...variants[variant],
      ...hoverStyle,
      ...style
    },
    disabled: as === "button" ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ganesh OS — Card
 * The system's default surface: #111829, hairline border, large radius, soft
 * stacked shadow. Optional domain top-accent (work/health/people/growth) and
 * a hover lift + violet glow.
 */
const DOMAIN = {
  work: "var(--work)",
  health: "var(--health)",
  people: "var(--people)",
  growth: "var(--growth)",
  brand: "var(--brand)"
};
function Card({
  children,
  accent,
  accentSide = "top",
  interactive = false,
  gradientSurface = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const c = accent ? DOMAIN[accent] || accent : null;
  const base = {
    background: gradientSurface ? "var(--grad-surface)" : "var(--surface)",
    border: "1px solid var(--line)",
    borderRadius: "var(--r-xl)",
    padding: "18px 20px",
    boxShadow: "var(--shadow-sm)",
    transition: "transform .18s var(--ease), box-shadow .18s var(--ease), border-color .18s"
  };
  if (c) {
    if (accentSide === "top") base.borderTop = `2px solid ${c}`;else base.borderLeft = `2px solid ${c}`;
  }
  const hoverStyle = interactive && hover ? {
    transform: "translateY(-4px)",
    boxShadow: "var(--glow)",
    borderColor: "var(--line-2)"
  } : {};
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...base,
      ...hoverStyle,
      ...style
    },
    onMouseEnter: interactive ? () => setHover(true) : undefined,
    onMouseLeave: interactive ? () => setHover(false) : undefined
  }, rest), children);
}

/** Mono uppercase label, optionally tinted to a domain color. */
function CardEyebrow({
  children,
  accent = "brand",
  style = {}
}) {
  const c = DOMAIN[accent] || accent;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 11px/1 var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: ".05em",
      color: c,
      ...style
    }
  }, children);
}

/** Small mono "owner" pill used on life/agent cards. */
function CardOwner({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      font: "500 11px/1 var(--font-mono)",
      color: "var(--body)",
      background: "rgba(255,255,255,.04)",
      border: "1px solid var(--line)",
      borderRadius: "7px",
      padding: "6px 8px",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card, CardEyebrow, CardOwner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ganesh OS — IconButton
 * Square/round icon-only control for toolbars and message rows. Takes a glyph
 * (unicode char or text) as children. Ghost by default; solid violet for primary.
 */
function IconButton({
  children,
  variant = "ghost",
  size = "md",
  round = false,
  label,
  disabled = false,
  style = {},
  ...rest
}) {
  const dims = {
    sm: 30,
    md: 36,
    lg: 44
  };
  const d = dims[size];
  const [hover, setHover] = React.useState(false);
  const variants = {
    ghost: {
      background: "transparent",
      color: "var(--muted)",
      border: "1px solid var(--line)"
    },
    solid: {
      background: "var(--grad-brand)",
      color: "#fff",
      border: "none"
    },
    soft: {
      background: "var(--brand-soft)",
      color: "#e7e2ff",
      border: "1px solid var(--line-2)"
    }
  };
  const hoverStyle = hover && !disabled ? variant === "solid" ? {
    boxShadow: "var(--glow)",
    transform: "translateY(-1px)"
  } : {
    color: "var(--ink)",
    borderColor: "var(--line-2)",
    background: "rgba(255,255,255,.05)"
  } : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
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
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ganesh OS — Tag
 * A small labelled chip with an optional leading domain dot and an optional
 * remove affordance. Distinct from Badge (a status marker): Tag labels or
 * categorizes content, e.g. a life-domain or list name.
 */
const DOMAIN = {
  work: "var(--work)",
  health: "var(--health)",
  people: "var(--people)",
  growth: "var(--growth)",
  brand: "var(--brand)"
};
function Tag({
  children,
  domain,
  onRemove,
  size = "md",
  style = {},
  ...rest
}) {
  const c = domain ? DOMAIN[domain] || domain : null;
  const pad = size === "sm" ? "4px 9px" : "6px 11px";
  const fs = size === "sm" ? 11.5 : 12.5;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      padding: pad,
      fontSize: fs,
      fontWeight: 600,
      fontFamily: "var(--font-sans)",
      color: "var(--body)",
      background: "rgba(255,255,255,.04)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-pill)",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), c && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 3,
      background: c,
      flex: "none"
    }
  }), children, onRemove && /*#__PURE__*/React.createElement("button", {
    "aria-label": "Remove",
    onClick: onRemove,
    style: {
      border: "none",
      background: "none",
      color: "var(--faint)",
      cursor: "pointer",
      fontSize: 13,
      lineHeight: 1,
      padding: 0,
      marginLeft: 1
    }
  }, "\u2715"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/ChangeLogLine.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ganesh OS — ChangeLogLine
 * One row of the audit spine: timestamp · owning agent · field it wrote · verdict.
 * The visual proof that every autonomous write is attributable. `blocked` flips it
 * to the red cross-lane / failed state.
 */
function ChangeLogLine({
  time,
  agent,
  field,
  verdict = "OK",
  note,
  blocked = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: 10,
      alignItems: "center",
      padding: "9px 11px",
      borderRadius: 9,
      background: blocked ? "rgba(248,113,113,.08)" : "rgba(255,255,255,.03)",
      border: `1px solid ${blocked ? "rgba(248,113,113,.5)" : "var(--line)"}`,
      margin: "7px 0",
      fontFamily: "var(--font-mono)",
      fontSize: 12.5,
      color: blocked ? "#fecaca" : "var(--body)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--neon)"
    }
  }, time), "  ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: blocked ? "#fecaca" : "var(--brand)"
    }
  }, agent), "  → ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: blocked ? "#fecaca" : "var(--body)"
    }
  }, field), note && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#5b6b86"
    }
  }, "  " + note)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: blocked ? "var(--fail)" : "var(--pass)"
    }
  }, verdict));
}
Object.assign(__ds_scope, { ChangeLogLine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ChangeLogLine.jsx", error: String((e && e.message) || e) }); }

// components/data/CodeBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ganesh OS — CodeBlock
 * The recurring "neon terminal" surface: near-black body, macOS traffic-light
 * bar, mono type. Pass pre-formatted children (with <span> syntax spans) or a
 * plain string. Helper span components export the brand's syntax colors.
 */
function CodeBlock({
  title,
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "#060a12",
      border: "1px solid var(--line-2)",
      borderRadius: 13,
      overflow: "hidden",
      boxShadow: "var(--shadow-sm)",
      fontFamily: "var(--font-mono)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      padding: "9px 13px",
      background: "rgba(255,255,255,.03)",
      borderBottom: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "#ff5f56"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "#ffbd2e"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "#27c93f"
    }
  }), title && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8,
      fontSize: 11.5,
      color: "var(--muted)"
    }
  }, title)), /*#__PURE__*/React.createElement("pre", {
    style: {
      margin: 0,
      padding: "15px 16px",
      fontSize: 12.7,
      lineHeight: 1.65,
      color: "#d7e0ee",
      overflowX: "auto"
    }
  }, children));
}

/* Syntax color spans — match the brand's neon palette. */
const Cg = ({
  children
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    color: "var(--neon)"
  }
}, children); // green / strings, ok
const Cc = ({
  children
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    color: "#5b6b86"
  }
}, children); // comment
const Ck = ({
  children
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    color: "#c4a6ff"
  }
}, children); // keyword
const Cs = ({
  children
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    color: "#7fd1ff"
  }
}, children); // string
const Cr = ({
  children
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    color: "var(--fail)"
  }
}, children); // error
const Cy = ({
  children
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    color: "var(--work)"
  }
}, children); // warn
Object.assign(__ds_scope, { CodeBlock, Cg, Cc, Ck, Cs, Cr, Cy });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/CodeBlock.jsx", error: String((e && e.message) || e) }); }

// components/data/DomainLane.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  brand: "var(--brand)"
};
function DomainLane({
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
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "grid",
      gridTemplateColumns: "132px 1fr 66px",
      alignItems: "center",
      gap: 14,
      margin: "13px 0",
      opacity: quiet ? 0.38 : 1,
      transition: "opacity .9s var(--ease)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      textAlign: "right",
      color: "#cdd6e8"
    }
  }, name, sub && /*#__PURE__*/React.createElement("small", {
    style: {
      display: "block",
      color: "var(--faint)",
      fontWeight: 400,
      fontSize: 11
    }
  }, sub)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 12,
      borderRadius: "var(--r-pill)",
      background: "rgba(255,255,255,.05)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      position: "absolute",
      top: 0,
      left: "-32%",
      height: "100%",
      width: "32%",
      borderRadius: "var(--r-pill)",
      background: c,
      opacity: 0.95,
      animation: flow ? "gos-flow 3.4s linear infinite" : "none",
      animationDelay: `${delay}s`
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontVariantNumeric: "tabular-nums",
      fontSize: 12,
      color: "var(--muted)",
      fontFamily: "var(--font-mono)"
    }
  }, count), /*#__PURE__*/React.createElement("style", null, "@keyframes gos-flow{to{left:132%}}"));
}
Object.assign(__ds_scope, { DomainLane });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DomainLane.jsx", error: String((e && e.message) || e) }); }

// components/data/StatTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ganesh OS — StatTile
 * A big tabular number over a muted label. The system's primary way of stating
 * load-bearing metrics (99 → 0, 27 agents, 0 cross-lane writes).
 */
function StatTile({
  value,
  label,
  size = "md",
  boxed = true,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: 27,
    md: 30,
    lg: 40
  };
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", {
    style: {
      display: "block",
      fontSize: sizes[size],
      fontWeight: 900,
      color: "var(--ink)",
      lineHeight: 1,
      fontVariantNumeric: "tabular-nums",
      letterSpacing: "-.01em"
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 13,
      color: "var(--muted)",
      marginTop: 8
    }
  }, label));
  if (!boxed) return /*#__PURE__*/React.createElement("div", _extends({
    style: style
  }, rest), inner);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-xl)",
      padding: 20,
      boxShadow: "var(--shadow-sm)",
      ...style
    }
  }, rest), inner);
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/data/Table.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ganesh OS — Table
 * Hairline-separated dark table. Pass columns (with optional align/width/render)
 * and row objects. Mono uppercase header, tabular-friendly cells, row hover.
 *
 * columns: [{ key, header, align, width, mono, render }]
 */
function Table({
  columns = [],
  rows = [],
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(-1);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      border: "1px solid var(--line)",
      borderRadius: "var(--r-lg)",
      overflow: "hidden",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align || "left",
      width: c.width,
      padding: "9px 14px",
      background: "var(--surface-2)",
      font: "700 10px/1 var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: ".06em",
      color: "var(--faint)",
      borderBottom: "1px solid var(--line)"
    }
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(-1),
    style: {
      background: hover === i ? "rgba(255,255,255,.03)" : "transparent",
      transition: "background .12s"
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      textAlign: c.align || "left",
      padding: "11px 14px",
      borderBottom: "1px solid var(--line)",
      fontSize: c.mono ? 12.5 : 13.5,
      fontFamily: c.mono ? "var(--font-mono)" : "var(--font-sans)",
      fontVariantNumeric: c.mono ? "tabular-nums" : "normal",
      color: "var(--body)",
      verticalAlign: "middle"
    }
  }, c.render ? c.render(r[c.key], r) : r[c.key])))))));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Table.jsx", error: String((e && e.message) || e) }); }

// components/diagrams/DiagramFrame.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ganesh OS — DiagramFrame
 * The schematic-diagram surface from the source: near-black inset (#060a12),
 * hairline border, rounded, horizontal-scroll for wide SVGs. Put an <img> of a
 * real in-palette diagram (architecture.svg, hero.svg, system-flow) or inline
 * SVG inside it — never hand-draw new iconography here.
 */
function DiagramFrame({
  title,
  caption,
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", _extends({
    style: {
      margin: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#060a12",
      border: "1px solid var(--line-2)",
      borderRadius: "var(--r-xl)",
      padding: 22,
      boxShadow: "var(--shadow-lg)",
      overflowX: "auto"
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 11px/1 var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: ".06em",
      color: "var(--muted)",
      marginBottom: 14
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: "min-content"
    }
  }, children)), caption && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      fontSize: 13,
      color: "var(--muted)",
      marginTop: 12,
      lineHeight: 1.5
    }
  }, caption));
}
Object.assign(__ds_scope, { DiagramFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/diagrams/DiagramFrame.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
/**
 * Ganesh OS — Dialog
 * Centered modal over a blurred dark scrim. Closes on overlay click and Escape.
 * Provide your own footer actions as children. Renders nothing when !open.
 */
function Dialog({
  open,
  onClose,
  title,
  children,
  width = 460,
  style = {}
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === "Escape" && onClose) onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 100,
      display: "grid",
      placeItems: "center",
      padding: 24,
      background: "rgba(4,7,14,.66)",
      backdropFilter: "blur(6px)",
      animation: "gos-fade .18s var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": typeof title === "string" ? title : undefined,
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: width,
      background: "var(--surface)",
      border: "1px solid var(--line-2)",
      borderRadius: "var(--r-2xl)",
      boxShadow: "var(--shadow-lg)",
      padding: "24px 26px",
      animation: "gos-pop .2s var(--ease-out)",
      ...style
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 18,
      fontWeight: 700,
      color: "var(--ink)"
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Close",
    onClick: onClose,
    style: {
      border: "none",
      background: "none",
      color: "var(--muted)",
      cursor: "pointer",
      fontSize: 17,
      lineHeight: 1
    }
  }, "\u2715")), children), /*#__PURE__*/React.createElement("style", null, "@keyframes gos-fade{from{opacity:0}}@keyframes gos-pop{from{opacity:0;transform:translateY(8px) scale(.98)}}"));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
/**
 * Ganesh OS — Toast
 * A single transient notice. Tone tints the left accent + dot. Auto-dismisses after
 * `duration` ms (0 = sticky). Position it yourself (e.g. fixed bottom-right).
 */
const TONES = {
  info: "var(--brand)",
  success: "var(--pass)",
  warn: "var(--work)",
  error: "var(--fail)"
};
function Toast({
  tone = "info",
  title,
  children,
  duration = 4000,
  onDismiss,
  style = {}
}) {
  React.useEffect(() => {
    if (!duration || !onDismiss) return;
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [duration, onDismiss]);
  const c = TONES[tone] || TONES.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 11,
      minWidth: 280,
      maxWidth: 380,
      background: "var(--surface)",
      border: "1px solid var(--line-2)",
      borderLeft: `3px solid ${c}`,
      borderRadius: "var(--r-md)",
      padding: "13px 15px",
      boxShadow: "var(--shadow-lg)",
      fontFamily: "var(--font-sans)",
      animation: "gos-toast .24s var(--ease-out)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: c,
      marginTop: 6,
      flex: "none",
      boxShadow: `0 0 10px ${c}`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "var(--ink)"
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--muted)",
      marginTop: title ? 3 : 0,
      lineHeight: 1.5
    }
  }, children)), onDismiss && /*#__PURE__*/React.createElement("button", {
    "aria-label": "Dismiss",
    onClick: onDismiss,
    style: {
      border: "none",
      background: "none",
      color: "var(--faint)",
      cursor: "pointer",
      fontSize: 14,
      lineHeight: 1
    }
  }, "\u2715"), /*#__PURE__*/React.createElement("style", null, "@keyframes gos-toast{from{opacity:0;transform:translateY(10px)}}"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
/**
 * Ganesh OS — Tooltip
 * Hover/focus tooltip: a small dark glassy bubble above (or below) the trigger.
 * Wraps a single child trigger.
 */
function Tooltip({
  content,
  side = "top",
  children,
  style = {}
}) {
  const [open, setOpen] = React.useState(false);
  const pos = side === "bottom" ? {
    top: "calc(100% + 8px)"
  } : {
    bottom: "calc(100% + 8px)"
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex"
    },
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false)
  }, children, open && content && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      ...pos,
      zIndex: 50,
      whiteSpace: "nowrap",
      pointerEvents: "none",
      background: "rgba(13,19,34,.96)",
      backdropFilter: "blur(8px)",
      border: "1px solid var(--line-2)",
      borderRadius: "var(--r-sm)",
      padding: "7px 10px",
      fontSize: 12,
      color: "var(--body)",
      fontFamily: "var(--font-sans)",
      boxShadow: "var(--shadow-sm)",
      ...style
    }
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Ganesh OS — Checkbox. Custom dark check with violet fill when on. */
function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 9,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      userSelect: "none",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled
  }, rest, {
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      flex: "none",
      borderRadius: 5,
      display: "grid",
      placeItems: "center",
      background: checked ? "var(--grad-brand)" : "var(--surface-2)",
      border: `1px solid ${checked ? "transparent" : "var(--line-2)"}`,
      color: "#fff",
      fontSize: 12,
      transition: "background .15s"
    }
  }, checked ? "✓" : ""), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--body)"
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Ganesh OS — Input. Dark hairline field with violet focus ring. */
function Input({
  invalid = false,
  prefix,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const box = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "var(--surface-2)",
    border: `1px solid ${invalid ? "var(--fail)" : focus ? "var(--brand)" : "var(--line-2)"}`,
    borderRadius: "var(--r-sm)",
    padding: "0 12px",
    height: 40,
    boxShadow: focus ? "0 0 0 3px var(--focus-ring)" : "none",
    transition: "border-color .15s, box-shadow .15s"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...box,
      ...style
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--faint)",
      fontFamily: "var(--font-mono)",
      fontSize: 13
    }
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    }
  }, rest, {
    style: {
      flex: 1,
      minWidth: 0,
      background: "none",
      border: "none",
      outline: "none",
      color: "var(--ink)",
      fontFamily: "var(--font-sans)",
      fontSize: 14.5,
      height: "100%"
    }
  })));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ganesh OS — SegmentedControl. A pill row of 2-4 options; the active one gets the
 * violet gradient. Matches the landing nav/tab pill motif.
 * options: [{ value, label }] or [string]
 */
function SegmentedControl({
  options = [],
  value,
  onChange,
  size = "md",
  style = {},
  ...rest
}) {
  const opts = options.map(o => typeof o === "string" ? {
    value: o,
    label: o
  } : o);
  const pad = size === "sm" ? "6px 12px" : "8px 15px";
  const fs = size === "sm" ? 12.5 : 13.5;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: "inline-flex",
      gap: 3,
      padding: 3,
      background: "var(--surface-2)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-pill)",
      ...style
    }
  }, rest), opts.map(o => {
    const on = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      role: "tab",
      "aria-selected": on,
      onClick: () => onChange && onChange(o.value),
      style: {
        border: "none",
        cursor: "pointer",
        padding: pad,
        fontSize: fs,
        fontWeight: 600,
        fontFamily: "var(--font-sans)",
        borderRadius: "var(--r-pill)",
        whiteSpace: "nowrap",
        color: on ? "#fff" : "var(--muted)",
        background: on ? "var(--grad-brand)" : "transparent",
        boxShadow: on ? "0 3px 12px rgba(139,123,255,.32)" : "none",
        transition: "color .15s, background .15s"
      }
    }, o.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Ganesh OS — Select. Native select styled to the dark field, with a chevron. */
function Select({
  invalid = false,
  children,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "inline-flex",
      width: style.width || "100%"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    }
  }, rest, {
    style: {
      appearance: "none",
      WebkitAppearance: "none",
      width: "100%",
      background: "var(--surface-2)",
      border: `1px solid ${invalid ? "var(--fail)" : focus ? "var(--brand)" : "var(--line-2)"}`,
      borderRadius: "var(--r-sm)",
      padding: "0 34px 0 12px",
      height: 40,
      color: "var(--ink)",
      fontFamily: "var(--font-sans)",
      fontSize: 14.5,
      outline: "none",
      cursor: "pointer",
      boxShadow: focus ? "0 0 0 3px var(--focus-ring)" : "none",
      transition: "border-color .15s, box-shadow .15s",
      ...style
    }
  }), children), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 12,
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--muted)",
      pointerEvents: "none",
      fontSize: 12
    }
  }, "\u25BE"));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Ganesh OS — Switch. Pill toggle; violet track when on. */
function Switch({
  checked,
  onChange,
  label,
  disabled = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      userSelect: "none",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    checked: checked,
    onChange: onChange,
    disabled: disabled
  }, rest, {
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 22,
      flex: "none",
      borderRadius: 999,
      position: "relative",
      background: checked ? "var(--grad-brand)" : "var(--raise)",
      border: `1px solid ${checked ? "transparent" : "var(--line-2)"}`,
      transition: "background .2s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 2,
      left: checked ? 18 : 2,
      width: 16,
      height: 16,
      borderRadius: "50%",
      background: "#fff",
      transition: "left .2s var(--ease)",
      boxShadow: "0 1px 3px rgba(0,0,0,.5)"
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--body)"
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Ganesh OS — Textarea. Multiline field matching Input. */
function Textarea({
  invalid = false,
  rows = 4,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    }
  }, rest, {
    style: {
      width: "100%",
      resize: "vertical",
      background: "var(--surface-2)",
      border: `1px solid ${invalid ? "var(--fail)" : focus ? "var(--brand)" : "var(--line-2)"}`,
      borderRadius: "var(--r-sm)",
      padding: "10px 12px",
      color: "var(--ink)",
      fontFamily: "var(--font-sans)",
      fontSize: 14.5,
      lineHeight: 1.55,
      outline: "none",
      boxShadow: focus ? "0 0 0 3px var(--focus-ring)" : "none",
      transition: "border-color .15s, box-shadow .15s",
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/messaging/DayPlan.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ganesh OS — DayPlan
 * The morning plan: one MIT (most important thing), the top-3 built one-slot-per-
 * domain (cross-domain ranking), and the tiered backlog budget (today/week/later/
 * prune). Mirrors samples/morning-brief.md. Caps the visible today-load.
 *
 * top: [{ domain, text }]   tiers: { today, week, later, prune }
 */
const DOMAIN = {
  work: "var(--work)",
  health: "var(--health)",
  people: "var(--people)",
  growth: "var(--growth)"
};
const LABEL = {
  work: "Work",
  health: "Health",
  people: "People",
  growth: "Growth"
};
function DayPlan({
  date = "Tue · 7:42",
  mit,
  top = [],
  tiers = {},
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--grad-surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-xl)",
      padding: "20px 22px",
      boxShadow: "var(--shadow-lg)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 11px/1 var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: ".07em",
      color: "var(--brand-2)"
    }
  }, "Morning brief"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "var(--muted)"
    }
  }, date)), mit && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16,
      padding: "13px 15px",
      borderRadius: "var(--r-md)",
      background: "var(--brand-soft)",
      border: "1px solid var(--line-2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 10.5px/1 var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: ".08em",
      color: "var(--brand)",
      marginBottom: 6
    }
  }, "\uD83D\uDDD3 MIT \xB7 the one thing"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: "var(--ink)",
      fontWeight: 600,
      lineHeight: 1.4
    }
  }, mit)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 9
    }
  }, top.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 11,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "var(--faint)",
      width: 14
    }
  }, i + 1), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 3,
      flex: "none",
      background: DOMAIN[t.domain] || "var(--brand)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 54,
      flex: "none",
      font: "600 10.5px/1 var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: ".05em",
      color: DOMAIN[t.domain] || "var(--brand)"
    }
  }, LABEL[t.domain] || t.domain), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: "var(--body)",
      lineHeight: 1.4
    }
  }, t.text)))), tiers.today != null && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      marginTop: 16,
      paddingTop: 14,
      borderTop: "1px solid var(--line)"
    }
  }, [["today", tiers.today, "var(--pass)"], ["this week", tiers.week, "var(--brand-2)"], ["later", tiers.later, "var(--muted)"], ["to prune", tiers.prune, "var(--fail)"]].map(([k, v, c]) => /*#__PURE__*/React.createElement("span", {
    key: k,
    style: {
      display: "inline-flex",
      alignItems: "baseline",
      gap: 6,
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "var(--muted)",
      background: "rgba(255,255,255,.03)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-sm)",
      padding: "5px 9px"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: c,
      fontWeight: 700,
      fontVariantNumeric: "tabular-nums"
    }
  }, v), " ", k))));
}
Object.assign(__ds_scope, { DayPlan });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/messaging/DayPlan.jsx", error: String((e && e.message) || e) }); }

// components/messaging/DecisionCanvas.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ganesh OS — DecisionCanvas
 * Pattern #3, the two-way edit channel. Triage writes rows and sets priority; the
 * human edits only the DECISION cell (here or by replying to the handle). The
 * processor applies each decision and stamps the row `applied` so it never re-fires.
 * Mirrors samples/decision-canvas.md. Grouped by tier (T1 apply now / T2 week / T4 prune).
 *
 * rows: [{ handle, list, title, due, tag, decision, applied }]
 */
const NS = {
  W: "var(--brand-2)",
  M: "var(--brand-2)",
  K: "var(--brand-2)",
  V: "var(--people)",
  E: "var(--health)",
  I: "var(--work)",
  P: "var(--fail)",
  J: "var(--work)"
};
function nsColor(id) {
  const ns = (String(id).match(/^[A-Z]+/) || ["M"])[0];
  return NS[ns] || "var(--brand)";
}
function DecisionCanvas({
  title,
  rows = [],
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface-2)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-lg)",
      overflow: "hidden",
      boxShadow: "var(--shadow-sm)",
      ...style
    }
  }, rest), title && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "11px 15px",
      borderBottom: "1px solid var(--line)",
      font: "700 11px/1 var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: ".06em",
      color: "var(--muted)"
    }
  }, title), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ["handle", "title", "due", "tag", "decision"].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: "left",
      padding: "8px 14px",
      font: "700 10px/1 var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: ".06em",
      color: "var(--faint)",
      borderBottom: "1px solid var(--line)"
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => {
    const c = nsColor(r.handle);
    return /*#__PURE__*/React.createElement("tr", {
      key: i,
      style: {
        background: r.applied ? "rgba(52,211,153,.05)" : "transparent"
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: cell
    }, /*#__PURE__*/React.createElement("code", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11.5,
        fontWeight: 700,
        color: c,
        border: `1px solid ${c}`,
        borderRadius: "var(--r-sm)",
        padding: "2px 6px"
      }
    }, r.handle)), /*#__PURE__*/React.createElement("td", {
      style: {
        ...cell,
        color: "var(--body)",
        fontSize: 13.5
      }
    }, r.title, r.list && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--faint)",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        marginLeft: 7
      }
    }, r.list)), /*#__PURE__*/React.createElement("td", {
      style: {
        ...cell,
        color: r.due === "overdue" ? "var(--fail)" : "var(--muted)",
        fontFamily: "var(--font-mono)",
        fontSize: 12
      }
    }, r.due), /*#__PURE__*/React.createElement("td", {
      style: cell
    }, r.tag && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--muted)",
        background: "rgba(255,255,255,.04)",
        border: "1px solid var(--line)",
        borderRadius: "var(--r-sm)",
        padding: "2px 7px"
      }
    }, r.tag)), /*#__PURE__*/React.createElement("td", {
      style: cell
    }, r.decision ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        fontWeight: 600,
        color: r.applied ? "var(--pass)" : "var(--ink)"
      }
    }, r.applied && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--pass)"
      }
    }, "\u2713"), r.decision, r.applied && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--faint)",
        fontWeight: 400
      }
    }, "applied")) : /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-block",
        minWidth: 64,
        height: 22,
        borderRadius: 6,
        border: "1px dashed var(--line-2)",
        background: "rgba(255,255,255,.02)"
      }
    })));
  }))));
}
const cell = {
  padding: "10px 14px",
  borderBottom: "1px solid var(--line)",
  verticalAlign: "middle"
};
Object.assign(__ds_scope, { DecisionCanvas });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/messaging/DecisionCanvas.jsx", error: String((e && e.message) || e) }); }

// components/messaging/DigestBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function DigestBlock({
  channel = "gmail",
  summary,
  items = [],
  fyis = [],
  noise,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-lg)",
      padding: "16px 18px",
      boxShadow: "var(--shadow-sm)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ChannelTag, {
    channel: channel
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "var(--ink)"
    }
  }, summary)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 9
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 9,
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Handle, {
    id: it.handle,
    decision: it.decision,
    style: {
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: "var(--body)",
      lineHeight: 1.5
    }
  }, it.text)))), fyis.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 13,
      paddingTop: 12,
      borderTop: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 10.5px/1 var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: ".07em",
      color: "var(--faint)",
      marginBottom: 7
    }
  }, "FYI"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: 16,
      color: "var(--muted)",
      fontSize: 13,
      lineHeight: 1.65
    }
  }, fyis.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, f)))), noise && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 11,
      fontSize: 12,
      color: "var(--faint)",
      fontStyle: "italic"
    }
  }, noise));
}
Object.assign(__ds_scope, { DigestBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/messaging/DigestBlock.jsx", error: String((e && e.message) || e) }); }

// components/messaging/DomainScorecard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ganesh OS — DomainScorecard
 * The nightly grade: an MIT-met headline with a grade chip, wins, what slipped,
 * a per-domain readout, and tomorrow's first move. Mirrors samples/end-of-day-
 * scorecard.md. Grades: exceeded / strong / solid / partial / reset.
 *
 * domains: [{ domain, label, value, ok }]
 */
const GRADE = {
  exceeded: "var(--neon)",
  strong: "var(--pass)",
  solid: "var(--brand-2)",
  partial: "var(--work)",
  reset: "var(--muted)"
};
const DOMAIN = {
  work: "var(--work)",
  health: "var(--health)",
  people: "var(--people)",
  growth: "var(--growth)"
};
function DomainScorecard({
  date = "That night",
  grade = "strong",
  headline,
  wins = [],
  slipped = [],
  domains = [],
  tomorrow,
  style = {},
  ...rest
}) {
  const gc = GRADE[grade] || "var(--pass)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderTop: `2px solid ${gc}`,
      borderRadius: "var(--r-xl)",
      padding: "20px 22px",
      boxShadow: "var(--shadow-lg)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 11px/1 var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: ".07em",
      color: "var(--muted)"
    }
  }, "\uD83C\uDF19 ", date, " \xB7 scorecard"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 11px/1 var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: ".06em",
      color: gc,
      background: "rgba(255,255,255,.04)",
      border: `1px solid ${gc}`,
      borderRadius: "var(--r-pill)",
      padding: "5px 11px"
    }
  }, grade)), headline && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: "var(--ink)",
      fontWeight: 700,
      marginBottom: 14,
      lineHeight: 1.35
    }
  }, headline), /*#__PURE__*/React.createElement(Section, {
    label: "Wins",
    color: "var(--pass)",
    items: wins
  }), /*#__PURE__*/React.createElement(Section, {
    label: "Slipped to tomorrow",
    color: "var(--work)",
    items: slipped
  }), domains.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      margin: "12px 0 2px"
    }
  }, domains.map((d, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "var(--body)",
      background: "rgba(255,255,255,.03)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-sm)",
      padding: "6px 10px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 3,
      background: DOMAIN[d.domain] || "var(--brand)"
    }
  }), /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)",
      fontWeight: 600
    }
  }, d.label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: d.ok ? "var(--pass)" : "var(--muted)"
    }
  }, d.value)))), tomorrow && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 13,
      paddingTop: 13,
      borderTop: "1px solid var(--line)",
      fontSize: 13.5,
      color: "var(--body)",
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--brand-2)"
    }
  }, "Tomorrow."), " ", tomorrow));
}
function Section({
  label,
  color,
  items
}) {
  if (!items || items.length === 0) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 10.5px/1 var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: ".07em",
      color
    }
  }, label), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: "6px 0 0",
      paddingLeft: 16,
      color: "var(--body)",
      fontSize: 13.5,
      lineHeight: 1.6
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, it))));
}
Object.assign(__ds_scope, { DomainScorecard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/messaging/DomainScorecard.jsx", error: String((e && e.message) || e) }); }

// components/messaging/MessageBubble.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ganesh OS — MessageBubble
 * A plain iMessage/SMS bubble. `from="them"` (incoming, dark surface, left) or
 * `from="me"` (outgoing, violet gradient, right). Optional lead status emoji and
 * a timestamp. Plain text only, per the house format contract.
 */
function MessageBubble({
  children,
  from = "them",
  emoji,
  time,
  style = {},
  ...rest
}) {
  const me = from === "me";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: me ? "flex-end" : "flex-start",
      gap: 4,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
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
      wordBreak: "break-word"
    }
  }, emoji && /*#__PURE__*/React.createElement("span", {
    style: {
      marginRight: 6
    }
  }, emoji), children), time && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      color: "var(--faint)",
      fontFamily: "var(--font-mono)",
      padding: "0 4px"
    }
  }, time));
}
Object.assign(__ds_scope, { MessageBubble });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/messaging/MessageBubble.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ganesh OS — Tabs
 * Controlled tab strip in the brand pill style (active tab = violet gradient).
 * Renders only the strip; you render the active panel. Matches the landing nav.
 *
 * tabs: [{ value, label }] or [string]
 */
function Tabs({
  tabs = [],
  value,
  onChange,
  style = {},
  ...rest
}) {
  const items = tabs.map(t => typeof t === "string" ? {
    value: t,
    label: t
  } : t);
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: "flex",
      gap: 4,
      borderBottom: "1px solid var(--line)",
      ...style
    }
  }, rest), items.map(t => {
    const on = t.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      role: "tab",
      "aria-selected": on,
      onClick: () => onChange && onChange(t.value),
      style: {
        border: "none",
        background: "none",
        cursor: "pointer",
        padding: "10px 14px",
        marginBottom: -1,
        fontSize: 13.5,
        fontWeight: 600,
        fontFamily: "var(--font-sans)",
        whiteSpace: "nowrap",
        color: on ? "var(--ink)" : "var(--muted)",
        borderBottom: `2px solid ${on ? "var(--brand)" : "transparent"}`,
        transition: "color .15s, border-color .15s"
      }
    }, t.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/digest/OneDay.jsx
try { (() => {
// Ganesh OS — one-day digest. A phone frame whose conversation advances:
// overnight pipeline → 7:42 morning brief → reply by handle → evening scorecard.
const {
  MessageBubble,
  DayPlan,
  DomainScorecard,
  DigestBlock,
  SegmentedControl,
  Button
} = window.GaneshOSDesignSystem_462320;
function Phone({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 390,
      margin: "0 auto",
      background: "#05080f",
      border: "1px solid var(--line-2)",
      borderRadius: 44,
      padding: 12,
      boxShadow: "var(--e3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg)",
      borderRadius: 33,
      overflow: "hidden",
      height: 720,
      display: "flex",
      flexDirection: "column",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 92,
      height: 22,
      background: "#05080f",
      borderRadius: 999,
      position: "absolute",
      top: 6
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "4px 16px 10px",
      borderBottom: "1px solid var(--line)",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 9,
      background: "var(--grad-mark)"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)",
      fontSize: 14
    }
  }, "Ganesh OS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--faint)",
      fontFamily: "var(--font-mono)"
    }
  }, "your quiet co-pilot"))), /*#__PURE__*/React.createElement("div", {
    id: "thread",
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "16px 14px",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, children)));
}
const STEPS = ["overnight", "morning", "reply", "evening"];
function OneDay() {
  const [step, setStep] = React.useState(0);
  const at = i => step >= i;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(SegmentedControl, {
    size: "sm",
    options: [{
      value: "0",
      label: "Overnight"
    }, {
      value: "1",
      label: "7:42 brief"
    }, {
      value: "2",
      label: "Reply"
    }, {
      value: "3",
      label: "That night"
    }],
    value: String(step),
    onChange: v => setStep(Number(v))
  })), /*#__PURE__*/React.createElement(Phone, null, at(0) && /*#__PURE__*/React.createElement(MessageBubble, {
    from: "them",
    emoji: "\uD83C\uDF19",
    time: "2:10 AM"
  }, "While you slept: read 7 inboxes, filtered 51 promos, tiered 128 to-dos. Nothing that matters slipped."), at(1) && /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeup .4s var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement(DayPlan, {
    date: "Tue \xB7 7:42",
    mit: "1 pm parents call. Lock the July dates, and move the 1:1 that collides with it.",
    top: [{
      domain: "work",
      text: "Ship the diligence memo before noon (gates the IC vote)."
    }, {
      domain: "health",
      text: "Confirm the 6 pm lift. Front-load protein."
    }, {
      domain: "people",
      text: "Finalize the July trip. Call today."
    }],
    tiers: {
      today: 6,
      week: 29,
      later: 68,
      prune: 4
    }
  })), at(2) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MessageBubble, {
    from: "me",
    time: "7:43 AM"
  }, "done M51"), /*#__PURE__*/React.createElement(MessageBubble, {
    from: "them",
    time: "7:43 AM"
  }, "Marked done, stamped, re-mirrored. Next: confirm the 6 pm lift."), /*#__PURE__*/React.createElement(MessageBubble, {
    from: "me",
    time: "7:44 AM"
  }, "push the lift to 7"), /*#__PURE__*/React.createElement(MessageBubble, {
    from: "them",
    time: "7:44 AM"
  }, "Moved to 7 pm. Protected block, so nothing will bump it.")), at(3) && /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeup .4s var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement(DomainScorecard, {
    grade: "strong",
    headline: "MIT met. Top 3 \u2248 2.5 of 3. 23 things done.",
    wins: ["Shipped both coaching deadlines", "Cleared a work blocker", "Handled a doctor callback"],
    slipped: ["Two items, now tomorrow's first move"],
    domains: [{
      domain: "health",
      label: "Protein",
      value: "66 / 180 g",
      ok: false
    }],
    tomorrow: "Guard 9\u201311 am before the meeting wall, and front-load protein at breakfast."
  })), /*#__PURE__*/React.createElement("style", null, "@keyframes fadeup{from{opacity:0;transform:translateY(10px)}}")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 10,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => setStep(s => Math.max(0, s - 1)),
    disabled: step === 0
  }, "\u2190 Back"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => setStep(s => Math.min(3, s + 1)),
    disabled: step === 3
  }, step === 3 ? "Day complete" : "Advance the day →")));
}
window.OneDay = OneDay;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/digest/OneDay.jsx", error: String((e && e.message) || e) }); }

// ui_kits/docs/DocsApp.jsx
try { (() => {
// Ganesh OS — Docs site. Left route nav, prose column (brand heading system), right TOC.
const {
  Badge,
  CodeBlock,
  Cg,
  Cc
} = window.GaneshOSDesignSystem_462320;
const ROUTES = [{
  g: "Start",
  items: ["Story", "Operator", "Craft"]
}, {
  g: "System",
  items: ["Design patterns", "Governance", "Architecture", "Agent catalog"]
}, {
  g: "Proof",
  items: ["Case studies", "Decisions", "Harness", "Security scan"]
}];

// The 9 patterns, lifted from docs/design-patterns.md (problem → pattern).
const PATTERNS = [["Single-writer fences", "Many agents writing one store clobber each other.", "Give every mutable field exactly one owner. Priority to triage, dates to the sweeps, lifecycle to the reply processor, deletion to nobody. A lane-fence check verifies it. This one rule makes unattended multi-agent writing safe."], ["Forward progress, human-in-the-loop", "Wait on every decision and you build a backlog; decide everything and you lose trust.", "The loop advances on its own and surfaces only exceptions. Overdue items auto-park forward by priority. Destructive actions stay gated. Progress is the default; the human is the exception handler."], ["The decision canvas", "The source of truth is awkward to bulk-edit; a separate planning doc drifts.", "Mirror the store into a file where each row carries a handle, the id, and a blank decision cell. An hourly processor applies decisions with read-after-write verification, stamps them applied, and re-mirrors."], ["Manifest and reply contract", "A digest that just notifies you is a dead end.", "Every surfaced item gets a handle and a JSON manifest line. The human replies by handle or in natural language; a processor resolves it into the right store action. The digest becomes an action surface."], ["Today-budget and spread", "A bulk re-tier dumps forty items on one day and the today view becomes noise.", "Cap the visible load per day (lower on travel days). Exclude recurring rituals. Fan overflow round-robin across the next open days under the cap. A per-day-budget check enforces it."], ["Cross-domain ranking", "Ranking by urgency lets one loud domain crowd out everything else.", "Build the daily top-3 with one slot per domain, filling from the next-highest only when a domain is empty, and saying so. The ranked day is structurally never single-domain."], ["Knowledge that resists rot", "A growing pile of notes goes stale and contradicts itself.", "A read-first index, a shared format contract, an append-only change log, and temporal-validity stamps with a weekly lint that flags stale or contradicted claims."], ["Frozen and behavioral evals", "A self-modifying system can quietly regress.", "Keep frozen binary checks plus behavioral ones from real incidents. The weekly pass runs them before a change and re-runs after; a regression is rolled back from a snapshot, not shipped."], ["Idempotent, degradable jobs", "Cron on an intermittently awake host double-fires or misses.", "Every agent opens with a concurrency guard and a surface check. A missed or doubled fire degrades to a short delta, never a duplicate or a crash."]];
function DocsApp() {
  const [active, setActive] = React.useState("Design patterns");
  // collapse the side rails on narrow viewports
  const [narrow, setNarrow] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener ? mq.addEventListener("change", on) : mq.addListener(on);
    return () => mq.removeEventListener ? mq.removeEventListener("change", on) : mq.removeListener(on);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: narrow ? "1fr" : "230px 1fr 200px",
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: narrow ? {
      position: "sticky",
      top: 0,
      zIndex: 20,
      background: "rgba(8,11,20,.86)",
      backdropFilter: "saturate(160%) blur(12px)",
      borderBottom: "1px solid var(--line)",
      padding: "12px 16px"
    } : {
      borderRight: "1px solid var(--line)",
      padding: "26px 20px",
      position: "sticky",
      top: 0,
      alignSelf: "start",
      height: "100vh",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: narrow ? 10 : 26
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 8,
      background: "var(--grad-mark)"
    }
  }), /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)",
      fontWeight: 800
    }
  }, "Ganesh OS")), narrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      overflowX: "auto",
      paddingBottom: 2
    }
  }, ROUTES.flatMap(r => r.items).map(it => {
    const on = it === active;
    return /*#__PURE__*/React.createElement("a", {
      key: it,
      onClick: () => setActive(it),
      style: {
        flex: "none",
        padding: "7px 12px",
        borderRadius: 999,
        cursor: "pointer",
        whiteSpace: "nowrap",
        fontSize: 12.5,
        fontWeight: 600,
        color: on ? "#fff" : "var(--muted)",
        background: on ? "var(--grad-brand)" : "rgba(255,255,255,.04)",
        border: "1px solid var(--line)"
      }
    }, it);
  })) : ROUTES.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.g,
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 10px/1 var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: ".08em",
      color: "var(--faint)",
      marginBottom: 9
    }
  }, r.g), r.items.map(it => {
    const on = it === active;
    return /*#__PURE__*/React.createElement("a", {
      key: it,
      onClick: () => setActive(it),
      style: {
        display: "block",
        padding: "6px 10px",
        marginBottom: 2,
        borderRadius: 7,
        cursor: "pointer",
        fontSize: 13.5,
        color: on ? "var(--ink)" : "var(--muted)",
        background: on ? "var(--brand-soft)" : "transparent",
        borderLeft: `2px solid ${on ? "var(--brand)" : "transparent"}`
      }
    }, it);
  })))), /*#__PURE__*/React.createElement("main", {
    style: {
      padding: narrow ? "32px 22px 56px" : "56px 64px",
      maxWidth: 820
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 12px/1 var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: ".1em",
      color: "var(--brand-2)",
      marginBottom: 16
    }
  }, "System \xB7 the reusable ideas"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 44,
      fontWeight: 900,
      letterSpacing: "-.03em",
      margin: "0 0 16px",
      background: "var(--grad-ink)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent"
    }
  }, "Design patterns"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      lineHeight: 1.6,
      color: "var(--body)",
      margin: "0 0 36px",
      maxWidth: "64ch"
    }
  }, "The reusable ideas behind Ganesh OS, each stated as a problem and the pattern that solves it, so they transfer to any multi-agent personal or operational system."), PATTERNS.map((p, i) => /*#__PURE__*/React.createElement("section", {
    key: i,
    id: "p" + i,
    style: {
      marginBottom: 34,
      scrollMarginTop: 24
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      letterSpacing: "-.02em",
      color: "var(--ink)",
      margin: "0 0 6px",
      display: "flex",
      alignItems: "baseline",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 14,
      color: "var(--brand)",
      fontWeight: 700
    }
  }, String(i + 1).padStart(2, "0")), p[0]), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 8px",
      color: "var(--muted)",
      fontSize: 15.5,
      lineHeight: 1.55
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--fail)",
      fontWeight: 600
    }
  }, "Problem."), " ", p[1]), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--body)",
      fontSize: 15.5,
      lineHeight: 1.65
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--brand-2)",
      fontWeight: 600
    }
  }, "Pattern."), " ", p[2]))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "10px 0 50px"
    }
  }, /*#__PURE__*/React.createElement(CodeBlock, {
    title: "evals/ \xB7 the patterns are checked, not asserted"
  }, /*#__PURE__*/React.createElement(Cc, null, "# each pattern has a binary or behavioral eval"), "\n", /*#__PURE__*/React.createElement(Cc, null, "$ pytest evals/  \u2192  "), /*#__PURE__*/React.createElement(Cg, null, "5 passed")))), !narrow && /*#__PURE__*/React.createElement("nav", {
    style: {
      borderLeft: "1px solid var(--line)",
      padding: "56px 18px",
      position: "sticky",
      top: 0,
      alignSelf: "start",
      height: "100vh",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 10px/1 var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: ".08em",
      color: "var(--faint)",
      marginBottom: 12
    }
  }, "On this page"), PATTERNS.map((p, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#p" + i,
    style: {
      display: "block",
      padding: "5px 0",
      fontSize: 12.5,
      color: "var(--muted)",
      lineHeight: 1.4
    }
  }, p[0]))));
}
window.DocsApp = DocsApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/docs/DocsApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Hero.jsx
try { (() => {
// Ganesh OS landing — Hero. Kicker, gradient headline, lede, CTA, domain lanes panel, metrics row.
const {
  Button,
  Badge,
  DomainLane,
  StatTile
} = window.GaneshOSDesignSystem_462320;
function Hero({
  onNav
}) {
  const [calm, setCalm] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setCalm(true), 2600);
    return () => clearTimeout(t);
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    id: "top",
    style: {
      position: "relative",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--max-width)",
      margin: "0 auto",
      padding: "78px 24px 34px"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "kicker",
    pulse: true,
    style: {
      marginBottom: 24
    }
  }, "A personal AI operating system, run at the scale of one life"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "clamp(34px,5.4vw,62px)",
      lineHeight: 1.03,
      fontWeight: 900,
      margin: "0 0 22px",
      maxWidth: "17ch",
      letterSpacing: "-.03em",
      background: "linear-gradient(180deg,#fff 30%,#aeb8d4)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent"
    }
  }, "One loud domain was quietly eating my whole life."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "clamp(18px,2.1vw,21px)",
      color: "var(--body)",
      maxWidth: "62ch",
      margin: "0 0 16px"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)"
    }
  }, "Work shouts. Everything that matters whispers."), " Your body, the people who love you, the person you're becoming \u2014 none of them send a push notification. So the loudest thing wins every day, and you call the wreckage \"focus.\""), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "clamp(18px,2.1vw,21px)",
      color: "var(--body)",
      maxWidth: "62ch",
      margin: "0 0 16px"
    }
  }, "I didn't have a discipline problem. I had a governance problem. So I stopped managing a to-do list and built a personal AI operating system to run my life: 27 AI agents, one law (every field has exactly one owner), and at 7:42 each morning, one text that already knows what the day is for."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 700,
      color: "var(--ink)",
      fontSize: "clamp(19px,2.2vw,22px)",
      maxWidth: "62ch",
      margin: 0
    }
  }, "The dread is gone. Not because there's less to carry. Because nothing I love slips in silence anymore."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement(Button, {
    as: "a",
    href: "#",
    onClick: e => e.preventDefault()
  }, "\u25B6 Watch one day decide itself"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    as: "a",
    href: "#router",
    onClick: e => {
      e.preventDefault();
      onNav("router");
    }
  }, "The four disciplines \u2193")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44,
      background: "var(--grad-surface)",
      border: "1px solid var(--line)",
      borderRadius: 20,
      padding: "24px 26px",
      boxShadow: "var(--shadow-lg)",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 8,
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      color: "#fff",
      fontSize: 14,
      fontWeight: 700
    }
  }, "Four domains, one of them far too loud"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--muted)",
      fontSize: 12.5,
      fontFamily: "var(--font-mono)"
    }
  }, calm ? "after: balanced, one slot per domain" : "before: work floods, the rest go dim")), /*#__PURE__*/React.createElement(DomainLane, {
    name: "Work / company",
    sub: "build, GTM, capital",
    domain: "work",
    count: "48 today"
  }), /*#__PURE__*/React.createElement(DomainLane, {
    name: "Health",
    sub: "lift, cardio, racket, PT",
    domain: "health",
    count: "11d since PT",
    quiet: !calm,
    delay: 0.6
  }), /*#__PURE__*/React.createElement(DomainLane, {
    name: "People",
    sub: "date night, family, friends",
    domain: "people",
    count: "3 owed calls",
    quiet: !calm,
    delay: 1.1
  }), /*#__PURE__*/React.createElement(DomainLane, {
    name: "Growth",
    sub: "panels, writing, mentoring",
    domain: "growth",
    count: "on hold",
    quiet: !calm,
    delay: 1.6
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 32,
      flexWrap: "wrap",
      marginTop: 32,
      paddingTop: 26,
      borderTop: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    boxed: false,
    size: "sm",
    value: "99",
    label: "overdue, then held at zero"
  }), /*#__PURE__*/React.createElement(StatTile, {
    boxed: false,
    size: "sm",
    value: "27",
    label: "coordinated agents"
  }), /*#__PURE__*/React.createElement(StatTile, {
    boxed: false,
    size: "sm",
    value: "1 rule",
    label: "every field, one owner"
  }), /*#__PURE__*/React.createElement(StatTile, {
    boxed: false,
    size: "sm",
    value: "0",
    label: "cross-lane writes, enforced in CI"
  }))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Nav.jsx
try { (() => {
// Ganesh OS landing — Nav. Glassy sticky bar with brand glyph, tab links, Watch CTA.
const {
  Button
} = window.GaneshOSDesignSystem_462320;
function Nav({
  active,
  onNav
}) {
  const tabs = ["Story", "Product", "Governance", "Architecture", "Agents", "Operator"];
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 90,
      background: "rgba(8,11,20,.72)",
      backdropFilter: "saturate(160%) blur(14px)",
      borderBottom: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--max-width)",
      margin: "0 auto",
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 64,
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    onClick: e => {
      e.preventDefault();
      onNav("top");
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      fontWeight: 800,
      color: "var(--ink)",
      fontSize: 16,
      textDecoration: "none",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 8,
      background: "var(--grad-mark)",
      boxShadow: "0 0 22px rgba(139,123,255,.6)"
    }
  }), " Ganesh OS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 3,
      alignItems: "center",
      overflowX: "auto"
    }
  }, tabs.map(t => {
    const id = t.toLowerCase();
    const on = active === id;
    return /*#__PURE__*/React.createElement("a", {
      key: t,
      href: "#" + id,
      onClick: e => {
        e.preventDefault();
        onNav(id);
      },
      style: {
        color: on ? "#fff" : "var(--muted)",
        fontSize: 13.5,
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap",
        padding: "8px 12px",
        borderRadius: 999,
        textDecoration: "none",
        background: on ? "var(--grad-brand)" : "transparent",
        boxShadow: on ? "0 4px 14px rgba(139,123,255,.35)" : "none",
        transition: "color .15s, background .15s"
      }
    }, t);
  })), /*#__PURE__*/React.createElement(Button, {
    as: "a",
    href: "#",
    onClick: e => e.preventDefault()
  }, "\u25B6 Watch")));
}
window.Nav = Nav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Sections.jsx
try { (() => {
// Ganesh OS landing — content sections: persona router, life grid, governance fence, agent catalog, footer.
const {
  Button,
  Badge,
  Card,
  CardEyebrow,
  CardOwner,
  CodeBlock,
  Cg,
  Cc,
  ChangeLogLine
} = window.GaneshOSDesignSystem_462320;
function SectionHead({
  eyebrow,
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--text-eyebrow)",
      textTransform: "uppercase",
      letterSpacing: ".1em",
      color: "var(--brand-2)",
      margin: "0 0 14px",
      fontWeight: 700
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "clamp(27px,3.6vw,42px)",
      lineHeight: 1.08,
      fontWeight: 800,
      margin: "0 0 18px",
      maxWidth: "24ch",
      background: "var(--grad-ink)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent"
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      color: "var(--body)",
      maxWidth: "66ch",
      margin: "0 0 8px"
    }
  }, sub));
}
const PERSONAS = [{
  ic: "P",
  b: "Product leader",
  q: "Does this person ship?",
  path: ["Product", "Strategy", "Craft"]
}, {
  ic: "I",
  b: "Investor",
  q: "Is the thinking sound?",
  path: ["Governance", "Cases", "Operator"]
}, {
  ic: "R",
  b: "Research scientist",
  q: "Where's the rigor?",
  path: ["Memory", "Architecture", "Agents"]
}, {
  ic: "E",
  b: "Engineer",
  q: "Show me the system.",
  path: ["Architecture", "Governance", "Agents"]
}];
function PersonaRouter({
  onNav
}) {
  const [sel, setSel] = React.useState(null);
  return /*#__PURE__*/React.createElement("section", {
    id: "router",
    style: {
      padding: "84px 0",
      borderTop: "1px solid var(--line)",
      position: "relative",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--max-width)",
      margin: "0 auto",
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Start where you are",
    title: "Tell me who's reading. I'll route the proof.",
    sub: "Five lenses on the same system. Pick yours and the page reorders to what you came to verify."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(238px,1fr))",
      gap: 14,
      marginTop: 30
    }
  }, PERSONAS.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.b,
    interactive: true,
    gradientSurface: true,
    onClick: () => setSel(p.b),
    style: {
      cursor: "pointer",
      borderRadius: 16,
      borderColor: sel === p.b ? "var(--line-2)" : "var(--line)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 11,
      display: "grid",
      placeItems: "center",
      fontFamily: "var(--font-mono)",
      fontWeight: 700,
      fontSize: 16,
      marginBottom: 13,
      background: "var(--brand-soft)",
      color: "var(--brand)"
    }
  }, p.ic), /*#__PURE__*/React.createElement("b", {
    style: {
      display: "block",
      color: "var(--ink)",
      fontSize: 17
    }
  }, p.b), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      color: "var(--body)",
      fontSize: 13.5,
      marginTop: 6,
      fontStyle: "italic"
    }
  }, p.q), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      paddingTop: 13,
      borderTop: "1px solid var(--line)",
      font: "600 11.5px/1.5 var(--font-mono)",
      color: "var(--muted)"
    }
  }, "route \u2192 ", p.path.map((x, i) => /*#__PURE__*/React.createElement("span", {
    key: x
  }, i > 0 && " · ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: "var(--brand-2)",
      fontStyle: "normal"
    }
  }, x)))))))));
}
const LIFE = [{
  c: "work",
  lt: "Work",
  h: "The company",
  p: "Build, GTM, capital, the pipeline. The loud lane — fenced so it can't eat the others.",
  own: "owns: pipeline priority"
}, {
  c: "health",
  lt: "Lifting",
  h: "Strength",
  p: "The 6 p.m. lift is a protected block with one owning agent. No sweep can bump it.",
  own: "held: streak-aware"
}, {
  c: "health",
  lt: "Recovery",
  h: "PT & health",
  p: "Physio sets, mobility, sleep and food logged nightly with one line of coaching.",
  own: "scored at 9:35 p.m."
}, {
  c: "people",
  lt: "Partner",
  h: "Date night",
  p: "A protected block, not a suggestion — the relationship gets a guaranteed slot.",
  own: "sacred: never auto-moved"
}, {
  c: "people",
  lt: "Friends",
  h: "The people you drift from",
  p: "The friend you went quiet on gets surfaced before months pass, not after.",
  own: "re-surfaced on decay"
}, {
  c: "growth",
  lt: "Growth",
  h: "Panels, writing, mentoring",
  p: "The work on yourself competes on equal footing — one ranked slot before urgency votes.",
  own: "one growth slot/day"
}];
function LifeGrid() {
  return /*#__PURE__*/React.createElement("section", {
    id: "story",
    style: {
      padding: "84px 0",
      borderTop: "1px solid var(--line)",
      position: "relative",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--max-width)",
      margin: "0 auto",
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "The whole life \xB7 not a work hack",
    title: "It doesn't run my tasks. It runs my life \u2014 all of it.",
    sub: "Most productivity systems optimize the domain that was already winning. This one protects the ones that weren't. Each lane has its own owning agents, protected slots, and an honest scorecard."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
      gap: 12,
      marginTop: 30
    }
  }, LIFE.map(l => /*#__PURE__*/React.createElement(Card, {
    key: l.h,
    accent: l.c,
    interactive: true,
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement(CardEyebrow, {
    accent: l.c
  }, l.lt), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 15.5,
      margin: "9px 0 5px",
      color: "var(--ink)"
    }
  }, l.h), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      color: "var(--muted)"
    }
  }, l.p), /*#__PURE__*/React.createElement(CardOwner, {
    style: {
      marginTop: 10
    }
  }, l.own))))));
}
const FENCES = [{
  c: "var(--field-priority)",
  f: "priority",
  d: "now / this-week / later / prune",
  o: "pipeline-triage",
  os: "todo-triage"
}, {
  c: "var(--field-date)",
  f: "due_date",
  d: "calendar reconcile + auto-park",
  o: "morning-sweep",
  os: "evening-sweep"
}, {
  c: "var(--field-sync)",
  f: "lifecycle",
  d: "create / complete / reschedule",
  o: "reply-processor",
  os: ""
}, {
  c: "var(--fail)",
  f: "delete",
  d: "irreversible — human-gated",
  o: "nobody",
  os: "you approve"
}];
function Governance() {
  return /*#__PURE__*/React.createElement("section", {
    id: "governance",
    style: {
      padding: "84px 0",
      borderTop: "1px solid var(--line)",
      position: "relative",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--max-width)",
      margin: "0 auto",
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Under the hood \xB7 a governance layer",
    title: "One rule keeps a fleet of writers safe.",
    sub: "Every mutable field has exactly one owning agent \u2014 an agent literally cannot write a field it does not own. The guardrail is enforced in CI, not asserted in a slide."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-2)",
      border: "1px solid var(--line)",
      borderRadius: 22,
      padding: "28px 30px",
      boxShadow: "var(--shadow-lg)",
      marginTop: 26
    }
  }, FENCES.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.f,
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 210px",
      gap: 14,
      alignItems: "center",
      padding: "13px 0",
      borderTop: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: 4,
      flex: "none",
      background: r.c
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "#fff",
      fontWeight: 600,
      fontSize: 15,
      fontFamily: "var(--font-mono)"
    }
  }, r.f), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      color: "var(--muted)",
      fontSize: 12.5
    }
  }, r.d))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "#e6ebf3",
      textAlign: "right"
    }
  }, r.o, r.os && /*#__PURE__*/React.createElement("small", {
    style: {
      display: "block",
      color: "var(--faint)",
      fontWeight: 400,
      fontSize: 11.5
    }
  }, r.os))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16,
      marginTop: 18,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(CodeBlock, {
    title: "evals/lane_fence.py \xB7 CI trust gate"
  }, /*#__PURE__*/React.createElement(Cc, null, "# fails on the first cross-lane write"), "\n", /*#__PURE__*/React.createElement(Cc, null, "$ pytest evals/  \u2192  "), /*#__PURE__*/React.createElement(Cg, null, "5 passed"), "\n", /*#__PURE__*/React.createElement(Cc, null, "# lane-fence clean \xB7 0 cross-lane writes")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ChangeLogLine, {
    time: "05:48",
    agent: "pipeline-triage",
    field: "priority(J04)"
  }), /*#__PURE__*/React.createElement(ChangeLogLine, {
    time: "06:04",
    agent: "morning-sweep",
    field: "auto-park \xD763",
    note: "# overdue \u2192 0"
  }), /*#__PURE__*/React.createElement(ChangeLogLine, {
    time: "14:02",
    agent: "todo-triage",
    field: "due_date(M51)",
    verdict: "CROSS-LANE",
    blocked: true
  })))));
}
const AGENTS = [{
  c: "work",
  g: "Triage & priority",
  items: [["pipeline-triage", "priority"], ["todo-triage", "priority"], ["intake-scan", "create_item"]]
}, {
  c: "health",
  g: "Calendar & dates",
  items: [["morning-sweep", "due_date"], ["evening-sweep", "due_date"], ["slot-guard", "protected"]]
}, {
  c: "people",
  g: "Lifecycle & reply",
  items: [["reply-processor", "lifecycle"], ["manifest-build", "manifest"], ["mirror-back", "ack"]]
}];
function AgentCatalog() {
  return /*#__PURE__*/React.createElement("section", {
    id: "agents",
    style: {
      padding: "84px 0",
      borderTop: "1px solid var(--line)",
      position: "relative",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--max-width)",
      margin: "0 auto",
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "The fleet \xB7 27 agents, one field each",
    title: "Every agent owns exactly one field.",
    sub: "Coordination happens through shared files, never shared state. Here's a slice of the catalog, grouped by concern."
  }), AGENTS.map(grp => /*#__PURE__*/React.createElement("div", {
    key: grp.g,
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 11px/1 var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: ".06em",
      color: `var(--${grp.c})`,
      marginBottom: 9,
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 3,
      background: `var(--${grp.c})`
    }
  }), grp.g), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
      gap: 10
    }
  }, grp.items.map(it => /*#__PURE__*/React.createElement(Card, {
    key: it[0],
    accent: grp.c,
    accentSide: "left",
    interactive: true,
    style: {
      borderRadius: 11,
      padding: "12px 13px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "#fff"
    }
  }, it[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 11px/1.35 var(--font-mono)",
      color: "var(--muted)",
      marginTop: 5
    }
  }, "owns ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--brand-2)"
    }
  }, it[1])))))))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: "46px 0",
      color: "var(--muted)",
      fontSize: 13.5,
      borderTop: "1px solid var(--line)",
      position: "relative",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--max-width)",
      margin: "0 auto",
      padding: "0 24px",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 16,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 7,
      background: "var(--grad-mark)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--body)",
      fontWeight: 700
    }
  }, "Ganesh OS"), /*#__PURE__*/React.createElement("span", null, "\u2014 autonomous agents, made safe to run unattended.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    as: "a",
    href: "#",
    onClick: e => e.preventDefault()
  }, "\u2605 Star on GitHub"))));
}
Object.assign(window, {
  SectionHead,
  PersonaRouter,
  LifeGrid,
  Governance,
  AgentCatalog,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/operator/DecisionQueue.jsx
try { (() => {
// Ganesh OS — Operator decision queue. Interactive: apply decisions, confirm a prune via Dialog, Toast on apply.
const {
  DecisionCanvas,
  SegmentedControl,
  Dialog,
  Toast,
  Button,
  DayPlan
} = window.GaneshOSDesignSystem_462320;
const SEED = {
  today: [{
    handle: "J01",
    list: "Pipeline",
    title: "Intro: founder intro",
    due: "today 4pm",
    tag: "act",
    decision: ""
  }, {
    handle: "J02",
    list: "Pipeline",
    title: "Referral ask at company",
    due: "today 10am",
    tag: "warm",
    decision: "done",
    applied: true
  }, {
    handle: "M03",
    list: "Health",
    title: "Book specialty appointment",
    due: "Thu",
    tag: "call",
    decision: ""
  }],
  prune: [{
    handle: "P02",
    list: "Pipeline",
    title: "Stale lead, posting closed",
    due: "overdue",
    tag: "prune-review",
    decision: "drop"
  }, {
    handle: "P05",
    list: "Intake",
    title: "Cold thread, no reply 28d",
    due: "overdue",
    tag: "prune-review",
    decision: "drop"
  }]
};
function DecisionQueue() {
  const [tier, setTier] = React.useState("today");
  const [rows, setRows] = React.useState(SEED);
  const [confirm, setConfirm] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const applyTodo = () => {
    setRows(r => ({
      ...r,
      today: r.today.map(x => x.decision && !x.applied ? {
        ...x,
        applied: true
      } : x.decision ? x : {
        ...x,
        decision: "done",
        applied: true
      })
    }));
    setToast({
      tone: "success",
      title: "Decisions applied",
      body: "Stamped and re-mirrored. The store stays canonical."
    });
  };
  const doPrune = () => {
    setRows(r => ({
      ...r,
      prune: r.prune.map(x => ({
        ...x,
        applied: true
      }))
    }));
    setConfirm(false);
    setToast({
      tone: "warn",
      title: "2 items pruned",
      body: "Irreversible, so it needed you. Logged with timestamps."
    });
  };
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-xl)",
      boxShadow: "var(--e1)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "13px 18px",
      borderBottom: "1px solid var(--line)",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "700 11px/1 var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: ".07em",
      color: "var(--muted)"
    }
  }, "Decision queue"), /*#__PURE__*/React.createElement(SegmentedControl, {
    size: "sm",
    options: [{
      value: "today",
      label: "Apply now"
    }, {
      value: "prune",
      label: "Prune · gated"
    }],
    value: tier,
    onChange: setTier
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(DecisionCanvas, {
    rows: rows[tier]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 10,
      marginTop: 14
    }
  }, tier === "today" ? /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: applyTodo
  }, "Apply decisions \u2192") : /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => setConfirm(true)
  }, "Confirm prune (2) \u2192"))), /*#__PURE__*/React.createElement(Dialog, {
    open: confirm,
    onClose: () => setConfirm(false),
    title: "Confirm prune"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--body)",
      margin: 0,
      fontSize: 14,
      lineHeight: 1.55
    }
  }, "Drop 2 stale items? Deletion is the one thing no agent can do unattended, so it needs you."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      justifyContent: "flex-end",
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => setConfirm(false)
  }, "Keep them"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: doPrune
  }, "Drop both"))), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      right: 24,
      bottom: 24,
      zIndex: 120
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: toast.tone,
    title: toast.title,
    onDismiss: () => setToast(null)
  }, toast.body)));
}
window.DecisionQueue = DecisionQueue;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/operator/DecisionQueue.jsx", error: String((e && e.message) || e) }); }

// ui_kits/operator/OpBar.jsx
try { (() => {
// Ganesh OS — Operator dashboard. Top bar with brand, date, surface status.
const {
  Badge
} = window.GaneshOSDesignSystem_462320;
function OpBar() {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 90,
      background: "rgba(8,11,20,.78)",
      backdropFilter: "saturate(160%) blur(14px)",
      borderBottom: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: "0 auto",
      padding: "0 24px",
      height: 60,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 8,
      background: "var(--grad-mark)",
      boxShadow: "0 0 22px rgba(139,123,255,.6)"
    }
  }), /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)",
      fontSize: 15.5,
      fontWeight: 800
    }
  }, "Ganesh OS"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--faint)",
      fontSize: 13.5,
      fontFamily: "var(--font-mono)"
    }
  }, "operator")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12.5,
      color: "var(--muted)"
    }
  }, "Tue 17 Jun \xB7 7:42"), /*#__PURE__*/React.createElement(Badge, {
    variant: "tag",
    tone: "pass",
    pulse: true
  }, "27 agents nominal"))));
}
window.OpBar = OpBar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/operator/OpBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/operator/Panels.jsx
try { (() => {
// Ganesh OS — Operator panels: domain balance, change-log spine, eval gate, fence table.
const {
  DomainLane,
  ChangeLogLine,
  CodeBlock,
  Cg,
  Cc,
  Cr,
  Table,
  StatTile
} = window.GaneshOSDesignSystem_462320;
function Panel({
  title,
  right,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-xl)",
      boxShadow: "var(--e1)",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "13px 18px",
      borderBottom: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "700 11px/1 var(--font-mono)",
      textTransform: "uppercase",
      letterSpacing: ".07em",
      color: "var(--muted)"
    }
  }, title), right), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18
    }
  }, children));
}
function DomainBalance() {
  return /*#__PURE__*/React.createElement(Panel, {
    title: "Domain balance \xB7 today",
    right: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11.5,
        color: "var(--brand-2)"
      }
    }, "one slot each")
  }, /*#__PURE__*/React.createElement(DomainLane, {
    name: "Work / company",
    sub: "build, GTM, capital",
    domain: "work",
    count: "6 today"
  }), /*#__PURE__*/React.createElement(DomainLane, {
    name: "Health",
    sub: "lift, cardio, PT",
    domain: "health",
    count: "2 today",
    delay: 0.5
  }), /*#__PURE__*/React.createElement(DomainLane, {
    name: "People",
    sub: "partner, family",
    domain: "people",
    count: "1 today",
    delay: 1.0
  }), /*#__PURE__*/React.createElement(DomainLane, {
    name: "Growth",
    sub: "panels, writing",
    domain: "growth",
    count: "1 today",
    delay: 1.5
  }));
}
function ChangeLog() {
  return /*#__PURE__*/React.createElement(Panel, {
    title: "Change-log spine \xB7 live",
    right: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11.5,
        color: "var(--faint)"
      }
    }, "append-only")
  }, /*#__PURE__*/React.createElement(ChangeLogLine, {
    time: "05:48",
    agent: "pipeline-triage",
    field: "priority(J04)"
  }), /*#__PURE__*/React.createElement(ChangeLogLine, {
    time: "06:04",
    agent: "morning-sweep",
    field: "auto-park \xD763",
    note: "# overdue \u2192 0"
  }), /*#__PURE__*/React.createElement(ChangeLogLine, {
    time: "06:05",
    agent: "morning-sweep",
    field: "due_date(M51)",
    note: "# read-after-write \u2713"
  }), /*#__PURE__*/React.createElement(ChangeLogLine, {
    time: "07:41",
    agent: "manifest-build",
    field: "brief(P1)"
  }), /*#__PURE__*/React.createElement(ChangeLogLine, {
    time: "14:02",
    agent: "todo-triage",
    field: "due_date(M51)",
    verdict: "CROSS-LANE",
    blocked: true
  }));
}
function EvalGate() {
  return /*#__PURE__*/React.createElement(Panel, {
    title: "CI trust gate",
    right: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11.5,
        color: "var(--pass)"
      }
    }, "passing")
  }, /*#__PURE__*/React.createElement(CodeBlock, {
    title: "evals/ \xB7 pre-merge"
  }, /*#__PURE__*/React.createElement(Cc, null, "# single-writer fence + day-budget"), "\n", /*#__PURE__*/React.createElement(Cc, null, "$ pytest evals/  \u2192  "), /*#__PURE__*/React.createElement(Cg, null, "5 passed"), "\n", /*#__PURE__*/React.createElement(Cg, null, "lane-fence"), "   clean · 0 cross-lane writes", "\n", /*#__PURE__*/React.createElement(Cg, null, "day-budget"), "  ok · no day over cap", "\n", /*#__PURE__*/React.createElement(Cr, null, "blocked"), "     todo-triage → due_date (not owner)"));
}
function FenceTable() {
  const owner = v => /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink)"
    }
  }, v);
  return /*#__PURE__*/React.createElement(Panel, {
    title: "Single-writer fences",
    right: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11.5,
        color: "var(--faint)"
      }
    }, "one owner per field")
  }, /*#__PURE__*/React.createElement(Table, {
    columns: [{
      key: "field",
      header: "Field",
      mono: true
    }, {
      key: "owner",
      header: "Owning agent",
      render: owner
    }, {
      key: "who",
      header: "Who else may write",
      align: "right"
    }],
    rows: [{
      field: "priority",
      owner: "triage agents",
      who: "read-only"
    }, {
      field: "due_date",
      owner: "the sweeps",
      who: "read-only"
    }, {
      field: "lifecycle",
      owner: "reply-processor",
      who: "read-only"
    }, {
      field: "delete",
      owner: "nobody",
      who: "you approve"
    }]
  }));
}
function Metrics() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    value: "99 \u2192 0",
    label: "overdue, held at zero"
  }), /*#__PURE__*/React.createElement(StatTile, {
    value: "63",
    label: "auto-parked today"
  }), /*#__PURE__*/React.createElement(StatTile, {
    value: "0",
    label: "cross-lane writes"
  }), /*#__PURE__*/React.createElement(StatTile, {
    value: "5/5",
    label: "evals passing"
  }));
}
Object.assign(window, {
  OpPanel: Panel,
  DomainBalance,
  ChangeLog,
  EvalGate,
  FenceTable,
  Metrics
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/operator/Panels.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ChannelTag = __ds_scope.ChannelTag;

__ds_ns.Handle = __ds_scope.Handle;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardEyebrow = __ds_scope.CardEyebrow;

__ds_ns.CardOwner = __ds_scope.CardOwner;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.ChangeLogLine = __ds_scope.ChangeLogLine;

__ds_ns.CodeBlock = __ds_scope.CodeBlock;

__ds_ns.Cg = __ds_scope.Cg;

__ds_ns.Cc = __ds_scope.Cc;

__ds_ns.Ck = __ds_scope.Ck;

__ds_ns.Cs = __ds_scope.Cs;

__ds_ns.Cr = __ds_scope.Cr;

__ds_ns.Cy = __ds_scope.Cy;

__ds_ns.DomainLane = __ds_scope.DomainLane;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.DiagramFrame = __ds_scope.DiagramFrame;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.DayPlan = __ds_scope.DayPlan;

__ds_ns.DecisionCanvas = __ds_scope.DecisionCanvas;

__ds_ns.DigestBlock = __ds_scope.DigestBlock;

__ds_ns.DomainScorecard = __ds_scope.DomainScorecard;

__ds_ns.MessageBubble = __ds_scope.MessageBubble;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
