/**
 * A photograph that has not been taken yet.
 *
 * Two of the twenty-one scenes are waiting on pictures only the mandal can
 * supply: the गणपती carved on the facing wall at Dategad, and the finished
 * decoration itself. Both render as a labelled gap rather than collapsing,
 * so it is impossible to print the QR code without noticing what is still
 * missing. `?slots=0` hides them for a clean walkthrough.
 */
export function PhotoGap({
  slot,
  label = 'PHOTO येणे बाकी',
  note,
  className = '',
}: {
  slot: string
  label?: string
  note?: string
  className?: string
}) {
  const hidden = new URLSearchParams(location.search).get('slots') === '0'
  if (hidden) return null

  return (
    <div className={`gap ${className}`} role="note">
      <span className="gap-label">{label}</span>
      {note && <span className="gap-note">{note}</span>}
      <code className="gap-id">{slot}</code>
    </div>
  )
}
