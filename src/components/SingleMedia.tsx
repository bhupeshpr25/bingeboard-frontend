import {
  Badge,
  Box,
  Center,
  HStack,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { getMedia, getMedium } from "../services/apiMedia";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../services/apiNote";
import SingleNote from "./SingleNote";

export const SingleMedia: React.FC = () => {
  const { mediaId } = useParams<{ mediaId?: string }>();

  const { isLoading: isMediaLoading, data: media } = useQuery({
    queryKey: ["media", mediaId],
    queryFn: () => (mediaId ? getMedium(mediaId) : Promise.resolve(null)),
  });

  const { isLoading: isNotesLoading, data: notes } = useQuery({
    queryKey: ["notes", mediaId],
    queryFn: () => (mediaId ? getNotes(mediaId) : Promise.resolve(null)),
  });

  if (isMediaLoading || isNotesLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Box as="main" height="full" bg={mode("gray.50", "gray.800")}>
      {media && (
        <Stack spacing="8">
          <Stack spacing="3" mx="4">
            <Heading as="h1" mt="2" size="lg" color={mode("gray.700", "white")}>
              {media.title}
            </Heading>
            <Text color={mode("blackAlpha.600", "whiteAlpha.600")}>
              {media.type}
            </Text>
          </Stack>
          <Stack
            spacing="8"
            lineHeight="1.75"
            maxW="full"
            color={mode("blackAlpha.800", "whiteAlpha.800")}
          >
            <Box p="2" mx="4" rounded="lg">
              {media.description}
            </Box>
            {notes && notes.length > 0 ? (
              <List spacing="4">
                {notes.map((note: any) => (
                  <Center key={note.id}>
                    <ListItem>
                      <SingleNote note={note} />
                    </ListItem>
                  </Center>
                ))}
              </List>
            ) : (
              <Text>No notes found.</Text>
            )}
          </Stack>
        </Stack>
      )}
    </Box>
  );
};
