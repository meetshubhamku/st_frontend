import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
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
import React, { useEffect, useState } from "react";
import Base from "../../Components/Base";
import { getAppointments, updateAppointment } from "../../Helpers/Appointment";
import appStatus from "../User/Appointment/AppoinentStatus";

export default function AdminAppointmentComponent() {
  const [appointmentList, setAppointmentList] = useState([]);

  const getAppointentmentListFunction = async () => {
    const res = await getAppointments();
    if (res.success === true) {
      setAppointmentList(res.data);
    } else {
      setAppointmentList([]);
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
      <Base>
        <Text fontSize="4xl" fontWeight="bold">
          Appointments
        </Text>
        <TableContainer bg={"white"} px={5} py={5}>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th fontWeight={"bold"}>Customer</Th>
                <Th fontWeight={"bold"}>Service</Th>
                <Th fontWeight={"bold"}>Price</Th>
                <Th fontWeight={"bold"}>Date Time</Th>
                <Th fontWeight={"bold"}>Status</Th>
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
                            disabled={stat.label === appStatus[0].label}
                          >
                            {stat.label}
                          </option>
                        ))}
                      </Select>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th fontWeight={"bold"}>Customer</Th>
                <Th fontWeight={"bold"}>Service</Th>
                <Th fontWeight={"bold"}>Price</Th>
                <Th fontWeight={"bold"}>Date Time</Th>
                <Th fontWeight={"bold"}>Status</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Base>
    </>
  );
}
