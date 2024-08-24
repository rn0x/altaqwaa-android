import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from '../hooks/useNavigation';
import styles from '../styles/NavigationBar.module.css';
import { FaQuran, FaBroadcastTower, FaBookOpen, FaMicrophone, FaEllipsisH, FaUsers, FaPrayingHands } from 'react-icons/fa';

import useScreen from '../hooks/useScreen';

export default function NavigationBar() {
    const { activePage } = useNavigation();
    const isDesktop = useScreen();

    // Convert /index.html to /
    const normalizedActivePage = activePage === '/index.html' ? '/' : activePage;

    const desktopIcons = [
        { label: "القرآن الكريم", id: 'quran', icon: <FaQuran title="القرآن الكريم" aria-label="الذهاب إلى القرآن الكريم" />, path: '/quran' },
        { label: "الإذاعات", id: 'radios', icon: <FaBroadcastTower title="الإذاعات" aria-label="الذهاب إلى الإذاعات" />, path: '/radios' },
        { label: "التفسير", id: 'tafseer', icon: <FaBookOpen title="التفسير" aria-label="الذهاب إلى التفسير" />, path: '/tafseer' },
        { label: "الرئيسية", id: 'home', icon: <FaEllipsisH title="الرئيسية" aria-label="الذهاب إلى الصفحة الرئيسية" />, path: '/' },
        { label: "الأحاديث", id: 'hadith', icon: <FaMicrophone title="الأحاديث" aria-label="الذهاب إلى الأحاديث" />, path: '/hadith' },
        { label: "الأذكار", id: 'azkar', icon: <FaPrayingHands title="الأذكار" aria-label="الذهاب إلى الأذكار" />, path: '/azkar' },
        { label: 'المجتمع', id: 'community', icon: <FaUsers title="المجتمع" aria-label="الذهاب إلى المجتمع" />, path: '/community' }
    ];

    const mobileIcons = [
        { label: "القرآن الكريم", id: 'quran', icon: <FaQuran title="القرآن الكريم" aria-label="الذهاب إلى القرآن الكريم" />, path: '/quran' },
        { label: "الإذاعات", id: 'radios', icon: <FaBroadcastTower title="الإذاعات" aria-label="الذهاب إلى الإذاعات" />, path: '/radios' },
        { label: "الرئيسية", id: 'home', icon: <FaEllipsisH title="الرئيسية" aria-label="الذهاب إلى الصفحة الرئيسية" />, path: '/' },
        { label: "الأذكار", id: 'azkar', icon: <FaPrayingHands title="الأذكار" aria-label="الذهاب إلى الأذكار" />, path: '/azkar' },
        { label: "المجتمع", id: 'community', icon: <FaUsers title="المجتمع" aria-label="الذهاب إلى المجتمع" />, path: '/community' }
    ];


    return (
        <nav className={`${styles.navbar} no-cop`} aria-label="Primary Navigation">
            <ul>
                {(isDesktop ? desktopIcons : mobileIcons).map((item, index) => (
                    <li
                        key={item.id}
                        id={item.id}
                        className={`${item.path === normalizedActivePage ? styles.active : ''} ${index === Math.floor((isDesktop ? desktopIcons.length : mobileIcons.length) / 2) ? styles.mainButton : ''}`}
                    >
                        <Link to={item.path} title={item.icon.props.title} aria-label={item.icon.props['aria-label']}>
                            {item.icon}
                            <span className={styles.iconLabel}>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}