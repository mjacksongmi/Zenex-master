import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { content, } from "../../../styles/Global";
import { root } from "../../../endpoints";

export const ProductsMobile: React.FC<{ catalog; mobile; categories; }> = ({ catalog, categories, }) => {

    var { items } = catalog;

    return <>
        {
            items.map((i, index) => {

                const href = "/products/" + i.ProductID;
                const bc = categories.filter(c => c.name === i.Category)[0].backgroundColor;

                return <div key={index} className="full" style={{ ...content, padding: "20px 5px", borderBottom: `solid 2px ${bc}`, }}>
                    <Link to={href}>
                        <div className="inlineblock vmid text_center" style={{ width: "30%", }}>
                            <img className="full autoh autom" src={i.Image ? `${root}${i.Image}`  : `${root}/images/img_not_avail.jpg`} />
                        </div>
                        <div className="inlineblock vmid" style={{ width: "70%", }}>
                            <div><h4>{i.Name}</h4></div>
                            <div><strong>{i.Title}</strong></div>
                            <br />
                            {
                                i.IsDiscontinued && <div> ~ Limited Availability / Discontinued<br /></div>
                            }
                            <div>Part No: {i.ProductID}</div>
                        </div>
                    </Link>
                </div>;

            })
        }
    </>;


};

export const mapState = state => ({
    mobile: state.settings.mobile,
    catalog: state.catalog,
    categories: state.categories,
});
export const mapDispatch = dispatch => ({
    dispatch
});

export default connect(mapState, mapDispatch)(ProductsMobile);