import React, { createContext, useState, useEffect, useContext } from 'react';

export const ScreenContext = createContext();
export const ScreenProvider = ({ children }) => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 600);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 600);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <ScreenContext.Provider value={isDesktop}>
            {children}
        </ScreenContext.Provider>
    );
};

