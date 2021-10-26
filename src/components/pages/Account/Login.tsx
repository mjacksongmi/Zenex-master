import React, { useState, useRef } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { login, } from "../../../redux/actions";
import { Header, Messages, Label, css } from "./index";
import { kill, getUrlParameterByName } from "../../../models/Window";
import { Link } from "react-router-dom";

import axios from "axios";

export const Login = ({ mobile, error, history, dispatch, dark, border, }) => {

    let f_login = useRef(null);
    let i_un = useRef(null);
    let i_ps = useRef(null)
    let i_rm = useRef(null);

    let [messages, setMessages] = useState([]);
    let [processing, setProcessing] = useState(false);

    const submitLogin = async (e) => {
        kill(e);
        if (!i_un.current.value || !i_ps.current.value) {
            setMessages(["Please enter a username and password..."]);
            setProcessing(false);
            return;
        }
        const data = {
            username: i_un.current.value,
            password: i_ps.current.value,
            remember: i_rm.current.checked,
        };
        try {
            setMessages(["Attempting login..."]);
            setProcessing(true);
            const ReturnUrl = getUrlParameterByName("ReturnUrl", window.location.href);
            const url = "/api/authenticate" + (ReturnUrl && ("?ReturnUrl=" + ReturnUrl) || "");
            let { success, redirect, session, messages } = (await axios.post(url, data) as any).data;
            setMessages([ ...messages, '']);
            if (success) {
                dispatch(login(session));
                setMessages([ ...messages, 'Redirecting. Stand by...']);
                window.setTimeout(() => { (history as History & { push }).push(redirect); }, 1300);
            } else {
                setProcessing(false);
                window.setTimeout(() => { setMessages([]); }, 4000);
            }
        } catch (_error) {
            error(_error);
        }
    };

    return <div>
        <Header title="Account Login" />
        <form ref={f_login} action="/account/login" method="post" autoComplete="on" onSubmit={submitLogin}>
            <div>
                <Label mobile={mobile} text="Username" />
                <input ref={i_un} name="username" type="email" required={true} tabIndex={1} autoComplete="on" placeholder="Username" style={css.input(mobile, border)} />
            </div>
            <div>
                <Label mobile={mobile} text="Password" />
                <input ref={i_ps} name="password" type="password" required={true} tabIndex={2} pattern=".{4,19}" autoComplete="on" placeholder="Password" style={css.input(mobile, border)} />
            </div>
            <div>
                <div>
                    <br />
                    <label style={{ width: "100%" }}>
                        <input ref={i_rm} name="remember" type="checkbox" tabIndex={3} autoComplete="on" style={{ display: "inline-block", verticalAlign: "middle", }} />
                        <span style={{ whiteSpace: "nowrap", verticalAlign: "middle", }}>&nbsp; Remain logged in</span>
                    </label>
                </div>
            </div>
            <div>
                <br />
                <button type="submit" disabled={processing} tabIndex={4} style={css.button(dark, border)}>Login</button>
                {mobile ? <div><br /></div> : <span> &nbsp; </span>}
                <Link disabled={processing} tabIndex={5} style={{ color: "royalblue" }} to={"/account/register"}>Register</Link>
                {mobile ? <div><br /></div> : <span> &nbsp;|&nbsp; </span>}
                <Link disabled={processing} tabIndex={6} style={{ color: "royalblue" }} title="Click here to recover your account with a temporary password" to="/account/recover">Forgot Password?</Link>
            </div>
        </form>
        <Messages messages={messages} />
    </div>;

};

export const mapState = state => ({
    user: state.user,
    mobile: state.settings.mobile,
    dark: state.settings.dark,
    border: state.settings.border,
});
export const mapDispatch = dispatch => ({
    dispatch
});

export default withRouter(connect(mapState, mapDispatch)(Login as any)) as React.FC<{ error; }> & any;