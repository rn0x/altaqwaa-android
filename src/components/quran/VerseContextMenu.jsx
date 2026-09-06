import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '../ui/Icon.jsx'
import { arabicDigits } from '../../utils/arabic.mjs'

const LONG_PRESS_DURATION = 500

function VerseContextMenu({ verse, surahIndex, position, onClose, onSaveBookmark, onOpenTafseer, onCopy, onShare, isBookmarked }) {
  const menuRef = useRef(null)
  const openedAt = useRef(Date.now())

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    openedAt.current = Date.now()

    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [])

  useEffect(() => {
    const handlePointerDown = (e) => {
      const elapsed = Date.now() - openedAt.current
      if (elapsed < 400) return
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('pointerdown', handlePointerDown, true)
    return () => document.removeEventListener('pointerdown', handlePointerDown, true)
  }, [onClose])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const menuItems = [
    {
      id: 'bookmark',
      icon: isBookmarked ? 'bookmark-fill' : 'bookmark',
      label: isBookmarked ? 'تم الحفظ' : 'حفظ علامة مرجعية',
      onClick: () => {
        onSaveBookmark(verse)
        onClose()
      },
      active: isBookmarked,
    },
    {
      id: 'tafseer',
      icon: 'book-open',
      label: 'التفسير',
      onClick: () => {
        onOpenTafseer(verse)
        onClose()
      },
    },
    {
      id: 'copy',
      icon: 'copy',
      label: 'نسخ الآية',
      onClick: () => {
        onCopy(verse)
        onClose()
      },
    },
    {
      id: 'share',
      icon: 'share',
      label: 'مشاركة',
      onClick: () => {
        onShare(verse)
        onClose()
      },
    },
  ]

  return createPortal(
    <div className="quran-verse-menu" role="menu" aria-modal="true" aria-label="خيارات الآية">
      <div className="quran-verse-menu__backdrop" />
      <div
        ref={menuRef}
        className="quran-verse-menu__panel"
        style={{
          top: Math.min(position.y, window.innerHeight - 220),
          left: Math.min(position.x, window.innerWidth - 180),
        }}
      >
        <div className="quran-verse-menu__header">
          <span className="quran-verse-menu__verse-num">الآية {arabicDigits(verse)}</span>
          <button className="quran-verse-menu__close" onClick={onClose} aria-label="إغلاق">
            <Icon name="close" size={14} />
          </button>
        </div>
        <ul className="quran-verse-menu__list">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`quran-verse-menu__item${item.active ? ' quran-verse-menu__item--active' : ''}`}
                onClick={item.onClick}
                role="menuitem"
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  )
}

export { VerseContextMenu, LONG_PRESS_DURATION }
