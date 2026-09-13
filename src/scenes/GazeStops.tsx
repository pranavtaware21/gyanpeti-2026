import { Scene, Stage } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { PHOTOS, V2 } from '../content/v2'
import { Img } from '../ui/Img'

/**
 * 10 — आपली नजर थांबते.
 *
 * The camera pushes in on the carving and the light comes up on it at the same
 * time. Everything else in the scene is scrim and type; the photograph is
 * finally allowed to be the whole screen.
 */
export function GazeStops() {
  const name = ramp(0.3, 7)

  return (
    <Scene track={215} label="१० मारुती" className="s10">
      <Stage className="s10-stage">
        <div
          className="s10-plate"
          style={{ transform: `scale(calc(1.9 - var(--q,0) * .62)) translateY(calc(var(--q,0) * -30px))` }}
        >
          <Img
            media={PHOTOS.shrine}
            slot="dategad.shrine"
            fill
            sizes="100vw"
            className="s10-img"
          />
        </div>
        <div className="s10-scrim" aria-hidden="true" />

        <div
          className="s10-lead"
          style={{ opacity: `calc(${ramp(0, 9)} - ${ramp(0.3, 6)})` }}
        >
          {V2.gaze.lead[0]}<br />{V2.gaze.lead[1]}
        </div>

        <div className="s10-foot">
          <h2
            className="s10-name"
            style={{ opacity: name, transform: `translateY(calc((1 - ${name}) * 20px))` }}
          >
            {V2.gaze.name}
          </h2>
          <p style={{ opacity: ramp(0.5, 6) }}>{V2.gaze.a}</p>
          <p className="is-accent" style={{ opacity: ramp(0.72, 6) }}>{V2.gaze.b}</p>
        </div>
      </Stage>
    </Scene>
  )
}
