import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  useToast,
  Heading,
  Text,
  useColorModeValue,
  FormHelperText,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { signup } from "../../Helpers/Auth";
import { useFormik } from "formik";

import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Header from "../Home/Header";
import { NavLink } from "react-router-dom";

export default function NewRegister({ role, userType }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const SignupSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, "Too Short!")
      .max(15, "Too Long!")
      .matches(/^[a-zA-Z]{2,15}$/, "Invalid firstname")
      .required("Required"),
    lastname: Yup.string()
      .min(2, "Too Short!")
      .max(15, "Too Long!")
      .matches(/^[a-zA-Z]{2,15}$/, "Invalid lastname")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Password too short")
      .required("Required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/,
        "Weak Password."
      ),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords donot match")
      .required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
      firstname: "",
      lastname: "",
      is_blocked: false,
      role,
      userType,
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, onSubmitProp) => {
      const res = await signup(values);

      if (res.success === true) {
        SuccessToast({
          title: "Account created.",
          description: "We've created your account for you.",
        });
        onSubmitProp.resetForm();
      } else {
        return ErrorToast({
          title: "Error.",
          description: res.message,
        });
      }
      onSubmitProp.setSubmitting(false);
    },
  });
  const toast = useToast();

  const SuccessToast = ({
    title = "Account created.",
    description = "We've created your account for you.",
  }) => {
    toast({
      position: "top-right",
      title,
      description,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };
  const ErrorToast = ({
    title = "Mismatch Password.",
    description = "Your both passwords must match.",
  }) => {
    toast({
      position: "top-right",
      title,
      description,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <>
      <Header />
      <Flex
        minH={"90vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={6} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our great services ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <form onSubmit={formik.handleSubmit}>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        id="firstname"
                        type="text"
                        name="firstname"
                        onChange={formik.handleChange}
                        value={formik.values.firstname}
                      />
                      {formik.errors.firstname ? (
                        <FormHelperText color="red">
                          {formik.errors.firstname}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        id="lastname"
                        type="text"
                        name="lastname"
                        onChange={formik.handleChange}
                        value={formik.values.lastname}
                      />
                      {formik.errors.lastname ? (
                        <FormHelperText color="red">
                          {formik.errors.lastname}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.errors.email ? (
                    <FormHelperText color="red">
                      {formik.errors.email}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {formik.errors.password ? (
                    <FormHelperText color="red">
                      {formik.errors.password}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      id="cpass"
                      name="confirm_password"
                      onChange={formik.handleChange}
                      value={formik.values.confirm_password}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowConfirmPassword(
                            (showConfirmPassword) => !showConfirmPassword
                          )
                        }
                      >
                        {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {formik.errors.confirm_password ? (
                    <FormHelperText color="red">
                      {formik.errors.confirm_password}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    disabled={
                      !(formik.dirty && formik.isValid) || formik.isSubmitting
                    }
                    isLoading={formik.isSubmitting}
                    loadingText="Submitting"
                    size="lg"
                    bg={"green.400"}
                    color={"white"}
                    _hover={{
                      bg: "green.900",
                    }}
                    type="submit"
                  >
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Already a user?{" "}
                    <NavLink
                      style={{
                        color: "blue",
                      }}
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </Text>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
