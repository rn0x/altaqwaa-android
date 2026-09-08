import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ASMA_DATA } from '../services/asmaAllah.mjs'
import { AsmaGrid } from '../components/asma/AsmaGrid.jsx'
import '../styles/asma.css'

export default function AsmaScreen() {
  const navigate = useNavigate()

  return (
    <section className="screen asma">
      <div className="asma-hero">
        <p className="asma-hero__bismillah">بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ</p>
        <h2 className="asma-hero__title">أسماء الله الحسنى</h2>
        <div className="asma-hero__book">
          <div className="asma-hero__book-row">
            <span className="asma-hero__book-label">الكتاب</span>
            <span className="asma-hero__book-value">شرح أسماء الله الحسنى في ضوء الكتاب والسنة</span>
          </div>
          <div className="asma-hero__book-row">
            <span className="asma-hero__book-label">المؤلف</span>
            <span className="asma-hero__book-value">د. سعيد بن علي بن وهف القحطاني</span>
          </div>
          <div className="asma-hero__book-row">
            <span className="asma-hero__book-label">القسم</span>
            <span className="asma-hero__book-value">العقيدة</span>
          </div>
        </div>
      </div>
      <AsmaGrid data={ASMA_DATA} onOpen={(id) => navigate(`/asma/${id}`)} />
    </section>
  )
}
