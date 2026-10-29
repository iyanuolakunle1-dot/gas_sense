/**
 * SmsAlertModal.jsx
 * -----------------
 * Modal bottom sheet for configuring SMS alert destination & preferences.
 */
import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

const SmsAlertModal = ({ isOpen, onClose, initialPhone = "812 345 6789", onSave }) => {
  const [phone, setPhone] = useState(initialPhone);
  const [sendTest, setSendTest] = useState(true);

  if (!isOpen) return null;

  const handleSave = () => {
    if (onSave) {
      onSave({ phone: `+234 ${phone}`, sendTest });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in">
      {/* Backdrop tap to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Bottom Sheet Sheet Container */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-t-[32px] md:rounded-[32px] md:mb-12 p-6 md:p-8 shadow-2xl space-y-5 animate-slide-up">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto -mt-1 mb-2" />

        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-[#0D2329]">
            SMS Alerts
          </h2>
          <p className="text-xs md:text-sm text-[#6C807D] font-medium mt-1">
            Receive low gas and critical alerts via text message
          </p>
        </div>

        {/* Phone Input with Country Code */}
        <div>
          <div className="flex gap-2.5">
            <div className="bg-[#F0F6F5] text-[#0D2329] font-bold text-sm px-4 py-3.5 rounded-2xl flex items-center justify-center border border-[#E0ECE8] shrink-0">
              +234
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="812 345 6789"
              className="flex-1 bg-white border-2 border-[#0D6E5D] focus:ring-2 focus:ring-[#0D6E5D]/20 text-[#0D2329] font-semibold text-sm px-4 py-3.5 rounded-2xl outline-none"
            />
          </div>
          <p className="text-[11px] text-[#7E918E] mt-2">
            Standard SMS rates may apply
          </p>
        </div>

        {/* Send Test SMS Toggle */}
        <div className="flex items-center justify-between py-2 border-t border-b border-gray-100">
          <span className="text-xs md:text-sm font-bold text-[#0D2329]">
            Send test SMS on save
          </span>
          <ToggleSwitch checked={sendTest} onChange={() => setSendTest(!sendTest)} />
        </div>

        {/* Actions Row */}
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
            Save Number
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmsAlertModal;

