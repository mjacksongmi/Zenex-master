const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

export const get_transport = () => nodemailer.createTransport(smtpTransport({
  host: 'secure.emailsrvr.com',
  port: 465,
  auth: {
    user: 'api@zenexint.com',
    pass: 'Zenex449!',
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  }
}));

export default get_transport;