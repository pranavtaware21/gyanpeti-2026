import { Scene, Stage, Seq, Beat } from '../ui/Scene'
import { ramp } from '../engine/scrub'
import { GYAN_PHOTOS } from '../content/v2'
import { useScript } from '../content/useScript'
import { Img } from '../ui/Img'
import { useOverlays } from '../ui/Overlays'
import { useI18n } from '../content/i18n'

/**
 * 16 — the page turns to paper.
 *
 * The one luminance event in the piece. A circle of paper opens out of the
 * centre and everything after it is ink on white until scene 17 closes back
 * to the dark. That inversion carries the thesis — the offering stops being
 * an object and becomes something you read — so it happens exactly once and
 * is never used again for emphasis.
 *
 * Underneath the questions, eight photographs of past शैक्षणिक साहित्य वाटप
 * deal themselves out onto the paper, one per beat, as if laid on a table.
 * They are the answer to the scene's own rhetorical question: the mandal has
 * already put books into children's hands, so "जर त्या पुस्तकातून एखाद्या
 * मुलाच्या हातात ज्ञान पोहोचलं तर?" is a record, not a hope. Each is tappable.
 *
 * They deal from the centre outwards — each starts displaced toward the middle
 * of the row and larger, then settles back into its slot — which reads as
 * cards being dropped from one hand rather than eight images fading up.
 */
export function GyanPeti() {
  const S = useScript()
  const { t } = useI18n()
  const { zoom } = useOverlays()
  const open = ramp(0, 7)

  return (
    <Scene track={330} label="१६ ज्ञान पेटी" className="s16">
      <Stage className="s16-stage">
        <div
          className="s16-paper"
          aria-hidden="true"
          style={{ clipPath: `circle(calc(${open} * 128%) at 50% 46%)` }}
        />

        <div className="s16-body on-paper" style={{ opacity: ramp(0.16, 8) }}>
          <Seq minHeight={150}>
            <Beat from={0.16} to={0.34} rate={10}>
              {S.gyanPeti.questions[0]}
              <b>{S.gyanPeti.q1Emphasis}</b>
            </Beat>
            <Beat from={0.36} to={0.52} rate={10}>{S.gyanPeti.questions[1]}</Beat>
            <Beat from={0.54} to={0.7} rate={10}>{S.gyanPeti.questions[2]}</Beat>
            <Beat from={0.72} to={0.86} rate={10} outRate={12}>{S.gyanPeti.questions[3]}</Beat>

            <Beat from={0.88} rate={12} className="s16-final">
              <div className="s16-becomes">{S.gyanPeti.becomes}</div>
              <div className="s16-offering">{S.gyanPeti.offering}</div>
              <div className="s16-therefore">{S.gyanPeti.therefore}</div>
              <div className="s16-name">{S.gyanPeti.name}</div>
            </Beat>
          </Seq>
        </div>

        <div className="s16-deck">
          {GYAN_PHOTOS.map((photo, i) => {
            const at = 0.16 + i * 0.09
            const settled = ramp(at + 0.09, 16)
            const col = i % 4
            const row = i < 4 ? 0 : 1
            // Displacement toward the centre of the row, so cards arrive from
            // one hand rather than each from its own corner.
            const drift = [58, 20, -18, -56][col]
            /*
              Columns are a percentage of the reading column, not fixed pixels.
              The design places them at -186/-92/+2/+96 from centre, which is
              four 96px cards laid out for a 480px column — on a 375px phone,
              the phone this is actually read on, the outer two run off the
              edge and get clipped. Proportional placement holds the same
              arrangement at any width.
            */
            return (
              <button
                type="button"
                key={photo.key}
                className="s16-card"
                aria-label={`${t(photo.alt)} · ${S.ui.enlarge}`}
                onClick={() => zoom(photo.media, t(photo.alt))}
                style={{
                  left: `${[2.5, 26.5, 50.5, 74.5][col]}%`,
                  bottom: row === 0 ? '106px' : '0px',
                  zIndex: i + 1,
                  opacity: ramp(at, 16),
                  transform:
                    `translate(calc((1 - ${settled}) * ${drift}px), calc((1 - ${settled}) * ${row === 0 ? -8 : -46}px)) ` +
                    `scale(calc(1 + (1 - ${settled}) * .95)) ` +
                    `rotate(${[-4, 3, -3, 4, 2, -2, 3, -4][i]}deg)`,
                }}
              >
                <Img media={photo.media} slot={photo.key} sizes="96px" />
              </button>
            )
          })}
        </div>
      </Stage>
    </Scene>
  )
}
