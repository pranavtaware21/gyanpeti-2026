import { Scene, Stage, Seq, Beat } from '../ui/Scene'
import { PHOTOS, V2 } from '../content/v2'
import { Img } from '../ui/Img'

/**
 * 07 — २९ पायऱ्या
 *
 * Descending. The photograph pulls back and rises as you scroll, a rail on the
 * left fills like a depth gauge, and the numeral holds the corner the whole
 * way down. Three supplied sentences hand over to one another in a fixed
 * block beneath, so the image never jumps to make room for text.
 */
export function Steps() {
  return (
    <Scene track={255} label="०७ २९ पायऱ्या" className="s07">
      <Stage className="s07-stage">
        <div className="s07-frame">
          <div
            className="s07-plate"
            style={{ transform: `scale(calc(1.42 - var(--q,0) * .4)) translateY(calc(var(--q,0) * -22px))` }}
          >
            <Img media={PHOTOS.entrance} slot="dategad.entrance" fill sizes="100vw" />
          </div>

          <div className="s07-rail" aria-hidden="true">
            <div className="s07-rail-fill" style={{ height: 'calc(var(--q,0) * 100%)' }} />
          </div>

          <div
            className="s07-count"
            aria-hidden="true"
            style={{
              opacity: `calc(.28 + var(--q,0) * .5)`,
              transform: `scale(calc(.82 + var(--q,0) * .18))`,
            }}
          >
            {V2.steps.count}
          </div>
        </div>

        <div className="s07-well">
          <Seq minHeight={120}>
            <Beat from={0.04} to={0.38} rate={9}>{V2.steps.lines[0]}</Beat>
            <Beat from={0.44} to={0.74} rate={9}>{V2.steps.lines[1]}</Beat>
            <Beat from={0.8} rate={9}>{V2.steps.lines[2]}</Beat>
          </Seq>
        </div>
      </Stage>
    </Scene>
  )
}
