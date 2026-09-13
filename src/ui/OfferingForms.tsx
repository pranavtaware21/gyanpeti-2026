import type { CSSProperties } from 'react'

/**
 * Scene 15 — the four offerings, drawn.
 *
 * The earlier version morphed one CSS box through all four states. It was
 * continuous, which was the point, but a rounded rectangle can only ever
 * suggest a garland or a coconut — the visitor had to be told what they were
 * looking at. These are drawn instead: fifteen marigolds on a strung loop,
 * a coconut with its three eyes and husk grain, a platter of pedhe, an open
 * book. Each one is recognisable on its own, which is what the scene needs at
 * the moment the last of them turns out to be the argument.
 *
 * They cross-fade rather than morph, and they share a viewBox, stroke and
 * `currentColor` so the sequence still reads as one object being replaced in
 * one place rather than four illustrations taking turns.
 *
 * All four use `fill="none" stroke="currentColor"`; the colour comes from the
 * scene, which sets it to haldi.
 */

const BOX: CSSProperties = {
  position: 'absolute',
  width: '206px',
  height: '206px',
  overflow: 'visible',
}

/** The fifteen marigolds sit on an ellipse, walked clockwise from the right. */
const MARIGOLDS = [
  [166, 92], [159, 110], [141, 126], [117, 137], [88, 139], [60, 130],
  [41, 113], [34, 92], [41, 71], [60, 54], [88, 45], [117, 47],
  [141, 58], [159, 74],
] as const

export function Garland({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" style={{ ...BOX, ...style }} fill="none" stroke="currentColor" aria-hidden="true">
      <ellipse cx="100" cy="92" rx="66" ry="48" strokeOpacity=".45" strokeWidth="1" />
      <path d="M100 140 v34 M100 174 l-7 10 M100 174 l7 10" strokeOpacity=".5" strokeWidth="1" />
      <g strokeWidth="1.4">
        {MARIGOLDS.map(([x, y], i) => {
          const big = i % 2 === 0
          const r = big ? 12 : 11
          const inner = big ? 5 : 4.5
          const spokes = big
            ? `M0-${r}v-4M${r} 0h4M0 ${r}v4M-${r} 0h-4`
            : `M0-${r}v-4M${r} 0h4M0 ${r}v4M-${r} 0h-4`
          return (
            <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
              <circle r={r} fill="oklch(63% 0.213 38 / .3)" />
              <circle r={inner} fill="none" />
              <path d={spokes} strokeOpacity=".75" />
            </g>
          )
        })}
      </g>
      {/* Two leaves where the loop is tied. */}
      <path
        d="M74 46 q-14-12-30-8 q14 6 18 16 z M126 46 q14-12 30-8 q-14 6-18 16 z"
        fill="oklch(63% 0.213 38 / .2)"
        strokeOpacity=".55"
        strokeWidth="1"
      />
    </svg>
  )
}

export function Coconut({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" style={{ ...BOX, ...style }} fill="none" stroke="currentColor" aria-hidden="true">
      <path
        d="M100 28 c30 0 54 30 54 66 c0 34-24 62-54 62 c-30 0-54-28-54-62 c0-36 24-66 54-66 z"
        fill="oklch(63% 0.213 38 / .16)"
        strokeWidth="1.6"
      />
      <path d="M100 28 c-8 10-10 18-9 26 M100 28 c8 10 10 18 9 26" strokeOpacity=".7" strokeWidth="1.2" />
      {/* Husk grain, running the length of the shell. */}
      <path
        d="M70 48 c-10 30-10 66 4 98 M85 40 c-8 34-8 74 2 108 M115 40 c8 34 8 74-2 108 M130 48 c10 30 10 66-4 98"
        strokeOpacity=".38"
        strokeWidth="1"
      />
      {/* The three eyes. */}
      <ellipse cx="86" cy="78" rx="7" ry="9" fill="oklch(83% 0.150 86 / .3)" strokeWidth="1.2" />
      <ellipse cx="114" cy="76" rx="7" ry="9" fill="oklch(83% 0.150 86 / .3)" strokeWidth="1.2" />
      <ellipse cx="100" cy="98" rx="6" ry="8" fill="none" strokeWidth="1.2" strokeOpacity=".8" />
      <path d="M62 156 q38 12 76 0" strokeOpacity=".4" strokeWidth="1" />
    </svg>
  )
}

export function Pedhe({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" style={{ ...BOX, ...style }} fill="none" stroke="currentColor" aria-hidden="true">
      <ellipse cx="100" cy="150" rx="78" ry="20" strokeOpacity=".35" strokeWidth="1" />
      <path
        d="M46 96 a54 24 0 0 0 108 0 v20 a54 24 0 0 1-108 0 z"
        fill="oklch(63% 0.213 38 / .2)"
        strokeWidth="1.4"
      />
      <ellipse cx="100" cy="96" rx="54" ry="24" fill="oklch(83% 0.150 86 / .12)" strokeWidth="1.6" />
      <ellipse cx="100" cy="96" rx="40" ry="16" strokeOpacity=".5" strokeWidth="1" />
      <circle cx="100" cy="94" r="6" fill="oklch(63% 0.213 38 / .35)" strokeWidth="1.2" />
      <path d="M62 72 a46 20 0 0 1 76 0" strokeOpacity=".4" strokeWidth="1" />
      <ellipse cx="64" cy="72" rx="30" ry="13" fill="none" strokeOpacity=".45" strokeWidth="1.2" />
      <path d="M34 72 v12 a30 13 0 0 0 60 0 v-12" strokeOpacity=".45" strokeWidth="1.2" />
    </svg>
  )
}

export function Book({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" style={{ ...BOX, ...style }} fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M100 52 c-22-12-44-14-62-10 v96 c18-4 40-2 62 10 z" fill="oklch(63% 0.213 38 / .16)" strokeWidth="1.6" />
      <path d="M100 52 c22-12 44-14 62-10 v96 c-18-4-40-2-62 10 z" fill="oklch(63% 0.213 38 / .22)" strokeWidth="1.6" />
      <path d="M100 52 v96" strokeWidth="1.4" strokeOpacity=".85" />
      <path
        d="M52 58 c14-2 30 0 42 6 M52 74 c14-2 30 0 42 6 M52 90 c14-2 26 0 34 6 M52 106 c14-2 30 0 42 6"
        strokeOpacity=".45"
        strokeWidth="1"
      />
      <path
        d="M148 58 c-14-2-30 0-42 6 M148 74 c-14-2-30 0-42 6 M148 90 c-14-2-26 0-34 6 M148 106 c-14-2-30 0-42 6"
        strokeOpacity=".45"
        strokeWidth="1"
      />
      <path d="M38 42 v96 M162 42 v96" strokeOpacity=".3" strokeWidth="1" />
      {/* Ribbon marker. */}
      <path d="M124 46 v34 l7-8 7 8 v-38" fill="oklch(63% 0.213 38 / .3)" strokeWidth="1.2" />
    </svg>
  )
}
