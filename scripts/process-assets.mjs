/**
 * Image pipeline.
 *
 * Drop originals into img-source/ and run `npm run assets`.
 * Each one is emitted at four widths in AVIF, WebP and JPEG, plus a tiny
 * base64 placeholder and the intrinsic ratio, written to a manifest the
 * content files can copy from.
 *
 * Sizing targets a festival, not a desktop: 1440 is the widest emitted, and
 * AVIF is tried first because on a photograph of a lit decoration it is
 * routinely half the size of the WebP at the same quality.
 *
 * The originals live OUTSIDE public/ on purpose. Vite copies everything under
 * public/ into dist/ verbatim, so keeping them there shipped every full-size
 * original to production alongside the derivatives actually used — tens of
 * megabytes nobody ever requests, on a site whose whole audience is on
 * festival wifi. They are build inputs, not assets.
 */
import { readdir, mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'img-source'
const OUT = 'public/img/derived'
const WIDTHS = [480, 768, 1080, 1440]

if (!existsSync(SRC)) {
  console.log(`No ${SRC}/ yet. Create it and drop the photographs in.`)
  process.exit(0)
}

await mkdir(OUT, { recursive: true })
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f))

if (!files.length) {
  console.log(`${SRC}/ is empty.`)
  process.exit(0)
}

/*
  Start from the previous manifest rather than an empty object.

  A file that cannot be read this run — macOS quarantine on a fresh download,
  a half-copied file, a format sharp was not built for — must not silently
  delete a working entry. Dropping one turns a photograph that is on disk and
  already processed into a labelled gap on screen, which looks like missing
  content rather than a broken toolchain, and that is the most expensive kind
  of wrong in this project.
*/
const MANIFEST_PATH = 'src/content/media.generated.json'
const manifest = existsSync(MANIFEST_PATH)
  ? JSON.parse(await readFile(MANIFEST_PATH, 'utf8'))
  : {}

const failed = []

for (const file of files) {
  const name = path.parse(file).name
  const input = path.join(SRC, file)

  try {
    const img = sharp(input).rotate()
    const meta = await img.metadata()
    const ratio = +((meta.width ?? 1) / (meta.height ?? 1)).toFixed(4)

    const emitted = []
    for (const w of WIDTHS) {
      if ((meta.width ?? 0) < w && w !== WIDTHS[0]) continue
      emitted.push(w)
      const base = img.clone().resize({ width: w, withoutEnlargement: true })
      await Promise.all([
        base.clone().avif({ quality: 52, effort: 4 }).toFile(`${OUT}/${name}-${w}.avif`),
        base.clone().webp({ quality: 74 }).toFile(`${OUT}/${name}-${w}.webp`),
        base.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(`${OUT}/${name}-${w}.jpg`),
      ])
    }

    // 20px blurred placeholder, inlined as a data URI.
    const lqipBuf = await img.clone().resize({ width: 20 }).blur(1.2).webp({ quality: 32 }).toBuffer()
    manifest[name] = {
      src: name,
      ratio,
      // Only the widths that were actually written. Listing a width the
      // pipeline skipped puts a 404 in the srcset and the browser shows nothing.
      widths: emitted,
      lqip: `data:image/webp;base64,${lqipBuf.toString('base64')}`,
    }
    console.log(`  ${name}  ${meta.width}×${meta.height}  →  ${emitted.length} width(s) × 3 formats`)
  } catch (err) {
    // One unreadable file must not abort the other twenty-two.
    failed.push({ name, reason: err.message.split('\n')[0] })
    console.log(`  ${name}  —  SKIPPED: ${err.message.split('\n')[0]}`)
  }
}

await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n')
console.log(`\n${files.length - failed.length} of ${files.length} image(s). Manifest → ${MANIFEST_PATH}`)

if (failed.length) {
  console.log(`\n${failed.length} file(s) could not be read:`)
  failed.forEach((f) => console.log(`  · ${f.name} — ${f.reason}`))
  console.log(
    '\nOn macOS this is usually the quarantine flag on a downloaded file:\n' +
    '  xattr -d com.apple.quarantine img-source/<file>\n' +
    'Any manifest entry from an earlier run has been kept, so nothing on screen\n' +
    'has regressed — but these files were not re-processed.',
  )
  process.exit(1)
}
