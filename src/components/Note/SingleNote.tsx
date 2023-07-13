import {
  Stack,
  HStack,
  Badge,
  Heading,
  useColorModeValue as mode,
  Box,
  Text as ChakraText,
  Divider,
  useBreakpointValue,
  Flex,
  IconButton,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineDelete, AiOutlineMore } from "react-icons/ai";
import { deleteNote } from "../../services/apiNote";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import NoteForm from "./NoteForm";
import { INote } from "../../api/types";

interface SingleNoteProps {
  note: INote;
}

function SingleNote({ note }: SingleNoteProps) {
  const alignCenter = useBreakpointValue({ base: true, lg: false });
  const { getToken } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    try {
      await deleteNote(note.id, getToken());
      onClose();
      // Handle success
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
    <Box
      width={{ base: "90%", lg: "container.md" }}
      margin={alignCenter ? "auto" : undefined}
    >
      <Box
        bg={mode("gray.200", "gray.700")}
        h="52"
        p="4"
        boxShadow={mode("sm", "sm-dark")}
        position="relative"
        borderRadius="lg"
      >
        <Stack shouldWrapChildren spacing="4">
          <HStack>
            <HStack>
              <Heading
                fontSize={{ sm: "xs", md: "lg", lg: "xl" }}
                fontWeight="bold"
              >
                S
              </Heading>
              <Heading fontSize={{ sm: "xs", md: "lg", lg: "xl" }}>
                {note.season}
              </Heading>
              <Heading
                fontSize={{ sm: "xs", md: "lg", lg: "xl" }}
                fontWeight="bold"
              >
                - E
              </Heading>
              <Heading fontSize={{ sm: "xs", md: "lg", lg: "xl" }}>
                {note.episode}
              </Heading>
            </HStack>
            <Heading
              fontSize={{ sm: "xs", md: "lg", lg: "xl" }}
              noOfLines={1}
              lineHeight="1.2"
              fontWeight="bold"
              color="emphasized"
              ml="4"
            >
              {note.title}
            </Heading>
          </HStack>

          <Divider />

          <ChakraText noOfLines={3}>
            <Badge fontSize="lg" mr="2" variant="none" color="teal.400">
              {note.timestampHr} : {note.timestampMin} : {note.timestampSec}
            </Badge>
            {note.body}
          </ChakraText>
          <Flex align="center" justify="space-between" mt="4">
            <Badge
              fontSize="xs"
              rounded="md"
              fontWeight="medium"
              colorScheme="cyan"
            >
              {note.tag}
            </Badge>
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
                  <NoteForm
                    initialValues={{
                      title: note.title,
                      body: note.body,
                      tag: note.tag,
                      season: note.season,
                      episode: note.episode,
                      timestampHr: note.timestampHr,
                      timestampMin: note.timestampMin,
                      timestampSec: note.timestampSec,
                    }}
                    isEditing={isEditing}
                    note={note}
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
                      <ModalBody>Are you sure?</ModalBody>

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
          </Flex>
        </Stack>
      </Box>
    </Box>
  );
}

export default SingleNote;
