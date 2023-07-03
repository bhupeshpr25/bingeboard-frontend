import axios from "axios";
import { IUser } from "../api/types";

const BASE_URL = "https://bingeboard.onrender.com/";

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshAccessTokenFn = async () => {
  const response = await authApi.get<IUser>("auth/refresh");
  return response.data;
};

// Other functions for sign-up, login, etc.
