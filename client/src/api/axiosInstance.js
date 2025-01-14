import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
});

// If you store JWT in localstorage, attach it:
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;