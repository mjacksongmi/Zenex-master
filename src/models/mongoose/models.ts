import { model } from "mongoose";

import { User as U, ZenexCategory as C, ZenexItem as I, } from "./schemas";

export const User = model('User', U);
export const ZenexCategory = model('ZenexCategory', C);
export const ZenexProduct = model('ZenexProduct', I);