import axios, { AxiosRequestConfig } from "axios";

const API_BASE_URL = "https://bingeboard.onrender.com/api";

export async function getMedia(token: string) {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${API_BASE_URL}/media`, config);

    return response.data;
  } catch (error) {
    throw new Error("Media not loaded");
  }
}

// apiMedia.ts
export async function getMedium(mediaId: string, token?: string) {
  try {
    const config: AxiosRequestConfig = {};

    if (token) {
      config.headers = {
        Authorization: token,
      };
    }

    const response = await axios.get(
      `${API_BASE_URL}/media/${mediaId}`,
      config
    );

    return response.data.data;
  } catch (error) {
    throw new Error("Medium not found");
  }
}

export function getMediaToken(token: string | null): string | undefined {
  return token ? `Bearer ${token}` : undefined;
}
