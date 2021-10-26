const FTP = require('promise-ftp');

(process as any).__ftp = (process as any).__ftp || new FTP();

export const options = {

  "zenex.azurewebsites.net": {
    host: "waws-prod-blu-007.ftp.azurewebsites.windows.net",
    user: "zenex\\$zenex",
    password: "ZsxwE39WejGXFcHfT9wQXpd1f02baF9jDBxhLpDkmjWEtDJnJlJauaBdjtPX",
  },

};

export default (process as any).__ftp;