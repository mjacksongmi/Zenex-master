import express from "express";

import { set_catalog, set_meta, } from "../redux/actions";
import { ZenexProduct as Product } from '../models/mongoose/models';
import { MetaProducts } from "../meta";
import { mapItems } from "./utils";
import { ZenexItem } from "../models/mongoose/schemas";

import Catalog from "../models/Catalog";

var r = express.Router();

r.use((req, res, next) => {

	let catalog = Catalog();

	if (req.query.limit) { catalog.limit = Number(req.query.limit); }
	if (req.query.skip) { catalog.skip = Number(req.query.skip); }
	if (req.query.sort) { catalog.sort = req.query.sort; }

	res.locals.store.dispatch(set_catalog(catalog));
	res.locals.store.dispatch(set_meta(MetaProducts));

	next();

});

r.use('/category/:Category/:Subcategory', async (req, res, next) => {

	const { Category, Subcategory } = req.params;
	let { catalog, meta } = res.locals.store.getState();

	let q = { $and: [{ Category: { $regex: Category, $options: "i" } }, { Subcategory: { $regex: Subcategory, $options: "i" } }] };
	catalog.count = await Product.find(q).countDocuments().exec()
	catalog.items = (await Product.find(q).sort(catalog.sorts[catalog.sort]).skip(catalog.skip).limit(catalog.limit).exec()).map(d => d._doc);
	catalog.category = Category;
	catalog.subcategory = Subcategory;
	meta.title = 'Private Label ' + Subcategory + ': Zenex International';
	meta.description = 'We manufacture and can private label ' + Subcategory + ' and other quality products for your business today.';
	res.locals.store.dispatch(set_catalog(catalog));
	res.locals.store.dispatch(set_meta(meta));

	next();

});

r.use('/category/:Category', async (req, res, next) => {

	const { Category } = req.params;
	let { catalog, meta } = res.locals.store.getState();

	//if(formalize(Category) !== Category) { res.redirect("/category/" + formalize(Category)); }

	if (catalog.items.length === 0) {
		let q = { Category: { $regex: Category, $options: "i" } };
		catalog.count = await Product.find(q).countDocuments().exec();
		catalog.items = (await Product.find(q).sort(catalog.sorts[catalog.sort]).skip(catalog.skip).limit(catalog.limit).exec()).map(d => d._doc);
		catalog.category = Category;
		meta.title = 'Private Label ' + Category + ': Zenex International';
		meta.description = 'We manufacture and can private label ' + Category + ' and other quality  products for your business today.';
		res.locals.store.dispatch(set_catalog(catalog));
		res.locals.store.dispatch(set_meta(meta));
	}

	next();

});

r.use('/family/:Family', async (req, res, next) => {

	const { Family } = req.params;
	let { catalog, meta } = res.locals.store.getState();

	if (catalog.items.length === 0) {
		var query = { Family: Family.substring(0, Family.length - 1).toLowerCase() };
		catalog.count = await Product.find(query).countDocuments().exec();
		catalog.items = (await Product.find(query).sort(catalog.sorts[catalog.sort]).skip(catalog.skip).limit(catalog.limit).exec()).map(d => d._doc);
		meta.title = 'Private Label ' + Family + ': Zenex International';
		meta.description = 'Wholesale Distribution and Private Label ' + Family + 's: Zenex International';
		catalog.items = catalog.items;
		catalog.family = Family;
		res.locals.store.dispatch(set_catalog(catalog));
		res.locals.store.dispatch(set_meta(meta));
	}

	next();

});

r.use('/nameSearch/:text', async (req, res, next) => {

	const { text } = req.params;

	let { catalog, meta } = res.locals.store.getState();

	if (catalog.items.length === 0) {

		let query = ["ProductID", "Name", "Title", "Keywords", "Subcategory", "Category", "Description"].reduce((q, field) => {
			q.$or.push({ [field]: { "$regex": text, "$options": "i" } });
			q.$or.push({ $and: text.split(' ').map(t => ({ [field]: { "$regex": t, "$options": "i" } })) });
			return q;
		}, { $or: [] });

		catalog.search = text;
		catalog.count = await Product.find(query).countDocuments().exec();

		if (catalog.count > 0) {
			catalog.items = (await Product.find(query).sort(catalog.sorts[catalog.sort]).limit(catalog.limit).skip(catalog.skip).exec()).map(d => d && d._doc);
			if (catalog.items.length === 1) { catalog.item = catalog.items[0]; }
			meta.title = "Professional Grade " + catalog.items[0].Category + " at Superior Value";
			meta.description = "We manufacturing and distribute " + catalog.items[0].Category + " and other high quality products for your business";
			res.locals.store.dispatch(set_catalog(catalog));
			res.locals.store.dispatch(set_meta(meta));
		}

	}

	next();

});

r.use('/:ProductID', async (req, res, next) => {

	const { ProductID } = req.params;
	let { catalog, meta } = res.locals.store.getState();

	if (catalog.items.length === 0) {
		catalog.count = await Product.find({ ProductID }).countDocuments().exec();
		catalog.item = (await Product.findOne({ ProductID }).exec());
		if (catalog.item) {
			catalog.item = catalog.item._doc;
			meta.title = `Private Label "${catalog.item.Name}: ${catalog.item.Title}", Zenex Intl.`;
			meta.description = `We private label "${catalog.item.Name}" ${catalog.item.Title}, and other ${catalog.item.Type}'s for your business today.`;
			catalog.category = catalog.item.Category;
			catalog.subcategory = catalog.item.Subcategory;
			catalog.family = catalog.item.Family;
			catalog.items = [catalog.item];
			res.locals.store.dispatch(set_catalog(catalog));
			res.locals.store.dispatch(set_meta(meta));
		}
	}

	next();

});

r.use("/", async (req, res, next) => {

	let { catalog } = res.locals.store.getState();

	if (catalog.items.length === 0) {
		catalog.count = await Product.find({}).countDocuments();
		catalog.items = (await Product.find({}).sort(catalog.sorts[catalog.sort]).skip(catalog.skip).limit(catalog.limit).exec()).map(d => d._doc);
	}

	catalog.items = catalog.items.map(mapItems);

	catalog.items.map(async (i, index) => {

		if (i.Hardware) {
			let hardware;
			try { hardware = await ZenexItem.findOne({ ProductID: i.Hardware }).exex(); }
			catch (error) { console.log(error); }
		}

		return i;

	});

	if (catalog.items.length === 1) {
		catalog.item = catalog.items[0];
	}

	res.locals.store.dispatch(set_catalog(catalog));

	next();

});

export default r;