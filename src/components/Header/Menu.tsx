import React, { useEffect, useState, useRef } from "react";
import { tracer, } from "./css";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { sorts } from "../../utils";
import { Dropdown, Menu } from "antd";

const { SubMenu, Item } = Menu;

export module css {
    export const inlineblock = { display: "inline-block", } as any;
    export const submenu = { display: "inline-block", minWidth: "180px" } as any;
    export const item = { minWidth: "180px", } as any;
}

export const MenuLink = ({ text, link, match }) => {

    let [active, setActive] = useState(false);
    useEffect(() => { }, [match]);

    return <div className="menulinkdiv">
        <Link className="menulink" to={link}>
            <div style={{ height: "2px", }}><div style={tracer(active)} /></div>
            <div><b>{text}</b></div>
        </Link>
    </div>;

};

export const MenuDesktop = ({ match, history, categories }) => {

    const renderMenuItem = url => category => {
        let link = `${url}/${category.name}`;
        if (category.subcategories && category.subcategories.length > 0) {
            return <SubMenu key={category._id} 
                title={<Link 
                to={link} 
                style={css.submenu} 
                href={link}>{category.name}</Link>}>
                {
                    category.subcategories && 
                    category.subcategories.map(renderMenuItem(link))
                }
            </SubMenu>
        } else {
            return <Item key={category.id} style={css.item}>
                <Link style={css.inlineblock} to={link}>{category.name}</Link>
            </Item>
        }
    };

    return <div style={css.inlineblock}>
        <div className="menulinkdiv">
            <Dropdown className="dropdown_products" overlay={
                <Menu inlineIndent={-1}>
                    {
                        categories 
                            .sort(sorts["byNumber"]("priority"))
                            .filter(c => !c.parent && !c.redirect)
                            .map(renderMenuItem(`/products/category`))
                    }
                </Menu>
            }>
                <div className="menulink">
                    <Link to="/products"><b>Products</b></Link>
                </div>
            </Dropdown>
        </div>
        <MenuLink link="/resources" text="SDS / Resources" match={match} />
    </div>;

};

export const mapState = state => ({
    mobile: state.settings.mobile,
    categories: state.categories,
});
export const mapDispatch = dispatch => ({
    dispatch,
});

export default withRouter(connect(mapState, mapDispatch)(MenuDesktop as any));