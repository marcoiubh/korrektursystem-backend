const nodemailer = require('nodemailer');
const _ = require('lodash');
const config = require('config');

// SMTP
const smtpConfig = () => {
  try {
    let transporter = nodemailer.createTransport({
      host: config.get('email.host'),
      port: config.get('email.port'),
      secure: config.get('email.secure'),
      auth: {
        user: config.get('email.user'),
        pass: config.get('emailPrivateKey'), // get key from environment variable
      },
      // enable sending from local host
      tls: {
        rejectUnauthorized: config.get('email.rejectUnauthorized'),
      },
    });
    // TODO: does not throw error with wrong password!
    return transporter;
  } catch (error) {
    console.error('smtp error');
  }
};

const sendEmail = (to, subject, text) => {
  return new Promise((resolve, reject) => {
    // email data
    let mail = {
      from: `"Ticketsystem" <${config.get('email.user')}>`, // from ticketsystem
      to: to, // to admin, but for testing purposes implemented in form
      subject: subject,
      text: text,
    };
    // send mail with defined transport object
    let transporter = smtpConfig();
    transporter
      .sendMail(mail)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(false);
      });
  });
};

module.exports = sendEmail;
