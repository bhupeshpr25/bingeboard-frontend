import { Stack, useColorModeValue as mode } from "@chakra-ui/react";
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
    return <div>No media available.</div>;
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
