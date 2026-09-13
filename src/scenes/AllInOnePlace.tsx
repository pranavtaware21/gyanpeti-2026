import { Scene, Stage } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { V2 } from '../content/v2'

/**
 * 18 — it all arrives in one place.
 *
 * The three strands of the piece named back in order, then handed to the
 * object in the room. This is the scene that turns a story into a pointer:
 * everything after it is about the thing the visitor is standing in front of.
 */
export function AllInOnePlace() {
  return (
    <Scene track={215} label="१८ एका ठिकाणी" className="s18">
      <Stage className="s18-stage">
        <p
          className="s18-lead"
          style={{ opacity: `calc(${ramp(0, 10)} - ${ramp(0.16, 12)})` }}
        >
          {V2.allInOne.lead}
        </p>

        <div className="s18-body">
          {V2.allInOne.strands.map((line, i) => (
            <div key={line} style={{ opacity: ramp(0.26 + i * 0.1, 9) }}>
              {line}
            </div>
          ))}

          <div className="s18-here" style={{ opacity: ramp(0.56, 8) }}>
            {V2.allInOne.here}
          </div>

          {V2.allInOne.tail.map((line, i) => (
            <div key={line} className="s18-tail" style={{ opacity: ramp(0.7 + i * 0.08, 9) }}>
              {line}
            </div>
          ))}
        </div>
      </Stage>
    </Scene>
  )
}
