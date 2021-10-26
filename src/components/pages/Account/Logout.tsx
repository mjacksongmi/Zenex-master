import React, { useState, useEffect, useRef } from "react";
import { set_token, set_user, } from "../../../redux/actions";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Header, Messages } from "./index";

import axios from "axios";

export const Logout: React.FC<{ error; history; dispatch; mobile; }> = ({ mobile, error, history, dispatch }) => {
   
   let [messages, setMessages] = useState(["Logging out ....", "Stand by ...."]);
   let [processing, setProcessing] = useState(false);

   useEffect(() => { submitLogout(); }, []);

   const submitLogout = async (e?) => {
       try {           
           setProcessing(true);

           const { success, messages } = (await axios.post("/api/logout?api=true")).data;
           
           console.log(success, messages);

           setMessages([ ...messages, '']);
           if (success) {
               dispatch(set_token(null));
               dispatch(set_user({ username: 'anonymous', role: ['user'] }));
               setMessages([ ...messages, 'Redirecting. Stand by...']);
               window.setTimeout(() => { (history as History & { push }).push("/"); }, 1300);
           } else {               
               window.setTimeout(() => { setMessages([]); }, 4000);
           }
           setProcessing(false);
       } catch(_error) {
           error(_error);
       }
   };    

   return <div>
       <Header title="Account Logout" />       
       <Messages messages={messages} />
   </div>;

};

export const mapState = state => ({
    user: state.user,
    mobile: state.settings.mobile,
});
export const mapDispatch = dispatch => ({
    dispatch
});

export default withRouter(connect(mapState, mapDispatch)(Logout as any)) as React.FC<{ error; }> & any;