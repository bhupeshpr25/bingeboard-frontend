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
  Collapse,
  Box,
} from "@chakra-ui/react";
import { FiChevronDown, FiPlus } from "react-icons/fi";
import { ColumnButton } from "./Column";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../hooks/useAuth";
import { createNote } from "../services/apiNote";
import { useMediaId } from "../hooks/useMediaId";

const noteSchema = z.object({
  title: z.string().min(2, "Longer title is required").max(100),
  body: z.string().max(1000).optional(),
  tag: z.string().min(3).max(10),
  season: z.number().min(1).max(100),
  episode: z.number().min(1).max(100),
  timestampHr: z.number().min(0).max(23),
  timestampMin: z.number().min(0).max(59),
  timestampSec: z.number().min(0).max(59),
});

type NoteFormValues = z.infer<typeof noteSchema>;

export default function NoteForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isToggleOpen, onToggle } = useDisclosure();
  const { getToken } = useAuth();
  const currentMediaId = useMediaId();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
  });

  console.log(errors);

  const onSubmit: SubmitHandler<NoteFormValues> = async (data) => {
    try {
      await createNote(data, currentMediaId, getToken());
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
          <ModalHeader>Create Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Note Title</FormLabel>
                <Input placeholder="" {...register("title")} />
                {errors.title && (
                  <Box mt="2" color="red-800">
                    {errors.title?.message}
                  </Box>
                )}
              </FormControl>

              <FormControl mt="4">
                <FormLabel>Body</FormLabel>
                <Textarea placeholder="" {...register("body")} />
                {errors.body && (
                  <Box mt="2" color="red-800">
                    {errors.body?.message}
                  </Box>
                )}
              </FormControl>

              <FormControl>
                <HStack onClick={onToggle} mt="4" cursor="pointer">
                  <Box>Additional Fields</Box>
                  <FiChevronDown />
                </HStack>
              </FormControl>

              <FormControl>
                <Collapse in={isToggleOpen} animateOpacity>
                  <FormControl mt="4">
                    <HStack>
                      <FormLabel>tag</FormLabel>
                      <Input {...register("tag")} />
                      {errors.tag && (
                        <Box mt="2" color="red-800">
                          {errors.tag?.message}
                        </Box>
                      )}
                    </HStack>
                  </FormControl>
                  <HStack spacing="8">
                    <FormControl>
                      <HStack>
                        <FormLabel>season</FormLabel>
                        <Input
                          type="number"
                          {...register("season", { valueAsNumber: true })}
                        />
                        {errors.season && (
                          <Box mt="2" color="red-800">
                            {errors.season?.message}
                          </Box>
                        )}
                      </HStack>
                    </FormControl>
                    <FormControl my="6">
                      <HStack>
                        <FormLabel>episode</FormLabel>
                        <Input
                          type="number"
                          {...register("episode", { valueAsNumber: true })}
                        />
                        {errors.episode && (
                          <Box mt="2" color="red-800">
                            {errors.episode?.message}
                          </Box>
                        )}
                      </HStack>
                    </FormControl>
                  </HStack>
                  <FormControl>
                    <FormLabel>timestamp</FormLabel>
                    <HStack>
                      <HStack>
                        <FormLabel>hr</FormLabel>
                        <Input
                          type="number"
                          {...register("timestampHr", { valueAsNumber: true })}
                        />
                        {errors.timestampHr && (
                          <Box mt="2" color="red-800">
                            {errors.timestampHr?.message}
                          </Box>
                        )}
                      </HStack>
                      <FormLabel>:</FormLabel>
                      <HStack>
                        <FormLabel>min</FormLabel>
                        <Input
                          type="number"
                          {...register("timestampMin", { valueAsNumber: true })}
                        />
                        {errors.timestampMin && (
                          <Box mt="2" color="red-800">
                            {errors.timestampMin?.message}
                          </Box>
                        )}
                      </HStack>
                      <FormLabel>:</FormLabel>
                      <HStack>
                        <FormLabel>sec</FormLabel>
                        <Input
                          type="number"
                          {...register("timestampSec", { valueAsNumber: true })}
                        />
                        {errors.timestampSec && (
                          <Box mt="2" color="red-800">
                            {errors.timestampSec?.message}
                          </Box>
                        )}
                      </HStack>
                    </HStack>
                  </FormControl>
                </Collapse>
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
