# Systems: transformation packages & sitewide value-prop narrative — design

**Date:** 2026-07-03 · **Status:** approved by Max · Strategy source of truth: [`docs/strategy.md`](../../strategy.md)

## Goal

Reposition the build/automation offering around outcome-oriented transformation packages and roll
the technology-gap value proposition across the whole site (Home, Systems, Learn, About,
Partnerships). Lead with why-this-is-for-you and what-you-get; keep the existing service
categories as the detail layer.

## Decisions (all approved)

- **Packaging:** packages lead, categories stay. Three named packages headline the offering page;
  existing category grids, website pricing tiers, integrations, and growth sections remain below.
- **Naming:** offering is **SYSTEMS** (nav label + page identity). `/services` → `/systems` with a
  redirect.
- **Proof:** illustrative before/after vignettes, explicitly framed as "what this looks like" —
  never fake testimonials. Replace with real case studies as projects complete.
- **Scope:** sitewide narrative in one pass.
- **Pricing display:** packages show no listed price — "starts with a free discovery call."
  Website tiers (Starter/Standard/Growth) keep their listed prices under the website category.

## The three packages

Each package renders: name (ALL CAPS), one-line promise, who it's for, fat-red-dot inclusion
bullets, a short before/after vignette, and a discovery-call CTA.

1. **OWN YOUR WEBSITE** — a professional site your team updates without calling a developer.
   WordPress build, training, full handoff. Website categories + pricing tiers sit beneath it.
2. **GET YOUR TIME BACK** — map the repetitive work (email follow-ups, triple-posting updates,
   copying data between tools) and make it run itself. Integrations with Slack, HubSpot, and the
   tools already in use. Documented and trained so the team owns it.
3. **REACH MORE PEOPLE** — a chatbot answering common questions around the clock, email and
   social outreach that sounds like you and goes out on time, visibility in local search and
   AI-generated answers.

Vignette example (package 2): a program coordinator whose Mondays went to spreadsheet copying,
triple-posting updates, and answering the same five emails — versus the Monday where
registrations file themselves, updates post everywhere at once, and the website answers the
questions.

## Page-by-page changes

- **Systems** (`src/pages/services.astro` → `systems.astro`, redirect from `/services`):
  value-prop-led hero; packages section on top; existing How-it-works, For Organizations,
  For Businesses and Entrepreneurs, website pricing, Integrations and Automations, Growth and
  Outreach sections stay below with copy tuned to the narrative.
- **Home** (`index.astro`): hero unchanged. "Technology for the people" names the technology gap
  explicitly. "We also build websites and workflows" becomes a real Systems teaser with one
  vignette. Nav copy references updated.
- **Learn** (`learn.astro`): hero + intro get the technology-gap throughline — cut through the
  noise, learn what you actually need, leave more confident.
- **About / Partnerships:** weave in the gap, "technology should be for everyone," human-first
  framing; Partnerships ties funded programs to closing the gap for specifically named
  communities.
- **Header/Footer:** SERVICES → SYSTEMS, hrefs updated.

## Constraints

- All design-system rules in `docs/design-system.md` (contrast pairings, ≥18px type, clamp scale,
  Rubik weights, ALL-CAPS titles, token colors, ink outlines, reduced-motion).
- Tone: positive, people-first, outcomes-led; name communities specifically; never "empower /
  leverage / cutting-edge / innovative / solutions"; "Vancouver and Greater Vancouver area".
- Verify with `npm run build` + `npx astro check`.

## Error handling / edge cases

- `/services` inbound links (search engines, shared links) land on the redirect → `/systems`.
- Any internal `/services` href or anchor (e.g. `AnchorNav` targets, CTA links) must be swept and
  updated — grep for `/services` across `src/`.

## Out of scope

- Real case studies (future swap-in), package pricing numbers, changes to workshops/courses
  content collections.
