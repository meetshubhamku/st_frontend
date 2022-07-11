import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  GridItem,
  Stack,
  StatHelpText,
} from "@chakra-ui/react";
import {
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { BsPerson } from "react-icons/bs";
import { FiServer, FiUsers } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { BiListCheck } from "react-icons/bi";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getUsers, getEmployees } from "../../Helpers/Admin";
import { getServices } from "../../Helpers/Service";

export default function AdminCardComponent() {
  const [userList, setUserList] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  useEffect(() => {
    getUsersApi();
    getEmployeesApi();
    getServiceList();
  }, []);
  const getServiceList = async () => {
    const res = await getServices();
    if (res.success === true) {
      console.log("services : ", res);
      setServiceList(res.data);
    } else {
      setServiceList([]);
    }
  };

  const getUsersApi = async () => {
    try {
      const res = await getUsers();
      if (res.success === true) {
        setUserList(res.data);
      } else {
        setUserList([]);
      }

      console.log("user details", res);
    } catch (err) {
      console.error("Error from get user api : ", err);
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

  return (
    <>
      <Box maxW="7xl" mx={"auto"} pt={1} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1 fontSize={"4xl"} py={10} fontWeight={"bold"}>
          Dashboard
        </chakra.h1>
        <SimpleGrid
          columns={{ base: 1, md: 3, lg: 4 }}
          spacing={{ base: 5, lg: 8 }}
        >
          <StatsCard
            title={"Customers"}
            stat={userList.length}
            icon={<BsPerson size={"3em"} />}
            statColor="red.300"
            titleColor="green.900"
            cardColor="green.100"
          />

          <StatsCard
            title={"Services"}
            stat={serviceList.length}
            icon={<BiListCheck size={"3em"} />}
            statColor="orange.300"
            titleColor="green.900"
            cardColor="green.100"
          />
          <StatsCard
            title={"Employees"}
            stat={employeesList.length}
            icon={<FiUsers size={"3em"} />}
            statColor="blue.300"
            titleColor="green.900"
            cardColor="green.100"
          />
        </SimpleGrid>
      </Box>
    </>
  );
}

function StatsCard(props) {
  const { title, stat, icon, statColor, titleColor, cardColor } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      // border={"1px solid"}
      // borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
      bg={cardColor}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated color={titleColor}>
            {title}
          </StatLabel>
          <StatNumber fontSize={"4xl"} fontWeight={"bolder"} color={statColor}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}
