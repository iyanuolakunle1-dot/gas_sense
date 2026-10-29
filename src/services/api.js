/**
 * src/services/api.js
 * -------------------
 * API service layer for GasSense frontend.
 * 
 * BACKEND INTEGRATION:
 * - Configure your backend URL in `.env` (VITE_API_BASE_URL)
 * - Set VITE_USE_MOCK=false in `.env` when your backend server is running.
 * - When VITE_USE_MOCK=true, mock data from `src/data/mockData.js` is used.
 */

import {
  mockDashboardData,
  mockTrendsData,
  mockDeviceData,
  mockSettingsData,
} from "../data/mockData";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

// Helper for simulating async network latency with mock data
const mockDelay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

// Generic HTTP fetch wrapper with headers and error handling
async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token") || "";
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}

/**
 * GET /api/dashboard
 * Fetch live sensor telemetry, cylinder status, remaining weight, days left.
 */
export const getDashboardData = async () => {
  if (USE_MOCK) {
    await mockDelay();
    return mockDashboardData;
  }
  return request("/dashboard");
};

/**
 * GET /api/trends?period=weekly
 * Fetch cylinder consumption breakdown (bars) and kitchen insights.
 */
export const getTrendsData = async (period = "weekly") => {
  if (USE_MOCK) {
    await mockDelay();
    return {
      bars: mockTrendsData[period]?.bars ?? [],
      totalKg: mockTrendsData[period]?.totalKg ?? 0,
      insights: mockTrendsData.insights,
    };
  }
  return request(`/trends?period=${period}`);
};

/**
 * GET /api/device
 * Fetch hardware diagnostics, battery %, firmware version, calibration schedule.
 */
export const getDeviceInfo = async () => {
  if (USE_MOCK) {
    await mockDelay();
    return mockDeviceData;
  }
  return request("/device");
};

/**
 * GET /api/settings
 * Fetch user alert limits, SMS/push notification preferences, display units.
 */
export const getSettings = async () => {
  if (USE_MOCK) {
    await mockDelay();
    return mockSettingsData;
  }
  return request("/settings");
};

/**
 * PATCH /api/settings
 * Update alert limits and notification toggles.
 */
export const updateSettings = async (settings) => {
  if (USE_MOCK) {
    await mockDelay(200);
    return { ...mockSettingsData, ...settings };
  }
  return request("/settings", {
    method: "PATCH",
    body: JSON.stringify(settings),
  });
};

/**
 * POST /api/device/recalibrate
 * Trigger sensor ultrasonic tare routine.
 */
export const recalibrateSensor = async () => {
  if (USE_MOCK) {
    await mockDelay(800);
    return { success: true, message: "Calibration started. Please wait 60 seconds." };
  }
  return request("/device/recalibrate", {
    method: "POST",
  });
};

/**
 * DELETE /api/device/pair
 * Unpair active sensor.
 */
export const unpairDevice = async () => {
  if (USE_MOCK) {
    await mockDelay(500);
    return { success: true, message: "Device unpaired successfully." };
  }
  return request("/device/pair", {
    method: "DELETE",
  });
};
