/**
 * BottomNav.jsx
 * -------------
 * Shared bottom navigation bar for GasSense.
 * 
 * Props:
 *   active: "home" | "trends" | "device" | "settings"
 */
import React from "react";
import { useNavigate } from "react-router-dom";

// Home Icon
const HomeIcon = ({ active }) => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6 transition-transform group-active:scale-95"
    fill="none"
    stroke={active ? "#0D6E5D" : "#5F7470"}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 10.5L12 3l9 7.5v9.5a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9.5z" />
  </svg>
);

// Trends (Bar chart) Icon
const TrendsIcon = ({ active }) => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6 transition-transform group-active:scale-95"
    fill={active ? "#0D6E5D" : "#5F7470"}
  >
    <rect x="3.5" y="13" width="3.5" height="8" rx="1.5" />
    <rect x="10.25" y="7" width="3.5" height="14" rx="1.5" />
    <rect x="17" y="3" width="3.5" height="18" rx="1.5" />
  </svg>
);

// Device (Sensor shape) Icon
const DeviceIcon = ({ active }) => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6 transition-transform group-active:scale-95"
    fill="none"
    stroke={active ? "#0D6E5D" : "#5F7470"}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4.5" y="4" width="15" height="16" rx="4.5" />
    <line x1="8.5" y1="9" x2="15.5" y2="9" strokeWidth="2.5" />
  </svg>
);

// Settings (Cog) Icon
const SettingsIcon = ({ active }) => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6 transition-transform group-active:scale-95"
    fill="none"
    stroke={active ? "#0D6E5D" : "#5F7470"}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const NAV_ITEMS = [
  { id: "home", label: "Home", route: "/", Icon: HomeIcon },
  { id: "trends", label: "Trends", route: "/trends", Icon: TrendsIcon },
  { id: "device", label: "Device", route: "/device", Icon: DeviceIcon },
  { id: "settings", label: "Settings", route: "/settings", Icon: SettingsIcon },
];

const BottomNav = ({ active = "home" }) => {
  const navigate = useNavigate();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] z-50">
      <div className="flex items-center justify-around h-[70px] px-3 pb-2 pt-1">
        {NAV_ITEMS.map(({ id, label, route, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => navigate(route)}
              className="group flex flex-col items-center justify-center flex-1 py-1 transition-all"
            >
              <div className="relative">
                <Icon active={isActive} />
              </div>
              <span
                className={`text-[11px] font-medium mt-1 tracking-tight transition-colors ${
                  isActive ? "text-[#0D6E5D] font-bold" : "text-[#627774]"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
