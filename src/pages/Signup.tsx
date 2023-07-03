import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Center,
  DarkMode,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Logo } from "./Logo";

const signupSchema = z
  .object({
    username: z.string().min(3, "Username is required").max(20),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have more than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type signupSchemaType = z.infer<typeof signupSchema>;

export default function Signup() {
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

      toast({
        title: "User created",
        description: "The user has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate("/signin");
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "An error occurred while creating the user.",
        status: "error",
        duration: 5000,
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

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  return (
    <Flex
      minH={{
        base: "auto",
        md: "100vh",
      }}
      bg="teal.600"
    >
      <Flex maxW="8xl" mx="auto" width="full">
        <Box
          flex="1"
          display={{
            base: "none",
            md: "block",
          }}
        >
          <DarkMode>
            <Flex
              direction="column"
              px={{
                base: "4",
                md: "8",
              }}
              height="full"
              color="on-accent"
            >
              <Flex align="center" h="24">
                {/* <Logo /> */}
              </Flex>
              <Flex flex="1" align="center">
                <Stack spacing="8">
                  <Stack spacing="6">
                    <Heading
                      size={useBreakpointValue({
                        md: "lg",
                        xl: "xl",
                      })}
                    >
                      Start making your dreams come true
                    </Heading>
                    <Text fontSize="lg" maxW="md" fontWeight="medium">
                      Create an account and discover the worlds best UI
                      component framework.
                    </Text>
                  </Stack>
                  <HStack spacing="4">
                    <AvatarGroup
                      size="md"
                      max={useBreakpointValue({
                        base: 2,
                        lg: 5,
                      })}
                      borderColor="on-accent"
                    >
                      <Avatar
                        name="Ryan Florence"
                        src="https://bit.ly/ryan-florence"
                      />
                      <Avatar
                        name="Segun Adebayo"
                        src="https://bit.ly/sage-adebayo"
                      />
                      <Avatar
                        name="Kent Dodds"
                        src="https://bit.ly/kent-c-dodds"
                      />
                      <Avatar
                        name="Prosper Otemuyiwa"
                        src="https://bit.ly/prosper-baba"
                      />
                      <Avatar
                        name="Christian Nwamba"
                        src="https://bit.ly/code-beast"
                      />
                    </AvatarGroup>
                    <Text fontWeight="medium">Join 10.000+ users</Text>
                  </HStack>
                </Stack>
              </Flex>
              <Flex align="center" h="24">
                <Text color="on-accent-subtle" fontSize="sm">
                  © 2022 Chakra UI. All rights reserved.
                </Text>
              </Flex>
            </Flex>
          </DarkMode>
        </Box>
        <Center flex="1" height="100vh" bg="gray.100">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              spacing="8"
              px={{
                base: "4",
                md: "8",
              }}
              py={{
                base: "12",
                md: "48",
              }}
              width="full"
              maxW="md"
              color="gray.800"
            >
              <Stack spacing="6">
                {/* {isMobile && <LogoIcon />} */}
                {isMobile}
                <Stack
                  spacing={{
                    base: "2",
                    md: "3",
                  }}
                  textAlign="center"
                >
                  <Heading
                    size={useBreakpointValue({
                      base: "lg",
                      md: "xl",
                    })}
                  >
                    Get Started
                  </Heading>
                  <Heading
                    size={useBreakpointValue({
                      base: "xs",
                      md: "md",
                    })}
                  >
                    Create account
                  </Heading>
                </Stack>
              </Stack>
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="email">Username</FormLabel>
                    <Input
                      id="username"
                      type="username"
                      border="1px"
                      _hover={{ borderColor: "teal.500" }}
                      {...register("username")}
                    />
                    {errors.username && (
                      <span className="text-red-800 block mt-2">
                        {errors.username?.message}
                      </span>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      border="1px"
                      _hover={{ borderColor: "teal.500" }}
                      {...register("email")}
                    />
                    {errors.email && (
                      <Box color="red-800" display="block" mt="2">
                        {errors.email?.message}
                      </Box>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      id="password"
                      type="password"
                      border="1px"
                      _hover={{ borderColor: "teal.500" }}
                      {...register("password")}
                    />
                    {errors.password && (
                      <Box color="red-800" display="block" mt="2">
                        {errors.password?.message}
                      </Box>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="password">Confirm Password</FormLabel>
                    <Input
                      id="password"
                      type="password"
                      border="1px"
                      _hover={{ borderColor: "teal.500" }}
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <Box color="red-800" display="block" mt="2">
                        {errors.confirmPassword?.message}
                      </Box>
                    )}
                  </FormControl>
                  <Checkbox
                    borderColor="gray.500"
                    _hover={{ borderColor: "teal.500" }}
                    {...register("terms")}
                  >
                    I agree to have fun
                  </Checkbox>
                  {errors.terms && (
                    <Box color="red-800" display="block" mt="2">
                      {errors.terms?.message}
                    </Box>
                  )}
                </Stack>
                <Stack spacing="4">
                  <Button
                    type="submit"
                    bg="teal.500"
                    variant="primary"
                    color="white"
                    _hover={{ bg: "teal.400" }}
                    disabled={isSubmitting}
                  >
                    Sign up
                  </Button>
                </Stack>
                <HStack spacing="1" justify="center">
                  <Text color="GrayText">Already have an account?</Text>
                  <Button
                    variant="secondary"
                    color="teal.500"
                    colorScheme="blue"
                  >
                    <Link href="/signin">Sign in</Link>
                  </Button>
                </HStack>
              </Stack>
            </Stack>
          </form>
        </Center>
      </Flex>
    </Flex>
  );
}
