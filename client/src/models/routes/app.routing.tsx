import React from "react";
import { Route, Switch } from "react-router-dom";
//import MainUser from "../../module/business/core/main-user.user";
import Home from "../../module/business/components/home/home.business";
import Customers from "../../module/business/components/customers/customers.business";
import CalendarUser from "../../module/business/components/calendar/calendar.business";
import BusinessRegister from "../../module/business/components/authentication/business-register/business-register.business";
import BusinessLogin from "../../module/business/components/authentication/busniess-login/business-login.business";
import EmployeeReset from "../../module/business/components/authentication/busniess-login/reset-employee-password.business";
import SetNewEmployeePassword from "../../module/business/components/authentication/busniess-login/setNew-employee-password.business";

import PrivateRoute from "./private-route.routes";
import AdminRoute from "./admin-route.routes";

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/business" component={Home} />
      <PrivateRoute path="/business/allcustomers" component={Customers} />
      <AdminRoute path="/business/calander" component={CalendarUser} />
      <Route path="/business/register" component={BusinessRegister} />
      <Route path="/business/login" component={BusinessLogin} />
      <Route
        path="/business/resetpassword/:token"
        component={SetNewEmployeePassword}
      />
      <Route path="/business/resetpassword" component={EmployeeReset} />
    </Switch>
  );
};

export default Routing;
