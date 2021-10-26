import axios from "axios";

export const getItems = async (cb) => {
   let { success, items } = (await axios.post("/api/itemlist") as any).data;
   cb(items);
};