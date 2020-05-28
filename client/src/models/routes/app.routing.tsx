import React from "react";
import {
  Route,
  Switch,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
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
import SerivcesSettings from "../../module/business/components/settings/services/serivces.settings";

const Routing: React.FC<RouteComponentProps<{}>> = (props) => {
  const renderShirts = (routerProps: any) => {
    const domain = routerProps.match.params.domain;
    console.log(domain);
    return <Home />;
  };
  return (
    <Switch>
      {/* Authentnication */}
      <Route path="/business/register" component={BusinessRegister} />
      <Route path="/business/login" component={BusinessLogin} />
      {/* Reset Password */}
      <Route
        path="/business/resetpassword/:token"
        component={SetNewEmployeePassword}
      />
      <Route path="/business/resetpassword" component={EmployeeReset} />
      {/* Home */}
      <Route
        exact
        path="/business/:domain"
        render={(a: any) => renderShirts(a)}
      />
      {/* Settings */}
      <Route
        path="/business/:domain/settings/services"
        render={() => <SerivcesSettings />}
      />
      <Route
        path="/business/:domain/settings/hours"
        render={(a: any) => renderShirts(a)}
      />
      <Route
        path="/business/:domain/settings/employees"
        render={(a: any) => renderShirts(a)}
      />
      <Route
        path="/business/:domain/settings/businesssettings"
        render={(a: any) => renderShirts(a)}
      />
      {/* Cosumers */}
      <PrivateRoute path="/business/allcustomers" component={Customers} />
      {/* Calander */}
      <AdminRoute path="/business/calander" component={CalendarUser} />

    </Switch>
  );
};

export default withRouter(Routing);
