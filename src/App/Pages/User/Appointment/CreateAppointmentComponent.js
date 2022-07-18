import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { getEmployees } from "../../../Helpers/Admin";
import { getServices } from "../../../Helpers/Service";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isAuthenticated } from "../../../Helpers/Auth";
import moment from "moment";
import { SpinnerIcon } from "@chakra-ui/icons";
import { addAppointment } from "../../../Helpers/Appointment";

export default function CreateAppointmentComponent() {
  const { user } = isAuthenticated();
  const [serviceList, setServiceList] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);

  const appointmentSchema = Yup.object().shape({
    service_id: Yup.number().required("Service required"),
    employee_id: Yup.number().required("Employee required"),
    note: Yup.string().matches(/^[a-zA-Z0-9_ ]*$/, "Invalid Note"),
    date: Yup.date()
      .required()
      .min(moment().subtract(1, "d"), "Please choose a future date"),
    time: Yup.string()
      .required("Please provide time")
      .test("future-time", "Invalid time.", (value, parent) => {
        if (
          moment(parent.parent.date).format("YYYY:MM:DD") ===
          moment().format("YYYY:MM:DD")
        ) {
          if (value == undefined) {
            return false;
          }
          const time = value.split(":");
          if (time[0] >= 1 && time[0] <= 11) {
            value = value.toString() + " AM";
          } else {
            value = value.toString() + " PM";
          }
          if (value > moment().format("HH:mm A")) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      }),
  });

  const getServiceList = async () => {
    const res = await getServices();
    console.log("service res : ", res);
    if (res.success === true) {
      setServiceList(res.data);
    } else {
      setServiceList([]);
    }
  };
  const getEmployeesApi = async () => {
    try {
      const res = await getEmployees();
      setEmployeesList(res ? res : []);
      console.log("employee data ; ", res);
    } catch (err) {
      console.error("Error from getEmployeeAPi : ", err);
    }
  };
  useEffect(() => {
    getServiceList();
    getEmployeesApi();
  }, []);

  const formik = useFormik({
    initialValues: {
      user_id: user.id,
      status: "Open",
      service_id: "",
      employee_id: "",
      note: "",
      date: "",
      time: "",
    },
    validationSchema: appointmentSchema,
    onSubmit: async (values, onSubmitProp) => {
      const res = await addAppointment(values);
      if (res.success === true) {
        SuccessToast({
          title: "Success",
          description: "Appointment added successfully.",
        });
      } else {
        ErrorToast({
          title: "Error",
          description: "Some error occured. Please try again.",
        });
      }
      onSubmitProp.resetForm();
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
      <Box maxW={400} bg="white" px={10} py={5}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl my={2}>
            <FormLabel htmlFor="first-name">Service</FormLabel>
            <Select
              id="service_id"
              name="service_id"
              onChange={formik.handleChange}
              value={formik.values.service_id}
              placeholder="Service"
            >
              {serviceList.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
            {formik.errors.service_id ? (
              <FormHelperText color="red">
                {formik.errors.service_id}
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl my={2}>
            <FormLabel htmlFor="first-name">Employee</FormLabel>
            <Select
              id="employee_id"
              name="employee_id"
              onChange={formik.handleChange}
              value={formik.values.employee_id}
              placeholder="Employee"
            >
              {/* <option value={null}>Any</option> */}
              {employeesList.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.firstname}
                </option>
              ))}
            </Select>{" "}
            {formik.errors.employee_id ? (
              <FormHelperText color="red">
                {formik.errors.employee_id}
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl my={2}>
            <FormLabel htmlFor="first-name">Note (If any)</FormLabel>
            <Input
              id="note"
              name="note"
              onChange={formik.handleChange}
              value={formik.values.note}
              placeholder="Note"
            />
            {formik.errors.note ? (
              <FormHelperText color="red">{formik.errors.note}</FormHelperText>
            ) : null}
          </FormControl>
          <FormControl my={2}>
            <FormLabel htmlFor="first-name">Date</FormLabel>
            <input
              style={{
                width: "320px",
                height: "40px",
              }}
              type="date"
              id="date"
              name="date"
              onChange={formik.handleChange}
              value={formik.values.date}
            />
            {formik.errors.date ? (
              <FormHelperText color="red">{formik.errors.date}</FormHelperText>
            ) : null}
          </FormControl>

          <FormControl my={2}>
            <FormLabel htmlFor="first-name">Time (eg: 02:22:pm)</FormLabel>
            <input
              style={{
                width: "320px",
                height: "40px",
              }}
              type="time"
              placeholder="02:22:pm"
              min={"10:00"}
              max="21:00"
              id="time"
              name="time"
              onChange={formik.handleChange}
              value={formik.values.time}
            />
            <FormLabel htmlFor="time" fontSize="small">
              Please provide time between 10 am to 9 pm.
            </FormLabel>

            {formik.errors.time ? (
              <FormHelperText color="red">{formik.errors.time}</FormHelperText>
            ) : null}
          </FormControl>

          <Button
            disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}
            loadingText={<SpinnerIcon />}
            isLoading={formik.isSubmitting}
            mt={4}
            type="submit"
            bg="green.100"
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
}
