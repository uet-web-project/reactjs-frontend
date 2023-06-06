import axios from "axios";

// const baseURL = "https://auto-registry-server.herokuapp.com/";
const baseURL = "http://localhost:4000/";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: baseURL,
});

// always get the newest token set in local storage
axiosInstance.interceptors.request.use(
  (res) => {
    const token = localStorage.getItem("token");
    res.headers.Authorization = token ? `Bearer ${token}` : "";
    return res;
  },
  (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
