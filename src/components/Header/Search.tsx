import React, { useEffect, useRef } from "react";
import { headersearchinput, } from "./css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { useState } from "react";
import { Dropdown } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export const HeaderSearch = ({ history, backgroundColor }) => {

   const updateQuery = location => { setSearchQuery(''); };

   let [searchQuery, setSearchQuery] = useState('');

   let f_search = useRef(null);
   let i_search = useRef(null);
   let unlisten;

   useEffect(() => {
      i_search.current.value = searchQuery;
   }, [searchQuery]);

   useEffect(() => {
      unlisten = history.listen(updateQuery);
   });
   useEffect(() => () => {
      if (unlisten) { unlisten(); }
   }, []);

   const keyup = (e) => {
      if (e.keyCode === 14) {
         f_search.current.submit(e);
      }
   };
   const search = (e) => {
      e.preventDefault();
      history.push(`/products/nameSearch/${searchQuery}`);
   };

   return <div>
      <form onSubmit={search} ref={f_search}>
         <div className="inlineblock vmid relative headersearchcontrol">
            <div style={{ position: "static", }}>
               <Dropdown overlay={<div>Title</div>}>
                  <>
                     <input ref={i_search}
                        className="headersearchcontrol"
                        style={headersearchinput(backgroundColor)}
                        onChange={e => { setSearchQuery(e.target.value); }}
                        onKeyUp={keyup}
                        placeholder="Search products..."
                     /><CloseOutlined 
                        style={{ color: searchQuery === '' ? null : '#fff', position: "absolute", cursor: "pointer", right: 4, top: 6, }}
                        onClick={e => { setSearchQuery(''); }}
                     />
                  </>
               </Dropdown>
            </div>
         </div>
      </form>
   </div>;

};

export const mapState = state => ({
   backgroundColor: state.settings.dark,
});
export const mapDispatch = dispatch => ({ dispatch });

export default withRouter(connect(mapState, mapDispatch)(HeaderSearch as any));