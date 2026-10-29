/**
 * HomePage.jsx
 * ------------
 * Primary dashboard view for GasSense.
 * Fully responsive: mobile-first + expansive desktop dashboard layout.
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";
import GaugeChart from "../components/GaugeChart";
import CylinderSensorIllustration from "../components/CylinderSensorIllustration";
import { getDashboardData } from "../services/api";

const HomePage = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardData()
      .then((data) => {
        setDashboard(data);
      })
      .catch((err) => {
        console.error("Failed to load dashboard data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !dashboard) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20">
        <div className="w-9 h-9 border-[3px] border-[#0D6E5D] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-medium text-[#5F7470] mt-3">Connecting to sensor...</span>
      </div>
    );
  }

  const { device, cylinder, todayUsage, alertLimit } = dashboard;

  return (
    <div className="min-h-full flex flex-col justify-between pb-24 md:pb-12">
      <div>
        {/* Mobile Status Bar (hidden on desktop) */}
        <StatusBar time="9:41" />

        {/* Content Container */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6">
          {/* Mobile Header (hidden on desktop) */}
          <header className="md:hidden pb-4">
            <h1 className="text-[26px] font-extrabold text-[#0D2329] tracking-tight leading-tight">
              {device.name}
            </h1>
            <p className="text-xs font-semibold text-[#6C807D] tracking-wide mt-0.5">
              {device.model} &nbsp;•&nbsp; SN: {device.serialNumber}
            </p>
          </header>

          {/* Desktop Title Header */}
          <div className="hidden md:flex items-center justify-between pb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0D2329] tracking-tight">
                Cylinder Overview
              </h1>
              <p className="text-xs lg:text-sm text-[#6C807D] font-medium mt-0.5">
                Real-time ultrasonic monitoring for {device.name} ({device.model})
              </p>
            </div>
            <span className="text-xs font-bold text-[#0D6E5D] bg-[#E1F3EE] px-3.5 py-1.5 rounded-full border border-[#CDEAE2]">
              SN: {device.serialNumber}
            </span>
          </div>

          {/* Main Content Area - Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Column: Cylinder & Circular Gauge Card */}
            <div className="lg:col-span-7 bg-white rounded-[26px] p-5 sm:p-7 shadow-[0_4px_24px_rgba(13,110,93,0.04)] border border-[#E9EFEF]">
              {/* Top Indicator Tags */}
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#5F7470] mb-2 px-1">
                <div className="flex items-center gap-1.5">
                  <span>Smart Sensor</span>
                  <span className="inline-block w-8 sm:w-12 border-b border-dashed border-[#0D6E5D]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D6E5D]" />
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D6E5D] animate-pulse" />
                  <span className="inline-block w-8 sm:w-12 border-b border-dashed border-[#0D6E5D]" />
                  <span>Live Reading</span>
                </div>
              </div>

              {/* Cylinder Illustration */}
              <div className="flex justify-center my-1 sm:my-3">
                <CylinderSensorIllustration className="w-48 sm:w-56 h-auto" />
              </div>

              {/* Subtle Divider */}
              <div className="w-full h-px bg-gray-100 my-4" />

              {/* Circular Gauge Meter */}
              <GaugeChart
                percent={cylinder.percentRemaining}
                status={cylinder.status}
              />

              {/* Gas Metrics Summary Row */}
              <div className="grid grid-cols-2 pt-4 mt-2 border-t border-gray-100">
                {/* Remaining Gas */}
                <div className="pr-3">
                  <span className="text-[11px] font-semibold text-[#7E918E] tracking-tight">
                    Remaining Gas
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-xl sm:text-2xl font-extrabold text-[#0D2329]">
                      {cylinder.remainingWeight.toFixed(1)} kg
                    </span>
                    <span className="text-xs text-[#7E918E] font-medium">
                      of {cylinder.totalWeight} kg
                    </span>
                  </div>
                </div>

                {/* Days Left */}
                <div className="pl-4 border-l border-gray-100">
                  <span className="text-[11px] font-semibold text-[#7E918E] tracking-tight">
                    Days Left
                  </span>
                  <div className="mt-0.5">
                    <span className="text-xl sm:text-2xl font-extrabold text-[#0D6E5D]">
                      ~{cylinder.daysLeft} Days
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Key Stats & Summary Cards */}
            <div className="lg:col-span-5 space-y-4">
              {/* Secondary Stats Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Today's Consumption Card */}
                <div className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#E9EFEF]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#5F7470]">Today's Use</span>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#0D6E5D]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2c-3 4-5 7-5 10a5 5 0 0010 0c0-3-2-6-5-10z" />
                    </svg>
                  </div>

                  <div className="text-[24px] font-extrabold text-[#0D2329] mt-3">
                    {todayUsage.kg.toFixed(2)} kg
                  </div>

                  <div className="text-[11px] font-semibold text-[#0D6E5D] mt-1">
                    {todayUsage.label}
                  </div>
                </div>

                {/* Alert Limit Setting Card */}
                <div 
                  onClick={() => navigate("/alerts")}
                  className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#E9EFEF] cursor-pointer hover:border-[#0D6E5D]/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#5F7470]">Alert Limit</span>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#E68A00]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>

                  <div className="text-[24px] font-extrabold text-[#0D2329] mt-3">
                    {alertLimit.percent}%
                  </div>

                  <div className="text-[11px] font-medium text-[#7E918E] mt-1">
                    Notify via SMS
                  </div>
                </div>
              </div>

              {/* Weekly Trends Preview Card */}
              <div 
                onClick={() => navigate("/trends")}
                className="bg-white rounded-[24px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#E9EFEF] flex items-center justify-between cursor-pointer hover:border-[#0D6E5D]/30 transition-all"
              >
                <div>
                  <h3 className="text-sm font-bold text-[#0D2329]">
                    Weekly usage trends
                  </h3>
                  <p className="text-xs text-[#7E918E] mt-0.5">
                    Consistent cooking flow
                  </p>
                </div>

                {/* Mini 5-bar chart icon */}
                <div className="flex items-end gap-[3px] h-6 pl-2">
                  <span className="w-1.5 bg-[#0D6E5D] rounded-full h-3" />
                  <span className="w-1.5 bg-[#0D6E5D] rounded-full h-4" />
                  <span className="w-1.5 bg-[#0D6E5D] rounded-full h-6" />
                  <span className="w-1.5 bg-[#0D6E5D] rounded-full h-4" />
                  <span className="w-1.5 bg-[#0D6E5D] rounded-full h-5" />
                </div>
              </div>

              {/* Sensor Coupling Status Card */}
              <div 
                onClick={() => navigate("/device")}
                className="bg-white rounded-[24px] p-5 border border-[#E9EFEF] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex items-start gap-3.5 cursor-pointer hover:border-[#0D6E5D]/30 transition-all"
              >
                <div className="w-9 h-9 rounded-full bg-[#E1F3EE] text-[#0D6E5D] flex items-center justify-center shrink-0 text-sm font-bold">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0D2329]">
                    Sensor Coupling Verified
                  </h4>
                  <p className="text-[11px] text-[#6C807D] mt-0.5 leading-relaxed">
                    Ultrasonic pulse echo frequency is stable at 2.4 MHz with 98% magnetic coupling accuracy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Tab Bar (mobile only) */}
      <BottomNav active="home" />
    </div>
  );
};

export default HomePage;
