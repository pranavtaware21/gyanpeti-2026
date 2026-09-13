import { Scene, Stage, Seq, Beat } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { V2 } from '../content/v2'
import { Book, Coconut, Garland, Pedhe } from '../ui/OfferingForms'

/**
 * 15 — the offering changes shape.
 *
 * Four offerings in one place: garland, coconut, pedhe, and then a book. Each
 * is drawn rather than suggested (see `ui/OfferingForms.tsx`), and each holds
 * the centre of the screen alone before handing over — the word underneath
 * changes on exactly the same beat, so the object and its name never disagree.
 *
 * The argument is that the act is unchanged and only the thing in the hands is
 * different, so all four sit at the same size, in the same spot, in the same
 * colour. Nothing about the book is emphasised except that it arrives last.
 */
export function Offering() {
  const r1 = ramp(0.22, 6)
  const r2 = ramp(0.42, 6)
  const r3 = ramp(0.7, 6)

  /**
   * A form is on screen between `on` and `off`, and settles the last 10% of
   * its size as it arrives. The garland is already there when the scene opens,
   * so it takes `enter` as its arrival instead of a hand-over from the form
   * before it.
   */
  const enter = ramp(0, 8)
  const form = (on: string, off?: string) => ({
    opacity: off ? `calc(${on} - ${off})` : on,
    transform: `scale(calc(.9 + ${on} * .1))`,
  })

  return (
    <Scene track={300} label="१५ अर्पण" className="s15">
      <Stage className="s15-stage">
        <div className="s15-wash" aria-hidden="true" style={{ transform: `scale(calc(.7 + var(--q,0) * .6))` }} />

        <div className="s15-top">
          <Seq minHeight={72}>
            <Beat from={0} to={0.14} rate={14} outRate={9}>{V2.offering.lead}</Beat>
            <Beat from={0.14} to={0.62} rate={9} outRate={6}>{V2.offering.always}</Beat>
            <Beat from={0.68} rate={7}>{V2.offering.but}</Beat>
          </Seq>
        </div>

        <div className="s15-forms">
          <Garland style={{ opacity: `calc(1 - ${r1})`, transform: `scale(calc(.9 + ${enter} * .1))` }} />
          <Coconut style={form(r1, r2)} />
          <Pedhe style={form(r2, r3)} />
          <Book style={form(r3)} />
        </div>

        <div className="s15-words">
          <div style={{ opacity: `calc(1 - ${r1})` }}>{V2.offering.things[0]}</div>
          <div style={{ opacity: `calc(${r1} - ${r2})` }}>{V2.offering.things[1]}</div>
          <div style={{ opacity: `calc(${r2} - ${r3})` }}>{V2.offering.things[2]}</div>
          <div className="is-accent" style={{ opacity: r3 }}>{V2.offering.book}</div>
        </div>

        <div
          className="s15-by"
          style={{ opacity: `calc(${ramp(0.5, 8)} - ${ramp(0.68, 8)})` }}
        >
          {V2.offering.by}
        </div>
      </Stage>
    </Scene>
  )
}
