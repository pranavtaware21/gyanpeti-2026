import { useEffect, useRef, useState } from 'react'
import type { Media } from '../content/types'
import { useI18n } from '../content/i18n'
import { Missing } from './Missing'

interface Props {
  media: Media | null
  slot: string
  priority?: boolean
  className?: string
  sizes?: string
  /**
   * Fill the parent instead of reserving an aspect box.
   *
   * Most photographs in the piece sit in the flow and must hold their shape so
   * nothing shifts while they arrive. The scene grounds do the opposite: they
   * are absolutely positioned behind the type, already have a box, and an
   * aspect-ratio on top of that would fight it.
   */
  fill?: boolean
}

/**
 * Responsive picture with an AVIF → WebP → JPEG ladder and a blurred
 * placeholder that holds the exact aspect box, so nothing on the page shifts
 * while a photograph arrives over festival wifi.
 */
export function Img({ media, slot, priority, className, sizes = '100vw', fill }: Props) {
  const { t } = useI18n()
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [media])

  if (!media) return <Missing slot={slot} kind="image" />

  /*
    Every derived path is built off BASE_URL rather than a leading slash.

    A leading slash is the domain root, which is correct on a root domain and
    wrong on GitHub Pages, where the site lives under /<repo>/ — every
    photograph would 404 and the whole piece would render as empty boxes.
    BASE_URL is '/' in dev and whatever vite.config sets at build time.
  */
  const base = import.meta.env.BASE_URL

  // Never wider than the original: the pipeline does not upscale, so asking
  // for a width it skipped would 404 and the browser would render nothing.
  const widths = media.widths?.length ? media.widths : [480]
  const largest = widths[widths.length - 1]
  const set = (ext: string) =>
    widths.map((w) => `${base}img/derived/${media.src}-${w}.${ext} ${w}w`).join(', ')

  return (
    <div
      className={`img ${fill ? 'img--fill' : ''} ${className ?? ''} ${loaded ? 'is-loaded' : ''}`}
      style={{
        aspectRatio: fill ? undefined : media.ratio ?? 4 / 5,
        backgroundImage: media.lqip ? `url(${media.lqip})` : undefined,
      }}
    >
      <picture>
        <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
        <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
        <img
          ref={imgRef}
          src={`${base}img/derived/${media.src}-${largest}.jpg`}
          alt={t(media.alt)}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          // A missing derivative must not leave a blank hole on screen.
          onError={() => setLoaded(true)}
        />
      </picture>
      {media.credit && <span className="img-credit">{media.credit}</span>}
    </div>
  )
}
