import {
  Button,
  ButtonProps,
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  IconButton,
  IconButtonProps,
  useColorModeValue as mode,
} from "@chakra-ui/react";

export const ColumnHeader = (props: FlexProps) => (
  <Flex
    minH="12"
    position="sticky"
    zIndex={1}
    top="0"
    px="3"
    align="center"
    bg={mode("gray.50", "gray.800")}
    color={mode("gray.700", "gray.100")}
    {...props}
  />
);
export const ColumnHeading = (props: HeadingProps) => (
  <Heading fontWeight="bold" fontSize="sm" lineHeight="1.25rem" {...props} />
);
export const ColumnButton = (props: ButtonProps) => (
  <Button
    variant="outline"
    size="sm"
    fontSize="xs"
    _hover={{
      bg: mode("gray.100", "gray.700"),
    }}
    _active={{
      bg: mode("gray.200", "gray.600"),
    }}
    _focus={{
      boxShadow: "none",
    }}
    _focusVisible={{
      boxShadow: "outline",
    }}
    {...props}
  />
);
export const ColumnIconButton = (props: IconButtonProps) => (
  <IconButton
    size="sm"
    fontSize="md"
    variant="ghost"
    _hover={{
      bg: mode("gray.100", "gray.700"),
    }}
    _active={{
      bg: mode("gray.200", "gray.600"),
    }}
    _focus={{
      boxShadow: "none",
    }}
    _focusVisible={{
      boxShadow: "outline",
    }}
    {...props}
  />
);
