import fs from "fs";
import path from "path";

export default class Customs {

  constructor() {
    this.init();
  }

  public manifest = {
    existing: {},
    missing: {},
  };

  public init = () => {
    if (fs.existsSync(path.join(__dirname, "manifest.json"))) {
      this.manifest = JSON.parse(fs.readFileSync(path.join(__dirname, "manifest.json")).toString());
    }
  };

  public entry = (lib, key, data) => {
    let recipLib = lib === 'existing' ? 'missing' : 'existing';
    if(this.manifest[recipLib][key]) {
      delete this.manifest[recipLib][key];
    }
    this.manifest[lib][key] = data;
  };

  public save = () => {  
    try {
      fs.writeFileSync(path.join(__dirname, "manifest.json"), JSON.stringify(this.manifest, null, 3));
    } catch (error) {
      console.log(error);
    }
  };


}