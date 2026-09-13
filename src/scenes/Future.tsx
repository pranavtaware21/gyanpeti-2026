import { Scene, Stage, Seq, Beat } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { V2 } from '../content/v2'

/**
 * 17 — where one book goes.
 *
 * Five words step down a rule, indented unevenly so the eye walks rather than
 * scans a list. The scene ends by closing the paper back to basalt — the only
 * way out of the inversion opened in scene 16, and the visual cue that the
 * argument is finished and the piece is returning to the object in the room.
 */
export function Future() {
  const indents = [38, 96, 52, 112, 44]
  const tops = [0, 20, 40, 60, 80]

  return (
    <Scene track={300} label="१७ भविष्य" className="s17">
      <Stage className="s17-stage on-paper">
        <div className="s17-path">
          <div
            className="s17-rule"
            aria-hidden="true"
            style={{ height: `calc(${ramp(0, 1.6)} * 100%)` }}
          />
          {V2.future.path.map((word, i) => {
            const on = ramp(0.04 + i * 0.08, 9)
            return (
              <div
                key={word}
                className={`s17-word ${i === 4 ? 'is-last' : ''}`}
                style={{
                  left: `${indents[i]}px`,
                  top: `${tops[i]}%`,
                  opacity: on,
                  transform: `translateX(calc((1 - ${on}) * -22px))`,
                }}
              >
                {word}
              </div>
            )
          })}
        </div>

        <div className="s17-well">
          <Seq minHeight={120}>
            <Beat from={0.44} to={0.58} rate={9}>{V2.future.lines[0]}</Beat>
            <Beat from={0.6} to={0.7} rate={9}>{V2.future.lines[1]}</Beat>
            <Beat from={0.72} to={0.78} rate={9} outRate={12}>{V2.future.lines[2]}</Beat>
            <Beat from={0.78} to={0.93} rate={10} outRate={20} className="s17-close">
              {V2.future.close}
            </Beat>
          </Seq>
        </div>

        <div
          className="s17-shut"
          aria-hidden="true"
          style={{ clipPath: `circle(calc(${ramp(0.965, 30)} * 130%) at 50% 54%)` }}
        />
      </Stage>
    </Scene>
  )
}
