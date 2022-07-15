import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Spinner,
  FormHelperText,
} from "@chakra-ui/react";

import Header from "../Home/Header";

import { NavLink, useHistory, withRouter } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../../Helpers/Auth";
import { useFormik } from "formik";
import * as Yup from "yup";

const NewLogin = ({ userType }) => {
  const navigate = useHistory();
  const loginupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      userType,
    },
    validationSchema: loginupSchema,
    onSubmit: async (values, onSubmitProp) => {
      const res = await signin(values);
      console.log("res : ", res);

      if (res.success === true) {
        SuccessToast({
          title: "Login Success.",
          description: "Welcome",
        });
        authenticate(res, () => {
          const { role } = isAuthenticated().user;
          switch (role) {
            case 2:
              return navigate.replace("/dashboard/admin");
            case 1:
              return navigate.replace("/dashboard/employee");
            default:
              return navigate.replace("/dashboard/user");
          }
        });
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
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
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
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    id="email"
                    type="email"
                  />
                  {formik.errors.email ? (
                    <FormHelperText color="red">
                      {formik.errors.email}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    id="password"
                    type="password"
                  />
                  {formik.errors.password ? (
                    <FormHelperText color="red">
                      {formik.errors.password}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Link color={"blue.400"}>Forgot password?</Link>
                  </Stack>
                  <Button
                    disabled={
                      !(formik.dirty && formik.isValid) || formik.isSubmitting
                    }
                    isLoading={formik.isSubmitting}
                    loadingText={<Spinner />}
                    type="submit"
                    bg={"green.400"}
                    color={"white"}
                    _hover={{
                      bg: "green.900",
                    }}
                  >
                    Sign in
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Don't have an account?
                    <NavLink
                      style={{
                        color: "blue",
                      }}
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default withRouter(NewLogin);
