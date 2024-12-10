import axios from "axios";

const axiosUrl =
  import.meta.env.VITE_ENV === "development"
    ? "http:localhost:4545"
    : import.meta.env.VITE_BACKEND_URL;

export default axios.create({
  baseURL: axiosUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
