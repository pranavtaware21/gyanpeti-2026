import { useEffect, useRef, useState } from 'react'

/**
 * A live readout of what the scroll engine is actually doing, on the device
 * that is actually misbehaving.
 *
 * Everything about this piece has been verified in a headless browser, and
 * headless browsers do not have the two things that make a real phone
 * different: a URL bar that resizes the viewport, and whatever else iOS is
 * doing that has survived three attempted fixes. Rather than guess a fourth
 * time, this prints the numbers so they can be read off a screenshot.
 *
 * Only mounts with `?debug=1`, so visitors never see it.
 */
export function Diagnostics() {
  const [, tick] = useState(0)
  const box = useRef<HTMLDivElement>(null)
  const minVh = useRef(Infinity)
  const maxVh = useRef(0)

  useEffect(() => {
    let raf = 0
    const loop = () => { raf = requestAnimationFrame(loop); tick((n) => (n + 1) % 1000) }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const vhVar = getComputedStyle(document.documentElement).getPropertyValue('--vh').trim()
  minVh.current = Math.min(minVh.current, innerHeight)
  maxVh.current = Math.max(maxVh.current, innerHeight)

  const scenes = [...document.querySelectorAll<HTMLElement>('[data-scene]')]
  const active = scenes
    .map((s, i) => ({ i: i + 1, label: s.getAttribute('aria-label') ?? '', q: parseFloat(s.style.getPropertyValue('--q') || '0'), r: s.getBoundingClientRect() }))
    .filter((s) => s.r.bottom > 0 && s.r.top < innerHeight)

  // How many stages are actually pinned to the top right now? Should be one.
  const pinned = scenes.filter((s) => {
    const st = s.querySelector<HTMLElement>('.stage')
    if (!st) return false
    const r = st.getBoundingClientRect()
    return Math.abs(r.top) < 2
  }).length

  const stage0 = scenes[0]?.querySelector<HTMLElement>('.stage')
  const stageH = stage0 ? Math.round(stage0.getBoundingClientRect().height) : 0
  const stickyOK = stage0 ? getComputedStyle(stage0).position : '?'

  const build = (document.querySelector('script[src*="assets/"]') as HTMLScriptElement | null)
    ?.src.split('/').pop() ?? 'unknown'

  return (
    <div ref={box} className="diag">
      <div><b>build</b> {build}</div>
      <div><b>--vh</b> {vhVar || 'UNSET'} · <b>innerH</b> {innerHeight} (seen {minVh.current}–{maxVh.current})</div>
      <div><b>stage</b> {stageH}px {stickyOK} · <b>pinned</b> {pinned}</div>
      <div><b>scrollY</b> {Math.round(scrollY)} / {document.documentElement.scrollHeight}</div>
      <div><b>visible scenes</b> {active.length}</div>
      {active.map((s) => (
        <div key={s.i}>&nbsp;&nbsp;{s.label} q={s.q.toFixed(3)} top={Math.round(s.r.top)}</div>
      ))}
      <div style={{ opacity: 0.7 }}>{navigator.userAgent.slice(0, 60)}</div>
    </div>
  )
}
