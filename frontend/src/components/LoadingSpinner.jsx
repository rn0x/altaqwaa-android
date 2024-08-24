import React from 'react';
import styles from '../styles/LoadingSpinner.module.css';
import logo from '../assets/logo.webp';

/**
 * LoadingSpinner Component
 * @param {Object} props
 * @param {boolean} [props.showLogo=true] - Control if the logo should be displayed.
 * @param {boolean} [props.showSpinner=false] - Control if the spinner should be displayed.
 * @param {number} [props.logoSize=70] - Size of the logo.
 * @param {number} [props.spinnerSize=60] - Size of the spinner.
 * @returns {JSX.Element}
 */
export default function LoadingSpinner({
    showLogo = true,
    showSpinner = false,
    logoSize = 50,
    spinnerSize = 40
}) {
    // Ensure sizes are numbers and greater than 0
    logoSize = Math.max(Number(logoSize), 0);
    spinnerSize = Math.max(Number(spinnerSize), 0);

    return (
        <div className={`${styles.loadingContainer} no-cop`}>
            {showLogo && (
                <img
                    src={logo}
                    alt="Loading Logo"
                    className={styles.logo}
                    style={{ width: logoSize, height: 'auto' }}
                    onContextMenu={(event) => event.preventDefault()}
                    onMouseDown={(event) => event.preventDefault()}
                />
            )}
            {showSpinner && (
                <div
                    className={styles.spinner}
                    style={{ width: spinnerSize, height: spinnerSize }}
                ></div>
            )}
            <p className={styles.text}>جاري التحميل...</p>
        </div>
    );
}
