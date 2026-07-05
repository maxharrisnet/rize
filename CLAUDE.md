# Rize Skill Training — project guide

Astro 5 static site (rebranded from the old Jekyll "Rize Digital"). Tailwind CSS v4,
TypeScript, content collections for workshops/courses, deploys to Vercel. Requires
**Node ≥ 22.12** — run `nvm use` (`.nvmrc` pins 22) before `npm` commands.

Full design reference: [`docs/design-system.md`](docs/design-system.md). Read it before any UI work.
Business overview (brief explainer): [`docs/business-overview.md`](docs/business-overview.md).
Business strategy & positioning (source of truth): [`docs/strategy.md`](docs/strategy.md). Read before
major copy or offering work; keep it updated as strategy evolves.
Offering & grant detail (source of truth; also portable context for other AI tools): [`docs/offerings-learn.md`](docs/offerings-learn.md),
[`docs/offerings-systems.md`](docs/offerings-systems.md), [`docs/grant-strategy.md`](docs/grant-strategy.md). Keep updated as offerings develop.

## Design system rules (non-negotiable)

**Accessibility is a hard constraint. Never ship UI that violates these.**

### Contrast — WCAG 2.1 AA minimum
- Every text/background pairing must meet **≥4.5:1** (normal text) or **≥3:1** (large text:
  ≥24px normal, or ≥18.66px bold). Prefer AAA where practical.
- **When introducing or changing any text-on-color pairing, compute the ratio first.** Do not
  eyeball it. If unsure, run a contrast check (WCAG relative-luminance formula).
- Use only the audited pairings in `docs/design-system.md`. Forbidden:
  - White text on `brand-gold` (#F2C14E) — use `ink` on gold.
  - `brand-red` text on `blush` at body size (4.46:1) — red on blush only for large headings.
  - Muted text lighter than `meta-muted` #6B5D4C on cream.
- Muted text colors are fixed: body = `#3D332B`, meta/caption = `#6B5D4C`. Don't invent lighter grays.

### Sizing — accessible & responsive
- **No user-facing text below 18px (1.125rem)** for body, headings, cards, and buttons. (Sole
  exception: the secondary in-page `AnchorNav` runs at 16px — it is a compact utility nav.)
- Size type with the `clamp()` scale tokens in `global.css`. **Never raw `vw`** (breaks zoom /
  WCAG 1.4.4) and never hardcoded px for type — always the rem-based `clamp()` tokens.

### Type & casing
- **Rubik** only, weights **400 / 700 / 900**. Headings = 900; buttons/eyebrows/card titles/meta = 700; body = 400.
- **All titles, buttons, and navigation are ALL CAPS.** Body copy stays sentence case.

### Color & surfaces
- Tokens: `brand-red #BE2A1A`, `brand-blue #2C63A8`, `brand-gold #F2C14E`, `cream #FBF2E6`,
  `ink #1A1712`, `blush #F6D9D2`. Use tokens, never ad-hoc hex.
- Track/audience: Community & Organizations → red; Career, Businesses & Entrepreneurs → blue.
- Bento blocks/cards: 2px `ink` outline, 14px radius. Buttons: 12px. Pills/chips: full-round.
- No hard offset "neo-brutalist" shadows — the ink outline carries structure.

### Motion
- All animations must honor `prefers-reduced-motion: reduce` (disable transforms, fall back to a
  plain state swap). The base guard lives in `global.css` — keep it.

### Icons
- `astro-icon` + Iconify, primary set **Phosphor bold** (`ph:*-bold`). Decorative → `aria-hidden`;
  icon-only controls → `aria-label`.

## Copy / tone (from the V4 deck)
- Positive framing; people-first; outcomes-led. Name communities specifically (never "BIPOC").
- Avoid: "empower", "leverage", "cutting-edge", "innovative", "solutions".
- Consistent list/nav grammar. "Vancouver and Greater Vancouver area"; "East Vancouver" on Home/About.

## Workflow
- Branch off `main`; commit/push only when asked. Co-author trailer: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Verify with `npm run build` + `npx astro check` before considering UI work done.
