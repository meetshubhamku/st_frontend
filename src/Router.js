import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminDashboard from "./App/Pages/Admin/AdminDashboard";
import AdminService from "./App/Pages/Admin/AdminService";
import CustomerComponent from "./App/Pages/Admin/CustomerComponent";
import Login from "./App/Pages/Login/Login";
import Profile from "./App/Pages/Profile/Profile";
import Register from "./App/Pages/Register/Register";

export default function Router() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          {<Redirect to="/login" />}
        </Route>
        <Route path="/login" exact>
          <Login userType="customer" />
        </Route>
        <Route path="/admin/login" exact>
          <Login userType="employee" />
        </Route>
        <Route path="/register" exact>
          <Register role={0} userType="customer" />
        </Route>
        <Route path="/admin/register" exact>
          <Register role={1} userType="employee" />
        </Route>
        <Route path="/dashboard/admin" exact>
          <AdminDashboard />
        </Route>
        <Route path="/dashboard/admin/service" exact>
          <AdminService />
        </Route>
        <Route path="/dashboard/admin/profile" exact>
          <Profile />
        </Route>
        <Route path="/dashboard/admin/customer" exact>
          <CustomerComponent />
        </Route>
      </Switch>
    </>
  );
}
