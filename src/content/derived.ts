import { MARUTIS } from './marutis'
import type { Text } from './types'

/**
 * Facts computed from the supplied data — never invented.
 *
 * The eleven arrive as eleven separate rows, but read together they say
 * things no single row does: that they were founded inside a single decade,
 * that seven of them stand in one district, that two went up in the same
 * year. Those readings belong on screen, and they cost nothing but arithmetic
 * over content the mandal already gave.
 */

const DEV = '०१२३४५६७८९'
export const toDev = (n: number | string) =>
  String(n).replace(/\d/g, (d) => DEV[Number(d)])

/** इ.स. year parsed out of the established string, e.g. "शके १५६६ — इ.स. १६४४". */
function ceYear(i: number): number | null {
  const raw = MARUTIS[i].established?.mr ?? ''
  const m = raw.match(/इ\.स\.\s*([०-९]+)/)
  if (!m) return null
  const n = Number(m[1].replace(/[०-९]/g, (d) => String(DEV.indexOf(d))))
  return Number.isFinite(n) ? n : null
}

export const YEARS = MARUTIS.map((_, i) => ceYear(i))

const known = YEARS.filter((y): y is number => y !== null)
export const FIRST_YEAR = Math.min(...known)
export const LAST_YEAR = Math.max(...known)
export const SPAN_YEARS = LAST_YEAR - FIRST_YEAR

/** Where a Maruti sits on the shared 1644–1654 rule, as 0–1. */
export function yearPosition(i: number): number | null {
  const y = YEARS[i]
  if (y === null) return null
  return SPAN_YEARS === 0 ? 0 : (y - FIRST_YEAR) / SPAN_YEARS
}

/** How many districts, and how many of the eleven in each. */
export const BY_DISTRICT = MARUTIS.reduce<Record<string, number>>((acc, m) => {
  const d = m.district.mr
  acc[d] = (acc[d] ?? 0) + 1
  return acc
}, {})

export const DISTRICTS = Object.entries(BY_DISTRICT)
  .sort((a, b) => b[1] - a[1])
  .map(([name, count]) => ({ name, count }))

/**
 * A one-line reading of this Maruti's position in the sequence, assembled only
 * from the order and years already supplied — in each language, because a
 * sentence built by string concatenation cannot be translated after the fact.
 */
export function placeInSequence(i: number): Text {
  const y = YEARS[i]
  const n = i + 1
  const dev = toDev(n)

  if (i === 0) {
    return { mr: 'अकरा मारुतींपैकी पहिला', hi: 'ग्यारह मारुतियों में पहला', en: 'First of the eleven' }
  }
  if (i === MARUTIS.length - 1) {
    return { mr: 'अकरा मारुतींपैकी शेवटचा', hi: 'ग्यारह मारुतियों में अंतिम', en: 'Last of the eleven' }
  }

  const prev = YEARS[i - 1]
  const gap = y !== null && prev !== null ? y - prev : null

  if (gap === 0) {
    return {
      mr: `${dev}वा — आधीच्याच वर्षी स्थापन`,
      hi: `${dev}वाँ — उसी वर्ष स्थापित`,
      en: `${n}th — founded the same year`,
    }
  }
  if (gap === 1) {
    return { mr: `${dev}वा — पुढच्याच वर्षी`, hi: `${dev}वाँ — अगले ही वर्ष`, en: `${n}th — the very next year` }
  }
  if (gap !== null && gap > 1) {
    return {
      mr: `${dev}वा — ${toDev(gap)} वर्षांनंतर`,
      hi: `${dev}वाँ — ${toDev(gap)} वर्ष बाद`,
      en: `${n}th — ${gap} years later`,
    }
  }
  return { mr: `${dev}वा`, hi: `${dev}वाँ`, en: `${n}th` }
}

/** Marutis founded in the same year as this one. */
export function sameYear(i: number): number[] {
  const y = YEARS[i]
  if (y === null) return []
  return YEARS.map((v, n) => (v === y && n !== i ? n : -1)).filter((n) => n >= 0)
}
