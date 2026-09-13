import { Scene, Stage } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { V2 } from '../content/v2'

/**
 * 20 — put the phone down.
 *
 * The scene the whole piece exists to reach. It has no photograph and no
 * effect beyond a widening glow, because anything on screen here is competing
 * with the instruction to stop looking at the screen.
 */
export function LookUp() {
  const look = ramp(0.64, 14)

  return (
    <Scene track={200} label="२० वर पहा" className="s20">
      <Stage className="s20-stage">
        <div className="s20-wash" aria-hidden="true" style={{ transform: `scale(calc(.5 + var(--q) * .95))` }} />

        <p
          className="s20-seen"
          style={{ opacity: `calc(${ramp(0, 10)} - ${ramp(0.30, 14)})` }}
        >
          {V2.lookUp.seen[0]}<br />{V2.lookUp.seen[1]}<br />{V2.lookUp.seen[2]}
        </p>

        <p
          className="s20-now"
          style={{ opacity: `calc(${ramp(0.30, 14)} - ${ramp(0.64, 14)})` }}
        >
          {V2.lookUp.now[0]}<br />{V2.lookUp.now[1]}
        </p>

        <p
          className="s20-look"
          style={{ opacity: look, transform: `scale(calc(.88 + ${look} * .12))` }}
        >
          {V2.lookUp.look}
        </p>
      </Stage>
    </Scene>
  )
}
