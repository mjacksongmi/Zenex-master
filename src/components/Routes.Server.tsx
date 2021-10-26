import React from "react";

import { Switch, Route } from "react-router";

const Home = require("./pages/Home").default;
const Products = require("./pages/Products/index").default;
const Contact = require("./pages/Contact").default;
const Account = require("./pages/Account/index").default;
const Resources = require("./pages/Resources/index").default;
const NotFound = require("./pages/NotFound").default;

export default props => <Switch>
    <Route path="/" exact><Home /></Route>
    <Route path="/products"><Products /></Route>    
    <Route path="/contact" exact><Contact /></Route>
    <Route path="/account"><Account /></Route>
    <Route path="/resources/:FileType"><Resources /></Route>
    <Route path="*"><NotFound /></Route>    
</Switch>;