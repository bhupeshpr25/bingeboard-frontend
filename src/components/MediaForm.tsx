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
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { ColumnButton } from "./Column";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMedium } from "../services/apiMedia";
import useAuth from "../hooks/useAuth";
import { Medium } from "../api/types";

const mediaSchema = z.object({
  title: z.string().min(3, "Title is required").max(100),
  type: z.nativeEnum(Medium),
  description: z.string().max(1000).optional(),
});

type MediaFormValues = z.infer<typeof mediaSchema>;

export default function MediaForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getToken } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<MediaFormValues>({
    resolver: zodResolver(mediaSchema),
  });

  const onSubmit: SubmitHandler<MediaFormValues> = async (data) => {
    try {
      await createMedium(data, getToken());
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ColumnButton leftIcon={<FiPlus />} onClick={onOpen}>
        Create
      </ColumnButton>
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
                <Button colorScheme="teal" mr={3} type="submit">
                  Create
                </Button>
                <Button variant="ghost" onClick={onClose}>
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
