import React from 'react';
import { ScreenProvider } from './ScreenContext.jsx';
import { ThemeProvider } from './ThemeContext.jsx';
import { NavigationProvider } from './NavigationContext.jsx';
import { TranslationProvider } from './TranslationContext.jsx';

const Providers = ({ children }) => (
    <TranslationProvider>
        <ScreenProvider>
            <ThemeProvider>
                <NavigationProvider>
                    {children}
                </NavigationProvider>
            </ThemeProvider>
        </ScreenProvider>
    </TranslationProvider>
);

export default Providers;