# Rize Skill Training — Astro Rebuild Design

**Date:** 2026-07-02
**Status:** Approved (pending spec review)
**Source copy:** `Rize_Skill_Training_Website_Copy_V4.md` (V4 FINAL)

## Overview

Rebuild the current Jekyll site (`Rize Digital`, rizedigital.ca) from scratch as a
new **Astro** site for the rebranded **Rize Skill Training** (weallrize.ca). This is a
full redesign, full rebrand, and information-architecture change — not a copy swap.

Rize Skill Training offers technology workshops, courses, and services to individuals,
community organizations, and entrepreneurs across Vancouver and the Greater Vancouver
area, with a focus on communities that have historically had the least support.

### Decisions locked during brainstorming

| Decision | Choice |
| --- | --- |
| Framework | Astro (latest) + TypeScript |
| Styling | Tailwind CSS v4, **custom** design (no Relume dependency) |
| Visual direction | "Bold & Optimistic" |
| Repo strategy | Fresh Astro project in this repo; remove Jekyll (kept in git history) |
| Structured content | Astro Content Collections for `workshops` and `courses` |
| Rebrand | Full — Rize Skill Training, weallrize.ca, holler@weallrize.ca |
| Deploy target | Vercel (static output) |
| Scope | All 5 pages: Home, About, Learn, Services, Funded Partnerships + Contact |

## Design system — "Bold & Optimistic"

Energetic, confident, high-contrast, rounded. "Together we rise." Accessible (WCAG AA
contrast minimum — the audience includes seniors and newcomers).

### Color tokens

| Token | Hex | Use |
| --- | --- | --- |
| `brand-red` | `#E23B2B` | Primary — CTAs, links, primary accents |
| `brand-sun` | `#FFB23E` | Secondary accent — highlights, tags |
| `brand-blue` | `#2F5E8A` | Support tone — differentiates the two program tracks and the two service audiences |
| `paper` | `#FBF7F2` | Page background |
| `ink` | `#1B1B1F` | Body text; dark section backgrounds |
| Stone scale | neutrals | Borders, muted text, surfaces |
| `white` | `#FFFFFF` | Card surfaces |

Track/audience color assignment:
- Program **Track 1: Community and Everyday Life** → `brand-blue`
- Program **Track 2: Career, Work, and Growth** → `brand-red`
- Services **For Organizations** → `brand-blue`
- Services **For Businesses** → `brand-red`

### Typography

- **Display:** Space Grotesk (bold, uppercase-friendly headlines)
- **Body:** Inter
- Self-hosted via Fontsource for performance and offline builds.

### Visual language

- Rounded corners: pill buttons, `rounded-2xl` cards.
- Generous type scale, bright color blocks, high contrast.
- Subtle scroll/entrance motion (respect `prefers-reduced-motion`).

## Technical architecture

- **Astro** static output (`output: 'static'`), TypeScript, Tailwind CSS v4 (Vite plugin).
- **Vercel** deployment (`@astrojs/vercel` static adapter or plain static — static preferred).
- **Content Collections** (`src/content/`):
  - `workshops` — drives the Learn page Workshops section and future per-workshop detail pages.
  - `courses` — drives the Learn page Courses section and future per-course detail pages.
  - Services and pricing remain page-structural (not a collection) for now.
- **Contact form:** Web3Forms (works with static hosting). Fields: Name, Organization
  (optional), Email, Message. Replace the placeholder access key with a real one.
- **SEO:** per-page title tag + meta description; sitemap (`@astrojs/sitemap`); Open Graph
  tags. FAQ schema on workshop/course pages deferred until detail pages exist.
- Jekyll files (`_layouts`, `_includes`, `_data`, `_sass`, `*.html`, `_config.yml`,
  `Gemfile*`) removed from the working tree; preserved in git history.

### Project structure (target)

```
src/
  components/
    Button.astro
    Header.astro          # desktop + mobile nav
    Footer.astro          # includes land acknowledgment
    Hero.astro
    SectionHeading.astro
    AudiencePicker.astro   # Home "Start Here" 3-path
    ProgramCard.astro      # program overview cards (track-colored)
    WorkshopCard.astro     # renders a workshops collection entry
    CourseCard.astro       # renders a courses collection entry
    Steps.astro            # "How it works" numbered steps
    PricingTable.astro     # pricing tiers + add-ons
    AnchorNav.astro        # in-page anchor nav (Learn, Services)
    CTASection.astro
    ContactForm.astro
  content/
    workshops/*.md
    courses/*.md
    config.ts              # collection schemas
  layouts/
    BaseLayout.astro       # head, SEO meta, header/footer slots
  pages/
    index.astro            # Home
    about.astro
    learn.astro
    services.astro
    funded-partnerships.astro
    contact.astro
  styles/
    global.css             # Tailwind entry + custom properties
astro.config.mjs
tailwind config (v4 = CSS-based)
```

### Content collection schemas

```ts
// workshops
{
  track: "community" | "career",
  title: string,
  tagline: string,          // one-line hook
  summary: string,          // intro paragraph
  whoFor: string[],         // "Who this is for"
  outcomes: string[],       // "What you will walk away with"
  skillLevel: string,
  format: string,
  requestCtaLabel: string,  // e.g. "Request This Workshop"
  order: number,
}

// courses
{
  title: string,
  tagline: string,          // "For people building..." framing line
  whoFor: string[],         // "Who this course is for"
  topics: string[],         // "Topics covered"
  outcomes: string[],       // "What you will walk away with"
  order: number,
}
```

Workshop entries (from V4): Digital Confidence, Stay Safe Online (Track 1);
Future-Proof Your Career, AI and Modern Workflows (Track 2).
Course entries (from V4): Entrepreneurs in Motion, Organizations That Move People,
Creative Work Amplified.

## Page → section map

All copy comes verbatim (with tone rules applied) from `Rize_Skill_Training_Website_Copy_V4.md`.

### Home (`/`)
Hero → Start Here (AudiencePicker, 3 paths) → Mission ("Technology for the people.") →
Programs Overview (2 tracks, ProgramCards) → Funded Partnerships → How It Works (4 Steps) →
Services teaser → About teaser (with land acknowledgment line) → Final CTA + contact form.

### About (`/about`)
Hero → Our Story → What We Believe → Who We Work With (audience list) →
How We Work (5 values) → Land Acknowledgment → CTA.

### Learn (`/learn`)
Hero → How Our Programs Work → AnchorNav (Workshops | Courses | Looking for Something Else?) →
Workshops (from `workshops` collection, grouped by track) →
Courses (from `courses` collection) → "Looking for Something Else?" CTA.

### Services (`/services`)
Hero + AnchorNav (For Organizations | For Businesses | Integrations and Automations |
Growth and Outreach) → How It Works → For Organizations (services + pricing) →
For Businesses (services + pricing + add-ons) → Integrations and Automations →
Growth and Outreach.

### Funded Partnerships (`/funded-partnerships`)
Net-new page. The funded-partnership model, who it's for, available provincial/federal
funding, grant-writing assistance as a named service, how to apply, CTA. Key conversion
page for community-org partners.

### Contact (`/contact`)
Web3Forms contact form (Name, Organization optional, Email, Message) + holler@weallrize.ca.

### Navigation
Home · Learn · Services · About · Contact (Contact styled as a button, per current pattern).

## Rebrand checklist

- Name: Rize Digital → **Rize Skill Training** everywhere.
- Domain: rizedigital.ca → **weallrize.ca**.
- Email: holler@rizedigital.ca → **holler@weallrize.ca**.
- Social handles already `@WeAllRize` (Facebook, Instagram, LinkedIn) — carry forward.
- Per-page SEO titles/descriptions rewritten for the new brand and local SEO priorities
  (digital literacy workshops Vancouver, online safety East Vancouver, AI training
  Vancouver, technology training nonprofits Vancouver, WordPress website nonprofit
  Vancouver, etc.).
- Logo: reuse existing Rize lettermark/logo SVGs from `assets/images/logo/` unless a new
  mark is provided.

## Tone rules (applied to all copy)

- Positive framing — reframe "less/not/no" into what people gain.
- People first; technology is the means, impact/confidence/community the ends.
- Outcomes-led — every section states what people walk away with.
- Never use "BIPOC"; name communities specifically.
- Automation framing: technology frees people for high-level human work, never replacement.
- Avoid: "empower", "leverage", "cutting-edge", "innovative", "solutions".
- Consistent list/nav grammar — all nouns or all verbs, never mixed.
- "Vancouver and Greater Vancouver area" throughout; "East Vancouver" on Home and About.
- Entrepreneur/professional audiences appear as often as community-org audiences.

## Out of scope (this pass)

- Individual workshop and course detail pages (after curriculum outlines exist).
- Workshop registration / public schedule page (once schedule confirmed).
- Funding resources page (deferred).
- FAQ schema (added with detail pages).
- Educators and Trainers course track (deferred; "coming soon" note only).
- Confirmed V3 cuts: Sales sub-service, Venture/Startup profile, Directory profile,
  standalone Office Hours.

## Success criteria

- All 5 pages + Contact build and render with V4 copy and the Bold & Optimistic system.
- Workshops and courses render from content collections.
- Fully responsive, WCAG AA contrast, `prefers-reduced-motion` respected.
- Rebrand complete — no "Rize Digital" or rizedigital.ca references remain.
- `astro build` passes; deploys to Vercel as a static site.
