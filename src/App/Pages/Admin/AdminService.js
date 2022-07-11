import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import React from "react";
import Base from "../../Components/Base";

import CategoryComponent from "./CategoryComponent";
import ServiceComponent from "./ServiceComponent";

export default function AdminService() {
  return (
    <>
      <Base>
        <Box margin="10px 10px">
          <Tabs variant="solid-rounded" colorScheme="green" color="green.900">
            <TabList>
              <Tab>Service</Tab>
              <Tab>Category</Tab>
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
    </>
  );
}
