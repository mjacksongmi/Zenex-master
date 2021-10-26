import React from "react";
import { content, } from "../styles/Global";

export const Block: React.FC<{ mobile; children; type?; style?; }> = ({ mobile, children, type, style, }) => {
  
  let outer = mobile => mobile ? {} : { margin: "8px 0 0 0", } as any;
  let inner = mobile => mobile ? {} : { padding: "0 0 0 8px", } as any;
  
  if(type === 'vseq') { 
    outer = mobile => mobile ? {} : { margin: "8px 0 0 0", } as any;    
  }

  if(type === 'hseq') { 
    outer = mobile => mobile ? {} : { margin: "0 0 0 8px", } as any;    
  }

  return <div style={outer(mobile)}>
    <div style={inner(mobile)}>
      <div style={{ ...content, ...(style || {}) }}>
        {children}
      </div>
    </div>
  </div>;

};

export default Block;