import { Scene, Stage } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { PHOTOS, V2 } from '../content/v2'
import { MARUTIS } from '../content/marutis'
import { Img } from '../ui/Img'
import { useOverlays } from '../ui/Overlays'
import { useStage } from '../engine/useViewport'

/**
 * 19 — the arrangement.
 *
 * The eleven come up one at a time around a ring with the main Maruti at its
 * centre, which is the physical layout of the decoration itself. This is the
 * scene that finally maps the story onto the thing in the room.
 *
 * The phone ring is the design's own table, kept literally: those offsets were
 * placed by eye against a 480px column and are not ours to recompute. The wide
 * ring is a genuinely wider ellipse — not the phone ring scaled up — because a
 * 148px radius on a desktop screen reads as a small badge floating in space
 * rather than an arrangement you are standing in front of.
 *
 * This scene used to end with a labelled gap for a photograph of the finished
 * decoration. The designer withdrew that slot: the ring is the arrangement, and
 * a photograph of it underneath was saying the same thing twice.
 */

/** Phone: the design's placements, in order, as offsets from the ring centre. */
const PHONE_RING = [
  [0, 18], [81, 46], [136, 120], [148, 218], [113, 306], [42, 360],
  [-42, 360], [-113, 306], [-148, 218], [-136, 120], [-81, 46],
] as const

const PHONE_BOX = { height: 436, centre: 218 }
const WIDE = { rx: 320, ry: 232, height: 560, centre: 280 }

/** Wide: an ellipse walked clockwise from the top, same order, same count. */
function wideRing(i: number, n: number): [number, number] {
  const a = (i / n) * Math.PI * 2 - Math.PI / 2
  return [
    Math.round(Math.cos(a) * WIDE.rx),
    Math.round(WIDE.centre + Math.sin(a) * WIDE.ry),
  ]
}

export function Composition() {
  const stage = useStage()
  const { openMaruti } = useOverlays()
  const wide = stage === 'wide'
  const pull = ramp(0.74, 4)
  const centre = ramp(0.02, 9)

  const box = wide ? WIDE : PHONE_BOX

  return (
    <Scene track={270} label="१९ रचना" className="s19">
      <Stage className="s19-stage">
        <div className="s19-wash" aria-hidden="true" style={{ transform: `scale(calc(.6 + var(--q,0) * .8))` }} />

        <div
          className="s19-field"
          style={{
            height: `${box.height}px`,
            transform: `scale(calc(1 - ${pull} * .26)) translateY(calc(${pull} * -26px))`,
          }}
        >
          <div
            className="s19-main"
            style={{
              top: `${box.centre}px`,
              opacity: centre,
              transform: `translate(-50%,-50%) scale(calc(.55 + ${centre} * .45))`,
            }}
          >
            <Img media={PHOTOS.shrine} slot="dategad.shrine" fill sizes="200px" />
          </div>

          {MARUTIS.map((m, i) => {
            const [x, y] = wide ? wideRing(i, MARUTIS.length) : PHONE_RING[i]
            const on = ramp(0.1 + i * 0.04, 12)
            return (
              <button
                type="button"
                key={m.id}
                className="s19-node"
                aria-label={m.name.dev}
                onClick={() => openMaruti(i)}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `${y}px`,
                  opacity: on,
                  transform: `translate(-50%,0) scale(calc(.3 + ${on} * .7))`,
                }}
              >
                <Img media={m.media ?? null} slot={`maruti.${m.id}.photo`} fill sizes="72px" />
              </button>
            )
          })}
        </div>

        <div className="s19-foot">
          <div className="s19-lead" style={{ opacity: ramp(0.58, 8) }}>
            {V2.composition.lead}
          </div>
          <div className="s19-main-label" style={{ opacity: ramp(0.66, 8) }}>
            {V2.composition.main}
          </div>
        </div>
      </Stage>
    </Scene>
  )
}
