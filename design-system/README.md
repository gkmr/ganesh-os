# Ganesh OS — Design System

A dark, engineering-grade design language for **Ganesh OS**: a governance layer for autonomous AI agents, presented as a showcase/landing experience. The aesthetic is "deep-space control room" — near-black navy surfaces, a violet-and-cyan brand, monospace data labels, and four color-coded *life domains* that thread meaning through everything.

> **What the product is.** Ganesh OS is a **personal AI operating system** — real software the operator runs daily on his own life. 27 scheduled AI agents read message channels (iMessage, SMS, WhatsApp, email), reconcile calendars, and read health signals, then each morning at 7:42 send one text naming the single most important thing across work, health, people, and growth. The hard problem it solves is *governance* — making a fleet of autonomous writers safe to run unattended via one rule: **every mutable field has exactly one owning agent.** The split is the design: **LLM judgment where nuance lives, deterministic code where correctness lives.** The visual system exists to make that rigor feel trustworthy: auditable, calm, precise.

> **Who runs it.** Built by **Ganesh Kumar**, an operator-investor (VC partner + fractional CPO/CTO). The repo is architecture and patterns only, with personal data removed. Earlier framing called it an "AI-native company run at the scale of one life"; the current site frames it as a "personal AI operating system" — both describe the same system.

This design system was reverse-engineered from the project's own landing page and animated demo. It is not an installable app — it is the brand and UI language those pages establish, factored into tokens, components, and recreations.

---

## Sources

Everything here derives from one public repository:

- **GitHub:** https://github.com/gkmr/ganesh-os (branch `main`)
  - `index.html` — the landing experience (persona router + tabbed deck). **Primary source of truth** for tokens, components, and layout.
  - `demo.html` — the animated "one day in motion" (overnight pipeline → morning brief → live decision cut). Source for the product/phone surfaces.
  - `assets/hero.svg`, `assets/architecture.svg`, `assets/hero.gif`, `assets/system-flow.html` — brand imagery (imported into `assets/`).
  - `README.md`, `docs/`, `ARCHITECTURE.md` — product voice & content.

> Explore the repo to build more faithfully — the live page's CSS, copy, and motion are the canonical reference. Live site (when GitHub Pages is on): `https://gkmr.github.io/ganesh-os/`.

**Font note:** the source loads **Inter** and **JetBrains Mono** from Google Fonts. This system imports the same two families from Google Fonts (`tokens/fonts.css`) rather than self-hosting — no substitution was needed, but if you want offline/self-hosted binaries, drop the `.woff2` files into `assets/` and swap the `@import` for `@font-face` rules.

---

## CONTENT FUNDAMENTALS

The voice is a **first-person operator-engineer**: a builder narrating a system they live inside. Confident, plainspoken, occasionally literary, never corporate. The product also has a **canonical, enforced format contract** for everything its agents write. Both are documented below.

> **Source of truth.** Voice and format rules are codified in the repo at `docs/canonical/house-style.md` and `docs/canonical/banned-words.md`. Those files win over anything restated here. This section follows its own rules as a demonstration (note: no em dashes anywhere in it).

### Hard rules (enforced, not stylistic)
These come straight from `house-style.md` and apply to every agent-authored message. Treat them as load-bearing when you write product copy.

- **No em dashes. Anywhere.** Use periods, commas, colons, or parentheses to pivot from claim to mechanism. (The earlier draft of this guide wrongly said em dashes were used. They are banned.)
- **Sentence case** for all human-facing copy: headlines, buttons, nav, body. Never all-lowercase, never dropped capitals or punctuation, even in casual registers. UPPERCASE is reserved for mono micro-labels (`TL;DR`, `CASE 01`, eyebrows, owner pills) with positive letter-spacing.
- **No markdown links in product copy.** Bare URLs and bare numbers only.
- **Lead with the originating bracket tag** on agent messages (`[gmail]`, `[slack]`, `[imessage]`). Line 1 is a one-line summary with counts and "N need you." Action items first (each with a stable handle), FYIs compressed, noise on one line at the end.

### Banned words (from `banned-words.md`)
Run this substring check before shipping any drafted prose.

- **Core hard-ban (all surfaces):** leverage, ecosystem, synergy, spearhead, navigate, journey, roadmap (as metaphor), passionate, obsessed, robust, scalable, world-class, cutting-edge, transformative, innovative, seamless, holistic, best-in-class, game-changer, thought leader.
- **Swaps (use the left, never the right):** led/ran (not spearheaded), built/shipped (not architected unless literally architecture), used (not leveraged/utilized), big/major (not transformative), worked across (not navigated), plan/sequence (not roadmap-as-metaphor).
- **Flag-on-sight (allowed sparingly):** strategic, scalable (literal infra only), platform (when vague), impact (when unquantified), drive, enable, empower.

### Voice and rhythm
- **Person and address.** First person singular for the story ("*I* didn't have a discipline problem"), shifting to the system as a third actor ("*it* reads everything, forgets nothing"). The reader is addressed as "you" in product copy ("at 7:42 *your* phone already knows what the day is for").
- **Tone.** Earnest and a little vulnerable, then suddenly precise. A sentence of feeling ("nothing I love slips in silence anymore") sits next to a hard number ("99 overdue, held at zero"). The core rhythm is emotional claim, then measured proof.
- **The "receipt" device.** Trust is *shown*, not asserted. Copy cites runnable evidence: change-log lines, `pytest evals/ → 5 passed`, "0 cross-lane writes, enforced in CI." Mono type carries this engineering-receipt voice.
- **Numbers as narrative.** Specific, load-bearing figures: `27 agents`, `99 → 0`, `7:42 a.m.`, `1 rule`. Round numbers are avoided. Precision *is* the message.
- **Sentence shape.** Short declaratives and fragments for punch ("Work shouts. Everything that matters whispers."). Colons and parentheses (not em dashes) pivot from claim to mechanism. Pullquotes are one strong idea, ≤26ch wide, with a single cyan-highlighted phrase.
- **Vocabulary.** Domain language: *governance, single-writer fence, audit trail, idempotent, auto-park, lane, owner, reversible vs irreversible, judgment vs determinism.* The four life domains are always **work · health · people · growth**.
- **Emoji.** Used sparingly and functionally inside simulated product text only: the morning brief leads `🗓`, the evening summary `🌙`. Never in UI chrome, headings, or marketing copy. Arrows (`→ ↓ ↑ ▶`) are functional glyphs, not decoration.

### The content micro-language
The product speaks a compact, copyable shorthand. See the "Content" cards in the Design System tab and the `ChannelTag` / `Handle` components.

- **Channel bracket tags:** `[gmail] [slack] [imessage] [whatsapp] [voice] [intake]` lead every outbound line.
- **Handle namespaces** (one per repliable item, also written to the daily manifest): `W#` chat A, `M#` chat B, `K#` chat C, `V#` voice, `E#` email, `I#` intake/opportunity, `P#` day-plan, `PR#` prune-confirmation, `J#` job-role (with source suffix, e.g. `J12a`).
- **Decision vocabulary** (what the human replies, by handle or in a canvas cell): `blank/keep` = no change, `done` = complete, `push <when>` = reschedule, `drop` = delete (confirmation-gated), `list <name>` = move, `p1/p2/p3` = priority, `new: <title> | <list> | <due>` = create.

### Examples
- Hero: "One loud domain was quietly eating my whole life."
- Punch line: "The dread is gone. Not because there's less to carry. Because nothing I love slips in silence anymore."
- Receipt: "every field has exactly one owner."
- Morning brief line: `[imessage] 🗓 Tue. 4 items, 1 needs you. M51: ship the diligence memo before noon (gates the IC vote).`
- Reply by handle: `done M51` · `push V3 to Thursday` · `new: book PT | Health | Fri`

---

## VISUAL FOUNDATIONS

**Overall vibe.** Dark, technical, premium. A "mission-control at night" feeling — deep navy void, faint engineering grid, blurred nebula orbs, and crisp glassy panels floating on top. Confident use of glow as the single decorative flourish.

- **Color.** Near-black navy base (`--bg #070a14`) with layered surfaces (`#111829` card, `#0d1322` sunken, `#161f33` raised). Brand is **violet `#8b7bff` + electric cyan `#22d3ee`**; violet drives buttons/active states, cyan drives eyebrows/links/accents. Four **life-domain accents** carry semantic meaning everywhere: work = amber `#fbbf24`, health = teal `#2dd4bf`, people = orange `#fb923c`, growth = violet `#a78bfa`. Status: pass/green `#34d399`, fail/red `#f87171`, terminal-neon `#5dff9b`.
- **Type.** Inter for all UI/display (400–900; headings are 800–900, tight `-.03em` tracking, often clamp-fluid). JetBrains Mono for data, timestamps, labels, code, and eyebrows. Big headings use a **white→grey gradient text-fill** (`linear-gradient(180deg,#fff,#c7cfe2)` clipped to text) for a subtle sheen.
- **Backgrounds.** *Not* flat. Fixed full-viewport `.bgfx` layer with 4 large blurred radial **orbs** (violet/teal/magenta/blue, `blur(70px)`, opacity ~.5) plus a faint **48px grid** masked to fade out. Hero/energy sections add layered `radial-gradient` washes. No photography; no stock imagery. Imagery that exists (hero.svg, architecture.svg) is **schematic/diagrammatic**, in-palette, drawn as SVG.
- **Spacing & layout.** Max width **1140px**, 24px gutters. Sections are tall — **84px** vertical padding — separated by top hairline borders. Generous breathing room; content rarely exceeds ~66ch line length.
- **Corners.** Soft and large. Chips/inputs 8px, compact cards 11–14px, feature cards 16–18px, hero panels and big containers **22px**. The brand glyph is a 26px gradient rounded square (8–9px radius).
- **Cards.** Surface `#111829`, **1px hairline border** `rgba(255,255,255,.085)`, radius 14–18px, soft stacked shadow. Many cards add a **2px top accent border** in their domain color (`border-top:2px solid var(--c)`), or a left-accent for catalog/agent cards. Feature panels add a masked **gradient border** (violet fading to transparent) via a `:before` overlay.
- **Shadows.** Two stacked, low-opacity shadows tuned for near-black: `--shadow-sm` (0 1px 2px + 0 14px 40px) and `--shadow-lg` (deeper). The signature accent is the **violet glow** `--glow` (1px violet ring + 40px violet bloom) used on hover/focus of primary surfaces. Cyan glow for highlighted dots/markers.
- **Borders & hairlines.** Everything is separated by `rgba(255,255,255,.085)` (subtle) or `.14` (strong) — never solid grey lines. Inset panels rely on these alpha hairlines plus a faint fill.
- **Transparency & blur.** Sticky nav and tab bars use `backdrop-filter: saturate(160%) blur(12–14px)` over `rgba(8,11,20,.72–.86)` — glassy, legible over scrolling content. Orbs are heavily blurred. Tinted fills (`rgba(brand,.08)`) wash kickers and verdict callouts.
- **Animation.** Purposeful, never bouncy. Scroll-reveal: `opacity 0→1 + translateY(22px→0)` over .8s on `--ease-out` (`cubic-bezier(.16,1,.3,1)`). Hover lifts: `translateY(-1px to -4px)` over .15–.2s. Flowing progress bars in domain "lanes" (`@keyframes flow`), a slow `pulse` on the live dot, a `shake` on a blocked eval, voice waveform bars. Standard transitions use `--ease cubic-bezier(.4,0,.2,1)`. **All motion is disabled under `prefers-reduced-motion`.**
- **Hover states.** Lift up a few px + add the violet glow + brighten border (`--line` → `--line-2`). Nav/tab pills: muted text → white, transparent → faint white fill; active pill gets the violet gradient + shadow. Links: cyan.
- **Press/active states.** Active nav/tabs use the solid violet gradient (`135deg, brand→#6d5cf0`) with a violet drop shadow. Buttons translate up 1px on hover (no shrink-on-press in source).
- **Buttons.** Pill-shaped (`999px`). Primary = violet gradient, white text, 14px semibold, glow on hover. Ghost = transparent, `--ink` text, 1px `--line-2` border. Small inline arrows accompany labels (`↓ → ▶`).
- **Data & code.** A recurring **neon code block**: near-black `#060a12`, traffic-light dots, mono 12.7px, syntax colors (neon green strings, violet keywords, cyan strings, red errors, amber warnings). Tabular-nums for all metrics.
- **Imagery color vibe.** Cool, dark, synthetic — violet/cyan/teal on navy. No warm photography, no grain, no skin tones. The animated `hero.gif` is the one motion asset.

---

## ICONOGRAPHY

Ganesh OS uses **almost no traditional icons** — and that restraint is itself the style.

- **No icon font, no SVG icon set.** The source ships neither Lucide/Heroicons nor a custom sprite. Meaning is carried instead by **color-coded dots and chips**: a 9–11px rounded square or circle in a domain color (`.d`, `.dot`, `.chip`, `.cdot`) stands in for an icon next to a label. This is the dominant "iconography" of the system — flat colored squares with optional glow.
- **Unicode glyphs as functional icons.** Arrows and a play triangle do the symbolic work: `▶` (watch/play), `→` (forward/next), `↓` (jump down), `↑` (back to top). These are typed characters, styled with the surrounding text — never drawn.
- **Emoji, only inside simulated product output.** `🗓` in the morning brief, `🌙` in the evening summary, `▶`/`⭐` in README context. Emoji never appear in UI chrome, navigation, headings, or as decorative card bullets.
- **Traffic-light dots.** Code-block title bars use the macOS `#ff5f56 / #ffbd2e / #27c93f` dots as a recognizable "terminal" motif.
- **Brand mark.** A gradient rounded square (violet→cyan, `--grad-mark`) — see `assets/glyph.svg` and `assets/logo.svg`. No wordmark logotype beyond "Ganesh OS" set in Inter 800.
- **Diagrams over icons.** Where a concept needs a picture, the system draws a **schematic SVG** (architecture diagram, single-writer fence, energy curve) in-palette — `assets/architecture.svg`, `assets/hero.svg`, `assets/system-flow.html`.

**Decision (ratified).** Stay **glyph-and-colored-dot**, no icon library. This matches the source exactly and keeps the system's calm, data-first restraint. Where a label needs a leading mark, use a colored domain dot/chip; where a symbol is genuinely needed, use a typed unicode glyph (`▶ → ↓ ↑ ✕ ▾`) or a **mono initial** in a `--brand-soft` tile (as the persona-router cards now do — the earlier draft used invented decorative glyphs `◆ ✦ ⬡`, which have been removed). Reach for a thin-stroke CDN set (e.g. Lucide at ~1.5px, muted `--muted`) only as a deliberate, flagged extension when a real product surface needs true line icons. It is not part of the established brand.

---

## Index / manifest

**Root**
- `styles.css` — global entry point (`@import` manifest only). Consumers link this.
- `README.md` — this guide.
- `SKILL.md` — Agent-Skills-compatible front-matter for use in Claude Code.

**Tokens** (`tokens/`)
- `fonts.css` — Inter + JetBrains Mono (Google Fonts, matching the source's own `<link>`).
- `colors.css` — surfaces, brand, four domains + tint fills, status, semantic aliases.
- `typography.css` — families, weights, scale, fluid display roles.
- `spacing.css` — spacing, radius, shadow, elevation, z-index, breakpoints, glow, gradients, motion easings.
- `motion.css` — the canonical `@keyframes` (flow, pulse, reveal, shake, wave, pop, toast) + `.gos-reveal` helper, reduced-motion gated.
- `themes.css` — domain theming scopes: `[data-domain="…"]` sets `--accent` / `--accent-soft` for descendants.

**Foundations** (Design System tab cards — `guidelines/`) — type, color, spacing, motion, brand & content-voice specimens.

**Components** (`components/`)
- `core/` — Button, IconButton, Badge, Tag, Card.
- `data/` — DomainLane, ChangeLogLine, CodeBlock, StatTile, Table.
- `content/` — ChannelTag, Handle (the bracket-tag + repliable-handle micro-language).
- `messaging/` — DigestBlock, MessageBubble, DayPlan, DomainScorecard, DecisionCanvas (the product's output surfaces, built from `samples/`).
- `forms/` — Input, Textarea, Select, Checkbox, Switch, SegmentedControl.
- `navigation/` — Tabs.
- `feedback/` — Tooltip, Dialog, Toast.
- `diagrams/` — DiagramFrame (the schematic surface for the in-palette SVGs).

**UI kits** (`ui_kits/`)
- `landing/` — recreation of the Ganesh OS landing experience (nav, hero, persona router, life grid, governance fence, agent catalog).
- `operator/` — the control-room dashboard: domain balance, change-log spine, CI eval gate, single-writer fence table, and an interactive decision queue (apply / gated prune).
- `digest/` — "one day in motion" on a phone: overnight sweep → 7:42 brief → reply by handle → evening scorecard.
- `docs/` — documentation reading layout (route nav, prose, on-page TOC) rendering the design-patterns doc.
- `slides/` — five 1280×720 slide types (title, big-stat, fence, case-study, quote).

**Assets** (`assets/`)
- `logo.svg`, `glyph.svg` — brand mark (violet→cyan, primary violet `#8b7bff`).
- `hero.svg`, `hero.gif`, `architecture.svg`, `system-flow.html` — imported brand imagery. Note: `hero.svg` uses the slightly bluer legacy mark violet `#7c5cff` (token `--brand-alt`); the live-site primary `#8b7bff` (`--brand`) governs everything else.

---

*Reverse-engineered from the public `gkmr/ganesh-os` repository. Explore that repo for the canonical CSS, copy, and motion.*
