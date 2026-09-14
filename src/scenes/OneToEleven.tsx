import { Scene, Stage } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { PHOTOS } from '../content/v2'
import { useScript } from '../content/useScript'
import { Img } from '../ui/Img'

/**
 * 11 — एक → अकरा
 *
 * A single photograph becomes the numeral १, which becomes ११. Three states
 * in the same spot, so the substitution is the whole point rather than a
 * transition between two layouts.
 */
export function OneToEleven() {
  const S = useScript()
  const show = ramp(0, 9)
  const one = ramp(0.32, 14)
  const eleven = ramp(0.56, 14)

  return (
    <Scene track={215} label="११ एक → अकरा" className="s11">
      <Stage className="s11-stage">
        <div
          className="s11-plate"
          style={{
            opacity: `calc(${show} - ${ramp(0.42, 4)} * .76)`,
            transform: `scale(calc(.9 + ${show} * .1))`,
          }}
        >
          <Img media={PHOTOS.shrine} slot="dategad.shrine" fill sizes="200px" />
        </div>

        <div
          className="s11-num"
          aria-hidden="true"
          style={{
            opacity: `calc(${one} - ${eleven})`,
            transform: `scale(calc(.55 + ${one} * .45 + ${eleven} * .3))`,
          }}
        >
          १
        </div>
        <div
          className="s11-num"
          aria-hidden="true"
          style={{ opacity: eleven, transform: `scale(calc(.66 + ${eleven} * .34))` }}
        >
          ११
        </div>

        <div
          className="s11-top"
          style={{ opacity: `calc(${ramp(0.06, 8)} - ${ramp(0.34, 6)})` }}
        >
          {S.oneToEleven.one}
        </div>

        <div
          className="s11-bottom"
          style={{ opacity: `calc(${ramp(0.36, 7)} - ${ramp(0.68, 6)})` }}
        >
          {S.oneToEleven.bridge}
        </div>
        <div className="s11-bottom s11-final" style={{ opacity: ramp(0.78, 7) }}>
          <i>{S.oneToEleven.numEleven}</i> {S.oneToEleven.eleven}
        </div>
      </Stage>
    </Scene>
  )
}
