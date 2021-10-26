import React, { useRef } from "react";
import { menu, input, link, h1, } from "./css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { kill } from "../../models/Window";

export const MenuMobile = ({ menuOpen, history, user }) => {

   let f_search = useRef(null);
   let i_search = useRef(null);

   const submit_mblsearch = (e?) => { kill(e); history.push(`/products/nameSearch/${i_search.current.value}`); };

   return <>
      <div style={menu(menuOpen)}>
         <form ref={f_search} onSubmit={submit_mblsearch}>
            <input ref={i_search} type="text" placeholder="Search" style={input} />
         </form>
         <br />
         <br />
         <Link to="/" style={link}><h2 style={h1}>Home</h2></Link>
         <Link to="/products" style={link}><h2 style={h1}>Products</h2></Link>
         <Link to="/resources" style={link}><h2 style={h1}>Resources</h2></Link>
         <Link to="/contact" style={link}><h2 style={h1}>Contact</h2></Link>
         <br />
         <br />
         <div>
            {
               user.username !== 'anonymous' && <div>
                  <Link to="/account/dashboard" style={link}>User: {user.username}</Link>
                  <br />
                  <Link to="/account/dashboard">Dashboard</Link>{' | '}
                  <Link to="/account/logout">Logout</Link>
               </div>
               ||
               <div>
                  <div><Link to="/account/login" style={link}>Login</Link></div>
                  <div><Link to="/account/register" style={link}>Register</Link></div>
               </div>
            }
         </div>
      </div>
   </>;

};

export const mapState = (state) => ({
   user: state.user,
   menuOpen: state.settings["MobileMenuOpen"] || false,
});
export const mapDispatch = (dispatch) => ({
});

export default withRouter(connect(mapState, mapDispatch)(MenuMobile as any));