import { Scene, Stage } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { PHOTOS, V2 } from '../content/v2'
import { Img } from '../ui/Img'
import { useOverlays } from '../ui/Overlays'

/**
 * 08 — दोन रूपं
 *
 * Two carvings on facing walls, shown as two cards side by side. Both are now
 * photographs: the गणपती on the opposite wall was the piece's longest-standing
 * gap and the mandal have supplied it, so the dashed placeholder is gone.
 *
 * The ground behind them is the shrine interior itself, pushed far back under
 * a heavy scrim — it establishes that both carvings are in one chamber before
 * the cards claim it, which a flat radial wash could only suggest.
 */
export function TwoForms() {
  const { zoom } = useOverlays()
  const dim = ramp(0.5, 4)

  return (
    <Scene track={225} label="०८ दोन रूपं" className="s08">
      <Stage className="s08-stage">
        <div
          className="s08-ground"
          style={{
            opacity: `calc(.22 + var(--q) * .34)`,
            transform: `scale(calc(1.34 - var(--q) * .26)) translateY(calc(var(--q) * -30px))`,
          }}
        >
          <Img media={PHOTOS.mandir} slot="dategad.mandir" fill sizes="100vw" />
        </div>
        <div className="s08-scrim" aria-hidden="true" />

        <div className="s08-pair">
          <div style={{ opacity: `calc(${ramp(0.02, 9)} - ${dim} * .55)` }}>
            {V2.twoForms.stone}
          </div>
          <div style={{ opacity: `calc(${ramp(0.16, 9)} - ${dim} * .55)` }}>
            {V2.twoForms.sky}
          </div>
        </div>

        <p className="s08-lead" style={{ opacity: ramp(0.34, 8) }}>
          {V2.twoForms.lead}
        </p>

        <div className="s08-cards">
          <button
            type="button"
            className="s08-card s08-card--photo"
            aria-label={`${V2.twoForms.ganpati} — मोठं करा`}
            onClick={() => zoom(PHOTOS.ganpati, V2.twoForms.ganpati)}
            style={{
              opacity: ramp(0.5, 8),
              transform: `translateY(calc((1 - ${ramp(0.5, 8)}) * 18px))`,
            }}
          >
            <Img media={PHOTOS.ganpati} slot="dategad.ganpati" fill sizes="50vw" />
            <span className="s08-caption">{V2.twoForms.ganpati}</span>
          </button>

          <button
            type="button"
            className="s08-card s08-card--photo"
            aria-label={`${V2.twoForms.maruti} — मोठं करा`}
            onClick={() => zoom(PHOTOS.shrine, V2.twoForms.maruti)}
            style={{
              opacity: ramp(0.62, 8),
              transform: `translateY(calc((1 - ${ramp(0.62, 8)}) * 18px))`,
            }}
          >
            <Img media={PHOTOS.shrine} slot="dategad.shrine" fill sizes="50vw" />
            <span className="s08-caption">{V2.twoForms.maruti}</span>
          </button>
        </div>

        <p className="s08-tail" style={{ opacity: ramp(0.76, 8) }}>
          {V2.twoForms.tail}
        </p>
      </Stage>
    </Scene>
  )
}
