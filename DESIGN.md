---
version: 1.0
name: Mindfulness Handbook — Web Edition
description: A warm-paper wellness system. Light geometric sans for reading, an italic serif "accent word" for feeling, one terracotta accent, pill buttons, arch-shaped frames and slow, breath-paced motion. Built to turn a printed handbook into a calm long-scroll website.

colors:
  paper: "#fffcf7"        # elevated cards, reader band
  cream: "#f6f0e6"        # default canvas
  cream-2: "#efe6d8"
  blush: "#f8ebe4"        # soft panels, callouts, feedback band
  blush-2: "#f3dcd2"
  rose: "#e0a596"         # decorative only (numerals, focus glow)
  terracotta: "#b65a4f"   # THE accent: fills, large text, ticker (white text 4.6:1)
  terra-ink: "#a34a40"    # small accent text on cream (5.1:1), deep panels
  terra-deep: "#8f4038"   # hover/pressed on solid
  clay-light: "#f0b7a8"   # accent on dark surfaces
  olive: "#6f7a4a"        # illustration + "saved" state
  sage: "#c5cdb0"
  sand: "#e3cfb4"
  gold: "#d4a55a"         # illustration only
  ink: "#3a302b"          # headings (11.3:1 on cream)
  ink-soft: "#5e534c"     # body (6.6:1 on cream)
  muted: "#72675e"        # captions (4.8:1 on cream)
  line: "#e4d8c8"         # hairlines
  dusk: "#3b2f2a"         # practice band, player
  charcoal: "#2b2522"     # footer
  on-dark: "#f6efe7"
  on-dark-soft: "#cfc3b8"

typography:
  sans: Jost (300 / 400 / 500)          # stand-in for a light geometric sans
  serif: Fraunces italic (300 / 400)    # accent words, numerals, prompts, quotes
  display:  { family: sans, size: "clamp(2.6rem, 6.6vw, 5.9rem)", weight: 300, lineHeight: 1.04, tracking: "-0.025em" }
  h2:       { family: sans, size: "clamp(1.9rem, 3.7vw, 3.15rem)", weight: 300, lineHeight: 1.12 }
  lead:     { family: sans, size: "clamp(1.22rem, 1.9vw, 1.48rem)", weight: 300, lineHeight: 1.55 }
  body:     { family: sans, size: 17px, weight: 400, lineHeight: 1.7 }
  eyebrow:  { family: sans, size: 12px, weight: 500, tracking: "0.24em", case: uppercase }
  button:   { family: sans, size: 12px, weight: 500, tracking: "0.18em", case: uppercase }
  card-title: { family: sans, size: 15.7px, weight: 500, tracking: "0.15em", case: uppercase, color: terra-ink }
  accent:   { family: serif, style: italic, weight: 300, color: terracotta }

rounded:
  pill: 999px            # every button, chip, tab
  card: 24px             # practice boxes, journal cards, disclaimer
  callout: 20px
  arch: "999px 999px 24px 24px"   # signature frame for art and portraits
  full: 50%              # stat badges, orbs, icon buttons

spacing:
  base: 8px
  page-pad: "clamp(16px, 4vw, 72px)"
  section-pad: "clamp(72px, 10vw, 144px)"
  max-width: 1240px
  reading-width: 740px

motion:
  ease: "cubic-bezier(.22, .61, .36, 1)"
  ease-in-out: "cubic-bezier(.65, 0, .35, 1)"
  breath: "cubic-bezier(.45, 0, .55, 1)"
  hover: 300–400ms
  reveal: 1100ms, 90ms stagger
  art-hover: 1.2–2s
  ambient: 4–36s loops
---

## Overview

The page should feel like opening a well-made paperback in morning light. Every surface is warm paper, never pure white. Type is quiet and light, and each heading carries one word set in italic serif (the **accent word**) that holds the emotion. One accent colour, terracotta, does all the signalling. Everything else is cream, blush, olive and sand, used for surfaces and illustration, never for buttons.

The page scrolls as a sequence of "worlds", so the reader always knows they have moved on:

1. **Dawn**: hero gradient with a rising sun and layered hills
2. **Terracotta ticker**: a moving band of single words
3. **Split**: deep terracotta art panel next to a blush text panel
4. **Cream**: chapter overview, grouped by section, with arch-framed art
5. **Paper**: the reader, where long-form text is set at its most readable
6. **Blush**: link to the Happiness at Work page
7. **Dusk**: breathing guide and guided practices, dark and immersive
8. **Cream**: journal
9. **Terracotta split**: about the handbook
10. **Blush**: next edition and disclaimer
11. **Charcoal**: footer

No two neighbouring bands share a surface. The Happiness at Work page runs dawn hero (compact), terracotta ticker, paper reader, blush link back, charcoal footer.

## Colour rules

- `terracotta` is the only action colour: solid CTA pills, hover fills, the progress bar, active states and accent words.
- Small accent text on cream uses `terra-ink` (#a34a40, 5.1:1), not `terracotta` (4.06:1).
- White text sits only on `terracotta` or darker (ticker, solid pills, author panel uses `terra-ink`).
- Earth tones (olive, sage, sand, gold, rose) live only in illustrations and decoration.
- On dark worlds, accents switch to `clay-light`.

## Typography rules

- **Light sans for facts, italic serif for feeling.** Use the serif only for accent words, chapter numerals, prompts, quotes and the player's guidance.
- Mark accent words in content with `*asterisks*`. Use one per heading, two at most.
- Eyebrows (uppercase, 0.24em tracking) carry context, so headings can stay short.
- Body copy stays at 17px / 1.7 or larger. The source site uses 13px, which is too small for long reading.

## Components

| Component | Notes |
|---|---|
| Pill button | 1px outline in `currentColor`, uppercase tracked label, 46px min height. Hover fills terracotta with white text and nudges the arrow 4px. Variants: `--solid`, `--light` (on dark), `--ghost-light`, `--sm`. |
| Eyebrow | 12px uppercase label in `terra-ink`, 1.1rem below. |
| Ticker | 46px terracotta band, uppercase words separated by 4px dots, a 42s linear loop that pauses on hover. |
| Breath button | 78px glass orb with three staggered pulse rings (3.9s). Hover fills it terracotta. Opens the 1-minute practice. |
| Chapter card | Arch-framed generated art (1:1), meta eyebrow, uppercase terracotta title, 2-line summary and a pill. The whole card is one link. On phones it becomes a compact row. |
| Worksheet | Cream card with a serif-italic title. Pick-three chips, A to D ratings, a weekly checklist or a 2 x 2 planner. Answers autosave in the browser and are included in the download. |
| Info card | Cream card with a serif-italic title and an optional "Build it" note below a hairline. |
| Compare | Two side-by-side panels, cream and blush. Can hold expandable factors. |
| Quiz | Dusk card of scenario questions with pill answers. Right and wrong are marked by text as well as colour. |
| Part tabs | Sticky four-part pill bar on the Happiness at Work page. A swipeable chip row on phones. |
| Topic | Heading sticks in a 300px left column while the content scrolls. Stacks on tablets and phones. |
| Stat badge | Circle with an italic serif number and a tiny uppercase label. |
| Reader | Sticky chapter rail (a chip row on mobile), progress bar, big italic numeral, prev/next pager. Arrow keys turn pages. |
| Practice box | Cream card with numbered serif-italic step circles. Can open the guided player. |
| Callout | Blush card with an eyebrow title and an optional text link. |
| Prompt | Serif-italic question with a lined-paper textarea. Notes autosave in the browser and sync between the chapter and the journal. |
| Reflection deck | All journal questions in one swipeable row. Two cards on desktop, one with the next peeking in on phones. Swipe, drag, use the arrows or jump by section. Segmented bars show position and which questions are answered. |
| Breathing guide | Orb that scales from 0.55 to 1 using the `breath` easing, timed to the phase. Rhythms: Calm 4·6, Box 4·4·4·4, Unwind 4·7·8. |
| Practice card | Full-bleed art, dark bottom scrim, uppercase white title and a light pill. Three across, edge to edge. |
| Guided player | Full-screen dusk dialog with a breathing orb, progress ring, timed step text, pause/resume/restart and optional audio. Focus is trapped inside and Esc closes it. |
| Footer | Charcoal, `clay-light` column titles, Animations switch. |

## Motion

Everything moves at breathing pace. Nothing snaps.

- **Intro**: headline lines rise out of masks (1.25s, 140ms stagger), then the eyebrow, lead and button fade up. The sun rises behind the hills over 3s.
- **Scroll reveals**: 28px rise, 6px blur and fade over 1.1s, staggered 90ms by `--i`.
- **Parallax**: the hill layers drift at 0.10, 0.16 and 0.22 of scroll speed. The hero copy drifts and fades.
- **Ambient**: hero colour blobs drift (24–36s), the ticker loops, and the header's "Breathe" dot breathes (6s).
- **Hover**: each illustration has its own small gesture. Ripples widen, waves slide, the sun rises, the top stone lifts, clouds drift, the leaf sways, the trail flows. Card art also scales 1.045 over 1.4s.
- **Page turn**: the outgoing chapter slides and tilts away (rotateY 7°, blur 3px) and the next one slides in from the other side.
- **Header**: turns cream with a hairline after 24px of scroll, hides on scroll down and returns on scroll up.
- **Calm mode** (`html.reduce-motion`): follows the OS setting until the visitor uses the footer switch. Fades stay. Movement, loops and parallax stop. The breathing guides keep their pace because the visitor starts them.

## Responsive

| Width | Changes |
|---|---|
| > 1080px | 3-up chapters, 4-column footer, 270px reader rail |
| ≤ 1080px | 2-up chapters, 2-column footer |
| ≤ 860px | Split sections stack, the rail becomes a sticky chip row, practice cards and journal go single-column, header is 60px |
| ≤ 600px | Chapter cards become compact rows, cards and worksheets go single-column, pills may wrap, "Breathe" shrinks to a dot, single-column footer |
| ≤ 350px | Wordmark shows only the mark (the name stays for screen readers) |

## Do / Don't

**Do**
- Keep backgrounds warm (cream, blush, paper) and keep white for cards and inputs.
- Use one accent word per heading, set in italic serif.
- Give sections long vertical silences. Empty paper is part of the design.
- Alternate surface worlds down the page.

**Don't**
- Put terracotta on large body text, or earth tones on buttons.
- Set body copy in the serif, or go below 16px for reading text.
- Add hard shadows. Depth comes from surface changes and soft, warm shadows only.
- Animate without an easing, or loop anything faster than a slow breath.

## Where the language came from

| Source | Taken (as a pattern, not copied) | Left behind |
|---|---|---|
| aumlife.in | Cream + terracotta palette family, light sans with italic-serif accent words, uppercase tracked card titles, outline pills that fill on hover, terracotta word ticker, full-bleed split panels, dark-scrim photo cards, pulsing play orb, `cubic-bezier(.22,.61,.36,1)` easing | Their name, logo, photography, copy, fonts (Jeko, Gyst) and 13px body size |
| Oura DESIGN.md | Warm-paper canvas, "serif for feeling, sans for facts", thin display weights, stat circles, soft warm shadows, 24px cards | The single blue CTA (terracotta plays that role here) |
| Claude DESIGN.md | Surface-alternation rule (never repeat a band), cream + dark rhythm, 96–144px section pace | Slab serif, coral |
| Clay DESIGN.md | Generous radii, illustration as the brand's voice, cycling tinted cards | Saturated six-colour card palette |
| Framer DESIGN.md | Motion-first thinking: one atmosphere device per view, pill-only CTAs | Dark-only canvas, extreme negative tracking |
| Notion DESIGN.md | Soft pastel surfaces for callouts | Rectangular buttons |
