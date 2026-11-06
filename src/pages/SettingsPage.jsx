/**
 * SettingsPage.jsx
 * ----------------
 * App preferences, notification toggles, and alert thresholds.
 * Sections match the design exactly:
 *  1. Alert Thresholds  – Low Gas %, Critical Empty %
 *  2. Notifications     – Push, SMS, Email, Quiet Hours
 *  3. Display & Units   – Gas unit, Temperature, Theme
 *  4. Data & Privacy    – Usage sharing, Export, Clear data
 *  5. Support           – Help Centre, Report a Problem, Rate GasSense, App Version
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import ToggleSwitch from "../components/ToggleSwitch";
import SmsAlertModal from "../components/SmsAlertModal";
import EmailReportModal from "../components/EmailReportModal";
import { getSettings, updateSettings } from "../services/api";

// ─── Shared Icons ─────────────────────────────────────────────────────────────

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#8FA3A0]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);

const AlertCircleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#0D6E5D]" fill="none" stroke="currentColor" strokeWidth="2.2">
    <rect x="5" y="2" width="14" height="20" rx="3" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const MessageSquareIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#0D6E5D]" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#7E918E]" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#0D6E5D]" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

// ─── Reusable section card ─────────────────────────────────────────────────────
const SettingSection = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-[26px] px-5 py-5 shadow-sm border border-[#E9EFEF] ${className}`}>
    <h2 className="text-[15px] font-bold text-[#0D2329] mb-3">{title}</h2>
    <div className="space-y-0.5">{children}</div>
  </div>
);

// ─── Reusable setting row ──────────────────────────────────────────────────────
const SettingRow = ({ icon, label, subtext, right, onClick, onLabelClick, divider = true }) => (
  <div
    className={`flex items-center justify-between py-3 ${divider ? "border-b border-gray-50" : ""} ${onClick ? "cursor-pointer active:bg-gray-50 -mx-1 px-1 rounded-xl transition-colors" : ""}`}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      {icon && <div className="shrink-0">{icon}</div>}
      <div onClick={onLabelClick} className={onLabelClick ? "cursor-pointer" : ""}>
        <span className="text-sm font-semibold text-[#0D2329]">{label}</span>
        {subtext && (
          <span className="text-xs text-[#7E918E] ml-2 font-medium">{subtext}</span>
        )}
      </div>
    </div>
    {right && <div className="shrink-0 ml-3">{right}</div>}
  </div>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────
const SettingsPage = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // 1. Load settings on mount
  useEffect(() => {
    getSettings()
      .then((data) => setSettings(data))
      .catch((err) => console.error("Failed to load settings:", err))
      .finally(() => setLoading(false));
  }, []);

  // 2. Generic field updater – syncs to backend automatically
  const updateSettingField = (section, key, value) => {
    if (!settings) return;
    const updated = {
      ...settings,
      [section]: { ...settings[section], [key]: value },
    };
    setSettings(updated);
    updateSettings(updated).catch((err) => console.error("Sync failed:", err));
  };

  // 3. Toggle handlers
  const togglePush    = () => updateSettingField("notifications", "pushEnabled",  !settings.notifications.pushEnabled);
  const togglePrivacy = () => updateSettingField("privacy",       "usageDataSharing", !settings.privacy.usageDataSharing);

  const toggleSms = () => {
    if (!settings.notifications.smsEnabled) setIsSmsModalOpen(true);
    else updateSettingField("notifications", "smsEnabled", false);
  };

  const toggleEmail = () => {
    if (!settings.notifications.emailEnabled) setIsEmailModalOpen(true);
    else updateSettingField("notifications", "emailEnabled", false);
  };

  // 4. Modal save handlers
  const handleSaveSms = ({ phone }) => {
    const updated = {
      ...settings,
      notifications: { ...settings.notifications, smsPhone: phone, smsEnabled: true },
    };
    setSettings(updated);
    updateSettings(updated);
  };

  const handleSaveEmail = () => {
    const updated = {
      ...settings,
      notifications: { ...settings.notifications, emailEnabled: true },
    };
    setSettings(updated);
    updateSettings(updated);
  };

  // ── Loading state ──
  if (loading || !settings) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-9 h-9 border-[3px] border-[#0D6E5D] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-medium text-[#5F7470] mt-3">Loading preferences…</span>
      </div>
    );
  }

  const { alerts, notifications, display, privacy } = settings;

  return (
    <div className="min-h-full flex flex-col justify-between pb-24 md:pb-12">
      <div className="w-full max-w-xl mx-auto md:max-w-3xl px-4 sm:px-6 py-4 space-y-4">

        {/* ── Page Header ── */}
        <header className="mb-1">
          <h1 className="text-[26px] font-extrabold text-[#0D2329] tracking-tight leading-tight">
            Settings
          </h1>
          <p className="text-xs font-medium text-[#6C807D] mt-0.5">
            App &amp; sensor preferences
          </p>
        </header>

        {/* ── 1. Alert Thresholds ── */}
        <SettingSection title="Alert Thresholds">
          <SettingRow
            label="Low Gas Alert"
            icon={
              <div className="w-8 h-8 rounded-full bg-[#FEF4E5] text-[#E68A00] flex items-center justify-center">
                <BellIcon />
              </div>
            }
            right={
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-[#D97706]">{alerts.lowGasPercent}%</span>
                <span className="w-2 h-2 rounded-full bg-[#E68A00]" />
              </div>
            }
          />
          <SettingRow
            label="Critical Empty Alert"
            icon={
              <div className="w-8 h-8 rounded-full bg-[#FEECEC] text-[#E53935] flex items-center justify-center">
                <AlertCircleIcon />
              </div>
            }
            right={
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-[#E53935]">{alerts.criticalEmptyPercent}%</span>
                <span className="w-2 h-2 rounded-full bg-[#E53935]" />
              </div>
            }
            divider={false}
          />
          {/* Customize link */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => navigate("/alerts")}
              className="text-xs font-bold text-[#0D6E5D] flex items-center gap-0.5 hover:underline"
            >
              Customize <ChevronRight />
            </button>
          </div>
        </SettingSection>

        {/* ── 2. Notifications ── */}
        <SettingSection title="Notifications">
          <SettingRow
            label="Push Notifications"
            icon={<PhoneIcon />}
            right={<ToggleSwitch checked={notifications.pushEnabled} onChange={togglePush} />}
          />
          <SettingRow
            label="SMS Alerts"
            subtext={notifications.smsPhone}
            icon={<MessageSquareIcon />}
            onLabelClick={() => setIsSmsModalOpen(true)}
            right={<ToggleSwitch checked={notifications.smsEnabled} onChange={toggleSms} />}
          />
          <SettingRow
            label="Email Reports"
            icon={<MailIcon />}
            onLabelClick={() => setIsEmailModalOpen(true)}
            right={<ToggleSwitch checked={notifications.emailEnabled} onChange={toggleEmail} />}
          />
          <SettingRow
            label="Quiet Hours"
            icon={<MoonIcon />}
            right={
              <div className="flex items-center gap-0.5 text-sm font-bold text-[#0D2329]">
                {notifications.quietHours} <ChevronRight />
              </div>
            }
            divider={false}
          />
        </SettingSection>

        {/* ── 3. Display & Units ── */}
        <SettingSection title="Display &amp; Units">
          <SettingRow
            label="Gas Unit"
            right={
              <div className="flex items-center gap-0.5 font-bold text-[#0D2329] text-sm">
                {display.gasUnit} <ChevronRight />
              </div>
            }
          />
          <SettingRow
            label="Temperature"
            right={
              <div className="flex items-center gap-0.5 font-bold text-[#0D2329] text-sm">
                {display.temperature} <ChevronRight />
              </div>
            }
          />
          <SettingRow
            label="Theme"
            right={
              <div className="flex items-center gap-0.5 font-bold text-[#0D2329] text-sm">
                {display.theme} <ChevronRight />
              </div>
            }
            divider={false}
          />
        </SettingSection>

        {/* ── 4. Data & Privacy ── */}
        <SettingSection title="Data &amp; Privacy">
          <SettingRow
            label="Usage Data Sharing"
            right={<ToggleSwitch checked={privacy.usageDataSharing} onChange={togglePrivacy} />}
          />
          <SettingRow
            label="Export Usage History"
            right={<ChevronRight />}
            onClick={() => alert("Usage history export generated as CSV.")}
          />
          <SettingRow
            label="Clear Local Data"
            right={<ChevronRight />}
            onClick={() => {
              if (window.confirm("Clear all locally cached sensor data?")) {
                localStorage.removeItem("devicePaired");
                alert("Local data cleared.");
              }
            }}
            divider={false}
          />
        </SettingSection>

        {/* ── 5. Support ── */}
        <SettingSection title="Support">
          <SettingRow
            label="Help Centre"
            right={<ChevronRight />}
            onClick={() => window.open("https://google.com", "_blank")}
          />
          <SettingRow
            label="Report a Problem"
            right={<ChevronRight />}
            onClick={() => alert("Contact support@gassense.io")}
          />
          <SettingRow
            label="Rate GasSense"
            right={<ChevronRight />}
            onClick={() => alert("Thank you! Redirecting to app store…")}
          />
          <SettingRow
            label="App Version"
            right={<span className="font-bold text-[#0D2329] text-sm">v1.2.0 (Build 48)</span>}
            divider={false}
          />
        </SettingSection>

      </div>

      {/* Bottom navigation */}
      <BottomNav active="settings" />

      {/* SMS modal */}
      <SmsAlertModal
        isOpen={isSmsModalOpen}
        onClose={() => setIsSmsModalOpen(false)}
        initialPhone={notifications.smsPhone.replace("+234 ", "")}
        onSave={handleSaveSms}
      />

      {/* Email modal */}
      <EmailReportModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSave={handleSaveEmail}
      />
    </div>
  );
};

export default SettingsPage;
