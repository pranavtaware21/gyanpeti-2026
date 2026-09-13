import { media } from './media'

/**
 * The v2 script, verbatim.
 *
 * Every word the visitor reads is here, in scene order, so the owner can edit
 * the piece without opening a component — and so it is obvious at a glance
 * that nothing was invented to fill a hole. Nothing in this file may be
 * written, reworded or "improved" without the mandal saying so.
 *
 * Marathi only. The earlier build carried hi/en alongside; v2 is the script as
 * it was authored, and a half-translated screen reads worse than an honest
 * monolingual one. The i18n provider stays wired for the eleven's माहिती,
 * which does exist in three languages.
 *
 * Sacred text — names, the invocation, place names — is Devanagari and is not
 * translated anywhere, in any language mode.
 */

/**
 * Photographs used by the scenes. The eleven carry their own in marutis.ts.
 *
 * `media()` returns null for anything the pipeline has not processed, and the
 * scene then renders a labelled gap instead of a broken image. Several of
 * these are still null: they exist in the design canvas but could not be
 * pulled down, so the gaps are load-bearing until someone drops the files
 * into `img-source/` and re-runs `npm run assets`.
 */
export const PHOTOS = {
  aerial: media('dategad-aerial', { mr: 'दातेगड — वरून दिसणारा गड' }, 'Click.by_महया'),
  entrance: media('dategad-entrance', { mr: 'अखंड खडकात कोरलेलं भुयारी मंदिर — उतरणाऱ्या पायऱ्या' }),
  mandir: media('dategad-mandir', { mr: 'खडकात कोरलेली मारुतीची मूर्ती' }),
  /*
    Scene 09's photograph. The canvas calls this `dategad-chamber`, but the
    identical file (byte for byte) was already in the project as
    `dategad-both` — "both" meaning both carvings in one frame, which is
    exactly why this scene needs it: the light has to be seen crossing from
    the गणपती on one wall to the मारुती on the other, and a photograph of
    either one alone can only assert that.
  */
  chamber: media('dategad-both', { mr: 'दातेगडावरील भुयारी मंदिर — गणपती आणि मारुती' }),
  ganpati: media('dategad-ganpati', { mr: 'एका भिंतीवर गणपती' }),
  shrine: media('dategad-shrine', { mr: 'दगडात कोरलेला मारुती' }),
}

/**
 * Scene 16 — past शैक्षणिक साहित्य वाटप, dealt out as photographs on the paper
 * ground. These are the mandal's own record of the idea already happening, and
 * they are why the scene can claim a book reaches a child without inventing
 * anything: it has already been done.
 */
export const GYAN_PHOTOS = [
  { key: 'gyan-01', alt: 'शैक्षणिक साहित्य वाटप' },
  { key: 'gyan-03', alt: 'वह्या-पुस्तकांचे वाटप' },
  { key: 'gyan-05', alt: 'कंपासपेटी मिळालेली मुलं' },
  { key: 'gyan-07', alt: 'साहित्य हातात देताना' },
  { key: 'gyan-08', alt: 'शैक्षणिक साहित्य वाटप — २०२४-२५' },
  { key: 'gyan-04', alt: 'शाळेतील मुलं' },
  { key: 'gyan-06', alt: 'वाटप कार्यक्रम' },
  { key: 'gyan-02', alt: 'संपूर्ण वाटप कार्यक्रम' },
].map((p) => ({ ...p, media: media(p.key, { mr: p.alt }) }))

export const V2 = {
  /** 01 — the invocation. */
  shri: {
    mark: '॥ श्री ॥',
    hint: 'खाली सरकवा ↓',
  },

  /** 02 — fifteen years. */
  fifteen: {
    digits: ['१', '५'],
    head: 'वर्षांचा हा गणपती उत्सव…',
    lines: [
      'या पंधरा वर्षांच्या प्रवासात,',
      'बाप्पाच्या चरणी अनेक आठवणी अर्पण झाल्या…',
      'अनेक भावना जोडल्या गेल्या…',
      'आणि प्रत्येक वर्षी काहीतरी नवीन साकारत गेलं.',
    ],
  },

  /** 03 — the name of this year's piece. */
  identity: {
    lead: ['याच प्रवासातून,', 'यावर्षी…'],
    title: ['ज्ञान पेटी', 'बाप्पा माझा'],
    year: '२०२६',
    tail: 'सादर करीत आहे.',
  },

  /** 04 — not a decoration. */
  storyBegins: {
    a: 'पण यावेळी ही फक्त सजावट नाही.',
    b: 'ही एक कथा आहे.',
    c: 'एका प्रवासाची…',
  },

  /** 05 — out of the Sahyadri. */
  journey: {
    lines: [
      'महाराष्ट्राच्या मातीतून,',
      'सह्याद्रीच्या रांगांमधून,',
      'एका गडाच्या दिशेने जाणाऱ्या प्रवासाची.',
    ],
    place: 'दातेगड.',
    credit: 'छायाचित्र · Click.by_महया',
  },

  /** 06 — the fort. Figures supplied by the mandal. */
  dategad: {
    body: 'गडावर पोहोचताना, दगड, माती, वाटा आणि सह्याद्री मागे पडत जातात… आणि आपण हळूहळू त्या जागेच्या अधिक जवळ जातो.',
    height: '३,२६०',
    heightUnit: 'फूट',
    where: ['सुंदरगड · तालुका पाटण', 'जिल्हा सातारा'],
    hanuman: 'मुख्य दरवाज्याकडे तोंड करून उभा असलेला सहा फुटी हनुमान.',
    credit: 'छायाचित्र · Click.by_महया · संदर्भ durgbharari.in',
  },

  /** 07 — the descent. Three supplied sentences, in order. */
  steps: {
    count: '२९',
    lines: [
      'गडाच्या आत, अखंड खडकात कोरलेलं एक अनोखं भुयारी मंदिर आहे.',
      'त्या मंदिरात उतरण्यासाठी २९ पायऱ्या उतराव्या लागतात.',
      'आणि या मंदिरावर कोणतंही बाह्य आच्छादन नाही.',
    ],
  },

  /** 08 — two carvings, facing walls. */
  twoForms: {
    stone: 'फक्त दगड.',
    sky: 'आकाश.',
    lead: 'आणि त्या दगडात कोरलेली दोन रूपं…',
    ganpati: 'गणपती',
    maruti: 'मारुती',
    tail: 'आणि दुसऱ्या भिंतीवर मारुती.',
  },

  /** 09 — the light crosses the shrine. */
  sun: {
    sunriseLine: 'सूर्योदयाची पहिली किरणं गणेशमूर्तीवर पडतात…',
    sunsetLine: 'आणि सूर्यास्ताची किरणं मारुतीच्या मूर्तीवर.',
    sunrise: 'सूर्योदय',
    sunriseOn: 'गणेशमूर्तीवर',
    sunset: 'सूर्यास्त',
    sunsetOn: 'मारुतीच्या मूर्तीवर',
    close: 'एकाच आकाशाखाली, एकाच दगडात, प्रकाशाच्या या प्रवासासोबत दोन रूपं आपल्यासमोर उभी राहतात.',
  },

  /** 10 — the gaze stops. */
  gaze: {
    lead: ['आणि तिथेच…', 'आपली नजर थांबते.'],
    name: 'मारुती.',
    a: 'दगडातून साकारलेलं ते रूप फक्त एक शिल्प म्हणून दिसत नाही.',
    b: 'ते एक विचार सुरू करतं.',
  },

  /** 11 — one becomes eleven. */
  oneToEleven: {
    one: 'एक मारुती…',
    bridge: 'आणि त्या एका रूपातून आपण पोहोचतो अनेक रूपांकडे.',
    eleven: 'मारुती',
  },

  /** 12 — through the eleven. Place-names cut rather than fade. */
  eleven: {
    calls: [
      'शहापूरपासून…',
      'मसूरपर्यंत…',
      'चाफळच्या दास मारुतीपासून प्रताप मारुतीपर्यंत…',
      'शिंगणवाडी, उंब्रज, माजगाव…',
      'बहे-बोरगाव, मनपाडळे, पारगाव…',
      'आणि बत्तीस शिराळे.',
    ],
    hint: 'फोटोवर टॅप करा · संपूर्ण माहिती',
  },

  /** 13 — one thread. The figures are arithmetic over marutis.ts. */
  thread: {
    lines: ['वेगवेगळी गावं.', 'वेगवेगळे प्रदेश.', 'वेगवेगळे काळ.'],
    lead: 'पण या सगळ्यांना जोडणारा एकच धागा…',
    name: 'मारुती.',
    tail: 'एका रूपापासून अनेक रूपांपर्यंत पोहोचलेला.',
  },

  /** 14 — why eleven. */
  whyEleven: {
    lead: 'आणि आता, या अकरा रूपांकडे पाहताना एक प्रश्न मनात येतो…',
    question: 'च का?',
    a: 'याच प्रश्नातून आपली पुढची गोष्ट सुरू होते.',
    b: 'कारण ही फक्त अकरा मूर्तींची मांडणी नाही.',
    c: 'ही त्या विचाराला समजून घेण्याची सुरुवात आहे.',
  },

  /** 15 — the offering changes shape. */
  offering: {
    lead: 'आणि मग… आपण पुन्हा बाप्पाकडे येतो.',
    always: 'बाप्पाच्या चरणी आपण नेहमीच काही ना काही अर्पण करतो.',
    but: 'पण यावेळी… त्या अर्पणात एक वेगळी गोष्ट जोडायची होती.',
    things: ['हार.', 'नारळ.', 'पेढे.'],
    book: 'एक पुस्तक.',
    by: 'आपल्या श्रद्धेने, आपल्या प्रेमाने, आपल्या परंपरेने.',
  },

  /** 16 — the page turns to paper. */
  gyanPeti: {
    questions: [
      'कारण एखादी वस्तू अर्पण करण्यापेक्षा जर आपण ',
      'जर बाप्पाच्या चरणी फुलांसोबत एखादं पुस्तक ठेवलं तर?',
      'जर त्या पुस्तकातून एखाद्या मुलाच्या हातात ज्ञान पोहोचलं तर?',
      'मग ते फक्त पुस्तक राहत नाही.',
    ],
    /** The emphasised clause inside the first question. */
    q1Emphasis: 'ज्ञान अर्पण केलं तर?',
    becomes: 'ते बनतं…',
    offering: 'ज्ञानाचं अर्पण.',
    therefore: 'आणि म्हणूनच —',
    name: 'ज्ञान पेटी बाप्पा माझा.',
  },

  /** 17 — where a book goes. */
  future: {
    path: ['ज्ञान…', 'वाचन…', 'शिक्षण…', 'संस्कार…', 'आणि भविष्य.'],
    lines: [
      'आज एका पुस्तकापासून सुरू झालेली गोष्ट उद्याच्या एका मुलापर्यंत पोहोचू शकते.',
      'एका मुलापासून एका कुटुंबापर्यंत.',
      'एका कुटुंबापासून एका पिढीपर्यंत.',
    ],
    close: 'आणि म्हणूनच ज्ञान हीच सर्वात सुंदर पेटी आहे… जी आपण पुढच्या पिढीसाठी भरू शकतो.',
  },

  /** 18 — it all arrives in one place. */
  allInOne: {
    lead: 'हीच भावना घेऊन या वर्षीचा बाप्पा आपल्यासमोर उभा आहे.',
    strands: [
      'दातेगडच्या दगडातून दिसलेला मारुती…',
      'अकरा मारुतींचा प्रवास…',
      'आणि ज्ञानाच्या अर्पणातून जन्मलेली ही नवी कल्पना…',
    ],
    here: 'हे सगळं आता एका ठिकाणी येतं.',
    tail: ['आपल्या समोर.', 'आपल्या सजावटीत.', 'त्या अकरा रूपांमध्ये.'],
  },

  /** 19 — the arrangement itself. */
  composition: {
    lead: 'आणि त्यांच्या मध्यभागी…',
    main: 'आपला मुख्य मारुती.',
  },

  /** 20 — put the phone down. */
  lookUp: {
    seen: ['आत्तापर्यंत तुम्ही त्याची कथा पाहिली.', 'त्याचा प्रवास पाहिला.', 'त्यामागचा विचार पाहिला.'],
    now: ['पण आता…', 'फोनच्या स्क्रीनवरून नजर वर करा.'],
    look: 'आता समोरच्या सजावटीकडे पुन्हा एकदा बघा.',
  },

  /** 21 — close. */
  close: {
    lead: 'कदाचित आता तुम्हाला ती फक्त सजावट दिसणार नाही.',
    youWillSee: 'तुम्हाला दिसेल—',
    strands: [
      'दातेगडचा दगड…',
      'मारुतीची तीच भावना…',
      'अकरा रूपांचा प्रवास…',
      'ज्ञानाचं अर्पण…',
    ],
    and: 'आणि',
    name: 'ज्ञान पेटी बाप्पा माझा — ',
    year: '२०२६',
    morya: 'गणपती बाप्पा मोरया!',
  },
} as const
