import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import useTheme from '../hooks/useTheme';
import styles from '../styles/QuranPage.module.css';
import metadataQuran from '../assets/json/metadataQuran.json';
import pagesQuran from '../assets/json/pagesQuran.json';
import useTranslation from '../hooks/useTranslation';

export default function QuranPage() {
    const pages = pagesQuran;
    const { theme } = useTheme();
    const { direction } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState(0);
    const [endX, setEndX] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [imageScale, setImageScale] = useState(1);
    const [showNavigation, setShowNavigation] = useState(false);
    let hideTimeout;
    const [isSwiping, setIsSwiping] = useState(false);

    // حالة جديدة لتتبع ظهور الأزرار
    const [areButtonsVisible, setAreButtonsVisible] = useState(false);

    useEffect(() => {
        const savedPage = localStorage.getItem('lastReadPage');

        if (savedPage) {
            setCurrentIndex(Number(savedPage));
        }

        // إضافة حدث keydown
        const handleKeyDown = (event) => {
            // إذا كان الاتجاه rtl
            if (direction === 'rtl') {
                if (event.key === 'ArrowRight') {
                    handlePrev();
                } else if (event.key === 'ArrowLeft') {
                    handleNext();
                }
            } else { // إذا كان الاتجاه ltr
                if (event.key === 'ArrowLeft') {
                    handlePrev();
                } else if (event.key === 'ArrowRight') {
                    handleNext();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            clearTimeout(hideTimeout);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentIndex, hideTimeout, direction]);

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
        setIsSwiping(false);
    };

    const handleTouchMove = (e) => {
        const touch = e.touches[0];
        setEndX(touch.clientX);
        setIsSwiping(true);
    };

    const handleTouchEnd = () => {
        const threshold = 50;
        const distance = startX - endX;

        if (isSwiping) {
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
                        style={{ display: isLoading ? 'none' : 'block', transform: `scale(${imageScale})` }}
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

    const showButtons = () => {
        if (!areButtonsVisible) {
            setShowNavigation(true);
            setAreButtonsVisible(true); // ضبط حالة الأزرار على مرئية
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => {
                hideButtons();
            }, 5000);
        }
    };

    const hideButtons = () => {
        setShowNavigation(false);
        setAreButtonsVisible(false); // ضبط حالة الأزرار على مخفية
    };

    return (
        <div
            className={styles.container}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={showButtons}
            onMouseLeave={hideButtons}
            onMouseMove={showButtons}
            onFocus={showButtons}
            onBlur={hideButtons}
            tabIndex={0}
        >
            {renderPage(pages[currentIndex])}
            {showNavigation && (
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