import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  chakra,
} from "@chakra-ui/react";

import React, { Suspense } from "react";
import Base from "../../Components/Base";
import CustomLoader from "../../Components/CustomLoader";

import CategoryComponent from "./CategoryComponent";
import ServiceComponent from "./ServiceComponent";

export default function AdminService() {
  return (
    <>
      <Suspense fallback={<CustomLoader />}>
        <Base>
          <Box margin="10px 10px">
            <chakra.h1 fontSize={"4xl"} py={10} fontWeight={"bold"}>
              Service / Category
            </chakra.h1>
            <Tabs variant="unstyled">
              <TabList>
                <Tab _selected={{ bg: "green.100" }}>Service</Tab>
                <Tab _selected={{ bg: "green.100" }}>Category</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ServiceComponent />
                </TabPanel>
                <TabPanel>
                  <CategoryComponent />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Base>
      </Suspense>
    </>
  );
}
