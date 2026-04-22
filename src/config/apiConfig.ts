// src/config/apiConfig.ts

const apiBaseUrl = import.meta.env.VITE_BASE_API_URL;
if (!apiBaseUrl) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

export const API_BASE_URL = apiBaseUrl;
