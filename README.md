# ज्ञान पेटी बाप्पा माझा — २०२६

A phone experience for a Ganpati decoration. A visitor standing in front of
the mandap scans a QR code and walks from fifteen years of the utsav, through
the Sahyadri to the rock-carved Hanuman at Dategad, across the eleven Marutis,
into why the offering this year is a book — and then is asked to look up.

```bash
npm install
npm run dev             # http://localhost:5199
npm run build
npm run assets          # process photographs in img-source/
npm run content:check   # what is still missing — exits non-zero while anything is
```

## Shape

One document, scrolled once, in order. No routes, no navbar, no entry gate —
the journey is the navigation, and a visitor arriving by QR code already has
the phone in their hand. `src/App.tsx` lists the **twenty-one scenes** in the
order they argue.

Each scene is a tall `<section>` with a pinned 100dvh stage inside it. The
section's height is the scrub track and is the only control over pacing.

## How the motion works

One `requestAnimationFrame` loop for the whole page (`engine/scrollDriver.ts`)
publishes three numbers as CSS custom properties, and nothing re-renders in
React while you scroll:

| | |
|---|---|
| `--q` | 0→1 while a scene's stage is pinned. **Every storyboarded beat keys to this.** |
| `--p` | 0→1 across a scene's whole approach. For scenes with no pinned stage. |
| `--g` | 0→1 across the document. Drives the hairline at the top. |

Scenes never write those expressions by hand — `engine/scrub.ts` builds them:

```ts
ramp(0.3, 8)            // invisible until q=0.3, full by q=0.425
band(0.44, 0.74, 9)     // appears at 0.44, hands over at 0.74
```

`<Beat from to>` inside a `<Seq>` is the same idea for prose: successive lines
cross-fade on one spot instead of pushing the layout around.

## Two compositions, not one layout

`useStage()` returns `hand` or `wide` and `App` writes it to `data-stage`.
The phone and desktop layouts are two pieces of design telling the same story
in the same order — never one shrunk or stretched into the other. The clearest
case is scene 12: on a phone the eleven are a rail the scroll drags sideways,
on a wide screen they are a band you scan in one look.

## Ideas worth keeping when editing

- **The screen is basalt the whole way and turns to paper exactly once**, at
  ज्ञान (scene 16), closing back to the dark at the end of scene 17. That
  single luminance inversion carries the concept; don't add a second one.
- **Never invent content.** Every word on screen is in `src/content/v2.ts` in
  scene order, verbatim as supplied. An unfilled slot renders as a visible
  labelled gap — that is deliberate, not an oversight to tidy away.
- **Sacred text is never translated.** Names, the invocation and place names
  stay in Devanagari. See `src/content/types.ts`.
- **The eleven are the source of truth.** `src/content/marutis.ts` holds the
  names, villages, years and माहिती; `derived.ts` computes the span and the
  district tally from them by arithmetic. Scene 13 states figures *only*
  because they are computed — correct a row and the scene corrects itself.
- **All animation is scroll-driven.** No `setTimeout` stages, no autoplay. The
  one exception is the sun dial in scene 09, which the visitor drags.
- **Scene 15's four offerings are drawn, not photographed.** They live in
  `ui/OfferingForms.tsx` as inline SVG sharing one viewBox and `currentColor`,
  so the sequence reads as one object being replaced in one place. Each form
  and its word fade on exactly the same beat — never let those drift apart.
- **There is no sound.** A visitor is standing in a mandap during an utsav,
  surrounded by speakers. Silent on purpose; haptics carry the feedback.
- **Photographs are referenced by name only.** Originals go in `img-source/`
  (deliberately outside `public/`, which Vite copies wholesale into `dist/` —
  they are build inputs, not assets). `npm run assets` writes the derivatives
  to `public/img/derived/` plus ratios, emitted widths and blur placeholders
  into a manifest, and `media()` looks them up. Never paste base64 into a
  content file.
- **Reduced motion keeps every word.** Stacked beats become ordinary flow and
  all of it is legible at once. Effects change; the story never does.

## URL switches

| | |
|---|---|
| `?slots=0` | hide the "content pending" markers for a clean walkthrough |
| `?lang=mr\|hi\|en` | force a language (v2 prose is Marathi; the eleven's माहिती is translated) |

## Still needed

Eight photographs. All exist in the design canvas; none could be pulled down,
because `DesignSync(get_file)` truncates anything over 256 KiB. Each renders as
a labelled gap until the file arrives — see [_design/README.md](_design/README.md)
for the list and the one-step fix.

The two slots this project carried longest are now closed: the गणपती on the
facing wall at Dategad is a real photograph, and the designer withdrew the
`decoration.wide` slot in scene 19.

`npm run content:check` is the gate. See also [docs/CONTENT.md](docs/CONTENT.md).

## `_attic/`

Modules from the earlier fifteen-scene composition that v2 no longer uses —
the WebGL terrain and panel gallery (both rejected as looking fake), the
chapter rail, the capability-tier system. Kept rather than deleted because
this project is not in git. Nothing in `src/` imports them.
