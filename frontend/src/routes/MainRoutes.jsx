import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner'

const HomePage = lazy(() => import('../pages/HomePage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export default function MainRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/index.html" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/loading" element={<LoadingSpinner />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
