// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslationContext } from '../contexts/TranslationContext';
import { FaQuran, FaClock, FaPrayingHands, FaQuestionCircle, FaCalendarAlt, FaBroadcastTower, FaCog, FaInfoCircle, FaBook, FaQuestion, FaShieldAlt, FaListAlt, FaMicrophone, FaMosque } from 'react-icons/fa';
import { BsFillPostcardFill } from "react-icons/bs";
import { ImBooks } from "react-icons/im";
import styles from '../styles/HomePage.module.css';

export default function HomePage() {
  const { translate, language } = useTranslationContext();

  const navLinks = [
    { label: translate('quran'), icon: <FaQuran />, path: '/quran' },
    { label: translate('library'), icon: <ImBooks />, path: '/library' },
    { label: translate('prayerTimes'), icon: <FaClock />, path: '/prayer-times' },
    { label: translate('azkar'), icon: <FaPrayingHands />, path: '/azkar' },
    { label: translate('fatwas'), icon: <FaQuestionCircle />, path: '/fatwas' },
    { label: translate('blog'), icon: <BsFillPostcardFill />, path: '/blog' },
    { label: translate('hijriCalendar'), icon: <FaCalendarAlt />, path: '/hijri-calendar' }, // التقويم الهجري
    { label: translate('radioStations'), icon: <FaBroadcastTower />, path: '/radio-stations' }, // الإذاعات
    { label: translate('tafsir'), icon: <FaBook />, path: '/tafsir' }, // التفسير
    { label: translate('questions'), icon: <FaQuestion />, path: '/questions' }, // أسئلة
    { label: translate('hisnMuslim'), icon: <FaShieldAlt />, path: '/hisn-muslim' }, // حصن المسلم
    { label: translate('allahNames'), icon: <FaListAlt />, path: '/allah-names' }, // أسماء الله الحسنى
    { label: translate('quranReciters'), icon: <FaMicrophone />, path: '/quran-reciters' }, // قائمة القراء
    { label: translate('khutbah'), icon: <FaMosque />, path: '/khutbah' }, // خطب
    { label: translate('settings'), icon: <FaCog />, path: '/settings' }, // الإعدادات
    { label: translate('aboutApp'), icon: <FaInfoCircle />, path: '/about-app' }, // عن التطبيق
  ];


  return (
    <div className={styles.homePage}>
      <div className={styles.quickLinks}>
        {navLinks.map((link, index) => (
          <Link
            to={link.path}
            className={styles.linkItem}
            key={index}
            title={link.label}
            aria-label={link.label}
            onMouseDown={(e) => e.preventDefault()}
            draggable="false"
          >
            <div className={styles.icon}>{link.icon}</div>
            <span title={link.label} aria-label={link.label}>{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
