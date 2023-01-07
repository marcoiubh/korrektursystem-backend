const _ = require('lodash');
const nodemailer = require('nodemailer');
const config = require('config');

const smtpConfig = () => {
  let transporter = nodemailer.createTransport({
    host: config.get('email.host'),
    port: config.get('email.port'),
    secure: config.get('email.secure'),
    auth: {
      user: config.get('email.server'),
      pass: config.get('emailPrivateKey'),
    },
    // enable sending from local host
    tls: {
      rejectUnauthorized: config.get('email.rejectUnauthorized'),
    },
  });
  return transporter;
};

const sendEmail = async (recipient, subject, text) => {
  // email data
  let mail = {
    from: `"Korrektursystem" <${config.get('email.server')}>`,
    to: recipient,
    subject: subject,
    text: text,
  };
  // send mail with defined transport object
  let transporter = smtpConfig();
  return await transporter.sendMail(mail);
};

module.exports = sendEmail;
