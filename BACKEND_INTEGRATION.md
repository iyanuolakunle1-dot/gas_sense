# Backend Integration Guide (GasSense)

Hey! Here is everything you need to connect your backend API to this frontend.

---

## 1. Quick Switch: Mock to Live API

In the root directory, there is a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_USE_MOCK=true
```

- When you are ready to test your real server, simply change:
  ```env
  VITE_USE_MOCK=false
  ```
- All requests will immediately route through `src/services/api.js` to your backend server.
- If `VITE_USE_MOCK` is `true`, the frontend uses the simulated responses from `src/data/mockData.js`.

---

## 2. Authentication

The API helper in `src/services/api.js` automatically looks for an auth token in `localStorage`:

```js
// If your login/register stores a JWT token:
localStorage.setItem('token', 'your_jwt_token_here');
```

When present, every API call automatically includes:
`Authorization: Bearer <token>`

---

## 3. Endpoints & JSON Payloads

### `GET /api/dashboard`
Returns cylinder telemetry and today's usage summary.

**Response Schema (200 OK):**
```json
{
  "device": {
    "name": "My GasSense",
    "model": "GS-V2.1",
    "serialNumber": "A4F72E",
    "connected": true,
    "connectionType": "Bluetooth"
  },
  "cylinder": {
    "totalWeight": 12.5,
    "remainingWeight": 8.0,
    "percentRemaining": 64,
    "status": "Good",
    "daysLeft": 11
  },
  "todayUsage": {
    "kg": 0.35,
    "withinRange": true,
    "label": "Within usual range"
  },
  "alertLimit": {
    "percent": 20,
    "notifyViaSMS": true
  }
}
```

---

### `GET /api/trends?period=weekly`
Query parameter: `period` = `daily` | `weekly` | `monthly`.

**Response Schema (200 OK):**
```json
{
  "totalKg": 3.47,
  "bars": [
    { "day": "Mon", "kg": 0.45 },
    { "day": "Tue", "kg": 0.32 },
    { "day": "Wed", "kg": 0.58 },
    { "day": "Thu", "kg": 0.40 },
    { "day": "Fri", "kg": 0.35 },
    { "day": "Sat", "kg": 0.62 },
    { "day": "Sun", "kg": 0.75 }
  ],
  "insights": [
    { "id": 1, "label": "Your cylinder duration", "value": "You finish a cylinder every 18 days." },
    { "id": 2, "label": "Consumption vs last week", "value": "This week's usage is 12% higher." },
    { "id": 3, "label": "Peak cooking hours", "value": "Dinner preparation peaks at 6:00 – 8:00 PM." }
  ]
}
```

---

### `GET /api/device`
Returns sensor hardware information.

**Response Schema (200 OK):**
```json
{
  "name": "GasSense v2.1",
  "serialNumber": "SN: A4F72E-0819",
  "connected": true,
  "connectionType": "Bluetooth",
  "firmware": "v1.4.2",
  "firmwareStatus": "Up to date",
  "batteryPercent": 98,
  "batteryLabel": "Excellent",
  "signalStrength": "Strong -42 dBm",
  "calibrationDate": "Aug 15, 2026",
  "nextCalibration": "Feb 15, 2027",
  "pairedSince": "Jul 22, 2026",
  "cylinder": {
    "size": "12.5 kg",
    "gasType": "LPG (Propane/Butane)",
    "provider": "Gas Nigeria Ltd."
  }
}
```

---

### `GET /api/settings`
Returns user preferences.

**Response Schema (200 OK):**
```json
{
  "alerts": {
    "lowGasPercent": 20,
    "criticalEmptyPercent": 5
  },
  "notifications": {
    "pushEnabled": true,
    "smsEnabled": true,
    "smsPhone": "+234 812 XXX XXXX",
    "emailEnabled": false,
    "quietHours": "11 PM - 6 AM"
  },
  "display": {
    "gasUnit": "Kilograms (kg)",
    "temperature": "Celsius (°C)",
    "theme": "System Default"
  },
  "privacy": {
    "usageDataSharing": false
  }
}
```

---

### `PATCH /api/settings`
Receives partial or full updated settings object.

**Request Body:**
```json
{
  "notifications": {
    "smsPhone": "+234 812 345 6789",
    "smsEnabled": true
  }
}
```

**Response (200 OK):** Updated settings object.

---

### `POST /api/device/recalibrate`
Triggers sensor tare / ultrasonic recalibration.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Calibration started. Please wait 60 seconds."
}
```

---

### `DELETE /api/device/pair`
Unpairs current device from account.

**Response (200 OK):**
```json
{
  "success": true
}
```

---

## 4. CORS Note
Remember to enable CORS on your backend server for `http://localhost:5173` (or whatever port Vite is running on).

