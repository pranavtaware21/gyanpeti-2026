/**
 * Scrub expressions.
 *
 * The scroll driver publishes `--q` (0–1 while a scene's stage is pinned) and
 * `--p` (0–1 across its whole approach). Everything a scene animates is a CSS
 * `calc()` over one of those, evaluated by the compositor — so these helpers
 * build strings, never numbers, and nothing here runs per frame.
 *
 * Two shapes cover the entire piece:
 *
 *   ramp(at, rate)        0 until `at`, then rises to 1 over 1/rate of scroll.
 *   band(from, to, rate)  ramps up at `from`, back down at `to`. A beat that
 *                         appears, holds, and hands over to the next one.
 *
 * `rate` is how sharply the change lands: 6–9 reads as a considered fade,
 * 12–14 as a cut. The design source uses those two registers deliberately —
 * prose cross-fades, the eleven place-names cut.
 */

/** The scrub variable a scene is keyed to. */
export type Axis = 'q' | 'p'

const v = (axis: Axis) => `var(--${axis},0)`

/** 0 until `at`, rising to 1 at `at + 1/rate`. */
export function ramp(at: number, rate = 8, axis: Axis = 'q'): string {
  if (at <= 0) return `clamp(0,calc(${v(axis)} * ${rate}),1)`
  return `clamp(0,calc((${v(axis)} - ${at}) * ${rate}),1)`
}

/**
 * Appears at `from`, leaves at `to`.
 *
 * `fade` is how much of the value the exit removes — 1 takes it away entirely,
 * which is what a prose beat wants; a lower number leaves the line dimmed but
 * still legible underneath what follows, which is how the stanza scenes keep
 * their earlier lines on screen.
 */
export function band(
  from: number,
  to: number,
  rate = 8,
  { fade = 1, outRate = rate, axis = 'q' as Axis } = {},
): string {
  const out = fade === 1
    ? ramp(to, outRate, axis)
    : `calc(${ramp(to, outRate, axis)} * ${fade})`
  return `calc(${ramp(from, rate, axis)} - ${out})`
}

/** Linear interpolation between two numbers, driven by any 0–1 expression. */
export function mix(expr: string, a: number, b: number, unit = ''): string {
  return `calc(${a}${unit} + ${expr} * ${b - a}${unit})`
}

/** Straight read of the axis, scaled — for effects that track the whole scrub. */
export function track(a: number, b: number, unit = '', axis: Axis = 'q'): string {
  return mix(v(axis), a, b, unit)
}
