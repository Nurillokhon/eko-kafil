/** @format */

import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (
      error?.status == 403 &&
      error?.response?.data?.code === "token_not_valid"
    ) {
      localStorage.clear();
      window.location.href = "/login";
    }

    if (error?.status == 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    const data = error.response?.data;

    if (data) {
      const messages = [];
      if (typeof data === "object") {
        for (const key in data) {
          const value = data[key];
          if (Array.isArray(value)) {
            messages.push(...value);
          } else if (typeof value === "string") {
            messages.push(value);
          }
        }
      } else if (typeof data === "string") {
        messages.push(data);
      }

      if (messages.length > 0) {
        messages.forEach((msg) => toast.error(msg));
      } else {
        toast.error("Xatolik yuz berdi");
      }
    } else {
      toast.error("Tarmoq xatosi yoki server javob bermadi");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
