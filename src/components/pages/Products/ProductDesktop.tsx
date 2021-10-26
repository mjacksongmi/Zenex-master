import React, { useState, } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { root } from "../../../endpoints";

import Img from "../../Img";
import ItemFiles from "./Products.ItemFiles";
import Block from "../../Block";
import Magnifier from "react-magnifier";

export module css {
    export const jar = { padding: "13px", minHeight: "800px", } as any;
    export const branded = bg => ({ color: bg, fontWeight: "bold", }) as any;
    export const left = { display: "inline-block", width: "25%", verticalAlign: "middle", textAlign: "center", } as any;
    export const right = { display: "inline-block", width: "75%", verticalAlign: "top", } as any;
    export const description = { paddingRight: "24px", } as any;
    export const modal_inner = { textAlign: "center", display: "inline-block", width: "100%", verticalAlign: "middle" } as any;
}

export const ProductDesktop: React.FC<{ catalog; categories; mobile; }> = ({ catalog, categories, mobile, }) => {

    const toggleMagnifier = (val = !magnifierActive) => setMagnifierActive(val);
    const activateMagnifier = () => {
        toggleMagnifier(true);
        let img = new Image();
        img.onerror = () => setImgLoaded(false);
        img.onload = () => setImgLoaded(true);
        img.src = `${root}${item.ImageLarge}`;
    };

    let [magnifierActive, setMagnifierActive] = useState(false);
    let [imgLoaded, setImgLoaded] = useState(false);

    let { item } = catalog;

    let href = `${root}${item.ImageLarge}`;
    let bg = categories.filter(c => c.name === item.Category)[0].backgroundColor;

    return <Block mobile={mobile}>
        <Modal title="Image Zoom" visible={magnifierActive} footer={[]} onCancel={e => toggleMagnifier(false)}>
            <div style={css.modal_inner}>
                {
                    imgLoaded ? <Magnifier
                        mgShape="square"
                        mgHeight={175}
                        mgWidth={175}
                        width={"100%"}
                        src={`${root}${item.ImageMedium}`}
                        zoomFactor={3}
                        zoomImgSrc={`${root}${item.ImageLarge}`}
                    /> : <LoadingOutlined />
                }
            </div>
        </Modal>
        <div style={css.jar}>
            <div style={{ float: "right", }}><Link to={href}><h4 style={css.branded(bg)}>#{item.ProductID}</h4></Link></div>
            <div style={{ clear: "both", }}>
                <div style={css.left}>
                    <Img onClick={e => activateMagnifier()} loadingYOffset="100px" src={`${root}${item.Image}`} />
                </div>
                <div style={css.right}>
                    <div><h3>{item.Name}</h3></div>
                    <div><h4 style={css.branded(bg)}>{item.Title}</h4></div><br />
                    {item.IsDiscontinued && <><div>~ Discontinued</div><br /></>}
                    {item.brief && <><div>{item.Brief}</div><br /></>}
                    <div style={css.description}>{item.Description}</div><br />
                    <div>
                        {item.Features.length > 0 && <div><ul>{item.Features.map((feature, i) => <li key={i}>{feature}</li>)}</ul><br /></div>}
                        <ItemFiles item={item} />
                    </div>
                </div>
            </div>
        </div>
    </Block>;
};

export const mapState = state => ({
    mobile: state.settings.mobile,
    catalog: state.catalog,
    categories: state.categories,
});
export const mapDispatch = dispatch => ({
    dispatch
});

export default connect(mapState, mapDispatch)(ProductDesktop);