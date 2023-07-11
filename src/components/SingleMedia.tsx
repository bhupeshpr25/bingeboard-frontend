import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  IconButton,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue as mode,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getMediaToken, getMedium, deleteMedia } from "../services/apiMedia";
import { useQuery } from "@tanstack/react-query";
import SingleNote from "./SingleNote";
import useAuth from "../hooks/useAuth";
import { AiOutlineDelete, AiOutlineMore } from "react-icons/ai";
import { useState } from "react";
import MediaForm from "./MediaForm";
import { INote } from "../api/types";

export const SingleMedia: React.FC = () => {
  const { mediaId } = useParams<{ mediaId?: string }>();
  const { getToken } = useAuth();

  const token = getMediaToken(getToken());

  const [isEditing, setIsEditing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const { isLoading: isMediaLoading, data: media } = useQuery({
    queryKey: ["media", mediaId, token],
    queryFn: () =>
      mediaId ? getMedium(mediaId, token) : Promise.resolve(null),
  });

  if (isMediaLoading) {
    return <p>Loading...</p>;
  }

  const handleDelete = async () => {
    try {
      if (mediaId) {
        await deleteMedia(mediaId, getToken());
        // Handle success
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsButtonVisible(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <Box as="main" height="full" bg={mode("gray.50", "gray.800")}>
      {media && (
        <Stack spacing="8">
          <HStack
            spacing="3"
            mx="4"
            display="flex"
            justifyContent="space-between"
          >
            <Box>
              <Heading
                as="h1"
                mt="2"
                size="lg"
                color={mode("gray.700", "white")}
              >
                {media.title}
              </Heading>
              <Text color={mode("blackAlpha.600", "whiteAlpha.600")}>
                {media.type}
              </Text>
            </Box>
            <HStack>
              {isButtonVisible && (
                <IconButton
                  variant="ghost"
                  aria-label="edit"
                  onClick={handleEdit}
                  icon={<AiOutlineMore />}
                />
              )}
              {isEditing && (
                <>
                  <MediaForm
                    onClose={handleCancelEdit}
                    initialValues={{
                      title: media.title,
                      description: media.description,
                      type: media.type,
                    }}
                    isEditing={isEditing}
                    media={media}
                    setIsEditing={setIsEditing}
                  />

                  <IconButton
                    variant="ghost"
                    aria-label="delete"
                    icon={<AiOutlineDelete />}
                    onClick={onOpen}
                  />

                  <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Delete Note</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        Are you sure? This will also delete the notes
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          colorScheme="blue"
                          mr={3}
                          onClick={handleDelete}
                        >
                          Delete
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              )}
            </HStack>
          </HStack>
          <Stack
            spacing="8"
            lineHeight="1.75"
            maxW="full"
            color={mode("blackAlpha.800", "whiteAlpha.800")}
          >
            <Box p="2" mx="4" rounded="lg">
              {media.description}
            </Box>
            {media.notes && media.notes.length > 0 ? (
              <List spacing="4">
                {media.notes.map((note: INote) => (
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
