// src/api/axios.ts
import axios from "axios";
import keycloak from "./keycloakService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

api.interceptors.request.use(async (config) => {
  if (keycloak.authenticated) {
    await keycloak.updateToken(30); // gerekiyorsa refresh
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }
  return config;
});

export default api;
