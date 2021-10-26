import React from "react";

import { file_types } from "../Resources/lib";
import { FilePdfOutlined, DownloadOutlined } from "@ant-design/icons";

export const Component: React.FC<{ item; }> = ({ item, }) => {

    return <div>
        {
            file_types.map((file_type: any, index, array) => <div key={index}>
                {
                    item[file_type.id] ? <div>
                        <div style={{ float: "left" }}>
                            File: <strong>{file_type.id}</strong> ({file_type.name})<br />
                            &nbsp; &nbsp; <small>{file_type.text}</small>
                        </div>
                        <div style={{ float: "right" }}>
                            <a href={item[file_type.id]} download>
                                <span><DownloadOutlined style={{ color: "royalblue", }} /> Download</span>
                            </a>
                            <span> &nbsp; </span>
                            <a href={item[file_type.id]} target="_blank">
                                <span><FilePdfOutlined style={{ color: "red", }} /> View</span>
                            </a>
                        </div>
                        <div style={{ clear: "both", borderBottom: "solid 1px #444", marginBottom: "4px", }} />
                    </div> :
                        null
                }
            </div>)
        }
    </div>;

};

export default Component;