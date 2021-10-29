import React from "react";
import { connect } from "react-redux";

import Slider from "../Slider";
import CatalogSection from "../CatalogSection";

let args1 = {
    href: "/flipbook2021/index.html",
    file: "/files/Zenex_Catalog_2021.pdf",
    image: "/images/zenex-2021-catalog.jpg",
    link_title: "View Our 2021 Catalog",
    title: "Private Label Aerosols, Liquids, Wipes, and Hand Soaps",
    text: `We are a national manufacturer of liquid chemicals, aerosols, hand soaps, wipes, and custom formulations. 
        We supply distributors around the world with quality products, value, and a commitment to customer service. 
        Take a look at our 2021 catalog and see just the surface of our capibilities.`,
    color: `rgb(146, 73, 4)`,
};
let args2 = {
    href: "/flipbook2/index.html",
    file: "/files/catalog-zenex-automotive.pdf",
    image: "/images/catalog-zenex-automotive.jpg",
    link_title: "Quality Automotive Products",
    title: "Quality Products for the Automotive Industry",
    text: `Build and automotive brand with Zenex. We manufacture professional-grade products for many sectors in the auto industry. 
        Stock your shelves or catalog with your own custom branded product offerings. Our graphic division can even help you make your 
        vision a reality. Speak to a representative today to learn more.`,
    color: `steelblue`
};

export const Home: React.FC<TMergedHomeComponent> = ({ mobile }) => <>
    <Slider />
    <div style={{ position: "relative", }}>
        <div style={{ 
            backgroundImage: "url(/images/home/totes.gif)",
            backgroundRepeat: "norepeat", 
            backgroundPosition: "center",
            backgroundSize: "cover",
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: -10,            
        }} />
        <div style={{ background: "rgba(0,0,0,.9)", color: "#ccc" }}>
            <CatalogSection {...args1} />    
            <CatalogSection {...args2} />
        </div>
        <div className="page centered">
            {/* <Block mobile={mobile}>
                <div style={{ padding: mobile ? "10px" : "30px" }}>                
                    <h3 style={{ color: "rgb(120,191,75)" }}>Private Label Program</h3>
                    Our private label program offers the best catalog of products in the industry, Low minimums, 
                    fast lead times, and our commitment to your success, A regional sales representatives can help
                    you select quality products for your line or industrial needs, Our graphic design team will work
                    alongside you to maintain specifications, brand, and compliance needs, We are commited manufacturing 
                    quality products responsibly here in the U.S.A.
                </div>
            </Block>
            <Block mobile={mobile}>
                <div style={{ padding: mobile ? "10px" : "30px" }}>                
                    <h3>Custom Chemicals</h3>
                    Zenex has been manufacturing custom formulations fover over ten years for dozens of industries, Our in 
                    house chemists can customize or formulate products for your needs, We are commited manufacturing quality 
                    products responsibly here in the U.S.A
                </div>
            </Block>         */}
        </div>
    </div>
</>;

export const mapState = state => ({
    mobile: state.settings.mobile,
});
export const mapDispatch = dispatch => ({ dispatch });

export default connect(mapState, mapDispatch)(Home) as React.FC<THomeComponent>;