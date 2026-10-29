// =============================================================
// src/data/mockData.js
// Central mock data store for GasSense.
// All hardcoded values live here — replace with real API responses.
// =============================================================

/**
 * Dashboard data
 * TODO: Replace with API response from GET /api/dashboard
 */
export const mockDashboardData = {
  device: {
    name: "My GasSense",
    model: "GS-V2.1",
    serialNumber: "A4F72E",
    connected: true,
    connectionType: "Bluetooth",
  },
  cylinder: {
    totalWeight: 12.5,       // kg
    remainingWeight: 8.0,    // kg
    percentRemaining: 64,    // %
    status: "Good",          // Good | Low | Critical
    daysLeft: 11,
  },
  todayUsage: {
    kg: 0.35,
    withinRange: true,
    label: "Within usual range",
  },
  alertLimit: {
    percent: 20,
    notifyViaSMS: true,
  },
};

/**
 * Trends / usage analytics data
 * TODO: Replace with API response from GET /api/trends?period=weekly
 */
export const mockTrendsData = {
  weekly: {
    totalKg: 3.47,
    bars: [
      { day: "Mon", kg: 0.45 },
      { day: "Tue", kg: 0.32 },
      { day: "Wed", kg: 0.58 },
      { day: "Thu", kg: 0.40 },
      { day: "Fri", kg: 0.35 },
      { day: "Sat", kg: 0.62 },
      { day: "Sun", kg: 0.75 },
    ],
  },
  daily: {
    totalKg: 0.35,
    bars: [
      { day: "6am",  kg: 0.04 },
      { day: "9am",  kg: 0.06 },
      { day: "12pm", kg: 0.08 },
      { day: "3pm",  kg: 0.05 },
      { day: "6pm",  kg: 0.09 },
      { day: "9pm",  kg: 0.03 },
    ],
  },
  monthly: {
    totalKg: 13.8,
    bars: [
      { day: "W1", kg: 3.20 },
      { day: "W2", kg: 3.47 },
      { day: "W3", kg: 3.85 },
      { day: "W4", kg: 3.28 },
    ],
  },
  insights: [
    {
      id: 1,
      label: "Your cylinder duration",
      value: "You finish a cylinder every 18 days.",
    },
    {
      id: 2,
      label: "Consumption vs last week",
      value: "This week's usage is 12% higher.",
    },
    {
      id: 3,
      label: "Peak cooking hours",
      value: "Dinner preparation peaks at 6:00 – 8:00 PM.",
    },
  ],
};

/**
 * Device info
 * TODO: Replace with API response from GET /api/device
 */
export const mockDeviceData = {
  name: "GasSense v2.1",
  serialNumber: "SN: A4F72E-0819",
  connected: true,
  connectionType: "Bluetooth",
  firmware: "v1.4.2",
  firmwareStatus: "Up to date",
  batteryPercent: 98,
  batteryLabel: "Excellent",
  signalStrength: "Strong -42 dBm",
  calibrationDate: "Aug 15, 2026",
  nextCalibration: "Feb 15, 2027",
  pairedSince: "Jul 22, 2026",
  cylinder: {
    size: "12.5 kg",
    gasType: "LPG Propane/Butane",
    provider: "Gas Nigeria Ltd.",
  },
};

/**
 * Settings
 * TODO: Replace with API response from GET /api/settings
 */
export const mockSettingsData = {
  alerts: {
    lowGasPercent: 20,
    criticalEmptyPercent: 5,
  },
  notifications: {
    pushEnabled: true,
    smsEnabled: true,
    smsPhone: "+234 812 XXX XXXX",
    emailEnabled: false,
    quietHours: "11 PM - 6 AM",
  },
  display: {
    gasUnit: "Kilograms (kg)",
    temperature: "Celsius (°C)",
    theme: "System Default",
  },
  privacy: {
    usageDataSharing: false,
  },
};

