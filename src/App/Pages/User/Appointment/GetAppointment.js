import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  deleteAppointment,
  getAppointments,
  updateAppointment,
} from "../../../Helpers/Appointment";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  useDisclosure,
  Badge,
  Select,
  Flex,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import moment from "moment";
import { AiOutlineReload } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getServices } from "../../../Helpers/Service";
import { getEmployees } from "../../../Helpers/Admin";
import { SpinnerIcon } from "@chakra-ui/icons";
import appStatus from "./AppoinentStatus";

export default function GetAppointment() {
  const [appointmentList, setAppointmentList] = useState([]);
  useEffect(() => {
    getAppointentmentListFunction();
  }, []);

  const filterAppointmentWithStatus = async (status) => {
    let newData = await getAppointments();
    newData = newData.data;
    if (status !== "All") {
      newData = newData.filter((item) => {
        return item.status === status;
      });
    }

    setAppointmentList(newData);
  };

  const getAppointentmentListFunction = async () => {
    const res = await getAppointments();
    if (res.success === true) {
      setAppointmentList(res.data);
    } else {
      setAppointmentList([]);
    }
  };

  const DeleteAppointmentFunction = async (id) => {
    const res = await deleteAppointment(id);
    if (res.success === true) {
      SuccessToast({
        title: "Success",
        description: "Appointment deleted successfully.",
      });
      getAppointentmentListFunction();
    } else {
      ErrorToast({
        title: "Error",
        description: "Some error occured. Please try again.",
      });
    }
  };

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
      <Flex>
        <Box p="4">
          <Button
            my={2}
            variant="solid"
            bg="gray.200"
            leftIcon={<AiOutlineReload />}
            onClick={() => {
              getAppointentmentListFunction();
            }}
          >
            Reload
          </Button>
        </Box>
        <Spacer />
        <Box p="4">
          <Select
            maxW={200}
            onChange={(event) => {
              filterAppointmentWithStatus(event.target.value);
            }}
          >
            {appStatus.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>

      {appointmentList && appointmentList.length > 0 && (
        <Accordion>
          {appointmentList.map((item, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton _expanded={{ bg: "green.100" }}>
                  <Box flex="1" textAlign="left">
                    {item.service.name} @{" "}
                    {moment(item.date).format("MMMM DD, YYYY")}
                    {"   "}
                    {moment(item.time, "HH:mm:ss").format("LT")}
                  </Box>
                  <Box flex="1" textAlign="right">
                    <Badge colorScheme="orange">{item.status}</Badge>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>

              <AccordionPanel pb={4} bg={"white"}>
                Hello {item.user.firstname}, <br />
                <br />
                You have an appointment scheduled for service{" "}
                <b>{item.service.name}</b> on{" "}
                <b>{moment(item.date).format("MMMM DD, YYYY")}</b> at{" "}
                <b> {moment(item.time, "HH:mm:ss").format("LT")}</b>
                <br />
                <b>
                  Status : <Badge colorScheme="orange">{item.status}</Badge>
                </b>
                <br />
                <Flex justifyContent="space-between">
                  <UpdateModal
                    isEnabled={item.status !== "Open"}
                    item={item}
                    getAppointentmentListFunction={
                      getAppointentmentListFunction
                    }
                  />

                  <DeleteModal
                    isEnabled={item.status !== "Open"}
                    item={item}
                    DeleteAppointmentFunction={DeleteAppointmentFunction}
                  />
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
}

function DeleteModal({ item, DeleteAppointmentFunction, isEnabled }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        variant={"ghost"}
        colorScheme="red"
        disabled={isEnabled}
      >
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Appointment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this appointment?
            <br />
            {item.service.name} @ {moment(item.date).format("MMMM DD, YYYY")}
          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="solid"
              colorScheme={"red"}
              onClick={() => {
                DeleteAppointmentFunction(item.id);
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function UpdateModal({ item, getAppointentmentListFunction, isEnabled }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [serviceList, setServiceList] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);
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
  const formik = useFormik({
    initialValues: {
      id: item.id,
      user_id: item.id,
      status: item.status,
      service_id: item.service.id,
      employee_id: item.employee.id,
      user_id: item.user.id,
      note: item.note,
      date: item.date,
      time: item.time,
    },
    validationSchema: appointmentSchema,
    onSubmit: async (values, onSubmitProp) => {
      console.log("values updated : ", values);
      const res = await updateAppointment(values);
      console.log("RESPOSN : ", res);
      if (res.success === true) {
        SuccessToast({
          title: "Success",
          description: "Appointment Updated successfully.",
        });
        getAppointentmentListFunction();
      } else {
        ErrorToast({
          title: "Error",
          description: "Some error occured. Please try again.",
        });
      }
      onSubmitProp.resetForm();
      onClose();
    },
  });
  return (
    <>
      <Button
        onClick={onOpen}
        variant={"ghost"}
        colorScheme="green"
        disabled={isEnabled}
      >
        Update
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Appointment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                  <FormHelperText color="red">
                    {formik.errors.note}
                  </FormHelperText>
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
                  value={moment(formik.values.date).format("YYYY-MM-DD")}
                />
                {formik.errors.date ? (
                  <FormHelperText color="red">
                    {formik.errors.date}
                  </FormHelperText>
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
                  <FormHelperText color="red">
                    {formik.errors.time}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Button
                disabled={
                  !(formik.dirty && formik.isValid) || formik.isSubmitting
                }
                loadingText={<SpinnerIcon />}
                isLoading={formik.isSubmitting}
                type="submit"
                bg="green.100"
                mr={2}
              >
                Submit
              </Button>
              <Button variantColor="blue" onClick={onClose}>
                Close
              </Button>
            </form>
          </ModalBody>

          {/* <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="solid" colorScheme={"green"} type="submit">
              Update
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}
