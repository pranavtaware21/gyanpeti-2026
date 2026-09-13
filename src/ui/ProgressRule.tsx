/**
 * The hairline at the top of the screen.
 *
 * It reads `--g` straight off the document element, so it costs nothing:
 * the scroll driver already publishes that value and the compositor fills the
 * rule. No state, no render, no listener.
 *
 * It is the only piece of persistent chrome in the whole piece. There is no
 * nav, no chapter rail and no language switch on screen — a visitor standing
 * in front of the decoration is holding the phone one-handed and every extra
 * control is something to hit by accident.
 */
export function ProgressRule() {
  return (
    <div className="rule" aria-hidden="true">
      <div className="rule-fill" />
    </div>
  )
}
