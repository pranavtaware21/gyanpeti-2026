import { Scene, Stage } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { PHOTOS } from '../content/v2'
import { useScript } from '../content/useScript'
import { Img } from '../ui/Img'
import { useOverlays } from '../ui/Overlays'
import { useI18n } from '../content/i18n'

/**
 * 09 — सूर्योदय / सूर्यास्त
 *
 * The light crosses the chamber as you scroll. Sunrise reaches the गणपती
 * carved on one wall; sunset reaches the मारुती on the other. Both are the
 * same rock, the same day.
 *
 * This used to be a slider the visitor dragged — the one hand-driven moment in
 * the piece. It is scroll-driven now, for two reasons that only showed up on a
 * phone: a horizontal drag inside a vertical scroll is a fight, and a control
 * that must be found and understood stops the story dead at exactly the point
 * it is making its quietest observation. `--sun` is simply `--q` now, so the
 * sun travels because the visitor is already doing the one thing they know how
 * to do here.
 *
 * The plate is `isolation: isolate` in CSS and that is load-bearing: the warm
 * layers are `mix-blend-mode`, which composites against the *backdrop*, and
 * without a stacking context of its own the tint escapes the photograph and
 * turns the whole scene orange.
 */
export function Sun() {
  const S = useScript()
  const { t } = useI18n()
  const { zoom } = useOverlays()
  const alt = t(PHOTOS.chamber?.alt)

  return (
    <Scene track={240} label="०९ सूर्य" className="s09">
      <Stage className="s09-stage" style={{ ['--sun' as string]: 'var(--q)' }}>
        <div className="s09-wash" aria-hidden="true" />

        <div className="s09-lines">
          <p style={{ opacity: `calc(${ramp(0.02, 9)} - ${ramp(0.5, 3)} * .55)` }}>
            {S.sun.sunriseLine}
          </p>
          <p className="is-accent" style={{ opacity: ramp(0.42, 6) }}>
            {S.sun.sunsetLine}
          </p>
        </div>

        <button
          type="button"
          className="s09-plate"
          aria-label={`${alt} · ${S.ui.enlarge}`}
          onClick={() => zoom(PHOTOS.chamber, alt)}
        >
          <Img media={PHOTOS.chamber} slot="dategad.chamber" sizes="480px" />
          <span className="s09-shade s09-shade--dawn" />
          <span className="s09-shade s09-shade--dusk" />
          <span className="s09-tint s09-tint--dawn" />
          <span className="s09-tint s09-tint--dusk" />
          <span className="s09-bloom" />
        </button>

        {/* The sun's position across the chamber, read-only — it reports the
            scroll rather than inviting a drag. */}
        <div className="s09-arc" aria-hidden="true">
          <div className="s09-arc-rail" />
          <div className="s09-arc-sun" />
        </div>

        <div className="s09-labels">
          <div>
            <div className="s09-when is-dawn">{S.sun.sunrise}</div>
            <div className="s09-on is-dawn">{S.sun.sunriseOn}</div>
          </div>
          <div className="is-right">
            <div className="s09-when is-dusk">{S.sun.sunset}</div>
            <div className="s09-on is-dusk">{S.sun.sunsetOn}</div>
          </div>
        </div>

        <p className="s09-close" style={{ opacity: ramp(0.72, 6) }}>
          {S.sun.close}
        </p>
      </Stage>
    </Scene>
  )
}
