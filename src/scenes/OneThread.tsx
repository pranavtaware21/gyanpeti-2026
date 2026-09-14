import { Scene, Stage } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { useScript } from '../content/useScript'
import { DISTRICTS, FIRST_YEAR, LAST_YEAR, num } from '../content/derived'
import { useI18n } from '../content/i18n'

/**
 * 13 — एकच धागा
 *
 * The closing figures are arithmetic over marutis.ts and nothing else: the
 * span is the earliest and latest इ.स. year actually present, and the district
 * tally is a count. If a row is corrected, this scene corrects itself — which
 * is the only reason it is allowed to state numbers at all.
 */
export function OneThread() {
  const S = useScript()
  const { lang } = useI18n()
  const dim = ramp(0.44, 5)
  const name = ramp(0.5, 8)

  return (
    <Scene track={230} label="१३ एकच धागा" className="s13">
      <Stage className="s13-stage">
        <div className="s13-stanza">
          {S.thread.lines.map((line, i) => (
            <div
              key={line}
              style={{ opacity: `calc(${ramp(0.02 + i * 0.1, 10)} - ${dim} * .6)` }}
            >
              {line}
            </div>
          ))}
        </div>

        <p className="s13-lead" style={{ opacity: ramp(0.38, 8) }}>
          {S.thread.lead}
        </p>

        <h2
          className="s13-name"
          style={{ opacity: name, transform: `scale(calc(.84 + ${name} * .16))` }}
        >
          {S.thread.name}
        </h2>

        <div className="s13-facts" style={{ opacity: ramp(0.66, 7) }}>
          <div className="s13-span">
            {S.thread.span
              .replace('{a}', num(FIRST_YEAR, lang))
              .replace('{b}', num(LAST_YEAR, lang))}
          </div>
          <div className="s13-tail" style={{ opacity: ramp(0.78, 7) }}>
            {S.thread.tail}
          </div>
          <div className="s13-districts">
            {DISTRICTS.map((d) => `${d.name} ${num(d.count, lang)}`).join(' · ')}
          </div>
        </div>
      </Stage>
    </Scene>
  )
}
