import { useI18n } from '../content/i18n'
import { SCRIPT } from '../content/script'

/**
 * A slot with no content yet.
 *
 * This renders as a visible, labelled gap rather than collapsing to nothing.
 * The point is that an unfinished experience should look unfinished — it must
 * be impossible to print the QR code without noticing what is still missing.
 * `?slots=0` hides them for a clean walkthrough.
 */
export function Missing({ slot, kind = 'text' }: { slot: string; kind?: 'text' | 'image' }) {
  const { t } = useI18n()
  const hidden = new URLSearchParams(location.search).get('slots') === '0'
  if (hidden) return null

  return (
    <div className={`slot slot--${kind}`} role="note">
      <span className="slot-label">
        {t(kind === 'image' ? SCRIPT.ui.missingPhoto : SCRIPT.ui.missing)}
      </span>
      <code className="slot-id">{slot}</code>
    </div>
  )
}

/** True when a prose slot has content for the current language. */
export function useHasText(text: { mr: string; hi?: string; en?: string } | undefined) {
  const { t } = useI18n()
  return !!t(text)
}

/** True when slot markers are being shown at all. */
export const slotsVisible = () =>
  new URLSearchParams(location.search).get('slots') !== '0'

/** Prose that may be missing. Renders the slot marker instead of an empty box. */
export function Prose({
  text, slot, className,
}: { text: { mr: string; hi?: string; en?: string } | undefined; slot: string; className?: string }) {
  const { t } = useI18n()
  const value = t(text)
  if (!value) return <Missing slot={slot} />
  return (
    <div className={className}>
      {value.split(/\n{2,}/).map((para, i) => <p key={i}>{para}</p>)}
    </div>
  )
}
