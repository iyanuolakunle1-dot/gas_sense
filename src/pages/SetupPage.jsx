/**
 * SetupPage.jsx
 * -------------
 * Initial setup and sensor pairing screen.
 * Fully responsive: mobile-first + desktop centered card layout.
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";

const SetupPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F0F6F5] flex flex-col justify-between pb-8 md:pb-12">
      <div>
        <StatusBar time="9:41" />

        {/* Header */}
        <header className="px-6 md:px-8 pt-4 pb-4 max-w-3xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full hover:bg-white text-[#0D2329] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div>
              <h1 className="text-[26px] md:text-3xl font-extrabold text-[#0D2329] tracking-tight leading-tight">
                Setup GasSense
              </h1>
              <p className="text-xs font-semibold text-[#6C807D] tracking-wide mt-0.5">
                Get connected in 3 easy steps
              </p>
            </div>
          </div>

          {/* 3 Step Progress Bars */}
          <div className="flex gap-2.5 mt-4">
            <div className="flex-1 h-1.5 rounded-full bg-[#0D6E5D]" />
            <div className="flex-1 h-1.5 rounded-full bg-[#0D6E5D]" />
            <div className="flex-1 h-1.5 rounded-full bg-[#0D6E5D]" />
          </div>
        </header>

        <main className="px-5 md:px-8 space-y-4 max-w-3xl mt-2">
          {/* Main Connected Hero Card */}
          <div className="bg-white rounded-[26px] p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-[#E9EFEF] flex flex-col items-center text-center">
            {/* Sensor Graphic with Blue Bluetooth Emblem */}
            <div className="relative w-40 h-40 flex items-center justify-center my-3">
              <div className="absolute inset-0 rounded-full bg-[#EBF6F9] scale-90" />
              <div className="absolute inset-2 rounded-full bg-[#E0EFF4] opacity-50" />

              {/* Sensor Module Graphic */}
              <div className="relative z-10 w-18 h-26 bg-[#0D6E5D] rounded-2xl shadow-md flex flex-col items-center pt-2.5">
                <div className="w-10 h-3.5 bg-[#A4E0D2] rounded-md mb-2" />
                <div className="w-2 h-2 rounded-full bg-[#52D2B5] mt-auto mb-3" />
              </div>

              {/* Bluetooth circle badge */}
              <div className="absolute bottom-4 right-4 z-20 w-9 h-9 rounded-full bg-[#186ADE] border-2 border-white flex items-center justify-center text-white shadow-sm">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z" />
                </svg>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-extrabold text-[#0D2329] mt-2">
              Sensor Connected!
            </h2>
            <p className="text-xs md:text-sm text-[#6C807D] font-medium leading-relaxed max-w-sm mt-2">
              Your GasSense smart sensor has been successfully paired to this mobile phone.
            </p>
          </div>

          {/* Quick Hardware Specs Card */}
          <div className="bg-white rounded-[26px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E9EFEF] space-y-3.5">
            {/* Device Name */}
            <div className="flex items-center justify-between text-xs md:text-sm py-1.5 border-b border-gray-50">
              <div className="flex items-center gap-2.5 text-[#0D6E5D]">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <rect x="9" y="9" width="6" height="6" />
                  <line x1="9" y1="1" x2="9" y2="4" />
                  <line x1="15" y1="1" x2="15" y2="4" />
                  <line x1="9" y1="20" x2="9" y2="23" />
                  <line x1="15" y1="20" x2="15" y2="23" />
                  <line x1="20" y1="9" x2="23" y2="9" />
                  <line x1="20" y1="15" x2="23" y2="15" />
                  <line x1="1" y1="9" x2="4" y2="9" />
                  <line x1="1" y1="15" x2="4" y2="15" />
                </svg>
                <span className="font-semibold text-[#0D2329]">Device Name</span>
              </div>
              <span className="font-bold text-[#0D2329]">GS-V2.1-A4F7</span>
            </div>

            {/* Sensor Battery */}
            <div className="flex items-center justify-between text-xs md:text-sm py-1.5 border-b border-gray-50">
              <div className="flex items-center gap-2.5 text-[#0D6E5D]">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="1" y="6" width="18" height="12" rx="2" />
                  <line x1="23" y1="11" x2="23" y2="13" />
                </svg>
                <span className="font-semibold text-[#0D2329]">Sensor Battery</span>
              </div>
              <span className="font-bold text-[#0D6E5D]">98% (Excellent)</span>
            </div>

            {/* Signal Strength */}
            <div className="flex items-center justify-between text-xs md:text-sm py-1">
              <div className="flex items-center gap-2.5 text-[#0D6E5D]">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12.55a11 11 0 0114.08 0" />
                  <path d="M1.42 9a16 16 0 0121.16 0" />
                  <path d="M8.53 16.11a6 6 0 016.95 0" />
                  <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
                </svg>
                <span className="font-semibold text-[#0D2329]">Signal Strength</span>
              </div>
              <span className="font-bold text-[#0D2329]">Strong</span>
            </div>
          </div>

          {/* Magnetic Coupling Tip Box */}
          <div className="border border-[#0D6E5D]/60 rounded-2xl p-4 bg-[#F2FAF7] flex items-start gap-3">
            <div className="text-[#0D6E5D] shrink-0 mt-0.5">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <p className="text-xs md:text-sm text-[#0D6E5D] font-medium leading-relaxed">
              Place the sensor flat under the steel base ring of your cylinder for accurate magnetic coupling.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-3">
            <button
              onClick={() => navigate("/")}
              className="w-full py-4 rounded-2xl bg-[#0D6E5D] hover:bg-[#0A574A] active:scale-[0.99] text-white font-bold text-sm shadow-[0_4px_16px_rgba(13,110,93,0.3)] transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SetupPage;
