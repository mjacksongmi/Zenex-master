import React from "react";
import { connect } from "react-redux";
import { Dropdown } from "antd";
import { SortAscendingOutlined } from "@ant-design/icons";

import Block from "../../Block";
import Pager from "./Pager";

export module css {
   export const dropdown = { backgroundColor: "#fff", padding: "10px", border: "solid 1px #ccc", boxShadow: "0 0 1px #444", } as any;
   export const left_pages = m => ({ display: "inline-block", width:  m ? "60%" : "75%", textAlign: "left", verticalAlign: "middle", }) as any;
   export const right_pages = m => ({ display: "inline-block", width: m ? "40%" : "25%", textAlign: "right", verticalAlign: "middle", }) as any;
}

export const Results = ({ catalog, mobile, goPage, goSort, dispatch }) => {
   return <Block mobile={mobile} type="vseq">
         <div style={{ padding: "13px", }}>
            <div style={css.left_pages(mobile)}>
               <Pager catalog={catalog} goPage={goPage} />
            </div>
            <div style={css.right_pages(mobile)}>
               <Dropdown placement="bottomRight" overlay={<div style={css.dropdown}>
                  {
                     Object.keys(catalog.sorts).map((key, index) => <div key={index} className="pointer" onClick={e => {
                        goSort(key);
                     }}>{key}</div>)
                  }
               </div>}>
                  <span><SortAscendingOutlined /> {catalog.sort}</span>              
               </Dropdown>            
            </div>
         </div>
      </Block>;
};

export const mapState = state => ({
   mobile: state.settings.mobile,
   catalog: state.catalog,
});
export const mapDispatch = dispatch => ({
   dispatch,
});

export default connect(mapState, mapDispatch)(Results);