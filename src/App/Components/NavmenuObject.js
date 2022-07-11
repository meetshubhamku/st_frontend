import { FiHome } from "react-icons/fi";

const NavmenuObject = {
  admin: {
    menu: [
      {
        label: "Dashboard",
        to: "/dashboard/admin",
        icon: FiHome,
      },

      {
        label: "Service",
        to: "/dashboard/admin/service",
        icon: FiHome,
      },
      {
        label: "Customer",
        to: "/dashboard/admin/customer",
        icon: FiHome,
      },
      {
        label: "Profile",
        to: "/dashboard/admin/profile",
        icon: FiHome,
      },
      {
        label: "Appointment",
        to: "/",
        icon: FiHome,
      },
    ],
  },
  employee: {
    menu: [
      {
        label: "employee",
        to: "/",
        icon: FiHome,
      },
      {
        label: "employee",
        to: "/",
        icon: FiHome,
      },
    ],
  },
  customer: {
    menu: [
      {
        label: "customer",
        to: "/",
        icon: FiHome,
      },
      {
        label: "customer",
        to: "/",
        icon: FiHome,
      },
    ],
  },
};

export default NavmenuObject;
