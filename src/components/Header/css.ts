import { canvas, } from "../../styles/Global";

export const header = (bc) => ({
   padding: "10px 0",
   position: "fixed",
   top: 0,
   right: 0,
   left: 0,
   zIndex: 1000,
   background: canvas,
   borderTop: `solid 4px ${bc}`,
}) as any;
export const dropdown = { background: canvas, } as any;
export const tracer = a => ({ width: a ? "100%" : 0, background: a ? "royalblue" : "transparent", }) as any;

export const dropdown_categories = {
   ...dropdown,
   zIndex: 8000,
   height: 0,
   width: "240px",
   left: "-10px",
   top: "100%",
   marginTop: "4px",
   border: "solid 1px transparent",
   transition: "height ease-in-out 400ms"
} as any;
export const dropdown_subcategories = {
   ...dropdown,
   zIndex: 8050,
   left: "238px",
   top: 0,
   width: 0,
   borderLeft: "none",
   transition: "width ease-in-out 400ms"
} as any;
export const dropdown_link = {
   display: "block",
   position: "relative",
   cursor: "pointer",
   height: "30px",
   lineHeight: "30px",
   whiteSpace: "nowrap",
   color: "inherit"
} as any;
export const dropdown_link_text = { paddingLeft: "20px" } as any;
export const dropdown_link_indicator = category => ({
   position: "absolute",
   left: 0,
   top: 0,
   bottom: 0,
   height: "100%",
   width: 0,
   overflow: "hidden",
   transition: "width ease-in-out 400ms",
   backgroundColor: category.backgroundColor
}) as any;
export const headersearchinput = bg => ({
   padding: "7px 0 7px 10px",
   fontSize: "12px",
   textShadow: "none",
   boxShadow: "none",
   background: bg,
   color: "#fff",
}) as any;