/**
 * App.jsx
 * -------
 * Root layout and route configuration for GasSense.
 * 
 * Responsive architecture:
 * - On Mobile (< 768px): Vertical mobile app experience with bottom navigation.
 * - On Desktop (>= 768px): Expanded responsive dashboard with desktop sidebar & top bar.
 */
import React, { useEffect, useState } from "react";
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
import { getApiError, getNearbySensors } from "./services/api";
import "./App.css";

/**
 * SmartHome checks the authenticated household overview to decide whether
 * setup is needed; pairing is never inferred from browser storage.
 */
const SmartHome = () => {
  const [state, setState] = useState({ loading: true, paired: false, error: "" });

  useEffect(() => {
    getNearbySensors()
      .then(({ sensors = [] }) => {
        const activeSensorId = localStorage.getItem("gassense_active_sensor_id");
        const activeSensor = sensors.find((sensor) => sensor.sensorId === activeSensorId && sensor.status === "PAIRED");
        const pairedSensor = activeSensor || sensors.find((sensor) => sensor.status === "PAIRED");
        if (pairedSensor?.sensorId) {
          localStorage.setItem("gassense_active_sensor_id", pairedSensor.sensorId);
          return true;
        }
        localStorage.removeItem("gassense_active_sensor_id");
        return false;
      })
      .then((paired) => setState({ loading: false, paired, error: "" }))
      .catch((error) => setState({ loading: false, paired: false, error: getApiError(error) }));
  }, []);

  if (state.loading) return <LoadingScreen label="Checking your GasSense account…" />;
  if (state.paired) return <HomePage />;
  return <Navigate to="/setup" replace state={{ error: state.error }} />;
};

const LoadingScreen = ({ label }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] py-20">
    <div className="w-9 h-9 border-[3px] border-[#0D6E5D] border-t-transparent rounded-full animate-spin" />
    <span className="text-xs font-medium text-[#5F7470] mt-3">{label}</span>
  </div>
);

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
              {/* / checks the live household overview */}
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
