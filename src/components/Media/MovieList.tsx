import { Center, Stack, useColorModeValue as mode } from "@chakra-ui/react";
import MediaListCard from "./MediaListCard";

interface MovieListProps {
  movies: {
    id: string;
    title: string;
    description: string;
    link: string;
    type: string;
  }[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  if (movies.length === 0) {
    return (
      <Center m="8" fontSize="2xl" color="gray.500" fontWeight="semibold">
        No movies found :/
      </Center>
    );
  }

  return (
    <Stack
      spacing={{
        base: "1px",
        lg: "1",
      }}
      px={{
        lg: "3",
      }}
      py="3"
      bg={mode("gray.100", "gray.800")}
    >
      {movies.map((movie) => (
        <MediaListCard media={movie} key={movie.id} />
      ))}
    </Stack>
  );
};

export default MovieList;
