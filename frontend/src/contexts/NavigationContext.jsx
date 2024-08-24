import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// إنشاء Context جديد
export const NavigationContext = createContext();

/**
 * Provider لمشاركة حالة التنقل.
 * 
 * @param {React.ReactNode} children - العناصر الداخلية.
 * @returns {React.ReactNode} العناصر الداخلية ضمن الـ Provider.
 */
export function NavigationProvider({ children }) {
    const location = useLocation();
    const [activePage, setActivePage] = useState('');

    useEffect(() => {
        // الحصول على المسار الكامل
        const pathname = location.pathname;
        const firstSegment = pathname.split('/').filter(Boolean)[0] || '';        
        setActivePage(`/${firstSegment}`);
    }, [location]);

    return (
        <NavigationContext.Provider value={{ activePage }}>
            {children}
        </NavigationContext.Provider>
    );
}
