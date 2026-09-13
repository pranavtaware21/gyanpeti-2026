import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
  type ReactNode,
} from 'react'
import type { Media } from '../content/types'
import { MARUTIS } from '../content/marutis'
import { toDev } from '../content/derived'
import { haptic } from '../engine/haptics'
import { Img } from './Img'

/**
 * The two things in the piece that sit on top of the scroll: the detail sheet
 * for one of the eleven, and a full-bleed look at a photograph.
 *
 * Both are held here rather than inside the scenes that open them, because
 * scene 12 and scene 19 both open the same sheet and three separate scenes
 * open the zoom. One owner, one escape key, one scroll lock.
 */

interface Overlays {
  openMaruti: (index: number) => void
  zoom: (media: Media | null, alt?: string) => void
}

const Ctx = createContext<Overlays | null>(null)

export const useOverlays = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useOverlays outside OverlayProvider')
  return ctx
}

/**
 * Widest derivative the pipeline actually emitted for this image.
 *
 * BASE_URL, not a leading slash — the site is served from /<repo>/ on GitHub
 * Pages and a root-absolute path would 404 there. See ui/Img.tsx.
 */
export function largestSrc(media: Media): string {
  const widths = media.widths?.length ? media.widths : [480]
  return `${import.meta.env.BASE_URL}img/derived/${media.src}-${widths[widths.length - 1]}.jpg`
}

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [sel, setSel] = useState<number | null>(null)
  const [zoomed, setZoomed] = useState<{ media: Media; alt: string } | null>(null)

  const openMaruti = useCallback((index: number) => {
    haptic.tap()
    setSel(index)
  }, [])

  const zoom = useCallback((media: Media | null, alt = '') => {
    if (!media) return
    haptic.tap()
    setZoomed({ media, alt })
  }, [])

  const open = sel !== null || zoomed !== null

  /*
    Escape dismisses the topmost layer only.

    The zoom can open on top of the sheet — tapping the photograph of one of
    the eleven enlarges it without losing your place in the set — so closing
    both at once would throw the visitor back to the scroll when they only
    meant to stop looking at the picture.

    The page underneath must not scroll while either is up: on iOS a scrolling
    backdrop is how a sheet gets dismissed by accident.
  */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (zoomed) setZoomed(null)
      else setSel(null)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      removeEventListener('keydown', onKey)
    }
  }, [open, zoomed])

  const value = useMemo(() => ({ openMaruti, zoom }), [openMaruti, zoom])

  return (
    <Ctx.Provider value={value}>
      {children}
      {sel !== null && (
        <MarutiSheet
          index={sel}
          onClose={() => setSel(null)}
          onStep={(d) => {
            haptic.tap()
            setSel((i) => (i === null ? i : (i + d + MARUTIS.length) % MARUTIS.length))
          }}
          onZoom={zoom}
          locked={zoomed !== null}
        />
      )}
      {zoomed && (
        <div
          className="zoom"
          role="dialog"
          aria-modal="true"
          aria-label={zoomed.alt}
          onClick={() => setZoomed(null)}
        >
          <img src={largestSrc(zoomed.media)} alt={zoomed.alt} />
        </div>
      )}
    </Ctx.Provider>
  )
}

/**
 * One of the eleven, in full.
 *
 * The माहिती sentence is the most important prose in the project and is shown
 * complete — never truncated, never summarised. When a Maruti has none, the
 * sheet says so rather than padding the space with something plausible.
 */
function MarutiSheet({
  index, onClose, onStep, onZoom, locked,
}: {
  index: number
  onClose: () => void
  onStep: (delta: number) => void
  onZoom: (media: Media | null, alt: string) => void
  /** True while the zoom is open on top of this sheet. */
  locked: boolean
}) {
  const m = MARUTIS[index]
  const story = m.story.mr.trim()

  /*
    Arrow keys walk the eleven as well as the buttons — once the sheet is open
    it is the whole screen, and stepping through the set is its main job.

    Suspended while the zoom is up: otherwise an arrow press would step the
    sheet hidden behind the enlarged photograph, and closing the zoom would
    reveal a different Maruti than the one just being looked at.
  */
  useEffect(() => {
    if (locked) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { onStep(-1); e.preventDefault() }
      if (e.key === 'ArrowRight') { onStep(1); e.preventDefault() }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [onStep, locked])

  return (
    <div className="sheet" role="dialog" aria-modal="true" aria-label={m.name.dev}>
      <button className="sheet-scrim" aria-label="बंद करा" onClick={onClose} />
      <div className="sheet-card">
        <div className="sheet-nav">
          <button
            className="sheet-step"
            aria-label="मागील मारुती"
            onClick={() => onStep(-1)}
          >
            ‹
          </button>
          <span className="sheet-count" aria-live="polite">
            {toDev(m.order)} / {toDev(MARUTIS.length)}
          </span>
          <button
            className="sheet-step"
            aria-label="पुढील मारुती"
            onClick={() => onStep(1)}
          >
            ›
          </button>
        </div>

        {/*
          Tappable, like every other photograph in the piece. The sheet crops
          the murti to a band so the माहिती stays on screen beside it; a visitor
          who wants to actually look at the carving needs the full frame, and
          having tried tapping it on every other scene they will try it here.
        */}
        <button
          type="button"
          className="sheet-photo"
          aria-label={`${m.name.dev} — मोठं करा`}
          onClick={() => onZoom(m.media ?? null, m.name.dev)}
        >
          <Img media={m.media ?? null} slot={`maruti.${m.id}.photo`} sizes="480px" />
        </button>

        <div className="sheet-head">
          <span className="sheet-n">{toDev(m.order)}</span>
          <span className="sheet-name">{m.name.dev}</span>
        </div>
        <div className="sheet-place">
          {m.village.dev} · {m.district.mr}
        </div>
        {m.established && <div className="sheet-year">{m.established.mr}</div>}

        {story
          ? <p className="sheet-info">{story}</p>
          : <div className="slot" role="note">
              <span className="slot-label">माहिती येणे बाकी</span>
              <code className="slot-id">maruti.{m.id}.story</code>
            </div>}

        <button className="sheet-close" onClick={onClose}>बंद करा</button>
      </div>
    </div>
  )
}
