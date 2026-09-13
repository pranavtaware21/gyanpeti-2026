import { useEffect, useRef } from 'react'
import { Scene, Stage } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { V2 } from '../content/v2'
import { haptic } from '../engine/haptics'

/**
 * 21 — समारोप
 *
 * The four strands named once more, then the whole thing clears and only
 * गणपती बाप्पा मोरया! is left on the screen. The single haptic here is the
 * only one the piece fires without a tap: arriving at the end of a fifteen
 * minute scroll is worth acknowledging, and by this point the visitor is
 * meant to be looking at the decoration rather than the phone.
 */
export function Close() {
  const fired = useRef(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = endRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || fired.current) return
        fired.current = true
        haptic.arrive()
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const clear = ramp(0.78, 9)

  return (
    <Scene track={235} label="२१ समारोप" className="s21">
      <Stage className="s21-stage">
        <p
          className="s21-lead"
          style={{ opacity: `calc(${ramp(0, 10)} - ${ramp(0.18, 8)})` }}
        >
          {V2.close.lead}
        </p>

        <div className="s21-body" style={{ opacity: `calc(1 - ${clear})` }}>
          <div className="s21-youll" style={{ opacity: ramp(0.2, 9) }}>
            {V2.close.youWillSee}
          </div>
          <div className="s21-strands">
            {V2.close.strands.map((line, i) => (
              <div key={line} style={{ opacity: ramp(0.26 + i * 0.08, 9) }}>{line}</div>
            ))}
          </div>
          <div className="s21-and" style={{ opacity: ramp(0.58, 9) }}>{V2.close.and}</div>
          <div
            className="s21-name"
            style={{ opacity: `calc(${ramp(0.64, 8)} - ${ramp(0.78, 8)} * .82)` }}
          >
            {V2.close.name}<i>{V2.close.year}</i>.
          </div>
        </div>

        <div
          ref={endRef}
          className="s21-morya"
          style={{ opacity: ramp(0.84, 9), transform: `scale(calc(.9 + ${ramp(0.84, 9)} * .1))` }}
        >
          <h2>{V2.close.morya}</h2>
        </div>
      </Stage>
    </Scene>
  )
}
