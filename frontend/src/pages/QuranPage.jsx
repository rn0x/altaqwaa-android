import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import useTheme from '../hooks/useTheme';
import styles from '../styles/QuranPage.module.css';
import metadataQuran from '../assets/json/metadataQuran.json';
import pagesQuran from '../assets/json/pagesQuran.json';

export default function QuranPage() {
    const pages = pagesQuran;
    const { theme } = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState(0);
    const [endX, setEndX] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [imageScale, setImageScale] = useState(1); // حالة لتكبير الصورة
    const [showNavigation, setShowNavigation] = useState(false); // حالة لإظهار أزرار التنقل
    let hideTimeout; // مؤقت لإخفاء الأزرار
    const [isSwiping, setIsSwiping] = useState(false); // حالة لتحديد إذا كان يتم سحب الصورة

    useEffect(() => {
        const savedPage = localStorage.getItem('lastReadPage');

        if (savedPage) {
            setCurrentIndex(Number(savedPage));
        }

        return () => {
            // تنظيف المؤقت عند تفريغ المكون
            clearTimeout(hideTimeout);
        };
    }, []);

    const handlePrev = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setIsLoading(true);
            setCurrentIndex(newIndex);
            localStorage.setItem('lastReadPage', newIndex);
        }
    };

    const handleNext = () => {
        if (currentIndex < pages.length - 1) {
            const newIndex = currentIndex + 1;
            setIsLoading(true);
            setCurrentIndex(newIndex);
            localStorage.setItem('lastReadPage', newIndex);
        }
    };

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        setStartX(touch.clientX);
        setIsSwiping(false); // إعادة تعيين حالة السحب عند بدء اللمس
    };

    const handleTouchMove = (e) => {
        const touch = e.touches[0];
        setEndX(touch.clientX);
        setIsSwiping(true); // تعيين حالة السحب عند الحركة
    };

    const handleTouchEnd = () => {
        const threshold = 50;
        const distance = startX - endX;

        if (isSwiping) { // تحقق مما إذا كان هناك سحب
            if (distance < -threshold) {
                handleNext();
            } else if (distance > threshold) {
                handlePrev();
            }
        }
    };

    const handleSurahChange = (e) => {
        const selectedSurahNumber = Number(e.target.value);
        const selectedPageIndex = pages.findIndex(page =>
            page.start.surah_number <= selectedSurahNumber &&
            page.end.surah_number >= selectedSurahNumber
        );

        if (selectedPageIndex !== -1) {
            setCurrentIndex(selectedPageIndex);
            setIsLoading(true);
            localStorage.setItem('lastReadPage', selectedPageIndex);
            window.scrollTo(0, 0);
        }
    };

    const Skeleton = () => (
        <div className={styles.skeleton}>
            <div className={styles.skeletonPageNumber}></div>
            <div className={styles.skeletonImage}></div>
        </div>
    );

    const renderPage = (page) => {
        return (
            <>
                {isLoading && <Skeleton />}
                <div className={styles.pageNumber}>{`الصفحة ${page.page}`}</div>
                <div className={styles.quranPage} key={page.page}>
                    <img
                        src={page.image.url}
                        aria-label={`Quran-Page-${page.page}`}
                        alt={`القرآن الكريم صفحة ${page.page}`}
                        style={{ display: isLoading ? 'none' : 'block', transform: `scale(${imageScale})` }} // تطبيق مقياس الصورة
                        className={`${styles.quranImage} ${theme === 'dark' ? styles.invert : ''}`}
                        onLoad={() => setIsLoading(false)}
                        onError={() => {
                            setIsLoading(true);
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                        draggable="false"
                    />
                </div>
            </>
        );
    };

    const handleZoomIn = () => {
        setImageScale(prevScale => prevScale + 0.1);
    };

    const handleZoomOut = () => {
        setImageScale(prevScale => Math.max(prevScale - 0.1, 0.1));
    };

    // دالة لإظهار الأزرار
    const showButtons = () => {
        setShowNavigation(true);
        clearTimeout(hideTimeout); // إلغاء المؤقت القديم
        hideTimeout = setTimeout(() => {
            setShowNavigation(false); // إخفاء الأزرار بعد 5 ثواني
        }, 5000);
    };

    // دالة لإخفاء الأزرار
    const hideButtons = () => {
        setShowNavigation(false);
    };

    return (
        <div
            className={styles.container}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={showButtons} // إظهار الأزرار عند المرور بالفأرة
            onMouseLeave={hideButtons} // إخفاء الأزرار عند مغادرة الفأرة
            onMouseMove={showButtons} // إظهار الأزرار عند تحريك الماوس
            onFocus={showButtons} // إظهار الأزرار عند التركيز
            onBlur={hideButtons} // إخفاء الأزرار عند فقدان التركيز
            tabIndex={0} // السماح للعنصر بأن يكون قابلًا للتركيز
        >
            {renderPage(pages[currentIndex])}
            {showNavigation && ( // إظهار أزرار التنقل
                <div className={styles.navigation}>
                    <button onClick={handlePrev} className={styles.navButton} disabled={currentIndex === 0}>
                        <FaArrowRight />
                    </button>
                    <button onClick={handleNext} className={styles.navButton} disabled={currentIndex === pages.length - 1}>
                        <FaArrowLeft />
                    </button>
                </div>
            )}

            <div className={styles.surahSelector}>
                <div className={styles.selectContainer}>
                    <select
                        id="surahSelect"
                        onChange={handleSurahChange}
                        className={styles.select}
                    >
                        <option value="">اختر سورة</option>
                        {metadataQuran.map((surah, index) => (
                            <option key={index} value={surah.number}>
                                {surah.name.ar}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles.zoomControls}>
                <button onClick={handleZoomIn} className={styles.zoomButton}>
                    <FaSearchPlus />
                </button>
                <button onClick={handleZoomOut} className={styles.zoomButton}>
                    <FaSearchMinus />
                </button>
            </div>
        </div>
    );
}