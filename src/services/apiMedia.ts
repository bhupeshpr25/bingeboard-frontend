import axios, { AxiosRequestConfig } from "axios";
import { MediaFormValues } from "../api/types";

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

export async function createMedium(data: MediaFormValues, token: string) {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(`${API_BASE_URL}/media`, data, config);

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create medium");
  }
}

export async function updateMedia(
  mediaId: string,
  data: MediaFormValues,
  token: string
) {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(
      `${API_BASE_URL}/media/${mediaId}`,
      data,
      config
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update medium");
  }
}

export async function deleteMedia(mediaId: string, token: string) {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(
      `${API_BASE_URL}/media/${mediaId}`,
      config
    );

    console.log("Media deleted successfully!");

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete media");
  }
}
