import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ======================================
// REQUEST INTERCEPTOR (TASK 34)
// ======================================

API.interceptors.request.use(
  (config) => {
    console.log(
      `[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`
    );

    return config;
  },
  (error) => Promise.reject(error)
);

// ======================================
// RESPONSE INTERCEPTOR (TASK 34)
// ======================================

API.interceptors.response.use(
  (response) => {
    console.log(
      `[API RESPONSE] ${response.status}`
    );

    return response;
  },
  (error) => {
    console.error(
      "[API ERROR]",
      error.response?.data || error.message
    );

    return Promise.reject(error);
  }
);

// ======================================
// TASK 4 - ZONES
// ======================================

export const getZones = async () => {
  return API.get("/zones");
};

// ======================================
// TASK 4 - DECISION REQUEST
// ======================================

export const sendDecisionRequest = async (request) => {
  const body = {
    zoneId: Number(
      String(request.zone_id).replace(/[^\d]/g, "")
    ),
    action: "deploy_waste_collection",
  };

  return axios.post(
    "http://localhost:5000/action/trigger",
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

// ======================================
// TASK 30 APIs
// ======================================

export const getSignals = () =>
  API.get("/signals");

export const getTelemetry = () =>
  API.get("/telemetry");

export const getIncidents = () =>
  API.get("/incidents");

export const getEscalations = () =>
  API.get("/escalations");

export const getDecisions = () =>
  API.get("/decisions");

export const getRuntime = () =>
  API.get("/runtime");

// ======================================
// TASK 32 APIs
// ======================================

export const getDashboard = () =>
  API.get("/v2/task32/dashboard/summary");

export const getReplay = (traceId) =>
  API.get(`/v2/task32/replay/${traceId}`);

export const executeSignal = (payload) =>
  API.post("/v2/task32/runtime/execute-signal", payload);

// ======================================
// TASK 34 APIs
// ======================================

export const getEvidence = () =>
  API.get("/evidence");

export const getObservability = () =>
  API.get("/observability");

// ======================================
// DEFAULT EXPORT
// ======================================

export default API;