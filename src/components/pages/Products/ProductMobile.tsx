import React from "react";
import { content, } from "../../../styles/Global";
import { connect } from "react-redux";
import { root } from "../../../endpoints";

import ItemFiles from "./Products.ItemFiles";

export module css {
    export const jar = { ...content, padding: "20px", } as any;
    export const productid = bg => ({ color: bg, }) as any;
    export const title = bg => ({ color: bg, }) as any;
    export const left = { width: "25%", } as any;
    export const right = { width: "75%", } as any;
    export const feature = { fontSize: "1.5vh", } as any;
}

export const ProductMobile: React.FC<{ catalog; categories; }> = ({ catalog, categories }) => {

    var { item } = catalog;

    let bg = categories.filter(c => c.name === item.Category)[0].backgroundColor;

    return <div className="text_left" style={css.jar}>
        <div className="text_right bold" style={css.productid(bg)}>{item.ProductID}</div>
        <h2>{item.Name}</h2>
        <h3 className="bold" style={css.title(bg)}>{item.Title}</h3>
        <br />
        <div>
            <div className="inlineblock vtop" style={css.left}>
                <img className="full autoh autom" src={item.ImageLarge ? `${root}${item.ImageLarge}` : `${root}/images/img_not_avail.jpg`} />
            </div>
            <div className="inlineblock vtop" style={css.right}>
                {
                    item.Features.length > 0 && item.Features.map((feature, i) => <div style={css.feature} key={i}>~ {feature}</div>)
                }
            </div>
        </div>
        <br />
        {item.IsDiscontinued && <><div> ~ Limited Availability / Discontinued</div><br /></>}
        {item.brief && <><div>{item.Brief}</div><br /></>}
        <div>{item.Description}</div><br />
        <ItemFiles item={item} />
    </div>;

};

export const mapState = state => ({
    catalog: state.catalog,
    categories: state.categories,
});
export const mapDispatch = dispatch => ({
    dispatch
});

export default connect(mapState, mapDispatch)(ProductMobile);