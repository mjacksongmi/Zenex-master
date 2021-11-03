// GM INDUSTRIAL CREDS
export const adminPassword = `It's Mickler####`;
export const ldapZenexLocal = {
  url: 'ldap://192.168.1.18',
  baseDN: 'DC=zenex,DC=local',
  username: 'michaelmickler@zenex.local',
  password: 'NetNodeMichael9',
};

export const smtp_chemsafe = 'smtp://api@chemsafeint.com:Gqrbej7!@mail092-co-1.exch092.serverdata.net';
export const smtp_chemsafe_support = 'smtp://support@chemsafeint.com:Gqrbej7!@mail092-co-1.exch092.serverdata.net';
export const smtp_zenex = 'smtp://api@chemsafeint.com:Gqrbej7!@mail092-co-1.exch092.serverdata.net';
export const smtp_zenex_support = 'smtp://support@zenexint.com:Gqrbej7!@mail092-co-1.exch092.serverdata.net';

type serverKey = 'znx-mssql-srv' | 'znx-iis-srv' | 'znx-sage-srv' | 'gmimssql.database.windows.net' | 'znx-sql-srv';
export const connectionStrings: { [conName in serverKey & serverKey]: string } = {
  'znx-iis-srv': '',
  'znx-sage-srv': '',
  'znx-sql-srv': 'Server=znx-sql-srv;Database=GMI;User Id=zenex\\michaelmickler;Password=NetNodeMichael9;',
  'znx-mssql-srv': 'Server=znx-mssql-srv;Database=Sage100;User Id=zenex\\michaelmickler;Password=NetNodeMichael9;',
  'gmimssql.database.windows.net': 'Server=tcp:gmimssql.database.windows.net,1433;Initial Catalog=Sage100;Persist Security Info=False;User ID=michaelmickler;Password=SwAaM49#;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;Request Timeout=7200000'
};
export const azrSqlStr = connectionStrings['gmimssql.database.windows.net'];

//export const mlabSandbox = `mongodb://chemsafeint:j12e94d12i19@ds026428-a0.mlab.com:26428,ds026428-a1.mlab.com:26426/gmi?replicaSet=rs-ds026428${rewrites}`;
//export const mlabProduction = `mongodb://chemsafeint:j12e94d12i19@ds026428-a0.mlab.com:26428,ds026428-a1.mlab.com:26426/gmi?replicaSet=rs-ds026428${rewrites}`;
export const atlasProduction = `mongodb+srv://chemsafeint:j12e94d12i19@gmi9.y5fzn.azure.mongodb.net/gmi?retryWrites=true&w=majority`;
export const conStr = atlasProduction;
export const conCfg = { useNewUrlParser: true, useUnifiedTopology: true, };

export const google_recaptcha_v2 = dev => ({ sitekey: dev ? "6Lclm3kUAAAAAAQSKK8bPsJaGKxpmUlvPEcCqWU7" : "6LdrnHkUAAAAABq7pp_KQj23_8keKtC4UdZQAoi6" });

export const textBeltAPI = "474b7c48761da3477f2a0562f75ebe2403342069FXKoeIoN1zHOiSLFmzNnCMweo";

export const boxAPI = {
  "boxAppSettings": {
    "clientID": "eo24zhdf9qtev94qgtupxs41v8qmm19r",
    "clientSecret": "0lNWhGA9Z4mX1bqiRBTL4llChqC0Tbp9",
    "appAuth": {
      "publicKeyID": "j61ufp89",
      "privateKey": "-----BEGIN ENCRYPTED PRIVATE KEY-----\nMIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIuNyyiGUVW1UCAggA\nMBQGCCqGSIb3DQMHBAhbHCPCRQDi5gSCBMjlaFNBFmRkuuEI7to1fhq4+DNNoI2+\nJlsl7lzb8hDMNnM4lD0lQJ8MTcrte5ij7xlAp8NNcwxonUq5VYpw/8HAOHjzCFLH\ntS76ub+s18aIMFugoEypw7nd0CLxrsyCTZXiRJpxyayG14CP9irf6Oy1QpqOoheF\nRCXfofOEJAJqn+9feoVX2+KujWfaIRUgX7u7DtAcsvCerhY8ivC/XlrlsY6ASmAe\nk0ax8hMWeujURPnTr3FuZyq3JiCkDbNOGOEQAOaxJmKg7a03+27CHFli7+wXCfdj\nC1/93mwkswDYWS2JCNNO9TA50Xdo5bydSk/3nOHnRoAfGd/LykRlD1JCgqXHw80Q\n2frLiowmMqG7IfgLA4jbN3epo/xVt7rtOUb/ijDlr60pQNmxTVBxxMMxa32qtyHP\nMit4d1HE841JJJwTgcNpmgshOkToippFarbJWkRMVuSYBC7N+38GXbGdzVyY3bun\nQEI5uc9Pc0aefjjTDSmy4S8aCkR8dbSw+r7IhIcVpICzwBakZAwTpgCU0zHmwKw2\nn8s528qyexHW8/IvlTIeDLN7XzElEJ/XtieJqhcjqR2F2cxdncyEutAqIr5wfiht\nixqGNuZuT/dyliBSPtkcfVlpKZnpH/6HC9a19qFW2EicRbpRZXpXw4mo89r1L5HP\nr9Gd+cMMWug35jD2ZMGtgx6HfatFxkyVHSdiUOj+ihJYvMWX5Ntb5iULFctlaYol\nfpPVMRGP3HJu7ED1cIlNBKNsmWlp5Ql31XLVQNRDlswPP8wT4MseK6eca3EWmL4M\nmbbxXJhuglmb46fekwoY+Hnu+TEYTP0lIcH0mypAfIMxc2nP5zTXk2RLTHm8GX8n\nD6/vHgtBpHaPBVkSy2EVcwWiOyxCENje4N4MZPNm5Q2FzNnID89qLa+wxcDp+2xx\nneeHvI0lV5xv1QObC1GxJnzPn/pdBE54JZOZUHjLd8EAMnL1x1AmWi7m+MRp9PMM\nWvifupRjCekA3Sb/zcnlSJlpHHzvCeYTY8tkXJESEKxLLDTSsi7k9Pm0WHnzitAM\nuWcLEesaqmA4jbggPcPDAVlaTeVD4g6wYFnlnF3exM4UteVrLAwDlZ1KY7XuUMia\nztMJJfrHazVMcSqLpYyNDIR9inW5Z7JkgIxQvnmT8JLCYFW4bBVtYuXesJTTVKRg\nLlYjoiPCm9AuOguR99MprP9yn2/YQKSgElHuY5tE10mARGG6l73YlHDwUX3sPzQw\nVE3RYc5oNOboLZ029RPl4IuwQoFslMYiFKJDiF8OhKI3yeOj/avik9JxCcOlgTlE\nRwoVeb/+Ti/VSAxK3nbpNboGYAUehUltbJUqJp5x3TCMyzWbgorlrWyOwZ3LoUpl\n3l4dvUN8tCeVpIcFu7IlTLKkW6AvLjWYhzoNtPCs9+kt/+yAyYVI+eEAXLZPcdWh\ntuFX+kN96lmp1tnuBSd4qjYDy1gg7KOcIG4jBgrSHGOCEmrVzAVo4eGhVWYqATsN\n8xyypDqDj5740BNkS9tInTxQLTtRI2TLlzKxXS3EsRa+49lGpFMUTc2CVKR7kB2o\nLSTOHgMfD+QFUF7n4qKlSBcpVQ0+cy/s7thNThopr4zOL58D3xIcXbHMJdlLAuZ4\ng4U=\n-----END ENCRYPTED PRIVATE KEY-----\n",
      "passphrase": "4bfe58904fb52b77be595245a895d19e"
    }
  },
  "enterpriseID": "659677"
};