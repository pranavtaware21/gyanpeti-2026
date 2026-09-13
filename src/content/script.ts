import type { Media, Sacred, Text, VideoMedia } from './types'
import { media } from './media'

/**
 * The script.
 *
 * Filled fields are words Pranav supplied verbatim in the brief.
 * `SLOT` marks text that has NOT been supplied. Nothing here is invented:
 * an unfilled slot renders as a visible, labelled gap in the running
 * experience so it is impossible to ship by accident.
 */
const SLOT: Text = { mr: '' }

export const MANDAL = {
  /** SLOT — the mandal / family name as it should appear on screen. */
  name: SLOT,
  year: { dev: '२०२६', roman: '2026' } satisfies Sacred,
  yearsRunning: { dev: '१५', roman: '15' } satisfies Sacred,
}

export const SCRIPT = {
  arrival: {
    invocation: { dev: '॥ श्री ॥', roman: 'Shri' } satisfies Sacred,
    begin: { mr: 'सुरुवात करा', hi: 'शुरू करें', en: 'Begin' } satisfies Text,
    holdHint: {
      mr: 'स्क्रीनवर बोट ठेवा',
      hi: 'स्क्रीन पर उंगली रखें',
      en: 'Touch and hold the screen',
    } satisfies Text,
  },

  fifteen: {
    line: { dev: '१५ वर्षांचा गणपती उत्सव', roman: '15 varshancha Ganpati Utsav' } satisfies Sacred,
    /** SLOT — one line under it. Whose fifteen years? Since when? */
    sub: SLOT,
  },

  title: {
    name: { dev: 'ज्ञान पेटी बाप्पा माझा', roman: 'Gyan Peti Bappa Majha' } satisfies Sacred,
    year: { dev: '२०२६', roman: '2026' } satisfies Sacred,
    presenting: { dev: 'सादर करीत आहे…', roman: 'Sadar karit aahe…' } satisfies Sacred,
  },

  journey: {
    /** The descent. Each rung is a place name — sacred tier, never translated. */
    rungs: [
      { dev: 'महाराष्ट्र', roman: 'Maharashtra' },
      { dev: 'सह्याद्री', roman: 'Sahyadri' },
      { dev: 'दातेगड', roman: 'Dategad' },
      { dev: 'गडाची चढण', roman: 'Gadachi chadhan' },
      { dev: 'शिखर', roman: 'Shikhar' },
    ] satisfies Sacred[],
    /** SLOT — why Dategad? What is this mandal's connection to it? */
    why: SLOT,
  },

  dategad: {
    name: { dev: 'दातेगड', roman: 'Dategad' } satisfies Sacred,
    alt: { dev: 'सुंदरगड', roman: 'Sundargad' } satisfies Sacred,
    place: { mr: 'तालुका पाटण, जिल्हा सातारा' } satisfies Text,

    /**
     * The rock-cut shrine on the fort, supplied by the mandal.
     *
     * The detail the whole section turns on: Ganpati and Maruti are cut into
     * two different walls of one roofless pit, and the sun lights one at
     * dawn and the other at dusk. That is the decoration's own idea —
     * Ganpati and Hanuman in a single stone — found already standing on a
     * fort in Satara.
     */
    shrine: {
      steps: { dev: '२९ पायऱ्या', roman: '29 payrya' } satisfies Sacred,
      structure: {
        mr: 'गडावर प्रवेश केल्यावर अखंड खडकात खोदलेले हे एक अनोखे भुयारी मंदिर आहे. या मंदिरात उतरण्यासाठी २९ पायऱ्या उतराव्या लागतात आणि या मंदिरावर कोणतेही बाह्य आच्छादन नाही.',
      } satisfies Text,
      murti: {
        mr: 'या चौकोनी आकाराच्या दगडी खोदकामात उत्तर भिंतीवर दक्षिणाभिमुख गणपती आणि पूर्व भिंतीवर पश्चिमाभिमुख मारुती यांची मूर्ती कोरलेली आहे.',
      } satisfies Text,
      sun: {
        mr: 'सूर्योदय होताच पहिली सूर्यकिरणे गणेशमूर्तीवर पडतात, तर सूर्यास्तावेळी ती मारुतीच्या मूर्तीवर पडतात.',
      } satisfies Text,
      /**
       * The structure sentence, broken at its own clause boundaries.
       *
       * This is presentation, not rewriting: every fragment below is a
       * contiguous run of the supplied paragraph, in order, and joining them
       * back together reproduces it exactly. Each lands on a different part of
       * the descent, so the visitor is told what the place is while they are
       * moving through it rather than before they start.
       */
      descent: [
        { at: 1,  mr: 'गडावर प्रवेश केल्यावर',
                  hi: 'गढ़ में प्रवेश करते ही',
                  en: 'Once you are inside the fort' },
        { at: 6,  mr: 'अखंड खडकात खोदलेले',
                  hi: 'अखंड चट्टान में उकेरा हुआ',
                  en: 'cut into unbroken rock' },
        { at: 13, mr: 'हे एक अनोखे भुयारी मंदिर आहे.',
                  hi: 'यह एक अनोखा भूमिगत मंदिर है।',
                  en: 'is a shrine sunk into the ground.' },
        { at: 20, mr: 'या मंदिरात उतरण्यासाठी २९ पायऱ्या उतराव्या लागतात',
                  hi: 'इस मंदिर तक उतरने के लिए २९ सीढ़ियाँ उतरनी पड़ती हैं',
                  en: 'Twenty-nine steps take you down to it' },
        { at: 27, mr: 'आणि या मंदिरावर कोणतेही बाह्य आच्छादन नाही.',
                  hi: 'और इस मंदिर पर कोई छत नहीं है।',
                  en: 'and nothing covers it.' },
      ] as ({ at: number } & Text)[],
      stepCount: 29,
      stepLabel: { mr: 'पायरी', hi: 'सीढ़ी', en: 'Step' } satisfies Text,
      /** The lead line for the two-murti photograph. */
      oneRock: {
        mr: 'एकाच खडकात, एकाच सूर्याखाली.',
        hi: 'एक ही चट्टान में, एक ही सूरज के नीचे।',
        en: 'One rock. One sun.',
      } satisfies Text,
      arrived: { mr: 'तळाशी', hi: 'तल पर', en: 'At the bottom' } satisfies Text,
      openSky: { mr: 'वर उघडे आकाश', hi: 'ऊपर खुला आकाश', en: 'Open sky above' } satisfies Text,

      ganpati: { dev: 'गणपती', roman: 'Ganpati' } satisfies Sacred,
      ganpatiFacing: { mr: 'उत्तर भिंत · दक्षिणाभिमुख' } satisfies Text,
      maruti: { dev: 'मारुती', roman: 'Maruti' } satisfies Sacred,
      marutiFacing: { mr: 'पूर्व भिंत · पश्चिमाभिमुख' } satisfies Text,
      sunrise: { dev: 'सूर्योदय', roman: 'Suryoday' } satisfies Sacred,
      sunset: { dev: 'सूर्यास्त', roman: 'Suryast' } satisfies Sacred,
      drag: { mr: 'सूर्य सरकवा', hi: 'सूर्य सरकाएँ', en: 'Move the sun' } satisfies Text,
      /** SLOT — why this shrine became the seed of your decoration. */
      whyThis: SLOT,
    },
    descend: { mr: 'खाली उतरा', hi: 'नीचे उतरें', en: 'Descend' } satisfies Text,
    /**
     * Verified facts from durgbharari.in (Suresh Nimbalkar). Facts only —
     * no text or photograph from that site is reproduced.
     */
    facts: {
      district: { mr: 'सातारा जिल्हा, पाटण तालुका', hi: 'सातारा ज़िला, पाटण तालुका', en: 'Satara district, Patan taluka' },
      height: { mr: '३,२६० फूट', hi: '३,२६० फुट', en: '3,260 ft' },
      sculpture: {
        mr: 'महादरवाजासमोर दगडात कोरलेली सहा फूट उंच मारुतीची मूर्ती',
        hi: 'मुख्य द्वार के सामने चट्टान में उकेरी छह फुट ऊँची हनुमान मूर्ति',
        en: 'A six-foot Hanuman carved into the rock, directly facing the main gate',
      },
    } satisfies Record<string, Text>,

    /** Label pairs for the fact block, so the data reads as data. */
    factLabels: {
      place: { mr: 'ठिकाण', hi: 'स्थान', en: 'Place' } satisfies Text,
      height: { mr: 'उंची', hi: 'ऊँचाई', en: 'Height' } satisfies Text,
      kind: { mr: 'प्रकार', hi: 'प्रकार', en: 'Type' } satisfies Text,
      kindValue: { mr: 'गिरिदुर्ग', hi: 'गिरिदुर्ग', en: 'Hill fort' } satisfies Text,
      sculpture: { mr: 'शिल्प', hi: 'शिल्प', en: 'Sculpture' } satisfies Text,
    },
    /** Shown wherever the durgbharari facts appear, so the source is visible. */
    factSource: { mr: 'तथ्ये: durgbharari.in' } satisfies Text,
    /** SLOT — the mandal's own description of the sculpture and what it meant. */
    reveal: SLOT,
  },

  eleven: {
    heading: { dev: '११ मारुती', roman: 'Akara Maruti' } satisfies Sacred,
    ramdas: { dev: 'समर्थ रामदास स्वामी', roman: 'Samarth Ramdas Swami' } satisfies Sacred,
    span: { mr: 'अकरा मूर्ती · दहा वर्षांत' } satisfies Text,
    swipeHint: { mr: 'बाजूला सरकवा', hi: 'बग़ल में सरकाएँ', en: 'Swipe' } satisfies Text,
    /** Labels for the fact block on each Maruti. */
    labelPlace: { mr: 'स्थान', hi: 'स्थान', en: 'Place' } satisfies Text,
    labelFounded: { mr: 'स्थापना', hi: 'स्थापना', en: 'Founded' } satisfies Text,
    labelOrder: { mr: 'क्रम', hi: 'क्रम', en: 'Order' } satisfies Text,
    sameYearLabel: { mr: 'याच वर्षी स्थापन', hi: 'इसी वर्ष स्थापित', en: 'Founded the same year' } satisfies Text,
    countUnit: { mr: 'मूर्ती', hi: 'मूर्तियाँ', en: 'murtis' } satisfies Text,
    ceLabel: { mr: 'इ.स.', hi: 'ई.स.', en: 'CE' } satisfies Text,
    unverified: { mr: 'नाव / गाव तपासणे बाकी', hi: 'नाम / गाँव जाँचना बाक़ी', en: 'Name / village still to be checked' } satisfies Text,
    mapHint: { mr: 'कुठे आहेत', hi: 'कहाँ हैं', en: 'Where they stand' } satisfies Text,
    /** SLOT — why eleven? This is the question the whole section answers. */
    whyEleven: SLOT,
    dragHint: { mr: 'बोट फिरवा', hi: 'उँगली घुमाएँ', en: 'Drag to explore' } satisfies Text,
    tapHint: { mr: 'स्पर्श करा', hi: 'स्पर्श करें', en: 'Tap to open' } satisfies Text,
  },

  offering: {
    /** The transformation. Each is an object, not a word — they animate. */
    traditional: [
      { dev: 'हार', roman: 'Haar' },
      { dev: 'नारळ', roman: 'Naral' },
      { dev: 'पेढे', roman: 'Pedhe' },
    ] satisfies Sacred[],
    traditionalLabel: { dev: 'पारंपरिक अर्पण', roman: 'Paramparik arpan' } satisfies Sacred,
    newLabel: { dev: 'ज्ञानाचे अर्पण', roman: 'Dnyanache arpan' } satisfies Sacred,
    /** What the new offering actually is, in the owner's own framing. */
    newThing: { dev: 'शैक्षणिक साहित्य', roman: 'Shaikshanik sahitya' } satisfies Sacred,
    book: { dev: 'पुस्तक', roman: 'Pustak' } satisfies Sacred,
    knowledge: { dev: 'ज्ञान', roman: 'Dnyan' } satisfies Sacred,
  },

  gyanpeti: {
    name: { dev: 'ज्ञान पेटी बाप्पा', roman: 'Gyan Peti Bappa' } satisfies Sacred,

    /**
     * The reason the decoration exists.
     *
     * TRANSLATION NOTE — Pranav gave this in English. The Marathi and Hindi
     * below are translations of his words, not text he wrote, and a family
     * member must read them before the QR code goes up. Nothing has been added:
     * every clause maps to something he said. See docs/CONTENT.md.
     *
     * Written as four beats rather than one block, because the design shows one
     * line at a time — but the beats join back into exactly what he said.
     */
    beats: [
      {
        mr: 'दरवर्षी बाप्पासमोर मोदक, पेढे आणि नैवेद्य ठेवला जातो.',
        hi: 'हर साल बाप्पा के सामने मोदक, पेड़े और नैवेद्य रखा जाता है।',
        en: 'Every year, modak and sweets are placed before Bappa.',
      },
      {
        mr: 'यंदा आम्ही घरच्यांना आणि मित्रांना वेगळं काहीतरी आणायला सांगितलं — शैक्षणिक साहित्य.',
        hi: 'इस बार हमने घरवालों और दोस्तों से कुछ अलग लाने को कहा — शैक्षणिक सामग्री।',
        en: 'This year we asked our family and friends to bring something else — educational kits.',
      },
      {
        mr: 'ते साहित्य महाराष्ट्रातील वेगवेगळ्या भागांतल्या गरजू विद्यार्थ्यांपर्यंत पोहोचवलं जातं.',
        hi: 'वह सामग्री महाराष्ट्र के अलग-अलग हिस्सों के ज़रूरतमंद विद्यार्थियों तक पहुँचाई जाती है।',
        en: 'Those kits reach students in need across different parts of Maharashtra.',
      },
      {
        mr: 'हे फक्त उत्सवाच्या दिवसांपुरतं नाही — वर्षभर चालू राहतं.',
        hi: 'यह सिर्फ़ उत्सव के दिनों तक नहीं — साल भर चलता रहता है।',
        en: 'Not only for the days of the festival — it continues all year.',
      },
    ] satisfies Text[],

    /** The sentence the whole decoration answers to. */
    motive: {
      mr: 'हेच या सजावटीमागचं मुख्य कारण आहे.',
      hi: 'यही इस सजावट के पीछे का मुख्य कारण है।',
      en: 'That is the main motive behind all of this.',
    } satisfies Text,

    /** What is actually being asked for, said plainly. */
    ask: {
      mr: 'मोदक नको — वही, पेन, पुस्तक.',
      hi: 'मोदक नहीं — कॉपी, पेन, किताब।',
      en: 'Not modak — a notebook, a pen, a book.',
    } satisfies Text,

    /** The four facts of the thing, each with its own label, in every language. */
    facts: [
      {
        label: { mr: 'काय', hi: 'क्या', en: 'What' },
        value: { mr: 'शैक्षणिक साहित्य', hi: 'शैक्षणिक सामग्री', en: 'Educational kits' },
      },
      {
        label: { mr: 'कोणासाठी', hi: 'किसके लिए', en: 'For whom' },
        value: { mr: 'गरजू विद्यार्थी', hi: 'ज़रूरतमंद विद्यार्थी', en: 'Students in need' },
      },
      {
        label: { mr: 'कुठे', hi: 'कहाँ', en: 'Where' },
        value: { mr: 'महाराष्ट्रभर', hi: 'महाराष्ट्र भर', en: 'Across Maharashtra' },
      },
      {
        label: { mr: 'किती काळ', hi: 'कब तक', en: 'How long' },
        value: { mr: 'वर्षभर', hi: 'साल भर', en: 'All year' },
      },
    ] as { label: Text; value: Text }[],
  },

  children: {
    pillars: [
      { dev: 'मुलं', roman: 'Mulan' },
      { dev: 'शिक्षण', roman: 'Shikshan' },
      { dev: 'वाचन', roman: 'Vachan' },
      { dev: 'संस्कार', roman: 'Sanskar' },
      { dev: 'भविष्य', roman: 'Bhavishya' },
    ] satisfies Sacred[],
    /**
     * Where the offering goes. Same translation caveat as gyanpeti.beats.
     */
    body: {
      mr: 'जे साहित्य इथे जमा होतं, ते महाराष्ट्रातील वेगवेगळ्या भागांतल्या गरजू विद्यार्थ्यांपर्यंत पोहोचवलं जातं. उत्सव संपला तरी हे काम वर्षभर चालू राहतं.',
      hi: 'यहाँ जो सामग्री जमा होती है, वह महाराष्ट्र के अलग-अलग हिस्सों के ज़रूरतमंद विद्यार्थियों तक पहुँचाई जाती है। उत्सव ख़त्म होने के बाद भी यह काम साल भर चलता रहता है।',
      en: 'What is collected here reaches students in need across different parts of Maharashtra. The festival ends; this carries on through the year.',
    } satisfies Text,
  },

  decoration: {
    /** SLOT — the line that introduces the reveal of your own decoration. */
    intro: SLOT,
  },

  lookUp: {
    line: {
      dev: 'आता समोरच्या सजावटीकडे पुन्हा एकदा बघा.',
      roman: 'Aata samorchya sajavatikade punha ekda bagha.',
    } satisfies Sacred,
    sub: {
      mr: 'फोन खाली ठेवा. डोळे वर करा.',
      hi: 'फ़ोन नीचे रखें। नज़र ऊपर करें।',
      en: 'Put the phone down. Look up.',
    } satisfies Text,
    resume: { mr: 'पुढे', hi: 'आगे', en: 'Continue' } satisfies Text,
  },

  explore: {
    heading: {
      dev: 'तुमच्या समोर दिसणाऱ्या या मारुतीकडे नीट पाहा…',
      roman: 'Tumchya samor disnarya ya Marutikade neet paha…',
    } satisfies Sacred,
    hint: { mr: 'खुणांना स्पर्श करा', hi: 'चिह्नों को स्पर्श करें', en: 'Tap the marks' } satisfies Text,
  },

  making: {
    heading: { dev: 'सजावट कशी घडली', roman: 'Sajavat kashi ghadli' } satisfies Sacred,
    /** SLOT — who made it. Names matter more than anything else on this screen. */
    credits: SLOT,
  },

  timeline: {
    heading: { dev: '१५ वर्षे', roman: '15 varshe' } satisfies Sacred,
    /** SLOT — what fifteen years of this has meant. In your words, not a slogan. */
    reflection: SLOT,
  },

  finale: {
    chant: { dev: 'गणपती बाप्पा मोरया!', roman: 'Ganpati Bappa Morya!' } satisfies Sacred,
    /** SLOT — the last thing you want a visitor to carry home. */
    farewell: SLOT,
    share: { mr: 'ही गोष्ट पाठवा', hi: 'यह कहानी भेजें', en: 'Share this story' } satisfies Text,
    restart: { mr: 'पुन्हा सुरुवात', hi: 'फिर से', en: 'Start again' } satisfies Text,
  },

  ui: {
    lang: { mr: 'भाषा', hi: 'भाषा', en: 'Language' } satisfies Text,
    back: { mr: 'मागे', hi: 'पीछे', en: 'Back' } satisfies Text,
    skip: { mr: 'पुढे जा', hi: 'छोड़ें', en: 'Skip' } satisfies Text,
    close: { mr: 'बंद करा', hi: 'बंद करें', en: 'Close' } satisfies Text,
    chapters: { mr: 'भाग', hi: 'भाग', en: 'Chapters' } satisfies Text,
    missing: {
      mr: 'मजकूर बाकी आहे',
      hi: 'सामग्री शेष है',
      en: 'Content pending',
    } satisfies Text,
    /* A photograph slot must not claim that text is pending — the visitor can
       see perfectly well that the hole is picture-shaped. */
    missingPhoto: {
      mr: 'छायाचित्र येणे बाकी',
      hi: 'चित्र आना शेष है',
      en: 'Photograph pending',
    } satisfies Text,
  },
} as const

/**
 * Media. Filled entries resolve through the pipeline manifest, so ratios and
 * blur placeholders come from the real files rather than being guessed.
 */
export const MEDIA: Record<string, Media | null> = {
  /** The fort from the air. Watermarked by the photographer who shot it —
   *  the credit stays on screen. */
  dategadAerial: media('dategad-aerial', { mr: 'दातेगड — वरून दिसणारा किल्ला' }, 'Click.by_महया'),
  /** The rock-cut Maruti in the roofless pit. The source of the whole idea. */
  dategadSculpture: media('dategad-shrine', { mr: 'दातेगडावरील खडकात कोरलेला मारुती' }),
  /** Both murtis in one frame — the whole point of the place, in one photo. */
  dategadBoth: media('dategad-both', { mr: 'एकाच खडकात गणपती आणि मारुती — दातेगड' }),
  /** The gufa: looking down the cut stairs at the Maruti, sky open above. */
  gufaStairs: media('gufa-stairs', { mr: 'खडकात कोरलेल्या पायऱ्या आणि मारुती — दातेगड' }),
  /** The mouth of the cave, with the rock-cut steps climbing beside it. */
  gufaSteps: media('gufa-steps', { mr: 'गुहेचे तोंड आणि खडकातील पायऱ्या' }),
  gufaWide: media('gufa-wide', { mr: 'दातेगडावरील गुहा' }),
  /** The Ganpati on the opposite wall of the same pit. Not yet supplied. */
  dategadGanpati: null,
  dategadSteps: media('dategad-steps', { mr: 'दातेगडाची चढण' }),
  dategadWell: media('dategad-well', { mr: 'खडकात खोदलेली पायविहीर' }, 'Click.by_महया'),
  dategadWide: media('dategad-aerial', { mr: 'दातेगड' }, 'Click.by_महया'),
  dategadSculptureDetail: null,
  decorationFull: null,
  decorationDetail: null,
  bappa: null,
  book: null,
  og: null,
}

/**
 * Footage slots. Filled, these take priority over every generated effect.
 *
 * Encode for scrubbing, not for streaming: H.264, ~1080×1920, CRF ~26, and
 * a keyframe every 6–10 frames (`-g 8`). A clip encoded normally has
 * keyframes seconds apart and seeking through it looks broken.
 */
export const VIDEO: Record<string, VideoMedia | null> = {
  /** महाराष्ट्र → सह्याद्री → दातेगड. The drive and the climb. 20–40s. */
  journey: null,
  /** A slow move around the six-foot carving. 10–20s. */
  dategadSculpture: null,
  /** The decoration, dark to lit. 10–20s. */
  decorationReveal: null,
}
