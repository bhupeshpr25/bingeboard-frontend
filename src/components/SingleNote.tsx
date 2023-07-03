import {
  Stack,
  HStack,
  Badge,
  Heading,
  useColorModeValue as mode,
  Box,
  Text as ChakraText,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";

function SingleNote({ note }: any) {
  const alignCenter = useBreakpointValue({ base: true, lg: false });
  return (
    <Box
      width={{ base: "90%", lg: "container.md" }}
      margin={alignCenter ? "auto" : undefined}
    >
      <Box
        bg={mode("gray.200", "gray.700")}
        h="52"
        p="4"
        boxShadow={mode("sm", "sm-dark")}
        position="relative"
        borderRadius="lg"
      >
        <Stack shouldWrapChildren spacing="4">
          <HStack>
            <HStack>
              <Heading
                fontSize={{ sm: "xs", md: "lg", lg: "xl" }}
                color="subtle"
                fontWeight="bold"
              >
                S
              </Heading>
              <Heading fontSize={{ sm: "xs", md: "lg", lg: "xl" }}>
                {note.season}
              </Heading>
              <Heading
                fontSize={{ sm: "xs", md: "lg", lg: "xl" }}
                color="subtle"
                fontWeight="bold"
              >
                - E
              </Heading>
              <Heading fontSize={{ sm: "xs", md: "lg", lg: "xl" }}>
                {note.episode}{" "}
              </Heading>
            </HStack>
            <Heading
              fontSize={{ sm: "xs", md: "lg", lg: "xl" }}
              noOfLines={1}
              lineHeight="1.2"
              fontWeight="bold"
              color="emphasized"
              ml="4"
            >
              {note.title}
            </Heading>
          </HStack>

          <Divider />

          <ChakraText noOfLines={3}>
            <Badge fontSize="lg" mr="2" variant="none" color="blue.200">
              {note.timestamp}
            </Badge>
            {note.body}
          </ChakraText>
          <Badge fontSize="xs" rounded="md" color="subtle" fontWeight="medium">
            {note.tag}
          </Badge>
        </Stack>
      </Box>
    </Box>
  );
}

export default SingleNote;
