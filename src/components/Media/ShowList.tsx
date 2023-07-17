import { Center, Stack, useColorModeValue as mode } from "@chakra-ui/react";
import MediaListCard from "./MediaListCard";

interface ShowListProps {
  shows: {
    id: string;
    title: string;
    description: string;
    type: string;
  }[];
}

const ShowList: React.FC<ShowListProps> = ({ shows }) => {
  if (shows.length === 0) {
    return (
      <Center m="8" fontSize="2xl" color="gray.500" fontWeight="semibold">
        No shows found :/
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
      {shows.map((show) => (
        <MediaListCard media={show} key={show.id} />
      ))}
    </Stack>
  );
};

export default ShowList;
