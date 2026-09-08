import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAsmaById } from '../services/asmaAllah.mjs'
import { copyText } from '../services/device.mjs'
import { Icon } from '../components/ui/Icon.jsx'

export default function AsmaDetailScreen() {
  const { id } = useParams()
  const name = getAsmaById(Number(id))
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!name) return null

  const handleCopy = async () => {
    const text = `${name.name_arabic}\n\nالمعنى: ${name.meaning}\n\n${name.explanation}`
    const ok = await copyText(text)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section className="screen asma-detail">
      <div className="asma-detail__header">
        <h1 className="asma-detail__name">{name.name_arabic}</h1>
        <p className="asma-detail__name-en">{name.name}</p>
      </div>

      <div className="asma-detail__body">
        <div className="asma-detail__section">
          <h3 className="asma-detail__label">المعنى</h3>
          <p className="asma-detail__meaning">{name.meaning}</p>
        </div>

        <div className="asma-detail__section">
          <button
            className="asma-detail__expand"
            onClick={() => setExpanded(!expanded)}
            type="button"
          >
            <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={16} />
            الشرح التفصيلي
          </button>
          {expanded && (
            <p className="asma-detail__explanation">{name.explanation}</p>
          )}
        </div>

        {name.quran_evidence && name.quran_evidence.length > 0 && (
          <div className="asma-detail__section">
            <h3 className="asma-detail__label">
              <Icon name="book" size={16} />
              الأدلة القرآنية
            </h3>
            {name.quran_evidence.map((ev, i) => (
              <div key={i} className="asma-detail__evidence">
                <p className="asma-detail__evidence-text">{ev.text}</p>
                <p className="asma-detail__evidence-source">{ev.source}</p>
              </div>
            ))}
          </div>
        )}

        {name.hadith_evidence && name.hadith_evidence.length > 0 && (
          <div className="asma-detail__section">
            <h3 className="asma-detail__label">
              <Icon name="scroll" size={16} />
              الأدلة النبوية
            </h3>
            {name.hadith_evidence.map((ev, i) => (
              <div key={i} className="asma-detail__evidence">
                <p className="asma-detail__evidence-text">{ev.text}</p>
                <p className="asma-detail__evidence-source">{ev.source}</p>
              </div>
            ))}
          </div>
        )}

        {name.related_names && name.related_names.length > 0 && (
          <div className="asma-detail__section">
            <h3 className="asma-detail__label">الأسماء المرتبطة</h3>
            <div className="asma-detail__related">
              {name.related_names.map((rel, i) => (
                <span key={i} className="asma-detail__related-chip">{rel}</span>
              ))}
            </div>
          </div>
        )}

        {name.book_reference && (
          <div className="asma-detail__section">
            <a
              className="asma-detail__source-link"
              href={name.book_reference.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="external" size={14} />
              مرجع الكتاب — ص{name.book_reference.page}
            </a>
          </div>
        )}

        <button className="asma-detail__copy" onClick={handleCopy} type="button">
          <Icon name={copied ? 'check' : 'copy'} size={16} />
          {copied ? 'تم النسخ' : 'نسخ'}
        </button>
      </div>
    </section>
  )
}
