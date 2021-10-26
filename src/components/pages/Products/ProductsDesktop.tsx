import React from "react";
import { content, } from "../../../styles/Global";
import { row_pad } from "./css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { root } from "../../../endpoints";

import Block from "../../Block";

export module css {
    export const item_row = (bg) => ({ ...content, ...row_pad, borderBottom: `solid 8px ${bg}`, minHeight: "250px", }) as any;
    export const branded = bg => ({ color: bg, fontWeight: "bold", }) as any;
}

export const ProductsDesktop: React.FC<{ mobile; catalog; categories; border; }> = ({ mobile, catalog, categories, }) => {

    var { items } = catalog;

    return <div>
        {
            items.map((i, index) => {
                const bg = categories.filter(c => c.name === i.Category)[0].backgroundColor;
                return <div key={index}>
                    <Block mobile={mobile} type="vseq">
                        <div style={css.item_row(bg)}>
                            <Link to={`/products/${i.ProductID}`}>
                                <div style={{ float: "right", }}>
                                    <h4 style={css.branded(bg)}>#{i.ProductID}</h4>
                                </div>
                                <div style={{ clear: "both", }}>
                                    <div className="inlineblock vmid text_center" style={{ width: "20%", }}>
                                        <div className="inlineblock vmid autom" style={{ maxWidth: "200px" }}>                                            
                                            <img className="full autoh autom vmid" src={i.Image ? `${root}${i.Image}` : `${root}/images/img_not_avail.jpg`} />
                                        </div>
                                    </div>
                                    <div className="inlineblock vmid" style={{ width: "80%", }}>
                                        <h3>{i.Name}</h3>
                                        <h4 style={css.branded(bg)}>{i.Title}</h4>
                                        {
                                            i.IsDiscontinued && <div style={{ color: "red", }}> ~ Limited Availability / Discontinued<br /></div>
                                        }
                                        <br />
                                        <div style={{ paddingRight: "24px", }}>{i.Description}</div>
                                        <br />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </Block>
                </div>;
            })
        }
    </div>;

};

export const mapState = state => ({
    catalog: state.catalog,
    mobile: state.settings.mobile,
    border: state.settings.border,
    categories: state.categories,
});
export const mapDispatch = dispatch => ({
    dispatch
});

export default connect(mapState, mapDispatch)(ProductsDesktop);