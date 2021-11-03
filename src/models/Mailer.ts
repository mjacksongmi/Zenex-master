const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

export const get_transport = () => nodemailer.createTransport(smtpTransport({
  host: 'mail092-co-1.exch092.serverdata.net',
  port: 465,
  auth: {
    user: 'api@zenexint.com',
    pass: 'Gqrbej7!',
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  }
}));

export default get_transport;