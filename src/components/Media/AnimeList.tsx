import { Center, Stack, useColorModeValue as mode } from "@chakra-ui/react";
import MediaListCard from "./MediaListCard";

interface AnimeListProps {
  anime: {
    id: string;
    title: string;
    description: string;
    type: string;
  }[];
}

const AnimeList: React.FC<AnimeListProps> = ({ anime }) => {
  if (anime.length === 0) {
    return (
      <Center m="8" fontSize="2xl" color="gray.500" fontWeight="semibold">
        No anime found :/
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
      bg={mode("gray.50", "gray.800")}
    >
      {anime.map((anime) => (
        <MediaListCard media={anime} key={anime.id} />
      ))}
    </Stack>
  );
};

export default AnimeList;
