import { Scene, Stage } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { V2 } from '../content/v2'

/**
 * 04 — ही एक कथा आहे.
 *
 * The hinge of the whole piece: it states outright that what follows is an
 * argument, not ornament. Three sentences, each taking the screen alone.
 */
export function StoryBegins() {
  const claim = ramp(0.44, 7)

  return (
    <Scene track={175} label="०४ कथा" className="s04">
      <Stage className="s04-stage">
        <div className="s04-rule" style={{ width: 'clamp(0%,calc(var(--q,0) * 200%),100%)' }} />

        <div
          className="s04-a"
          style={{ opacity: `calc(${ramp(0.08, 8)} - ${ramp(0.42, 6)})` }}
        >
          {V2.storyBegins.a}
        </div>

        <div
          className="s04-b"
          style={{
            opacity: `calc(${claim} - ${ramp(0.74, 6)})`,
            transform: `scale(calc(.86 + ${claim} * .14))`,
          }}
        >
          {V2.storyBegins.b}
        </div>

        <div className="s04-c" style={{ opacity: ramp(0.78, 7) }}>
          {V2.storyBegins.c}
        </div>
      </Stage>
    </Scene>
  )
}
