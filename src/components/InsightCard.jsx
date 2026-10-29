/**
 * InsightCard.jsx
 * ---------------
 * Reusable analytics insight card with icon circle, metric label, and summary.
 */
import React from "react";

const InsightCard = ({ icon, label, value, iconBg = "bg-[#D9F2EC]", iconColor = "text-[#0D6E5D]" }) => (
  <div className="flex items-center gap-3.5 bg-white rounded-2xl p-5 shadow-sm border border-[#E9EFEF]">
    <div className={`w-11 h-11 rounded-full ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
      {icon}
    </div>
    <div>
      <p className="text-[11px] font-semibold text-[#7E918E]">{label}</p>
      <p className="text-sm font-bold text-[#0D2329] mt-0.5 leading-snug">{value}</p>
    </div>
  </div>
);

export default InsightCard;
