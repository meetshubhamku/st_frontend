import { Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Base from "../../../Components/Base";
import { getServices } from "../../../Helpers/Service";
import ServiceCardComponent from "./ServiceCardComponent";

export default function UserServiceComponent() {
  const [serviceList, setServiceList] = useState([]);

  const getServiceList = async () => {
    const res = await getServices();
    console.log("service res : ", res);
    if (res.success === true) {
      setServiceList(res.data);
    } else {
      setServiceList([]);
    }
  };

  useEffect(() => {
    getServiceList();
  }, []);
  return (
    <>
      <Base>
        <Text fontSize="4xl" fontWeight="bold" my={5} px={12}>
          Our Services
        </Text>
        <Flex justifyContent="space-evenly">
          {serviceList &&
            serviceList.length > 0 &&
            serviceList.map((item, index) => (
              <ServiceCardComponent
                key={index}
                title={item.name}
                price={item.price}
                description={item.description}
              />
            ))}
        </Flex>
      </Base>
    </>
  );
}
