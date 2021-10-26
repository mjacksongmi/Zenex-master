export const link = { display: "block", } as any;
export const menu = active => ({      
   position: "fixed",
   top: 0,
   bottom: 0,
   width: "90%",
   padding: "10px",
   zIndex: 9999,
   lineHeight: 1,
   borderRight: "solid 1px #444",
   transition: "all ease-in-out 400ms",
   left: active ? 0 : "-100%",
   background: "#fff",      
}) as any;
export const input = { width: "100%", padding: "10px 0", margin: "0 0 0 0", fontSize: "24px", lineHeight: 1, } as any;
export const h1 = { padding: "5px 0" } as any;
export const mbl_menu_ctrl = { position: "absolute", top: "15px", fontSize: "18px", zIndex: 10000, } as any;
export const mbl_menu_btn = { ...mbl_menu_ctrl, right: "13px", } as any;
export const mbl_back_btn = { ...mbl_menu_ctrl, left: "13px", } as any;