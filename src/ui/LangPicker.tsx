import { useEffect, useState } from 'react'
import { useI18n } from '../content/i18n'
import { useScript } from '../content/useScript'
import { onDocProgress } from '../engine/scrollDriver'

/**
 * मराठी / EN.
 *
 * The piece has no chrome by design — no nav, no buttons — so the one control
 * that has to exist is made as close to absent as it can be while staying
 * reachable. It sits in the top corner, and it fades away while the visitor is
 * scrolling and returns a moment after they stop: present when you are looking
 * for it, gone while you are reading.
 *
 * It is a real pair of buttons rather than a toggle, because a visitor who
 * reads neither script well should be able to see which one is currently on
 * without having to work out what a switch means.
 */
export function LangPicker() {
  const { lang, setLang } = useI18n()
  const S = useScript()
  const [moving, setMoving] = useState(false)

  useEffect(() => {
    let timer: number | undefined
    return onDocProgress(() => {
      setMoving(true)
      clearTimeout(timer)
      timer = window.setTimeout(() => setMoving(false), 900)
    })
  }, [])

  const current = lang === 'en' ? 'en' : 'mr'

  return (
    <div className={`lang ${moving ? 'is-away' : ''}`}>
      <button
        className={`lang-opt ${current === 'mr' ? 'is-on' : ''}`}
        aria-pressed={current === 'mr'}
        onClick={() => setLang('mr')}
      >
        {S.ui.langMr}
      </button>
      <span className="lang-sep" aria-hidden="true">·</span>
      <button
        className={`lang-opt ${current === 'en' ? 'is-on' : ''}`}
        aria-pressed={current === 'en'}
        onClick={() => setLang('en')}
      >
        {S.ui.langEn}
      </button>
    </div>
  )
}
