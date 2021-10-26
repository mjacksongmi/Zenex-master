import React, { useState } from "react";
import { connect } from "react-redux";
import { canvas } from "../../../styles/Global";
import { withRouter } from "react-router";

import ServerRoutes from "./Routes.Server";
import ClientRoutes from "./Routes.Client";

let Routes = typeof window === 'undefined' ? ServerRoutes : ClientRoutes;

export module css {
    export const jar = mobile => ({ textAlign: "center" }) as any;
    export const control_jar = (m, bc, cc) => ({
        textAlign: m ? "center" : "left",
        width: m ? "98%" : "640px",
        display: "inline-block",
        margin: m ? "1%" : "10px auto",
        padding: m ? "0 4px" : "0 29px",
        backgroundColor: cc,
        border: `solid 1px ${bc}`
    });
    export const input = (m, bc) => ({
        display: "inline-block",
        width: m ? "90%" : "290px",
        border: `solid 1px ${bc}`,
        borderRadius: "1px",
        padding: "4px 0 4px 4px",
        margin: m ? "3px auto" : "0 4px 4px 0",
    }) as any;
    export const button = (bg, bc) => ({
        display: "inline-block",
        verticalAlign: "middle",
        padding: "4px 13px",
        background: bg,
        borderRadius: "1px",
        border: `solid 1px ${bc}`,
        backgroundColor: "steelblue",
        color: "#fff",
    }) as any;
}

export const Label = ({ text, mobile }) => !mobile && <label style={{ display: "inline-block", width: "100px", }}>{text}</label>;
export const Header = ({ title }) => <>
    <br />
    <h3>{title}</h3>
    <br />
</>;
export const Messages = ({ messages }) => <>
    <br />
    <br />
    <div style={{ textAlign: "left", }}>
        {messages.map((message, index, array) => <div key={index}>{message || <br />}</div>)}
    </div>
</>;

export const Account: React.FC<TMergedAccountComponent> = ({ mobile, border, match, }) => {

    let [processing, setProcessing] = useState(false);
    let [messages, setMessages] = useState([]);
    let [token, setToken] = useState(null);

    const error = (error) => {
        console.log(error, error.message);
        setMessages(["Error(s) processing request..."]);
        setProcessing(false);
        window.setTimeout(() => { setMessages([]); }, 4000);
    };

    return <div style={css.jar(mobile)}>
        <div style={css.control_jar(mobile, border, canvas) as any}>
            <Routes error={error} match={match} />
            <Messages messages={messages} />
        </div>
    </div>;

};

export const mapState = (state, props) => ({
    mobile: state.settings.mobile,
    user: state.user,
    border: state.settings.border,
});
export const mapDispatch = dispatch => ({ dispatch });

export default withRouter(connect(mapState, mapDispatch)(Account as any));