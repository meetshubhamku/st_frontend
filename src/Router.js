import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminDashboard from "./App/Pages/Admin/AdminDashboard";
import AdminOfferComponent from "./App/Pages/Admin/AdminOfferComponent";
import AdminService from "./App/Pages/Admin/AdminService";
import CustomerComponent from "./App/Pages/Admin/CustomerComponent";
import Profile from "./App/Pages/Profile/Profile";
import Home from "./App/Pages/Home/Home";
import NewRegister from "./App/Pages/Register/NewRegister";
import NewLogin from "./App/Pages/Login/NewLogin";
import AdminChartComponent from "./App/Pages/Admin/AdminChartComponent";
import AdminAnnouncements from "./App/Pages/Admin/AdminAnnouncements";
import UserDashboard from "./App/Pages/User/UserDashboard";
import UserServiceComponent from "./App/Pages/User/Service/UserServiceComponent";
import UserAppointmentComponent from "./App/Pages/User/UserAppointmentComponent";
import EmployeeDashboard from "./App/Pages/Employee/EmployeeDashboard";
import AdminAppointmentComponent from "./App/Pages/Admin/AdminAppointmentComponent";

export default function Router() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/login" exact>
          {/* <Login userType="customer" /> */}
          <NewLogin userType="customer" />
        </Route>
        <Route path="/admin/login" exact>
          {/* <Login userType="employee" /> */}
          <NewLogin userType="employee" />
        </Route>

        <Route path="/register" exact>
          {/* <Register role={0} userType="customer" /> */}
          <NewRegister role={0} userType="customer" />
        </Route>
        <Route path="/admin/register" exact>
          {/* <Register role={1} userType="employee" /> */}
          <NewRegister role={1} userType="employee" />
        </Route>

        <Route path="/dashboard/admin" exact>
          <AdminDashboard />
        </Route>
        <Route path="/dashboard/admin/service" exact>
          <AdminService />
        </Route>

        <Route path="/dashboard/admin/analytics" exact>
          <AdminChartComponent />
        </Route>

        <Route path="/dashboard/admin/announcement" exact>
          <AdminAnnouncements />
        </Route>

        <Route path="/dashboard/admin/profile" exact>
          <Profile />
        </Route>
        <Route path="/dashboard/admin/customer" exact>
          <CustomerComponent />
        </Route>

        <Route path="/dashboard/admin/offer" exact>
          <AdminOfferComponent />
        </Route>

        <Route path="/dashboard/admin/appointment" exact>
          <AdminAppointmentComponent />
        </Route>

        <Route path="/dashboard/user" exact>
          <UserDashboard />
        </Route>
        <Route path="/dashboard/user/profile" exact>
          <Profile />
        </Route>
        <Route path="/dashboard/user/service" exact>
          <UserServiceComponent />
        </Route>
        <Route path="/dashboard/user/appointment" exact>
          <UserAppointmentComponent />
        </Route>

        <Route path="/dashboard/employee" exact>
          <EmployeeDashboard />
        </Route>
      </Switch>
    </>
  );
}
