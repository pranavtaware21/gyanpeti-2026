import { Scene, Stage } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { PHOTOS, V2 } from '../content/v2'
import { Img } from '../ui/Img'

/**
 * 05 — out of the Sahyadri, towards one fort.
 *
 * The aerial photograph sits far back — heavily desaturated and dimmed — and
 * creeps forward as the three lines land. It is the ground the journey crosses,
 * not the subject, and it is not allowed to compete with the type until
 * scene 06 where it becomes the subject.
 */
export function Journey() {
  const arrive = ramp(0.58, 6)

  return (
    <Scene track={215} label="०५ प्रवास" className="s05">
      <Stage className="s05-stage">
        <div
          className="s05-ground"
          style={{
            opacity: `calc(.1 + var(--q,0) * .22)`,
            transform: `scale(calc(1.5 - var(--q,0) * .34)) translateY(calc(var(--q,0) * -40px))`,
          }}
        >
          <Img media={PHOTOS.aerial} slot="dategad.aerial" fill sizes="100vw" />
        </div>

        <div className="s05-lines">
          {V2.journey.lines.map((line, i) => {
            const at = [0.04, 0.2, 0.36][i]
            const on = ramp(at, 8)
            return (
              <div
                key={line}
                style={{ opacity: on, transform: `translateX(calc((1 - ${on}) * -20px))` }}
              >
                {line}
              </div>
            )
          })}
        </div>

        <div
          className="s05-place"
          style={{ opacity: arrive, transform: `scale(calc(.78 + ${arrive} * .22))` }}
        >
          {V2.journey.place}
        </div>

        <div className="s05-credit" style={{ opacity: arrive }}>
          {V2.journey.credit}
        </div>
      </Stage>
    </Scene>
  )
}
