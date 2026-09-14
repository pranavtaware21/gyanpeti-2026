import { useMemo } from 'react'
import { useI18n } from './i18n'
import { V2, type Say } from './v2'

/**
 * The script, resolved to the language being read.
 *
 * `V2` stores every line as `{ mr, en }`. A scene should not have to know that:
 * it wants a string. This walks the whole tree once per language change and
 * hands back the same shape with plain strings in it, so a scene reads
 * `S.close.morya` exactly as it read `V2.close.morya` before.
 *
 * Memoised on the language, so the walk happens twice in a session at most —
 * not on every scroll frame.
 */

const isSay = (v: unknown): v is Say =>
  typeof v === 'object' && v !== null && 'mr' in v && 'en' in v

type Resolved<T> = T extends Say
  ? string
  : T extends readonly (infer U)[]
    ? Resolved<U>[]
    : T extends object
      ? { [K in keyof T]: Resolved<T[K]> }
      : T

function resolve<T>(node: T, lang: 'mr' | 'en'): Resolved<T> {
  if (isSay(node)) return node[lang] as Resolved<T>
  if (Array.isArray(node)) return node.map((n) => resolve(n, lang)) as Resolved<T>
  if (typeof node === 'object' && node !== null) {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(node)) out[k] = resolve(v, lang)
    return out as Resolved<T>
  }
  return node as Resolved<T>
}

export function useScript() {
  const { lang } = useI18n()
  // The provider carries mr/hi/en; this piece is written in two, and Hindi
  // readers get the Marathi rather than a half-translated screen.
  const l: 'mr' | 'en' = lang === 'en' ? 'en' : 'mr'
  return useMemo(() => resolve(V2, l), [l])
}
