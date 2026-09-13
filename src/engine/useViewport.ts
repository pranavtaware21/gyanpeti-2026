import { useEffect, useState } from 'react'

/**
 * Which composition to build, not merely how wide the screen is.
 *
 * The two layouts are different pieces of design, not one layout with
 * breakpoints: on a phone the eleven are a vertical journey you swipe, on a
 * wide screen they are a spatial band you scan. Asking "which experience" in
 * one place keeps that decision out of the scene components.
 */
export type Stage = 'hand' | 'wide'

const QUERY = '(min-width: 900px) and (min-height: 560px)'

export function useStage(): Stage {
  const [stage, setStage] = useState<Stage>(() =>
    typeof matchMedia === 'function' && matchMedia(QUERY).matches ? 'wide' : 'hand',
  )

  useEffect(() => {
    const mq = matchMedia(QUERY)
    const onChange = () => setStage(mq.matches ? 'wide' : 'hand')
    onChange()

    // Both, deliberately. The media query's own change event is the right
    // signal and fires once per crossing, but it is not dependable everywhere
    // — under devtools viewport emulation, and on some mobile browsers when
    // the URL bar collapses, matchMedia().matches flips without any event
    // being dispatched. Getting that wrong strands the visitor in the other
    // composition for the rest of the scroll, so a resize listener re-reads
    // the query as a backstop. setState with an unchanged value is a no-op,
    // so the duplicate costs nothing.
    mq.addEventListener('change', onChange)
    addEventListener('resize', onChange)
    addEventListener('orientationchange', onChange)
    return () => {
      mq.removeEventListener('change', onChange)
      removeEventListener('resize', onChange)
      removeEventListener('orientationchange', onChange)
    }
  }, [])

  return stage
}

/** Coarse pointer means touch: hover affordances are pointless there. */
export function useTouch(): boolean {
  const [touch, setTouch] = useState(
    () => typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches,
  )
  useEffect(() => {
    const mq = matchMedia('(pointer: coarse)')
    const onChange = () => setTouch(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return touch
}
