import * as actions from "../redux/actions";

import React from "react";
import { hydrate } from "react-dom";

import Catalog from "../models/Catalog";
import App from "../components/App";
import Routes from "../components/Routes.Client";
import store from "../redux/store";

window.___gmi = { reduxstore: store, };

store.dispatch(actions.set_user(window.props.user));
store.dispatch(actions.set_catalog(Catalog(window.props.catalog)));
store.dispatch(actions.set_categories(window.props.categories));
store.dispatch(actions.set_meta(window.props.meta));
store.dispatch(actions.set_setting("mobile", window.props.settings.mobile));

window.onload = () => {
    hydrate(<App Store={store} Routes={Routes} Location={window.location.pathname} />, window.document.getElementById("react"));
};