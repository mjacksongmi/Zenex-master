import { scan_dom, } from "../redux/actions";
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, StaticRouter } from "react-router-dom";

import MenuMobile from "./MenuMobile";
import Header from "./Header/index";
import Footer from "./Footer";

let isClient = typeof window !== 'undefined';

let Router = isClient ? BrowserRouter : StaticRouter;

export const domLoader = (resize): any => () => {
   window.addEventListener('resize', resize);
   window.addEventListener('scroll', resize);
   resize();
};

export const App: React.FC<TAppComponent> = ({ Store, Routes, Location }) => {

   if (typeof window !== 'undefined') { window.___gmi.getState = () => Store.getState(); }

   let [state, setState] = useState(Store.getState());
   Store.subscribe(() => setState(Store.getState()));
   
   useEffect(domLoader(() => { Store.dispatch(scan_dom()); }), []);
   useEffect(() => {
      window.document.body.style.background = state.settings.body;
   });
   
   return <Provider store={Store}>
      <Router location={Location} context={{}}>
         <>
            { state.settings.mobile && <MenuMobile /> }
            <Header />
            <div style={{ minHeight: "calc(100vh - 56px)", }}>
               <Routes mobile={state.settings.mobile} />
            </div>
            <Footer />
         </>
      </Router>
   </Provider>;

};

export default App as React.FC<TAppComponent>;