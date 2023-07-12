import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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
  const { user: authUser, getToken } = useAuth();
  const navigate = useNavigate();

  const token = getToken() ?? "";

  const { isLoading, isError } = useQuery<MediaItem[], Error>(["media"], () =>
    getMedia(token)
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
      <MediaListContainer />
    </div>
  );
};

export default Home;
