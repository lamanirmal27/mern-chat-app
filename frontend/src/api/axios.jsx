import axios from "axios";

const axiosUrl =
  import.meta.env.VITE_ENV !== "development"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:4545";

export default axios.create({
  baseURL: axiosUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
