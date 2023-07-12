import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getMedia } from "../services/apiMedia";
import MediaListContainer from "../components/Media/MediaListContainer";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

interface MediaItem {
  id: string;
  title: string;
  type: string;
  description: string;
}

const Home = () => {
  const { user: authUser, getToken } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const token = getToken() ?? "";

  const { isLoading, isError } = useQuery<MediaItem[], Error>(["media"], () =>
    getMedia(token)
  );

  // if (!authUser) {
  //   toast({
  //     title: "Account not found",
  //     description: "Redirecting to sign in page",
  //     status: "warning",
  //     duration: 5000,
  //     isClosable: true,
  //   });

  //   navigate("/signin");
  // }

  // useEffect(() => {
  //   if (!authUser) {
  //     console.log("no account");
  //     navigate("/signin");
  //   }
  // }, [authUser, navigate]);

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
