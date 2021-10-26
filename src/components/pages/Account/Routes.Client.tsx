import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router";

import Loading from "../../Loading";

const Login = lazy(async () => await import(/* webpackChunkName: "Login" */ "./Login"));
const Logout = lazy(async () => await import(/* webpackChunkName: "Logout" */ "./Logout"));
const Register = lazy(async () => await import(/* webpackChunkName: "Register" */ "./Register"));
const Recover = lazy(async () => await import(/* webpackChunkName: "Recover" */ "./Recover"));
const ChangePassword = lazy(async () => await import(/* webpackChunkName: "ChangePassword" */ "./ChangePassword"));
const Dashboard = lazy(async () => await import(/* webpackChunkName: "Dashboard" */ "./Dashboard"));

export const Routes = ({ error, match, }) => <Switch>
   <Route path={`${match.path}/logout`} exact>
      <Suspense fallback={<Loading />}>
         <Logout error={error} />
      </Suspense>
   </Route>
   <Route path={`${match.path}/login`} exact>
      <Suspense fallback={<Loading />}>
         <Login error={error} />
      </Suspense>
   </Route>
   <Route path={`${match.path}/register`} exact>
      <Suspense fallback={<Loading />}>
         <Register error={error} />
      </Suspense>
   </Route>
   <Route path={`${match.path}/recover`} exact>
      <Suspense fallback={<Loading />}>
         <Recover error={error} />
      </Suspense>
   </Route>
   <Route path={`${match.path}/dashboard/changepassword`} exact>
      <Suspense fallback={<Loading />}>
         <ChangePassword error={error} />
      </Suspense>
   </Route>
   <Route path={`${match.path}/*`}>
      <Suspense fallback={<Loading />}>
         <Dashboard error={error} />
      </Suspense>
   </Route>       
</Switch>;

export default Routes;