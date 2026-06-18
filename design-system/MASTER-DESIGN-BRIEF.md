# Ganesh OS — Master Design Brief & Improvement Backlog

> **How to use this file.** Paste the **Master Prompt** block below into a fresh agent session pointed at this design-system project. It carries the role, the canonical constraints, and an exhaustive, stack-ranked backlog. Work top-down: P0 first, do not skip tiers. Every item lists *what · why · effort · acceptance*. Check `check_design_system` clean after each tier.

---

## ▸ MASTER PROMPT (paste this)

You are a world-class product designer and design-systems engineer taking ownership of the **Ganesh OS** design system. Ganesh OS is a governance layer for autonomous AI agents, proven by running one operator's life as an AI-native company: 27 scheduled agents, made auditable and human-gated by one rule — *every mutable field has exactly one owning agent*. The visual language must make that rigor feel **trustworthy, calm, and precise**: deep-space control room — near-black navy, violet + electric-cyan brand, four color-coded life domains, mono "engineering-receipt" data, a single violet glow as the only flourish.

**Source of truth, in priority order:** (1) the live `gkmr/ganesh-os` repo CSS/copy — `index.html`, `demo.html`, `docs/canonical/house-style.md`, `docs/canonical/banned-words.md`, `docs/design-patterns.md`; (2) this project's existing tokens/components; (3) the README. When they disagree, the canonical repo docs win. Never invent UI not present in the source — recreate, don't redesign. Copy real assets; never hand-draw SVG icons or generate imagery.

**Hard brand constraints (from canonical docs — enforce in every piece of copy you write):**
- **No em dashes. Anywhere.** Use periods, commas, colons, or parentheses.
- **Sentence case** for all human-facing copy. UPPERCASE only for mono micro-labels. Never all-lowercase, never dropped capitals.
- **No markdown links in product copy.** Bare URLs and bare numbers.
- **Banned words** (hard): leverage, ecosystem, synergy, spearhead, navigate, journey, roadmap-as-metaphor, passionate, obsessed, robust, scalable, world-class, cutting-edge, transformative, innovative, seamless, holistic, best-in-class, game-changer, thought-leader. Flag-on-sight: strategic, platform, impact, drive, enable, empower.
- **Bracket tags** lead agent messages: `[gmail]`, `[slack]`, `[imessage]`. **Handles** are namespaced: `W# M# K#` (chats), `V#` voice, `E#` email, `I#` intake, `P#` day-plan, `PR#` prune, `J#` job-role. **Decision vocab:** keep · done · push <when> · drop · list <name> · p1/p2/p3 · new: <title> | <list> | <due>.
- Trust is *shown, not asserted*: cite change-logs, `pytest evals/ → 5 passed`, "0 cross-lane writes, enforced in CI." Numbers are specific and load-bearing (99→0, 27, 1 rule), never round.

**Working rules:** Components are `<Name>.jsx` + sibling `<Name>.d.ts` + `<Name>.prompt.md`; one `@dsCard` HTML per directory mounting from `window.GaneshOSDesignSystem_462320`. Foundation cards are small (~700×150) and link `styles.css`. UI kits recreate real product surfaces by composing primitives. Reusable templates are `templates/<slug>/<Slug>.dc.html` via the DC tooling. Keep everything dark-theme, token-driven, reduced-motion-safe. Run `check_design_system` until clean.

Then execute the backlog below, **top tier first**.

---

## ▸ GLOBAL STACK RANK (all items, highest leverage first)

| # | Item | Tier | Effort | Why it ranks here |
|---|------|------|--------|-------------------|
| 1 | Correct CONTENT FUNDAMENTALS to canonical voice (em-dash ban, banned-words, casing) | P0 | S | A factual error in the brand's own rules; cheap; everything downstream inherits it |
| 2 | Resolve README ↔ build inconsistencies (IconButton/Tag claimed but missing; brand violet #8b7bff vs #7c5cff) | P0 | S | The manifest currently lies about what's shipped |
| 3 | Add the **content micro-language** as documented foundations (bracket tags, handle namespaces, decision vocab) | P0 | M | The single most distinctive, repo-unique brand asset and it's absent |
| 4 | Build the **message/digest** primitives (MessageBubble, DigestBlock) from `samples/` | P1 | M | Unlocks the product's actual output surface; samples give exact format |
| 5 | Build **DecisionCanvas** (handle · item · decision-cell table) | P1 | M | Pattern #3, the human's edit channel; nothing covers tables yet |
| 6 | Build **DomainScorecard** + **DayPlan** from `samples/end-of-day-scorecard.md` & `morning-brief.md` | P1 | M | Two hero surfaces with real sample data |
| 7 | Add **form primitives**: Input, Textarea, Select, Checkbox, Switch, SegmentedControl | P1 | L | No product can be built without them; many docs surfaces need them |
| 8 | Add **Table, Tabs, Tooltip, Dialog, Toast** | P1 | L | Structural gaps; docs site + operator views need all five |
| 9 | New UI kit: **Operator dashboard** (four-domain control room, change-log spine, eval gate) | P2 | L | The product's core screen; composes everything above |
| 10 | New UI kit: **Messaging / one-day digest** (phone: morning brief → reply by handle → scorecard) | P2 | L | Recreates `demo.html`; high-signal, interactive |
| 11 | New UI kit: **Docs site** (reading layout for `docs/*.html`) | P2 | M | A whole product surface now exists in-repo |
| 12 | Slides kit (TitleSlide, FenceSlide, BigStatSlide, CaseStudySlide) from `docs/case-studies` | P2 | M | Repeatable narrative format; brand has a clear deck voice |
| 13 | Token system depth: elevation, z-index, breakpoints, state-overlay, domain-tint tokens | P2 | M | Removes magic numbers; makes kits consistent |
| 14 | Accessibility pass: focus-visible everywhere, aria roles, keyboard nav, contrast audit | P2 | M | Trust brand must be operable; cheap once tokens exist |
| 15 | Specimen-card gaps: button states, voice/banned-words card, tag+handle card, message card | P3 | S | Fills the Design System tab to match the expanded system |
| 16 | Iconography decision: ratify thin-line set (Lucide) or stay glyph-only; replace invented glyphs (◆ ✦ ⬡) | P3 | S | Current persona glyphs were invented; needs a real call |
| 17 | Self-host Inter + JetBrains Mono (.woff2) | P3 | S | Offline/perf; removes Google Fonts dependency |
| 18 | Diagram components: SingleWriterFence, ArchitectureMap from `assets/*.svg` + `system-flow.html` | P4 | M | In-palette schematic motif; nice-to-have |
| 19 | Motion spec doc + reusable keyframes module (flow, pulse, reveal, shake, waveform) | P4 | S | Codifies the animation language already used ad hoc |
| 20 | Theming hooks (domain-driven accent theming API on Card/Lane/Badge) | P4 | M | Future-proofing; only if a second product appears |

Tiers: **P0** correctness (do immediately) · **P1** core coverage · **P2** product surfaces · **P3** polish · **P4** optional.

---

## ▸ P0 — CORRECTNESS (ship today)

### 1. Correct CONTENT FUNDAMENTALS to canonical voice
**What.** Rewrite the README CONTENT FUNDAMENTALS section against `docs/canonical/house-style.md` and `banned-words.md`. Remove the claim that em-dashes are used; state the em-dash ban explicitly. Add the banned-words list, the swap table, sentence-case rule, bare-URL rule, bracket-tag rule.
**Why.** It currently contradicts the brand's own canonical voice doc — a real error any reader would inherit.
**Effort.** S. **Acceptance.** README voice section quotes the em-dash ban, lists ≥20 banned words, and contains zero em-dashes itself.

### 2. Resolve README ↔ build inconsistencies
**What.** Either build `IconButton` and `Tag` (claimed in the README manifest) or remove them from the manifest. Pick one brand violet (`#8b7bff` live-site value recommended) and reconcile `logo.svg`/`glyph.svg`/`hero.svg` (`#7c5cff`) to it, or document the divergence deliberately.
**Why.** The manifest must not claim components that don't exist.
**Effort.** S. **Acceptance.** `check_design_system` component list matches the README index exactly; one documented violet.

### 3. Document the content micro-language as foundations
**What.** Add a README section + 2 specimen cards covering: bracket tags (`[gmail] [slack] [imessage]`), handle namespaces (`W# M# K# V# E# I# P# PR# J#`), and the decision vocabulary (`keep/done/push/drop/list/p1-3/new:`). Build a tiny `Handle` and `ChannelTag` primitive (mono pills).
**Why.** This is the most repo-distinctive, copyable brand asset and it's entirely missing from the system.
**Effort.** M. **Acceptance.** Two new "Content" cards render; `Handle` + `ChannelTag` exported and on a component card.

---

## ▸ P1 — CORE COVERAGE

### 4. Message / digest primitives
**What.** `MessageBubble` (iMessage/SMS plain-text, optional lead status emoji), `DigestBlock` (line-1 summary with counts + "N need you", action items with handles, FYIs compressed, noise on one line). Drive from `samples/morning-brief.md` and `samples/digest-sms.txt`.
**Why.** This is the product's actual output channel; the format contract is exact.
**Effort.** M. **Acceptance.** A card renders the real morning-brief sample verbatim through the components.

### 5. DecisionCanvas
**What.** A `Table`-based component: each row = stable handle · item · id · blank decision cell; "applied" stamp state. Mirror `samples/decision-canvas.md`.
**Why.** Design pattern #3 (two-way sync), the human's primary edit channel; no table coverage exists.
**Effort.** M. **Acceptance.** Renders sample rows; shows pending vs applied states.

### 6. DomainScorecard + DayPlan
**What.** `DomainScorecard` (four domains, per-domain score/streak, one coaching line) from `end-of-day-scorecard.md`; `DayPlan` (top-3, one slot per domain, budget cap, travel-day note) from `morning-brief.md`.
**Why.** Two hero surfaces with real sample data; show cross-domain ranking (pattern #6) and today-budget (pattern #5).
**Effort.** M. **Acceptance.** Both cards render sample data; budget/streak numbers are tabular.

### 7. Form primitives
**What.** `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `SegmentedControl` — dark, hairline-bordered, violet focus-ring, soft radius. Full `.d.ts` + prompt + a `forms.card.html`.
**Why.** Nothing real is buildable without inputs; operator/settings/reply surfaces all need them.
**Effort.** L. **Acceptance.** All six exported, keyboard-operable, focus-visible ring uses `--focus-ring`.

### 8. Structural components
**What.** `Table`, `Tabs`, `Tooltip`, `Dialog`, `Toast`. Tabs matches the landing nav pill + docs tab pattern; Table backs DecisionCanvas/fence/agent-catalog.
**Why.** Cross-cutting structural gaps blocking every kit.
**Effort.** L. **Acceptance.** Each exported with a states card; Dialog traps focus; Toast auto-dismisses.

---

## ▸ P2 — PRODUCT SURFACES

### 9. Operator dashboard UI kit
**What.** `ui_kits/operator/` — the control room: four DomainLanes live, the change-log spine (ChangeLogLine stack), the CI eval gate (CodeBlock), today's DayPlan, a fence table. Interactive: approve a prune (PR#), apply a decision.
**Why.** The product's core screen; proves the whole component set composes.
**Effort.** L. **Acceptance.** `index.html` looks like a real operator view, not a storybook; one interaction works end-to-end.

### 10. Messaging / one-day digest UI kit
**What.** `ui_kits/digest/` — phone frame: overnight pipeline → 7:42 morning brief → reply by handle ("done 3", "push 2 to Thu") → evening scorecard. Recreate `demo.html`'s arc.
**Why.** High-signal, interactive, recreates the existing animated demo.
**Effort.** L. **Acceptance.** User can send a handle reply and see the store "update"; reduced-motion safe.

### 11. Docs site UI kit
**What.** `ui_kits/docs/` — reading layout for `docs/*.html`: left nav of doc routes, prose column with the brand's heading/eyebrow system, in-page TOC, code/sample callouts.
**Why.** A whole product surface now exists in-repo (29 docs files).
**Effort.** M. **Acceptance.** Renders one real doc (e.g. `design-patterns.md`) faithfully.

### 12. Slides kit
**What.** `ui_kits/slides/` — TitleSlide, SingleWriterFenceSlide, BigStatSlide (99→0), CaseStudySlide, QuoteSlide. 1280×720, brand foundations, logo. Source: `docs/case-studies.md`, `story.md`.
**Why.** Brand has a clear narrative deck voice; repeatable format.
**Effort.** M. **Acceptance.** Each slide tagged `@dsCard group="Slides" viewport="1280x720"`.

### 13. Token system depth
**What.** Add elevation scale (`--e0..--e3`), z-index scale (`--z-nav/-modal/-toast`), breakpoints (`--bp-sm/md/lg`), state-overlay tokens (`--overlay-hover/-active`), and domain-tint fills (`--work-tint` = rgba). Refactor components off magic numbers.
**Why.** Kills inconsistency across kits; makes future surfaces fast.
**Effort.** M. **Acceptance.** New tokens shipped + at least Card/Button/Lane consume them.

### 14. Accessibility pass
**What.** `:focus-visible` ring on every interactive primitive, aria roles/labels, keyboard nav for Tabs/Dialog/Select, contrast audit of muted text on surfaces (target ≥4.5:1 for body).
**Why.** A trust brand must be operable; cheap once `--focus-ring` exists.
**Effort.** M. **Acceptance.** Tab-through works on the operator kit; no body text under 4.5:1.

---

## ▸ P3 — POLISH

### 15. Specimen-card gaps
Button hover/press states card · voice + banned-words "do/don't" card · tag+handle+channel card · message-format card. **Acceptance.** Design System tab gains ≥4 cards; "Content" group exists.

### 16. Iconography decision
Ratify a thin-line set (Lucide via CDN at ~1.5px, muted) as a documented *extension*, or commit to glyph-only and **replace the invented persona glyphs (◆ ✦ ⬡)** with sourced ones or colored dots. Flag the call to the user. **Acceptance.** ICONOGRAPHY section states the decision; no un-sourced glyphs remain.

### 17. Self-host fonts
Drop Inter + JetBrains Mono `.woff2` into `assets/`, swap the Google `@import` for `@font-face`. **Acceptance.** Page renders offline; no external font request.

---

## ▸ P4 — OPTIONAL / FUTURE

### 18. Diagram components
`SingleWriterFence`, `ArchitectureMap` built from `assets/architecture.svg`, `hero.svg`, `system-flow.html` (copy, don't redraw). **Acceptance.** Two diagram cards render in-palette.

### 19. Motion spec + keyframes module
A `motion.css` exporting `@keyframes flow/pulse/reveal/shake/waveform` + a README MOTION table (easing, duration, when-to-use), all reduced-motion gated. **Acceptance.** Components import shared keyframes instead of inlining.

### 20. Theming hooks
A small accent-theming API so Card/Lane/Badge can be driven by a `domain` context. Only if a second product surface appears. **Acceptance.** One provider swaps all domain accents.

---

### Sources consulted for this brief
`index.html`, `demo.html`, `docs/canonical/house-style.md`, `docs/canonical/banned-words.md`, `docs/design-patterns.md`, `samples/*`, `agents/*` from https://github.com/gkmr/ganesh-os (branch `main`, updated). Re-read these before executing — they are the source of truth.
