import { getMediaToken } from "./apiMedia";
import { INote } from "../api/types";

export async function getNotes(mediaId: string) {
  const token = getMediaToken(null);

  const response = await fetch(`https://bingeboard.onrender.com/api/note`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notes.");
  }

  const data: INote[] = await response.json();
  return data;
}
