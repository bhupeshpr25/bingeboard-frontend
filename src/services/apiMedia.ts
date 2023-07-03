import axios, { AxiosRequestConfig } from "axios";

const API_BASE_URL = "https://bingeboard.onrender.com/api";

export async function getMedia(token?: string) {
  try {
    const config: AxiosRequestConfig = {};

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await axios.get(`${API_BASE_URL}/media`, config);

    console.log("Request Config:", config);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Media not loaded");
  }
}

export async function getMedium(mediaId: string, token?: string) {
  try {
    const config: AxiosRequestConfig = {};

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await axios.get(
      `${API_BASE_URL}/media/${mediaId}`,
      config
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Medium not found");
  }
}

export function getMediaToken(token: string | null): string | null {
  return token;
}
