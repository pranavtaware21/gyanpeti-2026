import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { register } from '../engine/scrollDriver'
import { band } from '../engine/scrub'

/**
 * A scene is a tall section with a pinned stage inside it.
 *
 * `track` is the section's height in dvh and is therefore the only control
 * over pacing: 220 gives a beat roughly two screens of scroll to land, 440
 * gives a long dissolve. The numbers are carried over from the design source
 * unchanged, because pacing is the part of this piece that was authored
 * against a real thumb on a real phone and is not ours to re-tune.
 */
export function Scene({
  track,
  label,
  children,
  className = '',
  style,
}: {
  track: number
  label: string
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    return register(el)
  }, [])

  return (
    <section
      ref={ref}
      data-scene
      aria-label={label}
      className={`scene ${className}`}
      style={{ minHeight: `${track}dvh`, ...style }}
    >
      {children}
    </section>
  )
}

/**
 * The pinned frame. Everything the visitor actually looks at lives in here;
 * the section around it only supplies scroll distance.
 */
export function Stage({
  children,
  className = '',
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return <div className={`stage ${className}`} style={style}>{children}</div>
}

/**
 * A stack of prose beats that hand over to one another in the same place.
 *
 * Absolutely positioned so successive lines cross-fade on one spot instead of
 * pushing the layout around — and given a `min-height` so that spot does not
 * collapse. Under reduced motion the stack becomes ordinary flow and every
 * beat is legible at once: same words, no scrubbing.
 */
export function Seq({
  minHeight,
  children,
  className = '',
  style,
}: {
  minHeight: number
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      className={`seq ${className}`}
      style={{ minHeight: `${minHeight}px`, ...style }}
    >
      {children}
    </div>
  )
}

/** One beat inside a `Seq` — or anywhere a value should appear and leave. */
export function Beat({
  from,
  to = 2,
  rate = 9,
  outRate,
  fade = 1,
  children,
  className = '',
  style,
}: {
  from: number
  /** Past 1 means "never leaves": the beat is still on screen at the end. */
  to?: number
  rate?: number
  /** Leave faster or slower than it arrived. Defaults to `rate`. */
  outRate?: number
  fade?: number
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      className={`beat ${className}`}
      style={{ opacity: band(from, to, rate, { fade, outRate: outRate ?? rate }), ...style }}
    >
      {children}
    </div>
  )
}
