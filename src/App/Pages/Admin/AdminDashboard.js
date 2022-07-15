import React, { Suspense } from "react";
import Base from "../../Components/Base";
import AdminCardComponent from "./AdminCardComponent";
import CustomLoader from "../../Components/CustomLoader";
import { Spinner } from "@chakra-ui/react";

export default function AdminDashboard() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Base>
          <AdminCardComponent />
        </Base>
      </Suspense>
    </>
  );
}
