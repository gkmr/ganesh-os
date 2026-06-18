# Banned words (canonical)

One list, imported by every skill that drafts prose, replacing the four unequal copies the audit found (resume-tailor owned 20 words; interview-coach and transcript-cleanup hardcoded an ~8-word subset; LinkedIn banned a different set; loop-prep a third). With four lists, words like "transformative" and "world-class" were caught on one surface and slipped through another.

Ownership: resume-tailor remains the maintainer. This file is the canonical merge. Reconcile against resume-tailor/references/banned-words.md once on install, then have the other skills import this file (see banned-words-adoption.md). Each skill may ADD surface-specific terms on top; it may not silently drop core terms.

## Core hard-ban (all surfaces)
leverage, ecosystem, synergy, spearhead, navigate, journey, roadmap (as a verb/metaphor), passionate, obsessed, robust, scalable, world-class, cutting-edge, transformative, innovative, seamless, holistic, best-in-class, game-changer, thought leader.

## Swaps (use the left, not the right)
- led / ran  ->  spearheaded
- built / shipped  ->  architected (unless literally architecture)
- used  ->  leveraged / utilized
- big / major  ->  transformative
- worked across  ->  navigated
- plan / sequence  ->  roadmap (as metaphor)

## Trigger-a-check tier (allowed sparingly, flag on sight)
strategic, scalable (literal infra OK), platform (when vague), impact (when unquantified), drive, enable, empower.

## Surface-specific add-ons (added on top of core, per skill)
- linkedin-profile-optimizer: also ban guru, passionate, strategic, specialized, "leadership" as an adjective, and the "ex-" prefix.
- loop-prep: also ban "game changer", "why this matters".
- resume-tailor and transcript-cleanup: core list as-is.

## Cross-surface placeholder rule (see parity-log.md)
The $XX metric placeholder is ALLOWED on the resume (private, one-shot) and FORBIDDEN on LinkedIn (public, persistent). This is a deliberate divergence recorded in parity-log.md, not a banned-words inconsistency. Do not "fix" it by unifying.

## Enforcement
gk-writing-style Gate 1 runs the mechanical substring check against this list. Any skill drafting prose should run the same Gate-1 pass before output.
