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

export async function updateNote(
  noteId: string,
  data: NoteFormValues,
  token: string
) {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(
      `${API_BASE_URL}/note/${noteId}`,
      data,
      config
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update note");
  }
}

export async function deleteNote(noteId: string, token: string): Promise<void> {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${API_BASE_URL}/note/${noteId}`, config);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete note");
  }
}
