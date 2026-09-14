import { Scene, Stage } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { useScript } from '../content/useScript'

/**
 * 04 — ही एक कथा आहे.
 *
 * The hinge of the whole piece: it states outright that what follows is an
 * argument, not ornament. Three sentences, each taking the screen alone.
 */
export function StoryBegins() {
  const S = useScript()
  const claim = ramp(0.40, 14)

  return (
    <Scene track={175} label="०४ कथा" className="s04">
      <Stage className="s04-stage">
        <div className="s04-rule" style={{ width: 'clamp(0%,calc(var(--q) * 200%),100%)' }} />

        <div
          className="s04-a"
          style={{ opacity: `calc(${ramp(0.04, 9)} - ${ramp(0.40, 14)})` }}
        >
          {S.storyBegins.a}
        </div>

        <div
          className="s04-b"
          style={{
            opacity: `calc(${claim} - ${ramp(0.76, 14)})`,
            transform: `scale(calc(.86 + ${claim} * .14))`,
          }}
        >
          {S.storyBegins.b}
        </div>

        <div className="s04-c" style={{ opacity: ramp(0.76, 14) }}>
          {S.storyBegins.c}
        </div>
      </Stage>
    </Scene>
  )
}
