import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
  // Collapse,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { ColumnButton } from "../Column";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../../hooks/useAuth";
import { createNote, updateNote } from "../../services/apiNote";
import { useMediaId } from "../../hooks/useMediaId";
import { INote, NoteFormValues } from "../../api/types";
import { AiOutlineEdit } from "react-icons/ai";

const noteSchema = z.object({
  title: z.string().min(2, "Longer title is required").max(100),
  body: z.string().max(1000).optional(),
  tag: z.string().min(3).max(10).optional(),
  season: z.number().min(1).max(100).optional(),
  episode: z.number().min(1).max(100).optional(),
  timestampHr: z.number().min(0).max(23).optional(),
  timestampMin: z.number().min(0).max(59).optional(),
  timestampSec: z.number().min(0).max(59).optional(),
});

interface NoteFormProps {
  onClose: () => void;
  initialValues?: NoteFormValues;
  isEditing: boolean;
  note?: INote;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NoteForm({
  onClose,
  initialValues,
  isEditing,
  note,
}: NoteFormProps) {
  const { isOpen, onOpen, onClose: onModalClose } = useDisclosure();
  // const { isOpen: isToggleOpen, onToggle } = useDisclosure();
  const { getToken } = useAuth();
  const currentMediaId = useMediaId();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<NoteFormValues> = async (data) => {
    try {
      if (isEditing && note) {
        await updateNote(note.id, data, getToken());
      } else {
        await createNote(data, currentMediaId, getToken());
        console.log(data);
      }
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    onOpen();
  };

  return (
    <>
      {!isEditing && (
        <ColumnButton leftIcon={<FiPlus />} onClick={onOpen}>
          Create
        </ColumnButton>
      )}
      {isEditing && (
        <IconButton
          variant="ghost"
          aria-label="edit"
          icon={<AiOutlineEdit />}
          onClick={handleEdit}
        />
      )}
      <Modal
        isCentered
        onClose={onModalClose}
        isOpen={isOpen}
        motionPreset="scale"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel fontWeight="semibold">Note Title</FormLabel>
                <Input placeholder="" {...register("title")} />
                {errors.title && (
                  <Box mt="2" color="red.300">
                    {errors.title?.message}
                  </Box>
                )}
              </FormControl>

              <FormControl mt="4">
                <FormLabel fontWeight="semibold">Body</FormLabel>
                <Textarea placeholder="" {...register("body")} />
                {errors.body && (
                  <Box mt="2" color="red.300">
                    {errors.body?.message}
                  </Box>
                )}
              </FormControl>

              {/* <FormControl>
                <HStack onClick={onToggle} mt="4" cursor="pointer">
                  <Box>Additional Fields</Box>
                  <FiChevronDown />
                </HStack>
              </FormControl> */}

              <FormControl>
                {/* <Collapse in={isToggleOpen} animateOpacity> */}
                <FormControl mt="4">
                  <HStack>
                    <FormLabel fontWeight="semibold">tag</FormLabel>
                    <Input {...register("tag")} />
                    {errors.tag && (
                      <Box mt="2" color="red.300">
                        {errors.tag?.message}
                      </Box>
                    )}
                  </HStack>
                </FormControl>
                <HStack spacing="8">
                  <FormControl>
                    <HStack>
                      <FormLabel fontWeight="semibold">season</FormLabel>
                      <Input
                        type="number"
                        {...register("season", { valueAsNumber: true })}
                      />
                      {errors.season && (
                        <Box mt="2" color="red.300">
                          {errors.season?.message}
                        </Box>
                      )}
                    </HStack>
                  </FormControl>
                  <FormControl my="6">
                    <HStack>
                      <FormLabel fontWeight="semibold">episode</FormLabel>
                      <Input
                        type="number"
                        {...register("episode", { valueAsNumber: true })}
                      />
                      {errors.episode && (
                        <Box mt="2" color="red.300">
                          {errors.episode?.message}
                        </Box>
                      )}
                    </HStack>
                  </FormControl>
                </HStack>
                <FormControl>
                  <FormLabel fontWeight="semibold">timestamp</FormLabel>
                  <HStack>
                    <HStack>
                      <FormLabel fontWeight="normal">hr</FormLabel>
                      <Input
                        type="number"
                        {...register("timestampHr", { valueAsNumber: true })}
                      />
                      {errors.timestampHr && (
                        <Box mt="2" color="red.300">
                          {errors.timestampHr?.message}
                        </Box>
                      )}
                    </HStack>
                    <FormLabel>:</FormLabel>
                    <HStack>
                      <FormLabel fontWeight="normal">min</FormLabel>
                      <Input
                        type="number"
                        {...register("timestampMin", { valueAsNumber: true })}
                      />
                      {errors.timestampMin && (
                        <Box mt="2" color="red.300">
                          {errors.timestampMin?.message}
                        </Box>
                      )}
                    </HStack>
                    <FormLabel>:</FormLabel>
                    <HStack>
                      <FormLabel fontWeight="normal">sec</FormLabel>
                      <Input
                        type="number"
                        {...register("timestampSec", { valueAsNumber: true })}
                      />
                      {errors.timestampSec && (
                        <Box mt="2" color="red.300">
                          {errors.timestampSec?.message}
                        </Box>
                      )}
                    </HStack>
                  </HStack>
                </FormControl>
                {/* </Collapse> */}
              </FormControl>
              <ModalFooter>
                <Button
                  colorScheme="teal"
                  mr={3}
                  type="submit"
                  onClick={onModalClose}
                >
                  {isEditing ? "Update" : "Create"}
                </Button>
                <Button variant="ghost" onClick={onModalClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
