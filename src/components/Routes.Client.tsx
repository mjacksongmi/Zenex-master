import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router";

import Loading from "./Loading";

const Home = lazy(() => import(/* webpackChunkName: "Home" */ "./pages/Home"));
const Products = lazy(() => import(/* webpackChunkName: "Products" */ "./pages/Products/index"));
const Contact = lazy(() => import(/* webpackChunkName: "Contact" */ "./pages/Contact"));
const Account = lazy(() => import(/* webpackChunkName: "Account" */ "./pages/Account/index"));
const Resources = lazy(() => import(/* webpackChunkName: "Resources" */ "./pages/Resources/index"));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"));

export default () => <Switch>
    <Route path="/" exact><Suspense fallback={<Loading />}><Home /></Suspense></Route>
    <Route path="/products"><Suspense fallback={<Loading />}><Products /></Suspense></Route>
    <Route path="/contact" exact><Suspense fallback={<Loading />}><Contact /></Suspense></Route>
    <Route path="/account"><Suspense fallback={<Loading />}><Account /></Suspense></Route>
    <Route path="/resources/:File?"><Suspense fallback={<Loading />}><Resources /></Suspense></Route>
    <Route path="*"><Suspense fallback={<Loading />}><NotFound /></Suspense></Route>
</Switch>;