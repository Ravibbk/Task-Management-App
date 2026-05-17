import axios from "axios";

const localPort = import.meta.env.VITE_API_PORT || 5000;
const baseURL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? `http://localhost:${localPort}/api` : "/api");

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;