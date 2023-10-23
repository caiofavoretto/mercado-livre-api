import axios from "axios";

const api = axios.create({
  baseURL: process.env.MERCADO_LIVRE_API_URL,
});

export default api;
