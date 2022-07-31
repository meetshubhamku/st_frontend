import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import monthArray from "../../../Components/MonthArray";
import { getAppointmentsByMonth } from "../../../Helpers/Appointment";
import appStatus from "../../User/Appointment/AppoinentStatus";

export default function AppointmentScheduler() {
  const [currentMonthDaysArray, setCurrentMonthDaysArray] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    month: moment().format("MM"),
    year: moment().format("YYYY"),
  });
  const getDaysArray = function (year, month, data) {
    var monthIndex = month - 1; // 0..11 instead of 1..12
    var date = new Date(year, monthIndex, 1);
    var result = [];
    while (date.getMonth() == monthIndex) {
      result.push({
        date: year + "-" + month + "-" + date.getDate(),
        status: "",
        count: 0,
      });
      date.setDate(date.getDate() + 1);
    }

    if (result.length > 0) {
      for (let day of data) {
        for (let dateDay of result) {
          if (
            moment(day.date).format("YYYY-MM-DD") ==
            moment(dateDay.date).format("YYYY-MM-DD")
          ) {
            // console.log("dayi : ", day);
            // console.log("dateDay : ", dateDay);

            dateDay.status = day.status;
            dateDay.count = day.count;
          }
        }
      }
      setCurrentMonthDaysArray(result);
    } else {
      setCurrentMonthDaysArray([]);
    }
  };

  const getAppointmentByDateFunction = async (year, month, fullDate) => {
    const res = await getAppointmentsByMonth(
      moment(fullDate).startOf("month").add("day", 1).format("YYYY-MM-DD"),
      moment(fullDate).endOf("month").add("day", 1).format("YYYY-MM-DD")
    );
    if (res.success) {
      setAppointmentList(res.data);
      getDaysArray(
        year || dateFilter.year,
        month || dateFilter.month,
        res.data
      );
    } else {
      setAppointmentList([]);
    }
  };

  useEffect(() => {
    getAppointmentByDateFunction();
  }, []);

  return (
    <>
      <Box bg="white" px={3} py={5} shadow={"xl"} my={5}>
        <Box>
          <FormControl my={4} maxW="xs">
            {/* <FormLabel>Month</FormLabel> */}
            <Select
              placeholder="Month"
              onChange={(item) => {
                setDateFilter({
                  ...dateFilter,
                  month: moment(item.target.value).format("MM"),
                });
                getAppointmentByDateFunction(
                  dateFilter.year,
                  moment(item.target.value).format("MM"),
                  item.target.value
                );
              }}
            >
              {monthArray.map((item, index) => (
                <option key={index} value={item.date}>
                  {item.label}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
        <StatusLabel />
        {currentMonthDaysArray.length > 0 && (
          <Grid templateColumns="repeat(5, 1fr)" gap={2}>
            {currentMonthDaysArray.map((item, index) => (
              <GridItem
                w="100%"
                h="20"
                bg={SetColor(item.status)}
                key={index}
                // _hover={{
                //   bg: "green.100",
                // }}
              >
                <WrapContainer item={item} />
              </GridItem>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}

const WrapContainer = ({ item }) => {
  return (
    <>
      <PopOverComponent item={item}>
        <Flex
          justifyContent="center"
          alignItems="center"
          h="20"
          flexDirection="column"
        >
          <Box>
            <Text fontWeight="bold" fontSize="small">
              {moment(item.date).format("ddd")}
            </Text>
          </Box>
          <Box>
            <Text fontSize="small">
              {moment(item.date).format("MMM,DD YYYY")}
            </Text>
          </Box>
        </Flex>
      </PopOverComponent>
    </>
  );
};

const PopOverComponent = ({ item, children }) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Text>{children}</Text>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader bg={SetColor(item.status)}>
            {item.status}
          </PopoverHeader>
          <PopoverBody>Total : {item.count}</PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

const SetColor = (status) => {
  switch (status) {
    case appStatus[1].label:
      return "green.100";
    case appStatus[2].label:
      return "green.100";
    case appStatus[3].label:
      return "orange.100";
    case appStatus[4].label:
      return "green.100";
    case appStatus[5].label:
      return "red.100";
    default:
      return "gray.100";
  }
};

const StatusLabel = () => {
  return (
    <>
      <Box>
        {appStatus.map((item, index) => {
          <Tag
            size={item.label}
            key={index}
            variant="subtle"
            colorScheme="cyan"
          >
            <TagLeftIcon boxSize="12px" as={AddIcon} />
            <TagLabel>item.label</TagLabel>
          </Tag>;
        })}
      </Box>
    </>
  );
};
