# FAQ sections — design

**Date:** 2026-07-04
**Status:** Approved

## Goal

Add FAQ content to the Rize Skill Training site: per-page accordion FAQ sections on Systems,
Learn, and every workshop detail page, with FAQPage JSON-LD schema generated from the same data.
This also closes the "FAQ schema deferred" item from the 2026-07-02 rebuild spec and the
2026-07-04 workshop detail pages spec.

## Decisions

- **Placement:** per-page FAQ sections (no dedicated `/faq` page). Pages: Systems, Learn, and
  the shared workshop detail template. Partnerships is out of scope for this pass.
- **UI:** native `<details>/<summary>` accordion — zero JS, keyboard-accessible.
- **Schema:** FAQPage JSON-LD emitted by the component from the same items array.
- **Data:** items defined in each page's frontmatter (matching the existing page-owns-its-content
  pattern); workshop detail pages share one list in the template.
- **Facts:** answers use only facts already on the site or in `docs/strategy.md`. No invented
  timelines, group sizes, or prices.
- **Casing:** questions render bold (700) sentence case — a documented exception to the ALL CAPS
  titles rule (like the AnchorNav 16px exception), because full-sentence questions in caps hurt
  readability. Add this exception to `docs/design-system.md`.

## Component: `src/components/FAQ.astro`

Props:

- `items: { question: string; answer: string }[]` — answer strings may contain minimal inline
  HTML (links to `/contact`, `/partnerships`, `#pricing`).
- `title?: string` — section heading, default `"Frequently asked questions."` (rendered via
  `SectionHeading`, which uppercases per the design system).
- `id?: string` — section id for AnchorNav linking (default `faq`).

Rendering:

- Section wrapper (`container-wide py-16 md:py-24`) with `SectionHeading`, then one
  `<details>` per item.
- Bento style: `rounded-[14px] border-2 border-ink bg-white`, consistent with existing cards.
- `<summary>`: question at weight 700, sentence case, ≥18px, ink on white (contrast passes),
  with a `ph:plus-bold` icon that rotates 45° when open. Transition guarded by
  `prefers-reduced-motion: reduce` (falls back to instant state swap; base guard in
  `global.css` already covers transforms — keep component styles compatible with it).
- Answer body: `text-body` 400, `text-body-muted` (#3D332B) or ink, rendered with `set:html`.
- JSON-LD: `<script type="application/ld+json" set:html={...}>` building a `FAQPage` schema
  from `items`, with HTML tags stripped from answers for `acceptedAnswer.text`.

## Placement

- **`/systems`:** FAQ section at the end of the page, after Growth and Outreach. Add
  `{ label: 'FAQ', href: '#faq' }` to the AnchorNav.
- **`/learn`:** FAQ section between Courses and "Looking for something else?" (which remains the
  closing catch-all). Add FAQ to the AnchorNav.
- **`/workshops/[slug]`:** shared FAQ between "What we'll cover" and the closing `CTASection`.
  Two answers interpolate the workshop's own `skillLevel` and `format` frontmatter so each
  page's FAQ and schema are accurate per workshop.

## Content

### Systems FAQ

1. **How much does a website cost?**
   Website packages start at $750 (Starter), $1,500 (Standard), and $2,500 (Growth). Final
   pricing depends on scope, complexity, and timeline — and every project starts with a free
   20-minute discovery call, so you get a clear price in plain language before anything begins.
2. **Why don't the transformation packages list a price?**
   Because no two organizations start from the same place. Each package bundles the build,
   practical AI, integrations, and training into one outcome, so we scope and price it after a
   free discovery call — in plain language, with no surprises.
3. **Do I need to know what I need before booking a call?**
   No — that is what the call is for. In 20 minutes we learn about your goals and your current
   setup, and give you an honest picture of what would actually help and what you can skip.
4. **Will my team be able to update the website ourselves?**
   Yes. Every site is built on WordPress and delivered with hands-on training and documentation,
   so your team can edit pages, post updates, and add events without calling a developer.
5. **Who owns everything once it's built?**
   You do. Your site, your accounts, your keys — with documentation to match. We build systems
   for you to own, not to keep you dependent on us.
6. **What happens after launch?**
   Handoff and training are part of every project, so your team is ready from day one. If you
   want continued help, ongoing maintenance and support is available from $150/month.

### Learn FAQ

1. **I'm not comfortable with technology — can I still join?**
   Yes. Our programs accommodate all levels, including complete beginners. We teach in plain
   language, at your pace, and build the confidence to keep going on your own.
2. **Are sessions in person or online?**
   Both. We deliver in person across the Vancouver and Greater Vancouver area — partnership
   delivery means we come to your organization, your space, your community — and many programs
   also run online.
3. **How long do programs run?**
   Workshops run 90 minutes to a half day, as a single session or a multi-week series. Courses
   are multi-session programs of 4–6 hours total that build something functional by the end.
4. **What do programs cost?**
   It depends on the format and how it is delivered. Provincial and federal funding covers many
   of these programs — especially digital skills and AI upskilling for specific communities —
   and we help you identify what applies. [Link: Explore funded partnerships → /partnerships]
5. **Can you run a program just for our organization or community?**
   Yes. Partnership delivery and custom engagements are how most of our programs run — shaped
   around your community, sector, or cohort, at your space or online.
6. **What if I don't see the topic I need?**
   More workshops are in development, and we also offer one-on-one tutoring and mentorship,
   small group instruction, and team training. If you have something specific in mind,
   [get in touch → /contact] — the answer is probably yes.

### Workshop detail FAQ (shared; interpolated fields in braces)

1. **How do I join this workshop?**
   [Request it through our contact page → /contact?inquiry=Learn]. Workshops run three ways:
   in partnership with organizations, as open public sessions, and as custom engagements for
   specific groups.
2. **Can you bring this workshop to our organization?**
   Yes — partnership delivery means we come to your organization, your space, your community.
   Funded partnerships can often cover the cost. [Explore funded partnerships → /partnerships]
3. **What skill level do I need?**
   {workshop.skillLevel}
4. **How long is it, and is it online or in person?**
   {workshop.format}

## Out of scope

- Partnerships page FAQ (possible later pass).
- Dedicated `/faq` page.
- Course detail pages (still deferred).
- Any answers requiring facts not yet published (build timelines, group sizes, public session
  pricing, languages, hosting costs).

## Verification

- `npm run build` + `npx astro check` pass.
- Preview: accordion opens/closes with keyboard and pointer; icon rotation disabled under
  reduced motion; questions ≥18px bold sentence case; contrast pairs are audited ones.
- JSON-LD on all three page types validates as `FAQPage` (well-formed JSON, question/answer
  text matches visible content, no HTML in schema text).
- `docs/design-system.md` updated with the FAQ casing exception.
