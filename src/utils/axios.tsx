import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://auto-registry-server.herokuapp.com/",
});

export default axiosInstance;
