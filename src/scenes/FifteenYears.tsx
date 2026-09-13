import { Scene, Stage, Beat } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { V2 } from '../content/v2'

/**
 * 02 — १५ वर्षे
 *
 * The two digits arrive from opposite edges and meet. They are the subject of
 * the scene, not a decorative number, so they are set in the reading face at
 * display size and carry tabular figures — Devanagari numerals drift
 * otherwise, and a number that wobbles as it lands looks like a bug.
 */
export function FifteenYears() {
  const meet = ramp(0, 5)
  const recede = ramp(0.42, 10)

  return (
    <Scene track={210} label="०२ १५ वर्षे" className="s02">
      <Stage className="s02-stage">
        <div
          className="s02-halo"
          style={{
            transform: `scale(calc(1.5 - ${meet} * .5))`,
            opacity: `calc(${ramp(0, 5)} - ${ramp(0.42, 5)} * .7)`,
          }}
        />

        <div
          className="s02-digits"
          style={{
            opacity: `calc(1 - ${recede})`,
            transform: `scale(calc(1 - ${recede} * .42)) translateY(calc(${recede} * -16dvh))`,
          }}
        >
          <span style={{ transform: `translateX(calc((1 - ${meet}) * -52vw)) rotate(calc((1 - ${meet}) * -22deg))` }}>
            {V2.fifteen.digits[0]}
          </span>
          <span style={{ transform: `translateX(calc((1 - ${meet}) * 52vw)) rotate(calc((1 - ${meet}) * 22deg))` }}>
            {V2.fifteen.digits[1]}
          </span>
        </div>

        <div
          className="s02-head"
          style={{ opacity: `calc(${ramp(0.22, 7)} - ${ramp(0.46, 10)})` }}
        >
          {V2.fifteen.head}
        </div>

        <div className="s02-lines" style={{ opacity: ramp(0.56, 10) }}>
          {V2.fifteen.lines.map((line, i) => (
            <Beat key={line} from={0.56 + i * 0.07} rate={9} className="s02-line">
              {line}
            </Beat>
          ))}
        </div>
      </Stage>
    </Scene>
  )
}
