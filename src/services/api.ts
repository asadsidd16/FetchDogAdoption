import axios from "axios";

const BASE_URL = "https://frontend-take-home-service.fetch.com";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Ensures cookies are sent
});
  

export default api;