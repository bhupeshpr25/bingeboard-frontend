import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  useDisclosure,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { FiArrowLeft, FiMenu } from "react-icons/fi";
import { ColumnHeader, ColumnHeading, ColumnIconButton } from "./Column";
import { SingleMedia } from "./Media/SingleMedia";
import { Navbar } from "./NavMenu";
import MediaForm from "./Media/MediaForm";
import MediaListContainer from "./Media/MediaListContainer";
import NoteForm from "./Note/NoteForm";

function Layout() {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sidebarIsScrolled, setSidebarIsScrolled] = useState(false);
  const [mediaIsScrolled, setMediaIsScrolled] = useState(false);
  const [isEditingMedia, setIsEditingMedia] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);

  // get the heading based on the route
  const getHeading = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("/movies")) {
      return "Movies";
    } else if (path.includes("/shows")) {
      return "Shows";
    } else if (path.includes("/anime")) {
      return "Anime";
    } else {
      return "All Media";
    }
  };

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
        bg={mode("gray.100", "gray.800")}
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
              <ColumnHeading>{getHeading()}</ColumnHeading>
            </HStack>
            <MediaForm
              isEditing={isEditingMedia}
              setIsEditing={setIsEditingMedia}
            />
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
              {mediaIsScrolled && <ColumnHeading>Notes</ColumnHeading>}
            </HStack>

            <NoteForm
              isEditing={isEditingNote}
              setIsEditing={setIsEditingNote}
            />
          </HStack>
        </ColumnHeader>
        <SingleMedia />
      </Box>
    </Flex>
  );
}

export default Layout;
