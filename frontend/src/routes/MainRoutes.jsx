import React from "react";
import { Route, Routes } from "react-router-dom";
import TokenPage from "../pages/TokenPage";
import HomePage from "../pages/HomePage";
// import NotFound from "../pages/NotFound.jsx";


export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/index.html" element={<TokenPage />} />
      <Route path="/" element={<TokenPage />} />
      <Route path="/home" element={<HomePage />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}