/**
 * DiagnosticsPage.jsx
 * -------------------
 * Troubleshooting and sensor health diagnostics screen.
 * Fully responsive: mobile-first + desktop centered card layout.
 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";

const DiagnosticsPage = () => {
  const navigate = useNavigate();
  const [reconnecting, setReconnecting] = useState(false);
  const [reconnectMsg, setReconnectMsg] = useState("");
  const [batteryDismissed, setBatteryDismissed] = useState(false);

  const handleReconnect = () => {
    setReconnecting(true);
    setReconnectMsg("Searching for GasSense Bluetooth broadcast...");
    setTimeout(() => {
      setReconnecting(false);
      setReconnectMsg("Sensor found! Reconnected successfully.");
      setTimeout(() => setReconnectMsg(""), 3500);
    }, 2000);
  };

  return (
    <div className="min-h-full flex flex-col justify-between pb-24 md:pb-12">
      <div>
        <StatusBar time="9:41" />

        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6 space-y-6">
          {/* Header with Back Navigation */}
          <header className="flex items-center gap-3">
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
              <h1 className="text-[22px] sm:text-3xl font-extrabold text-[#0D2329] tracking-tight">
                Diagnostics
              </h1>
              <p className="text-xs sm:text-sm text-[#6C807D] font-medium">
                Hardware fault detection and connection troubleshooting
              </p>
            </div>
          </header>

          {reconnectMsg && (
            <div className="p-4 rounded-2xl bg-[#E1F3EE] text-[#0D6E5D] text-xs sm:text-sm font-bold text-center animate-fade-in shadow-xs">
              {reconnectMsg}
            </div>
          )}

          <main className="space-y-4">
            {/* Card 1: Sensor Disconnected */}
            <div className="bg-white rounded-[26px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E9EFEF] space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#FEECEB] text-[#D92D20] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-[#0D2329]">
                  Sensor Disconnected
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#6C807D] leading-relaxed max-w-2xl">
                Cannot reach your GasSense smart sensor. Please check that it is powered on and within Bluetooth range of this phone.
              </p>

              <div>
                <button
                  onClick={handleReconnect}
                  disabled={reconnecting}
                  className="py-3 px-6 rounded-2xl bg-[#D92D20] hover:bg-[#B42318] active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-sm transition-all disabled:opacity-50"
                >
                  {reconnecting ? "Reconnecting..." : "Reconnect Sensor"}
                </button>
              </div>
            </div>

            {/* Card 2: Sensor Battery Critical */}
            {!batteryDismissed && (
              <div className="bg-white rounded-[26px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E9EFEF] space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-[#FEF4E5] text-[#E68A00] flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-[#0D2329]">
                    Sensor Battery Critical
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-[#6C807D] leading-relaxed max-w-2xl">
                  Your smart sensor battery is at 8%. Replace the internal coin battery soon to avoid tracking and leakage notification gaps.
                </p>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => alert("Redirecting to official battery order page...")}
                    className="py-3 px-6 rounded-2xl bg-[#0D6E5D] hover:bg-[#0A574A] active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
                  >
                    Order Battery
                  </button>
                  <button
                    onClick={() => setBatteryDismissed(true)}
                    className="py-3 px-6 rounded-2xl bg-white border border-gray-200 hover:bg-gray-50 active:scale-[0.98] text-[#5F7470] font-semibold text-xs sm:text-sm transition-all"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            {/* Card 3: No Consumption Data */}
            <div className="bg-white rounded-[26px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E9EFEF] space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#E1F3EE] text-[#0D6E5D] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 10.5L12 3l9 7.5v9.5a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9.5z" />
                  </svg>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-[#0D2329]">
                  No Consumption Data
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#6C807D] leading-relaxed max-w-2xl">
                Start cooking to see your kitchen analytics. GasSense automatically displays statistics after your first 24 hours of usage.
              </p>

              <div>
                <button
                  onClick={() => alert("GasSense updates consumption weight every 10 seconds while cooking flame is active.")}
                  className="py-3 px-6 rounded-2xl border-2 border-[#0D6E5D] text-[#0D6E5D] hover:bg-[#E1F3EE]/40 active:scale-[0.98] font-bold text-xs sm:text-sm transition-all"
                >
                  How It Works
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      <BottomNav active="device" />
    </div>
  );
};

export default DiagnosticsPage;
