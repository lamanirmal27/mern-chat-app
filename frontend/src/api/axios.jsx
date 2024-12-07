import axios from "axios";

const BASE_URL = import.meta.VITE_BACKEND_URL || "http://localhost:4545";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
