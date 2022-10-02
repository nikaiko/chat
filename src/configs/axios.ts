import axios from "axios";

export const API_URL = "http://localhost:8888";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
