import React from "react";
import { Route, Switch } from "react-router";

import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import Recover from "./Recover";
import ChangePassword from "./ChangePassword";
import Dashboard from "./Dashboard";

export const Routes = ({ error, match, }) => <Switch>
   <Route path={`${match.path}/logout`} exact>
      <Logout error={error} />
   </Route>
   <Route path={`${match.path}/login`} exact>
      <Login error={error} />
   </Route>
   <Route path={`${match.path}/register`} exact>
      <Register error={error} />
   </Route>
   <Route path={`${match.path}/recover`} exact>
      <Recover error={error} />
   </Route>
   <Route path={`${match.path}/dashboard/changepassword`} exact>
      <ChangePassword error={error} />
   </Route>
   <Route path={`${match.path}/*`}>
      <Dashboard error={error} />
   </Route>       
</Switch>;

export default Routes;