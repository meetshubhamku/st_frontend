import {
  Box,
  Button,
  Flex,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";

import moment from "moment";
import React, { Suspense, useEffect, useState } from "react";
import CustomLoader from "../../Components/CustomLoader";
import Base from "../../Components/Base";
import {
  cancelAppointment,
  getAppointments,
  updateAppointment,
} from "../../Helpers/Appointment";
import appStatus from "../User/Appointment/AppoinentStatus";
import PaymentButton from "../Admin/Payment/PaymentButton";

export default function AdminAppointmentComponent() {
  const [appointmentList, setAppointmentList] = useState([]);

  const getAppointentmentListFunction = async () => {
    const res = await getAppointments();
    if (res.success === true) {
      if (res.data.length > 0) {
        cancelPastAppointment(res.data);
      }
      console.log("app list : ", res.data);

      setAppointmentList(res.data.reverse());
    } else {
      setAppointmentList([]);
    }
  };

  const cancelPastAppointment = async (data) => {
    const dataWithoutClosedStatus = data.filter((data) => {
      return data.status !== "Closed";
    });
    if (dataWithoutClosedStatus.length > 0) {
      const ids = [];
      dataWithoutClosedStatus.map((item) => {
        if (
          moment(item.date).format("YYYY-MM-DD") < moment().format("YYYY-MM-DD")
        ) {
          ids.push(item.id);
        }
      });

      if (ids.length > 0) {
        const res = await cancelAppointment(ids);
        console.log("can data : ", res);
      }
    }
  };

  useEffect(() => {
    getAppointentmentListFunction();
  }, []);

  const updateStatusFunction = async (item, newStatus) => {
    item.status = newStatus;
    console.log("stst : ", item);

    const res = await updateAppointment(item);

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
  };

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
      <Suspense fallback={<CustomLoader />}>
        <Base>
          <Text fontSize="4xl" fontWeight="bold">
            Appointments
          </Text>
          <Box my={2} py={2}>
            <Flex justifyContent={"space-between"}>
              <Select
                variant="outline"
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
            </Flex>
          </Box>
          <TableContainer bg={"white"} px={5} py={5}>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th fontWeight={"bold"}>Customer</Th>
                  <Th fontWeight={"bold"}>Service</Th>
                  <Th fontWeight={"bold"}>Price</Th>
                  <Th fontWeight={"bold"}>Date Time</Th>
                  <Th fontWeight={"bold"}>Status</Th>
                  <Th fontWeight={"bold"}>Payment</Th>
                </Tr>
              </Thead>
              <Tbody>
                {appointmentList.length > 0 &&
                  appointmentList.map((item, index) => (
                    <Tr key={index}>
                      <Td>
                        {item.user.firstname} {item.user.lastname}
                      </Td>
                      <Td>{item.service.name}</Td>
                      <Td>{item.service.price}</Td>
                      <Td>
                        {/* <Button
                        colorScheme="red"
                        my={1}
                        size="xs"
                        variant={"ghost"}
                      >
                        Delete
                      </Button> */}
                        {moment(item.date).format("MMM DD, YYYY")} {item.time}
                      </Td>
                      <Td>
                        <Select
                          value={item.status}
                          onChange={(event) => {
                            updateStatusFunction(item, event.target.value);
                          }}
                        >
                          {appStatus.map((stat, index) => (
                            <option
                              key={index}
                              value={stat.value}
                              // disabled={stat.label === appStatus[5].label}
                            >
                              {stat.label}
                            </option>
                          ))}
                        </Select>
                      </Td>
                      <Td>
                        {/* <Button
                          variant="link"
                          disabled={item.status === appStatus[5].value}
                          onClick={() => {
                            alert("payment");
                          }}
                        >
                          Payment
                        </Button> */}
                        {item.status !== appStatus[5].value && (
                          <PaymentButton item={item} />
                        )}
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
              {/* <Tfoot>
              <Tr>
                <Th fontWeight={"bold"}>Customer</Th>
                <Th fontWeight={"bold"}>Service</Th>
                <Th fontWeight={"bold"}>Price</Th>
                <Th fontWeight={"bold"}>Date Time</Th>
                <Th fontWeight={"bold"}>Status</Th>
              </Tr>
            </Tfoot> */}
            </Table>
          </TableContainer>
        </Base>
      </Suspense>
    </>
  );
}
