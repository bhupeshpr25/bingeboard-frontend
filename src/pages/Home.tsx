import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { getMedia } from "../services/apiMedia";
import MediaListContainer from "../components/Media/MediaListContainer";
import { Center } from "@chakra-ui/react";

interface MediaItem {
  id: string;
  title: string;
  type: string;
  description: string;
}

const Home = () => {
  const { getToken } = useAuth();

  const token = getToken() ?? "";

  const { isLoading, isError } = useQuery<MediaItem[], Error>(["media"], () =>
    getMedia(token)
  );

  if (isLoading) {
    return (
      <Center m="8" fontSize="2xl" color="gray.500" fontWeight="semibold">
        loading your media...
      </Center>
    );
  }

  if (isError) {
    return (
      <Center m="8" fontSize="2xl" color="gray.500" fontWeight="semibold">
        error fetching media :/
      </Center>
    );
  }

  return (
    <div>
      <MediaListContainer />
    </div>
  );
};

export default Home;
