import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '../ui/Icon.jsx'

function Toast({ message, icon, duration = 1500, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 200)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return createPortal(
    <div className={`quran-toast ${visible ? 'quran-toast--show' : ''}`}>
      <Icon name={icon} size={16} />
      <span>{message}</span>
    </div>,
    document.body
  )
}

export { Toast }
