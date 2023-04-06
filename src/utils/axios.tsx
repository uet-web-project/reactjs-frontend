import axios from "axios";

const instance = axios.create({
  baseURL: "https://auto-registry-server.herokuapp.com/",
});

export default instance;
