import React, { useState, useRef } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Header, Messages, Label, css, } from "./index";

import axios from "axios";

export const Recover = ({ mobile, error, border, dark, }) => {

    let f_recover = useRef(null);
    let i_username = useRef(null);

    let [messages, setMessages] = useState([]);
    let [processing, setProcessing] = useState(false);

    const submitRecover = async (e) => {

        const data: any = {
            recover: true,
            username: i_username.current.value,
        };

        if (!data.username) {
            f_recover.current.reset();
            setMessages(["Please provide a vaild email address..."]);
            return;
        }

        try {

            setProcessing(true);
            setMessages(["Attempting password reset..."]);

            const { messages } = (await axios.post("/api/setPassword?recover=true", data) as any).data;
            f_recover.current.reset();

            setProcessing(false);
            setMessages(messages);

        } catch (_error) {
            error(_error);
        }

    };

    return <>
        <Header title="Recover Account" />
        <>
            <form ref={f_recover} action="/account/recover" method="post" autoComplete="on" onSubmit={submitRecover}>
                <div>
                    <Label text="Email" mobile={mobile} />
                    <input ref={i_username} name="username" type="email" required={true} tabIndex={1} autoComplete="on" placeholder="Email Address" style={css.input(mobile, border)} />
                </div>
                <br />
                <div>
                    <button type="submit" disabled={processing} style={css.button(dark, border)}>Submit</button>
                    {mobile ? <div><br /></div> : <span> &nbsp; </span>}
                    <Link style={{ color: "royalblue" }} disabled={processing} to="/account/login">Return to Login</Link>
                </div>
            </form>
        </>
        <br />
        <Messages messages={messages} />
    </>;

};

export const mapState = state => ({
    user: state.user,
    mobile: state.settings.mobile,
    border: state.settings.border,
    dark: state.settings.dark,
});
export const mapDispatch = dispatch => ({
    dispatch
});

export default withRouter(connect(mapState, mapDispatch)(Recover as any)) as React.FC<{ error; }> & any;