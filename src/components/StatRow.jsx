/**
 * StatRow.jsx
 * -----------
 * Key-value row component with optional status badge.
 * Used in hardware specifications and cylinder details.
 */
import React from "react";

const StatRow = ({ label, value, badge, divider = true }) => (
  <div className={`flex items-center justify-between py-2.5 ${divider ? "border-b border-gray-50" : ""}`}>
    <span className="text-xs sm:text-sm text-[#6C807D] font-medium">{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-xs sm:text-sm font-bold text-[#0D2329]">{value}</span>
      {badge && (
        <span className="text-[10px] font-bold text-[#0D6E5D] bg-[#E1F3EE] px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </div>
  </div>
);

export default StatRow;
