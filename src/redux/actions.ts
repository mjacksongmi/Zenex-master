import { isMobile, isScrolled } from "../models/Window";

import axios from "axios";

export const set_user = (user) => ({ type: "SET_USER", user });
export const set_categories = (categories) => ({ type: "SET_CATEGORIES", categories });
export const set_catalog = (catalog) => ({ type: "SET_CATALOG", catalog });
export const set_meta = (meta) => ({ type: "SET_META", meta });
export const set_token = (token) => ({ type: "SET_TOKEN", token });
export const set_setting = (key, value) => ({ type: "SET_SETTING", key, value });

export const login = ({ user, token }) => async (dispatch, getState) => {
    dispatch(set_user(user));
    dispatch(set_token(token));
};

export const scan_dom = () => (dispatch, getState) => {

    const render = () => {
        dispatch(set_setting("width", window.document.body.clientWidth));
        dispatch(set_setting("landscape", window.document.body.clientWidth >= window.document.body.clientHeight));
        dispatch(set_setting("portrait", window.document.body.clientWidth < window.document.body.clientHeight));
        dispatch(set_setting("mobile", isMobile()));
        dispatch(set_setting("scrolled", isScrolled()));
        dispatch(set_setting("scrollTop", window.pageYOffset || window.document.body.scrollTop));
    };

    let { settings } = getState();

    if (settings["debounce"]) {
        window.clearTimeout(settings["debounce_scan_dom"]);
    }

    let _debounce = window.setTimeout(() => {
        render();
        let { settings } = getState();
        window.clearTimeout(settings["debounce_scan_dom"]);
        dispatch(set_setting("debounce_scan_dom", undefined));
    }, 0);

    dispatch(set_setting("debounce_scan_dom", _debounce));

};