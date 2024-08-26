// src/pages/HomePage.js
import React from 'react';
import { useTranslationContext } from '../contexts/TranslationContext';
import styles from '../styles/HomePage.module.css';

export default function HomePage() {
  const { translate, language } = useTranslationContext();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>{translate('homePageTitle')}</div>
      </div>
      <p>rayan almalki</p>
      <h2>kkkkkkkkkkkk</h2>
    </>
  );
}
