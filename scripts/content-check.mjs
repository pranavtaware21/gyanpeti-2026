/**
 * Lists every content slot that is still empty.
 *
 * Run before printing the QR code. Exits non-zero while anything is missing,
 * so it can gate a deploy.
 *
 * v2 note: the timeline and chapter files belonged to the earlier fifteen-year
 * retrospective and are no longer part of the piece — they sit in _attic/ and
 * are deliberately not checked. What v2 is still waiting on is two
 * photographs, and those are declared as PhotoGap slots in the scenes rather
 * than as nulls in a content file, so they are counted here by name.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const read = (f) => readFileSync(f, 'utf8')

const script = read('src/content/script.ts')
const marutis = read('src/content/marutis.ts')
const v2 = read('src/content/v2.ts')

// Comments would otherwise be counted as code.
const strip = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')

const findSlots = (src, label) => {
  const out = []
  // Several fields share one line in marutis.ts, so this is not anchored.
  const re = /([A-Za-z][\w]*)\s*:\s*(SLOT|EMPTY)\b/g
  let m
  while ((m = re.exec(src))) out.push(`${label}.${m[1]}`)
  return out
}

/*
  What blocks a deploy is only what v2 actually puts on screen.

  Two groups of real, unfilled slots are recorded but do not gate:
   · marutis.ts `significance` / `decorationLink` — the sheet shows the माहिती
     sentence and nothing else, so neither is ever rendered.
   · script.ts prose — it belonged to the earlier fifteen-scene composition.
     v2's words live in v2.ts; the only thing still read out of script.ts is
     `ui.missing`, the label on a gap marker.

  Both stay in the tree on purpose: they are content the mandal may yet supply,
  and deleting them would quietly lose the questions they represent.
*/
const slots = []

const dormant = [
  ...findSlots(strip(marutis), 'marutis.ts'),
  ...findSlots(strip(script), 'script.ts'),
]
const dormantCounts = dormant.reduce((acc, s) => {
  acc[s] = (acc[s] ?? 0) + 1
  return acc
}, {})

/*
  A photograph the pipeline never saw: media() returns null and the scene
  renders a labelled gap instead of a broken image.

  Two shapes to cover. PHOTOS names each file at its key; GYAN_PHOTOS is a
  list whose entries are mapped through media() by `key`, so the filename is
  the key rather than the property name.
*/
const processed = (src) => existsSync(`public/img/derived/${src}-480.jpg`)

const namedMedia = [...strip(v2).matchAll(/^\s*(\w+):\s*media\('([^']+)'/gm)]
  .filter(([, , src]) => !processed(src))
  .map(([, name, src]) => `v2.PHOTOS.${name} (${src})`)

const listedMedia = [...strip(v2).matchAll(/\{\s*key:\s*'([^']+)'/g)]
  .map((m) => m[1])
  .filter((src) => !processed(src))
  .map((src) => `v2.GYAN_PHOTOS ${src}`)

const nullMedia = [...namedMedia, ...listedMedia]

/*
  Photographs the mandal still owes us. Only <PhotoGap> counts: an <Img> slot
  names a photograph we already have, and matching every `slot=` would report
  the whole picture set as missing.
*/
const scenesDir = 'src/scenes'
const gaps = readdirSync(scenesDir)
  .flatMap((f) => [...read(join(scenesDir, f)).matchAll(/<PhotoGap[\s\S]*?\/>/g)]
    .map((m) => [f, m[0].match(/slot="([^"]+)"/)?.[1]])
    .filter(([, slot]) => slot)
    .map(([file, slot]) => `${file} → ${slot}`))

// The eleven's माहिती is the most important prose in the project.
const emptyStory = (strip(marutis).match(/story:\s*\{\s*mr:\s*''/g) ?? []).length
const unverified = (strip(marutis).match(/verified:\s*false/g) ?? []).length

console.log(`\n  Empty text slots       ${slots.length}`)
slots.forEach((s) => console.log(`    · ${s}`))
console.log(`\n  Unprocessed images     ${nullMedia.length}`)
nullMedia.forEach((s) => console.log(`    · ${s}`))
console.log(`\n  Photographs pending    ${gaps.length}`)
gaps.forEach((s) => console.log(`    · ${s}`))
console.log(`\n  Marutis without माहिती  ${emptyStory} of 11`)
console.log(`  Unverified Marutis     ${unverified} of 11`)

const total = slots.length + nullMedia.length + gaps.length + emptyStory + unverified
console.log(total ? `\n  ${total} item(s) still needed.` : '\n  Ready.')

const dormantKeys = Object.keys(dormantCounts)
if (dormantKeys.length) {
  console.log('\n  Not used by v2 (recorded, not blocking):')
  dormantKeys.forEach((k) => {
    const n = dormantCounts[k]
    console.log(`    · ${k}${n > 1 ? ` — ${n} occurrences` : ''}`)
  })
}
console.log('')
process.exit(total ? 1 : 0)
