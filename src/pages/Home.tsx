import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { getMedia } from "../services/apiMedia";
import MediaListContainer from "../components/Media/MediaListContainer";

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
    return <div>Loading your media...</div>;
  }

  if (isError) {
    return <div>Error fetching media</div>;
  }

  return (
    <div>
      <MediaListContainer />
    </div>
  );
};

export default Home;
