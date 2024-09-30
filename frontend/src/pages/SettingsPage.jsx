import React from 'react'
import ThemeSwitcher from '../components/ThemeSwitcher.jsx';
import LanguageSelector from '../components/LanguageSelector.jsx';

export default function SettingsPage() {
  return (
    <div>
        <ThemeSwitcher />
        <LanguageSelector />
    </div>
  )
}
