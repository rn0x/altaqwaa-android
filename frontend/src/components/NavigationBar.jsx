import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from '../hooks/useNavigation';
import useTranslation from '../hooks/useTranslation.jsx';
import useScreen from '../hooks/useScreen';
import styles from '../styles/NavigationBar.module.css';
import { FaQuran, FaClock, FaQuestionCircle, FaEllipsisH, FaPrayingHands } from 'react-icons/fa';
import { BsFillPostcardFill } from "react-icons/bs";
import { ImBooks } from "react-icons/im";
import { useTranslationContext } from '../contexts/TranslationContext';

export default function NavigationBar() {
    const { direction } = useTranslation();
    const { activePage } = useNavigation();
    const { isDesktop } = useScreen();
    const { translate } = useTranslationContext();

    useEffect(() => {
        const NavigationBarElement = document.getElementById('NavigationBarElement');
        if (NavigationBarElement) {
            if (isDesktop) {
                if (direction === "rtl") {
                    NavigationBarElement.style.right = "0";
                    NavigationBarElement.style.left = "auto";
                } else {
                    NavigationBarElement.style.right = "auto";
                    NavigationBarElement.style.left = "0";
                }
            }
        }
    }, [direction, isDesktop]);

    // مسارات القائمة
    const navItems = useMemo(() => ({
        desktop: [
            { label: translate('quran'), id: 'quran', icon: <FaQuran />, path: '/quran' },
            { label: translate('library'), id: 'library', icon: <ImBooks />, path: '/library' },
            { label: translate('prayerTimes'), id: 'prayer-times', icon: <FaClock />, path: '/prayer-times' },
            { label: translate('homePageTitle'), id: 'home', icon: <FaEllipsisH />, path: '/' },
            { label: translate('fatwas'), id: 'fatwas', icon: <FaQuestionCircle />, path: '/fatwas' },
            { label: translate('azkar'), id: 'azkar', icon: <FaPrayingHands />, path: '/azkar' },
            { label: translate('blog'), id: 'blog', icon: <BsFillPostcardFill />, path: '/blog' }
        ],
        mobile: [
            { label: translate('quran'), id: 'quran', icon: <FaQuran />, path: '/quran' },
            { label: translate('library'), id: 'library', icon: <ImBooks />, path: '/library' },
            { label: translate('homePageTitle'), id: 'home', icon: <FaEllipsisH />, path: '/' },
            { label: translate('azkar'), id: 'azkar', icon: <FaPrayingHands />, path: '/azkar' },
            { label: translate('blog'), id: 'blog', icon: <BsFillPostcardFill />, path: '/blog' }
        ]
    }), [translate]);

    // دالة للتحقق من المسار النشط
    const getActiveClass = (path) => {
        // إذا كان المسار الحالي مطابق للمسار المحدد
        if (activePage === path) {
            return styles.active;
        }

        // إذا لم يكن المسار الحالي موجودًا في القائمة، اجعل الصفحة الرئيسية نشطة
        const allPaths = navItems.desktop.map(item => item.path);
        if (!allPaths.includes(activePage)) {
            return path === '/' ? styles.active : '';
        }

        return '';
    };

    const icons = isDesktop ? navItems.desktop : navItems.mobile;

    return (
        <nav className={`${styles.navbar} no-cop`} aria-label="Primary Navigation" id="NavigationBarElement">
            <ul>
                {icons.map((item, index) => (
                    <li
                        key={item.id}
                        id={item.id}
                        className={`${getActiveClass(item.path)} ${index === Math.floor(icons.length / 2) ? styles.mainButton : ''}`}
                    >
                        <Link
                            to={item.path}
                            title={item.label}
                            aria-label={item.label}
                            className={getActiveClass(item.path)}
                            onMouseDown={(e) => e.preventDefault()}
                            draggable="false"
                        >
                            {item.icon}
                            <span className={styles.iconLabel}>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}