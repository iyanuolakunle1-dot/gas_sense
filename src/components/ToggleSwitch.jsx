/**
 * ToggleSwitch.jsx
 * ----------------
 * Animated toggle switch component for settings and preferences.
 */
import React from "react";

const ToggleSwitch = ({ checked, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex items-center w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#0D6E5D] shrink-0 ${
      checked ? "bg-[#0D6E5D]" : "bg-gray-200"
    }`}
  >
    <span
      className={`inline-block w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
        checked ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

export default ToggleSwitch;
