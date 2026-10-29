/**
 * DevicePage.jsx
 * --------------
 * Sensor hardware details, diagnostics, and device controls.
 * Fully responsive: mobile-first + responsive wide layout for desktop.
 */
import React, { useState, useEffect } from "react";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";
import CylinderSensorIllustration from "../components/CylinderSensorIllustration";
import { getDeviceInfo, recalibrateSensor, unpairDevice } from "../services/api";

const DevicePage = () => {
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    getDeviceInfo()
      .then((data) => {
        setDevice(data);
      })
      .catch((err) => {
        console.error("Failed to load device info:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleRecalibrate = async () => {
    setStatusMessage("Calibrating sensor... Please wait.");
    try {
      const res = await recalibrateSensor();
      setStatusMessage(res.message || "Sensor calibrated successfully.");
    } catch {
      setStatusMessage("Calibration failed. Please try again.");
    }
    setTimeout(() => setStatusMessage(""), 4000);
  };

  const handleUnpair = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to unpair this GasSense sensor?"
    );
    if (!confirmed) return;

    setStatusMessage("Unpairing sensor...");
    try {
      await unpairDevice();
      setStatusMessage("Device unpaired successfully.");
    } catch {
      setStatusMessage("Unpair failed. Check connection.");
    }
  };

  if (loading || !device) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20">
        <div className="w-9 h-9 border-[3px] border-[#0D6E5D] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-medium text-[#5F7470] mt-3">Reading device specs...</span>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col justify-between pb-24 md:pb-12">
      <div>
        <StatusBar time="9:41" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6 space-y-6">
          {/* Header */}
          <header>
            <h1 className="text-[26px] sm:text-3xl font-extrabold text-[#0D2329] tracking-tight leading-tight">
              My Device
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[#6C807D] tracking-wide mt-0.5">
              GasSense Smart Sensor &bull; Firmware Telemetry &amp; Diagnostics
            </p>
          </header>

          <main className="space-y-6">
            {/* Identity & Status Card */}
            <div className="bg-white rounded-[26px] p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E9EFEF]">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-32 shrink-0 flex items-center justify-center">
                  <CylinderSensorIllustration className="w-32 h-auto" />
                </div>

                <div className="space-y-2 flex-1 text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0D2329]">
                    {device.name}
                  </h2>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E1F3EE] text-[#0D6E5D]">
                    <span className="w-2 h-2 rounded-full bg-[#0D6E5D]" />
                    <span className="text-xs font-bold">
                      Connected via {device.connectionType}
                    </span>
                  </div>

                  <div className="pt-1">
                    <p className="text-xs text-[#7E918E]">Serial Number</p>
                    <p className="text-sm font-bold text-[#0D2329]">
                      {device.serialNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* Note banner */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-start gap-2.5 text-xs text-[#5F7470]">
                <span className="w-2 h-2 rounded-full bg-[#0D6E5D] shrink-0 mt-1" />
                <p className="leading-relaxed">
                  This sensor is currently paired to your account and actively monitoring one cylinder.
                </p>
              </div>
            </div>

            {/* 2-Column Specs Layout on Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Device Details Card */}
              <div className="bg-white rounded-[26px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E9EFEF] space-y-4">
                <h3 className="text-[15px] sm:text-base font-bold text-[#0D2329]">
                  Device Details
                </h3>

                <div className="flex items-center justify-between py-2 border-b border-gray-50 text-xs sm:text-sm">
                  <span className="text-[#6C807D] font-medium">Firmware Version</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#0D2329]">{device.firmware}</span>
                    <span className="text-[10px] font-bold text-[#0D6E5D] bg-[#E1F3EE] px-2 py-0.5 rounded-full">
                      {device.firmwareStatus}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-50 text-xs sm:text-sm">
                  <span className="text-[#6C807D] font-medium">Sensor Battery</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 font-bold text-[#0D2329]">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#0D6E5D]" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <path d="M12 2c-3 4-5 7-5 10a5 5 0 0010 0c0-3-2-6-5-10z" />
                      </svg>
                      <span>{device.batteryPercent}%</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#0D6E5D] bg-[#E1F3EE] px-2 py-0.5 rounded-full">
                      {device.batteryLabel}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-50 text-xs sm:text-sm">
                  <span className="text-[#6C807D] font-medium">Signal Strength</span>
                  <span className="font-bold text-[#0D2329]">{device.signalStrength}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-50 text-xs sm:text-sm">
                  <span className="text-[#6C807D] font-medium">Calibration Date</span>
                  <span className="font-bold text-[#0D2329]">{device.calibrationDate}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-50 text-xs sm:text-sm">
                  <span className="text-[#6C807D] font-medium">Next Calibration</span>
                  <span className="font-bold text-[#0D2329]">{device.nextCalibration}</span>
                </div>

                <div className="flex items-center justify-between py-2 text-xs sm:text-sm">
                  <span className="text-[#6C807D] font-medium">Paired Since</span>
                  <span className="font-bold text-[#0D2329]">{device.pairedSince}</span>
                </div>
              </div>

              {/* Current Cylinder Card & Actions */}
              <div className="space-y-6">
                <div className="bg-white rounded-[26px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E9EFEF] space-y-4">
                  <h3 className="text-[15px] sm:text-base font-bold text-[#0D2329]">
                    Current Cylinder
                  </h3>

                  <div className="flex items-center justify-between py-2 border-b border-gray-50 text-xs sm:text-sm">
                    <span className="text-[#6C807D] font-medium">Cylinder Size</span>
                    <span className="font-bold text-[#0D2329]">{device.cylinder.size}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-50 text-xs sm:text-sm">
                    <span className="text-[#6C807D] font-medium">Gas Type</span>
                    <span className="font-bold text-[#0D2329]">{device.cylinder.gasType}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 text-xs sm:text-sm">
                    <span className="text-[#6C807D] font-medium">Provider</span>
                    <span className="font-bold text-[#0D2329]">{device.cylinder.provider}</span>
                  </div>
                </div>

                {/* Toast / Status banner */}
                {statusMessage && (
                  <div className="bg-[#E1F3EE] text-[#0D6E5D] text-xs font-bold rounded-2xl py-3.5 px-4 text-center animate-fade-in shadow-xs">
                    {statusMessage}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3 pt-1">
                  <button
                    onClick={handleRecalibrate}
                    className="w-full py-3.5 rounded-2xl font-bold text-sm text-[#0D6E5D] border-2 border-[#0D6E5D] bg-transparent hover:bg-[#E1F3EE]/40 active:scale-[0.99] transition-all"
                  >
                    Recalibrate Sensor
                  </button>

                  <button
                    onClick={handleUnpair}
                    className="w-full py-2.5 rounded-2xl font-bold text-sm text-[#E53935] bg-transparent hover:bg-red-50 active:scale-[0.99] transition-all"
                  >
                    Unpair Device
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <BottomNav active="device" />
    </div>
  );
};

export default DevicePage;
