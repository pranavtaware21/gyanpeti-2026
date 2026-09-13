import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Lang, Sacred, Text } from './types'

const KEY = 'gp26.lang'
const SUPPORTED: Lang[] = ['mr', 'hi', 'en']

function detect(): Lang {
  const forced = new URLSearchParams(location.search).get('lang') as Lang | null
  if (forced && SUPPORTED.includes(forced)) return forced
  try {
    const saved = localStorage.getItem(KEY) as Lang | null
    if (saved && SUPPORTED.includes(saved)) return saved
  } catch { /* private mode */ }
  // Marathi is the default. A Marathi phone stays Marathi; anything else that
  // is not Hindi falls back to English rather than forcing a chooser on arrival.
  const nav = navigator.language?.slice(0, 2)
  if (nav === 'mr') return 'mr'
  if (nav === 'hi') return 'hi'
  return 'mr'
}

interface I18n {
  lang: Lang
  setLang: (l: Lang) => void
  /** Prose. Returns '' when the slot has not been filled. */
  t: (text: Text | undefined) => string
  /** True when a prose slot is still empty. */
  missing: (text: Text | undefined) => boolean
  /** Sacred text is never translated — only the roman aid is toggled. */
  romanize: boolean
}

const Ctx = createContext<I18n | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detect)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    document.documentElement.lang = l
    try { localStorage.setItem(KEY, l) } catch { /* private mode */ }
  }, [])

  const value = useMemo<I18n>(() => {
    const t = (text: Text | undefined) => {
      if (!text) return ''
      // Fall back to Marathi rather than showing nothing: a visitor reading
      // English would rather see the original than an empty screen.
      return (text[lang] ?? '').trim() || text.mr.trim()
    }
    return {
      lang,
      setLang,
      t,
      missing: (text) => !t(text),
      romanize: lang === 'en',
    }
  }, [lang, setLang])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useI18n outside I18nProvider')
  return ctx
}

/** Sacred text as it should be rendered for the current language. */
export function useSacred() {
  const { romanize } = useI18n()
  return useCallback(
    (s: Sacred) => ({ dev: s.dev, roman: romanize ? s.roman : null, gloss: s.gloss }),
    [romanize],
  )
}
