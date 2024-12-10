import axios from "axios";

const BASE_URL = "http://localhost:4545/"||import.meta.env.VITE_BACKEND_URL  ;

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
