import { Scene, Stage } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { V2 } from '../content/v2'
import { DISTRICTS, FIRST_YEAR, LAST_YEAR, toDev } from '../content/derived'

/**
 * 13 — एकच धागा
 *
 * The closing figures are arithmetic over marutis.ts and nothing else: the
 * span is the earliest and latest इ.स. year actually present, and the district
 * tally is a count. If a row is corrected, this scene corrects itself — which
 * is the only reason it is allowed to state numbers at all.
 */
export function OneThread() {
  const dim = ramp(0.44, 5)
  const name = ramp(0.5, 8)

  return (
    <Scene track={230} label="१३ एकच धागा" className="s13">
      <Stage className="s13-stage">
        <div className="s13-stanza">
          {V2.thread.lines.map((line, i) => (
            <div
              key={line}
              style={{ opacity: `calc(${ramp(0.02 + i * 0.1, 10)} - ${dim} * .6)` }}
            >
              {line}
            </div>
          ))}
        </div>

        <p className="s13-lead" style={{ opacity: ramp(0.38, 8) }}>
          {V2.thread.lead}
        </p>

        <h2
          className="s13-name"
          style={{ opacity: name, transform: `scale(calc(.84 + ${name} * .16))` }}
        >
          {V2.thread.name}
        </h2>

        <div className="s13-facts" style={{ opacity: ramp(0.66, 7) }}>
          <div className="s13-span">
            इ.स. {toDev(FIRST_YEAR)} पासून इ.स. {toDev(LAST_YEAR)} पर्यंतचा हा प्रवास…
          </div>
          <div className="s13-tail" style={{ opacity: ramp(0.78, 7) }}>
            {V2.thread.tail}
          </div>
          <div className="s13-districts">
            {DISTRICTS.map((d) => `${d.name} ${toDev(d.count)}`).join(' · ')}
          </div>
        </div>
      </Stage>
    </Scene>
  )
}
