/**
 * EmailReportModal.jsx
 * --------------------
 * Modal bottom sheet for configuring Email Report digests and frequency.
 */
import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

const FREQUENCIES = ["Daily", "Weekly", "Monthly"];

const EmailReportModal = ({ isOpen, onClose, initialEmail = "", onSave }) => {
  const [email, setEmail] = useState(initialEmail);
  const [frequency, setFrequency] = useState("Weekly");
  const [includeCharts, setIncludeCharts] = useState(true);

  if (!isOpen) return null;

  const handleSave = () => {
    if (onSave) {
      onSave({ email, frequency, includeCharts });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in">
      {/* Backdrop tap to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal / Sheet Container */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-t-[32px] md:rounded-[32px] md:mb-12 p-6 md:p-8 shadow-2xl space-y-5 animate-slide-up">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto -mt-1 mb-2" />

        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-[#0D2329]">
            Email Reports
          </h2>
          <p className="text-xs md:text-sm text-[#6C807D] font-medium mt-1">
            Get weekly usage summaries and alert digests
          </p>
        </div>

        {/* Email Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#7E918E]">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-white border border-[#D7E4E1] focus:border-[#0D6E5D] focus:ring-2 focus:ring-[#0D6E5D]/20 text-[#0D2329] font-semibold text-sm pl-11 pr-4 py-3.5 rounded-2xl outline-none"
          />
        </div>

        {/* Report Frequency Selection */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-[#6C807D] uppercase tracking-wider">
            Report Frequency
          </label>
          <div className="flex gap-2">
            {FREQUENCIES.map((freq) => {
              const active = frequency === freq;
              return (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setFrequency(freq)}
                  className={`flex-1 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    active
                      ? "bg-[#0D6E5D] text-white shadow-sm"
                      : "bg-[#F0F6F5] text-[#5F7470] hover:bg-[#E5ECE9]"
                  }`}
                >
                  {freq}
                </button>
              );
            })}
          </div>
        </div>

        {/* Include Usage Charts Toggle */}
        <div className="flex items-center justify-between py-2 border-t border-b border-gray-100">
          <span className="text-xs md:text-sm font-bold text-[#0D2329]">
            Include usage charts
          </span>
          <ToggleSwitch
            checked={includeCharts}
            onChange={() => setIncludeCharts(!includeCharts)}
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl font-bold text-xs md:text-sm text-[#0D2329] border border-gray-200 hover:bg-gray-50 active:scale-[0.99] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="w-full py-3.5 rounded-2xl font-bold text-xs md:text-sm text-white bg-[#0D6E5D] hover:bg-[#0A574A] active:scale-[0.99] shadow-md shadow-[#0D6E5D]/20 transition-all"
          >
            Save Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailReportModal;

