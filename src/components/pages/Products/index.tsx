import React, { useState, useEffect } from "react";
import { set_catalog, } from "../../../redux/actions";
import { content, } from "../../../styles/Global";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { left_div, right_div, category_block, banner_links } from "./css";
import { LoadingOutlined } from "@ant-design/icons";

import Catalog from "../../../models/Catalog";
import Categories from "./Categories";
import ProductDesktop from "./ProductDesktop";
import ProductMobile from "./ProductMobile";
import ProductsDesktop from "./ProductsDesktop";
import ProductsMobile from "./ProductsMobile";
import Results from "./Results";
import Block from "../../Block";

export const NotFound = (m) => <Block mobile={m}><div style={{ ...content, padding: "13px", }}>Item(s) not found...</div></Block>;

export const Products: React.FC<TMergedProductsComponent> = ({ dispatch, mobile, catalog, categories, location, history, width, scrollTop }) => {

    let [loading, setLoading] = useState(false);

    const goSort = (sort) => {
        dispatch(set_catalog({ ...catalog, sort }));
        history.push(location.pathname + `?limit=${catalog.limit}&skip=${(catalog.page - 1) * catalog.limit}&sort=${sort}`);
    };
    const goPage = (page, pageSize) => {
        dispatch(set_catalog({ ...catalog, page }));
        history.push(location.pathname + `?limit=${pageSize}&skip=${(page - 1) * pageSize}`);
    };

    const fetchData = async ({ pathname, search }) => {
        setLoading(true);
        var xhr = new XMLHttpRequest();
        if (search.indexOf('?') === -1) { search = search + '?api=true'; }
        else { search = search + '&api=true'; }
        xhr.open('post', pathname + search);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                var { success, props } = JSON.parse(xhr.responseText);
                if (success) {
                    var { meta, catalog } = props;
                    dispatch(set_catalog(Catalog(catalog)));
                    var title = window.document.getElementsByTagName("title")[0];
                    title.innerHTML = meta.title;
                }
                setLoading(false);
            }
        };
        xhr.send();
    };

    // first load
    useEffect(() => {
        fetchData(location);
        dispatch(set_catalog(Catalog(catalog)));
        history.listen(fetchData);
    }, []);

    // cleanup
    useEffect(() => () => {
        dispatch(set_catalog(Catalog()));
    }, []);

    let match_routes = [
        "/products/category/:Category/:Subcategory?",
        "/products/family/:Family",
        "/products/nameSearch/:text",
        "/products/:ItemCode",
    ];

    return <>
        <div className="page">
            <Switch>
                <Route path={match_routes}>
                    <>
                        {!mobile && <div className="inlineblock vtop" style={left_div}>
                            <div style={{ transition: "margin-top ease-in-out 400ms", marginTop: scrollTop && (scrollTop + 8) + "px" || 0 }}>
                                <Block mobile={mobile}>
                                    <Categories />
                                </Block>
                            </div>
                        </div>}
                        <div className="inlineblock vtop" style={right_div(mobile, width > 1280 ? 1280 : width)}>
                            <Route path="/products/category/:Category/:Subcategory?" exact render={({ match }) => <>
                                <Block mobile={mobile} type="vseq">
                                    <img style={{ width: "100%", height: "auto", }} src={categories.filter(c => c.name.toLowerCase() === match.params.Category.toLowerCase())[0].banner} />
                                </Block>
                            </>} />
                            <Switch>
                                <Route path="/products/:ItemCode" exact>
                                    {
                                        !catalog.item && <NotFound mobile={mobile} /> ||
                                        mobile && <ProductMobile /> ||
                                        <ProductDesktop />
                                    }
                                </Route>
                                <Route path="*">
                                    <>
                                        <Results goSort={goSort} goPage={goPage} />
                                        {
                                            loading && <Block mobile={mobile}>
                                                <div style={{ textAlign: "center", lineHeight: "100%", }}>
                                                    <LoadingOutlined style={{ fontSize: "40px", margin: "auto", display: "inline-block", }} />
                                                </div>
                                            </Block> ||
                                            catalog.items.length === 0 && <Block mobile={mobile}><NotFound mobile={mobile} /></Block> ||
                                            mobile && <ProductsMobile /> ||
                                            <ProductsDesktop />
                                        }
                                        <Results goSort={goSort} goPage={goPage} />
                                        <div style={{ height: "480px", }} />
                                    </>
                                </Route>
                            </Switch>
                        </div>
                    </>
                </Route>
                <Route path="*" exact>
                    <div style={{ textAlign: "center", }}>
                        {
                            categories.map((c, i) => {
                                return <div key={i} className="inlineblock centered vtop" style={category_block(mobile)}>
                                    <Link className="inlineblock" to={`/products/category/${c.name}`} style={banner_links(mobile)}>
                                        <img src={c.banner} style={{ width: "100%" }} />
                                    </Link>
                                </div>;
                            })
                        }
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                </Route>
            </Switch>
        </div>
    </>;

};

export const mapState = state => ({
    mobile: state.settings.mobile,
    width: state.settings.width,
    categories: state.categories,
    catalog: state.catalog,
    scrollTop: state.settings.scrollTop,
});
export const mapDispatch = dispatch => ({ dispatch });

export default withRouter(connect(mapState, mapDispatch)(Products as any));