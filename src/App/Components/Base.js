import React from "react";
import Navbar from "./Navbar";
import SideNavBar from "./SideNavBar";

export default function Base({ children }) {
  return (
    <>
      <SideNavBar>{children}</SideNavBar>
      {/* <Navbar /> */}
    </>
  );
}
