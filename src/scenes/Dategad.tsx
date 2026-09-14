import { Scene, Stage } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { PHOTOS } from '../content/v2'
import { useScript } from '../content/useScript'
import { Img } from '../ui/Img'

/**
 * 06 — दातेगड
 *
 * The photograph opens from a horizontal slit outwards, the way a band of
 * light widens. The figures under it are the mandal's, and the credit line is
 * not optional: the aerial view is someone else's photograph.
 */
export function Dategad() {
  const S = useScript()
  const open = 'calc(50% - clamp(0%,calc(var(--q) * 120%),50%))'

  return (
    <Scene track={235} label="०६ दातेगड" className="s06">
      <Stage className="s06-stage">
        <div className="s06-plate" style={{ clipPath: `inset(${open} 0 ${open} 0)` }}>
          <div
            className="s06-plate-inner"
            style={{ transform: `scale(calc(1.2 - var(--q) * .2))` }}
          >
            <Img media={PHOTOS.aerial} slot="dategad.aerial" fill sizes="100vw" priority />
          </div>
        </div>

        <p className="s06-body" style={{ opacity: ramp(0.22, 7) }}>
          {S.dategad.body}
        </p>

        <div className="s06-facts" style={{ opacity: ramp(0.46, 7) }}>
          <span className="s06-height">{S.dategad.height}</span>
          <span className="s06-unit">{S.dategad.heightUnit}</span>
          <span className="s06-where">
            {S.dategad.where[0]}<br />{S.dategad.where[1]}
          </span>
        </div>

        <p className="s06-hanuman" style={{ opacity: ramp(0.62, 7) }}>
          {S.dategad.hanuman}
        </p>

        <div className="s06-credit">{S.dategad.credit}</div>
      </Stage>
    </Scene>
  )
}
