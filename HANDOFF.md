# ज्ञान पेटी बाप्पा माझा — २०२६ · Handoff

> **Status: v2 is live in `src/`.** This document was written for the earlier
> fifteen-scene composition. **Sections 1–3 (what this is, the non-negotiable
> rules, and the supplied content) remain authoritative and unchanged.**
> Anything below them that describes scenes, files or the visual system is
> superseded — v2 is twenty-one scenes on a basalt ground, Marathi only, with
> no entry gate. See `README.md` for the current shape, and
> `_design/gyanpeti-v2.dc.html` for the design it was built from.
>
> Two rules from §2 changed by decision, not by drift:
> · **Rule 6 still holds** — phone and wide are two compositions (`data-stage`).
> · **Rule 7 still holds** — no WebGL; the three.js work is in `_attic/`.

Paste this whole file into a fresh Claude Code session, with the project open at
`/Users/pranav/Documents/My Stuff/gyanpeti-2026`. It is self-contained.

---

## 1. What this is

A phone-first web experience for a Ganpati decoration. A QR code stands in front
of the physical decoration; a visitor scans it while looking at the real thing.
The website's job is to explain what their eyes are already seeing, and at one
point to tell them to put the phone down and look up.

**2026 marks १५ वर्षांचा गणपती उत्सव.** The decoration is built around Hanuman —
the eleven Marutis of Samarth Ramdas Swami — and takes its visual seed from the
rock-cut shrine on the fort **Dategad** in Satara. The concept name is
**ज्ञान पेटी बाप्पा** — the offering shifts from पारंपरिक अर्पण (हार, नारळ, पेढे)
toward ज्ञानाचे अर्पण (a book), and from there to मुलं / शिक्षण / वाचन / संस्कार / भविष्य.

**Primary language is Marathi.** Hindi and English exist but Marathi leads.

---

## 2. Non-negotiable rules

1. **Never invent content.** No mythology, history, names, dates, or
   explanations that the owner did not supply. An unfilled slot renders as a
   visible labelled gap — that is deliberate. Do not fill gaps with plausible
   prose.
2. **Sacred text is never translated.** Names, mantras and place names stay in
   Devanagari in all three languages; English readers get a *transliteration*
   underneath, never a translation. "Bajrang Bali" is a name, not "the
   strong-limbed one." Only prose is translated.
3. **Content first, design second.** The current failure mode of this project
   has been beautiful headers with nothing under them. Target roughly
   20 % cinematic typography / 80 % actual content.
4. **All animation is scroll-driven.** No `setTimeout` stages, no autoplay.
5. **No sound.** Removed on purpose — visitors are standing in a mandap next to
   speakers. Haptics only.
6. **Mobile and desktop are two compositions, not one layout with breakpoints.**
   Same story, different spatial design. Never shrink desktop or stretch mobile.
7. **Parallax over 3D.** Real photographs in depth layers. An earlier WebGL
   terrain and a 3D panel gallery were both rejected as looking fake.

---

## 3. The content that exists (verbatim — this is the source of truth)

### The eleven Marutis
Order, names, years and माहिती are supplied and authoritative. Photographs are
mapped and verified — **do not re-map them by filename**, the WhatsApp download
suffixes were scrambled and each was matched by opening it.

| # | नाव | गाव · जिल्हा | स्थापना | photo |
|---|---|---|---|---|
| १ | शहापूर मारुती | शहापूर · सातारा | शके १५६६ — इ.स. १६४४ | maruti-01 |
| २ | मसूर मारुती | मसूर · सातारा | शके १५६७ — इ.स. १६४५ | maruti-02 |
| ३ | चाफळ — दास मारुती | चाफळ · सातारा | शके १५७० — इ.स. १६४८ | maruti-03 |
| ४ | चाफळ — प्रताप मारुती | चाफळ · सातारा | शके १५७० — इ.स. १६४८ | maruti-04 |
| ५ | शिंगणवाडी मारुती | शिंगणवाडी · सातारा | शके १५७१ — इ.स. १६४९ | maruti-05 |
| ६ | उंब्रज मारुती | उंब्रज · सातारा | शके १५७१ — इ.स. १६५० | maruti-06 |
| ७ | माजगाव मारुती | माजगाव · सातारा | शके १५७१ — इ.स. १६५० | maruti-07 |
| ८ | बहे-बोरगाव मारुती | बहे-बोरगाव · सांगली | शके १५७३ — इ.स. १६५१ | maruti-08 |
| ९ | मनपाडळे मारुती | मनपाडळे · कोल्हापूर | शके १५७३ — इ.स. १६५१ | maruti-09 |
| १० | पारगाव मारुती | पारगाव · कोल्हापूर | शके १५७४ — इ.स. १६५२ | maruti-10 |
| ११ | बत्तीस शिराळे मारुती | बत्तीस शिराळे · सांगली | शके १५७६ — इ.स. १६५४ | maruti-11 |

Each has one माहिती sentence in `src/content/marutis.ts`. Read them there; they
are the most important prose in the project and must be presented in full, never
summarised.

**Derived readings** (computed in `src/content/derived.ts`, all arithmetic over
the above — not invented): span **१६४४–१६५४**, districts **सातारा ७ · सांगली २ ·
कोल्हापूर २**, each one's place in sequence, and which share a founding year
(चाफळ ×2 in १६४८; बहे + मनपाडळे in १६५१).

### Dategad — three supplied Marathi paragraphs

> **structure** — गडावर प्रवेश केल्यावर अखंड खडकात खोदलेले हे एक अनोखे भुयारी मंदिर आहे. या मंदिरात उतरण्यासाठी २९ पायऱ्या उतराव्या लागतात आणि या मंदिरावर कोणतेही बाह्य आच्छादन नाही.

> **murti** — या चौकोनी आकाराच्या दगडी खोदकामात उत्तर भिंतीवर दक्षिणाभिमुख गणपती आणि पूर्व भिंतीवर पश्चिमाभिमुख मारुती यांची मूर्ती कोरलेली आहे.

> **sun** — सूर्योदय होताच पहिली सूर्यकिरणे गणेशमूर्तीवर पडतात, तर सूर्यास्तावेळी ती मारुतीच्या मूर्तीवर पडतात.

**The sun fact is the conceptual keystone** — Ganpati and Hanuman cut into one
roofless rock, lit in turn by the same sun. That is the decoration's own idea,
found already standing on a fort.

Also: दातेगड / सुंदरगड, तालुका पाटण जिल्हा सातारा, ३,२६० फूट, and a six-foot
Hanuman carved facing the main gate. These three are verified from
durgbharari.in and are shown with visible attribution. **No text or photograph
from that site is reproduced.**

### Fixed lines already placed
॥ श्री ॥ · सुरुवात करा · १५ वर्षांचा गणपती उत्सव · सादर करीत आहे… ·
ज्ञान पेटी बाप्पा माझा · २०२६ · महाराष्ट्र → सह्याद्री → दातेगड → गडाची चढण → शिखर ·
हार / नारळ / पेढे / पुस्तक · पारंपरिक अर्पण → ज्ञानाचे अर्पण ·
मुलं / शिक्षण / वाचन / संस्कार / भविष्य ·
आता समोरच्या सजावटीकडे पुन्हा एकदा बघा. · गणपती बाप्पा मोरया!

### Photographs present
11 Maruti relief panels (853×1280), plus `dategad-shrine`, `dategad-aerial`,
`dategad-steps`, `dategad-well`. The two aerials carry a `Click.by_महया`
watermark and are credited on screen.

---

## 4. What is still MISSING — must come from the owner

These cannot be written by an assistant. Run `npm run content:check` for the
live list.

- **`SCRIPT.gyanpeti.meaning`** — the actual Marathi explanation of why
  ज्ञान पेटी बाप्पा. This is the emotional centre of the whole experience and it
  has never been supplied; only the word list exists.
- **`decorationLink` × 11** — one sentence per Maruti pointing at the physical
  panel in the mandap ("समोरच्या सजावटीत डावीकडून तिसरा…"). Highest-value item:
  without these it is a page about temples, not a guide to the decoration.
- **Photographs of the actual decoration** — `decorationFull`, `decorationDetail`.
  Nothing for the climax or the hotspot section.
- **Making photographs** and captions (8 steps).
- **15-year archive** — years, photos, notes.
- **`MANDAL.name`**, `SCRIPT.fifteen.sub`, `SCRIPT.journey.why`,
  `SCRIPT.dategad.reveal`, `SCRIPT.eleven.whyEleven`, `SCRIPT.children.body`,
  `SCRIPT.finale.farewell`.
- A photograph of the **Ganpati** on the opposite wall at Dategad — the sun
  interaction lights two murtis and only one currently has a face.

---

## 5. Architecture

Vite + React 19 + TypeScript. Raw three.js (no react-three-fiber). No CSS
framework — hand-written tokens.

```
src/
  content/     script.ts (all copy)  marutis.ts (the eleven)
               derived.ts (computed facts)  timeline.ts  media.ts  i18n.tsx
  engine/      scrollDriver.ts  useScrollDriver.ts  useViewport.ts
               tier.ts  useTier.ts  haptics.ts
  scenes/      one file per scene, listed in order in App.tsx
  ui/          Img  Parallax  SacredText  Missing  Chrome
  three/       Terrain, MarutiGallery — both currently unused
img-source/   originals; `npm run assets` derives everything
```

### The scroll driver — read this before touching motion
`src/engine/scrollDriver.ts` is **one** rAF loop for the whole page. It reads
only elements an IntersectionObserver says are near the viewport, batches all
reads before any writes, and publishes progress as a CSS custom property `--p`
on the section. **React does not render while scrolling.** Scenes animate from
`--p` in CSS.

Never reintroduce a per-scene rAF loop. The previous version had fifteen of
them, each forcing layout and calling setState every frame; that was the
stuttering the owner kept reporting.

`useScrollDriver(steps?)` returns `[ref, step]` — pass `steps` only when React
genuinely needs a discrete value (a counter, an active index).

### Two stages
`useStage()` returns `'hand'` or `'wide'` (≥900 × ≥560). Scenes branch on it to
build a different composition, not a different size.

### Capability tiers
`?tier=0|1|2` forces. Tier 0 is story-only. The story is identical at every
tier — effects change, words never do.

---

## 6. Design system

```
--katal-900  oklch(21% 0.038 42)   warm stone ground (never neutral black)
--shendur    oklch(63% 0.213 38)   शेंदूर — the colour the murtis are coated in
--haldi      oklch(83% 0.150 86)   gold, used as leaf: hairlines, numerals
--kagad      oklch(94% 0.018 84)   paper — used exactly once, at ज्ञान
```

**The screen is warm dark the entire journey and turns to paper exactly once**,
at the ज्ञान पेटी scene (`data-ground="kagad"` on the root). That single
luminance inversion carries the concept. Do not add a second one.

Type: **Rozha One** display / **Anek Devanagari** UI + variable-axis animation /
**Tiro Devanagari Marathi** reading + all numerals / **Fraunces** Latin display.

> **Gotcha:** Rozha One renders U+0966–096F (Devanagari digits) as Latin-looking
> forms, so "११ मारुती" comes out "11 मारुती". `devDigits()` in
> `ui/SacredText.tsx` splits digit runs into `<i class="num">` and re-sets them
> in Tiro. Any new display element containing numerals must go through it or use
> `--font-read`.

---

## 7. Commands

```bash
npm install
npm run dev            # http://localhost:5199 (and http://<lan-ip>:5199 for a phone)
npm run build
npm run assets         # process new photos in img-source/
npm run content:check  # what is still missing; exits non-zero while incomplete
```

URL switches: `?lang=mr|hi|en` · `?tier=0|1|2` · `?slots=0` (hide pending
markers) · `?pin=1` (tap the decoration photo to log hotspot coordinates).

---

## 8. State of the 18-step flow

| Step | Scene | State |
|---|---|---|
| 01 Arrival | `Arrival` | done |
| 02 15 years | `FifteenYears` | shell only — needs `fifteen.sub` |
| 03 Title | `Title` | **still on setTimeout — convert to scroll** |
| 04 Why this concept | — | **blocked: no supplied prose** |
| 05 Dategad approach | `Dategad` | facts in; needs the parallax treatment |
| 06 The 29 steps | `DategadDescent` | **done** — photo parallax, scroll-driven |
| 07 The sculpture | `DategadShrine` | sun-drag built; needs Ganpati photo |
| 08–09 The eleven | `ElevenMarutis` | **done** — content-first, both stages |
| 10 Return to the idea | — | blocked |
| 11 ज्ञान पेटी | `GyanPeti` | paper inversion works, no text |
| 12 Children | `Children` | word column only |
| 13 Decoration reveal | `DecorationReveal` | **empty — no photos**, still on setTimeout |
| 14 Look up | `LookUp` | done |
| 15 Explore | `Explore` | needs decoration photo + real hotspots |
| 16 Making | `Making` | empty |
| 17 15 years | `Timeline` | empty |
| 18 Finale | `Finale` | done |

**Next tasks, in order:**
1. Convert `Title` and `DecorationReveal` off `setTimeout` to the scroll driver.
2. Give `Dategad` (approach) the same parallax treatment as `DategadDescent`,
   using `dategad-aerial` and `dategad-well`.
3. Carry the visual through-line: rock texture → carved Maruti → १ becomes ११ →
   the eleven become the decoration.
4. Everything else waits on content from the owner.

---

## 9. Reference build

`src/scenes/DategadDescent.tsx` + its CSS block is the pattern to copy for any
new scene: supplied paragraph split at its own clause boundaries, real
photographs as depth planes, one scroll driver, all motion in CSS from `--p`,
two stages, `dvh` units, a short-phone breakpoint, and reduced-motion honoured.
