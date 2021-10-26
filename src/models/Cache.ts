// target DOM (window) / Node.js (process)
const isDOM: boolean = typeof (window) !== 'undefined';
const target: any = isDOM ? window : process;

const new_guid = () => Math.random().toString().substring(2) + Math.random().toString().substring(2);

export default class Cache {

    constructor(key) {

        // check for global (unique) object (cache) on target, preserving existing values
        target.___gmi = target.___gmi || {};
        target.___gmi.cache = target.___gmi.cache || {};
        target.___gmi.cache[key] = target.___gmi.cache[key] || {};

        // individual cache object (key)
        this.key = key;
        this.data = target.___gmi.cache[key] || {};
        this.created = new Date();
        
        target.___gmi.clearCache = (key): void => {            
            let _c = { ...target.___gmi.cache };
            target.___gmi.cache = Object.keys(_c).reduce((obj, k) => {
                if(k !== key) {
                    obj[k] = _c[k];
                }
                return obj;
            }, {});
            if(target.localStorage) {
                target.localStorage.clear(key);
            }
            target.___gmi.shouldDeleteCache = true;
        };

        target.___gmi.clearAllCache = (): void => {
            target.___gmi.cache = {};
            target.___gmi.shouldDeleteCache = true;
        };

    }    

    public key: string = "domain-default";
    public data: object = {};
    public updated = new Date();
    public created = new Date();
    public version: string = new_guid();
    public deleting: boolean = false;

    public log = () => console.log(`
        Cache '${this.key}' imported\b
        Data Type: ${typeof (this.data)}\b
        Version: ${this.version}\b
        Created: ${this.created.toLocaleDateString()}\b
        Updated: ${this.updated.toLocaleDateString()}`
);
    
    public import = (): void => {
        if (target.localStorage) {
            let browser_cache: string = target.localStorage.getItem(this.key);
            if (browser_cache) {
                let _c = JSON.parse(browser_cache);
                target.___gmi.cache[this.key] = _c.data;
                this.version = new_guid();
                this.data = _c.data;
                this.updated = new Date(_c.updated);
                this.created = new Date(_c.created);
                this.log();
            }
        }
    };

    public export = (): void => {
        if (target.localStorage && target.___gmi.shouldDeleteCache !== true) {
            target.localStorage.setItem(this.key, JSON.stringify({
                version: this.version,
                created: this.created,
                updated: this.updated,
                data: this.data,
            }));
        }
    }

    public get = (key) => {
        return this.data[key] || undefined;
    };

    public set = (key, value) => {
        target.___gmi.cache[this.key][key] = value;
        this.data[key] = value;
        this.updated = new Date();
    };

}