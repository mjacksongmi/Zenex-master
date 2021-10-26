import env from "../../../bin/env";

import axios from "axios";
import React, { useState, useRef, useEffect, } from "react";
import { content, } from "../../styles/Global";
import { connect } from "react-redux";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import ReCaptcha from "react-google-recaptcha";
import states from "../../states";

import Block from "../Block";

import { google_recaptcha_v2 as captchaKey } from "../../../bin/keys";

export const input = { width: "90%", margin: "0 0 2px 0", padding: "4px 0 4px 9px", } as any;
export const message_div_inner = m => ({ ...content, }) as any;
export const submit_btn = v => ({ backgroundColor: v ? 'lightgreen' : 'orange', }) as any;

export interface IWebMessage { state?; company?; name?; from?; message?; to?; subject?; phone?; };
export const WebMessage = (): IWebMessage => ({ state: '', company: '', name: '', from: '', message: '', to: '', subject: '', phone: '' });

export const google_recaptcha_v2 = captchaKey(env.dev);

export const Contact = ({ mobile, }) => {

    let f_contact = useRef(null);
    let i_name = useRef(null);
    let i_company = useRef(null);
    let i_email = useRef(null);
    let i_phone = useRef(null);
    let s_state = useRef(null);
    let i_message = useRef(null);
    let b_submit = useRef(null);

    let [messages, setMessages] = useState([]);
    let [token, setToken] = useState('');
    let [valid, setValid] = useState(false);


    const reset_helper = () => {
        b_submit.current.style.backgroundColor = "orange";
    };

    const validate = () => {
        let result = false;
        if (
            i_name?.current?.value
            && i_company?.current?.value
            && i_email?.current?.value
            && i_phone?.current?.value
            && s_state?.current?.value
            && i_message?.current?.value
        ) {
            result = true;
        }
        setValid(result);
    };

    const submit = async (e) => {

        e.preventDefault();

        const { success, messages } = (await axios.post("/api/email", {
            state: s_state.current.value,
            company: i_company.current.value,
            phone: i_phone.current.value,
            from: i_email.current.value,
            to: "sales@zenexint.com",
            subject: "Web Message Received",
            name: i_name.current.value,
            message: i_message.current.value,
        }) as any).data;

        f_contact.current.reset();

        notify(success ? "Message Sent" : "Error", messages.join("<br />"));

    };
    const notify = (message, description) => {
        notification.open({
            message,
            description,
            icon: <SmileOutlined style={{ color: '#108ee9' }} />
        });
    };

    return <div className="page">
        <div className="inlineblock half_res vtop">
            <Block mobile={mobile} type="vseq">
                <div className="block_inner text_left" style={message_div_inner(mobile)}>
                    <h3>Mailing Address</h3><br />
                    <div>1 Zenex Circle</div>
                    <div>Bedford, OH 44146</div>
                    <div>United State</div>
                </div>
            </Block>
            <Block mobile={mobile} type="vseq">
                <div className="block_inner text_left" style={message_div_inner(mobile)}>
                    <h3>Phone &amp; Fax</h3><br />
                    <h4>Office Hours: 8:00am - 5:30pm Eastern Standard Time</h4>
                    <div>Toll Free: +1 (866) 217-5100</div>
                    <div>Office: +1 (440) 232-4155</div>
                    <div>Fax: +1 (440) 232-5101</div>
                </div>
            </Block>
            <Block mobile={mobile} type="vseq">
                <div className="block_inner text_left" style={message_div_inner(mobile)}>
                    <form ref={f_contact} onSubmit={submit} onReset={reset_helper}>
                        <div style={{ float: "right", }}><button type="reset" style={{ display: "inline", border: "none", background: "none", }}>&nbsp;Clear&nbsp;</button></div>
                        <h3>Contact Us Now</h3><br />
                        <div><input style={input} placeholder="Name" name="name" type="text" ref={i_name} onChange={validate} /></div>
                        <div><input style={input} placeholder="Company" name="company" type="text" ref={i_company} onChange={validate} /></div>
                        <div><input style={input} placeholder="Email" name="email" type="text" ref={i_email} onChange={validate} /></div>
                        <div><input style={input} placeholder="Phone" name="phone" type="text" ref={i_phone} onChange={validate} /></div>
                        <div><select style={input} name="state" ref={s_state} defaultValue="" onChange={validate}>
                            <option value="">-- Select State / Other --</option>
                            {states.map((s, i) => <option key={i} value={s.abbr}>{s.name}</option>)}
                        </select></div>
                        <textarea style={{ ...input, height: "90px", }} name="message" placeholder="Message" ref={i_message} onChange={validate} />
                        {valid && token && <div><button className="inlineblock" style={submit_btn(true)} ref={b_submit} type="submit" onClick={submit}>Submit</button></div>}
                        {!token && <ReCaptcha sitekey={google_recaptcha_v2.sitekey} onChange={token => setToken(token)} />}
                    </form>
                </div>
                <div>{messages.map((m, i) => <div key={i}>{m}</div>)}</div>
            </Block>
        </div>
        {
            !mobile && <div className="inlineblock half_res vtop">
                <Block mobile={mobile} type="vseq">
                    <img style={{ width: "100%", height: "auto", }} src="/images/customer_service.jpg" />
                </Block>
            </div>
        }
    </div>;

};

export const mapState = state => ({
    mobile: state.settings.mobile,
});
export const mapDispatch = dispatch => ({ dispatch });

export default connect(mapState, mapDispatch)(Contact);