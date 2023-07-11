import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiArrowLeft, FiMenu, FiMoreVertical, FiPlus } from "react-icons/fi";
import {
  ColumnButton,
  ColumnHeader,
  ColumnHeading,
  ColumnIconButton,
} from "./Column";
import { SingleMedia } from "./SingleMedia";
import { Navbar } from "./NavMenu";
import { MediaList } from "./MediaList";
import MediaForm from "./MediaForm";
import MediaListContainer from "./MediaListContainer";
import NoteForm from "./NoteForm";

function Layout() {
  const [sidebarIsScrolled, setSidebarIsScrolled] = useState(false);
  const [mediaIsScrolled, setMediaIsScrolled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex height="100vh">
      <Box
        height="full"
        width="14rem"
        display={{
          base: "none",
          lg: "initial",
        }}
        overflowY="auto"
        borderRightWidth="1px"
      >
        <Navbar />
      </Box>
      <Box
        borderRightWidth="1px"
        width={{
          md: "24rem",
          xl: "28rem",
        }}
        display={{
          base: "none",
          md: "initial",
        }}
        overflowY="auto"
        onScroll={(x) => setSidebarIsScrolled(x.currentTarget.scrollTop > 32)}
      >
        <ColumnHeader shadow={sidebarIsScrolled ? "base" : "none"}>
          <HStack justify="space-between" width="full">
            <HStack spacing="3">
              <ColumnIconButton
                onClick={onOpen}
                aria-label="Open Navigation"
                icon={<FiMenu />}
                display={{
                  md: "inline-flex",
                  lg: "none",
                }}
              />
              <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                  <Navbar onClose={onClose} />
                </DrawerContent>
              </Drawer>
              <ColumnHeading>MediaList</ColumnHeading>
            </HStack>
            <MediaForm />
          </HStack>
        </ColumnHeader>
        <MediaListContainer />
      </Box>
      <Box
        flex="1"
        overflowY="auto"
        onScroll={(x) => setMediaIsScrolled(x.currentTarget.scrollTop > 32)}
      >
        <ColumnHeader shadow={mediaIsScrolled ? "base" : "none"}>
          <HStack justify="space-between" width="full">
            <HStack spacing="3">
              <ColumnIconButton
                aria-label="Navigate back"
                icon={<FiArrowLeft />}
                display={{
                  base: "inline-flex",
                  md: "none",
                }}
              />
              {mediaIsScrolled && <ColumnHeading>media</ColumnHeading>}
            </HStack>

            <NoteForm />
          </HStack>
        </ColumnHeader>
        <SingleMedia />
      </Box>
    </Flex>
  );
}

export default Layout;
