import React from "react";
import { connect } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

export module css {
   export const background = { display: "inline-block", position: "fixed", left: 0, right: 0, top: 0, bottom: 0, } as any;
   export const veil = { width: "100%", height: "100%", display: "inline-block", position: "relative", zIndex: 9998, background: "rgba(0,0,0,.09)", textAlign: "middle", } as any;
   export const spinner = { color: "#fff", fontSize: "2vw", verticalAlign: "middle", margin: "auto", } as any;
   export const inner = {
      position: "absolute",
      zIndex: 9999,
      width: "300px",
      height: "100px",
      top: "50%",
      left: "50%",
      marginLeft: "-150px",
      marginTop: "-50px",
      background: "none",
   } as any;
}

export const Loading = ({ mobile, }) => {
   return <>
      <div style={css.background}>
         <div style={css.veil}>
            <div style={css.inner}>
                  <LoadingOutlined style={css.spinner} />
            </div>
         </div>
      </div>
   </>;
};

export const mapState = state => ({
   mobile: state.settings.mobile,
});
export const mapDispatch = dispatch => ({ dispatch });

export default connect(mapState, mapDispatch)(Loading);