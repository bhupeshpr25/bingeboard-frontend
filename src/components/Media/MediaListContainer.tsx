import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { MediaList } from "./MediaList";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMediaList = async () => {
      const token = getToken();

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
        setError("Error fetching media. Please try again later.");
        toast({
          title: "Account not found",
          description: "please sign in to continue",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });

        navigate("/signin");
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
