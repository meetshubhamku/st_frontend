import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import Base from "../../Components/Base";
import CreateAppointmentComponent from "./Appointment/CreateAppointmentComponent";
import GetAppointment from "./Appointment/GetAppointment";

export default function UserAppointmentComponent() {
  return (
    <Base>
      <Tabs>
        <TabList>
          <Tab>View Appointment</Tab>
          <Tab>New Appointment</Tab>
        </TabList>

        <TabPanels>
          <TabPanel bg="white">
            <GetAppointment />
          </TabPanel>
          <TabPanel>
            <CreateAppointmentComponent />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Base>
  );
}
