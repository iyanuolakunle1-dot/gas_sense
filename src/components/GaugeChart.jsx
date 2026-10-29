/**
 * GaugeChart.jsx
 * --------------
 * Perfectly centered circular arc meter for cylinder gas level.
 * Built with native SVG geometry so the percentage and status pill
 * remain mathematically centered at all screen sizes and resolutions.
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
  const cy = 100;
  const radius = 78;
  const strokeWidth = 14;

  // Arc sweeps from -220° to 40° (span = 260°)
  const startAngle = -220;
  const endAngle = 40;
  const totalSweep = endAngle - startAngle;

  // Clamp percent (0 - 100)
  const clampedPercent = Math.min(100, Math.max(0, Number(percent) || 0));
  const progressSweep = (clampedPercent / 100) * totalSweep;
  const currentEndAngle = startAngle + progressSweep;

  const bgPath = describeArc(cx, cy, radius, startAngle, endAngle);
  const filledPath = describeArc(cx, cy, radius, startAngle, currentEndAngle);

  // Dynamic status color
  let strokeColor = "#0D6E5D"; // Teal (Good)
  let badgeText = status || "Good";
  if (clampedPercent <= 10) {
    strokeColor = "#E53935"; // Red (Critical)
    badgeText = "Critical";
  } else if (clampedPercent <= 25) {
    strokeColor = "#E68A00"; // Orange (Low)
    badgeText = "Low";
  }

  return (
    <div className="flex flex-col items-center justify-center w-full my-2 select-none">
      <svg
        viewBox="0 0 220 190"
        className="w-56 sm:w-64 max-w-full h-auto overflow-visible"
        aria-label={`Gas level ${clampedPercent} percent, status: ${badgeText}`}
      >
        {/* Background Track (Grey Arc) */}
        <path
          d={bgPath}
          fill="none"
          stroke="#E2EBE8"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Foreground Progress (Colored Arc) */}
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

        {/* Centered Percentage Text */}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#0D2329"
          style={{
            fontSize: "44px",
            fontWeight: "800",
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          {clampedPercent}%
        </text>

        {/* Centered Status Badge Pill */}
        <g transform={`translate(${cx}, ${cy + 30})`}>
          {/* Pill background */}
          <rect
            x="-38"
            y="-12"
            width="76"
            height="24"
            rx="12"
            fill="#EAF5F2"
          />
          {/* Status Dot */}
          <circle cx="-20" cy="0" r="3.5" fill={strokeColor} />
          {/* Status Text */}
          <text
            x="-10"
            y="1"
            dominantBaseline="middle"
            fill="#0D6E5D"
            style={{
              fontSize: "12px",
              fontWeight: "700",
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            {badgeText}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default GaugeChart;
