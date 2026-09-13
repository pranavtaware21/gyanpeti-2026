import { I18nProvider } from './content/i18n'
import { OverlayProvider } from './ui/Overlays'
import { ProgressRule } from './ui/ProgressRule'
import { useStage } from './engine/useViewport'

import { Shri } from './scenes/Shri'
import { FifteenYears } from './scenes/FifteenYears'
import { Identity } from './scenes/Identity'
import { StoryBegins } from './scenes/StoryBegins'
import { Journey } from './scenes/Journey'
import { Dategad } from './scenes/Dategad'
import { Steps } from './scenes/Steps'
import { TwoForms } from './scenes/TwoForms'
import { Sun } from './scenes/Sun'
import { GazeStops } from './scenes/GazeStops'
import { OneToEleven } from './scenes/OneToEleven'
import { Eleven } from './scenes/Eleven'
import { OneThread } from './scenes/OneThread'
import { WhyEleven } from './scenes/WhyEleven'
import { Offering } from './scenes/Offering'
import { GyanPeti } from './scenes/GyanPeti'
import { Future } from './scenes/Future'
import { AllInOnePlace } from './scenes/AllInOnePlace'
import { Composition } from './scenes/Composition'
import { LookUp } from './scenes/LookUp'
import { Close } from './scenes/Close'

/**
 * One document, scrolled once, in order.
 *
 * There are no routes and there is no entry gate. A visitor reaches this page
 * by scanning a QR code while standing in front of the decoration, with the
 * phone already in their hand — a tap-to-enter screen would be one more thing
 * between them and the first sentence.
 *
 * The order below is the argument the decoration makes: the invocation and the
 * fifteen years establish who is speaking, the journey to Dategad establishes
 * where the form came from, the eleven explain the count, the offering
 * transforms, and only then does the visitor get told to look up at the thing
 * they are already standing in front of.
 *
 * `data-stage` is the composition switch. The phone and wide layouts are two
 * pieces of design that tell the same story, not one layout with breakpoints,
 * and every scene reads that attribute rather than a media query so the
 * decision lives in exactly one place.
 */
export default function App() {
  const stage = useStage()

  return (
    <I18nProvider>
      <OverlayProvider>
        <ProgressRule />

        <main className="shaft" data-stage={stage}>
          <Shri />
          <FifteenYears />
          <Identity />
          <StoryBegins />
          <Journey />
          <Dategad />
          <Steps />
          <TwoForms />
          <Sun />
          <GazeStops />
          <OneToEleven />
          <Eleven />
          <OneThread />
          <WhyEleven />
          <Offering />
          <GyanPeti />
          <Future />
          <AllInOnePlace />
          <Composition />
          <LookUp />
          <Close />
        </main>
      </OverlayProvider>
    </I18nProvider>
  )
}
