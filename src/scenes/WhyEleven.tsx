import { Scene, Stage } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { V2 } from '../content/v2'

/**
 * 14 — ११च का?
 *
 * The question the piece does not answer. The mandal supplied no explanation
 * for the count and none is invented here — the scene states the question and
 * moves on, which is what the supplied script does.
 */
export function WhyEleven() {
  const q = ramp(0.26, 7)

  return (
    <Scene track={210} label="१४ ११च का" className="s14">
      <Stage className="s14-stage">
        <div
          className="s14-ghost"
          aria-hidden="true"
          style={{ transform: `scale(calc(.8 + var(--q) * .3))` }}
        >
          ११
        </div>

        <p
          className="s14-lead"
          style={{ opacity: `calc(${ramp(0, 9)} - ${ramp(0.26, 6)})` }}
        >
          {V2.whyEleven.lead}
        </p>

        <h2
          className="s14-q"
          style={{ opacity: q, transform: `scale(calc(.8 + ${q} * .2))` }}
        >
          <i>११</i>{V2.whyEleven.question}
        </h2>

        <p style={{ opacity: ramp(0.48, 7) }}>{V2.whyEleven.a}</p>
        <p style={{ opacity: ramp(0.64, 7) }}>{V2.whyEleven.b}</p>
        <p className="is-accent" style={{ opacity: ramp(0.8, 7) }}>{V2.whyEleven.c}</p>
      </Stage>
    </Scene>
  )
}
