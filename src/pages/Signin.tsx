import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useToast,
  Alert,
  AlertIcon,
  Container,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";
// import { Logo } from "./Logo";

const signinSchema = z.object({
  username: z.string().min(3, "Username is required").max(20),
  password: z.string().min(1, "Password is required"),
});

type signinSchemaType = z.infer<typeof signinSchema>;

export default function Signin() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signinSchemaType>({
    resolver: zodResolver(signinSchema),
  });

  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<signinSchemaType> = async (data) => {
    try {
      const response = await axios.post(
        "https://bingeboard.onrender.com/signin/",
        data
      );

      const token = response.data.token;
      const decodedToken: {
        id: string;
        username: string;
        email: string;
        iat: number;
      } = jwt_decode(token);

      if (decodedToken) {
        const loggedInUser = {
          id: decodedToken.id,
          username: decodedToken.username,
          email: decodedToken.email,
          createdAt: "",
          updatedAt: "",
          media: [],
          token: token,
        };

        login(loggedInUser);
      } else {
        console.log("could not decode token");
      }
      toast({
        title: "User signed in",
        description: "You have signed in successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      navigate("/home");
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "An error occurred while signing in",
        status: "error",
        duration: 2000,
        isClosable: true,
        render: () => (
          <Alert status="error">
            <AlertIcon />
            An error occurred while signing in the user.
          </Alert>
        ),
      });
    }
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "16" }}
      px={{ base: "0", sm: "8" }}
      maxH="100vh"
    >
      <Center>
        <Flex flexDirection="column" width="container.md">
          <Center m="3">
            <HStack>
              <Image
                boxSize="70px"
                objectFit="cover"
                src="/logo.png"
                alt="bingeboard"
              />
              <Heading as="h2" fontSize="3xl">
                bingeboard
              </Heading>
            </HStack>
          </Center>
          <Stack
            spacing="8"
            p="4"
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius="lg"
            bgColor="gray.700"
          >
            <Stack mt="4">
              <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                <Heading size={{ base: "sm", md: "md" }}>
                  Sign in to your account
                </Heading>
              </Stack>
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box py={{ base: "0", sm: "8" }} px={{ base: "4", sm: "10" }}>
                <Stack spacing="6">
                  <Stack spacing="5">
                    <FormControl>
                      <FormLabel htmlFor="email">Username</FormLabel>
                      <Input
                        id="username"
                        type="username"
                        _hover={{ borderColor: "teal.500" }}
                        {...register("username")}
                      />
                      {errors.username && (
                        <Box mt="2" color="red-800">
                          {errors.username?.message}
                        </Box>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input
                        id="password"
                        type="password"
                        _hover={{ borderColor: "teal.500" }}
                        {...register("password")}
                      />
                      {errors.password && (
                        <Box mt="2" color="red-800">
                          {errors.password?.message}
                        </Box>
                      )}
                    </FormControl>
                  </Stack>
                  <Stack spacing="6">
                    <Button
                      type="submit"
                      colorScheme="teal"
                      variant="primary"
                      color="white"
                      _hover={{ bg: "teal.400" }}
                      disabled={isSubmitting}
                    >
                      Sign in
                    </Button>
                  </Stack>
                  <HStack spacing="1" justify="center">
                    <Text color="gray.400">Don't have an account?</Text>
                    <Button variant="secondary" colorScheme="teal">
                      <Link href="/signup">Sign up</Link>
                    </Button>
                  </HStack>
                </Stack>
              </Box>
            </form>
          </Stack>
        </Flex>
      </Center>
    </Container>
  );
}
