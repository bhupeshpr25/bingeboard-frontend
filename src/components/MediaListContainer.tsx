import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { MediaList } from "./MediaList";

interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: string;
}

export default function MediaListContainer() {
  const { getToken } = useAuth();
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMediaList = async () => {
      const token = getToken();

      setIsLoading(true);
      setError("");

      try {
        const response = await axios.get(
          "https://bingeboard.onrender.com/api/media",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const fetchedMediaList = response.data.data;
        setMediaList(fetchedMediaList);
      } catch (error) {
        console.error("Error fetching media list:", error);
        setError("Error fetching media. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMediaList();
  }, []);

  if (isLoading) {
    return <div>Loading media...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <MediaList media={mediaList} />;
}
