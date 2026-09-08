import React from 'react'
import { AsmaCard } from './AsmaCard.jsx'

export function AsmaGrid({ data, onOpen }) {
  return (
    <div className="asma-grid">
      {data.map((item) => (
        <AsmaCard key={item.id} name={item} onClick={() => onOpen(item.id)} />
      ))}
    </div>
  )
}
