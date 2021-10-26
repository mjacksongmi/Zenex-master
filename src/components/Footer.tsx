import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export module css {
    export const footer = (bg, bc) => ({ padding: "14px 20px", fontSize: "12px", borderBottom: `solid 9px ${bg}`, borderTop: `solid 1px ${bc}`, background: "#fff", }) as any;
    export const flagusa = { height: "15px", margin: "1px 0 0 4px", } as any;
    export const flagohio = { height: "25px", margin: "-3px 0 0 0", } as any;
}

export const Footer: React.FC<{ backgroundColor; border; }> = ({ backgroundColor, border, }) => {

    return <footer style={css.footer(backgroundColor, border)}>
        <div className="text_center">
            <Link to={`/resources`} style={{ whiteSpace: "nowrap", }}>SDS / Regulatory</Link>{' | '}
            <a href="https://www.iubenda.com/privacy-policy/37938605" className="iubenda-nostyle no-brand iubenda-embed" title="Privacy Policy" style={{ whiteSpace: "nowrap", }}>Privacy Policy</a>{' | '}
            <script type="text/javascript" src="/javascripts/privacy.js"></script>
            <Link to="/contact" style={{ whiteSpace: "nowrap", }}>Contact</Link>{' | '}
            <Link to={`/copyright`} style={{ whiteSpace: "nowrap", }}>&copy; Copyright Zenex Intl. {(new Date()).getFullYear()}</Link>{' | '}
            <img className="autom" style={css.flagusa} src="/images/animated_flag.gif" />
            <img className="autom" style={css.flagohio} src="/images/animated_ohio_flag.gif" />
            <span>Made in the USA</span>
        </div>
    </footer>;

};

export const mapState = state => ({
    backgroundColor: state.settings.dark,
    border: state.settings.border,
});
export const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Footer);