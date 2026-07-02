# Rize Skill Training Astro Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Rize Digital Jekyll site as a new Astro site, rebranded to Rize Skill Training (weallrize.ca), with a custom "Bold & Optimistic" Tailwind design system and all V4 copy across 5 pages + Contact.

**Architecture:** Astro static site, TypeScript, Tailwind CSS v4 (CSS-first `@theme`). Shared `.astro` components compose each page. Workshops and courses come from typed Content Collections. Copy is taken verbatim from `Rize_Skill_Training_Website_Copy_V4.md` (referenced per section) with V4 tone rules already satisfied. Deploys to Vercel as a plain static build.

**Tech Stack:** Astro 5, Tailwind CSS v4 (`@tailwindcss/vite`), TypeScript, Fontsource (Space Grotesk + Inter), `@astrojs/sitemap`, Web3Forms.

**Reference docs:** Spec at `docs/superpowers/specs/2026-07-02-rize-astro-rebuild-design.md`. Copy at `Rize_Skill_Training_Website_Copy_V4.md`.

**Note on "tests":** This is a static marketing site; there is no unit-test harness. The verification step for each task is `npm run build` succeeding plus a visual check via `npm run dev`. Content-collection schemas are validated by Astro at build time — a bad schema fails the build, which is our test.

---

## Phase 0 — Scaffold & foundation

### Task 1: Preserve Jekyll, scaffold Astro in place

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore` (update), `src/pages/index.astro` (temp)
- Remove (git rm, kept in history): `_config.yml`, `Gemfile`, `Gemfile.lock`, `_layouts/`, `_includes/`, `_data/`, `_sass/`, `index.html`, `learn.html`, `build.html`, `grow.html`, `connect.html`, `rize.html`, `work.html`, `404.html`, `_posts/`, `_projects/`, `assets/css/styles.scss`, `package-lock.json`

- [ ] **Step 1: Create a branch**

```bash
git checkout -b astro-rebuild
```

- [ ] **Step 2: Move reusable assets aside before removing Jekyll**

Keep the image/logo/video assets — only Jekyll templating is being removed. Move `assets/` to `public/` (Astro serves `public/` at site root, preserving `/assets/...` URLs).

```bash
mkdir -p public
git mv assets public/assets
```

- [ ] **Step 3: Remove Jekyll files**

```bash
git rm -r _config.yml Gemfile Gemfile.lock _layouts _includes _data _sass \
  index.html learn.html build.html grow.html connect.html rize.html work.html \
  404.html _posts _projects public/assets/css/styles.scss package-lock.json
```

- [ ] **Step 4: Initialize Astro package.json**

Create `package.json`:

```json
{
  "name": "rize-skill-training",
  "type": "module",
  "version": "0.1.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/sitemap": "^3.2.0",
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "@fontsource-variable/space-grotesk": "^5.1.0",
    "@fontsource-variable/inter": "^5.1.0"
  },
  "devDependencies": {
    "typescript": "^5.6.0"
  }
}
```

- [ ] **Step 5: Install**

Run: `npm install`
Expected: dependencies installed, `node_modules/` and `package-lock.json` created.

- [ ] **Step 6: Create astro.config.mjs**

```js
// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://weallrize.ca',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 7: Create tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 8: Update .gitignore**

Ensure it contains:

```
node_modules/
dist/
.astro/
.DS_Store
.vercel/
```

- [ ] **Step 9: Create a temporary home page to verify the build**

Create `src/pages/index.astro`:

```astro
---
---
<html lang="en">
  <head><meta charset="utf-8" /><title>Rize Skill Training</title></head>
  <body><h1>Rize Skill Training — build OK</h1></body>
</html>
```

- [ ] **Step 10: Verify build**

Run: `npm run build`
Expected: PASS — `dist/index.html` produced, no errors.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro project, remove Jekyll (kept in history)"
```

---

### Task 2: Tailwind v4 theme + global styles + fonts

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create the global stylesheet with the design tokens**

Create `src/styles/global.css`:

```css
@import 'tailwindcss';
@import '@fontsource-variable/space-grotesk';
@import '@fontsource-variable/inter';

@theme {
  --color-brand-red: #E23B2B;
  --color-brand-sun: #FFB23E;
  --color-brand-blue: #2F5E8A;
  --color-paper: #FBF7F2;
  --color-ink: #1B1B1F;

  --color-stone-100: #F2EFE9;
  --color-stone-200: #E4E0D8;
  --color-stone-300: #CFC9BE;
  --color-stone-500: #8A8378;
  --color-stone-700: #55504A;

  --font-display: 'Space Grotesk Variable', system-ui, sans-serif;
  --font-body: 'Inter Variable', system-ui, sans-serif;

  --radius-pill: 9999px;
}

@layer base {
  html {
    scroll-behavior: smooth;
    background-color: var(--color-paper);
    color: var(--color-ink);
    font-family: var(--font-body);
  }
  h1, h2, h3, h4 {
    font-family: var(--font-display);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.02em;
  }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
  }
}
```

- [ ] **Step 2: Verify Tailwind picks up the theme**

Update the temp `src/pages/index.astro` body to `<body class="bg-paper text-ink"><h1 class="text-brand-red font-display">Rize Skill Training</h1></body>` and add `import '../styles/global.css';` in the frontmatter fence.

Run: `npm run dev`, open the local URL.
Expected: heading renders in Space Grotesk, red on paper background.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add Bold & Optimistic Tailwind v4 theme and global styles"
```

---

### Task 3: BaseLayout with SEO

**Files:**
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create BaseLayout.astro**

```astro
---
import '../styles/global.css';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
}
const { title, description, ogImage = '/assets/images/social/og-default.jpg' } = Astro.props;
const canonical = new URL(Astro.url.pathname, Astro.site).href;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <link rel="icon" href="/assets/images/favicon/favicon.ico" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:url" content={canonical} />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body class="bg-paper text-ink antialiased">
    <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-brand-sun">Skip to content</a>
    <Header />
    <main id="main">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 2: Verify** — build will fail until Header/Footer exist (Task 4). Defer verification to Task 4 Step 3.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add BaseLayout with SEO meta and skip link"
```

---

## Phase 1 — Shared components

### Task 4: Header + Footer

**Files:**
- Create: `src/components/Header.astro`, `src/components/Footer.astro`
- Create: `src/data/nav.ts`

- [ ] **Step 1: Create nav data**

Create `src/data/nav.ts`:

```ts
export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Learn', href: '/learn' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
];
export const contactLink = { name: 'Contact', href: '/contact' };
```

- [ ] **Step 2: Create Header.astro (with mobile toggle)**

```astro
---
import { navLinks, contactLink } from '../data/nav';
const path = Astro.url.pathname;
const isActive = (href: string) => href === '/' ? path === '/' : path.startsWith(href);
---
<header class="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-stone-200">
  <div class="mx-auto max-w-6xl px-4 flex items-center justify-between h-16">
    <a href="/" class="flex items-center">
      <img src="/assets/images/logo/rize-logo.svg" alt="Rize Skill Training" class="h-8" />
    </a>
    <nav class="hidden md:flex items-center gap-6">
      {navLinks.map((l) => (
        <a href={l.href} class:list={["font-medium hover:text-brand-red", isActive(l.href) && "text-brand-red"]}>{l.name}</a>
      ))}
      <a href={contactLink.href} class="rounded-pill bg-brand-red text-white px-5 py-2 font-semibold hover:bg-ink transition-colors">{contactLink.name}</a>
    </nav>
    <button id="nav-toggle" class="md:hidden p-2" aria-label="Open menu" aria-expanded="false">
      <span class="block w-6 h-0.5 bg-ink mb-1.5"></span>
      <span class="block w-6 h-0.5 bg-ink mb-1.5"></span>
      <span class="block w-6 h-0.5 bg-ink"></span>
    </button>
  </div>
  <div id="mobile-menu" class="hidden md:hidden border-t border-stone-200 bg-paper px-4 py-4 flex-col gap-3">
    {[...navLinks, contactLink].map((l) => (
      <a href={l.href} class="block py-2 font-medium">{l.name}</a>
    ))}
  </div>
</header>
<script>
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('mobile-menu');
  toggle?.addEventListener('click', () => {
    const open = menu?.classList.toggle('hidden');
    toggle.setAttribute('aria-expanded', String(!open));
    menu?.classList.toggle('flex');
  });
</script>
```

- [ ] **Step 3: Create Footer.astro (with land acknowledgment)**

Copy the land-acknowledgment wording from `Rize_Skill_Training_Website_Copy_V4.md` (About page LAND ACKNOWLEDGMENT section) and the Nations links.

```astro
---
const year = new Date().getFullYear();
const socials = [
  { label: 'Facebook', url: 'https://facebook.com/WeAllRize' },
  { label: 'Instagram', url: 'https://instagram.com/WeAllRize' },
  { label: 'LinkedIn', url: 'https://linkedin.com/company/WeAllRize' },
];
---
<footer class="bg-ink text-paper mt-24">
  <div class="mx-auto max-w-6xl px-4 py-14 grid gap-10 md:grid-cols-3">
    <div>
      <img src="/assets/images/logo/rize-logo-outlined.svg" alt="Rize Skill Training" class="h-9 mb-4" />
      <p class="text-stone-300">Technology for the people. Vancouver &amp; the Greater Vancouver area.</p>
      <a href="mailto:holler@weallrize.ca" class="text-brand-sun font-semibold">holler@weallrize.ca</a>
    </div>
    <nav class="flex flex-col gap-2">
      <a href="/learn" class="hover:text-brand-sun">Learn</a>
      <a href="/services" class="hover:text-brand-sun">Services</a>
      <a href="/funded-partnerships" class="hover:text-brand-sun">Funded Partnerships</a>
      <a href="/about" class="hover:text-brand-sun">About</a>
      <a href="/contact" class="hover:text-brand-sun">Contact</a>
    </nav>
    <div class="flex flex-col gap-2">
      {socials.map((s) => <a href={s.url} target="_blank" rel="noopener" class="hover:text-brand-sun">{s.label}</a>)}
    </div>
  </div>
  <div class="border-t border-stone-700/40">
    <div class="mx-auto max-w-6xl px-4 py-6 text-sm text-stone-300 space-y-2">
      <p>We are grateful to live and work on the unceded territories of the
        <a href="https://www.musqueam.bc.ca/" target="_blank" rel="noopener" class="underline">Musqueam</a>,
        <a href="https://www.squamish.net/" target="_blank" rel="noopener" class="underline">Squamish</a>, and
        <a href="https://twnation.ca/" target="_blank" rel="noopener" class="underline">Tsleil-Waututh</a> Nations.</p>
      <p>&copy; {year} Rize Skill Training. All rights reserved.</p>
    </div>
  </div>
</footer>
```

- [ ] **Step 4: Wire BaseLayout into the temp index and verify**

Replace `src/pages/index.astro` with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Rize Skill Training" description="Technology training for Vancouver.">
  <section class="mx-auto max-w-6xl px-4 py-20"><h1 class="text-5xl text-brand-red">Home placeholder</h1></section>
</BaseLayout>
```

Run: `npm run build` then `npm run dev`.
Expected: PASS — header (with working mobile toggle), footer with land acknowledgment render.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Header (with mobile nav) and Footer (with land acknowledgment)"
```

---

### Task 5: Presentational primitives — Button, SectionHeading, Hero, CTASection

**Files:**
- Create: `src/components/Button.astro`, `src/components/SectionHeading.astro`, `src/components/Hero.astro`, `src/components/CTASection.astro`

- [ ] **Step 1: Button.astro**

```astro
---
interface Props { href: string; variant?: 'primary' | 'secondary' | 'ghost'; }
const { href, variant = 'primary' } = Astro.props;
const styles = {
  primary: 'bg-brand-red text-white hover:bg-ink',
  secondary: 'bg-brand-blue text-white hover:bg-ink',
  ghost: 'bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper',
};
---
<a href={href} class:list={["inline-block rounded-pill px-6 py-3 font-semibold transition-colors", styles[variant]]}>
  <slot />
</a>
```

- [ ] **Step 2: SectionHeading.astro**

```astro
---
interface Props { eyebrow?: string; title: string; align?: 'left' | 'center'; }
const { eyebrow, title, align = 'left' } = Astro.props;
---
<div class:list={["max-w-3xl mb-10", align === 'center' && 'mx-auto text-center']}>
  {eyebrow && <p class="uppercase tracking-widest text-sm font-semibold text-brand-red mb-3">{eyebrow}</p>}
  <h2 class="text-4xl md:text-5xl">{title}</h2>
  <div class="mt-6 text-lg text-stone-700 space-y-4"><slot /></div>
</div>
```

- [ ] **Step 3: Hero.astro**

```astro
---
interface Props { title: string; }
const { title } = Astro.props;
---
<section class="bg-ink text-paper">
  <div class="mx-auto max-w-6xl px-4 py-24 md:py-32">
    <h1 class="text-5xl md:text-7xl max-w-4xl">{title}</h1>
    <div class="mt-8 text-xl text-stone-300 max-w-2xl"><slot name="lead" /></div>
    <div class="mt-10 flex flex-wrap gap-4"><slot name="actions" /></div>
  </div>
</section>
```

Note: hero titles in V4 sometimes join two sentences (e.g. "The technology is here.Let's make it work for you."). Split into two lines in each page's usage with a `<br />`.

- [ ] **Step 4: CTASection.astro**

```astro
---
interface Props { title: string; }
const { title } = Astro.props;
---
<section class="bg-brand-red text-white">
  <div class="mx-auto max-w-6xl px-4 py-20 text-center">
    <h2 class="text-4xl md:text-5xl mb-6">{title}</h2>
    <div class="text-lg max-w-2xl mx-auto mb-8"><slot name="body" /></div>
    <div class="flex flex-wrap gap-4 justify-center"><slot name="actions" /></div>
  </div>
</section>
```

- [ ] **Step 5: Verify** — Run: `npm run build`. Expected: PASS (unused components compile).

- [ ] **Step 6: Commit**

```bash
git add src/components/Button.astro src/components/SectionHeading.astro src/components/Hero.astro src/components/CTASection.astro
git commit -m "feat: add Button, SectionHeading, Hero, CTASection primitives"
```

---

### Task 6: Composite components — Steps, AnchorNav, PricingTable

**Files:**
- Create: `src/components/Steps.astro`, `src/components/AnchorNav.astro`, `src/components/PricingTable.astro`

- [ ] **Step 1: Steps.astro** (numbered process; used by Home "How It Works" and Services "How It Works")

```astro
---
interface Step { title: string; body: string; }
interface Props { steps: Step[]; }
const { steps } = Astro.props;
---
<ol class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
  {steps.map((s, i) => (
    <li class="rounded-2xl bg-white border border-stone-200 p-6">
      <span class="inline-flex h-10 w-10 items-center justify-center rounded-pill bg-brand-sun text-ink font-display font-bold">{i + 1}</span>
      <h3 class="text-xl mt-4">{s.title}</h3>
      <p class="mt-2 text-stone-700">{s.body}</p>
    </li>
  ))}
</ol>
```

- [ ] **Step 2: AnchorNav.astro** (sticky in-page nav for Learn and Services)

```astro
---
interface Anchor { label: string; href: string; }
interface Props { anchors: Anchor[]; }
const { anchors } = Astro.props;
---
<nav class="sticky top-16 z-40 bg-paper/95 backdrop-blur border-y border-stone-200">
  <div class="mx-auto max-w-6xl px-4 flex gap-6 overflow-x-auto py-3 text-sm font-semibold">
    {anchors.map((a) => <a href={a.href} class="whitespace-nowrap hover:text-brand-red">{a.label}</a>)}
  </div>
</nav>
```

- [ ] **Step 3: PricingTable.astro** (tiers + optional add-ons)

```astro
---
interface Tier { name: string; price: string; detail: string; }
interface AddOn { name: string; price: string; }
interface Props { tiers: Tier[]; addOns?: AddOn[]; accent?: 'red' | 'blue'; }
const { tiers, addOns, accent = 'red' } = Astro.props;
const ring = accent === 'red' ? 'border-brand-red' : 'border-brand-blue';
---
<div class="grid gap-6 md:grid-cols-3">
  {tiers.map((t) => (
    <div class:list={["rounded-2xl border-2 bg-white p-6", ring]}>
      <h4 class="text-xl">{t.name}</h4>
      <p class="mt-2 text-3xl font-display font-bold">{t.price}</p>
      <p class="mt-3 text-stone-700">{t.detail}</p>
    </div>
  ))}
</div>
{addOns && (
  <ul class="mt-8 grid gap-2 sm:grid-cols-2">
    {addOns.map((a) => (
      <li class="flex justify-between rounded-xl bg-stone-100 px-4 py-3">
        <span>{a.name}</span><span class="font-semibold">{a.price}</span>
      </li>
    ))}
  </ul>
)}
```

- [ ] **Step 4: Verify** — Run: `npm run build`. Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Steps.astro src/components/AnchorNav.astro src/components/PricingTable.astro
git commit -m "feat: add Steps, AnchorNav, PricingTable components"
```

---

### Task 7: AudiencePicker + ProgramCard

**Files:**
- Create: `src/components/AudiencePicker.astro`, `src/components/ProgramCard.astro`

- [ ] **Step 1: AudiencePicker.astro** (Home "Start Here" 3-path block)

```astro
---
interface Path { heading: string; body: string; ctaLabel: string; ctaHref: string; accent: 'red' | 'blue' | 'sun'; }
interface Props { paths: Path[]; }
const { paths } = Astro.props;
const bar = { red: 'bg-brand-red', blue: 'bg-brand-blue', sun: 'bg-brand-sun' };
---
<div class="grid gap-6 md:grid-cols-3">
  {paths.map((p) => (
    <div class="flex flex-col rounded-2xl bg-white border border-stone-200 overflow-hidden">
      <span class:list={["h-2", bar[p.accent]]}></span>
      <div class="flex flex-col flex-1 p-6">
        <h3 class="text-xl">{p.heading}</h3>
        <p class="mt-3 text-stone-700 flex-1">{p.body}</p>
        <a href={p.ctaHref} class="mt-6 font-semibold text-brand-red hover:text-ink">{p.ctaLabel} &rarr;</a>
      </div>
    </div>
  ))}
</div>
```

- [ ] **Step 2: ProgramCard.astro** (Home Programs Overview — track-colored)

```astro
---
interface Props { track: 'community' | 'career'; title: string; hook: string; audience: string; }
const { track, title, hook, audience } = Astro.props;
const accent = track === 'community' ? 'bg-brand-red' : 'bg-brand-blue';
---
<div class="rounded-2xl bg-white border border-stone-200 p-6">
  <span class:list={["inline-block rounded-pill px-3 py-1 text-xs font-semibold text-white", accent]}>
    {track === 'community' ? 'Community & Everyday Life' : 'Career, Work & Growth'}
  </span>
  <h3 class="text-2xl mt-4">{title}</h3>
  <p class="mt-3 text-stone-700">{hook}</p>
  <p class="mt-3 text-sm text-stone-500">{audience}</p>
</div>
```

- [ ] **Step 3: Verify** — Run: `npm run build`. Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/AudiencePicker.astro src/components/ProgramCard.astro
git commit -m "feat: add AudiencePicker and ProgramCard components"
```

---

## Phase 2 — Content collections

### Task 8: Define collections + workshop entries

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/workshops/{digital-confidence,stay-safe-online,future-proof-your-career,ai-and-modern-workflows}.md`

- [ ] **Step 1: Define schemas**

Create `src/content.config.ts`:

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const workshops = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/workshops' }),
  schema: z.object({
    track: z.enum(['community', 'career']),
    title: z.string(),
    tagline: z.string(),
    summary: z.string(),
    whoFor: z.array(z.string()),
    outcomes: z.array(z.string()),
    skillLevel: z.string(),
    format: z.string(),
    requestCtaLabel: z.string().default('Request This Workshop'),
    order: z.number(),
  }),
});

const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    whoFor: z.array(z.string()),
    topics: z.array(z.string()),
    outcomes: z.array(z.string()),
    order: z.number(),
  }),
});

export const collections = { workshops, courses };
```

- [ ] **Step 2: Create the 4 workshop entries**

For each, copy the exact fields from `Rize_Skill_Training_Website_Copy_V4.md` → PAGE: LEARNING → SECTION: WORKSHOPS. Example `src/content/workshops/digital-confidence.md`:

```md
---
track: community
title: Digital Confidence
tagline: Everyday technology skills for people who want to feel more in control online.
summary: >-
  Most technology training assumes people already know the basics. This workshop
  starts from the beginning and builds real confidence with the tools people use
  every day — at a pace that works for everyone in the room.
whoFor:
  - Seniors ready to get more comfortable with smartphones, email, and video calling
  - Newcomers to Canada navigating digital services and online accounts
  - People returning to the workforce and building their digital presence
  - Community members ready to engage more fully with technology in daily life
outcomes:
  - Confidence using email, smartphones, browsers, and video calling tools
  - The ability to manage online accounts safely and independently
  - A foundation for continued learning at your own pace
skillLevel: Accommodating all levels, including complete beginners.
format: 90 minutes to half-day. In-person or online. Single session or multi-week series.
order: 1
---
```

Create the other three the same way:
- `stay-safe-online.md` (track: community, order: 2)
- `future-proof-your-career.md` (track: career, order: 3)
- `ai-and-modern-workflows.md` (track: career, order: 4)

Pull `tagline`, `summary`, `whoFor`, `outcomes`, `skillLevel`, `format` verbatim from the matching V4 workshop block.

- [ ] **Step 3: Verify schema** — Run: `npm run build`. Expected: PASS (a schema mismatch would fail the build).

- [ ] **Step 4: Commit**

```bash
git add src/content.config.ts src/content/workshops
git commit -m "feat: add workshops content collection with 4 entries"
```

---

### Task 9: Course entries

**Files:**
- Create: `src/content/courses/{entrepreneurs-in-motion,organizations-that-move-people,creative-work-amplified}.md`

- [ ] **Step 1: Create the 3 course entries**

For each, copy from `Rize_Skill_Training_Website_Copy_V4.md` → PAGE: LEARNING → SECTION: COURSES. Example `src/content/courses/entrepreneurs-in-motion.md`:

```md
---
title: Entrepreneurs in Motion
tagline: >-
  For people building their own business, freelance practice, or side project —
  and ready to use technology to build faster, reach further, and work smarter.
whoFor:
  - Early-stage founders and solo entrepreneurs
  - Freelancers and independent service providers
  - Side project builders ready to professionalize their work
  - Small business owners who want to modernize their operations
topics:
  - Building your digital presence — website, social media, and local search
  - Automating internal workflows using AI and tools like n8n and Slack
  - Automating sales and marketing processes — email sequences, lead capture, follow-up
  - Developing business strategies with AI-assisted research and planning tools
  - Identifying and researching new business opportunities using AI
outcomes:
  - A working digital presence tailored to your business
  - At least one automated workflow saving you time every week
  - A clear strategy for using AI in your day-to-day operations
  - Tools, templates, and prompts you can keep building on
order: 1
---
```

Create `organizations-that-move-people.md` (order: 2) and `creative-work-amplified.md` (order: 3) with their verbatim `whoFor`, `topics`, `outcomes`.

- [ ] **Step 2: Verify** — Run: `npm run build`. Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/content/courses
git commit -m "feat: add courses content collection with 3 entries"
```

---

### Task 10: Collection render components — WorkshopCard, CourseCard

**Files:**
- Create: `src/components/WorkshopCard.astro`, `src/components/CourseCard.astro`

- [ ] **Step 1: WorkshopCard.astro**

```astro
---
import type { CollectionEntry } from 'astro:content';
interface Props { workshop: CollectionEntry<'workshops'>['data']; }
const { workshop } = Astro.props;
const accent = workshop.track === 'community' ? 'border-brand-red' : 'border-brand-blue';
---
<article class:list={["rounded-2xl border-l-4 bg-white shadow-sm p-6 md:p-8", accent]}>
  <h3 class="text-2xl">{workshop.title}</h3>
  <p class="mt-2 font-semibold text-brand-red">{workshop.tagline}</p>
  <p class="mt-4 text-stone-700">{workshop.summary}</p>
  <div class="mt-6 grid gap-6 md:grid-cols-2">
    <div>
      <h4 class="font-display text-sm uppercase tracking-wide text-stone-500">Who this is for</h4>
      <ul class="mt-2 space-y-1 text-stone-700 list-disc pl-5">
        {workshop.whoFor.map((i) => <li>{i}</li>)}
      </ul>
    </div>
    <div>
      <h4 class="font-display text-sm uppercase tracking-wide text-stone-500">What you will walk away with</h4>
      <ul class="mt-2 space-y-1 text-stone-700 list-disc pl-5">
        {workshop.outcomes.map((i) => <li>{i}</li>)}
      </ul>
    </div>
  </div>
  <p class="mt-6 text-sm text-stone-500">{workshop.skillLevel}<br />{workshop.format}</p>
  <a href="/contact?inquiry=Learn" class="mt-6 inline-block font-semibold text-brand-red hover:text-ink">{workshop.requestCtaLabel} &rarr;</a>
</article>
```

- [ ] **Step 2: CourseCard.astro**

```astro
---
import type { CollectionEntry } from 'astro:content';
interface Props { course: CollectionEntry<'courses'>['data']; }
const { course } = Astro.props;
---
<article class="rounded-2xl bg-white border border-stone-200 shadow-sm p-6 md:p-8">
  <h3 class="text-2xl">{course.title}</h3>
  <p class="mt-2 text-stone-700">{course.tagline}</p>
  <div class="mt-6 grid gap-6 md:grid-cols-3">
    <div>
      <h4 class="font-display text-sm uppercase tracking-wide text-stone-500">Who this course is for</h4>
      <ul class="mt-2 space-y-1 text-stone-700 list-disc pl-5">{course.whoFor.map((i) => <li>{i}</li>)}</ul>
    </div>
    <div>
      <h4 class="font-display text-sm uppercase tracking-wide text-stone-500">Topics covered</h4>
      <ul class="mt-2 space-y-1 text-stone-700 list-disc pl-5">{course.topics.map((i) => <li>{i}</li>)}</ul>
    </div>
    <div>
      <h4 class="font-display text-sm uppercase tracking-wide text-stone-500">What you will walk away with</h4>
      <ul class="mt-2 space-y-1 text-stone-700 list-disc pl-5">{course.outcomes.map((i) => <li>{i}</li>)}</ul>
    </div>
  </div>
</article>
```

- [ ] **Step 3: Verify** — Run: `npm run build`. Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/WorkshopCard.astro src/components/CourseCard.astro
git commit -m "feat: add WorkshopCard and CourseCard render components"
```

---

## Phase 3 — Pages

> For every page: copy is **verbatim** from `Rize_Skill_Training_Website_Copy_V4.md` under the matching PAGE heading. Do not paraphrase — tone rules are already satisfied in the source. Use `<br />` to split the joined hero titles. Wrap each page in `BaseLayout` with the SEO title/description below.

### Task 11: Home page (`/`)

**Files:**
- Modify: `src/pages/index.astro` (replace temp content)

SEO title: `Rize Skill Training | Technology Workshops, Courses & Services in Vancouver`
Description: `Practical, accessible technology workshops, courses, and services for people, community organizations, and entrepreneurs across Vancouver and the Greater Vancouver area.`

- [ ] **Step 1: Build the page** using these components in order (copy from V4 HOMEPAGE sections):
  1. `Hero` — title "The technology is here.<br />Let's make it work for you.", lead = HERO paragraph, actions = Button "Explore Our Programs" → `/learn`, Button secondary "Partner With Us" → `/funded-partnerships`.
  2. Start Here — `SectionHeading` (title "Not sure where to start?") + `AudiencePicker` with the 3 paths (community org → `/funded-partnerships` accent red; entrepreneur → `/services` accent blue; individual → `/learn` accent sun). Copy each heading/body/CTA verbatim.
  3. Mission — `SectionHeading` title "Technology for the people." + the 3 MISSION paragraphs.
  4. Programs Overview — `SectionHeading` title "What we offer." + intro; then 4 `ProgramCard`s (Digital Confidence, Stay Safe Online = community; Future-Proof Your Career, AI and Modern Workflows = career) using hook + audience lines; then Buttons "See All Programs" → `/learn` and "Bring a Program to Your Organization" → `/funded-partnerships`.
  5. Funded Partnerships teaser — `SectionHeading` + copy + Button "Explore Funded Partnerships" → `/funded-partnerships`.
  6. How It Works — `SectionHeading` title "How working with us works." + `Steps` with the 4 steps (verbatim title + body) + Button "Get in Touch" → `/contact`.
  7. Services teaser — `SectionHeading` title "We also build websites and workflows." + link to `/services`.
  8. About teaser — `SectionHeading` title "Built in East Vancouver. Rooted in community." + copy + land line + link to `/about`.
  9. `CTASection` title "Ready to get started?" body + Button "Get in Touch" → `/contact`; show `holler@weallrize.ca`.

- [ ] **Step 2: Verify** — Run: `npm run build` then `npm run dev`. Expected: PASS, all 9 sections render, mobile responsive.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: build Home page with V4 copy"
```

---

### Task 12: About page (`/about`)

**Files:**
- Create: `src/pages/about.astro`

SEO title: `About Rize Skill Training | Technology Education Rooted in East Vancouver`
Description: `Founded by an AI specialist and educator with 20+ years of experience, Rize Skill Training brings accessible technology education to communities across Vancouver.`

- [ ] **Step 1: Build the page** from V4 PAGE: ABOUT, in order:
  1. `Hero` — title "Built in East Vancouver.<br />Built for community.", lead = HERO paragraph.
  2. Our Story — `SectionHeading` "Our story." + the 4 paragraphs.
  3. What We Believe — `SectionHeading` "What we believe." + 3 paragraphs.
  4. Who We Work With — `SectionHeading` "Who we work with." + intro + the bulleted audience list + closing paragraph.
  5. How We Work — `SectionHeading` "How we work." + 5 value blocks (People first / Community rooted / Honest about technology / Everyone included / More time for what matters) each as a titled card.
  6. Land Acknowledgment — styled band with the LAND ACKNOWLEDGMENT paragraph.
  7. `CTASection` "Want to work together?" + Buttons "Explore Funded Partnerships" → `/funded-partnerships`, "See Our Programs" → `/learn`; show email.

- [ ] **Step 2: Verify** — Run: `npm run build`. Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: build About page with V4 copy"
```

---

### Task 13: Learn page (`/learn`)

**Files:**
- Create: `src/pages/learn.astro`

SEO title: `Workshops & Courses | Digital Skills & AI Training in Vancouver`
Description: `Technology workshops and multi-session courses built around real outcomes — digital confidence, online safety, AI workflows, and more. Vancouver and area.`

- [ ] **Step 1: Query collections in frontmatter**

```astro
---
import { getCollection } from 'astro:content';
const workshops = (await getCollection('workshops')).sort((a, b) => a.data.order - b.data.order);
const courses = (await getCollection('courses')).sort((a, b) => a.data.order - b.data.order);
const communityWorkshops = workshops.filter((w) => w.data.track === 'community');
const careerWorkshops = workshops.filter((w) => w.data.track === 'career');
---
```

- [ ] **Step 2: Build sections** from V4 PAGE: LEARNING:
  1. `Hero` — title "Programs built around<br />real outcomes.", lead = HERO paragraph.
  2. How Our Programs Work — `SectionHeading` + Workshops/Courses/Delivery/Funded blocks + Button "Explore Funded Partnerships" → `/funded-partnerships`.
  3. `AnchorNav` anchors: Workshops `#workshops`, Courses `#courses`, Looking for Something Else? `#more`.
  4. `#workshops` — `SectionHeading` "Workshops." then a "Track 1: Community and Everyday Life" subhead + `communityWorkshops` mapped to `WorkshopCard`, then "Track 2: Career, Work, and Growth" subhead + `careerWorkshops`.
  5. `#courses` — `SectionHeading` "Courses." + intro paragraphs + Button "Talk to Us About a Course" → `/contact` + `courses` mapped to `CourseCard` + the "Additional course tracks in development" line.
  6. `#more` — `SectionHeading` "Looking for something else?" + the 2 paragraphs + Button "Get in Touch" → `/contact`; show email.

- [ ] **Step 3: Verify** — Run: `npm run build` then `npm run dev`. Expected: PASS — 4 workshops + 3 courses render from collections, anchor links jump correctly.

- [ ] **Step 4: Commit**

```bash
git add src/pages/learn.astro
git commit -m "feat: build Learn page rendering workshops and courses from collections"
```

---

### Task 14: Services page (`/services`)

**Files:**
- Create: `src/pages/services.astro`

SEO title: `Website & Automation Services | Rize Skill Training Vancouver`
Description: `Websites, automation systems, and digital marketing for community organizations, nonprofits, small businesses, and entrepreneurs in Vancouver. Clear pricing.`

- [ ] **Step 1: Define pricing data in frontmatter** (verbatim from V4 pricing blocks):

```astro
---
const orgTiers = [
  { name: 'Starter', price: 'from $750', detail: 'Up to 5 pages.' },
  { name: 'Standard', price: 'from $1,500', detail: 'Up to 10 pages, events or blog section, email integration.' },
  { name: 'Growth', price: 'from $2,500', detail: 'Up to 20 pages, donation system, custom content types, team training.' },
];
const bizTiers = [
  { name: 'Starter', price: 'from $750', detail: 'Up to 5 pages.' },
  { name: 'Standard', price: 'from $1,500', detail: 'Up to 10 pages, blog or booking integration, CRM setup.' },
  { name: 'Growth', price: 'from $2,500', detail: 'Up to 20 pages, custom features, automations, team training.' },
];
const bizAddOns = [
  { name: 'AI-assisted copywriting (up to 5 pages)', price: '$300' },
  { name: 'Brand identity (logo, colors, fonts, usage guide)', price: '$400' },
  { name: 'Bilingual site (English + French or other)', price: 'from $500' },
  { name: 'Accessibility audit and remediation', price: '$350' },
  { name: 'Local SEO and AI visibility package', price: 'from $400' },
  { name: 'Ongoing maintenance and support', price: 'from $150/month' },
];
---
```

- [ ] **Step 2: Build sections** from V4 PAGE: SERVICES:
  1. `Hero` — title "Services that make<br />your organization stronger.", lead + Button "Book a Free Discovery Call" → `/contact`.
  2. `AnchorNav` anchors: For Organizations `#organizations`, For Businesses `#businesses`, Integrations and Automations `#automations`, Growth and Outreach `#growth`.
  3. How It Works — `SectionHeading` + the 4 bullet steps + Button.
  4. `#organizations` — `SectionHeading` "For Organizations." + intro + grant-writing paragraph + the 3 service blocks (Community and Nonprofit Websites / Events and Programming Sites / Grant Writing Assistance, each with its bullet list) + `PricingTable` accent="red" tiers={orgTiers} + Button.
  5. `#businesses` — `SectionHeading` "For Businesses." + intro + 3 service blocks (Booking and Appointment Sites / Local Business Sites / Creative Portfolio Sites) + `PricingTable` accent="blue" tiers={bizTiers} addOns={bizAddOns} + Button.
  6. `#automations` — `SectionHeading` "Integrations and Automations." + copy + "What we connect" list + "What this looks like in practice" list + Button.
  7. `#growth` — `SectionHeading` "Growth and Outreach." + 3 blocks (Digital Marketing Strategy / Local Search and AI Visibility / Community Engagement) + Button; show email.

- [ ] **Step 3: Verify** — Run: `npm run build`. Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/pages/services.astro
git commit -m "feat: build Services page with pricing and anchor sections"
```

---

### Task 15: Funded Partnerships page (`/funded-partnerships`)

**Files:**
- Create: `src/pages/funded-partnerships.astro`

SEO title: `Funded Partnerships | Technology Training for Nonprofits in Vancouver`
Description: `Provincial and federal funding is available now for digital skills and AI upskilling. We help Vancouver community organizations bring funded workshops and courses to the people they serve.`

- [ ] **Step 1: Build the page.** No single V4 "Funded Partnerships" page block exists — assemble from these V4 sources (all verbatim):
  1. `Hero` — title "Bring funded programs<br />to your community.", lead adapted from HOMEPAGE → FUNDED PARTNERSHIPS opening ("Provincial and federal programs are actively funding…"). Button "Get in Touch" → `/contact`.
  2. The model — `SectionHeading` + the HOMEPAGE FUNDED PARTNERSHIPS paragraphs ("We help you identify the funding…", "We work with community organizations…", "You bring the community. We bring the program…").
  3. Who we work with — the list of org types from that section (community organizations, nonprofits, Indigenous-led groups, Black community organizations, libraries, employment centers, social service agencies).
  4. Grant Writing Assistance — reuse the SERVICES → FOR ORGANIZATIONS → Grant Writing Assistance block (heading + 4 bullets).
  5. How it works — `Steps` reusing the HOMEPAGE HOW IT WORKS 4 steps.
  6. `CTASection` "Let's bring a program to your community." + Button "Get in Touch" → `/contact`; show email.

- [ ] **Step 2: Verify** — Run: `npm run build`. Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/pages/funded-partnerships.astro
git commit -m "feat: build Funded Partnerships conversion page"
```

---

### Task 16: Contact page (`/contact`) + ContactForm

**Files:**
- Create: `src/components/ContactForm.astro`, `src/pages/contact.astro`

SEO title: `Contact Rize Skill Training | Vancouver Technology Training`
Description: `Bring a program to your community, register for a session, or explore our services. Get in touch with Rize Skill Training in Vancouver.`

- [ ] **Step 1: ContactForm.astro** (Web3Forms; V4 fields: Name, Organization optional, Email, Message; keep inquiry prefill from `?inquiry=`)

```astro
---
---
<form action="https://api.web3forms.com/submit" method="POST" class="grid gap-4 max-w-xl">
  <input type="hidden" name="access_key" value="REPLACE_WITH_WEB3FORMS_KEY" />
  <input type="hidden" name="subject" value="New enquiry — weallrize.ca" />
  <div>
    <label for="name" class="block font-semibold mb-1">Full name *</label>
    <input id="name" name="name" required class="w-full rounded-xl border border-stone-300 px-4 py-3 bg-white" />
  </div>
  <div>
    <label for="organization" class="block font-semibold mb-1">Organization (optional)</label>
    <input id="organization" name="organization" class="w-full rounded-xl border border-stone-300 px-4 py-3 bg-white" />
  </div>
  <div>
    <label for="email" class="block font-semibold mb-1">Email *</label>
    <input id="email" name="email" type="email" required class="w-full rounded-xl border border-stone-300 px-4 py-3 bg-white" />
  </div>
  <div>
    <label for="message" class="block font-semibold mb-1">Message *</label>
    <textarea id="message" name="message" rows="5" required class="w-full rounded-xl border border-stone-300 px-4 py-3 bg-white"></textarea>
  </div>
  <input type="hidden" name="inquiry" id="inquiry" value="" />
  <button type="submit" class="rounded-pill bg-brand-red text-white px-6 py-3 font-semibold hover:bg-ink transition-colors w-fit">Send message</button>
</form>
<script>
  const inquiry = new URL(window.location.href).searchParams.get('inquiry');
  if (inquiry) (document.getElementById('inquiry') as HTMLInputElement).value = inquiry;
</script>
```

Note: replace `REPLACE_WITH_WEB3FORMS_KEY` with the real Web3Forms access key before launch (owner to provide).

- [ ] **Step 2: contact.astro** — `Hero` title "Let's talk.", lead from HOMEPAGE FINAL CTA copy; two-column: intro text + email `holler@weallrize.ca` on one side, `ContactForm` on the other.

- [ ] **Step 3: Verify** — Run: `npm run build` then `npm run dev`. Expected: PASS — form renders, `?inquiry=Learn` prefills the hidden field.

- [ ] **Step 4: Commit**

```bash
git add src/components/ContactForm.astro src/pages/contact.astro
git commit -m "feat: build Contact page with Web3Forms form"
```

---

## Phase 4 — Finish

### Task 17: 404 page + rebrand sweep

**Files:**
- Create: `src/pages/404.astro`
- Audit: entire `src/`

- [ ] **Step 1: Create 404.astro** — `BaseLayout` + centered "Page not found" + Button "Back to home" → `/`.

- [ ] **Step 2: Rebrand grep** — confirm no stale references remain.

Run: `grep -rin "rize digital\|rizedigital\|rizedigital.ca" src public/assets 2>/dev/null`
Expected: no matches. If the logo SVG files contain the text "Rize Digital" as vector paths, leave them (logo is a placeholder to be swapped) but note it.

Run: `grep -rin "holler@rizedigital" src`
Expected: no matches.

- [ ] **Step 3: Verify** — Run: `npm run build`. Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add 404 page; complete rebrand sweep"
```

---

### Task 18: OG image, robots, final build verification

**Files:**
- Create: `public/robots.txt`
- Verify: `public/assets/images/social/og-default.jpg` exists (referenced by BaseLayout)

- [ ] **Step 1: robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://weallrize.ca/sitemap-index.xml
```

- [ ] **Step 2: Confirm OG image exists** — Run: `ls public/assets/images/social/`. If no default OG image, create/copy one to `og-default.jpg` (owner may replace later).

- [ ] **Step 3: Full build + link check**

Run: `npm run build`
Expected: PASS — pages emitted: `index`, `about`, `learn`, `services`, `funded-partnerships`, `contact`, `404`, plus `sitemap-index.xml`.

- [ ] **Step 4: Visual QA pass** — Run: `npm run dev`, walk every page at mobile (375px) and desktop widths. Confirm: nav active states, anchor jumps, workshop/course rendering, pricing tables, contact form prefill, footer land acknowledgment.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: add robots.txt and finalize build"
```

---

### Task 19: Vercel deploy config

**Files:**
- Create: `README.md` (deploy notes)

- [ ] **Step 1: Confirm no adapter needed** — static `dist/` output; Vercel auto-detects Astro. No `astro.config` change required.

- [ ] **Step 2: README with deploy + launch checklist**

Document: `npm install`, `npm run dev`, `npm run build`; Vercel project settings (framework preset "Astro", output `dist/`); domain `weallrize.ca`; and the launch TODOs: real Web3Forms key, real OG image, new logo swap, Google Business Profile.

- [ ] **Step 3: Commit + open PR**

```bash
git add README.md
git commit -m "docs: add README with deploy and launch checklist"
git push -u origin astro-rebuild
```

Then open a PR from `astro-rebuild` to `main`.

---

## Post-implementation notes (deferred, from spec "Out of scope")

- Individual workshop/course detail pages (add `[slug].astro` routes reading the collections; the schemas already support this).
- Public schedule / registration page.
- Funding resources page.
- FAQ schema on detail pages.
- Educators and Trainers course track ("coming soon").
