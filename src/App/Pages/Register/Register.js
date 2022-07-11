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
import { Link } from "react-router-dom";
import { signup } from "../../Helpers/Auth";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register({ role, userType }) {
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
      <Box bg="grey.800" padding="10">
        <Center>
          <Box marginTop="7" width="50%">
            <Center>
              <Text fontSize="3xl" fontWeight="bold" color="white">
                Registration
              </Text>
            </Center>

            <form onSubmit={formik.handleSubmit}>
              <FormControl isRequired marginTop="3">
                <FormLabel htmlFor="firstname" color="white">
                  Firstname
                </FormLabel>
                <Input
                  id="firstname"
                  type="text"
                  color="white"
                  name="firstname"
                  placeholder="John"
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                />
                {formik.errors.firstname ? (
                  <FormHelperText color="red">
                    {formik.errors.firstname}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl isRequired marginTop="3">
                <FormLabel htmlFor="lastname" color="white">
                  Lastname
                </FormLabel>
                <Input
                  id="lastname"
                  type="text"
                  color="white"
                  name="lastname"
                  placeholder="Doe"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                />
                {formik.errors.lastname ? (
                  <FormHelperText color="red">
                    {formik.errors.lastname}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl isRequired marginTop="3">
                <FormLabel htmlFor="email" color="white">
                  Email
                </FormLabel>
                <Input
                  id="email"
                  type="email"
                  color="white"
                  name="email"
                  placeholder="test@example.com"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email ? (
                  <FormHelperText color="red">
                    {formik.errors.email}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl isRequired marginTop="3">
                <FormLabel htmlFor="password" color="white">
                  Password
                </FormLabel>

                <Input
                  id="password"
                  type="password"
                  color="white"
                  name="password"
                  placeholder="*********"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password ? (
                  <FormHelperText color="red">
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl isRequired marginTop="3">
                <FormLabel htmlFor="cpass" color="white">
                  Confirm Password
                </FormLabel>
                <Input
                  id="cpass"
                  type="password"
                  color="white"
                  placeholder="*********"
                  name="confirm_password"
                  onChange={formik.handleChange}
                  value={formik.values.confirm_password}
                />
                {formik.errors.confirm_password ? (
                  <FormHelperText color="red">
                    {formik.errors.confirm_password}
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
                <Link to="/login" style={{ color: "white" }}>
                  Already a user?
                </Link>
              </Center>
            </form>
          </Box>
        </Center>
      </Box>
    </>
  );
}
