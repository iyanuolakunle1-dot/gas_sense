/**
 * SettingsPage.jsx
 * ----------------
 * App preferences, notification toggles, and alert thresholds.
 * Clean, modular, and easy for any backend developer to maintain.
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import ToggleSwitch from "../components/ToggleSwitch";
import SmsAlertModal from "../components/SmsAlertModal";
import EmailReportModal from "../components/EmailReportModal";
import { getSettings, updateSettings } from "../services/api";

// Reusable SVG Icons for the settings rows
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

// Reusable card wrapper for settings sections
const SettingSection = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-[26px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E9EFEF] space-y-4 ${className}`}>
    <h2 className="text-[15px] sm:text-base font-bold text-[#0D2329]">{title}</h2>
    <div className="space-y-1">{children}</div>
  </div>
);

// Reusable setting row
const SettingRow = ({ icon, label, subtext, right, onClick, onLabelClick, divider = true }) => (
  <div className={`flex items-center justify-between py-2.5 ${divider ? "border-b border-gray-50" : ""} ${onClick ? "cursor-pointer hover:bg-gray-50/50 -mx-2 px-2 rounded-xl transition-colors" : ""}`} onClick={onClick}>
    <div className="flex items-center gap-3">
      {icon && <div className="shrink-0">{icon}</div>}
      <div onClick={onLabelClick} className={onLabelClick ? "cursor-pointer group" : ""}>
        <span className={`text-xs sm:text-sm font-semibold text-[#0D2329] ${onLabelClick ? "group-hover:text-[#0D6E5D]" : ""}`}>
          {label}
        </span>
        {subtext && (
          <span className="text-[11px] sm:text-xs text-[#7E918E] ml-2 font-medium underline">
            {subtext}
          </span>
        )}
      </div>
    </div>
    {right && <div className="shrink-0">{right}</div>}
  </div>
);

const SettingsPage = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Bottom-sheet modals
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // 1. Fetch user preferences on mount
  useEffect(() => {
    getSettings()
      .then((data) => setSettings(data))
      .catch((err) => console.error("Failed to load settings:", err))
      .finally(() => setLoading(false));
  }, []);

  // 2. Generic helper to update a setting field and sync with backend API
  const updateSettingField = (section, key, newValue) => {
    if (!settings) return;
    const updated = {
      ...settings,
      [section]: {
        ...settings[section],
        [key]: newValue,
      },
    };
    setSettings(updated);
    updateSettings(updated).catch((err) => {
      console.error("Failed to sync settings:", err);
    });
  };

  // 3. Clear, named toggle handlers
  const togglePush = () => {
    updateSettingField("notifications", "pushEnabled", !settings.notifications.pushEnabled);
  };

  const toggleSms = () => {
    if (!settings.notifications.smsEnabled) {
      setIsSmsModalOpen(true);
    } else {
      updateSettingField("notifications", "smsEnabled", false);
    }
  };

  const toggleEmail = () => {
    if (!settings.notifications.emailEnabled) {
      setIsEmailModalOpen(true);
    } else {
      updateSettingField("notifications", "emailEnabled", false);
    }
  };

  const togglePrivacy = () => {
    updateSettingField("privacy", "usageDataSharing", !settings.privacy.usageDataSharing);
  };

  // 4. Modal save handlers
  const handleSaveSms = ({ phone }) => {
    const updated = {
      ...settings,
      notifications: {
        ...settings.notifications,
        smsPhone: phone,
        smsEnabled: true,
      },
    };
    setSettings(updated);
    updateSettings(updated);
  };

  const handleSaveEmail = () => {
    const updated = {
      ...settings,
      notifications: {
        ...settings.notifications,
        emailEnabled: true,
      },
    };
    setSettings(updated);
    updateSettings(updated);
  };

  if (loading || !settings) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20">
        <div className="w-9 h-9 border-[3px] border-[#0D6E5D] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-medium text-[#5F7470] mt-3">Loading preferences...</span>
      </div>
    );
  }

  const { alerts, notifications, display, privacy } = settings;

  return (
    <div className="min-h-full flex flex-col justify-between pb-24 md:pb-12">
      <div>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6 space-y-6">
          {/* Page Header */}
          <header>
            <h1 className="text-[26px] sm:text-3xl font-extrabold text-[#0D2329] tracking-tight leading-tight">
              Settings
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[#6C807D] tracking-wide mt-0.5">
              App alerts, notifications, unit displays, and sensor preferences
            </p>
          </header>

          <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section 1: Alert Thresholds */}
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
                    <span className="text-xs sm:text-sm font-bold text-[#D97706]">{alerts.lowGasPercent}%</span>
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
                    <span className="text-xs sm:text-sm font-bold text-[#E53935]">{alerts.criticalEmptyPercent}%</span>
                    <span className="w-2 h-2 rounded-full bg-[#E53935]" />
                  </div>
                }
                divider={false}
              />
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => navigate("/alerts")}
                  className="text-xs font-bold text-[#0D6E5D] flex items-center gap-1 hover:underline"
                >
                  Customize &amp; View History <ChevronRight />
                </button>
              </div>
            </SettingSection>

            {/* Section 2: Notifications */}
            <SettingSection title="Notifications">
              <SettingRow
                label="Push Notifications"
                icon={<PhoneIcon />}
                right={
                  <ToggleSwitch
                    checked={notifications.pushEnabled}
                    onChange={togglePush}
                  />
                }
              />
              <SettingRow
                label="SMS Alerts"
                subtext={notifications.smsPhone}
                icon={<MessageSquareIcon />}
                onLabelClick={() => setIsSmsModalOpen(true)}
                right={
                  <ToggleSwitch
                    checked={notifications.smsEnabled}
                    onChange={toggleSms}
                  />
                }
              />
              <SettingRow
                label="Email Reports"
                icon={<MailIcon />}
                onLabelClick={() => setIsEmailModalOpen(true)}
                right={
                  <ToggleSwitch
                    checked={notifications.emailEnabled}
                    onChange={toggleEmail}
                  />
                }
              />
              <SettingRow
                label="Quiet Hours"
                icon={<MoonIcon />}
                right={
                  <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0D2329]">
                    <span>{notifications.quietHours}</span>
                    <ChevronRight />
                  </div>
                }
                divider={false}
              />
            </SettingSection>

            {/* Section 3: Display & Units */}
            <SettingSection title="Display &amp; Units">
              <SettingRow
                label="Gas Unit"
                right={
                  <div className="flex items-center gap-1 font-bold text-[#0D2329] text-xs sm:text-sm">
                    <span>{display.gasUnit}</span>
                    <ChevronRight />
                  </div>
                }
              />
              <SettingRow
                label="Temperature"
                right={
                  <div className="flex items-center gap-1 font-bold text-[#0D2329] text-xs sm:text-sm">
                    <span>{display.temperature}</span>
                    <ChevronRight />
                  </div>
                }
              />
              <SettingRow
                label="Theme"
                right={
                  <div className="flex items-center gap-1 font-bold text-[#0D2329] text-xs sm:text-sm">
                    <span>{display.theme}</span>
                    <ChevronRight />
                  </div>
                }
                divider={false}
              />
            </SettingSection>

            {/* Section 4: Data & Privacy */}
            <SettingSection title="Data &amp; Privacy">
              <SettingRow
                label="Usage Data Sharing"
                right={
                  <ToggleSwitch
                    checked={privacy.usageDataSharing}
                    onChange={togglePrivacy}
                  />
                }
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
                    localStorage.clear();
                    alert("Local cache cleared.");
                  }
                }}
                divider={false}
              />
            </SettingSection>

            {/* Section 5: Support & Diagnostics */}
            <SettingSection title="Support &amp; Troubleshooting" className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                <SettingRow
                  label="Sensor Health &amp; Diagnostics"
                  right={<ChevronRight />}
                  onClick={() => navigate("/diagnostics")}
                />
                <SettingRow
                  label="Pair New Sensor (Setup Wizard)"
                  right={<ChevronRight />}
                  onClick={() => navigate("/setup")}
                />
                <SettingRow
                  label="Help Centre"
                  right={<ChevronRight />}
                  onClick={() => window.open("https://google.com", "_blank")}
                />
                <SettingRow
                  label="Report a Problem"
                  right={<ChevronRight />}
                  onClick={() => alert("Report form: Please contact support@gassense.io")}
                />
                <SettingRow
                  label="App Version"
                  right={<span className="font-bold text-[#0D2329] text-xs sm:text-sm">v1.2.0 (Build 48)</span>}
                  divider={false}
                />
              </div>
            </SettingSection>
          </main>
        </div>
      </div>

      <BottomNav active="settings" />

      {/* SMS Configuration Modal Sheet */}
      <SmsAlertModal
        isOpen={isSmsModalOpen}
        onClose={() => setIsSmsModalOpen(false)}
        initialPhone={notifications.smsPhone.replace("+234 ", "")}
        onSave={handleSaveSms}
      />

      {/* Email Report Configuration Modal Sheet */}
      <EmailReportModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSave={handleSaveEmail}
      />
    </div>
  );
};

export default SettingsPage;
