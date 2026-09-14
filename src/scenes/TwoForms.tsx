import { Scene, Stage } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { PHOTOS } from '../content/v2'
import { useScript } from '../content/useScript'
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
  const S = useScript()
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
            {S.twoForms.stone}
          </div>
          <div style={{ opacity: `calc(${ramp(0.16, 9)} - ${dim} * .55)` }}>
            {S.twoForms.sky}
          </div>
        </div>

        <p className="s08-lead" style={{ opacity: ramp(0.34, 8) }}>
          {S.twoForms.lead}
        </p>

        <div className="s08-cards">
          <button
            type="button"
            className="s08-card s08-card--photo"
            aria-label={`${S.twoForms.ganpati} · ${S.ui.enlarge}`}
            onClick={() => zoom(PHOTOS.ganpati, S.twoForms.ganpati)}
            style={{
              opacity: ramp(0.5, 8),
              transform: `translateY(calc((1 - ${ramp(0.5, 8)}) * 18px))`,
            }}
          >
            <Img media={PHOTOS.ganpati} slot="dategad.ganpati" fill sizes="50vw" />
            <span className="s08-caption">{S.twoForms.ganpati}</span>
          </button>

          <button
            type="button"
            className="s08-card s08-card--photo"
            aria-label={`${S.twoForms.maruti} · ${S.ui.enlarge}`}
            onClick={() => zoom(PHOTOS.shrine, S.twoForms.maruti)}
            style={{
              opacity: ramp(0.62, 8),
              transform: `translateY(calc((1 - ${ramp(0.62, 8)}) * 18px))`,
            }}
          >
            <Img media={PHOTOS.shrine} slot="dategad.shrine" fill sizes="50vw" />
            <span className="s08-caption">{S.twoForms.maruti}</span>
          </button>
        </div>

        <p className="s08-tail" style={{ opacity: ramp(0.76, 8) }}>
          {S.twoForms.tail}
        </p>
      </Stage>
    </Scene>
  )
}
