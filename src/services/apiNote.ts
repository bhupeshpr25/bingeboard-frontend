import axios, { AxiosRequestConfig } from "axios";
import { NoteFormValues } from "../api/types";

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

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Notes not loaded");
  }
}

export function getMediaToken(token: string | null): string | undefined {
  return token ? `Bearer ${token}` : undefined;
}

export async function createNote(
  data: NoteFormValues,
  currentMediaId: string | undefined,
  token: string
) {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const mediaId = currentMediaId || undefined;

    const response = await axios.post(
      `${API_BASE_URL}/note`,
      { ...data, mediaId },
      config
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create note");
  }
}
