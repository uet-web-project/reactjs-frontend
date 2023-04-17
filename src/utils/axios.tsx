import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  headers: token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {},
  baseURL: "https://auto-registry-server.herokuapp.com/",
});

export default axiosInstance;
