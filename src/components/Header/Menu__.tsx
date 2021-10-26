import React, { useEffect, useState, useRef } from "react";
import { tracer, dropdown_link, dropdown_categories, dropdown_subcategories, dropdown_link_text, dropdown_link_indicator, } from "./css";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { sorts } from "../../utils";

export const MenuLink = ({ text, link, match }) => {

    let [active, setActive] = useState(false);

    useEffect(() => { }, [match]);

    return <div className="menulinkdiv" 
        onMouseEnter={e => { setActive(true); }} 
        onMouseLeave={e => { setActive(false); }}>
        <Link className="menulink" to={link}>
            <div style={{ height: "2px", }}><div style={tracer(active)} /></div>
            <div>{text}</div>
        </Link>
    </div>;

};

export const MenuDesktop = ({ match, history, categories }) => {

    let [nodes, setNodes] = useState({});
    let [active, setActive] = useState(false);

    let div_dropdown = useRef(null);

    const getSubmenu = (category) => nodes['dd_' + category.name] || null;

    const actDropDownLink = (node, category) => {
        div_dropdown.current.style.overflow = "visible";
        node.style.color = category.backgroundColor;
        node.style.backgroundColor = "#f4f4f4";                
        var ind = nodes['ind_' + category.name];
        if(ind) {
           ind.style.width = "7px";                
           ind.style.backgroundColor = category.backgroundColor;
        }
        var sm = getSubmenu(category);
        if(sm) {
           sm.style.borderLeft = "solid 2px " + category.backgroundColor;                    
           sm.style.width = "240px";
        }
     };

     const deactDropDownLink = (node, category) => {
        div_dropdown.current.style.overflow = "hidden";
        node.style.color = "inherit";
        node.style.backgroundColor = "#fff";
        var ind = nodes['ind_' + category.name];      
        if(ind) {
           ind.style.width = 0;
           ind.style.backgroundColor = "none";
        }
        var sm = nodes['dd_' + category.name];
        if(sm) {
           sm.style.width = 0;
           sm.style.borderLeft = "none";
        }
     };

    const go = (url) => (e?) => { history.push(url); deactDropDown(e); };

    const dropdownClick = e => {
        if (div_dropdown.current.clientHeight === 0) { actDropDown(e); }
        else { go("/products")(e); }
    };

    const isCategory = () => (window.location || { pathname: '' }).pathname.indexOf("products/category/") !== -1;

    const actDropDown = (e) => {
        if(div_dropdown && !isCategory()) {
            div_dropdown.current.style.height = (30 * div_dropdown.current.getElementsByClassName("category_link").length) + "px";
            div_dropdown.current.style.border = "solid 1px #aaa";
        }
    };

    const deactDropDown = (e) => {
        if(div_dropdown) {
            div_dropdown.current.style.height = 0;                    
            div_dropdown.current.style.border = "solid 1px transparent";                    
        }
    };

    return <div style={{ display: "inline-block" }}>
        <div className="menulinkdiv"
            onMouseEnter={e => { setActive(true); actDropDown(e); }}
            onMouseLeave={e => { setActive(false); deactDropDown(e); }}>
            <div className="menulink" onClick={dropdownClick}>
                <div style={{ height: "2px", }}><div style={tracer(active)} /></div>
                <div>Products</div>
            </div>
            <div ref={div_dropdown} className="menudropdown" style={dropdown_categories}>
                {
                    categories.sort(sorts.byNumber('priority')).map((category, index, array) => {

                        const ref_subcategory_div = n => {
                            if (n) {
                                n.style.height = (category.subcategories.length * 30) + "px";
                                n.style.border = "solid 1px #aaa";
                                nodes['dd_' + category.name] = n;
                                setNodes(nodes);
                            }
                        };

                        return <div key={index}
                            className="category_link"
                            style={dropdown_link}
                            onMouseOver={e => { actDropDownLink(e.target, category); }}
                            onMouseOut={e => { deactDropDownLink(e.target, category); }}
                            onClick={e => {
                                if (getSubmenu(category) && getSubmenu(category).clientWidth === 0) {
                                    actDropDownLink(e.target, category);
                                } else {
                                    go("/products/category/" + category.name)(e);
                                }
                            }}>
                            {
                                category.subcategories && category.subcategories.length > 0 &&
                                <div className="menudropdown" style={dropdown_subcategories} ref={ref_subcategory_div}>
                                    {
                                        category.subcategories.map((subcat, index, array) => {
                                            return <div key={index} className="subcategory_link" style={dropdown_link}
                                                onClick={go("/products/category/" + category.name + "/" + subcat.name)}>
                                                <div style={dropdown_link_text}>{subcat.name}</div>
                                            </div>;
                                        })
                                    }
                                </div>
                            }
                            <div ref={n => { nodes['ind_' + category.name] = n; }} style={dropdown_link_indicator(category.backgroundColor)}></div>
                            <div style={dropdown_link_text}>{category.alias || category.name}</div>
                        </div>;

                    })
                }
            </div>
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