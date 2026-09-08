import React from 'react'

export function AsmaCard({ name, onClick }) {
  return (
    <button className="asma-card" onClick={onClick} type="button">
      <span className="asma-card__name">{name.name_arabic}</span>
      <span className="asma-card__meaning">{name.meaning}</span>
    </button>
  )
}
