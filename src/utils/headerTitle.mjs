import { APP_NAME, NAV_ITEMS, BOTTOM_NAV_ITEMS } from '../constants/app.mjs'
import { SURAH_META } from '../services/surahsMeta.mjs'
import asmaData from '../resources/data/asma_allah_alhusna_saeed_alqahtani.json' with { type: 'json' }
import azkarData from '../resources/data/azkar.json' with { type: 'json' }
import hisnData from '../resources/data/hisnmuslim.json' with { type: 'json' }
import mp3quranData from '../resources/data/mp3quran.json' with { type: 'json' }
import fatwasIndex from '../resources/data/fatwas/index.json' with { type: 'json' }
import historyIndex from '../resources/data/history/index.json' with { type: 'json' }
import tafseerIndex from '../resources/data/tafseer/index.json' with { type: 'json' }
import khutbahIndex from '../resources/data/khutbah/index.json' with { type: 'json' }

/* جداول خفيفة للبحث — نستورد ملفات JSON مباشرة بدل خدمات كاملة
   كي لا تُسحب ملفات ثقيلة (quran.json ~5MB، ملفات الصوت) إلى الهيدر. */

const RECITER_BY_ID = new Map(mp3quranData.map((r) => [r.id, r]))
const ASMA_BY_ID = new Map(asmaData.map((n) => [String(n.id), n]))
const ADHKAR_BY_KEY = new Map(azkarData.map((c) => [c.key, c]))
const HISN_BY_ID = new Map(hisnData.map((c) => [String(c.id), c]))
const FATWA_BY_SLUG = new Map(fatwasIndex.map((c) => [c.slug, c]))
const HISTORY_ERA_BY_KEY = new Map(historyIndex.map((e) => [e.key, e]))
const TAFSEER_BY_NO = new Map(tafseerIndex.map((s) => [s.n, s]))
const KHUTBAH_BY_SLUG = new Map(khutbahIndex.map((c) => [c.slug, c]))

const TITLES = {
  '/home': 'الرئيسية',
  '/quran': 'المصحف',
  '/tafseer': 'التفسير الميسر',
  '/adhkar': 'الأذكار',
  '/hisn': 'حصن المسلم',
  '/fatwas': 'فتاوى ابن باز',
  '/prayer': 'المواقيت',
  '/qibla': 'اتجاه القبلة',
  '/tasbih': 'المسبحة',
  '/radio': 'الراديو',
  '/reciters': 'القرّاء',
  '/quiz': 'الأسئلة',
  '/history': 'الموسوعة التاريخية',
  '/khutbah': 'الخطب',
  '/settings': 'الإعدادات',
  '/asma': 'أسماء الله الحسنى',
  '/quran-cards': 'بطاقات القرآن',
}

const SETTINGS_TITLES = {
  reading: 'القراءة والخطوط',
  prayer: 'حساب المواقيت',
  adhan: 'الأذان والتنبيهات',
  location: 'الموقع',
  downloads: 'التنزيلات والتخزين',
  data: 'البيانات والخصوصية',
  support: 'الدعم والتبرع',
  about: 'حول التطبيق',
}

/* الصفحات الجذرية (تظهر في الشبكة الرئيسية) غير الموجودة في شريط التنقل السفلي
   — يظهر فيها زر رجوع إلى القائمة الرئيسية. */
const BOTTOM_NAV_PATHS = new Set(BOTTOM_NAV_ITEMS.map((i) => i.path))
const ROOT_BACK_HOME = NAV_ITEMS.map((i) => i.path).filter(
  (p) => !BOTTOM_NAV_PATHS.has(p) && p !== '/home'
)

/* ------------------------------------------------------------------ *
 * عنوان ديناميكي يُحقنه من الشاشة الفرعية (مثل عنوان الفتوى على صفحتها)
 * — تُحدَّد الفتوى داخل الشاشة لأن تحميل فئتها يبقى لازيًا، ولا يجوز
 * سحب كل الفتاوى إلى الهيدر للتسمية. الهيدر يقرأه عبر useSyncExternalStore.
 * ------------------------------------------------------------------ */

let dynamicTitle = null
const headerListeners = new Set()

export function setDynamicTitle(title) {
  const next = title ? String(title) : null
  if (next === dynamicTitle) return
  dynamicTitle = next
  for (const fn of headerListeners) fn()
}

export function subscribeHeader(fn) {
  headerListeners.add(fn)
  return () => headerListeners.delete(fn)
}

export function getDynamicTitle() {
  return dynamicTitle
}

/**
 * يحوّل مسار الصفحة إلى بيانات الهيدر:
 * { title, back } — اسم الصفحة + وجهة زر الرجوع إن وُجدت.
 *
 * - `back = 'history'` للصفحات الفرعية (السور، القارئ، الباب…) → رجوع للصفحة السابقة.
 * - `back = '/home'` للصفحات الجذرية خارج شريط التنقل → رجوع للقائمة الرئيسية.
 * - `back = null` لصفحات شريط التنقل (لا زر رجوع).
 *
 * يُتجنَّب استيراد بيانات الكويز الكسولة (IslamicQuiz.json ~2.4MB) لذا
 * تبقى الصفحات الفرعية للأسئلة بعنوان القسم العام.
 */
export function getHeaderMeta(pathname) {
  const raw = pathname.split('/').filter(Boolean)
  const segments = raw.map((s) => {
    try {
      return decodeURIComponent(s)
    } catch {
      return s
    }
  })
  const base = `/${segments[0] || 'home'}`
  const isSubPage = segments.length > 1

  let title = TITLES[base] || APP_NAME

  if (segments[1]) {
    if (base === '/quran') {
      const meta = SURAH_META[Number(segments[1])]
      if (meta?.name) title = `سورة ${meta.name}`
    } else if (base === '/tafseer') {
      const surah = TAFSEER_BY_NO.get(Number(segments[1]))
      if (surah?.name) title = `تفسير سورة ${surah.name}`
    } else if (base === '/adhkar') {
      const category = ADHKAR_BY_KEY.get(segments[1])
      if (category?.category) title = category.category
    } else if (base === '/hisn') {
      const category = HISN_BY_ID.get(String(segments[1]))
      if (category?.category) title = category.category
    } else if (base === '/fatwas') {
      const category = FATWA_BY_SLUG.get(segments[1])
      if (category?.name) title = category.name
    } else if (base === '/reciters') {
      const reciter = RECITER_BY_ID.get(Number(segments[1]))
      if (reciter?.name) title = reciter.name
    } else if (base === '/history') {
      const era = HISTORY_ERA_BY_KEY.get(segments[1])
      if (era?.title) title = era.title
    } else if (base === '/khutbah') {
      const category = KHUTBAH_BY_SLUG.get(segments[1])
      if (category?.name) title = category.name
    } else if (base === '/asma') {
      const name = ASMA_BY_ID.get(segments[1])
      if (name?.name_arabic) title = name.name_arabic
    } else if (base === '/settings') {
      const sub = SETTINGS_TITLES[segments[1]]
      if (sub) title = sub
    }
  }

  let back = null
  if (base === '/settings' && isSubPage) {
    back = '/settings'
  } else if (isSubPage) {
    back = 'history'
  } else if (ROOT_BACK_HOME.includes(base)) {
    back = '/home'
  }

  return { title, back }
}