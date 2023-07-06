import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { MediaList } from "./MediaList";

export default function MediaListContainer() {
  const { getToken } = useAuth();
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    const fetchMediaList = async () => {
      const token = getToken();

      console.log("Fetching media list...");

      try {
        const response = await axios.get(
          "https://bingeboard.onrender.com/api/media",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Media list response:", response.data);

        const fetchedMediaList = response.data;
        setMediaList(fetchedMediaList);
      } catch (error) {
        console.error("Error fetching media list:", error);
      }
    };

    fetchMediaList();
  }, [getToken]);

  console.log("Media list:", mediaList);

  return <MediaList media={mediaList} />;
}
