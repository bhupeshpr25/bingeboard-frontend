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
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { ColumnButton } from "./Column";

export default function MediaForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ColumnButton leftIcon={<FiPlus />} onClick={onOpen}>
        Create
      </ColumnButton>
      <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="scale">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Stack</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input placeholder="" />
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Description (optional)</FormLabel>
              <Textarea placeholder="" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Create
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
