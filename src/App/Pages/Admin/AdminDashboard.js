import React, { Suspense } from "react";
import Base from "../../Components/Base";
import AdminCardComponent from "./AdminCardComponent";
import CustomLoader from "../../Components/CustomLoader";
import { Spinner } from "@chakra-ui/react";
import MultitypeChart from "./Charts/MultitypeChart";
import AppointmentScheduler from "./Appointment/AppointmentScheduler";

export default function AdminDashboard() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Base>
          <AdminCardComponent />
          {/* <MultitypeChart /> */}
          <AppointmentScheduler />
        </Base>
      </Suspense>
    </>
  );
}
