import env from "../../bin/env";

import { join } from "path";
import { accessSync } from "fs";

export const mapItems = (i, index) => {


let v = i.ProductID.split('\.')[0].split('-')[0];

let v2 = i.ProductID.split('\.');

  try {
    if (!env.dev) { accessSync(join(__dirname, "..", "..", "public", "images", "products", "250", i.ProductID + ".gif")); }
    i["Image"] = `/images/products/250/${i.ProductID}.gif`;
  } catch (error) { i["Image"] = false; }

  try {
    if (!env.dev) { accessSync(join(__dirname, "..", "..", "public", "images", "products", "500", i.ProductID + ".gif")); }
    i["ImageMedium"] = `/images/products/500/${i.ProductID}.gif`;
  } catch (error) { i["ImageMedium"] = false; }

  try {
    if (!env.dev) { accessSync(join(__dirname, "..", "..", "public", "images", "products", "5000", i.ProductID + ".gif")); }
    i["ImageLarge"] = `/images/products/5000/${i.ProductID}.gif`;
  } catch (error) { i["ImageLarge"] = false; }

  try {
    if (!env.dev) { accessSync(join(__dirname, "..", "..", "public", "files", "sds", v + ".pdf")); }
    i["SDS"] = `/files/sds/${v}.pdf`;
  } catch (error) { i["SDS"] = false; }

  try {
    if (!env.dev) { accessSync(join(__dirname, "..", "..", "public", "files", "pds", v2 + ".pdf")); }
    i["PDS"] = `/files/pds/${v2}.pdf`;
  } catch (error) { i["PDS"] = false; }

  try {
    if (!env.dev) { accessSync(join(__dirname, "..", "..", "public", "files", "idf", v + ".pdf")); }
    i["IDF"] = `/files/idf/${v}.pdf`;
  } catch (error) { i["IDF"] = false; }

  try {
    if (!env.dev) { accessSync(join(__dirname, "..", "..", "public", "files", "lbl_fr", v + ".pdf")); }
    i["LBL_FR"] = `/files/lbl_fr/${v}.pdf`;
  } catch (error) { i["LBL_FR"] = false; }

  return i;

};