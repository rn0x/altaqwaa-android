import React from 'react';
import styles from '../styles/NavigationBar.module.css'; // استيراد الأنماط
import { FaQuran, FaBroadcastTower, FaBookOpen, FaMicrophone, FaDharmachakra, FaEllipsisH, FaUsers } from 'react-icons/fa';
import useScreen from '../hooks/useScreen'; 

export default function NavigationBar() {
    // الحصول على حالة حجم الشاشة من الـ Context
    const isDesktop = useScreen();

    // قائمة الأيقونات التي سيتم عرضها بناءً على حجم الشاشة
    const desktopIcons = [
        { id: 'quran', icon: <FaQuran title="القرآن الكريم" aria-label="الذهاب إلى القرآن الكريم" />, className: styles.quranIcon },
        { id: 'radios', icon: <FaBroadcastTower title="الإذاعات" aria-label="الذهاب إلى الإذاعات" />, className: styles.radiosIcon },
        { id: 'tafseer', icon: <FaBookOpen title="التفسير" aria-label="الذهاب إلى التفسير" />, className: styles.tafseerIcon },
        { id: 'more', icon: <FaEllipsisH title="المزيد" aria-label="الذهاب إلى صفحة المزيد" />, className: styles.moreIcon }, // أيقونة المزيد
        { id: 'hadith', icon: <FaMicrophone title="الأحاديث" aria-label="الذهاب إلى الأحاديث" />, className: styles.hadithIcon },
        { id: 'azkar', icon: <FaDharmachakra title="الأذكار" aria-label="الذهاب إلى الأذكار" />, className: styles.azkarIcon },
        { id: 'community', icon: <FaUsers title="المنشورات" aria-label="الذهاب إلى المنشورات" />, className: styles.communityIcon }
    ];

    const mobileIcons = [
        { id: 'quran', icon: <FaQuran title="القرآن الكريم" aria-label="الذهاب إلى القرآن الكريم" />, className: styles.quranIcon },
        { id: 'radios', icon: <FaBroadcastTower title="الإذاعات" aria-label="الذهاب إلى الإذاعات" />, className: styles.radiosIcon },
        { id: 'more', icon: <FaEllipsisH title="المزيد" aria-label="الذهاب إلى صفحة المزيد" />, className: styles.moreIcon }, // أيقونة المزيد
        { id: 'azkar', icon: <FaDharmachakra title="الأذكار" aria-label="الذهاب إلى الأذكار" />, className: styles.azkarIcon },
        { id: 'community', icon: <FaUsers title="المنشورات" aria-label="الذهاب إلى المنشورات" />, className: styles.communityIcon }
    ];

    // عرض شريط التنقل بناءً على حجم الشاشة
    return (
        <nav className={styles.navbar} aria-label="Primary Navigation">
            <ul>
                {(isDesktop ? desktopIcons : mobileIcons).map((item, index) => (
                    <li 
                        key={item.id} 
                        id={item.id} 
                        className={`${item.className} ${index === Math.floor((isDesktop ? desktopIcons.length : mobileIcons.length) / 2) ? styles.mainButton : ''}`}
                    >
                        <a href={`#${item.id}`} title={item.icon.props.title} aria-label={item.icon.props['aria-label']}>
                            {item.icon}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}