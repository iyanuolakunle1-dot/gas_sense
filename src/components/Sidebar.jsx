/**
 * Sidebar.jsx
 * -----------
 * Desktop & Tablet navigation sidebar for GasSense.
 * Displayed on screens >= 768px (hidden on mobile).
 */
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_LINKS = [
  {
    id: "home",
    label: "Dashboard",
    route: "/",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5L12 3l9 7.5v9.5a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9.5z" />
      </svg>
    ),
  },
  {
    id: "trends",
    label: "Usage Analytics",
    route: "/trends",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="13" width="4" height="8" rx="1" />
        <rect x="10" y="8" width="4" height="13" rx="1" />
        <rect x="17" y="3" width="4" height="18" rx="1" />
      </svg>
    ),
  },
  {
    id: "alerts",
    label: "Alerts & Events",
    route: "/alerts",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    id: "device",
    label: "My Device",
    route: "/device",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <line x1="8" y1="9" x2="16" y2="9" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "diagnostics",
    label: "Diagnostics",
    route: "/diagnostics",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    route: "/settings",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
  {
    id: "setup",
    label: "Pairing Setup",
    route: "/setup",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" />
        <polyline points="18 8 22 12 18 16" />
        <line x1="8" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white border-r border-[#E5EFEF] p-6 shrink-0 min-h-screen sticky top-0 h-screen justify-between">
      <div>
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3 px-2 py-1 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-[#0D6E5D] flex items-center justify-center text-white font-black text-xl shadow-[0_4px_12px_rgba(13,110,93,0.3)]">
            G
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#0D2329] tracking-tight">
              GasSense
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#0D6E5D] animate-pulse" />
              <span className="text-[11px] font-semibold text-[#6C807D]">
                GS-V2.1 Connected
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1.5">
          {NAV_LINKS.map(({ id, label, route, icon }) => {
            const isActive =
              route === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(route);

            return (
              <button
                key={id}
                onClick={() => navigate(route)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all text-left ${
                  isActive
                    ? "bg-[#0D6E5D] text-white shadow-[0_4px_16px_rgba(13,110,93,0.25)]"
                    : "text-[#5F7470] hover:bg-[#F0F6F5] hover:text-[#0D2329]"
                }`}
              >
                <span className={isActive ? "text-white" : "text-[#7E918E]"}>
                  {icon}
                </span>
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sensor Status Card in Sidebar */}
      <div className="bg-[#F0F6F5] rounded-2xl p-4 border border-[#E0ECE8]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-[#6C807D] uppercase tracking-wider">
            Cylinder Level
          </span>
          <span className="text-[11px] font-bold text-[#0D6E5D] bg-[#E1F3EE] px-2 py-0.5 rounded-full">
            Good
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-extrabold text-[#0D2329]">64%</span>
          <span className="text-xs font-bold text-[#0D6E5D]">~11 Days Left</span>
        </div>
        <div className="w-full bg-[#D7E6E2] h-2 rounded-full mt-2.5 overflow-hidden">
          <div className="bg-[#0D6E5D] h-full rounded-full" style={{ width: "64%" }} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

