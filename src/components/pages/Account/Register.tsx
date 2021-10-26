import React, { useState, useRef } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Header, Messages, Label, css, } from "./index";

import axios from "axios";

export const Register = ({ mobile, error, border, dark, }) => {

   let f_register = useRef(null);
   let i_username = useRef(null);
   let i_password = useRef(null);
   let i_repeat = useRef(null);
   let c_remember = useRef(null);

   let [processing, setProcessing] = useState(false);
   let [messages, setMessages] = useState([]);

   const submitRegister = async (e) => {

      const data = {
         username: i_username.current.value,
         password: i_password.current.value,
         repeat: i_repeat.current.value,
         remember: c_remember.current.checked
      };

      if (!data.username) { setMessages(["Please provide a valid email..."]); return; }

      try {
         setProcessing(true);
         setMessages(["Attempting registration..."]);
         const { messages, success } = (await axios.post("/api/register", data) as any).data;
         f_register.current.reset();
         setProcessing(false);
         setMessages(messages);
         if (!success) {
            window.setTimeout(() => { setMessages([]); }, 4000);
         }
      } catch (_error) {
         error(_error);
      }

   };

   return <div>
      <Header title="Register New Account" />
      <form ref={f_register} action="/account/register" method="post" autoComplete="on" onSubmit={submitRegister}>
         <div>
            <Label text="Username" mobile={mobile} />
            <input ref={i_username} name="username" type="email" required={true} tabIndex={1} autoComplete="on" placeholder="Username" style={css.input(mobile, border)} />
         </div>
         <div>
            <Label text="Password" mobile={mobile} />
            <input ref={i_password} name="password" type="password" required={true} tabIndex={2} pattern=".{4,13}" autoComplete="on" placeholder="Password" style={css.input(mobile, border)} />
         </div>
         <div>
            <Label text="Repeat" mobile={mobile} />
            <input ref={i_repeat} name="password" type="password" required={true} tabIndex={3} pattern=".{4,13}" autoComplete="on" placeholder="Password" style={css.input(mobile, border)} />
         </div>
         <br />
         <div>
            <div style={{ textAlign: mobile ? "center" : "left" }}>
               <label style={{ width: "100%" }}>
                  <input ref={c_remember} name="remember" type="checkbox" tabIndex={4} autoComplete="on" style={{ verticalAlign: "middle", }} />
                  <span style={{ whiteSpace: "nowrap" }}>&nbsp; Remain logged in</span>
               </label>
            </div>
         </div>
         <br />
         <div>
            <button type="submit" disabled={processing} tabIndex={4} style={css.button(dark, border)}>Submit</button>
            {mobile ? <div><br /></div> : <span> &nbsp; </span>}
            <Link style={{ color: "royalblue" }} disabled={processing} to="/account/login">Return to Login</Link>
         </div>
      </form>
      <Messages messages={messages} />
   </div>;
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

export default withRouter(connect(mapState, mapDispatch)(Register as any)) as React.FC<{ error; }> & any;