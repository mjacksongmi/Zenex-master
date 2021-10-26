import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";

export module css {
    export const loading = loadingOffset => ({ display: "inline-block", verticalAlign: "middle", margin: "auto", marginTop: loadingOffset, width: "auto", }) as any;
    export const icon = { fontSize: "40px", color: "steelblue", margin: "auto", verticalAlign: "middle", } as any;
}

export const Img: React.FC<{ src; style?; loadingYOffset; onClick?; }> = ({ src, style, loadingYOffset, onClick, }) => {

    let [result, setResult] = useState('server');

    useEffect(() => {
        let i = new Image();
        if (result === 'server') {
            i.onload = e => { setResult('success'); };
            i.onerror = e => { setResult('fail'); };
            i.src = src;
            setResult('processing');
        }
    }, []);

    if (result === 'server' || result === 'success') {
        return <img src={src} className="full autoh autow" style={style || {}} {...(onClick ? { onClick } : {})} />;
    }

    if (result === 'processing') {
        return <div style={css.loading(loadingYOffset)}><LoadingOutlined style={css.icon} /></div>;
    }

    if (result === 'fail') {
        return <img src="/images/img_not_avail.jpg" style={style} />;
    }

};

export default Img;