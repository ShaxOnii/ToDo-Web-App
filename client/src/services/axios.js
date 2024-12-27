import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  //baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  withCredentials: true, // Jeśli JWT w ciasteczkach
});

export default api;
