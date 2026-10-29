/**
 * TrendsPage.jsx
 * --------------
 * Analytics and consumption tracking screen.
 * Fully responsive: mobile-first + responsive wide layout for desktop.
 */
import React, { useState, useEffect } from "react";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";
import { getTrendsData } from "../services/api";

const PERIODS = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
];

const TrendsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTrendsData(selectedPeriod)
      .then((data) => {
        setTrends(data);
      })
      .catch((err) => {
        console.error("Failed to load trends:", err);
      })
      .finally(() => setLoading(false));
  }, [selectedPeriod]);

  const bars = trends?.bars || [];
  const maxVal = bars.length > 0 ? Math.max(...bars.map((b) => b.kg)) : 1;

  return (
    <div className="min-h-full flex flex-col justify-between pb-24 md:pb-12">
      <div>
        <StatusBar time="9:41" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6 space-y-6">
          {/* Header Section */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-[26px] sm:text-3xl font-extrabold text-[#0D2329] tracking-tight leading-tight">
                Usage Analytics
              </h1>
              <p className="text-xs sm:text-sm font-medium text-[#6C807D] tracking-wide mt-0.5">
                Track cylinder consumption patterns and burn rates
              </p>
            </div>

            {/* Period Tab Switcher */}
            <div className="bg-white rounded-2xl p-1.5 flex items-center shadow-sm border border-[#E9EFEF] w-full sm:w-auto sm:min-w-[280px]">
              {PERIODS.map(({ key, label }) => {
                const active = selectedPeriod === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedPeriod(key)}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                      active
                        ? "bg-[#0D6E5D] text-white shadow-sm"
                        : "text-[#0D6E5D] hover:bg-gray-50"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </header>

          <main className="space-y-6">
            {/* Consumption Bar Chart Card */}
            <div className="bg-white rounded-[26px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E9EFEF]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[15px] sm:text-base font-bold text-[#0D2329]">
                  {selectedPeriod === "weekly"
                    ? "Weekly Consumption (kg)"
                    : selectedPeriod === "daily"
                    ? "Daily Consumption (kg)"
                    : "Monthly Consumption (kg)"}
                </h2>
                <span className="text-xs sm:text-sm font-semibold text-[#6C807D]">
                  Total: {trends?.totalKg?.toFixed(2) || "0.00"} kg
                </span>
              </div>

              {loading ? (
                <div className="h-56 flex items-center justify-center">
                  <div className="w-8 h-8 border-[3px] border-[#0D6E5D] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="flex items-end justify-between gap-2 sm:gap-4 h-56 pt-6 px-1 sm:px-4">
                  {bars.map((item, idx) => {
                    const heightPercent = Math.max(
                      20,
                      Math.round((item.kg / (maxVal * 1.15)) * 100)
                    );

                    return (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col items-center justify-end h-full gap-2.5 group"
                      >
                        {/* Pill Badge */}
                        <span className="text-[10px] sm:text-xs font-bold text-[#0D6E5D] bg-[#E1F3EE] px-2 py-0.5 rounded-md whitespace-nowrap shadow-2xs">
                          {item.kg}
                        </span>

                        {/* Bar */}
                        <div className="w-full flex justify-center h-full items-end">
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className="w-full max-w-[54px] bg-[#0D6E5D] rounded-t-xl transition-all duration-500 ease-out group-hover:brightness-110"
                          />
                        </div>

                        {/* Day Label */}
                        <span className="text-xs font-semibold text-[#6C807D] tracking-tight">
                          {item.day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Kitchen Insights Section */}
            <div className="space-y-3 pt-2">
              <h2 className="text-[15px] sm:text-base font-bold text-[#0D2329] px-1">
                Kitchen Insights
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Insight 1: Duration */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E9EFEF] flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-[#D9F2EC] flex items-center justify-center text-[#0D6E5D] shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#7E918E]">
                      Your cylinder duration
                    </p>
                    <p className="text-sm font-bold text-[#0D2329] mt-0.5">
                      You finish a cylinder every 18 days.
                    </p>
                  </div>
                </div>

                {/* Insight 2: Comparison (Amber) */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E9EFEF] flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-[#FDF0D5] flex items-center justify-center text-[#C05621] shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#7E918E]">
                      Consumption vs last week
                    </p>
                    <p className="text-sm font-bold text-[#0D2329] mt-0.5">
                      This week's usage is 12% higher.
                    </p>
                  </div>
                </div>

                {/* Insight 3: Peak Hours */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E9EFEF] flex items-center gap-3.5 sm:col-span-2 lg:col-span-1">
                  <div className="w-11 h-11 rounded-full bg-[#D9F2EC] flex items-center justify-center text-[#0D6E5D] shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#7E918E]">
                      Peak cooking hours
                    </p>
                    <p className="text-sm font-bold text-[#0D2329] mt-0.5">
                      Dinner preparation peaks at 6:00 – 8:00 PM.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <BottomNav active="trends" />
    </div>
  );
};

export default TrendsPage;
