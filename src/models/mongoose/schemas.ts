import { Schema } from "mongoose";

export const User = new Schema({
    username: String,
    password: String,
    role: [String],
    lastName: String,
    firstName: String,
    salespersonno: [String],
    active: Boolean,
    activation: String,
    clv: {}
}, { collection: 'users-chemsafeint' });
export const ZenexCategory = new Schema({
    priority: Number,
    image: String,
    banner: String,
    symbol: String,
    title: String,
    key: String,
    name: String,
    alias: String,
    backgroundColor: String,
    color: String,
    articles: [{ title: String, text: String }],
    division: String,
    subcategories: [{ name: String }],
}, { collection: 'categories-zenexint' });
export const ZenexItem = new Schema({
    ProductID: String,
    Name: String,
    Title: String,
    Family: String,
    Description: String,
    Category: String,
    Subcategory: String,
    Features: [String],
    IsDiscontinued: Boolean,
    Keywords: String,
    Priority: Number,
    Prop65: String,
    PrivateLabelOnly: Boolean,
    Hardware: String,
}, { collection: 'items-zenexint' });