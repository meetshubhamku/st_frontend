import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiTask } from "react-icons/bi";
import {
  getAppointmentByUser,
  getAppointments,
} from "../../../Helpers/Appointment";

export default function UserCardComponent() {
  const [appointmentList, setApointmentServiceList] = useState([]);

  const getAppointmentByUserApi = async () => {
    try {
      const res = await getAppointmentByUser();
      setApointmentServiceList(res ? res.data : []);
      console.log(" user appointment data ; ", res.data);
    } catch (err) {
      console.error("Error from getAppointments : ", err);
    }
  };
  useEffect(() => {
    getAppointmentByUserApi();
  }, []);
  return (
    <>
      <Box maxW="7xl" mx={"auto"} pt={1} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          fontSize={"4xl"}
          py={10}
          fontWeight={"bold"}
          color="green.400"
        >
          Dashboard
        </chakra.h1>
        <SimpleGrid
          columns={{ base: 1, md: 3, lg: 4 }}
          spacing={{ base: 5, lg: 8 }}
        >
          <StatsCard
            title={"Total Appointments"}
            stat={appointmentList.length}
            icon={<BiTask size={"3em"} />}
            statColor="green.300"
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
      // bg={cardColor}
      bg={useColorModeValue("white", "green.900")}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated color={titleColor}>
            {title}
          </StatLabel>
          <StatNumber fontSize={"5xl"} fontWeight={"bold"} color={statColor}>
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
