// Prefer explicit env var, but never crash app if missing.
const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_BASE_API_URL ||
  "http://localhost:5000/api";

export const API_BASE_URL = apiBaseUrl;
