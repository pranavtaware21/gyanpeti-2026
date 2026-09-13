---
version: 1
name: gyan-peti-bappa-2026
description: |
  A phone-first devotional journey for a Ganpati decoration, read while standing
  in front of the real thing. The whole document is one continuous surface of
  warm Deccan stone — the Dategad shrine photograph stripped to its grain, laid
  under every screen — and the light travelling across it changes hour as you
  scroll: cold pre-dawn at the QR scan, hot afternoon rock on the climb, शेंदूर
  dusk at the eleven Marutis, one blast of paper-white daylight at ज्ञान, night
  for the decoration reveal, oil-lamp gold at मोरया. Colour is taken from the
  subject, not a palette generator: the murtis are coated in vermilion and the
  Sahyadri is basalt, so the ground is never neutral black and the only
  saturated colour in the piece is the one the sculptures are painted with.
  Photographs are hero material at 70–100% of the viewport, moved in parallax
  depth planes; type is high-contrast Devanagari display over a serif built for
  Marathi. Nothing autoplays, nothing is on a timer, and there is no sound —
  the visitor is standing in a mandap next to speakers.

designRead: >
  Devotional editorial experience for walk-up festival visitors on mid-range
  Android phones in bright outdoor light, with an Indian cinematic language,
  leaning toward native CSS + scroll-driven motion + real photography.

dials:
  DESIGN_VARIANCE: 7   # composed, not chaotic — this is a devotional subject
  MOTION_INTENSITY: 6  # cinematic but scroll-owned, never autoplay
  VISUAL_DENSITY: 3    # photographs and one Marathi sentence at a time

colors:
  # Ground — warm, because vermilion on a cool dark turns grey.
  katal-900: "oklch(21% 0.038 42)"
  katal-800: "oklch(26% 0.050 44)"
  katal-700: "oklch(32% 0.058 46)"
  katal-300: "oklch(68% 0.038 62)"
  katal-100: "oklch(92% 0.024 72)"
  # शेंदूर — the colour the murtis are actually coated in. The only saturated
  # colour in the piece, and it is rationed.
  shendur: "oklch(63% 0.213 38)"
  shendur-hot: "oklch(70% 0.210 44)"
  # Gold, used as leaf only: hairlines, numerals, rules. Never a fill.
  haldi: "oklch(83% 0.150 86)"
  # Paper. Used exactly once, at ज्ञान.
  kagad: "oklch(94% 0.018 84)"
  kagad-ink: "oklch(26% 0.030 60)"
  ghat: "oklch(48% 0.085 148)"

journey:
  # The ground colour travels through these hours, interpolated in OKLCH.
  - { at: 0.00, name: "पहाट",      bg: "oklch(15.5% 0.022 268)" }
  - { at: 0.22, name: "चढण",       bg: "oklch(20.5% 0.040 52)" }
  - { at: 0.44, name: "संध्याकाळ", bg: "oklch(18.5% 0.052 32)" }
  - { at: 0.60, name: "उजेड",      bg: "oklch(94.0% 0.018 84)" }
  - { at: 0.74, name: "रात्र",     bg: "oklch(11.5% 0.024 288)" }
  - { at: 1.00, name: "दिवा",      bg: "oklch(22.5% 0.055 58)" }

typography:
  display:
    fontFamily: Rozha One
    role: Devanagari headings — thick verticals, hairline horizontals, the
      weight of a painted temple board
    caveat: >
      Renders U+0966–096F as Latin-looking forms. All numerals must go through
      devDigits() in ui/SacredText.tsx, which re-sets digit runs in Tiro.
  ui:
    fontFamily: Anek Devanagari
    axes: [wdth 75–125, wght 100–800]
    role: labels, eyebrows, anything that animates its width
  reading:
    fontFamily: Tiro Devanagari Marathi
    role: all Marathi prose, and every Devanagari numeral
  latin:
    fontFamily: Fraunces
    role: transliteration and Latin display
  scale:
    hero: clamp(3.2rem, 19vw, 7rem)
    xl: clamp(2.2rem, 12vw, 4rem)
    lg: clamp(1.55rem, 7.5vw, 2.5rem)
    body: clamp(1.02rem, 4.4vw, 1.2rem)
  measures:
    display: 22ch
    reading: 30–38ch
  devanagari:
    lineHeight: 1.78   # the shirorekha needs headroom Latin defaults don't give

layout:
  stages:
    hand: "< 900px — vertical cinematic journey, swipe, full-bleed photographs"
    wide: ">= 900 x 560 — split composition, image one side, reading the other"
  rule: >
    These are two designs, not one layout with breakpoints. Never shrink the
    wide composition onto a phone or stretch the phone composition wide.
  units: dvh everywhere; mobile browser chrome must not crop a scene
  safeAreas: env(safe-area-inset-*) on every fixed element

motion:
  driver: >
    One requestAnimationFrame loop for the whole document
    (engine/scrollDriver.ts). Reads only elements an IntersectionObserver says
    are near the viewport, batches all reads before any writes, and publishes
    progress as --p on the section. React does not render while scrolling.
  rules:
    - All motion is scroll-owned. No setTimeout stages, no autoplay.
    - Animate transform and opacity only. Never `transition: all`.
    - Honour prefers-reduced-motion with a genuine reduced variant.
    - Never open a per-scene rAF loop. Fifteen of them was the original jank.
  easing:
    stone: cubic-bezier(0.16, 1, 0.3, 1)
    breath: cubic-bezier(0.4, 0, 0.2, 1)

imagery:
  role: hero material, 70–100% of the viewport
  parallax: >
    Depth is one number per layer — 0 sits on the glass, 1 is the horizon.
    Travel, scale and haze all derive from it in CSS so planes stay in a
    believable relationship.
  pipeline: AVIF -> WebP -> JPEG, four widths, blur placeholder, real ratios
  never: stock religious imagery, generic mandalas, cheap festival graphics

content:
  tiers:
    sacred: >
      Names, mantras, place names. Devanagari in every language, with roman
      transliteration for English readers. NEVER translated.
    prose: fully translated, Marathi is the source of truth
    ui: fully translated, short
  rule: >
    Content first, design second. Target 20% cinematic typography,
    80% actual content. A screen that is only a heading is a failure.
  invention: >
    Nothing is invented. Unfilled slots render as visible labelled gaps.
    Supplied paragraphs may be split at their own clause boundaries for
    presentation, but joining the fragments must reproduce the original exactly.

antiPatterns:
  - neutral #111 black instead of warm stone
  - a second luminance inversion anywhere other than ज्ञान
  - photographs shrunk into cards
  - headers with nothing underneath
  - autoplay, timers, or sound
  - WebGL used where a photograph would be more real
  - numerals set in Rozha One without devDigits()
