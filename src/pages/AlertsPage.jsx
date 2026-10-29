/**
 * AlertsPage.jsx
 * --------------
 * Historical and live alert notifications log.
 * Fully responsive: mobile-first + desktop centered log layout.
 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";

const FILTERS = ["All", "Low Gas", "Critical", "Refills"];

const ALERTS_DATA = [
  {
    id: 1,
    type: "critical",
    category: "Critical",
    title: "Urgent: Empty Cylinder Alert",
    description: "Cylinder level at 4%. Switch over immediately or order a refill to prevent cooking disruption.",
    time: "10 mins ago",
    bgColor: "bg-[#FDECEC]",
    dotColor: "bg-[#E53935]",
    icon: (
      <div className="w-10 h-10 rounded-full bg-white text-[#E53935] flex items-center justify-center shrink-0 shadow-2xs">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
    ),
  },
  {
    id: 2,
    type: "warning",
    category: "Low Gas",
    title: "Low Gas Alert set at 20%",
    description: "Gas level dropped below 20%. Expected depletion in approximately 3 days.",
    time: "2 hours ago",
    bgColor: "bg-[#FEF7DE]",
    dotColor: "bg-[#E53935]",
    icon: (
      <div className="w-10 h-10 rounded-full bg-white text-[#E68A00] flex items-center justify-center shrink-0 shadow-2xs">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
    ),
  },
  {
    id: 3,
    type: "info",
    category: "Low Gas",
    title: "Usage Spike Detected",
    description: "Unusual usage rate between 2:00 PM and 4:00 PM today. Check burner valves.",
    time: "Yesterday",
    bgColor: "bg-white",
    dotColor: "",
    icon: (
      <div className="w-10 h-10 rounded-full bg-[#E1F3EE] text-[#0D6E5D] flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    ),
  },
];

const AlertsPage = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredAlerts = ALERTS_DATA.filter((item) => {
    if (selectedFilter === "All") return true;
    return item.category === selectedFilter;
  });

  return (
    <div className="min-h-full flex flex-col justify-between pb-24 md:pb-12">
      <div>
        <StatusBar time="9:41" />

        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6 space-y-6">
          {/* Header */}
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
                Alerts &amp; Activity
              </h1>
              <p className="text-xs sm:text-sm text-[#6C807D] font-medium">
                Log of cylinder threshold alerts and usage events
              </p>
            </div>
          </header>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {FILTERS.map((filter) => {
              const active = selectedFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                    active
                      ? "bg-[#0D6E5D] text-white shadow-sm"
                      : "bg-white text-[#5F7470] border border-[#E0ECE8] hover:bg-gray-50"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Alerts List */}
          <main className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-[24px] p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#E9EFEF] relative ${alert.bgColor}`}
              >
                {/* Unread indicator dot */}
                {alert.dotColor && (
                  <span
                    className={`absolute top-5 right-5 w-2.5 h-2.5 rounded-full ${alert.dotColor}`}
                  />
                )}

                <div className="flex items-start gap-4 pr-4">
                  {alert.icon}

                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-extrabold text-[#0D2329]">
                      {alert.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5F7470] leading-relaxed">
                      {alert.description}
                    </p>
                    <p className="text-[11px] sm:text-xs font-semibold text-[#8FA3A0] pt-1">
                      {alert.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {filteredAlerts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-[26px] border border-[#E9EFEF] text-[#6C807D] text-xs sm:text-sm font-semibold">
                No alerts found under category "{selectedFilter}".
              </div>
            )}
          </main>
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  );
};

export default AlertsPage;
