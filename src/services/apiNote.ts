import axios, { AxiosRequestConfig } from "axios";

const API_BASE_URL = "https://bingeboard.onrender.com/api";

export async function getNotes(token?: string) {
  try {
    const config: AxiosRequestConfig = {};

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await axios.get(`${API_BASE_URL}/note`, config);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Notes not loaded");
  }
}
