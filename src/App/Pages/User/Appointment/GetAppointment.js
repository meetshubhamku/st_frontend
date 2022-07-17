import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getAppointment, getAppointments } from "../../../Helpers/Appointment";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  useDisclosure,
  Badge,
  Select,
  Flex,
  Spacer,
  Center,
} from "@chakra-ui/react";
import moment from "moment";
import { AiOutlineReload } from "react-icons/ai";

export default function GetAppointment() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [appointmentList, setAppointmentList] = useState([]);
  useEffect(() => {
    getAppointentmentListFunction();
  }, []);

  const appStatus = [
    {
      label: "All",
      value: "All",
    },
    {
      label: "Open",
      value: "Open",
    },
    {
      label: "Accepted",
      value: "Accepted",
    },
    {
      label: "InProcess",
      value: "InProcess",
    },
    {
      label: "Cancelled",
      value: "Cancelled",
    },
    {
      label: "Closed",
      value: "Closed",
    },
  ];

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
      console.log("get app : ", res);
      setAppointmentList(res.data);
    } else {
      setAppointmentList([]);
    }
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

      <Accordion>
        {appointmentList.length > 0 ? (
          appointmentList.map((item, index) => (
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
                <Button
                  variant="outline"
                  colorScheme="green"
                  mt={3}
                  onClick={onOpen}
                >
                  Update
                </Button>
              </AccordionPanel>
            </AccordionItem>
          ))
        ) : (
          <Center>No Data</Center>
        )}
      </Accordion>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Appointment
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
