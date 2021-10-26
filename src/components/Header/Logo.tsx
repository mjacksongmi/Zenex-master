import React from "react";
import { Link } from "react-router-dom";

export const logolink = m => ({ display: m ? "block" : "inline-block", textAlign: m ? "center" : "left", }) as any;
export const logo = m => ({
   verticalAlign: "middle",
   height: "34px",
   width: "auto",        
   marginRight: m ? "auto" : "20px",
   marginLeft: m ? "auto" : 0,
}) as any;

export const Logo = ({ mobile }) => <Link style={logolink(mobile)} to="/">
   <img style={logo(mobile)} src="/images/logo_zenex.gif" />
</Link>;

export default Logo;