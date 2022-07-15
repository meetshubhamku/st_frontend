import { FiHome } from "react-icons/fi";
import { MdOutlineDashboard, MdOutlineLocalOffer } from "react-icons/md";
import { BsList } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { SiSimpleanalytics } from "react-icons/si";
import { GrAnnounce } from "react-icons/gr";

const NavmenuObject = {
  admin: {
    menu: [
      {
        label: "Dashboard",
        to: "/dashboard/admin",
        icon: MdOutlineDashboard,
      },
      {
        label: "Analytics",
        to: "/dashboard/admin/analytics",
        icon: SiSimpleanalytics,
      },

      {
        label: "Service",
        to: "/dashboard/admin/service",
        icon: BsList,
      },
      {
        label: "Customer",
        to: "/dashboard/admin/customer",
        icon: BiUser,
      },
      {
        label: "Profile",
        to: "/dashboard/admin/profile",
        icon: ImProfile,
      },
      // {
      //   label: "Appointment",
      //   to: "/",
      //   icon: FiHome,
      // },
      {
        label: "Offer",
        to: "/dashboard/admin/offer",
        icon: MdOutlineLocalOffer,
      },
      {
        label: "Announcement",
        to: "/dashboard/admin/announcement",
        icon: GrAnnounce,
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
