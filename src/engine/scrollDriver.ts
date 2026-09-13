/**
 * One scroll ticker for the whole document.
 *
 * Every scene in v2 is a tall section with a sticky 100dvh stage inside it.
 * The section's height is the scrub track; the sticky child is the frame you
 * watch. Two numbers describe that, and the difference between them matters:
 *
 *   --p  enter progress. 0 when the section's top edge is one viewport below
 *        the fold, 1 when its bottom edge has passed one viewport above.
 *        Spans the whole approach, so it is the one to use for a scene that
 *        simply fades in as you reach it.
 *
 *   --q  scrub progress. 0 the instant the sticky stage locks to the top of
 *        the viewport, 1 the instant it unlocks. This is the only interval
 *        during which the stage is actually pinned on screen, so every
 *        storyboarded beat — text swapping, a shape morphing, a rail
 *        travelling — is keyed to --q and nothing else.
 *
 *   --g  the whole document, 0–1, published on <html> for the progress rule.
 *
 * All of it is published as CSS custom properties. React never renders while
 * you scroll: the compositor does the work. React is told only about discrete
 * values a component genuinely needs, and only when they change.
 *
 * Reads for every tracked scene are batched before any write, so a page of
 * twenty-one sections still costs one layout flush per frame rather than
 * twenty-one. Scenes far from the viewport are skipped entirely by an
 * IntersectionObserver rather than measured and discarded.
 */

interface Entry {
  el: HTMLElement
  lastP: number
  lastQ: number
  near: boolean
  /** Quantised notification, e.g. which of the eleven is centred. */
  steps?: number
  lastStep: number
  onStep?: (n: number) => void
}

const entries = new Map<HTMLElement, Entry>()
const docListeners = new Set<(p: number) => void>()

/** Subscribe to the whole document's 0–1 progress. */
export function onDocProgress(fn: (p: number) => void) {
  docListeners.add(fn)
  return () => { docListeners.delete(fn) }
}

let lastDoc = -1
let raf = 0
let io: IntersectionObserver | null = null

function ensureObserver() {
  if (io) return io
  io = new IntersectionObserver(
    (records) => {
      for (const r of records) {
        const e = entries.get(r.target as HTMLElement)
        if (e) e.near = r.isIntersecting
      }
    },
    // A generous margin so a scene is already tracking before it appears.
    { rootMargin: '60% 0px 60% 0px', threshold: 0 },
  )
  return io
}

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n)

function frame() {
  raf = requestAnimationFrame(frame)
  const vh = innerHeight || 1

  const max = document.documentElement.scrollHeight - vh
  const doc = max > 0 ? clamp01(scrollY / max) : 0
  if (Math.abs(doc - lastDoc) > 0.0008) {
    lastDoc = doc
    document.documentElement.style.setProperty('--g', doc.toFixed(4))
    // Kept under its old name too: the travelling light reads --doc.
    document.documentElement.style.setProperty('--doc', doc.toFixed(4))
    docListeners.forEach((fn) => fn(doc))
  }

  // Read pass. Nothing is written to the DOM inside this loop.
  const pending: { e: Entry; p: number; q: number }[] = []
  for (const e of entries.values()) {
    if (!e.near) continue
    const r = e.el.getBoundingClientRect()
    const p = clamp01((vh - r.top) / Math.max(1, r.height + vh))
    // The sticky child is pinned for exactly (height − viewport) pixels.
    const q = clamp01(-r.top / Math.max(1, r.height - vh))
    pending.push({ e, p, q })
  }

  // Write pass.
  for (const { e, p, q } of pending) {
    if (Math.abs(p - e.lastP) > 0.0015) {
      e.lastP = p
      e.el.style.setProperty('--p', p.toFixed(4))
    }
    if (Math.abs(q - e.lastQ) > 0.0015) {
      e.lastQ = q
      e.el.style.setProperty('--q', q.toFixed(4))
    }
    if (e.steps && e.onStep) {
      const n = Math.min(e.steps, Math.max(1, Math.ceil(q * e.steps)))
      if (n !== e.lastStep) {
        e.lastStep = n
        e.onStep(n)
      }
    }
  }
}

export function register(
  el: HTMLElement,
  opts?: { steps?: number; onStep?: (n: number) => void },
) {
  entries.set(el, {
    el,
    lastP: -1,
    lastQ: -1,
    near: false,
    steps: opts?.steps,
    lastStep: -1,
    onStep: opts?.onStep,
  })
  ensureObserver().observe(el)
  if (!raf) raf = requestAnimationFrame(frame)

  return () => {
    io?.unobserve(el)
    entries.delete(el)
    if (entries.size === 0 && raf) {
      cancelAnimationFrame(raf)
      raf = 0
    }
  }
}
