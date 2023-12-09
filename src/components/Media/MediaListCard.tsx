import { Stack, Text, useColorModeValue as mode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface MediaListCardProps {
  media: {
    id: string;
    title: string;
    description: string;
    link: string;
    type: string;
  };
}

const MediaListCard: React.FC<MediaListCardProps> = ({ media }) => {
  return (
    <Link
      to={`/media/${media.id}`}
      aria-current={media.id === "2" ? "page" : undefined}
    >
      <Stack
        spacing="1"
        py={{
          base: "3",
          lg: "2",
        }}
        px={{
          base: "3.5",
          lg: "3",
        }}
        fontSize="sm"
        lineHeight="1.25rem"
        _hover={{
          textDecoration: "none",
          bg: mode("gray.100", "gray.700"),
        }}
        _activeLink={{
          bg: mode("gray.200", "gray.700"),
          color: mode("gray.700", "gray.200"),
        }}
        borderRadius={{
          lg: "lg",
        }}
      >
        <Text fontWeight="semibold">{media.title}</Text>
        <Text noOfLines={4}>{media.description}</Text>
      </Stack>
    </Link>
  );
};

export default MediaListCard;
