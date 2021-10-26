import React, { useState, useRef } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Header, Messages, Label, css, } from "./index";

export const Dashboard = ({ mobile, history, error, user, border, dark, canvas, }) => {

    let [messages, setMessages] = useState([]);

    let f_dashboard = useRef(null);
    let i_username = useRef(null);
    let i_firstName = useRef(null);
    let i_lastName = useRef(null);

    return <div>
        <Header title="Account Dashboard" />
        <form ref={f_dashboard} action="/account/dashboard" method="post" autoComplete="on">
            <div>
                <Label text="Username" mobile={mobile} />
                <input ref={i_username} name="username" type="email" required={true} disabled={true} value={user.username} autoComplete="off" style={css.input(mobile, border)} />
            </div>
            <div>
                <Label text="First Name" mobile={mobile} />
                <input ref={i_firstName} name="firstName" type="text" defaultValue={user.firstName || ""} placeholder="First Name"  style={css.input(mobile, border)} />
            </div>
            <div>
                <Label text="Last Name" mobile={mobile} />
                <input ref={i_lastName} name="lastName" type="text" defaultValue={user.lastName || ""} placeholder="Last Name"  style={css.input(mobile, border)} />
            </div>
            <br />
            <div>
                <button type="button" onClick={e => { history.push("/account/dashboard/changepassword"); }} style={css.button(dark, border)}>Change Password</button>{' '}
                <button type="button" onClick={e => { history.push("/account/logout"); }} style={css.button(canvas, border)}>Logout</button>
            </div>
        </form>
        <br />
        <br />
        <a style={{ color: "royalblue" }} href="/">&gt;&gt;&nbsp; Return Home</a>
        <Messages messages={messages} />
    </div>;
};

export const mapState = state => ({
    user: state.user,
    mobile: state.settings.mobile,
    border: state.settings.border,
    dark: state.settings.dark,
    canvas: state.settings.canvas,
});
export const mapDispatch = dispatch => ({
    dispatch
});

export default withRouter(connect(mapState, mapDispatch)(Dashboard as any)) as React.FC<{ error; }> & any;