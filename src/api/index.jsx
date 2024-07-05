import axios from "axios";
const api = axios.create({
  baseURL: "http://api.alquran.cloud/v1/surah",
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
