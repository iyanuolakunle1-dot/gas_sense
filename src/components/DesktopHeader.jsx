/**
 * DesktopHeader.jsx
 * -----------------
 * Sleek top navigation bar displayed on tablet and desktop screens (>= 768px).
 * Hidden on mobile screens.
 */
import React from "react";
import { useNavigate } from "react-router-dom";

const DesktopHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-[#E5EFEF] sticky top-0 z-30">
      {/* Breadcrumb / Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E1F3EE] text-[#0D6E5D] text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-[#0D6E5D] animate-pulse" />
          <span>Live BLE Sync: Active</span>
        </div>
        <span className="text-xs text-[#7E918E] font-medium">
          Cylinder 12.5 kg &bull; LPG
        </span>
      </div>

      {/* Right Action Icons */}
      <div className="flex items-center gap-3">
        {/* Quick Diagnostics Link */}
        <button
          onClick={() => navigate("/diagnostics")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 hover:bg-[#F0F6F5] text-xs font-bold text-[#5F7470] transition-all"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#0D6E5D]" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>Diagnostics</span>
        </button>

        {/* Notifications Bell with Unread Badge */}
        <button
          onClick={() => navigate("/alerts")}
          className="relative p-2 rounded-xl border border-gray-200 hover:bg-[#F0F6F5] text-[#5F7470] transition-all"
          title="Alerts & Notifications"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {/* Red Notification Dot */}
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E53935]" />
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-[#0D6E5D] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            JD
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-[#0D2329] leading-tight">My Kitchen</p>
            <p className="text-[10px] text-[#7E918E]">Primary Account</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;

