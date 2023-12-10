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
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { getMediaToken, getMedium, deleteMedia } from "../../services/apiMedia";
import Microlink from "@microlink/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AiOutlineDelete, AiOutlineMore } from "react-icons/ai";
import { useState } from "react";
import { INote } from "../../api/types";
import MediaForm from "./MediaForm";
import SingleNote from "../Note/SingleNote";

export const SingleMedia: React.FC = () => {
  const { mediaId } = useParams<{ mediaId?: string }>();
  const { getToken } = useAuth();

  const token = getMediaToken(getToken());

  const [isEditing, setIsEditing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const queryClient = useQueryClient();

  const { isLoading: isMediaLoading, data: media } = useQuery({
    queryKey: ["media", mediaId, token],
    queryFn: () =>
      mediaId ? getMedium(mediaId, token) : Promise.resolve(null),
  });

  if (isMediaLoading) {
    return (
      <Center m="8" fontSize="2xl" color="gray.500" fontWeight="semibold">
        loading...
      </Center>
    );
  }

  const handleDelete = async () => {
    try {
      if (mediaId) {
        await deleteMedia(mediaId, getToken());
        onClose();
        queryClient.invalidateQueries(["media"]);
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

  return (
    <Box as="main" height="full" bg={mode("gray.100", "gray.800")}>
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
              <Text mt="4" color={mode("blackAlpha.600", "whiteAlpha.600")}>
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
                    initialValues={{
                      title: media.title,
                      description: media.description,
                      link: media.link,
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
                      <ModalHeader>Delete Media</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        Are you sure? This will also delete the notes
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          colorScheme="teal"
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
            <Center
              p="2"
              sx={{
                "--microlink-max-width": "800px",
              }}
            >
              <Microlink url={media.link} lazy contrast size="large" />
            </Center>
            <Box p="2" mx="4">
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
              <Center
                m="8"
                fontSize="2xl"
                color="gray.500"
                fontWeight="semibold"
              >
                No notes found :&#40;
              </Center>
            )}
          </Stack>
        </Stack>
      )}
    </Box>
  );
};
