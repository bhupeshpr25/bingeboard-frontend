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
  Select,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { ColumnButton } from "./Column";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMedium, updateMedia } from "../services/apiMedia";
import useAuth from "../hooks/useAuth";
import { IMedia, Medium } from "../api/types";
import { AiOutlineEdit } from "react-icons/ai";

const mediaSchema = z.object({
  title: z.string().min(3, "Title is required").max(100),
  type: z.nativeEnum(Medium),
  description: z.string().max(1000).optional(),
});

type MediaFormValues = z.infer<typeof mediaSchema>;

interface MediaFormProps {
  onClose: () => void;
  initialValues?: MediaFormValues;
  isEditing: boolean;
  media?: IMedia;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NoteForm({
  onClose,
  initialValues,
  isEditing,
  media,
  setIsEditing,
}: MediaFormProps) {
  const { isOpen, onOpen, onClose: onModalClose } = useDisclosure();
  const { getToken } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<MediaFormValues>({
    resolver: zodResolver(mediaSchema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<MediaFormValues> = async (data) => {
    try {
      if (isEditing && media) {
        await updateMedia(media.id, data, getToken());
      } else {
        await createMedium(data, getToken());
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
      <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="scale">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Media</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Media Title</FormLabel>
                <Input placeholder="" {...register("title")} />
                {errors.title && (
                  <Box mt="2" color="red-800">
                    {errors.title?.message}
                  </Box>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Select placeholder="" {...register("type")}>
                  <option value="movie">movie</option>
                  <option value="show">show</option>
                  <option value="anime">anime</option>
                </Select>
                {errors.type && (
                  <Box mt="2" color="red-800">
                    {errors.type?.message}
                  </Box>
                )}
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Description (optional)</FormLabel>
                <Textarea placeholder="" {...register("description")} />
                {errors.description && (
                  <Box mt="2" color="red-800">
                    {errors.description?.message}
                  </Box>
                )}
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
