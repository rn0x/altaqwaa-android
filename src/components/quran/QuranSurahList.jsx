import React, { useMemo, useState } from 'react'
import { SURAHS, arabicDigits } from '../../services/quran.mjs'
import { Icon } from '../ui/Icon.jsx'

export function QuranSurahList({ reading, onOpen }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim()
    if (!q) return SURAHS
    const numeric = parseInt(q, 10)
    return SURAHS.filter(
      (s) =>
        s.Name.includes(q) ||
        s.Name_Translation?.includes(q) ||
        s.English_Name?.toLowerCase().includes(q.toLowerCase()) ||
        s.Number === numeric
    )
  }, [query])

  const continueSurah = reading ? SURAHS[reading.surah] : null

  return (
    <section className="screen quran">
      <label className="quran-search">
        <Icon name="search" size={18} />
        <input
          className="quran-search__input"
          type="search"
          enterKeyHint="search"
          placeholder="ابحث عن سورة بالاسم أو الرقم"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      {continueSurah && (
        <button
          className="quran-continue"
          onClick={() => onOpen(reading.surah, reading.verse)}
        >
          <div className="quran-continue__icon">
            <Icon name="bookmark-fill" size={20} />
          </div>
          <div className="quran-continue__body">
            <span className="quran-continue__label">متابعة القراءة</span>
            <strong>
              {continueSurah.Name}
              {reading.verse ? ` — الآية ${arabicDigits(reading.verse)}` : ''}
            </strong>
          </div>
          <Icon name="arrow-right" size={22} className="quran-continue__arrow" />
        </button>
      )}

      <ul className="quran-list">
        {filtered.map((surah) => (
          <li key={surah.Number}>
            <button className="quran-item" onClick={() => onOpen(surah.Number - 1)}>
              <span className="quran-item__number">{arabicDigits(surah.Number)}</span>
              <span className="quran-item__body">
                <span className="quran-item__name">{surah.Name}</span>
                <span className="quran-item__meta">
                  {surah.Descent} • {arabicDigits(surah.Number_Verses)} آية
                </span>
              </span>
              <Icon name="arrow-right" size={20} className="quran-item__arrow" />
            </button>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="quran-empty">لا توجد نتائج لـ «{query}»</p>
      )}
    </section>
  )
}