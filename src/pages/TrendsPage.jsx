/**
 * TrendsPage.jsx
 * --------------
 * Consumption analytics screen. The mobile layout follows the product design
 * while the same data remains useful in the wider desktop dashboard.
 */
import React, { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import StatusBar from "../components/StatusBar";
import { getApiError, getSessionContext, getTrendsData } from "../services/api";

const PERIODS = [
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
];

const DAILY_LABELS = ["12 AM", "4 AM", "8 AM", "12 PM", "4 PM", "8 PM"];
const WEEKLY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHLY_LABELS = ["Week 1", "Week 2", "Week 3", "Week 4"];

const toHour = (label) => {
  if (typeof label !== "string") return null;
  const match = label.trim().match(/(\d{1,2})(?::\d{2})?\s*(AM|PM)?/i);
  if (!match) return null;
  let hour = Number(match[1]);
  const meridiem = match[2]?.toUpperCase();
  if (meridiem === "AM" && hour === 12) hour = 0;
  if (meridiem === "PM" && hour !== 12) hour += 12;
  return hour;
};

const getDailyBars = (bars = []) => {
  if (!bars.length) return [];
  const values = DAILY_LABELS.map(() => 0);

  bars.forEach((bar, index) => {
    const hour = toHour(bar.day ?? bar.label);
    const bucket = hour == null ? (bars.length === 6 ? index : null) : Math.floor(hour / 4);
    if (bucket != null && bucket >= 0 && bucket < DAILY_LABELS.length) {
      values[bucket] += Number(bar.kg) || 0;
    }
  });

  return DAILY_LABELS.map((label, index) => ({ day: label, kg: values[index] }));
};

const getPeriodBars = (bars = [], labels) => {
  if (!bars.length) return [];
  const values = labels.map(() => 0);

  bars.forEach((bar, index) => {
    const rawLabel = String(bar.day ?? bar.label ?? "");
    const normalized = rawLabel.trim().toLowerCase();
    let bucket = labels.findIndex((label) => label.toLowerCase() === normalized);

    if (bucket < 0) {
      const numeric = Number(rawLabel.match(/\d+/)?.[0]);
      if (Number.isFinite(numeric)) bucket = labels.length === 4 ? Math.floor((numeric - 1) / 7) : numeric;
    }
    if (bucket < 0 || bucket >= labels.length) bucket = index < labels.length ? index : -1;
    if (bucket >= 0) values[bucket] += Number(bar.kg) || 0;
  });

  return labels.map((label, index) => ({ day: label, kg: values[index] }));
};

const InsightIcon = ({ type }) => {
  if (type === "duration") {
    return <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18h5l3-12 5 20 3-11h5" /></svg>;
  }
  if (type === "share") {
    return <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 23l8-8 5 4 9-10" /><path d="M20 9h7v7" /></svg>;
  }
  return <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="16" r="9" /><path d="M16 11v6l4 2" /></svg>;
};

const getInsightCards = (insights, period) => {
  if (Array.isArray(insights)) {
    return insights.slice(0, 3).map((item, index) => ({ type: ["duration", "share", "peak"][index], label: item.label, value: item.value }));
  }
  if (!insights?.hasData) return [];
  const comparison = insights.comparisonPercent == null ? "Not reported" : `${period === "daily" ? "Today" : "This period"} accounts for ${Math.abs(insights.comparisonPercent)}% of the previous period.`;
  const peak = insights.peakCookingHours?.length ? `Dinner preparation peaks at ${insights.peakCookingHours.map((hour) => `${hour}:00`).join(" – ")} PM.` : "Not reported";
  return [
    { type: "duration", label: "Your cylinder duration", value: `You finish a cylinder every ${insights.cylinderDurationDays} days.` },
    { type: "share", label: "Share of weekly usage", value: comparison },
    { type: "peak", label: "Peak cooking hours", value: peak },
  ];
};

const TrendsPage = () => {
  const [period, setPeriod] = useState("daily");
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getSessionContext().then(({ sensorId }) => getTrendsData(sensorId, period)).then((data) => {
      if (active) setTrends(data);
    }).catch((err) => {
      console.error("Failed to load trends:", getApiError(err));
      if (active) setTrends(null);
    }).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [period]);

  const rawBars = trends?.bars || [];
  const bars = period === "daily"
    ? getDailyBars(rawBars)
    : getPeriodBars(rawBars, period === "weekly" ? WEEKLY_LABELS : MONTHLY_LABELS);
  const maxVal = bars.length > 0 ? Math.max(0.01, ...bars.map((bar) => Number(bar.kg) || 0)) : 1;
  const insightCards = getInsightCards(trends?.insights, period);
  const chartTitle = period === "daily" ? "Daily Consumption (kg)" : `${period[0].toUpperCase()}${period.slice(1)} Consumption (kg)`;

  return (
    <div className="min-h-full flex flex-col justify-between pb-24 md:pb-12">
      <div className="w-full max-w-7xl mx-auto">
        <StatusBar />
        <div className="px-[24px] sm:px-6 lg:px-8 pt-[42px] pb-8 md:py-8">
          <header className="mb-4 md:mb-6">
            <h1 className="text-[26px] sm:text-3xl font-extrabold text-[#11192D] tracking-[-1px] leading-[1.05]">Usage Analytics</h1>
            <p className="text-[16px] sm:text-sm font-normal text-[#52627A] tracking-[0.1px] mt-3 md:mt-1">Track your cylinder consumption</p>
          </header>

          <div className="grid grid-cols-3 gap-[5px] mb-[32px] md:mb-6" role="tablist" aria-label="Analytics period">
            {PERIODS.map(({ id, label }) => {
              const active = period === id;
              return <button key={id} type="button" role="tab" aria-selected={active} onClick={() => { setLoading(true); setPeriod(id); }} className={`h-[35px] rounded-[6px] border-[1px] text-[16px] sm:text-base font-bold transition-colors ${active ? "bg-[#117D75] border-[#117D75] text-white" : "bg-white border-[#E0E7F0] text-[#4D5C74] hover:border-[#B6D8D3]"}`}>{label}</button>;
            })}
          </div>

          <main>
            <section className="bg-white rounded-[20px] border-[1px] border-[#E1E7F0] px-[20px] sm:p-6 pt-[20px] pb-[12px] shadow-none">
              <div className="flex items-center justify-between gap-3 mb-[20px]">
                <h2 className="text-[16px] sm:text-base font-extrabold text-[#11192D] leading-tight">{chartTitle}</h2>
                <span className="text-[14px] sm:text-sm font-normal text-[#52627A] whitespace-nowrap">Total: {trends?.totalKg == null ? "0.00" : Number(trends.totalKg).toFixed(2)} kg</span>
              </div>

              {loading ? <div className="h-[160px] flex items-center justify-center"><div className="w-8 h-8 border-[3px] border-[#117D75] border-t-transparent rounded-full animate-spin" /></div> : bars.length ? (
                <div className="flex items-end justify-between gap-[10px] h-[160px] sm:h-56 px-0">
                  {bars.map((item, index) => {
                    const value = Number(item.kg) || 0;
                    const heightPercent = Math.max(7, Math.round((value / (maxVal * 1.15)) * 100));
                    return <div key={`${item.day}-${index}`} className="flex-1 flex flex-col items-center justify-end h-full min-w-0">
                      <span className="text-[14px] sm:text-xs font-bold text-[#117D75] bg-[#C9F7F0] px-[8px] py-[4px] rounded-[7px] whitespace-nowrap mb-[10px]">{value.toFixed(2)}</span>
                      <div className="w-full flex justify-center flex-1 min-h-0 items-end"><div style={{ height: `${heightPercent}%` }} className="w-full max-w-[43px] bg-[#117D75] rounded-t-[10px]" /></div>
                      <span className="text-[14px] sm:text-xs font-normal text-[#52627A] whitespace-nowrap mt-[10px]">{item.day}</span>
                    </div>;
                  })}
                </div>
              ) : <div className="h-[160px] flex items-center justify-center text-sm text-[#52627A]">No usage data reported for this period.</div>}
            </section>

            <section className="mt-[32px] md:mt-8">
              <h2 className="text-[24px] sm:text-xl font-extrabold text-[#11192D] tracking-[-0.5px] mb-[20px]">Kitchen Insights</h2>
              <div className="space-y-[16px] md:space-y-4">
                {insightCards.map((insight) => <article key={`${insight.type}-${insight.label}`} className="min-h-[64px] flex items-center gap-[12px] bg-white rounded-[20px] border-[1px] border-[#E1E7F0] px-[14px] py-[12px]">
                  <div className={`w-[34px] h-[34px] rounded-full flex items-center justify-center shrink-0 ${insight.type === "share" ? "bg-[#FFF0BF] text-[#E68100]" : "bg-[#C9F7F0] text-[#117D75]"}`}><InsightIcon type={insight.type} /></div>
                  <div className="min-w-0"><p className="text-[16px] sm:text-sm font-normal text-[#52627A] leading-tight">{insight.label}</p><p className="text-[16px] sm:text-sm font-extrabold text-[#11192D] leading-[1.25] mt-1">{insight.value}</p></div>
                </article>)}
                {!loading && !insightCards.length && <div className="bg-white rounded-2xl p-5 border border-[#E1E7F0] text-sm text-[#52627A]">No insight data reported for this period.</div>}
              </div>
            </section>
          </main>
        </div>
      </div>
      <BottomNav active="trends" />
    </div>
  );
};

export default TrendsPage;
