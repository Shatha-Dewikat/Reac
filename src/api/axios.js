import axios from "axios";

// هذا الـ instance رح نستخدمه بكل المشروع
const axiosInstance = axios.create({
  baseURL: "https://mytshop.runasp.net/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// إضافة التوكن تلقائيًا من localStorage لكل طلب
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
