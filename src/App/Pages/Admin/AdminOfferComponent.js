import { Box, chakra } from "@chakra-ui/react";
import React from "react";
import Base from "../../Components/Base";

export default function AdminOfferComponent() {
  return (
    <>
      <Base>
        <Box maxW="7xl" mx={"auto"} pt={1} px={{ base: 2, sm: 12, md: 17 }}>
          <chakra.h1 fontSize={"4xl"} py={10} fontWeight={"bold"}>
            Offer
          </chakra.h1>
        </Box>
      </Base>
    </>
  );
}
