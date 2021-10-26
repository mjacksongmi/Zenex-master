import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { dark, canvas, } from "../styles/Global";

export module css {
    export const left = m => ({ width: m ? "100%" : "25%", padding: m ? "20px 0" : "50px 0", }) as any;
    export const right = m => ({ width: m ? "100%" : "75%", padding: m ? "20px 0" : "50px 0", }) as any;
    export const catalog_image = m => ({ width: "auto", height: m ? "180px" : "240px", margin: "20px auto", boxShadow: "0 0 9px #000", }) as any;
    export const subtitle = (m, c) => ({ padding: m ? "3px 10px" : "5px 0", color: "rgb(0,147,208)" }) as any;
    export const text = m => ({ padding: m ? "3px 10px" : "10px 0", textAlign: m ? "justified" : "left", maxWidth: "640px", }) as any;
}

export const Home: React.FC<TMergedCatalogSectionComponent> = ({ mobile, href, image, file, link_title, title, text, color = `rgb(146, 73, 4)`, }) => {

    const flipbook_title = "Click to View and Search the Digital Catalog";

    return <div className="page">
        <div className="inlineblock vmid text_center" style={css.left(mobile)}>
            <Link to={href} target="_blank" title={flipbook_title}>{link_title}</Link>
            <div>
                <Link to={href} target="_blank" title={flipbook_title}>
                    <img src={image} style={css.catalog_image(mobile)} />
                </Link>
            </div>
            <div>
                <Link to={href} target="_blank" title={flipbook_title}>Flipbook</Link>
                <span>{' | '}</span>{' '}
                <Link to={file} target="_blank" title="Download the PDF">Download</Link>{' '}
                <span>{' | '}</span>
                <Link to={href} target="_blank" title="View as PDF">PDF</Link>
            </div>
        </div>
        <div className="inlineblock vmid text_left" style={css.right(mobile)}>
            <h1 style={css.subtitle(mobile, color)}>{title}</h1>
            <div style={css.text(mobile)}>
                {text}
            </div>
        </div>
    </div>;

};

export const mapState = state => ({
    mobile: state.settings.mobile,
});
export const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Home) as React.FC<TCatalogSectionComponent>;