/**
 * StepProgress.jsx
 * ----------------
 * Multi-segment progress indicator for onboarding / pairing flows.
 */
import React from "react";

const StepProgress = ({ currentStep = 3, totalSteps = 3 }) => (
  <div className="flex gap-2.5 w-full">
    {Array.from({ length: totalSteps }).map((_, i) => (
      <div
        key={i}
        className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
          i < currentStep ? "bg-[#0D6E5D]" : "bg-[#D4EDE6]"
        }`}
      />
    ))}
  </div>
);

export default StepProgress;
