import axios from "axios";
import { refreshAccessToken, clearCookies } from "../../utils/authUtils.js";

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

let isRefreshing = false; 

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 (no autorizado) y no es una solicitud de refresco
    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing) {
      originalRequest._retry = true; // Marcar la solicitud como reintentada
      isRefreshing = true;

      try {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          return api(originalRequest); // Reintenta la solicitud original
        }
      } catch (refreshError) {
        console.error("Error al renovar el token:", refreshError.message);
        window.location.href = "/login"; // Redirigir al login si la renovación falla
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status === 401){
      clearCookies();
      return Promise.reject(error);
  }
    return Promise.reject(error);
  }
);

export default api;