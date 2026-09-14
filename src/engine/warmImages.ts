import generated from '../content/media.generated.json'

/**
 * Fetch every photograph quietly, in story order, once the piece is up.
 *
 * Each `<Img>` is `loading="lazy"`, which is right for a page you land on and
 * read — but this is forty screens of scroll, and a thumb moves faster than a
 * 4G connection. The visitor reaches a scene before its photograph has begun
 * downloading and sees the blurred placeholder instead of the carving.
 *
 * The whole set is about a megabyte, so there is nothing to ration. This waits
 * until the first screen has painted and the browser is idle, then pulls them
 * in the order they are met. Lazy loading stays exactly as it is: by the time
 * the visitor arrives, the file is already in cache and the `<img>` resolves
 * instantly.
 *
 * Requests are deliberately low priority so they can never compete with the
 * fonts or the first photograph, and they are sequential rather than parallel
 * so a slow connection is not saturated by forty at once.
 */

type Entry = { src: string; widths: number[] }
const MANIFEST = generated as Record<string, Entry | undefined>

/** Story order — the scenes a visitor meets first, first. */
const ORDER = [
  'dategad-aerial', 'dategad-entrance', 'dategad-mandir', 'dategad-ganpati',
  'dategad-shrine', 'dategad-both',
  'maruti-01', 'maruti-02', 'maruti-03', 'maruti-04', 'maruti-05', 'maruti-06',
  'maruti-07', 'maruti-08', 'maruti-09', 'maruti-10', 'maruti-11',
  'gyan-01', 'gyan-02', 'gyan-03', 'gyan-04', 'gyan-05', 'gyan-06', 'gyan-07', 'gyan-08',
]

/** The width a phone actually renders; no point pulling the 1440 for a warm-up. */
function bestWidth(widths: number[]): number {
  const want = Math.min(innerWidth || 400, 520) * Math.min(devicePixelRatio || 1, 2)
  return widths.find((w) => w >= want) ?? widths[widths.length - 1]
}

async function pull(name: string) {
  const entry = MANIFEST[name]
  if (!entry?.widths?.length) return
  const url = `${import.meta.env.BASE_URL}img/derived/${entry.src}-${bestWidth(entry.widths)}.avif`
  try {
    await fetch(url, { priority: 'low', cache: 'force-cache' } as RequestInit)
  } catch {
    // A warm-up that fails costs nothing: the <img> will fetch it normally.
  }
}

export function warmImages() {
  const start = async () => {
    for (const name of ORDER) await pull(name)
  }

  // Never compete with first paint, and skip it entirely for anyone who has
  // asked the browser to save data.
  const conn = (navigator as { connection?: { saveData?: boolean } }).connection
  if (conn?.saveData) return

  const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback
  if (idle) idle(start)
  else setTimeout(start, 1200)
}
