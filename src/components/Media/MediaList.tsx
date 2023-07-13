import { Center, Stack, useColorModeValue as mode } from "@chakra-ui/react";
import MediaListCard from "./MediaListCard";

interface MediaListProps {
  media: {
    id: string;
    title: string;
    description: string;
    type: string;
  }[];
}

export const MediaList: React.FC<MediaListProps> = ({ media }) => {
  if (media.length === 0) {
    return (
      <Center m="8" fontSize="2xl" color="gray.500" fontWeight="semibold">
        No media found :&#40;
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
      {media.map((medium) => (
        <MediaListCard media={medium} key={medium.id} />
      ))}
    </Stack>
  );
};
