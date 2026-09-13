import { Scene, Stage } from '../ui/Scene'
import { ramp, track } from '../engine/scrub'
import { V2 } from '../content/v2'

/**
 * 01 — ॥ श्री ॥
 *
 * The first thing on screen is not a title card. A ring closes around the
 * invocation as the visitor scrolls, the letter-spacing draws in from wide to
 * set, and only then does the piece let go and move on. It buys the two
 * seconds it takes someone standing in a crowded mandap to stop looking at
 * the decoration and start looking at the phone.
 */
export function Shri() {
  const settle = ramp(0.78, 4)
  const leave = ramp(0.78, 5)

  return (
    <Scene track={150} label="०१ श्री" className="s01">
      <Stage className="s01-stage">
        <div
          className="s01-ring"
          style={{
            background:
              'conic-gradient(from -90deg, var(--haldi) calc(var(--q,0) * 360deg), transparent 0deg)',
            opacity: `calc(.9 - ${leave} * .9)`,
            transform: `scale(${track(0.92, 1.08)})`,
          }}
        />
        <div
          className="s01-glow"
          style={{
            transform: `scale(${track(0.6, 1.5)})`,
            opacity: `calc(1 - ${leave})`,
          }}
        />
        <div
          className="s01-mark"
          style={{
            transform: `translateY(calc(${settle} * -30dvh)) scale(calc(1 - ${settle} * .3))`,
            opacity: `calc(1 - ${ramp(0.9, 9)})`,
          }}
        >
          <h1 style={{ letterSpacing: 'calc(.5em - var(--q,0) * .34em)' }}>
            {V2.shri.mark}
          </h1>
        </div>
        <div
          className="s01-hint"
          style={{ opacity: 'clamp(0,calc(1 - var(--g,0) * 26),1)' }}
        >
          {V2.shri.hint}
        </div>
      </Stage>
    </Scene>
  )
}
