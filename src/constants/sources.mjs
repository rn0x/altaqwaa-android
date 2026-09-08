/**
 * مصادر محتوى تطبيق التقوى — تُعرض في صفحة "حول التطبيق".
 * `url` هو الرابط الأساسي الذي يُفتح عند الضغط على الصف،
 * و`github` (اختياري) يُفتح من زر GitHub داخل الصف — كلاهما عبر openExternal.
 */

export const APP_SOURCES = [
  {
    id: 'quran',
    name: 'القرآن الكريم',
    description: 'مصحف كامل بنصّ ورسم عثماني مع تشكيل',
    icon: 'book',
    url: 'https://github.com/rn0x/Quran-Data',
  },
  {
    id: 'tafseer',
    name: 'التفسير الميسر',
    description: 'مجمع الملك فهد لطباعة المصحف الشريف',
    icon: 'book-open',
    url: 'https://qurancomplex.gov.sa/quran-dev/',
  },
  {
    id: 'hisn',
    name: 'حصن المسلم',
    description: 'من أذكار الكتاب والسنة — تأليف سعيد بن علي بن وهف القحطاني',
    icon: 'shield',
    url: 'https://www.hisnmuslim.com/',
  },
  {
    id: 'fatwa',
    name: 'فتاوى ابن باز رحمه الله',
    description: 'فتاوى الشيخ عبد العزيز بن باز',
    icon: 'feather',
    url: 'https://binbaz.org.sa/',
    github: 'https://github.com/rn0x/binbaz_database',
  },
  {
    id: 'khutbah',
    name: 'الخطب',
    description: 'خطب منبرية من موقع ملتقى الخطباء',
    icon: 'minbar',
    url: 'https://khutabaa.com/',
  },
  {
    id: 'history',
    name: 'الموسوعة التاريخية',
    description: 'أحداث مرتبطة بالإسلام والمسلمين',
    icon: 'scroll',
    url: 'https://dorar.net/history',
    github: 'https://github.com/rn0x/Historical_Encyclopedia',
  },
  {
    id: 'reciters',
    name: 'القرّاء',
    description: 'تلاوات لقرّاء من أشهر القرّاء المعاصرين',
    icon: 'mic',
    url: 'https://www.mp3quran.net/',
  },
  {
    id: 'quiz',
    name: 'الأسئلة الإسلامية',
    description: 'بنك أسئلة إسلامية متنوّعة',
    icon: 'trophy',
    url: 'https://dorar.net/m3lama',
    github: 'https://github.com/rn0x/IslamicQuizAPI',
  },
  {
    id: 'qurancards',
    name: 'البطاقات القرآنية',
    description: 'بطاقات تفاعلية لكل سورة مع صوت و PDF',
    icon: 'bookmark',
    url: 'https://albitaqat.com/',
    github: 'https://github.com/rn0x/albitaqat_quran',
  },
  {
    id: 'asma',
    name: 'أسماء الله الحسنى',
    description: 'شرح أسماء الله الحسنى في ضوء الكتاب والسنة — د. سعيد القحطاني',
    icon: 'star',
    url: 'https://shamela.ws/book/96493',
    github: 'https://github.com/rn0x/Names_Of_Allah_Json',
  },
]