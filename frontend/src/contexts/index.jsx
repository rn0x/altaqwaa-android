import React from 'react';
import { ScreenProvider } from './ScreenContext.jsx';
import { ThemeProvider } from './ThemeContext.jsx';

const Providers = ({ children }) => (
    <ScreenProvider>
        <ThemeProvider>
            {children}
        </ThemeProvider>
    </ScreenProvider>
);

export default Providers;