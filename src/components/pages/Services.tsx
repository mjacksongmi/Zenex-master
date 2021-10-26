import React from "react";
import { content, } from "../../styles/Global";;
import { connect } from "react-redux";

export const PrivateLabel = () => {
    return <>
        <h3>Private Label Program</h3>
        <div>
            Our private label program offers the best catalog of products in the industry.
            Low minimums, fast lead times, and our commitment to your success.
            A regional sales representatives can help you select quality products for your line or industrial needs.
            Our graphic design team will work alongside you to maintain specifications, brand, and compliance needs.
            We are commited manufacturing quality products responsibly here in the U.S.A.
        </div>
    </>;
};
export const CustomFormulations = () => {
    return <>
        <h3>Custom Formulations</h3>
        <div>
            Put our experience to work for your business.
            Let us create or customize a mission-specific product formulation for your product line.
            Our lab is highly experienced solving these challenges.
        </div>
    </>;
}

export const Services: React.FC<TMergedServicesComponent> = ({ service, }) => {

    return <>
        <div className="page">
            <div className="inlineblock">
                <div style={{ ...content, }}>
                    <div style={{ padding: "13px 30px", }}>
                        {
                            service === 'privatelabel' ?
                                <PrivateLabel /> :
                                <CustomFormulations />
                        }
                    </div>
                </div>
            </div>
        </div>
    </>;

}

export const mapState = state => ({});
export const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Services) as React.FC<TServicesComponent>;