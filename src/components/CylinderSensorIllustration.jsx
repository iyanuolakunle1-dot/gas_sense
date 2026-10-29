/**
 * CylinderSensorIllustration.jsx
 * ------------------------------
 * Illustration of the gas cylinder neck, valve, and mounted smart sensor.
 * Accurately represents the hardware shown in the GasSense mobile app.
 */
import React from "react";

const CylinderSensorIllustration = ({ className = "w-44 h-auto" }) => {
  return (
    <svg
      viewBox="0 0 240 180"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Cylinder gradient (orange copper) */}
        <radialGradient
          id="cylGrad"
          cx="50%"
          cy="30%"
          r="70%"
          fx="40%"
          fy="20%"
        >
          <stop offset="0%" stopColor="#F98A52" />
          <stop offset="40%" stopColor="#E26127" />
          <stop offset="90%" stopColor="#BF430D" />
          <stop offset="100%" stopColor="#9E3205" />
        </radialGradient>

        {/* Valve brass metallic gradient */}
        <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C99859" />
          <stop offset="35%" stopColor="#E8BF7F" />
          <stop offset="70%" stopColor="#D4A76A" />
          <stop offset="100%" stopColor="#8C622C" />
        </linearGradient>

        {/* Sensor dark matte plastic gradient */}
        <linearGradient id="sensorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A565C" />
          <stop offset="50%" stopColor="#2E383D" />
          <stop offset="100%" stopColor="#1E262A" />
        </linearGradient>

        {/* Drop shadow */}
        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Ground soft shadow */}
      <ellipse cx="120" cy="172" rx="75" ry="7" fill="#000" opacity="0.08" />

      {/* Cylinder Top Dome */}
      <g filter="url(#softShadow)">
        <path
          d="M45 170 C45 110, 75 92, 120 92 C165 92, 195 110, 195 170 Z"
          fill="url(#cylGrad)"
        />

        {/* Handle collar ring on cylinder */}
        <path
          d="M58 140 C58 126, 75 112, 100 110 L102 120 C85 122, 70 132, 70 144 Z"
          fill="#D6521A"
          opacity="0.8"
        />
        <path
          d="M182 140 C182 126, 165 112, 140 110 L138 120 C155 122, 170 132, 170 144 Z"
          fill="#B03E0B"
          opacity="0.8"
        />

        {/* Valve neck collar */}
        <rect x="108" y="80" width="24" height="15" rx="3" fill="#8C622C" />
        <rect x="110" y="81" width="20" height="13" rx="2" fill="url(#brassGrad)" />

        {/* Valve Pipe & Spout */}
        <path
          d="M112 56 H128 V80 H112 Z"
          fill="url(#brassGrad)"
        />
        <rect x="104" y="66" width="10" height="8" rx="1.5" fill="#C99859" />

        {/* Valve Handwheel (Red/Maroon top handle) */}
        <path
          d="M98 34 C98 30, 142 30, 142 34 L138 43 C138 45, 102 45, 102 43 Z"
          fill="#8A2626"
        />
        <ellipse cx="120" cy="34" rx="24" ry="6" fill="#AB3636" />
        <ellipse cx="120" cy="33" rx="14" ry="3.5" fill="#C94848" />
        <circle cx="120" cy="33" r="3.5" fill="#581616" />

        {/* Smart Sensor Body (attached to valve nozzle) */}
        <rect
          x="122"
          y="54"
          width="32"
          height="24"
          rx="5"
          fill="url(#sensorGrad)"
          stroke="#5C6970"
          strokeWidth="0.8"
        />

        {/* Sensor bevel detail */}
        <rect
          x="125"
          y="57"
          width="26"
          height="18"
          rx="3"
          fill="#1C2428"
          opacity="0.4"
        />

        {/* Sensor Live LED Indicator (Green glow) */}
        <circle cx="130" cy="66" r="2.2" fill="#00E676" />
        <circle cx="130" cy="66" r="4.5" fill="#00E676" opacity="0.3" />

        {/* Tiny Sensor Brand Marking */}
        <rect x="136" y="65" width="12" height="2" rx="1" fill="#6B7C82" />
      </g>
    </svg>
  );
};

export default CylinderSensorIllustration;

