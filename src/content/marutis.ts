import type { Maruti } from './types'
import { media } from './media'

const EMPTY = { mr: '' }

/**
 * The eleven Marutis of Samarth Ramdas Swami.
 *
 * Names, order, शके / इ.स. years and the माहिती line are supplied by the
 * mandal and are authoritative. `decorationLink` stays blank: that is the
 * sentence pointing at the physical panel in the mandap, and only the people
 * who built it can write it.
 */
export const MARUTIS: Maruti[] = [
  {
    id: 'shahapur', order: 1, verified: true,
    name: { dev: 'शहापूर मारुती', roman: 'Shahapur Maruti' },
    village: { dev: 'शहापूर', roman: 'Shahapur' },
    district: { mr: 'सातारा', hi: 'सातारा', en: 'Satara' },
    approxLatLng: [17.3167, 74.0333],
    established: { mr: 'शके १५६६ · इ.स. १६४४', hi: 'शक १५६६ · ई.स. १६४४', en: 'Shake 1566 · CE 1644' },
    story: { mr: 'समर्थ रामदास स्वामींनी स्थापन केलेल्या अकरा मारुतींपैकी हा पहिला मारुती मानला जातो.', hi: 'समर्थ रामदास स्वामी द्वारा स्थापित ग्यारह मारुतियों में से यह पहला मारुति माना जाता है।', en: 'Considered the first of the eleven Marutis established by Samarth Ramdas Swami.' },
    significance: EMPTY, decorationLink: EMPTY,
    media: media('maruti-01', { mr: 'शहापूर मारुती · सजावटीतील शिल्प' }),
  },
  {
    id: 'masur', order: 2, verified: true,
    name: { dev: 'मसूर मारुती', roman: 'Masur Maruti' },
    village: { dev: 'मसूर', roman: 'Masur' },
    district: { mr: 'सातारा', hi: 'सातारा', en: 'Satara' },
    approxLatLng: [17.3833, 74.1333],
    established: { mr: 'शके १५६७ · इ.स. १६४५', hi: 'शक १५६७ · ई.स. १६४५', en: 'Shake 1567 · CE 1645' },
    story: { mr: 'ऐतिहासिक मसूर गावात स्थापित हा मारुती समर्थांच्या मार्गदर्शनाखाली उभारला गेला.', hi: 'ऐतिहासिक मसूर गाँव में स्थापित यह मारुति समर्थ के मार्गदर्शन में बनाया गया।', en: 'Raised under Samarth’s guidance in the historic village of Masur.' },
    significance: EMPTY, decorationLink: EMPTY,
    media: media('maruti-02', { mr: 'मसूर मारुती · सजावटीतील शिल्प' }),
  },
  {
    id: 'chafal-das', order: 3, verified: true,
    name: { dev: 'चाफळ · दास मारुती', roman: 'Chafal · Das Maruti' },
    village: { dev: 'चाफळ', roman: 'Chafal' },
    district: { mr: 'सातारा', hi: 'सातारा', en: 'Satara' },
    approxLatLng: [17.3600, 73.9300],
    established: { mr: 'शके १५७० · इ.स. १६४८', hi: 'शक १५७० · ई.स. १६४८', en: 'Shake 1570 · CE 1648' },
    story: { mr: 'चाफळमधीलच हा दुसरा मारुती असून येथे मारुतीची मुद्रा दासाच्या (भक्ताच्या) स्वरूपात आहे.', hi: 'चाफळ का यह दूसरा मारुति है, जहाँ मारुति की मुद्रा दास (भक्त) के रूप में है।', en: 'The second Maruti at Chafal, where the form stands as a das · a devotee.' },
    significance: EMPTY, decorationLink: EMPTY,
    media: media('maruti-03', { mr: 'चाफळ दास मारुती · सजावटीतील शिल्प' }),
  },
  {
    id: 'chafal-pratap', order: 4, verified: true,
    name: { dev: 'चाफळ · प्रताप मारुती', roman: 'Chafal · Pratap Maruti' },
    village: { dev: 'चाफळ', roman: 'Chafal' },
    district: { mr: 'सातारा', hi: 'सातारा', en: 'Satara' },
    approxLatLng: [17.3612, 73.9325],
    established: { mr: 'शके १५७० · इ.स. १६४८', hi: 'शक १५७० · ई.स. १६४८', en: 'Shake 1570 · CE 1648' },
    story: { mr: 'चाफळ येथील मुख्य आणि प्रताप मारुती म्हणून प्रसिद्ध असलेली ही मूर्ती समर्थांच्या अत्यंत महत्त्वाची मानली जाते.', hi: 'चाफळ की मुख्य और प्रताप मारुति के नाम से प्रसिद्ध यह मूर्ति समर्थ के लिए अत्यंत महत्वपूर्ण मानी जाती है।', en: 'The principal murti at Chafal, known as Pratap Maruti and held among the most important to Samarth.' },
    significance: EMPTY, decorationLink: EMPTY,
    media: media('maruti-04', { mr: 'चाफळ प्रताप मारुती · सजावटीतील शिल्प' }),
  },
  {
    id: 'shinganwadi', order: 5, verified: true,
    name: { dev: 'शिंगणवाडी मारुती', roman: 'Shinganwadi Maruti' },
    village: { dev: 'शिंगणवाडी', roman: 'Shinganwadi' },
    district: { mr: 'सातारा', hi: 'सातारा', en: 'Satara' },
    approxLatLng: [17.3550, 73.9400],
    established: { mr: 'शके १५७१ · इ.स. १६४९', hi: 'शक १५७१ · ई.स. १६४९', en: 'Shake 1571 · CE 1649' },
    story: { mr: 'सज्जनगडाच्या परिसराजवळ असलेल्या शिंगणवाडी येथे हा मारुती स्थापित आहे.', hi: 'सज्जनगड के निकट शिंगणवाडी में यह मारुति स्थापित है।', en: 'Established at Shinganwadi, close to the country around Sajjangad.' },
    significance: EMPTY, decorationLink: EMPTY,
    media: media('maruti-05', { mr: 'शिंगणवाडी मारुती · सजावटीतील शिल्प' }),
  },
  {
    id: 'umbraj', order: 6, verified: true,
    name: { dev: 'उंब्रज मारुती', roman: 'Umbraj Maruti' },
    village: { dev: 'उंब्रज', roman: 'Umbraj' },
    district: { mr: 'सातारा', hi: 'सातारा', en: 'Satara' },
    approxLatLng: [17.4333, 74.1000],
    established: { mr: 'शके १५७१ · इ.स. १६५०', hi: 'शक १५७१ · ई.स. १६५०', en: 'Shake 1571 · CE 1650' },
    story: { mr: 'उंबरज परिसरात कृष्णा नदीच्या खोऱ्यात हा मारुती समर्थांनी स्थापित केला.', hi: 'उंबरज क्षेत्र में कृष्णा नदी की घाटी में समर्थ ने यह मारुति स्थापित किया।', en: 'Established by Samarth in the Krishna valley around Umbraj.' },
    significance: EMPTY, decorationLink: EMPTY,
    media: media('maruti-06', { mr: 'उंब्रज मारुती · सजावटीतील शिल्प' }),
  },
  {
    id: 'majgaon', order: 7, verified: true,
    name: { dev: 'माजगाव मारुती', roman: 'Majgaon Maruti' },
    village: { dev: 'माजगाव', roman: 'Majgaon' },
    district: { mr: 'सातारा', hi: 'सातारा', en: 'Satara' },
    approxLatLng: [17.2800, 73.9800],
    established: { mr: 'शके १५७१ · इ.स. १६५०', hi: 'शक १५७१ · ई.स. १६५०', en: 'Shake 1571 · CE 1650' },
    story: { mr: 'सातारा परिसरातील माजगाव येथे लोकजागृतीच्या उद्देशाने या मारुतीची स्थापना करण्यात आली.', hi: 'सातारा क्षेत्र के माजगाव में लोकजागृति के उद्देश्य से इस मारुति की स्थापना की गई।', en: 'Established at Majgaon near Satara to awaken and gather the people.' },
    significance: EMPTY, decorationLink: EMPTY,
    media: media('maruti-07', { mr: 'माजगाव मारुती · सजावटीतील शिल्प' }),
  },
  {
    id: 'bahe', order: 8, verified: true,
    name: { dev: 'बहे-बोरगाव मारुती', roman: 'Bahe-Borgaon Maruti' },
    village: { dev: 'बहे-बोरगाव', roman: 'Bahe-Borgaon' },
    district: { mr: 'सांगली', hi: 'सांगली', en: 'Sangli' },
    approxLatLng: [17.0333, 74.2500],
    established: { mr: 'शके १५७३ · इ.स. १६५१', hi: 'शक १५७३ · ई.स. १६५१', en: 'Shake 1573 · CE 1651' },
    story: { mr: 'सांगली जिल्ह्यातील कृष्णाकाठी असलेल्या बाहे गावात हा मारुती स्थापित आहे.', hi: 'सांगली ज़िले में कृष्णा के तट पर बसे बाहे गाँव में यह मारुति स्थापित है।', en: 'Stands at Bahe on the bank of the Krishna, in Sangli district.' },
    significance: EMPTY, decorationLink: EMPTY,
    media: media('maruti-08', { mr: 'बहे-बोरगाव मारुती · सजावटीतील शिल्प' }),
  },
  {
    id: 'manpadale', order: 9, verified: true,
    name: { dev: 'मनपाडळे मारुती', roman: 'Manpadale Maruti' },
    village: { dev: 'मनपाडळे', roman: 'Manpadale' },
    district: { mr: 'कोल्हापूर', hi: 'कोल्हापूर', en: 'Kolhapur' },
    approxLatLng: [16.8000, 74.1000],
    established: { mr: 'शके १५७३ · इ.स. १६५१', hi: 'शक १५७३ · ई.स. १६५१', en: 'Shake 1573 · CE 1651' },
    story: { mr: 'कोल्हापूर जिल्ह्यातील शाहूवाडी तालुक्यात मनपाडळे येथे हा समर्थ स्थापित मारुती आहे.', hi: 'कोल्हापूर ज़िले के शाहूवाडी तालुका में मनपाडळे में यह समर्थ-स्थापित मारुति है।', en: 'A Samarth-established Maruti at Manpadale, Shahuwadi taluka, Kolhapur district.' },
    significance: EMPTY, decorationLink: EMPTY,
    media: media('maruti-09', { mr: 'मनपाडळे मारुती · सजावटीतील शिल्प' }),
  },
  {
    id: 'pargaon', order: 10, verified: true,
    name: { dev: 'पारगाव मारुती', roman: 'Pargaon Maruti' },
    village: { dev: 'पारगाव', roman: 'Pargaon' },
    district: { mr: 'कोल्हापूर', hi: 'कोल्हापूर', en: 'Kolhapur' },
    approxLatLng: [16.7600, 74.1400],
    established: { mr: 'शके १५७४ · इ.स. १६५२', hi: 'शक १५७४ · ई.स. १६५२', en: 'Shake 1574 · CE 1652' },
    story: { mr: 'जुना पारगाव येथे समर्थ रामदास स्वामींनी तरुण पिढीमध्ये सामर्थ्य निर्माण करण्यासाठी या मारुतीची स्थापना केली.', hi: 'जुना पारगाव में समर्थ रामदास स्वामी ने युवा पीढ़ी में सामर्थ्य जगाने के लिए इस मारुति की स्थापना की।', en: 'Established at old Pargaon by Samarth Ramdas Swami to build strength in the young.' },
    significance: EMPTY, decorationLink: EMPTY,
    media: media('maruti-10', { mr: 'पारगाव मारुती · सजावटीतील शिल्प' }),
  },
  {
    id: 'battis-shirale', order: 11, verified: true,
    name: { dev: 'बत्तीस शिराळे मारुती', roman: 'Battis Shirale Maruti' },
    village: { dev: 'बत्तीस शिराळे', roman: 'Battis Shirale' },
    district: { mr: 'सांगली', hi: 'सांगली', en: 'Sangli' },
    approxLatLng: [17.0000, 74.1200],
    established: { mr: 'शके १५७६ · इ.स. १६५४', hi: 'शक १५७६ · ई.स. १६५४', en: 'Shake 1576 · CE 1654' },
    story: { mr: 'सांगली जिल्ह्यातील बत्तीस शिराळे येथे स्थापित हा समर्थांच्या अकरा मारुतींपैकी शेवटचा मारुती आहे.', hi: 'सांगली ज़िले के बत्तीस शिराळे में स्थापित यह समर्थ के ग्यारह मारुतियों में अंतिम है।', en: 'The last of Samarth’s eleven, established at Battis Shirale in Sangli district.' },
    significance: EMPTY, decorationLink: EMPTY,
    media: media('maruti-11', { mr: 'बत्तीस शिराळे मारुती · सजावटीतील शिल्प' }),
  },
]

/** Bounds of the eleven, used to normalise them onto the stylised map. */
export const MARUTI_BOUNDS = MARUTIS.reduce(
  (b, m) => ({
    minLat: Math.min(b.minLat, m.approxLatLng[0]),
    maxLat: Math.max(b.maxLat, m.approxLatLng[0]),
    minLng: Math.min(b.minLng, m.approxLatLng[1]),
    maxLng: Math.max(b.maxLng, m.approxLatLng[1]),
  }),
  { minLat: 90, maxLat: -90, minLng: 180, maxLng: -180 },
)

/** Span of the eleven, shown as one fact: eleven murtis inside ten years. */
export const SPAN = { fromDev: '१६४४', toDev: '१६५४', years: 10 }
