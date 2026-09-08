export const APP_NAME = 'التقوى'
export const APP_VERSION = '3.1.0'

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.rn0x.altaqwaa'
export const GITHUB_REPO_URL = 'https://github.com/rn0x/altaqwaa-android/'

export const NAV_ITEMS = [
  { path: '/home', label: 'الرئيسية', short: 'الرئيسية', icon: 'home', accent: '#7c9cff' },
  { path: '/quran', label: 'القرآن', short: 'المصحف', icon: 'book', accent: '#10b981' },
  { path: '/tafseer', label: 'التفسير الميسر', short: 'التفسير', icon: 'book-open', accent: '#2dd4bf' },
  { path: '/adhkar', label: 'الأذكار', short: 'الأذكار', icon: 'hand', accent: '#d4af37' },
  { path: '/hisn', label: 'حصن المسلم', short: 'حصن المسلم', icon: 'shield', accent: '#60a5fa' },
  { path: '/history', label: 'الموسوعة التاريخية', short: 'التاريخ', icon: 'scroll', accent: '#b48cff' },
  { path: '/fatwas', label: 'فتاوى ابن باز', short: 'الفتاوى', icon: 'feather', accent: '#f59e0b' },
  { path: '/khutbah', label: 'الخطب', short: 'الخطب', icon: 'minbar', accent: '#fb923c' },
  { path: '/prayer', label: 'المواقيت', short: 'المواقيت', icon: 'moon-star', accent: '#7c9cff' },
  { path: '/qibla', label: 'اتجاه القبلة', short: 'القبلة', icon: 'target', accent: '#d4af37' },
  { path: '/quiz', label: 'الأسئلة', short: 'الأسئلة', icon: 'help', accent: '#a78bfa' },
  { path: '/tasbih', label: 'المسبحة', short: 'المسبحة', icon: 'beads', accent: '#34d399' },
  { path: '/radio', label: 'الراديو', short: 'الراديو', icon: 'radio', accent: '#f472b6' },
  { path: '/reciters', label: 'القرّاء', short: 'القرّاء', icon: 'mic', accent: '#38bdf8' },
  { path: '/quran-cards', label: 'بطاقات القرآن', short: 'البطاقات', icon: 'bookmark', accent: '#d4af37' },
  { path: '/asma', label: 'أسماء الله الحسنى', short: 'الأسماء', icon: 'star', accent: '#d4af37' },
  { path: '/settings', label: 'الإعدادات', short: 'الإعدادات', icon: 'sliders', accent: '#64748b' },
]

export const BOTTOM_NAV_ITEMS = [
  { path: '/home', label: 'الرئيسية', icon: 'home' },
  { path: '/quran', label: 'القرآن', icon: 'book' },
  { path: '/prayer', label: 'المواقيت', icon: 'moon-star' },
  { path: '/adhkar', label: 'الأذكار', icon: 'hand' },
  { path: '/settings', label: 'الإعدادات', icon: 'sliders' },
]

export const SCREENS_META = {
  quran: { title: 'القرآن الكريم', description: 'قراءة المصحف والاستماع للقراء' },
  tafseer: { title: 'التفسير الميسر', description: 'تفسير كتاب الله بأسلوب سهل قريب' },
  adhkar: { title: 'الأذكار', description: 'أذكار الصباح والمساء وأذكار النوم' },
  hisn: { title: 'حصن المسلم', description: 'أذكار النبي ﷺ — استمع وحمّل للاستماع دون إنترنت' },
  history: { title: 'الموسوعة التاريخية', description: 'أحداث مرتبطة بالإسلام والمسلمين من مصادر موثوقة' },
  fatwas: { title: 'فتاوى ابن باز', description: 'فتاوى الشيخ عبد العزيز بن باز رحمه الله — مكتوبة ومسموعة' },
  khutbah: { title: 'الخطب', description: 'خطب منبرية من موقع ملتقى الخطباء — مكتوبة بمرفقات PDF وWord' },
  prayer: { title: 'مواقيت الصلاة', description: 'مواقيت الصلاة حسب موقعك' },
  qibla: { title: 'اتجاه القبلة', description: 'بوصلة دقيقة لاتجاه القبلة من موقعك' },
  tasbih: { title: 'المسبحة الإلكترونية', description: 'تسبيح بعدّاد تفاعلي' },
  radio: { title: 'راديو التقوى', description: 'بث مباشر وقنوات قرآنية' },
  reciters: { title: 'القرّاء', description: 'تصفح القراء والاستماع لتلاواتهم' },
  'quran-cards': { title: 'بطاقات القرآن', description: '114 بطاقة شاملة لكل سورة — معلومات، استماع، تحميل' },
  asma: { title: 'أسماء الله الحسنى', description: '99 اسمًا من أسماء الله الحسنى مع الشرح الدليل من الكتاب والسنة' },
  quiz: { title: 'الأسئلة الإسلامية', description: 'أسئلة تفاعلية بأبواب مقفلة ونجوم وإنجازات' },
  settings: { title: 'الإعدادات', description: 'تفضيلات التطبيق والحساب' },
}