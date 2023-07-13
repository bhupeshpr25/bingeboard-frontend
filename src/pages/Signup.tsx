import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useToast,
  Container,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../hooks/useAuth";

const signupSchema = z.object({
  username: z.string().min(3, "Username is required").max(20),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
  //   confirmPassword: z.string().min(1, "Password confirmation is required"),
  //   terms: z.literal(true, {
  //     errorMap: () => ({ message: "You must accept the terms and conditions" }),
  //   }),
  // })
  // .refine((data) => data.password === data.confirmPassword, {
  //   path: ["confirmPassword"],
  //   message: "Passwords do not match",
});

type signupSchemaType = z.infer<typeof signupSchema>;

export default function Signup() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<signupSchemaType> = async (data) => {
    try {
      const response = await axios.post(
        "https://bingeboard.onrender.com/signup/",
        data
      );

      const newUser = {
        id: response.data.id,
        username: data.username,
        email: data.email,
        password: response.data.password,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt,
        media: response.data.media,
        token: response.data.token,
      };

      login(newUser);

      toast({
        title: "User created",
        description: "The user has been created successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      navigate("/signin");
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "An error occurred while creating the user.",
        status: "error",
        duration: 2000,
        isClosable: true,
        render: () => (
          <Alert status="error">
            <AlertIcon />
            An error occurred while creating the user.
          </Alert>
        ),
      });
    }
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "8" }}
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
                  Sign up to get started
                </Heading>
              </Stack>
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box py={{ base: "0", sm: "8" }} px={{ base: "4", sm: "10" }}>
                <Stack spacing="6">
                  <Stack spacing="5">
                    <FormControl>
                      <FormLabel fontWeight="semibold" htmlFor="email">
                        Username
                      </FormLabel>
                      <Input
                        id="username"
                        type="username"
                        _hover={{ borderColor: "teal.500" }}
                        {...register("username")}
                      />
                      {errors.username && (
                        <Box mt="2" color="red.300">
                          {errors.username?.message}
                        </Box>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel fontWeight="semibold" htmlFor="email">
                        Email
                      </FormLabel>
                      <Input
                        id="email"
                        type="email"
                        _hover={{ borderColor: "teal.500" }}
                        {...register("email")}
                      />
                      {errors.email && (
                        <Box mt="2" color="red.300">
                          {errors.email?.message}
                        </Box>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel fontWeight="semibold" htmlFor="password">
                        Password
                      </FormLabel>
                      <Input
                        id="password"
                        type="password"
                        _hover={{ borderColor: "teal.500" }}
                        {...register("password")}
                      />
                      {errors.password && (
                        <Box mt="2" color="red.300">
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
                      _hover={{ bg: "teal.400" }}
                      disabled={isSubmitting}
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <HStack spacing="1" justify="center">
                    <Text color="gray.400">Already have an account?</Text>
                    <Button variant="secondary" colorScheme="teal">
                      <Link href="/signin">Sign in</Link>
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
