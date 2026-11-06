/**
 * SetupPage.jsx
 * -------------
 * 3-step sensor setup / pairing flow.
 *
 * Step 1 – Power on your sensor   (instructions + "Pair sensor" CTA)
 * Step 2 – Connect your sensor    (Bluetooth scan + found device + "Sensor is ready" CTA)
 * Step 3 – Sensor Connected!      (success summary + "Go to Dashboard" CTA)
 *
 * Each step is a local component for clarity.
 * State management is intentionally minimal so the backend dev can
 * swap the simulated delays / mock Bluetooth scan with real BLE logic.
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ─── Shared progress bar ─────────────────────────────────────────────────────
const StepProgress = ({ current }) => (
  <div className="flex gap-2.5 mt-4">
    {[1, 2, 3].map((n) => (
      <div
        key={n}
        className={`flex-1 h-1.5 rounded-full transition-colors duration-500 ${
          n <= current ? "bg-[#0D6E5D]" : "bg-[#D6E6E2]"
        }`}
      />
    ))}
  </div>
);

// ─── Shared page shell ────────────────────────────────────────────────────────
const Shell = ({ step, onBack, children, footer }) => (
  <div className="min-h-screen bg-[#F0F6F5] flex flex-col">
    {/* Header */}
    <header className="px-5 md:px-8 pt-5 pb-3 max-w-xl w-full mx-auto">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-white text-[#0D2329] transition-colors"
          aria-label="Go back"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <div>
          <h1 className="text-[22px] md:text-2xl font-extrabold text-[#0D2329] leading-tight">
            Setup GasSense
          </h1>
          <p className="text-xs font-semibold text-[#6C807D] tracking-wide mt-0.5">
            Get connected in 3 easy steps
          </p>
        </div>
      </div>
      <StepProgress current={step} />
    </header>

    {/* Content */}
    <main className="flex-1 px-5 md:px-8 pb-4 max-w-xl w-full mx-auto space-y-4 mt-1">
      {children}
    </main>

    {/* Fixed bottom CTA */}
    <div className="px-5 md:px-8 pb-8 max-w-xl w-full mx-auto">{footer}</div>
  </div>
);

// ─── STEP 1: Power on your sensor ────────────────────────────────────────────
const StepOne = ({ onNext }) => (
  <>
    {/* Hero card */}
    <div className="bg-white rounded-[26px] p-7 shadow-sm border border-[#E9EFEF] flex flex-col items-center text-center">
      {/* Sensor illustration */}
      <div className="relative w-36 h-36 flex items-center justify-center mb-1">
        <div className="absolute inset-0 rounded-full bg-[#EBF6F9]" />
        {/* Sensor body */}
        <div className="relative z-10 w-16 h-24 bg-[#0D6E5D] rounded-2xl shadow-md flex flex-col items-center justify-between py-3">
          <div className="w-8 h-2.5 bg-[#A4E0D2] rounded" />
          {/* Power icon badge */}
          <div className="absolute -bottom-3 -right-3 w-9 h-9 rounded-full bg-white border-2 border-[#E9EFEF] flex items-center justify-center shadow">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0D6E5D]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18.36 6.64A9 9 0 1 1 5.64 5.64" />
              <line x1="12" y1="2" x2="12" y2="12" />
            </svg>
          </div>
        </div>
      </div>

      {/* Status dot */}
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D6E5D] mb-3">
        <span className="w-2 h-2 rounded-full bg-[#0D6E5D] animate-pulse" />
        Ready to pair
      </span>

      <h2 className="text-xl font-extrabold text-[#0D2329]">Power on your sensor</h2>
      <p className="text-sm text-[#6C807D] leading-relaxed mt-2 max-w-xs">
        Get your GasSense smart sensor ready before connecting it to your phone.
      </p>
    </div>

    {/* Numbered instruction list */}
    <div className="bg-white rounded-[26px] px-6 py-5 shadow-sm border border-[#E9EFEF] space-y-5">
      {[
        { num: 1, title: "Keep your sensor nearby", desc: "Place it next to your phone." },
        { num: 2, title: "Turn on the sensor", desc: "Press and hold the power button." },
        { num: 3, title: "Look for the blinking light", desc: "Your sensor is ready to pair." },
      ].map(({ num, title, desc }) => (
        <div key={num} className="flex items-start gap-4">
          <span className="w-7 h-7 shrink-0 rounded-full bg-[#EBF6F9] text-[#0D6E5D] text-sm font-bold flex items-center justify-center">
            {num}
          </span>
          <div>
            <p className="text-sm font-bold text-[#0D2329]">{title}</p>
            <p className="text-xs text-[#6C807D] mt-0.5">{desc}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Info tip */}
    <div className="border border-[#0D6E5D]/40 rounded-2xl p-4 bg-[#F2FAF7] flex items-start gap-3">
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0D6E5D] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <p className="text-xs text-[#0D6E5D] font-medium leading-relaxed">
        Wait to place the sensor under your cylinder until pairing is complete.
      </p>
    </div>

    {/* CTA */}
    <button
      onClick={onNext}
      className="w-full py-4 rounded-2xl bg-[#0D6E5D] hover:bg-[#0A574A] active:scale-[0.99] text-white font-bold text-sm shadow-[0_4px_16px_rgba(13,110,93,0.3)] transition-all"
    >
      Pair sensor
    </button>
  </>
);

// ─── STEP 2: Connect your sensor (BLE scan) ───────────────────────────────────
const StepTwo = ({ onNext }) => {
  /**
   * scanning: true  → shows spinner
   * scanning: false → shows found device
   *
   * TODO (backend dev): Replace the setTimeout with a real Bluetooth scan.
   * Call the BLE pairing API here and invoke onNext() on success.
   */
  const [scanning, setScanning] = useState(true);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setScanning(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRescan = () => {
    setScanning(true);
    setSelected(false);
    setTimeout(() => setScanning(false), 2000);
  };

  return (
    <>
      {/* Hero card */}
      <div className="bg-white rounded-[26px] p-7 shadow-sm border border-[#E9EFEF] flex flex-col items-center text-center">
        {/* Sensor ↔ Phone illustration */}
        <div className="flex items-center gap-3 my-3">
          {/* Sensor */}
          <div className="w-14 h-20 bg-[#0D6E5D] rounded-2xl shadow-md flex flex-col items-center justify-between py-3">
            <div className="w-7 h-2 bg-[#A4E0D2] rounded" />
            <div className="w-2 h-2 rounded-full bg-[#52D2B5]" />
          </div>

          {/* Bluetooth badge */}
          <div className="w-9 h-9 rounded-full bg-[#186ADE] flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z" />
            </svg>
          </div>

          {/* Phone outline */}
          <div className="w-12 h-20 rounded-xl border-2 border-[#0D6E5D] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0D6E5D]" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29z" />
            </svg>
          </div>
        </div>

        <p className="text-xs font-semibold text-[#0D6E5D] mb-3">
          {scanning ? "Scanning…" : "1 sensor found"}
        </p>
        <h2 className="text-xl font-extrabold text-[#0D2329]">Connect your sensor</h2>
        <p className="text-sm text-[#6C807D] leading-relaxed mt-2 max-w-xs">
          Turn on Bluetooth and allow nearby device access, then select your sensor below.
        </p>
      </div>

      {/* Nearby sensors list */}
      <div className="bg-white rounded-[26px] px-5 py-4 shadow-sm border border-[#E9EFEF]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-[#0D2329]">Nearby sensor</span>
          <button
            onClick={handleRescan}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#0D6E5D] hover:opacity-70 transition-opacity"
          >
            {/* Refresh icon */}
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Scan again
          </button>
        </div>

        {scanning ? (
          <div className="flex items-center gap-3 py-2">
            <div className="w-5 h-5 border-2 border-[#0D6E5D] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-[#6C807D]">Looking for sensors…</span>
          </div>
        ) : (
          <button
            onClick={() => setSelected((s) => !s)}
            className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors ${
              selected ? "border-[#0D6E5D] bg-[#F2FAF7]" : "border-[#E9EFEF] bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Chip icon */}
              <div className="w-9 h-9 rounded-xl bg-[#EBF6F9] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0D6E5D]" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <rect x="9" y="9" width="6" height="6" />
                  <line x1="9" y1="1" x2="9" y2="4" />
                  <line x1="15" y1="1" x2="15" y2="4" />
                  <line x1="9" y1="20" x2="9" y2="23" />
                  <line x1="15" y1="20" x2="15" y2="23" />
                  <line x1="20" y1="9" x2="23" y2="9" />
                  <line x1="20" y1="15" x2="23" y2="15" />
                  <line x1="1" y1="9" x2="4" y2="9" />
                  <line x1="1" y1="15" x2="4" y2="15" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-[#0D2329]">GS-V2.1-A4F7</p>
                <p className="text-xs text-[#6C807D]">Strong signal · Ready to pair</p>
              </div>
            </div>
            {/* Check circle */}
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              selected ? "border-[#0D6E5D] bg-[#0D6E5D]" : "border-[#D6E6E2]"
            }`}>
              {selected && (
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          </button>
        )}
      </div>

      {/* Bluetooth tip */}
      <div className="border border-[#0D6E5D]/40 rounded-2xl p-4 bg-[#F2FAF7] flex items-start gap-3">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0D6E5D] shrink-0 mt-0.5" fill="currentColor">
          <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z" />
        </svg>
        <p className="text-xs text-[#0D6E5D] font-medium leading-relaxed">
          Keep your phone close to the sensor while pairing. Leave Bluetooth turned on.
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={onNext}
        disabled={!selected || scanning}
        className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${
          selected && !scanning
            ? "bg-[#0D6E5D] hover:bg-[#0A574A] active:scale-[0.99] text-white shadow-[0_4px_16px_rgba(13,110,93,0.3)]"
            : "bg-[#D6E6E2] text-[#6C807D] cursor-not-allowed"
        }`}
      >
        Sensor is ready
      </button>
    </>
  );
};

// ─── STEP 3: Connected ────────────────────────────────────────────────────────
const StepThree = ({ onFinish }) => (
  <>
    {/* Hero card */}
    <div className="bg-white rounded-[26px] p-7 shadow-sm border border-[#E9EFEF] flex flex-col items-center text-center">
      <div className="relative w-36 h-36 flex items-center justify-center mb-1">
        <div className="absolute inset-0 rounded-full bg-[#EBF6F9]" />
        <div className="absolute inset-4 rounded-full bg-[#D8F0EA] opacity-60" />
        {/* Sensor + Bluetooth */}
        <div className="relative z-10 w-16 h-24 bg-[#0D6E5D] rounded-2xl shadow-md flex flex-col items-center justify-between py-3">
          <div className="w-8 h-2.5 bg-[#A4E0D2] rounded" />
          <div className="w-2 h-2 rounded-full bg-[#52D2B5]" />
        </div>
        <div className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-full bg-[#186ADE] border-2 border-white flex items-center justify-center shadow">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
            <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z" />
          </svg>
        </div>
      </div>

      <h2 className="text-xl font-extrabold text-[#0D2329] mt-2">Sensor Connected!</h2>
      <p className="text-sm text-[#6C807D] leading-relaxed mt-2 max-w-xs">
        Your GasSense smart sensor has been successfully paired to this mobile phone.
      </p>
    </div>

    {/* Device info */}
    <div className="bg-white rounded-[26px] px-6 py-5 shadow-sm border border-[#E9EFEF] space-y-4">
      {[
        {
          icon: (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <rect x="9" y="9" width="6" height="6" />
              <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
              <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
              <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" />
              <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" />
            </svg>
          ),
          label: "Device Name",
          value: "GS-V2.1-A4F7",
          valueClass: "text-[#0D2329]",
        },
        {
          icon: (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="1" y="6" width="18" height="12" rx="2" />
              <line x1="23" y1="11" x2="23" y2="13" />
            </svg>
          ),
          label: "Sensor Battery",
          value: "98% (Excellent)",
          valueClass: "text-[#0D6E5D]",
        },
        {
          icon: (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12.55a11 11 0 0114.08 0" />
              <path d="M1.42 9a16 16 0 0121.16 0" />
              <path d="M8.53 16.11a6 6 0 016.95 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
            </svg>
          ),
          label: "Signal Strength",
          value: "Strong",
          valueClass: "text-[#0D2329]",
        },
      ].map(({ icon, label, value, valueClass }) => (
        <div key={label} className="flex items-center justify-between text-sm border-b border-gray-50 pb-3 last:border-0 last:pb-0">
          <div className="flex items-center gap-2.5 text-[#0D6E5D]">
            {icon}
            <span className="font-semibold text-[#0D2329]">{label}</span>
          </div>
          <span className={`font-bold ${valueClass}`}>{value}</span>
        </div>
      ))}
    </div>

    {/* Placement tip */}
    <div className="border border-[#0D6E5D]/40 rounded-2xl p-4 bg-[#F2FAF7] flex items-start gap-3">
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0D6E5D] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <p className="text-xs text-[#0D6E5D] font-medium leading-relaxed">
        Place the sensor flat under the steel base ring of your cylinder for accurate magnetic coupling.
      </p>
    </div>

    {/* CTA */}
    <button
      onClick={() => {
        // Mark device as paired so the user goes straight to Dashboard next time.
        // TODO (backend dev): Replace this with a real API flag from your server.
        localStorage.setItem("devicePaired", "true");
        onFinish();
      }}
      className="w-full py-4 rounded-2xl bg-[#0D6E5D] hover:bg-[#0A574A] active:scale-[0.99] text-white font-bold text-sm shadow-[0_4px_16px_rgba(13,110,93,0.3)] transition-all"
    >
      Go to Dashboard
    </button>
  </>
);

// ─── Main SetupPage ───────────────────────────────────────────────────────────
const SetupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 | 2 | 3

  const goBack = () => {
    if (step > 1) setStep((s) => s - 1);
    else navigate(-1);
  };

  return (
    <Shell step={step} onBack={goBack}>
      {step === 1 && <StepOne onNext={() => setStep(2)} />}
      {step === 2 && <StepTwo onNext={() => setStep(3)} />}
      {step === 3 && <StepThree onFinish={() => navigate("/")} />}
    </Shell>
  );
};

export default SetupPage;
