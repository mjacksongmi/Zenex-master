const dev = false;

import { cookieSecret as secret } from "./keys";

export const env = {
    dev: dev,
    version: '4.0.0',
    secret,
    cookie: { domain: dev ? "zenexint" : "zenexint.com" },
    port: 4000
};

export default env;