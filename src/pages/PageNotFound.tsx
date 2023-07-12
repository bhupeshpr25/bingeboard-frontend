import { Box, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
    >
      <Heading as="h1" size="lg">
        page does not exist
      </Heading>
      <Flex>
        back to{" "}
        <Box ml="2" as="span" color="teal.500" fontWeight="bold">
          <Link to="/home">home</Link>
        </Box>
      </Flex>
    </Flex>
  );
}

export default PageNotFound;
