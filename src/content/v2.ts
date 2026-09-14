import { media } from './media'

/**
 * The v2 script, in both languages.
 *
 * Every word the visitor reads is here, in scene order, so the owner can edit
 * the piece without opening a component — and so it is obvious at a glance
 * that nothing was invented to fill a hole. Nothing in this file may be
 * written, reworded or "improved" without the mandal saying so.
 *
 * Marathi is the source of truth and the default. English is a translation of
 * it, not a separate piece of writing, and it holds the same register: spare,
 * plain, unhurried. Where the Marathi is one clause on its own line, so is the
 * English.
 *
 * Two things are rendered rather than translated, because they have none:
 * ॥ श्री ॥ and गणपती बाप्पा मोरया are invocations, and they appear in English
 * the way English speakers actually say them. The eleven Marutis' names, their
 * villages and districts are transliterated in marutis.ts for the same reason —
 * a name is a name in any language.
 */

/** A line of prose. `mr` is authoritative; `en` is its translation. */
export interface Say { mr: string; en: string }
const s = (mr: string, en: string): Say => ({ mr, en })

/** Photographs used by the scenes. The eleven carry their own in marutis.ts. */
export const PHOTOS = {
  /*
    No credit argument. Img paints a `credit` as a small badge pinned to the
    bottom-right of the image, which is right for an inline photograph and
    wrong for a full-bleed ground — in scene 05 it landed on top of the prose.
    Scenes 05 and 06 both set the aerial as a ground and both print the credit
    as their own line, so passing it here only ever duplicated it.
  */
  aerial: media('dategad-aerial', s('दातेगड — वरून दिसणारा गड', 'Dategad, seen from above')),
  entrance: media('dategad-entrance', s('अखंड खडकात कोरलेलं भुयारी मंदिर — उतरणाऱ्या पायऱ्या', 'The underground shrine cut from solid rock — the descending steps')),
  mandir: media('dategad-mandir', s('खडकात कोरलेली मारुतीची मूर्ती', 'The Maruti carved into the rock')),
  /*
    Scene 09's photograph. The canvas calls this `dategad-chamber`, but the
    identical file (byte for byte) was already in the project as `dategad-both`
    — "both" meaning both carvings in one frame, which is exactly why this
    scene needs it: the light has to be seen crossing from the गणपती on one
    wall to the मारुती on the other, and a photograph of either alone can only
    assert that.
  */
  chamber: media('dategad-both', s('दातेगडावरील भुयारी मंदिर — गणपती आणि मारुती', 'The underground shrine at Dategad — Ganpati and Maruti')),
  ganpati: media('dategad-ganpati', s('एका भिंतीवर गणपती', 'Ganpati, on one wall')),
  shrine: media('dategad-shrine', s('दगडात कोरलेला मारुती', 'Maruti, carved from the stone')),
}

/**
 * Scene 16 — past शैक्षणिक साहित्य वाटप, dealt out as photographs on the paper
 * ground. These are the mandal's own record of the idea already happening, and
 * they are why the scene can claim a book reaches a child without inventing
 * anything: it has already been done.
 */
export const GYAN_PHOTOS = [
  { key: 'gyan-01', alt: s('शैक्षणिक साहित्य वाटप', 'Distributing school supplies') },
  { key: 'gyan-03', alt: s('वह्या-पुस्तकांचे वाटप', 'Handing out notebooks and books') },
  { key: 'gyan-05', alt: s('कंपासपेटी मिळालेली मुलं', 'Children with their new compass boxes') },
  { key: 'gyan-07', alt: s('साहित्य हातात देताना', 'Placing the supplies in their hands') },
  { key: 'gyan-08', alt: s('शैक्षणिक साहित्य वाटप — २०२४-२५', 'School supplies distribution — 2024-25') },
  { key: 'gyan-04', alt: s('शाळेतील मुलं', 'Children at school') },
  { key: 'gyan-06', alt: s('वाटप कार्यक्रम', 'The distribution programme') },
  { key: 'gyan-02', alt: s('संपूर्ण वाटप कार्यक्रम', 'The whole distribution programme') },
].map((p) => ({ ...p, media: media(p.key, p.alt) }))

export const V2 = {
  /** 01 — the invocation. Rendered, not translated. */
  shri: {
    mark: s('॥ श्री ॥', '॥ Shri ॥'),
    hint: s('खाली सरकवा ↓', 'Scroll down ↓'),
  },

  /** 02 — fifteen years. */
  fifteen: {
    digits: s('१५', '15'),
    head: s('वर्षांचा हा गणपती उत्सव…', 'years of this Ganpati utsav…'),
    lines: [
      s('या पंधरा वर्षांच्या प्रवासात,', 'Across these fifteen years,'),
      s('बाप्पाच्या चरणी अनेक आठवणी अर्पण झाल्या…', 'many memories have been offered at Bappa’s feet…'),
      s('अनेक भावना जोडल्या गेल्या…', 'many feelings have gathered around them…'),
      s('आणि प्रत्येक वर्षी काहीतरी नवीन साकारत गेलं.', 'and each year something new has taken shape.'),
    ],
  },

  /** 03 — the name of this year's piece. */
  identity: {
    lead: [s('याच प्रवासातून,', 'Out of that same journey,'), s('यावर्षी…', 'this year…')],
    title: [s('ज्ञान पेटी', 'Gyan Peti'), s('बाप्पा माझा', 'Bappa Maza')],
    year: s('२०२६', '2026'),
    tail: s('सादर करीत आहे.', 'we present.'),
  },

  /** 04 — not a decoration. */
  storyBegins: {
    a: s('पण यावेळी ही फक्त सजावट नाही.', 'But this time it is not only a decoration.'),
    b: s('ही एक कथा आहे.', 'It is a story.'),
    c: s('एका प्रवासाची…', 'The story of a journey…'),
  },

  /** 05 — out of the Sahyadri. */
  journey: {
    lines: [
      s('महाराष्ट्राच्या मातीतून,', 'Out of the soil of Maharashtra,'),
      s('सह्याद्रीच्या रांगांमधून,', 'through the ranges of the Sahyadri,'),
      s('एका गडाच्या दिशेने जाणाऱ्या प्रवासाची.', 'a journey toward one fort.'),
    ],
    place: s('दातेगड.', 'Dategad.'),
    credit: s('छायाचित्र · Click.by_महया', 'Photograph · Click.by_महया'),
  },

  /** 06 — the fort. Figures supplied by the mandal. */
  dategad: {
    body: s(
      'गडावर पोहोचताना, दगड, माती, वाटा आणि सह्याद्री मागे पडत जातात… आणि आपण हळूहळू त्या जागेच्या अधिक जवळ जातो.',
      'As you climb, the rock and the earth and the paths and the Sahyadri fall away behind you… and slowly you come nearer to the place itself.',
    ),
    height: s('३,२६०', '3,260'),
    heightUnit: s('फूट', 'feet'),
    where: [s('सुंदरगड · तालुका पाटण', 'Sundargad · Taluka Patan'), s('जिल्हा सातारा', 'Satara district')],
    hanuman: s(
      'मुख्य दरवाज्याकडे तोंड करून उभा असलेला सहा फुटी हनुमान.',
      'A six-foot Hanuman, standing and facing the main gate.',
    ),
    credit: s(
      'छायाचित्र · Click.by_महया · संदर्भ durgbharari.in',
      'Photograph · Click.by_महया · Reference durgbharari.in',
    ),
  },

  /** 07 — the descent. Three supplied sentences, in order. */
  steps: {
    count: s('२९', '29'),
    lines: [
      s(
        'गडाच्या आत, अखंड खडकात कोरलेलं एक अनोखं भुयारी मंदिर आहे.',
        'Inside the fort there is a rare underground shrine, cut from a single unbroken rock.',
      ),
      s('त्या मंदिरात उतरण्यासाठी २९ पायऱ्या उतराव्या लागतात.', 'To reach it you go down twenty-nine steps.'),
      s('आणि या मंदिरावर कोणतंही बाह्य आच्छादन नाही.', 'And the shrine has no roof above it at all.'),
    ],
  },

  /** 08 — two carvings, facing walls. */
  twoForms: {
    stone: s('फक्त दगड.', 'Only stone.'),
    sky: s('आकाश.', 'Sky.'),
    lead: s('आणि त्या दगडात कोरलेली दोन रूपं…', 'And two forms carved into that stone…'),
    ganpati: s('गणपती', 'Ganpati'),
    maruti: s('मारुती', 'Maruti'),
    tail: s('आणि दुसऱ्या भिंतीवर मारुती.', 'And on the other wall, Maruti.'),
  },

  /** 09 — the light crosses the shrine. */
  sun: {
    sunriseLine: s(
      'सूर्योदयाची पहिली किरणं गणेशमूर्तीवर पडतात…',
      'The first light of sunrise falls on the Ganesh murti…',
    ),
    sunsetLine: s(
      'आणि सूर्यास्ताची किरणं मारुतीच्या मूर्तीवर.',
      'and the light of sunset falls on the Maruti.',
    ),
    sunrise: s('सूर्योदय', 'Sunrise'),
    sunriseOn: s('गणेशमूर्तीवर', 'on the Ganesh murti'),
    sunset: s('सूर्यास्त', 'Sunset'),
    sunsetOn: s('मारुतीच्या मूर्तीवर', 'on the Maruti'),
    close: s(
      'एकाच आकाशाखाली, एकाच दगडात, प्रकाशाच्या या प्रवासासोबत दोन रूपं आपल्यासमोर उभी राहतात.',
      'Under one sky, in one stone, the travelling light raises two forms before us.',
    ),
  },

  /** 10 — the gaze stops. */
  gaze: {
    lead: [s('आणि तिथेच…', 'And there…'), s('आपली नजर थांबते.', 'the eye stops.')],
    name: s('मारुती.', 'Maruti.'),
    a: s(
      'दगडातून साकारलेलं ते रूप फक्त एक शिल्प म्हणून दिसत नाही.',
      'The form drawn out of the stone does not read as a sculpture alone.',
    ),
    b: s('ते एक विचार सुरू करतं.', 'It begins a thought.'),
  },

  /** 11 — one becomes eleven. */
  oneToEleven: {
    one: s('एक मारुती…', 'One Maruti…'),
    bridge: s('आणि त्या एका रूपातून आपण पोहोचतो अनेक रूपांकडे.', 'and from that one form we arrive at many.'),
    eleven: s('मारुती', 'Marutis'),
    numOne: s('१', '1'),
    numEleven: s('११', '11'),
  },

  /** 12 — through the eleven. Place-names cut rather than fade. */
  eleven: {
    calls: [
      s('शहापूरपासून…', 'From Shahapur…'),
      s('मसूरपर्यंत…', 'to Masur…'),
      s('चाफळच्या दास मारुतीपासून प्रताप मारुतीपर्यंत…', 'from Chafal’s Das Maruti to Pratap Maruti…'),
      s('शिंगणवाडी, उंब्रज, माजगाव…', 'Shinganwadi, Umbraj, Majgaon…'),
      s('बहे-बोरगाव, मनपाडळे, पारगाव…', 'Bahe-Borgaon, Manpadale, Pargaon…'),
      s('आणि बत्तीस शिराळे.', 'and Battis Shirale.'),
    ],
    hint: s('फोटोवर टॅप करा · संपूर्ण माहिती', 'Tap a photograph · full detail'),
  },

  /** 13 — one thread. The figures are arithmetic over marutis.ts. */
  thread: {
    lines: [
      s('वेगवेगळी गावं.', 'Different villages.'),
      s('वेगवेगळे प्रदेश.', 'Different regions.'),
      s('वेगवेगळे काळ.', 'Different times.'),
    ],
    lead: s('पण या सगळ्यांना जोडणारा एकच धागा…', 'But one thread runs through all of them…'),
    name: s('मारुती.', 'Maruti.'),
    tail: s('एका रूपापासून अनेक रूपांपर्यंत पोहोचलेला.', 'reaching from one form to many.'),
    /** {a} and {b} are the first and last इ.स. years, computed from marutis.ts. */
    span: s('इ.स. {a} पासून इ.स. {b} पर्यंतचा हा प्रवास…', 'A journey from {a} CE to {b} CE…'),
  },

  /** 14 — why eleven. */
  whyEleven: {
    lead: s(
      'आणि आता, या अकरा रूपांकडे पाहताना एक प्रश्न मनात येतो…',
      'And now, looking at these eleven forms, a question arrives…',
    ),
    num: s('११', '11'),
    question: s('च का?', ' — why?'),
    a: s('याच प्रश्नातून आपली पुढची गोष्ट सुरू होते.', 'Our next story begins with that question.'),
    b: s('कारण ही फक्त अकरा मूर्तींची मांडणी नाही.', 'Because this is not merely an arrangement of eleven murtis.'),
    c: s('ही त्या विचाराला समजून घेण्याची सुरुवात आहे.', 'It is the beginning of understanding the thought behind them.'),
  },

  /** 15 — the offering changes shape. */
  offering: {
    lead: s('आणि मग… आपण पुन्हा बाप्पाकडे येतो.', 'And then… we come back to Bappa.'),
    always: s('बाप्पाच्या चरणी आपण नेहमीच काही ना काही अर्पण करतो.', 'At Bappa’s feet we have always offered something.'),
    but: s('पण यावेळी… त्या अर्पणात एक वेगळी गोष्ट जोडायची होती.', 'But this time… we wanted to add something different to that offering.'),
    things: [s('हार.', 'A garland.'), s('नारळ.', 'A coconut.'), s('पेढे.', 'Pedhe.')],
    book: s('एक पुस्तक.', 'A book.'),
    by: s('आपल्या श्रद्धेने, आपल्या प्रेमाने, आपल्या परंपरेने.', 'With our faith, our love, our tradition.'),
  },

  /** 16 — the page turns to paper. */
  gyanPeti: {
    questions: [
      s('कारण एखादी वस्तू अर्पण करण्यापेक्षा जर आपण ', 'Because rather than offering an object, what if we offered '),
      s('जर बाप्पाच्या चरणी फुलांसोबत एखादं पुस्तक ठेवलं तर?', 'What if, along with the flowers at Bappa’s feet, we placed a book?'),
      s('जर त्या पुस्तकातून एखाद्या मुलाच्या हातात ज्ञान पोहोचलं तर?', 'What if, through that book, knowledge reached a child’s hands?'),
      s('मग ते फक्त पुस्तक राहत नाही.', 'Then it is no longer only a book.'),
    ],
    /** The emphasised clause inside the first question. */
    q1Emphasis: s('ज्ञान अर्पण केलं तर?', 'knowledge instead?'),
    becomes: s('ते बनतं…', 'It becomes…'),
    offering: s('ज्ञानाचं अर्पण.', 'an offering of knowledge.'),
    therefore: s('आणि म्हणूनच —', 'And so —'),
    name: s('ज्ञान पेटी बाप्पा माझा.', 'Gyan Peti Bappa Maza.'),
  },

  /** 17 — where a book goes. */
  future: {
    path: [
      s('ज्ञान…', 'Knowledge…'),
      s('वाचन…', 'Reading…'),
      s('शिक्षण…', 'Schooling…'),
      s('संस्कार…', 'Values…'),
      s('आणि भविष्य.', 'And a future.'),
    ],
    lines: [
      s(
        'आज एका पुस्तकापासून सुरू झालेली गोष्ट उद्याच्या एका मुलापर्यंत पोहोचू शकते.',
        'What begins today with one book can reach one child tomorrow.',
      ),
      s('एका मुलापासून एका कुटुंबापर्यंत.', 'From one child to one family.'),
      s('एका कुटुंबापासून एका पिढीपर्यंत.', 'From one family to one generation.'),
    ],
    close: s(
      'आणि म्हणूनच ज्ञान हीच सर्वात सुंदर पेटी आहे… जी आपण पुढच्या पिढीसाठी भरू शकतो.',
      'And so knowledge is the most beautiful box of all… the one we can fill for the generation after us.',
    ),
  },

  /** 18 — it all arrives in one place. */
  allInOne: {
    lead: s(
      'हीच भावना घेऊन या वर्षीचा बाप्पा आपल्यासमोर उभा आहे.',
      'It is with this feeling that this year’s Bappa stands before us.',
    ),
    strands: [
      s('दातेगडच्या दगडातून दिसलेला मारुती…', 'The Maruti seen in the stone at Dategad…'),
      s('अकरा मारुतींचा प्रवास…', 'the journey of the eleven Marutis…'),
      s('आणि ज्ञानाच्या अर्पणातून जन्मलेली ही नवी कल्पना…', 'and this new idea, born of an offering of knowledge…'),
    ],
    here: s('हे सगळं आता एका ठिकाणी येतं.', 'All of it now arrives in one place.'),
    tail: [
      s('आपल्या समोर.', 'Before you.'),
      s('आपल्या सजावटीत.', 'In our decoration.'),
      s('त्या अकरा रूपांमध्ये.', 'In those eleven forms.'),
    ],
  },

  /** 19 — the arrangement itself. */
  composition: {
    lead: s('आणि त्यांच्या मध्यभागी…', 'And at their centre…'),
    main: s('आपला मुख्य मारुती.', 'our main Maruti.'),
  },

  /** 20 — put the phone down. */
  lookUp: {
    seen: [
      s('आत्तापर्यंत तुम्ही त्याची कथा पाहिली.', 'So far you have seen its story.'),
      s('त्याचा प्रवास पाहिला.', 'You have seen its journey.'),
      s('त्यामागचा विचार पाहिला.', 'You have seen the thought behind it.'),
    ],
    now: [s('पण आता…', 'But now…'), s('फोनच्या स्क्रीनवरून नजर वर करा.', 'lift your eyes from the phone.')],
    look: s('आता समोरच्या सजावटीकडे पुन्हा एकदा बघा.', 'Now look once more at the decoration in front of you.'),
  },

  /** 21 — close. */
  close: {
    lead: s('कदाचित आता तुम्हाला ती फक्त सजावट दिसणार नाही.', 'Perhaps now you will not see only a decoration.'),
    youWillSee: s('तुम्हाला दिसेल—', 'You will see—'),
    strands: [
      s('दातेगडचा दगड…', 'the stone of Dategad…'),
      s('मारुतीची तीच भावना…', 'that same feeling of Maruti…'),
      s('अकरा रूपांचा प्रवास…', 'the journey of eleven forms…'),
      s('ज्ञानाचं अर्पण…', 'an offering of knowledge…'),
    ],
    and: s('आणि', 'and'),
    name: s('ज्ञान पेटी बाप्पा माझा — ', 'Gyan Peti Bappa Maza — '),
    year: s('२०२६', '2026'),
    /** An invocation: rendered the way English speakers say it, not translated. */
    morya: s('गणपती बाप्पा मोरया!', 'Ganpati Bappa Morya!'),
    /*
      The credit is for this website, not for the सजावट — the mandal built
      that. The label follows the reading language; a name does not change.
    */
    creditLabel: s('संकल्पना आणि मांडणी', 'Concept and design'),
    creditName: s('Pranav Taware', 'Pranav Taware'),
  },
  /** Controls and labels, not prose — but still read aloud by the interface. */
  ui: {
    enlarge: s('मोठं करा', 'Enlarge'),
    close: s('बंद करा', 'Close'),
    prevMaruti: s('मागील मारुती', 'Previous Maruti'),
    nextMaruti: s('पुढील मारुती', 'Next Maruti'),
    photoPending: s('PHOTO येणे बाकी', 'PHOTOGRAPH PENDING'),
    storyPending: s('माहिती येणे बाकी', 'Detail pending'),
    langMr: s('मराठी', 'मराठी'),
    langEn: s('EN', 'EN'),
  },
} as const

/** Language the piece is being read in. Marathi is the default. */
export type Lang2 = 'mr' | 'en'

/** Pick one language out of a `Say`. */
export const say = (v: Say, lang: Lang2) => v[lang]
