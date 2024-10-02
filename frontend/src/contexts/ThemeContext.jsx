import React, { createContext, useState, useContext } from 'react';

export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);

        // التحكم في لون الشريط العلوي || StatusBar
        if (window.StatusBar) {
            window.StatusBar.backgroundColorByHexString(newTheme === 'light' ? '#f5f5f5' : '#121212');
            if (newTheme === 'light') {
                window.StatusBar.styleDefault();
            } else {
                window.StatusBar.styleLightContent();
            }
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};