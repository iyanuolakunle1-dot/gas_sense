/**
 * App.jsx
 * -------
 * Root layout and route configuration for GasSense.
 * 
 * Responsive architecture:
 * - On Mobile (< 768px): Vertical mobile app experience with bottom navigation.
 * - On Desktop (>= 768px): Expanded responsive dashboard with desktop sidebar & top bar.
 */
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DesktopHeader from "./components/DesktopHeader";
import HomePage from "./pages/HomePage";
import TrendsPage from "./pages/TrendsPage";
import DevicePage from "./pages/DevicePage";
import SettingsPage from "./pages/SettingsPage";
import SetupPage from "./pages/SetupPage";
import DiagnosticsPage from "./pages/DiagnosticsPage";
import AlertsPage from "./pages/AlertsPage";
import "./App.css";

/**
 * SmartHome – decides where a user lands when they open the app.
 *
 * Logic:
 *  - First-time visitor (no 'devicePaired' in localStorage) → go to /setup
 *  - Returning user (device already paired) → go to / (Dashboard)
 *
 * TODO (backend dev): Replace the localStorage check with a real API call
 * e.g. check if the authenticated user has a paired device on your server.
 */
const SmartHome = () => {
  const isDevicePaired = localStorage.getItem("devicePaired") === "true";
  return isDevicePaired ? <HomePage /> : <Navigate to="/setup" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-layout">
        {/* Desktop Sidebar (hidden on mobile devices) */}
        <Sidebar />

        {/* Dynamic Route Viewport */}
        <div className="main-content flex flex-col">
          {/* Desktop Top Header (hidden on mobile) */}
          <DesktopHeader />

          {/* Page Views Container */}
          <div className="flex-1 w-full">
            <Routes>
              {/* / automatically sends first-timers to setup, returners to dashboard */}
              <Route path="/" element={<SmartHome />} />
              <Route path="/trends" element={<TrendsPage />} />
              <Route path="/device" element={<DevicePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/setup" element={<SetupPage />} />
              <Route path="/diagnostics" element={<DiagnosticsPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
