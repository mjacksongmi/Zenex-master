import * as middleware from "./middleware";

import env from "../../bin/env";

const port = process.env.PORT || env.port;

import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";

import React from "react";
import { title, description, keywords } from "../meta";
import { createServer } from "http";
import { connect } from "mongoose";
import { set_user, set_categories, set_setting, set_meta, } from "../redux/actions";
import { renderToString } from "react-dom/server";
//import { conStr } from " ../../bin/keys";
import { ZenexCategory } from "../models/mongoose/models";

import store from "../redux/store";
import BrowserDetector from "../models/BrowserDetector";
import productsRouter from "./Products";
import App from "../components/App";
import Routes from "../components/Routes.Server";
const conStr = "mongodb+srv://chemsafeint:j12e94d12i19@gmi9.y5fzn.azure.mongodb.net/gmi?retryWrites=true&w=majority";
const app = express();
const done = () => server.listen(app.get('port'), () => console.log(`Express server listening on port ${port}`));

connect(conStr, { useNewUrlParser: true, useUnifiedTopology: true, });

app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.set('views', path.join(__dirname, '..', '..', 'views'));
app.set('view engine', 'pug');
app.set('port', port);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(middleware.sessionHandler({ env }));
app.use(middleware.requestHandler({ env }));

app.get('/account/logout', middleware.logout);
app.get('/account/activate', middleware.activation);

app.post('/api/email', middleware.email);
app.post('/api/register', middleware.register);
app.post('/api/authenticate', middleware.authenticate);
app.post('/api/logout', middleware.logout);
app.post('/api/setPassword', middleware.setPassword);
app.post('/api/itemlist', middleware.getItemsListing);

app.use((req, res, next) => {
	var browser = new BrowserDetector(req.headers);
	res.locals.store = store;
	res.locals.store.dispatch(set_user(res.locals.user));
	res.locals.store.dispatch(set_categories(app.get('categories')));
	res.locals.store.dispatch(set_setting("mobile", browser.IsMobile));
	res.locals.store.dispatch(set_meta({ title, keywords, description }));
	next();
});

app.use("/products", productsRouter);

app.post("*", async (req, res) => {
	let props = res.locals.store.getState();
	res.json({ success: true, props, });
});

app.get('*', (req, res) => {
	let props = res.locals.store.getState();
	res.render('index',
		{ props, html: renderToString(<App Routes={Routes} Store={res.locals.store} Location={req.originalUrl} />), }
	);
});

var server = createServer(app);

if (!app.get('categories')) {
	(async () => {
		try { app.set("categories", await ZenexCategory.find({}).sort({ priority: -1 }).exec()); }
		catch (error) { app.set("categories", []); }
		done();
	})();
} else {
	done();
}