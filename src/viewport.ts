/**
 * One frozen viewport height, published as `--vh`.
 *
 * Every section and every pinned stage is sized from this rather than from
 * `dvh`. The reason is iOS: its URL bar collapses as you scroll down and
 * returns as you scroll up, and unlike Android it genuinely resizes the layout
 * viewport while doing so. With `dvh`, that resize changes the height of all
 * twenty-one sections mid-gesture — the document grows or shrinks by thousands
 * of pixels, the content slides under the visitor's thumb, and the scroll
 * driver (which divides by viewport height) reports a `--q` that lurches. Beats
 * fire at the wrong moment and lines land on top of one another.
 *
 * `svh` is the usual remedy and would probably work, but it cannot be verified
 * in a headless browser: with no browser chrome, `svh`, `lvh` and `dvh` are the
 * same number, so a test can only resize the window, which moves all three.
 * A pixel value we control is testable — freeze it, and a viewport change must
 * produce no reflow at all.
 *
 * It updates only for changes that are actually a new layout: a rotation, or a
 * resize large enough that it cannot be browser chrome. The URL bar is roughly
 * 60–110px on current iPhones, so the threshold sits well above it.
 */

const MIN_REAL_CHANGE = 0.2 // 20% — far more than any browser chrome

let applied = 0

function set(height: number) {
  applied = height
  document.documentElement.style.setProperty('--vh', `${height}px`)
}

/** Re-measure only when the viewport has genuinely changed shape. */
function reconsider() {
  const now = innerHeight || 1
  if (!applied) return set(now)
  if (Math.abs(now - applied) / applied > MIN_REAL_CHANGE) set(now)
}

export function lockViewportHeight() {
  set(innerHeight || 1)

  // A rotation is always a real change, whatever the numbers say.
  addEventListener('orientationchange', () => {
    // The new dimensions are not readable until after the rotation settles.
    setTimeout(() => set(innerHeight || 1), 120)
  })

  addEventListener('resize', reconsider)
}
