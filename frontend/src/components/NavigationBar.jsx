import React, { useEffect } from 'react';
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
        { label: translate('quran'), id: 'quran', icon: <FaQuran title={translate('quran')} aria-label={translate('quran')} />, path: '/quran' },
        { label: translate('library'), id: 'library', icon: <ImBooks title={translate('library')} aria-label={translate('library')} />, path: '/library' },
        { label: translate('prayerTimes'), id: 'prayer-times', icon: <FaClock title={translate('prayerTimes')} aria-label={translate('prayerTimes')} />, path: '/prayer-times' },
        { label: translate('homePageTitle'), id: 'home', icon: <FaEllipsisH title={translate('homePageTitle')} aria-label={translate('homePageTitle')} />, path: '/' },
        { label: translate('fatwas'), id: 'fatwas', icon: <FaQuestionCircle title={translate('fatwas')} aria-label={translate('fatwas')} />, path: '/fatwas' },
        { label: translate('azkar'), id: 'azkar', icon: <FaPrayingHands title={translate('azkar')} aria-label={translate('azkar')} />, path: '/azkar' },
        { label: translate('blog'), id: 'blog', icon: <BsFillPostcardFill title={translate('blog')} aria-label={translate('blog')} />, path: '/blog' }
    ];

    const mobileIcons = [
        { label: translate('quran'), id: 'quran', icon: <FaQuran title={translate('quran')} aria-label={translate('quran')} />, path: '/quran' },
        { label: translate('library'), id: 'library', icon: <ImBooks title={translate('library')} aria-label={translate('library')} />, path: '/library' },
        { label: translate('homePageTitle'), id: 'home', icon: <FaEllipsisH title={translate('homePageTitle')} aria-label={translate('homePageTitle')} />, path: '/' },
        { label: translate('azkar'), id: 'azkar', icon: <FaPrayingHands title={translate('azkar')} aria-label={translate('azkar')} />, path: '/azkar' },
        { label: translate('blog'), id: 'blog', icon: <BsFillPostcardFill title={translate('blog')} aria-label={translate('blog')} />, path: '/blog' }
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