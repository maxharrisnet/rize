# Workshop Detail Pages — Design

**Date:** 2026-07-04
**Status:** Approved

## Goal
Individual detail pages for each `workshops` collection entry, built from existing fields,
with an optional Markdown-body curriculum section that renders only when filled.

## Route & data
- `src/pages/workshops/[slug].astro` — dynamic route, `getStaticPaths()` over `getCollection('workshops')`.
  `params.slug = entry.id`; props carry the full entry. URLs: `/workshops/<id>` (e.g. `/workshops/digital-confidence`).
- No schema change. Curriculum = the Markdown **body** of each workshop file (empty today).
  Render via `render(entry)`; guard with `entry.body?.trim()` so the section only appears when present.

## Page layout (reuse components: BaseLayout, Hero, SectionHeading, CTASection, Button, Icon)
1. **Hero** — track pill (community→red / career→blue) + title + tagline (lead). Actions:
   `Button` "Request this workshop" → `/contact?inquiry=Learn`, and a quiet "← All workshops" → `/learn#workshops`.
2. **About** — `SectionHeading "About this workshop"` + `summary`.
3. **Two bento blocks** (grid md:grid-cols-2) — "Who this is for" (`whoFor`) and "What you'll walk away with" (`outcomes`), icon-beside-title, bulleted lists.
4. **Meta** — two cards: "Skill level" (`skillLevel`) and "Format" (`format`).
5. **Curriculum** *(optional)* — `SectionHeading "What we'll cover"` + `<Content />` in a `.prose-rize` wrapper. Only when body present.
6. **CTASection** — "Ready to bring this to your community?" body + email; actions:
   primary "Request this workshop" → `/contact?inquiry=Learn`; secondary "Explore funded partnerships" → `/partnerships`.

## Linking change
- `WorkshopCard` gains a `slug: string` prop; its bottom link becomes **"See workshop details →"** → `/workshops/<slug>` (replaces the old "Request This Workshop → /contact"). Request now lives on the detail page.
- `learn.astro` passes `slug={w.id}` to each `WorkshopCard`.
- Course cards unchanged (courses can follow later).

## Styling
- New `.prose-rize` class in `global.css` for rendered Markdown: our tokens, 18px body floor, disc lists,
  brand-red links, uppercase 900 headings (inherit base), sensible margins. Only used by the curriculum body.

## SEO / a11y / out of scope
- Per-page title `"<title> | Rize Skill Training Workshop"`, description = tagline.
- WCAG AA + 18px floor (all reused components already comply). Track-pill contrast: white on red/blue (pass).
- FAQ schema deferred. Courses detail pages deferred. Public schedule/registration deferred.
