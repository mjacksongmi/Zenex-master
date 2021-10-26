import Catalog from "../models/Catalog";
import { keywords, description, title } from "../meta";

export default {
    settings: {
        width: 1280,
        scrolled: false,
        scrollTop: 0,
        mobile: false,
        portrait: false,
        landscape: true,
        body: "silver",
        //body: "#001529",
        dark: "#191919",
        border: "#a3a3a3",
        canvas: "#fff",
    },
    user: { username: 'anonymous', role: [] },
    token: null,
    meta: { keywords, description, title },
    categories: [],
    catalog: Catalog(),
};