/**
 * TrendsPage.jsx
 * --------------
 * Analytics and consumption tracking screen.
 * Fully responsive: mobile-first + responsive wide layout for desktop.
 */
import React, { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import { getApiError, getSessionContext, getTrendsData } from "../services/api";

const Insight = ({ label, value }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E9EFEF]">
    <p className="text-[11px] font-semibold text-[#7E918E]">{label}</p>
    <p className="text-sm font-bold text-[#0D2329] mt-1">{value}</p>
  </div>
);

const TrendsPage = () => {
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getSessionContext().then(({ sensorId }) => getTrendsData(sensorId, "weekly"))
      .then((data) => {
        setTrends(data);
      })
      .catch((err) => console.error("Failed to load trends:", getApiError(err)))
      .finally(() => setLoading(false));
  }, []);

  const bars = trends?.bars || [];
  const maxVal = bars.length > 0 ? Math.max(1, ...bars.map((b) => b.kg)) : 1;

  return (
    <div className="min-h-full flex flex-col justify-between pb-24 md:pb-12">
      <div>
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

          </header>

          <main className="space-y-6">
            {/* Consumption Bar Chart Card */}
            <div className="bg-white rounded-[26px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E9EFEF]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[15px] sm:text-base font-bold text-[#0D2329]">
                  Weekly Consumption (kg)
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

              {trends?.insights?.hasData ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Insight label="Cylinder duration" value={`${trends.insights.cylinderDurationDays} days`} />
                  <Insight label="Comparison vs last period" value={`${trends.insights.comparisonPercent}%`} />
                  <Insight label="Peak cooking hour" value={trends.insights.peakCookingHours?.length ? trends.insights.peakCookingHours.map((hour) => `${hour}:00`).join(", ") : "Not reported"} />
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-5 border border-[#E9EFEF] text-sm text-[#6C807D]">No insight data reported for this period.</div>
              )}
            </div>
          </main>
        </div>
      </div>

      <BottomNav active="trends" />
    </div>
  );
};

export default TrendsPage;
