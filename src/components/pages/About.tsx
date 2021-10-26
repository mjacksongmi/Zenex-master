import React from "react";
import { connect } from "react-redux";
import { content, } from "../../styles/Global";

export const About: React.FC<TMergedAboutComponent> = ({ }) => {

    return <>
        <div className="page">
            <div className="inlineblock">
                <div style={{ ...content, }}>
                    <div style={{ padding: "13px", }}>
                        <h3>About Us</h3>
                        <div>
                            For over 30 years, we have been producing the highest quality, mission-specific
                            compounds and formulas for a variety of industries. We provide personal service,
                            high quality, consistency, and always compliant American made products. With
                            sales professionals all over the country, we want to answer your questions and provide
                            a smooth, hassle-free sales experience.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;

}

export const mapState = state => ({});
export const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(About) as React.FC<TAboutComponent>;