import React, { useState } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { kill, getUrlParameterByName } from "../../../models/Window";
import { Header, Messages, css, } from "./index";

import axios from "axios";

export const ChangePassword = ({ mobile, history, error, user, dark, border, }) => {

   let f_changepassword,
    i_username,
    i_password,
    i_repeat,
    f_spotcheck,
    i_susername,
    c_sremember,
    i_spassword;

   let [processing, setProcessing] = useState(false);
   let [messages, setMessages] = useState([]);
   let [isConfirmed, setIsConfirmed] = useState(false);

   const submitPasswordRequest = async (e) => {
            
      kill(e);
      const data = {
          username: i_susername.value,
          password: i_spassword.value
      };
      
      try {
          setMessages(["Attempting login..."]);
          setProcessing(true);
          const ReturnUrl = getUrlParameterByName("ReturnUrl", window.location.href);
          const url = "/api/authenticate" + (ReturnUrl && ("?ReturnUrl=" + ReturnUrl) || "");    
          const { messages, success } = (await axios.post(url, data) as any).data;
          setProcessing(false);
          setMessages(messages);
          setIsConfirmed(success);                
      } catch(_error) {
          error(_error);                    
      }

  };
   const submitPassWordChange = async (e) => {
            
      kill(e);
      const data = {
          username: i_username.value,
          password: i_password.value,
          repeat: i_repeat.value
      };

      if(!data.password ||
          data.password.length < 5 ||
          data.password !== data.repeat) {
          setProcessing(false);
          setMessages([data.password.length < 6 ? "Password must be at least 5 characters..." : "Passwords do not match..."]);
          window.setTimeout(() => { setMessages([]); }, 4000);
          return;
      }

      setProcessing(true);
      setMessages(["Attempting password change...."]);

      try {
          
          setProcessing(true);
          setMessages(["Attempting password change..."]);

          const ReturnUrl = getUrlParameterByName("ReturnUrl", window.location.href);
          const url = "/api/setPassword" + (ReturnUrl && "?ReturnUrl=" + ReturnUrl || "");                    
          const r: { success; redirect; } = await axios.post(url, data);
          console.log(r);
          
          f_changepassword.reset();
          setMessages(messages);
          setProcessing(false);
          setIsConfirmed(false);
          
          if(r.success) {

          }
          
          window.setTimeout(() => {
              setMessages([]);
              var r = getUrlParameterByName("ReturnUrl", window.location.href);
              history.push("/account/logout" + (r && "?ReturnUrl=" + r || ""));
          }, 4000);
          if(r.redirect) {
              history.push(`/account/logout?ReturnUrl=${r.redirect}`);
          }

      } catch(_error) {
         console.log(_error);
          window.setTimeout(() => { setMessages([]); }, 4000);
      }

  };

   return !isConfirmed && <div>
       <Header title="Change Password" />
       <div><strong>Please enter your current password to continue</strong></div><br />
       <>
        <form ref={n => { f_spotcheck = n; }} action="/account/authenticate" method="post" onSubmit={submitPasswordRequest}>
            <div>
                <input ref={node => { i_susername = node; }} type="hidden" value={user.username} />
                <input ref={node => { c_sremember = node; }} type="checkbox" defaultChecked={true} style={{display:"none"}} />
                <input ref={node => { i_spassword = node; }} name="password" type="password" required={true} tabIndex={1} autoComplete="off" placeholder="Password" style={css.input(mobile, border)} />
            </div>
            <br />
            <div>
                <button type="submit" style={css.button(dark, border)}>Submit</button>
                {mobile ? <div><br /></div> : <span> &nbsp; </span>}
                <Link type="button" style={{ color: "royalblue" }} to="/account/dashboard">Cancel</Link>
            </div>
        </form>                      
       </>
   </div> ||
   isConfirmed && <div>
       <Header title="Change Password" />
       <>
        <form ref={n => { f_changepassword = n; }} action="/account/dashboard/changepword" method="post" onSubmit={submitPassWordChange}>
            <div>
                <input ref={n => { i_username = n; }} type="hidden" value={user.username} />
                <input ref={n => { i_password = n; }} name="password" type="password" required={true} tabIndex={1} autoComplete="off" placeholder="New Password" style={css.input(mobile, border)} />
            </div>
            <div><input ref={n => { i_repeat = n; }} name="repeat" type="password" required={true} tabIndex={2} autoComplete="off" placeholder="Repeat" style={css.input(mobile, border)} /></div><br />
            <div>
                <button type="submit" style={css.button(dark, border)}>Submit</button>
                {mobile ? <div><br /></div> : <span> &nbsp; </span>}
                <Link type="button" style={{ color: "royalblue" }} to="/account/dashboard">Cancel</Link>
            </div>
        </form>
       </><br />
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

export default withRouter(connect(mapState, mapDispatch)(ChangePassword as any)) as React.FC<{ error; }> & any;