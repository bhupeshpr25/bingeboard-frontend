import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getMedia } from "../services/apiMedia";
import { useStateContext } from "../context";
import { MediaList } from "../components/MediaList";

interface MediaItem {
  id: string;
  title: string;
  type: string;
  description: string;
}

const Home = () => {
  const { user: authUser, getToken } = useAuth();
  const navigate = useNavigate();

  const token = getToken();

  const stateContext = useStateContext();

  const user = stateContext.state.authUser;

  const {
    data: media,
    isLoading,
    isError,
  } = useQuery<MediaItem[], Error>(["media"], () =>
    getMedia(token ?? undefined)
  );

  if (!authUser) {
    navigate("/signin");
    return null;
  }

  if (isLoading) {
    return <div>Loading your media...</div>;
  }

  if (isError) {
    return <div>Error fetching media</div>;
  }

  return (
    <div>
      <h1>{user?.username}</h1>
      <MediaList media={media} />
    </div>
  );
};

export default Home;
