import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { MediaList } from "./MediaList";
import { Center, useToast } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import MovieList from "./MovieList";
import ShowList from "./ShowList";
import AnimeList from "./AnimeList";

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
  const location = useLocation();

  useEffect(() => {
    const fetchMediaList = async () => {
      const token = getToken();

      if (!token) {
        navigate("/signin");
        return;
      }

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
    return (
      <Center m="8" fontSize="2xl" color="gray.500" fontWeight="semibold">
        loading...
      </Center>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  const movieList = mediaList.filter((media) => media.type === "movie");
  const showList = mediaList.filter((media) => media.type === "show");
  const animeList = mediaList.filter((media) => media.type === "anime");

  if (location.pathname === "/movies") {
    return <MovieList movies={movieList} />;
  }

  if (location.pathname === "/shows") {
    return <ShowList shows={showList} />;
  }

  if (location.pathname === "/anime") {
    return <AnimeList anime={animeList} />;
  }

  return <MediaList media={mediaList} />;
}
