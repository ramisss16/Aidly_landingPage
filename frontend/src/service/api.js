import axios from "axios";

const api = axios.create({
  baseURL: "https://aidly-landingpage.onrender.com/api", 
});

export default api;