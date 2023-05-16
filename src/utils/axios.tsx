import axios from "axios";

const baseURL = "https://auto-registry-server.herokuapp.com/"
// const baseURL = "http://localhost:4000/";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  headers: token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {},
  baseURL: baseURL,
});

export default axiosInstance;
