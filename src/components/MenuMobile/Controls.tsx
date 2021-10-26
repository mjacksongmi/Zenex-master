import React from "react";
import { set_setting, } from "../../redux/actions";
import { mbl_back_btn, mbl_menu_btn, } from "./css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { CaretLeftOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

export const MenuMobileControls: React.FC<{ menuOpen; history; dispatch; }> = ({ menuOpen, history, dispatch, }) => {

   const handleBackBtn = (e) => { history.goBack(); };
   const toggleMblMenu = () => dispatch(set_setting("MobileMenuOpen", !menuOpen));

   return <div style={{ position: "fixed", zIndex: 10000, height: "50px", top: 0, left: 0, right: 0, }}>
      <div style={{ position: "relative", }}>
         <span style={mbl_menu_btn} onClick={toggleMblMenu}>
            {
               menuOpen ? 
                  <MenuFoldOutlined /> :
                  <MenuUnfoldOutlined />
            }
         </span>
         <span style={mbl_back_btn} onClick={handleBackBtn}>
            <CaretLeftOutlined />
         </span>
      </div>
   </div>;

   return null;

};

export const mapState = state => ({
   mobile: state.settings.mobile,
   menuOpen: state.settings["MobileMenuOpen"] || false,
});
export const mapDispatch = dispatch => ({
   dispatch,
});

export default withRouter(connect(mapState, mapDispatch)(MenuMobileControls as any));