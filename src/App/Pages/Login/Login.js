import React from "react";
import {
  Text,
  Center,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../../Helpers/Auth";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = ({ userType }) => {
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
      <Box bg="grey.800" padding="10">
        <Center>
          <Box marginTop="7" width="30%">
            <Center>
              <Text fontSize="3xl" fontWeight="bold" color="white">
                Login
              </Text>
            </Center>
            <form onSubmit={formik.handleSubmit}>
              <FormControl isRequired marginTop="3">
                <FormLabel htmlFor="email" color="white">
                  Email
                </FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  id="email"
                  type="email"
                  color="white"
                />
                {formik.errors.email ? (
                  <FormHelperText color="red">
                    {formik.errors.email}
                  </FormHelperText>
                ) : null}
              </FormControl>
              <FormControl isRequired marginTop="3">
                <FormLabel htmlFor="email" color="white">
                  Password
                </FormLabel>
                <Input
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  id="password"
                  type="password"
                  color="white"
                />
                {formik.errors.password ? (
                  <FormHelperText color="red">
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}
              </FormControl>
              <Button
                disabled={
                  !(formik.dirty && formik.isValid) || formik.isSubmitting
                }
                isLoading={formik.isSubmitting}
                loadingText={<Spinner />}
                mt={4}
                colorScheme="green"
                type="submit"
                width="100%"
              >
                Submit
              </Button>
              <Center margin={3}>
                <Link to="/register" style={{ color: "white" }}>
                  Don't have an account?
                </Link>
              </Center>
            </form>
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default withRouter(Login);
