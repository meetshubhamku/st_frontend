import React, { Suspense } from "react";
import CustomLoader from "./CustomLoader";
import SideNavBar from "./SideNavBar";

export default function Base({ children }) {
  return (
    <>
      <Suspense fallback={<CustomLoader />}>
        <SideNavBar>{children}</SideNavBar>
      </Suspense>
    </>
  );
}
