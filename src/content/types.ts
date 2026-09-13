/**
 * Content model.
 *
 * Three tiers, because devotional text cannot be handled the way UI strings are:
 *
 *  Sacred   — names, mantras, shlokas. NEVER translated. Devanagari always,
 *             with a roman transliteration for readers who do not read the
 *             script. An optional gloss explains the meaning *underneath*,
 *             it never replaces the words.
 *  Story    — prose. Fully translated.
 *  UI       — labels. Fully translated.
 */

export type Lang = 'mr' | 'hi' | 'en'

/** Prose. `mr` is the source of truth; other languages derive from it. */
export interface Text {
  mr: string
  hi?: string
  en?: string
}

/** Sacred text. Script is preserved; only the gloss is ever localised. */
export interface Sacred {
  dev: string
  roman: string
  gloss?: Text
}

export interface Media {
  /** Path under /public, without extension. The pipeline emits .avif/.webp/.jpg. */
  src: string
  alt: Text
  /** Intrinsic aspect, used to reserve space and stop layout shift. */
  ratio?: number
  /** Widths actually emitted for this file, written by `npm run assets`. */
  widths?: number[]
  /** Tiny base64 LQIP written by `npm run assets`. */
  lqip?: string
  credit?: string
}

export interface VideoMedia {
  src: string
  poster: string
  alt: Text
  loop?: boolean
}

export interface Maruti {
  id: string
  order: number
  name: Sacred
  village: Sacred
  district: Text
  /** Village-level approximation for the stylised map. Adjustable — this is
   *  layout geometry, not a claim about the exact temple location. */
  approxLatLng: [number, number]
  established?: Text
  story: Text
  significance: Text
  /** The line that ties this form to what the visitor is looking at. */
  decorationLink: Text
  media?: Media | null
  /** Set true once a human has checked the name, village and district. */
  verified: boolean
}

export interface TimelineYear {
  year: number
  /** Devanagari numerals, e.g. २०१२ */
  yearDev: string
  title: Text
  note: Text
  media?: Media | null
}

export interface MakingStep {
  id: string
  label: Sacred
  body: Text
  media?: Media | null
}

/** A tappable point on the photograph of the finished decoration. */
export interface Hotspot {
  id: string
  /** Percent of the image box, 0–100. */
  x: number
  y: number
  label: Sacred
  body: Text
  /** Links this hotspot to one of the eleven, when it is one of them. */
  marutiId?: string
}
