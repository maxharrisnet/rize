# Funded Partnerships Page — Content Design

**Date:** 2026-07-04
**Status:** Approved
**Page:** `/funded-partnerships` (`src/pages/funded-partnerships.astro`)

## Goal
Turn the first-pass assembly into the real conversion page for community-org partners:
explain the model, show funding **generally** (types by segment, no named programs), add a
people-first "built around your team" section, and keep grant-writing + how-it-works + who-we-serve.

Named programs live only in the private grant tracker (Google Sheet), never on the public page —
programs and deadlines change too often. The page stays evergreen.

## Section map (in order)
1. **Hero** — "Bring funded programs to your community." + lead (funding is active now; we find it, apply, deliver — often little/no cost). CTA → /contact.
2. **The model** — "How funded partnerships work." 3 colored bento blocks: *You bring the community* / *We bring the program* / *We bring the funding strategy*.
3. **Funding by who you serve** — "Funding for the communities you serve." Intro + 5 white bento cards (ink outline, colored icon chip) from `src/data/funding.ts`, described **generally, no program names**: Seniors · Black-led organizations · Indigenous communities · Job seekers & workforce · Community orgs & nonprofits. Closing reassurance line: "Programs change constantly — we track what's currently open and match it to your community."
4. **Built around your team and your community** (NEW) — intro + 4 white bento cards: build *with* your team; tailor to the group (cultural/linguistic/accessibility); your mission comes first; people before technology.
5. **Grant writing assistance** — verbatim service copy + 4 bullets (identify funding → co-write → program-design docs → reporting templates).
6. **How it works** — the 4 Steps (Reach out → Design together → Deliver → Keep momentum).
7. **Who we work with** — org-type list (community orgs, nonprofits, Indigenous-led, Black-led, libraries, employment centers, social service agencies).
8. **CTA** — "Let's find the funding for your community." + email + contact.

## Data
`src/data/funding.ts` exports `fundingGroups: { title, body, icon (ph:*-bold), accent: 'red'|'blue'|'gold' }[]`.
Page maps over it — updating funding messaging is a one-file edit.

## Style / components
Reuse: `BaseLayout`, `Hero`, `SectionHeading`, `Steps`, `CTASection`, `Button`, Phosphor `Icon`.
Bento: `rounded-[14px] border-2 border-ink`, colored icon chips (ink text on gold, white on red/blue),
all-caps card titles, `text-body-muted` body. Full Kripa/Bold system. No program names, amounts, or
deadlines anywhere on the page.

## Tone (V4 rules)
Positive framing; people-first; name communities specifically; no "empower/leverage/solutions".
General funding language only — no promises of specific dollar amounts or eligibility guarantees.

## Out of scope
Named-program list, live deadlines/amounts (these stay in the private tracker).
