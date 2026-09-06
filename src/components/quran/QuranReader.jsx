import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage.mjs'
import { storage } from '../../services/storage.mjs'
import {
  BASMALA,
  SURAHS,
  arabicDigits,
  hasBasmala,
  parseSurah,
} from '../../services/quran.mjs'
import { Icon } from '../ui/Icon.jsx'
import { VerseContextMenu, LONG_PRESS_DURATION } from './VerseContextMenu.jsx'
import { Toast } from './Toast.jsx'

const READING_KEY = 'quran.reading'
const FONT_SIZE_KEY = 'quran.fontSize'

const FONT_MIN = 18
const FONT_MAX = 40
const FONT_STEP = 2
const DOUBLE_TAP_DELAY = 300

function getScrollRoot() {
  return document.querySelector('.shell__main')
}

export function QuranReader({ surahIndex, initialVerse, onPrev, onNext, onTafseer, onCards }) {
  const surah = useMemo(() => parseSurah(surahIndex), [surahIndex])
  const [fontSize, setFontSize] = useLocalStorage(FONT_SIZE_KEY, 26)
  const [reading, setReading] = useLocalStorage(READING_KEY, null)
  const [current, setCurrent] = useState(initialVerse || 1)
  const [contextMenu, setContextMenu] = useState(null)
  const [toast, setToast] = useState(null)

  const currentRef = useRef(current)
  const verseEls = useRef(new Map())
  const saveTimer = useRef(null)
  const scrollRaf = useRef(null)
  const lastTapRef = useRef(0)
  const doubleTapVerseRef = useRef(null)
  const suppressTrackRef = useRef(false)

  const longPressTimer = useRef(null)
  const longPressStartPos = useRef(null)
  const longPressFired = useRef(false)
  const contextOpenRef = useRef(false)

  const updateCurrent = useCallback(
    (verse) => {
      if (currentRef.current === verse) return
      currentRef.current = verse
      setCurrent(verse)
    },
    []
  )

  const handleVerseTap = useCallback(
    (verseNumber, el) => {
      if (contextOpenRef.current) return

      const now = Date.now()
      const elapsed = now - lastTapRef.current
      lastTapRef.current = now

      if (elapsed < DOUBLE_TAP_DELAY && doubleTapVerseRef.current === verseNumber) {
        doubleTapVerseRef.current = null
        if (onTafseer) onTafseer(verseNumber)
        return
      }

      doubleTapVerseRef.current = verseNumber
      updateCurrent(verseNumber)

      if (el) {
        el.classList.add('quran-ayah--tap-pending')
        setTimeout(() => el.classList.remove('quran-ayah--tap-pending'), DOUBLE_TAP_DELAY + 50)
      }
    },
    [updateCurrent, onTafseer]
  )

  const clearLongPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
    longPressStartPos.current = null
  }, [])

  const openContextMenu = useCallback((verseNumber, x, y) => {
    longPressFired.current = true
    contextOpenRef.current = true
    updateCurrent(verseNumber)
    setContextMenu({
      verse: verseNumber,
      position: {
        x: Math.min(x, window.innerWidth - 180),
        y: Math.min(y, window.innerHeight - 220),
      },
    })
  }, [updateCurrent])

  const closeContextMenu = useCallback(() => {
    contextOpenRef.current = false
    longPressFired.current = false
    setContextMenu(null)
  }, [])

  const handleTouchStart = useCallback((verseNumber, e) => {
    if (contextOpenRef.current) return
    longPressFired.current = false
    const touch = e.touches[0]
    longPressStartPos.current = { x: touch.clientX, y: touch.clientY }

    longPressTimer.current = setTimeout(() => {
      longPressTimer.current = null
      openContextMenu(verseNumber, touch.clientX, touch.clientY)
    }, LONG_PRESS_DURATION)
  }, [openContextMenu])

  const handleTouchMove = useCallback((e) => {
    if (!longPressTimer.current || !longPressStartPos.current) return
    const touch = e.touches[0]
    const dx = touch.clientX - longPressStartPos.current.x
    const dy = touch.clientY - longPressStartPos.current.y
    if (Math.sqrt(dx * dx + dy * dy) > 10) {
      clearLongPress()
    }
  }, [clearLongPress])

  const handleTouchEnd = useCallback(() => {
    clearLongPress()
  }, [clearLongPress])

  const handleContextMenu = useCallback((verseNumber, e) => {
    e.preventDefault()
    if (contextOpenRef.current) return
    openContextMenu(verseNumber, e.clientX, e.clientY)
  }, [openContextMenu])

  useEffect(() => {
    return () => {
      clearLongPress()
      if (contextOpenRef.current) {
        document.body.style.overflow = ''
        document.body.style.touchAction = ''
      }
    }
  }, [clearLongPress])

  const trackCurrent = useCallback(() => {
    if (suppressTrackRef.current) return
    const root = getScrollRoot()
    if (!root || verseEls.current.size === 0) return
    const rootRect = root.getBoundingClientRect()
    const mid = rootRect.top + rootRect.height * 0.45
    let best = null
    let bestDist = Infinity
    for (const [num, el] of verseEls.current) {
      const r = el.getBoundingClientRect()
      if (r.top > mid) break
      const dist = Math.abs(r.top + r.height / 2 - mid)
      if (dist < bestDist) {
        bestDist = dist
        best = num
      }
    }
    if (best !== null && best !== currentRef.current) {
      updateCurrent(best)
    }
  }, [updateCurrent])

  useEffect(() => {
    const root = getScrollRoot()
    if (!root) return
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      scrollRaf.current = requestAnimationFrame(() => {
        ticking = false
        trackCurrent()
      })
    }
    root.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      root.removeEventListener('scroll', onScroll)
      if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current)
    }
  }, [trackCurrent])

  useEffect(() => {
    if (!initialVerse || !verseEls.current.has(initialVerse)) return
    const el = verseEls.current.get(initialVerse)
    currentRef.current = initialVerse
    setCurrent(initialVerse)
    suppressTrackRef.current = true
    requestAnimationFrame(() => {
      el.scrollIntoView({ block: 'center' })
    })
    const release = setTimeout(() => {
      suppressTrackRef.current = false
    }, 500)
    return () => clearTimeout(release)
  }, [initialVerse])

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [surahIndex])

  const changeFontSize = useCallback(
    (delta) =>
      setFontSize((size) =>
        Math.min(FONT_MAX, Math.max(FONT_MIN, size + delta))
      ),
    [setFontSize]
  )

  const saveNow = useCallback(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    setReading((prev) => ({
      ...(prev || {}),
      surah: surahIndex,
      verse: currentRef.current,
      at: Date.now(),
    }))
    setToast({ message: 'تم حفظ الموضع', icon: 'bookmark-fill' })
  }, [surahIndex, setReading])

  const handleSaveBookmark = useCallback((verse) => {
    setReading((prev) => ({
      ...(prev || {}),
      surah: surahIndex,
      verse,
      at: Date.now(),
    }))
    setToast({ message: 'تم حفظ العلامة المرجعية', icon: 'bookmark-fill' })
  }, [surahIndex, setReading])

  const handleCopyVerse = useCallback((verse) => {
    const verseData = surah.verses.find((v) => v.number === verse)
    if (verseData) {
      navigator.clipboard.writeText(verseData.text).then(() => {
        setToast({ message: 'تم نسخ الآية', icon: 'copy' })
      }).catch(() => {})
    }
  }, [surah])

  const handleShareVerse = useCallback((verse) => {
    const verseData = surah.verses.find((v) => v.number === verse)
    if (verseData && navigator.share) {
      navigator.share({ text: verseData.text }).catch(() => {})
    }
  }, [surah])

  const hasSavedHere = reading?.surah === surahIndex && reading?.verse === current

  return (
    <div
      className="quran-reader"
      style={{ '--quran-size': `${fontSize}px` }}
    >
      <div className="quran-reader__topbar">
        <div className="quran-reader__topbar-row">
          <div className="quran-reader__surah">
            <span className="quran-reader__surah-meta">
              {surah.Descent} • {arabicDigits(surah.Number_Verses)} آية
            </span>
          </div>

          <div className="quran-reader__controls">
            {onCards && (
              <button
                className="quran-reader__btn quran-reader__btn--cards"
                aria-label="فتح البطاقات القرآنية"
                onClick={() => onCards(surahIndex + 1)}
              >
                <Icon name="bookmark" size={14} />
                <span>البطاقات</span>
              </button>
            )}
            {onTafseer && (
              <button
                className="quran-reader__btn quran-reader__btn--tafseer"
                aria-label="فتح تفسير هذه الآية"
                onClick={() => onTafseer(current)}
              >
                <Icon name="book-open" size={14} />
                <span>التفسير</span>
              </button>
            )}
            <button
              className="quran-reader__btn"
              aria-label="تصغير الخط"
              disabled={fontSize <= FONT_MIN}
              onClick={() => changeFontSize(-FONT_STEP)}
            >
              <Icon name="minus" size={18} />
            </button>
            <span className="quran-reader__size">{arabicDigits(fontSize)}</span>
            <button
              className="quran-reader__btn"
              aria-label="تكبير الخط"
              disabled={fontSize >= FONT_MAX}
              onClick={() => changeFontSize(FONT_STEP)}
            >
              <Icon name="plus" size={18} />
            </button>
            <button
              className={`quran-reader__btn${hasSavedHere ? ' quran-reader__btn--active' : ''}`}
              aria-label="حفظ الموضع"
              onClick={saveNow}
            >
              <Icon name={hasSavedHere ? 'bookmark-fill' : 'bookmark'} size={18} />
            </button>
          </div>
        </div>

        {(onPrev || onNext) && (
          <div className="quran-reader__nav">
            <button
              className="quran-reader__nav-btn"
              disabled={!onPrev}
              onClick={onPrev}
            >
              <Icon name="arrow-right" size={16} />
              <span className="quran-reader__nav-name">
                {onPrev ? SURAHS[surahIndex - 1].Name : ''}
              </span>
            </button>
            <button
              className="quran-reader__nav-btn"
              disabled={!onNext}
              onClick={onNext}
            >
              <span className="quran-reader__nav-name">
                {onNext ? SURAHS[surahIndex + 1].Name : ''}
              </span>
              <Icon name="arrow-left" size={16} />
            </button>
          </div>
        )}
      </div>

      {hasBasmala(surahIndex) && (
        <p className="quran-basmala">{BASMALA}</p>
      )}

      <p className="quran-mushaf">
        {surah.verses.map((verse) => (
          <span
            key={verse.number}
            ref={(el) => {
              if (el) verseEls.current.set(verse.number, el)
              else verseEls.current.delete(verse.number)
            }}
            className={`quran-ayah${current === verse.number ? ' quran-ayah--current' : ''}`}
            data-verse={verse.number}
            onClick={(e) => {
              if (longPressFired.current) {
                e.preventDefault()
                e.stopPropagation()
                return
              }
              handleVerseTap(verse.number, e.currentTarget)
            }}
            onTouchStart={(e) => handleTouchStart(verse.number, e)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onContextMenu={(e) => handleContextMenu(verse.number, e)}
          >
            {verse.text}
            <span className="quran-ayah__marker">
              <span className="quran-ayah__marker-ring">۝</span>
              <span className="quran-ayah__marker-num">
                {arabicDigits(verse.number)}
              </span>
            </span>
          </span>
        ))}
      </p>

      {contextMenu && (
        <VerseContextMenu
          verse={contextMenu.verse}
          surahIndex={surahIndex}
          position={contextMenu.position}
          onClose={closeContextMenu}
          onSaveBookmark={handleSaveBookmark}
          onOpenTafseer={(verse) => onTafseer?.(verse)}
          onCopy={handleCopyVerse}
          onShare={handleShareVerse}
          isBookmarked={reading?.surah === surahIndex && reading?.verse === contextMenu.verse}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          icon={toast.icon}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}