import {
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  useColorMode,
  useColorModeValue as mode,
  Box,
  Button,
  useToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiFilm,
  FiGitlab,
  FiMoon,
  FiLayers,
  FiSun,
  FiTv,
  FiUserMinus,
  FiX,
} from "react-icons/fi";
import { ColumnHeader, ColumnIconButton } from "./Column";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import useAuth from "../hooks/useAuth";

interface NavLinkProps {
  icon: IconType;
  to: string;
  children: React.ReactNode;
  isSelected: boolean;
}

interface NavHeadingProps {
  children: React.ReactNode;
}

export const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleClick = () => {
    toggleColorMode();
  };

  return (
    <header>
      <Icon fontSize="xl" m="6" cursor="pointer" onClick={handleClick}>
        {colorMode === "dark" ? <FiSun /> : <FiMoon />}
      </Icon>
    </header>
  );
};

export const Navbar = (props: any) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleSignOut() {
    logout();

    toast({
      title: "User signed out",
      description: "You have signed out successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    navigate("/signin");
  }

  const navItems = [
    {
      label: "All Notes",
      icon: FiLayers,
      to: `/home`,
    },
    {
      label: "Movies",
      icon: FiFilm,
      to: `/movies`,
    },
    {
      label: "Shows",
      icon: FiTv,
      to: `/shows`,
    },
    {
      label: "Anime",
      icon: FiGitlab,
      to: `/anime`,
    },
  ];

  return (
    <Flex
      as="nav"
      height="full"
      direction="column"
      justify="space-between"
      bg={mode("gray.100", "gray.700")}
      {...props}
    >
      <Stack spacing="3">
        <ColumnHeader>
          <HStack spacing="3">
            <ColumnIconButton
              onClick={props.onClose}
              aria-label="Close navigation"
              icon={<FiX />}
              display={{
                base: "inline-flex",
                lg: "none",
              }}
            />
            <Text fontWeight="bold" fontSize="md" lineHeight="1.25rem" ml="3">
              bingeboard
            </Text>
            <DarkModeToggle />
          </HStack>
        </ColumnHeader>

        <Stack px="3" spacing="6" bg={mode("gray.100", "gray.700")}>
          <Stack spacing="4">
            {navItems.map((item, id) => (
              <NavLink
                key={id}
                icon={item.icon}
                to={item.to}
                isSelected={location.pathname === item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </Stack>
        </Stack>
      </Stack>
      <HStack
        p="3"
        m="2"
        spacing="6"
        borderRadius="lg"
        _hover={{
          bg: mode("gray.300", "gray.800"),
          cursor: "pointer",
        }}
        _activeLink={{
          bg: mode("gray.300", "gray.800"),
          color: mode("gray.800", "gray.200"),
        }}
        onClick={onOpen}
      >
        <Icon as={FiUserMinus} />
        <Box>sign out</Box>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Out</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure?</ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSignOut}>
              Sign out
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export const NavLink = (props: NavLinkProps) => {
  const { icon, to, isSelected } = props;
  return (
    <Box
      px="2"
      py="1.5"
      borderRadius="md"
      _hover={{
        bg: mode("gray.300", "gray.800"),
      }}
      _activeLink={{
        bg: mode("gray.300", "gray.800"),
        color: mode("gray.800", "gray.200"),
      }}
      bg={isSelected ? mode("gray.300", "gray.800") : undefined}
      color={isSelected ? mode("gray.800", "gray.200") : undefined}
    >
      <HStack justify="space-between">
        <HStack spacing="3">
          <Icon as={icon} />
          <Text as="span" fontSize="sm" lineHeight="1.25rem">
            <Link to={to}>{props.children}</Link>
          </Text>
        </HStack>
      </HStack>
    </Box>
  );
};

export const NavHeading = (props: NavHeadingProps) => (
  <Text
    as="h4"
    fontSize="xs"
    fontWeight="semibold"
    px="2"
    lineHeight="1.25"
    color={mode("gray.600", "gray.400")}
    {...props}
  />
);
