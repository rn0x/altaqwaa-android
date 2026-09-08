import React, { lazy, Suspense, useSyncExternalStore } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell.jsx'
import { Loader } from './components/ui/Loader.jsx'
import { subscribeDigits, getDigitsStyle } from './utils/arabic.mjs'

const HomeScreen = lazy(() => import('./screens/HomeScreen.jsx'))
const QuranScreen = lazy(() => import('./screens/QuranScreen.jsx'))
const QuranSurahScreen = lazy(() => import('./screens/QuranSurahScreen.jsx'))
const TafseerScreen = lazy(() => import('./screens/TafseerScreen.jsx'))
const TafseerSuraScreen = lazy(() => import('./screens/TafseerSuraScreen.jsx'))
const AdhkarScreen = lazy(() => import('./screens/AdhkarScreen.jsx'))
const AdhkarCategoryScreen = lazy(() => import('./screens/AdhkarCategoryScreen.jsx'))
const HisnMuslimScreen = lazy(() => import('./screens/HisnMuslimScreen.jsx'))
const HisnMuslimCategoryScreen = lazy(() => import('./screens/HisnMuslimCategoryScreen.jsx'))
const FatwasScreen = lazy(() => import('./screens/FatwasScreen.jsx'))
const FatwasCategoryScreen = lazy(() => import('./screens/FatwasCategoryScreen.jsx'))
const FatwaDetailScreen = lazy(() => import('./screens/FatwaDetailScreen.jsx'))
const PrayerScreen = lazy(() => import('./screens/PrayerScreen.jsx'))
const QiblaScreen = lazy(() => import('./screens/QiblaScreen.jsx'))
const TasbihScreen = lazy(() => import('./screens/TasbihScreen.jsx'))
const RadioScreen = lazy(() => import('./screens/RadioScreen.jsx'))
const RecitersScreen = lazy(() => import('./screens/RecitersScreen.jsx'))
const ReciterScreen = lazy(() => import('./screens/ReciterScreen.jsx'))
const QuizScreen = lazy(() => import('./screens/QuizScreen.jsx'))
const QuizCategoryScreen = lazy(() => import('./screens/QuizCategoryScreen.jsx'))
const QuizSessionScreen = lazy(() => import('./screens/QuizSessionScreen.jsx'))
const SettingsScreen = lazy(() => import('./screens/SettingsScreen.jsx'))
const SettingsReadingScreen = lazy(() => import('./screens/settings/SettingsReadingScreen.jsx'))
const SettingsPrayerScreen = lazy(() => import('./screens/settings/SettingsPrayerScreen.jsx'))
const SettingsAdhanScreen = lazy(() => import('./screens/settings/SettingsAdhanScreen.jsx'))
const SettingsLocationScreen = lazy(() => import('./screens/settings/SettingsLocationScreen.jsx'))
const SettingsDownloadsScreen = lazy(() => import('./screens/settings/SettingsDownloadsScreen.jsx'))
const SettingsDataScreen = lazy(() => import('./screens/settings/SettingsDataScreen.jsx'))
const SettingsSupportScreen = lazy(() => import('./screens/settings/SettingsSupportScreen.jsx'))
const SettingsAboutScreen = lazy(() => import('./screens/settings/SettingsAboutScreen.jsx'))
const HistoryScreen = lazy(() => import('./screens/HistoryScreen.jsx'))
const HistoryEraScreen = lazy(() => import('./screens/HistoryEraScreen.jsx'))
const HistoryEventScreen = lazy(() => import('./screens/HistoryEventScreen.jsx'))
const KhutbahsScreen = lazy(() => import('./screens/KhutbahsScreen.jsx'))
const KhutbahCategoryScreen = lazy(() => import('./screens/KhutbahCategoryScreen.jsx'))
const KhutbahDetailScreen = lazy(() => import('./screens/KhutbahDetailScreen.jsx'))
const QuranCardsScreen = lazy(() => import('./screens/QuranCardsScreen.jsx'))
const QuranCardDetailScreen = lazy(() => import('./screens/QuranCardDetailScreen.jsx'))
const AsmaScreen = lazy(() => import('./screens/AsmaScreen.jsx'))
const AsmaDetailScreen = lazy(() => import('./screens/AsmaDetailScreen.jsx'))
const NotFoundScreen = lazy(() => import('./screens/NotFoundScreen.jsx'))

export function App() {
  useSyncExternalStore(subscribeDigits, getDigitsStyle)
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/quran" element={<QuranScreen />} />
          <Route path="/quran/:surahIndex" element={<QuranSurahScreen />} />
          <Route path="/tafseer" element={<TafseerScreen />} />
          <Route path="/tafseer/:surahIndex" element={<TafseerSuraScreen />} />
          <Route path="/adhkar" element={<AdhkarScreen />} />
          <Route path="/adhkar/:categoryKey" element={<AdhkarCategoryScreen />} />
          <Route path="/hisn" element={<HisnMuslimScreen />} />
          <Route path="/hisn/:categoryId" element={<HisnMuslimCategoryScreen />} />
          <Route path="/fatwas" element={<FatwasScreen />} />
          <Route path="/fatwas/:slug" element={<FatwasCategoryScreen />} />
          <Route path="/fatwas/:slug/:id" element={<FatwaDetailScreen />} />
          <Route path="/prayer" element={<PrayerScreen />} />
          <Route path="/qibla" element={<QiblaScreen />} />
          <Route path="/tasbih" element={<TasbihScreen />} />
          <Route path="/radio" element={<RadioScreen />} />
          <Route path="/reciters" element={<RecitersScreen />} />
          <Route path="/reciters/:reciterId" element={<ReciterScreen />} />
          <Route path="/quiz" element={<QuizScreen />} />
          <Route path="/quiz/:categoryEnglish" element={<QuizCategoryScreen />} />
          <Route path="/quiz/:categoryEnglish/:topicSlug/:level" element={<QuizSessionScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/settings/reading" element={<SettingsReadingScreen />} />
          <Route path="/settings/prayer" element={<SettingsPrayerScreen />} />
          <Route path="/settings/adhan" element={<SettingsAdhanScreen />} />
          <Route path="/settings/location" element={<SettingsLocationScreen />} />
          <Route path="/settings/downloads" element={<SettingsDownloadsScreen />} />
          <Route path="/settings/data" element={<SettingsDataScreen />} />
          <Route path="/settings/support" element={<SettingsSupportScreen />} />
          <Route path="/settings/about" element={<SettingsAboutScreen />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/history/:eraKey" element={<HistoryEraScreen />} />
          <Route path="/history/:eraKey/:id" element={<HistoryEventScreen />} />
          <Route path="/khutbah" element={<KhutbahsScreen />} />
          <Route path="/khutbah/:slug" element={<KhutbahCategoryScreen />} />
          <Route path="/khutbah/:slug/:id" element={<KhutbahDetailScreen />} />
          <Route path="/asma" element={<AsmaScreen />} />
          <Route path="/asma/:id" element={<AsmaDetailScreen />} />
          <Route path="/quran-cards" element={<QuranCardsScreen />} />
          <Route path="/quran-cards/:number" element={<QuranCardDetailScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Route>
      </Routes>
    </Suspense>
  )
}