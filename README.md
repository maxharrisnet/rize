# Rize Skill Training

Marketing site for **Rize Skill Training** — technology workshops, courses, and services for people, community organizations, and entrepreneurs across Vancouver and the Greater Vancouver area.

Built with [Astro](https://astro.build) (static output), TypeScript, and Tailwind CSS v4. Deploys to Vercel.

## Local development

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:4321)
npm run build    # production build to dist/
npm run preview  # preview the production build locally
npx astro check  # type-check .astro files
```

## Project structure

```
src/
  components/     # presentational + composite components (Hero, Button, PricingTable, cards, …)
  content/
    workshops/    # one Markdown entry per workshop (typed via src/content.config.ts)
    courses/      # one Markdown entry per course
  content.config.ts
  data/nav.ts     # header/footer navigation
  layouts/BaseLayout.astro   # <head>, SEO meta, header/footer
  pages/          # index, about, learn, services, funded-partnerships, contact, 404
  styles/global.css          # Tailwind v4 @theme design tokens ("Bold & Optimistic")
public/
  assets/         # images, logos, videos, favicon (served at /assets/...)
  robots.txt
```

### Content collections

Workshops and courses are typed Content Collections. To add or edit one, drop/edit a Markdown file in `src/content/workshops/` or `src/content/courses/` following the existing frontmatter shape (validated at build time by `src/content.config.ts`). The Learn page renders them automatically, sorted by `order`.

### Design system

Tokens live in `src/styles/global.css` under `@theme` (Tailwind v4 is CSS-first — no `tailwind.config.js`). Key colors: `brand-red` `#E23B2B`, `brand-sun` `#FFB23E`, `brand-blue` `#2F5E8A`, `paper` `#FBF7F2`, `ink` `#1B1B1F`. Display font: Space Grotesk; body: Inter (self-hosted via Fontsource). Track/audience accents: Community & Organizations use red; Career & Businesses use blue.

## Deployment (Vercel)

Static build — Vercel auto-detects Astro. Project settings:

- **Framework preset:** Astro
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Domain:** `weallrize.ca`

No adapter is required for the static build. Add a `vercel.json` only if custom redirects/headers become necessary.

## Launch checklist (owner action required)

- [ ] **Web3Forms key** — replace `REPLACE_WITH_WEB3FORMS_KEY` in `src/components/ContactForm.astro` with a real [Web3Forms](https://web3forms.com) access key so the contact form delivers to `holler@weallrize.ca`.
- [ ] **OG/social image** — replace the placeholder at `public/assets/images/social/og-default.jpg` with real branded artwork (recommended 1200×630).
- [ ] **Logo** — the current `public/assets/images/logo/rize-logo.svg` (and `rize-logo-outlined.svg` in the footer) are reused placeholders; swap in the new Rize Skill Training mark when ready.
- [ ] **Google Business Profile** — create under "Rize Skill Training" with an East Vancouver address (per SEO priorities).
- [ ] **Point `weallrize.ca` DNS at Vercel** and verify the domain.

## Notes

- `npx astro check` reports one pre-existing, cosmetic type error in `astro.config.mjs` (a Vite plugin type mismatch between nested Vite versions from the Tailwind plugin). It does not affect the build.
- The previous Jekyll site remains in git history prior to the `astro-rebuild` branch.
