import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from '../hooks/useNavigation';
import useTranslation from '../hooks/useTranslation.jsx';
import useScreen from '../hooks/useScreen';
import styles from '../styles/NavigationBar.module.css';
import { FaQuran, FaClock, FaQuestionCircle, FaEllipsisH, FaUsers, FaPrayingHands } from 'react-icons/fa';
import { ImBooks } from "react-icons/im";

export default function NavigationBar() {
    const { direction } = useTranslation();
    const { activePage } = useNavigation();
    const { isDesktop } = useScreen();

    useEffect(() => {

        const NavigationBarElement = document.getElementById('NavigationBarElement');
        if (NavigationBarElement) {
            if (isDesktop) {
                if (direction === "rtl") {
                    NavigationBarElement.style.right = "0"
                    NavigationBarElement.style.left = "auto"
                } else {
                    NavigationBarElement.style.right = "auto"
                    NavigationBarElement.style.left = "0"
                }
            }
        }
    }, [direction, isDesktop]);

    // Convert /index.html to /
    const normalizedActivePage = activePage === '/index.html' ? '/' : activePage;

    const desktopIcons = [
        { label: "القرآن الكريم", id: 'quran', icon: <FaQuran title="القرآن الكريم" aria-label="الذهاب إلى القرآن الكريم" />, path: '/quran' },
        { label: "المكتبة", id: 'library', icon: <ImBooks title="المكتبة" aria-label="الذهاب إلى المكتبة" />, path: '/library' },
        { label: "أوقات الصلاة", id: 'prayer-times', icon: <FaClock title="أوقات الصلاة" aria-label="الذهاب إلى أوقات الصلاة" />, path: '/prayer-times' },
        { label: "الرئيسية", id: 'home', icon: <FaEllipsisH title="الرئيسية" aria-label="الذهاب إلى الصفحة الرئيسية" />, path: '/' },
        { label: "الفتاوى", id: 'fatwas', icon: <FaQuestionCircle title="الفتاوى" aria-label="الذهاب إلى الفتاوى" />, path: '/fatwas' },
        { label: "الأذكار", id: 'azkar', icon: <FaPrayingHands title="الأذكار" aria-label="الذهاب إلى الأذكار" />, path: '/azkar' },
        { label: 'المجتمع', id: 'community', icon: <FaUsers title="المجتمع" aria-label="الذهاب إلى المجتمع" />, path: '/community' }
    ];

    const mobileIcons = [
        { label: "القرآن الكريم", id: 'quran', icon: <FaQuran title="القرآن الكريم" aria-label="الذهاب إلى القرآن الكريم" />, path: '/quran' },
        { label: "المكتبة", id: 'library', icon: <ImBooks title="المكتبة" aria-label="الذهاب إلى المكتبة" />, path: '/library' },
        { label: "الرئيسية", id: 'home', icon: <FaEllipsisH title="الرئيسية" aria-label="الذهاب إلى الصفحة الرئيسية" />, path: '/' },
        { label: "الأذكار", id: 'azkar', icon: <FaPrayingHands title="الأذكار" aria-label="الذهاب إلى الأذكار" />, path: '/azkar' },
        { label: "المجتمع", id: 'community', icon: <FaUsers title="المجتمع" aria-label="الذهاب إلى المجتمع" />, path: '/community' }
    ];


    return (
        <nav className={`${styles.navbar} no-cop`} aria-label="Primary Navigation" id='NavigationBarElement'>
            <ul>
                {(isDesktop ? desktopIcons : mobileIcons).map((item, index) => (
                    <li
                        key={item.id}
                        id={item.id}
                        className={`${item.path === normalizedActivePage ? styles.active : ''} ${index === Math.floor((isDesktop ? desktopIcons.length : mobileIcons.length) / 2) ? styles.mainButton : ''}`}
                    >
                        <Link to={item.path} title={item.icon.props.title} aria-label={item.icon.props['aria-label']} className={`${item.path === normalizedActivePage ? styles.active : ''}`}>
                            {item.icon}
                            <span className={styles.iconLabel}>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}