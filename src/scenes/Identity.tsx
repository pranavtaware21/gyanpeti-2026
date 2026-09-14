import { Scene, Stage } from '../ui/Scene'
import { ramp, track } from '../engine/scrub'
import { useScript } from '../content/useScript'

/**
 * 03 — ज्ञान पेटी बाप्पा माझा
 *
 * The name is wiped in rather than faded: a clip-path inset opening left to
 * right, one line then the other. It reads as something being painted onto a
 * board, which is what the display face is drawn to look like.
 */
export function Identity() {
  const S = useScript()
  const wipe = (at: number) =>
    `inset(0 calc(100% - clamp(0%,calc((var(--q) - ${at}) * 320%),100%)) 0 0)`

  return (
    <Scene track={200} label="०३ ओळख" className="s03">
      <Stage className="s03-stage">
        <div className="s03-wash" style={{ transform: `scale(${track(0.78, 1.38)})` }} />

        <div
          className="s03-lead"
          style={{ opacity: `calc(${ramp(0, 9)} - ${ramp(0.3, 6)})` }}
        >
          {S.identity.lead[0]}<br />{S.identity.lead[1]}
        </div>

        <h1 className="s03-title">
          <span className="s03-clip">
            <span style={{ clipPath: wipe(0.3) }}>{S.identity.title[0]}</span>
          </span>
          <span className="s03-clip">
            <span className="is-accent" style={{ clipPath: wipe(0.42) }}>
              {S.identity.title[1]}
            </span>
          </span>
        </h1>

        <div className="s03-year">
          <div
            className="s03-rule"
            style={{ width: 'clamp(0px,calc((var(--q) - .58) * 700px),100%)' }}
          />
          <div
            style={{
              letterSpacing: `calc(.5em - ${ramp(0.66, 5)} * .36em)`,
              opacity: ramp(0.66, 5),
            }}
          >
            {S.identity.year}
          </div>
        </div>

        <div className="s03-tail" style={{ opacity: ramp(0.78, 6) }}>
          {S.identity.tail}
        </div>
      </Stage>
    </Scene>
  )
}
