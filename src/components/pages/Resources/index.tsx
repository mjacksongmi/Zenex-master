import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Route } from "react-router";
import { Link } from "react-router-dom";
import { getItems } from "../../../api";
import { file_types } from "./lib";
import { sorts } from "../../../utils";
import { root } from "../../../endpoints";
import { DownloadOutlined, FilePdfOutlined } from "@ant-design/icons";

import Block from "../../Block";

export module css {
   export const file_type_link = (active) => ({ fontWeight: active ? 'bold' : 'normal', color: active ? "steelblue" : "royalblue", textDecoration: active ? "underline" : "none", }) as any;
   export const cell = { padding: "3px", } as any;
}

export const Resources: React.FC<{ mobile; match; }> = ({ mobile, match, }) => {

   useEffect(() => { getItems(setItems); }, []);

   let [query, setQuery] = useState('');
   let [items, setItems] = useState([]);

   const showItems = filter => items.filter(item => item[filter] !== false);

   return <>
      <div className="page" style={{ fontSize: mobile ? "3vw" : "inherit", }}>
         <Block mobile={mobile}>
            <div className="block_inner">
               <h3>SDS & More Product Information</h3>
               <hr />
               <div>
                  <div className="inlineblock vtop">
                     <FilePdfOutlined style={{ fontSize: "40px", color: "red", marginRight: "4px", }} />
                  </div>
                  <div className="inlineblock vtop" style={{ maxWidth: mobile ? "calc(100vw - 75px)" : "410px", }}>
                     You will need a PDF reader application to view product documents.
                     If your device doesn't have one, you can download Adobe Acrobat <a className="link_classic" href="https://get.adobe.com/reader/" target="_blank">here</a> free.
                  </div>
               </div>
               <br />
               <h4>Document Types/Categories</h4>
               <hr />
               <ul>
                  {
                     file_types.map((cat, index) => <li key={index}>
                        <Link style={css.file_type_link(cat.id === match.params.File)} to={`/resources/${cat.id}`}>{cat.id} ({cat.name})</Link><br />
                        <small>{cat.text}</small>
                     </li>)
                  }
               </ul>
               <hr />
               <>
                  <table>
                     <thead>
                        <tr>
                           <th style={css.cell}>Part No</th>
                           <th style={css.cell}>Name</th>
                           <th style={{ ...css.cell, whiteSpace: "nowrap", }}>View | Download</th>
                        </tr>
                     </thead>
                     <tbody>
                        {
                           match.params.File && showItems(match.params.File).sort(sorts["byText"]('ProductID')).map((item, index) => {
                              let file_link = root + item[match.params.File.toUpperCase()];
                              return <tr key={index}>
                                 <td style={{ ...css.cell, whiteSpace: "nowrap", }}>{item.ProductID}</td>
                                 <td style={css.cell}>{item.Name}</td>
                                 <td style={css.cell}>
                                    <span>{file_types.filter(f => f.id === match.params.File)[0].id}</span>
                                    <span> &nbsp; </span>
                                    <a href={file_link} target="_blank"><FilePdfOutlined /></a>{' | '}
                                    <a href={file_link} target="_blank" download><DownloadOutlined /></a>
                                 </td>
                              </tr>
                           })
                        }
                     </tbody>
                  </table>
               </>
            </div>
         </Block>
      </div>
   </>;

};

export const mapState = state => ({
   mobile: state.settings.mobile,
});
export const mapDispatch = dispatch => ({ dispatch });

export default withRouter(connect(mapState, mapDispatch)(Resources));