// auth api
import axios from "axios";

const API = axios.create({ baseURL: "https://library-backend-7.onrender.com/api" });

export const loginApi = async (formData) => {
  const response = await API.post("/auth/login", formData);
  return response.data; // Return the full response data
};

export const registerApi = async (formData) => {
  const response = await API.post("/auth/register", formData);
  return response.data;
};

export const logoutApi = () => API.post("/auth/logout");
