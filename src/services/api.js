import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export const apiClient = axios.create({
  baseURL: API_URL.replace(/\/$/, ""),
  timeout: Number(import.meta.env.VITE_API_TIMEOUT || 10000),
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export function getApiError(error) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error?.message || error.response?.data?.message ||
      (error.code === "ECONNABORTED" ? "The request timed out." : "Unable to reach the GasSense server.");
  }
  return error?.message || "Request failed.";
}

const unwrap = (response) => response.data;

export const getNearbySensors = () => apiClient.get("/api/v1/prototype/sensors").then(unwrap);
export const getSessionContext = async () => {
  const { sensors = [] } = await getNearbySensors();
  return { sensors, sensorId: localStorage.getItem("gassense_active_sensor_id") || sensors.find((sensor) => sensor.status === "PAIRED")?.sensorId };
};
export const getPrototypeSensorStatus = (sensorId) => apiClient.get(`/api/v1/prototype/sensors/${encodeURIComponent(sensorId)}/status`).then(unwrap);
export const getPrototypeOverview = (sensorId) => {
  if (!sensorId) return Promise.reject(new Error("A sensor ID is required to load the overview."));
  return apiClient.get(`/api/v1/prototype/sensors/${encodeURIComponent(sensorId)}/overview`).then(unwrap);
};
export const getPrototypeDevice = (sensorId) => {
  if (!sensorId) return Promise.reject(new Error("A sensor ID is required to load device details."));
  return apiClient.get(`/api/v1/prototype/sensors/${encodeURIComponent(sensorId)}/device`).then(unwrap).then((data) => ({
    ...data,
    name: data.name || data.model,
    serialNumber: data.serialNumber || data.sensorId,
    connectionType: data.connectionType || data.bluetoothConnectionStatus || data.connectionStatus,
    firmware: data.firmware || data.firmwareVersion,
    batteryPercent: data.batteryPercent ?? data.batteryLevel,
    batteryLabel: data.batteryLabel || data.batteryStatus,
    signalStrength: data.signalStrengthStatus && data.signalStrength != null
      ? `${data.signalStrengthStatus} (${data.signalStrength} dBm)`
      : data.signalStrength,
    nextCalibration: data.nextCalibration || data.nextCalibrationDate,
    pairedSince: data.pairedSince || data.pairingDate,
    cylinder: data.cylinder || {
      size: data.cylinderSize,
      gasType: data.gasType,
      provider: data.provider,
    },
  }));
};
export const recalibratePrototypeSensor = (sensorId) => {
  if (!sensorId) return Promise.reject(new Error("A sensor ID is required to recalibrate."));
  return apiClient.post(`/api/v1/prototype/sensors/${encodeURIComponent(sensorId)}/recalibrate`).then(unwrap);
};
export const unpairPrototypeSensor = (sensorId) => {
  if (!sensorId) return Promise.reject(new Error("A sensor ID is required to unpair."));
  return apiClient.delete(`/api/v1/prototype/sensors/${encodeURIComponent(sensorId)}/pair`).then(unwrap);
};
export const pairSensor = (sensorId) => {
  if (!sensorId) return Promise.reject(new Error("A sensor ID is required to pair a sensor."));
  return apiClient.post(`/api/v1/prototype/sensors/${encodeURIComponent(sensorId)}/pair`).then(unwrap);
};
export const controlPrototypeGas = (sensorId, state) => apiClient.post(`/api/v1/prototype/sensors/${encodeURIComponent(sensorId)}/gas-control`, { state, confirmed: true }).then(unwrap);
export const controlGas = (householdId, deviceId, state) => apiClient.post(`/api/v1/households/${encodeURIComponent(householdId)}/devices/${encodeURIComponent(deviceId)}/gas-control`, { state, confirmed: true }).then(unwrap);
export const getTrendsData = (sensorId, period = "weekly") => {
  if (!sensorId) return Promise.reject(new Error("A sensor ID is required to load analytics."));
  return apiClient.get(`/api/v1/prototype/sensors/${encodeURIComponent(sensorId)}/analytics`, { params: { period } }).then(unwrap).then((data) => ({
    totalKg: data.totalKg,
    bars: (data.buckets || []).map((bucket) => ({ day: bucket.label, kg: bucket.usageKg })),
    insights: data.insights,
  }));
};
export const getSettings = (householdId) => apiClient.get(`/api/v1/households/${encodeURIComponent(householdId)}/settings`).then(unwrap);
export const updateSettings = (householdId, settings) => apiClient.patch(`/api/v1/households/${encodeURIComponent(householdId)}/settings`, settings).then(unwrap);
export const getDeviceInfo = (householdId, deviceId) => apiClient.get(`/api/v1/households/${encodeURIComponent(householdId)}/devices/${encodeURIComponent(deviceId)}`).then(unwrap);
export const unpairDevice = (householdId, deviceId) => apiClient.delete(`/api/v1/households/${encodeURIComponent(householdId)}/devices/${encodeURIComponent(deviceId)}`).then(unwrap);
