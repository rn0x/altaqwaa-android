import React, { createContext, useState, useEffect, useContext } from 'react';

export const ScreenContext = createContext();
export const ScreenProvider = ({ children }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isDesktop, setIsDesktop] = useState(windowWidth > 600);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setIsDesktop(window.innerWidth > 600);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <ScreenContext.Provider value={{ isDesktop, windowWidth }}>
            {children}
        </ScreenContext.Provider>
    );
};
