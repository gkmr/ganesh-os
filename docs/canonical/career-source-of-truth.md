# Career source of truth

Single canonical definition of GK's job-search target. Every scanning and job surface reads this file and never restates the ICP inline. Consumers: slack-job-sweep, daily-job-scan-810am, anthropic-jobs-check-daily, openai-jobs-check-daily, weekly-job-search-update, loop-prep.

Confirmed 2026-06-17 against the live scan tasks. The Anthropic and OpenAI checks state seniority inline but defer the comp band and company list here.

## Target roles
- Seniority: Director, Senior Director, VP, SVP, GM, Head of Product (and CPO / CPTO / CTO-of-product at the labs). Senior Principal / Group PM acceptable at AI-native companies.
- Function: product management and product leadership only.
- Shape: own a P&L, a platform, or a 0-to-1 line; ~100-200+ person orgs or a focused founding-scale bet.

## Compensation band
- Target: ~$400-500K total comp, treated as a SIGNAL, not a hard gate.
- Floor: drop a role only if the posted range tops out under ~$300K AND the company is not a priority target. Otherwise surface it and tag the comp.

## Domain priority and target companies
- Top priority: CoreWeave (checked first; tier-1 by default).
- AI-native / priority: Cohere, Google DeepMind, Meta, MongoDB, Datadog, Scale AI, Perplexity, Mistral, Hugging Face, Databricks, Sierra, Harvey, Glean.
- Still-open targets: Flock Safety, Motorola, Zscaler, Yelp (SVP only), Asana, Fetch, Foundation Source, Technosylva, DuckDuckGo.
- Anthropic and OpenAI are top targets but are handled by their own dedicated daily careers-diff checks, so the general web and Slack scans EXCLUDE them to avoid double-surfacing.
- Keep this list current from the weekly job-triage.

## Location
- NYC preferred. Boston case-by-case. Strong remote is great. SF and other metros: surface and tag, do not auto-drop.
- Relocation only for a top-priority account.

## Exclusions
- Below Director.
- Non-PM functions: product ops, product marketing, design, program/project management, internal-IT PM, data science, policy, engineering, GTM/sales.

## Reminders and calendar bindings
- Job-search reminders live on the Apple Reminders list named "Job Search". Resolve the list by NAME at runtime (call reminders_lists first); never hardcode the UUID. Create job items UNDATED with no priority set; tier and priority are owned by reminders-triage-545am (single-writer fence).
- weekly-job-search-update reads the connected calendars at runtime; do not inline addresses.

## Note
This file is the job-target ICP. GK's own candidate facts (titles held, ARR, acquisitions, metrics) are a SEPARATE record in resume-tailor/references/source-of-truth.md.
