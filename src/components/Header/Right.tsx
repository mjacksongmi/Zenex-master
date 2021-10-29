import React from "react";
import { Link, } from "react-router-dom";
import { Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";

import SearchDesktop from "./Search";

export const DesktopRight = ({ user }) => {

   const AnonMenu = () => <>
      <Link className="menulinkright" to="/account/login">
         <span>Login/Register</span>
      </Link>
   </>;
   const LoggedInMenu = () => <>
      <div>
         <Link className="menulinkright" to="/account/dashboard">
            <span>Dashboard</span>
         </Link>
      </div>
      <div>
         <Link className="menulinkright" to="/account/logout">
            <span>Logout</span>
         </Link>
      </div>
   </>;

   return <>
      <div className="inlineblock">
         <SearchDesktop />
      </div>
      <div className="inlineblock">
         <div className="menulinkdiv">
            <Dropdown overlay={<div style={{ background: "#fff", padding: "10px", borderRadius: "0 0 4px 4px", border: "solid 1px #aaa", }}>
               { user.username !== 'anonymous' ? <LoggedInMenu /> : <AnonMenu /> }
            </div>} placement="bottomRight">
               <span className="inlineblock" style={{ margin: "3px 8px", }}>
                  <UserOutlined /> {user.username !== 'anaonymous' && user.firstName}
               </span>
            </Dropdown>
         </div>
      </div>
   </>;
};

export default DesktopRight; 