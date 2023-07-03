import {
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  useColorMode,
  useColorModeValue as mode,
  Box,
} from "@chakra-ui/react";
import {
  FiBookmark,
  FiBookOpen,
  FiClock,
  FiFileText,
  FiFilm,
  FiGitlab,
  FiLink,
  FiMoon,
  FiMusic,
  FiSettings,
  FiStar,
  FiSun,
  FiTrash2,
  FiTv,
  FiUsers,
  FiVideo,
  FiX,
} from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";
import { ColumnHeader, ColumnIconButton } from "./Column";
import { Link } from "react-router-dom";

export const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <Icon fontSize="xl" mt="2" cursor="pointer" onClick={toggleColorMode}>
        {colorMode === "light" ? <FiMoon /> : <FiSun />}
      </Icon>
    </header>
  );
};

export const Navbar = (props: any) => {
  const defaultNavs = [
    {
      label: "Home",
      icon: FiClock,
      selected: true,
      to: `/home`,
    },
    {
      label: "Favorites",
      icon: FiStar,
      selected: false,
      to: `/favorites`,
    },
  ];
  const categories = [
    {
      label: "Movies",
      icon: FiFilm,
      selected: false,
      to: `/movies`,
    },
    {
      label: "Shows",
      icon: FiTv,
      selected: false,
      to: `/shows`,
    },
    {
      label: "Anime",
      icon: FiGitlab,
      selected: false,
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
            <FiBookmark />
            <Text fontWeight="bold" fontSize="md" lineHeight="1.25rem">
              bingeboard
            </Text>
          </HStack>
        </ColumnHeader>

        <Stack px="3" spacing="6" bg={mode("gray.100", "gray.700")}>
          <Stack spacing="2">
            {defaultNavs.map((item, id) => (
              <NavLink key={id} icon={item.icon} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </Stack>
          <Stack spacing="3">
            <NavHeading>CATEGORIES</NavHeading>
            <Stack spacing="2" pl="1">
              {categories.map((item, id) => (
                <NavLink key={id} icon={item.icon} to={item.to}>
                  {item.label}
                </NavLink>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );
};

export const NavLink = (props: any) => {
  const { icon, to } = props;
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

export const NavHeading = (props: any) => (
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
