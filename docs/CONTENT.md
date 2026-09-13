# What the experience still needs

Run `npm run content:check` at any time for the live list. It exits non-zero
while anything is missing, so it can gate a deploy.

Everything below is a slot in a file. Nothing was invented to fill them.

---

## 1. Text — `src/content/script.ts`

Each slot takes `{ mr: '...' }`. Write Marathi only; Hindi and English can be
added later as `hi` and `en` on the same object, and until they exist the
Marathi shows rather than an empty screen.

| Slot | What goes there |
|---|---|
| `MANDAL.name` | The mandal / family name as it should appear on screen |
| `SCRIPT.fifteen.sub` | One line under १५ वर्षांचा गणपती उत्सव — whose fifteen years, since when |
| `SCRIPT.journey.why` | Why Dategad. Your connection to it |
| `SCRIPT.dategad.reveal` | Your own description of the carving and what it meant |
| `SCRIPT.eleven.whyEleven` | **Why eleven.** The question the whole section exists to answer |
| `SCRIPT.gyanpeti.meaning` | **The core explanation.** Why ज्ञान पेटी बाप्पा. This is the emotional centre — give it in full, in Marathi, in your words |
| `SCRIPT.gyanpeti.meaningCont` | Second paragraph, if there is one |
| `SCRIPT.children.body` | How the offering connects to मुलं / शिक्षण / वाचन / संस्कार / भविष्य |
| `SCRIPT.decoration.intro` | The line that introduces the reveal of your decoration |
| `SCRIPT.making.credits` | **Who made it.** Names. Set larger than the captions on purpose |
| `SCRIPT.timeline.reflection` | What fifteen years of this has meant. Not a slogan — the actual thing |
| `SCRIPT.finale.farewell` | The last thing a visitor carries home |

## 2. The eleven — `src/content/marutis.ts`

Names, order, शके / इ.स. years, माहिती and all eleven photographs are in and
marked `verified: true`.

Still open, per Maruti:

- `decorationLink` — **the sentence that points at your mandap.** The line that
  turns the phone back toward the panel they are standing in front of, e.g.
  "समोरच्या सजावटीत डावीकडून तिसरा…". Without these the experience is a page
  about eleven temples instead of a guide to your decoration. This is the
  single highest-value thing left to write.
- `significance` — optional second line, if the माहिती is not enough.
- `approxLatLng` — village-level approximations used only to place the marks
  on the small map. Correct them and the map corrects itself.

## 3. Fifteen years — `src/content/timeline.ts`

`TIMELINE` is pre-built as 2012→2026. Fix the start year if it is wrong, then
add `title`, `note` and `media` per year. A year with nothing still appears,
unlit — the span stays honest and you can see what is still missing.

`MAKING` has eight steps, all blank. `HOTSPOTS` has three placeholder marks.

## 4. Photographs — `img-source/`

Drop originals in, then:

```bash
npm run assets
```

That emits AVIF + WebP + JPEG at four widths each, plus a blur placeholder,
and writes `src/content/media.generated.json`. Copy the entries you need into
`MEDIA` in `script.ts`.

Needed: `dategadWide`, `dategadSculpture`, `dategadSculptureDetail`,
`decorationFull`, `decorationDetail`, `bappa`, `book`, `og`, plus a photo per
making-step, per year, and per Maruti.

`decorationFull` carries the tappable hotspots. Shoot it straight-on, evenly
lit, tall crop. Then open `?pin=1`, tap each point on the photo, and paste the
logged coordinates into `HOTSPOTS`.

## 5. Footage — `public/video/`

Footage beats every generated effect and takes priority automatically.

| Slot | Shot | Length |
|---|---|---|
| `VIDEO.journey` | The drive and the climb — महाराष्ट्र → सह्याद्री → दातेगड | 20–40s |
| `VIDEO.dategadSculpture` | A slow move around the six-foot carving | 10–20s |
| `VIDEO.decorationReveal` | The decoration, dark to lit | 10–20s |

Shoot vertical 9:16. These are **scrubbed by the thumb**, not played, so they
must be encoded for seeking:

```bash
ffmpeg -i in.mov -vf "scale=1080:-2" -c:v libx264 -crf 26 -g 8 -an -movflags +faststart out.mp4
```

`-g 8` is the part that matters. A normally encoded clip has keyframes seconds
apart and scrubbing it looks broken. `-an` strips audio — the soundtrack is
generated separately.

## 6. Credits on the Dategad frames

The aerial of the fort and the aerial of the stepped well carry a
`Click.by_महया` watermark. They are credited on screen through the `credit`
field. If you can reach the photographer, get a clean frame and written
permission — a watermark on the hero image of the section is a compromise, not
a finish.

No photograph or text from durgbharari.in is used. The three facts on the
Dategad screen are verified from there and facts are free to use.

Still missing for that section: **a photograph of the Ganpati on the opposite
wall of the same pit** (`MEDIA.dategadGanpati`). The sun interaction lights
Ganpati at dawn and Maruti at dusk — right now only half of it has a face.
