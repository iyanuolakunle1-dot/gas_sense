/**
 * GaugeChart.jsx
 * --------------
 * Reusable circular arc meter for cylinder gas level.
 * 
 * Props:
 *   percent: number (0 - 100)
 *   status: string (e.g. "Good", "Low", "Critical")
 */
import React from "react";

// Helper to calculate coordinates along a circle
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

// Generates SVG path definition for an arc
const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
};

const GaugeChart = ({ percent = 64, status = "Good" }) => {
  const cx = 110;
  const cy = 110;
  const radius = 80;
  const strokeWidth = 14;

  // Arc sweeps from -220° to 40° (span = 260°)
  const startAngle = -220;
  const endAngle = 40;
  const totalSweep = endAngle - startAngle;

  // Calculate filled end angle
  const clampedPercent = Math.min(100, Math.max(0, percent));
  const progressSweep = (clampedPercent / 100) * totalSweep;
  const currentEndAngle = startAngle + progressSweep;

  const bgPath = describeArc(cx, cy, radius, startAngle, endAngle);
  const filledPath = describeArc(cx, cy, radius, startAngle, currentEndAngle);

  // Dynamic color based on percent
  let strokeColor = "#0D6E5D"; // default teal
  let badgeText = status;
  if (clampedPercent <= 10) {
    strokeColor = "#E53935"; // Red
    badgeText = "Critical";
  } else if (clampedPercent <= 25) {
    strokeColor = "#F5A623"; // Orange
    badgeText = "Low";
  }

  return (
    <div className="relative flex flex-col items-center justify-center my-1 select-none">
      <svg
        width="220"
        height="180"
        viewBox="0 0 220 180"
        className="overflow-visible"
      >
        {/* Track (background arc) */}
        <path
          d={bgPath}
          fill="none"
          stroke="#E4EBEF"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Value indicator (foreground arc) */}
        {clampedPercent > 0 && (
          <path
            d={filledPath}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        )}
      </svg>

      {/* Center content positioned in the gauge */}
      <div className="absolute top-[48px] flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[42px] font-extrabold text-[#0D2329] tracking-tight leading-none">
          {clampedPercent}%
        </span>

        {/* Status Pill */}
        <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5F2] text-[#0D6E5D]">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: strokeColor }}
          />
          <span className="text-xs font-semibold tracking-wide">
            {badgeText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
