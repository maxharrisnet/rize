# Rize Skill Training — Design System

Kripa-inspired ("Bold & Optimistic"): warm cream canvas, heavy Rubik all-caps headlines,
rounded bento blocks with thin ink outlines, a confident red-led palette, playful
sticker/marquee moments, and elegant motion. Accessibility is a hard constraint, not a
nice-to-have — the audience includes seniors, newcomers, and low-vision users.

Reference: WPKoi "Kripa" demo (https://wpkoi.com/demos/kripa-premium/).

---

## Fonts

- **Rubik** only, self-hosted via Fontsource. Weights: **400, 700, 900** (no others).
- **All titles and buttons are ALL CAPS** (`text-transform: uppercase`). Body stays sentence case.
- Headings: weight **900**. Buttons / eyebrows / card titles / meta: **700**. Body: **400**.

## Type scale

Fluid via `clamp()` with **rem** floors/ceilings (never raw `vw` — it breaks user zoom / WCAG 1.4.4).
**Hard floor: no user-facing text below 18px (1.125rem).**

| Role | Token | clamp() | Range | Weight | Case |
| --- | --- | --- | --- | --- | --- |
| Display / hero | `--fs-display` | `clamp(2.75rem, 1.3rem + 6.6vw, 7rem)` | 44 → 112px | 900 | UPPER |
| H1 page title | `--fs-h1` | `clamp(2.25rem, 1.4rem + 4vw, 3.5rem)` | 36 → 56px | 900 | UPPER |
| H2 section | `--fs-h2` | `clamp(1.9rem, 1.2rem + 3vw, 3.25rem)` | 30 → 52px | 900 | UPPER |
| H3 card title | `--fs-h3` | `clamp(1.375rem, 1.1rem + 1vw, 1.75rem)` | 22 → 28px | 700 | UPPER |
| Eyebrow | `--fs-eyebrow` | `1.125rem` (fixed) | 18px | 700 | UPPER, tracking .14em |
| Body large | `--fs-body-lg` | `clamp(1.25rem, 1.15rem + 0.4vw, 1.5rem)` | 20 → 24px | 400 | sentence |
| Body | `--fs-body` | `clamp(1.125rem, 1.08rem + 0.2vw, 1.25rem)` | 18 → 20px | 400 | sentence |
| Meta / caption | `--fs-meta` | `1.125rem` (fixed) | 18px | 700 | UPPER, tracking .04em |

Line-heights: display/h1/h2 ≈ 0.9–1.0; body ≈ 1.6. Letter-spacing tightens on big type (≈ -0.02em).

## Color tokens

| Token | Hex | Role |
| --- | --- | --- |
| `brand-red` | `#BE2A1A` | Primary — CTAs, links, eyebrows, red bento blocks, Community/Organizations |
| `brand-blue` | `#2C63A8` | Support — blue bento blocks, Career/Businesses |
| `brand-gold` | `#F2C14E` | Warm accent — gold blocks, tape, highlights |
| `cream` | `#FBF2E6` | Page background |
| `ink` | `#1A1712` | Text; dark sections/blocks |
| `blush` | `#F6D9D2` | Soft red tint for full-bleed section blocks |
| `white` | `#FFFFFF` | Card surfaces |
| `body-muted` | `#3D332B` | Body copy on cream (11.1:1 — AAA) |
| `meta-muted` | `#6B5D4C` | Muted meta/caption on cream (~4.7:1 — AA). **Never lighter than this.** |

Track / audience mapping: Community & Organizations → red; Career, Businesses & Entrepreneurs → blue.

## Contrast — audited pairings (WCAG 2.1)

AA minimum everywhere: **≥4.5:1 normal text, ≥3:1 large text** (large = ≥24px normal OR ≥18.66px bold).
Verified with the audit in this repo's history:

| Foreground on background | Ratio | Verdict |
| --- | --- | --- |
| ink on cream | 16.1 | AAA |
| body-muted `#3D332B` on cream | 11.1 | AAA |
| meta-muted `#6B5D4C` on cream | ~4.7 | AA |
| ink on white | 17.9 | AAA |
| white on brand-red | 5.94 | AA |
| white on brand-blue | 6.07 | AA |
| ink on brand-gold | 10.6 | AAA |
| white on ink | 17.9 | AAA |
| brand-red on white | 5.94 | AA |
| brand-blue on cream | 5.48 | AA |
| ink on blush | 13.4 | AAA |

### Forbidden pairings
- **White text on `brand-gold`** — gold is light; always use `ink` on gold.
- **`brand-red` text on `blush` or `cream` at any size** — designer preference: red text lives **only on white** backgrounds. On blush/cream, use `ink` text; red may appear as a graphic accent instead (underline `decoration-brand-red`, IconList dots, Badge ring, chips/icons).
- **`blush` as a card/section background — retired** (designer preference, July 2026). Use `white` for feature blocks and banners, `cream` for inset/secondary cards on white or beside white cards.
- Any muted text lighter than `meta-muted #6B5D4C` on cream.

## Surfaces, radius, outlines

- Page: `cream`. Cards/blocks: `white` or a brand color.
- Bento blocks / cards: **2px `ink` outline**, `border-radius: 14px`.
- Buttons: `border-radius: 12px`. Chips/pills/badges: `9999px`. Marquee tape: no radius.
- No hard offset "neo-brutalist" shadows (deliberately skipped — the ink outline carries the structure).

## Components

### Two-plane button
All caps, weight 700, ≥18px, high contrast in **both** rest and hover. Two background "planes"
and two text "states" slide vertically (WPKoi hover-effect-2). A hidden sizer keeps both labels
perfectly centered.

```html
<button class="btn">
  <span class="btn__sizer">Explore programs</span>
  <span class="btn__plane btn__plane--a" style="background:var(--color-brand-gold)"></span>
  <span class="btn__plane btn__plane--b" style="background:var(--color-ink)"></span>
  <span class="btn__state btn__state--a" style="color:var(--color-ink)">Explore programs</span>
  <span class="btn__state btn__state--b" style="color:#fff">Let's go →</span>
</button>
```
```css
.btn{position:relative;display:inline-block;overflow:hidden;border:2px solid var(--color-ink);
  border-radius:12px;font-weight:700;font-size:1.125rem;text-transform:uppercase;letter-spacing:.01em;cursor:pointer;background:none}
.btn__sizer{display:block;padding:14px 30px;white-space:nowrap;visibility:hidden}
.btn__plane{position:absolute;inset:0;z-index:0;transition:transform .36s cubic-bezier(.5,.12,.46,.88)}
.btn__plane--b{transform:translateY(101%)}
.btn__state{position:absolute;inset:0;z-index:1;display:flex;align-items:center;justify-content:center;
  white-space:nowrap;transition:transform .36s cubic-bezier(.5,.12,.46,.88)}
.btn__state--b{transform:translateY(101%)}
.btn:hover .btn__plane--a,.btn:hover .btn__state--a{transform:translateY(-101%)}
.btn:hover .btn__plane--b,.btn:hover .btn__state--b{transform:translateY(0)}
```
Approved plane pairings: gold↔ink, red↔ink, ink↔gold. (Never a light↔light pair.)

### Bento card
2px ink outline, 14px radius, brand-colored or white fill, an icon chip top-left, H3 title (caps),
body text. Text color: white on red/blue/ink; ink on gold/blush/white.

### Icon chip
44px circle; on a colored block use a white chip with the block's color as the icon
(`background:#fff; color:var(--block)`), or an ink chip with a gold icon on gold blocks.

### Sticker badge / marquee tape
Spinning badge (dashed ring or starburst, slow `rotate` loop) and diagonal marquee tape
(`gold` band, 2px ink borders, ~-2.5° rotation, horizontally scrolling heavy caps).

## Icons

- **`astro-icon` + Iconify**, primary set **Phosphor "bold"** (`ph:*-bold`).
- Inlined as SVG (no icon-font bloat, fully colorable). Example: `<Icon name="ph:laptop-bold" />`.
- Decorative icons: `aria-hidden`. Icon-only controls: `aria-label`.

## Motion

Vocabulary: two-plane button dip (`.36s cubic-bezier(.5,.12,.46,.88)`); marquee tape;
spinning badge; elegant section/accordion expand; image caption marquees.

**All motion must respect `prefers-reduced-motion: reduce`** — disable transforms/animations
and fall back to a simple state swap. This is already scaffolded in `global.css`.
