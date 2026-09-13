import { Scene, Stage } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { V2 } from '../content/v2'
import { MARUTIS } from '../content/marutis'
import { toDev } from '../content/derived'
import { Img } from '../ui/Img'
import { useOverlays } from '../ui/Overlays'
import { useStage } from '../engine/useViewport'

/**
 * 12 — through the eleven.
 *
 * Two compositions, not one layout.
 *
 * On a phone the eleven are a rail the scroll drags sideways: the thumb is
 * already moving vertically, so the horizontal travel comes free and the
 * eleven read as a route rather than a catalogue. Six place-name calls cut
 * above it — cuts, not fades, because they are a list being recited.
 *
 * On a wide screen dragging a rail with a mouse wheel is miserable and the
 * horizontal metaphor buys nothing, so the eleven become a band you scan in
 * one look, revealed in sequence as the scene scrubs. Same eleven, same order,
 * same tap target.
 */
export function Eleven() {
  const stage = useStage()
  const { openMaruti } = useOverlays()

  const calls = V2.eleven.calls.map((text, i) => {
    const from = [0.02, 0.16, 0.3, 0.46, 0.62, 0.8][i]
    const to = [0.16, 0.3, 0.46, 0.62, 0.8, 2][i]
    return (
      <div
        key={text}
        className="s12-call"
        style={{ opacity: `calc(${ramp(from, 14)} - ${ramp(to, 14)})` }}
      >
        {text}
      </div>
    )
  })

  const cards = MARUTIS.map((m, i) => (
    <button
      type="button"
      key={m.id}
      className="s12-card"
      onClick={() => openMaruti(i)}
      style={
        stage === 'wide'
          ? { opacity: ramp(0.06 + i * 0.06, 12), transform: `translateY(calc((1 - ${ramp(0.06 + i * 0.06, 12)}) * 14px))` }
          : undefined
      }
    >
      <span className="s12-card-plate">
        <Img
          media={m.media ?? null}
          slot={`maruti.${m.id}.photo`}
          fill
          sizes={stage === 'wide' ? '180px' : '184px'}
        />
      </span>
      <span className="s12-card-head">
        <i>{toDev(m.order)}</i>
        <b>{m.name.dev}</b>
      </span>
      <span className="s12-card-place">
        {m.village.dev} · {m.district.mr}
      </span>
    </button>
  ))

  return (
    <Scene track={stage === 'wide' ? 250 : 330} label="१२ अकरा" className="s12">
      <Stage className="s12-stage">
        <div className="s12-calls">{calls}</div>

        {stage === 'wide' ? (
          <div className="s12-band">{cards}</div>
        ) : (
          <div className="s12-rail-clip">
            <div
              className="s12-rail"
              style={{ transform: `translateX(calc(var(--q,0) * (min(100vw, var(--col)) - 100% - 36px)))` }}
            >
              {cards}
            </div>
          </div>
        )}

        <div className="s12-progress" aria-hidden="true">
          <div style={{ width: 'calc(var(--q,0) * 100%)' }} />
        </div>
        <div className="s12-hint">{V2.eleven.hint}</div>
      </Stage>
    </Scene>
  )
}
