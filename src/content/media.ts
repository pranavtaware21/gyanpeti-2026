import type { Media, Text } from './types'
import generated from './media.generated.json'

/**
 * Bridge between the image pipeline and the content files.
 *
 * `npm run assets` writes media.generated.json with each image's real aspect
 * ratio and a tiny blurred placeholder. Looking those up here means a
 * photograph is referenced by name in one place and never by pasting base64
 * into a content file — re-run the pipeline and every scene updates.
 */
type Entry = { src: string; ratio: number; widths: number[]; lqip: string }
const MANIFEST = generated as Record<string, Entry | undefined>

export function media(src: string, alt: Text, credit?: string): Media | null {
  const entry = MANIFEST[src]
  // Missing on purpose: an unprocessed name renders as a labelled gap rather
  // than a broken image, so a forgotten `npm run assets` is visible.
  if (!entry) return null
  return { src: entry.src, ratio: entry.ratio, widths: entry.widths, lqip: entry.lqip, alt, credit }
}

export const hasMedia = (src: string) => !!MANIFEST[src]
