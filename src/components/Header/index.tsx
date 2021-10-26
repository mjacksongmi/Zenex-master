import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { set_setting } from "../../redux/actions";
import { header } from "./css";

import MenuMobileControls from "../MenuMobile/Controls";
import Menu from "./Menu";
import Right from "./Right";
import Logo from "./Logo";

export const Header: React.FC<TMergedHeaderComponent> = ({ dispatch, mobile, user, history, border, }) => {

    const setMenuOpen = (open: boolean) => dispatch(set_setting("MobileMenuOpen", open));

    useEffect(() => {
        history.listen(() => {
            setMenuOpen(false);
            (window as any).scrollTo(0, 0);
        });
    }, []);

    return <header style={header(border)}>
        {mobile && <MenuMobileControls />}
        <div className="page headerpage">
            <div className="headerleft">
                <Logo mobile={mobile} />
                {!mobile && <Menu />}
            </div>
            {
                !mobile && <div className="headerright">
                    <Right user={user} />
                </div>
            }
        </div>
    </header>;

};

export const mapState = state => ({
    mobile: state.settings.mobile,
    user: state.user,
    border: state.settings.dark,
    categories: state.categories,
    menuOpen: state.settings["MobileMenuOpen"] || false,
});
export const mapDispatch = dispatch => ({ dispatch });

export default withRouter(connect(mapState, mapDispatch)(Header));