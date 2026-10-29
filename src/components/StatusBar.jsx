/**
 * StatusBar.jsx
 * -------------
 * Clean mobile status bar (time, signal, wifi, battery) matching the design.
 * Hidden on tablets & desktop (md:hidden).
 */
import React from "react";

const StatusBar = ({ time = "9:41" }) => {
  return (
    <div className="md:hidden flex justify-between items-center px-6 pt-3 pb-1 text-[#0F2228] select-none">
      {/* Time */}
      <span className="text-[13px] font-semibold tracking-tight">{time}</span>

      {/* Status Icons */}
      <div className="flex items-center gap-1.5">
        {/* Cellular Signal (4 bars) */}
        <svg viewBox="0 0 18 12" className="w-4 h-3" fill="currentColor">
          <rect x="0" y="8" width="2.5" height="4" rx="0.5" />
          <rect x="4" y="5.5" width="2.5" height="6.5" rx="0.5" />
          <rect x="8" y="3" width="2.5" height="9" rx="0.5" />
          <rect x="12" y="0.5" width="2.5" height="11.5" rx="0.5" />
        </svg>

        {/* Wifi Icon */}
        <svg viewBox="0 0 16 12" className="w-3.5 h-3" fill="currentColor">
          <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-4.24-2.83a6 6 0 018.48 0 .75.75 0 101.06-1.06 7.5 7.5 0 00-10.6 0 .75.75 0 001.06 1.06zm-2.12-2.12a9 9 0 0112.72 0 .75.75 0 101.06-1.06 10.5 10.5 0 00-14.84 0 .75.75 0 001.06 1.06z" />
        </svg>

        {/* Battery Icon */}
        <div className="flex items-center gap-0.5">
          <div className="w-5 h-2.5 rounded-[3px] border border-current p-[1px] flex items-center">
            <div className="w-full h-full bg-current rounded-[1.5px]" />
          </div>
          <div className="w-[1.5px] h-1 bg-current rounded-r-sm" />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
