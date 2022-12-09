const nodemailer = require('nodemailer');
const _ = require('lodash');
const config = require('config');

// SMTP
const smtpConfig = () => {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: 'marco.koll@iubh-fernstudium.de',
        pass: config.get('emailPrivateKey'), // get key from environment variable
      },
      // enable sending from local host
      tls: {
        rejectUnauthorized: false,
      },
    });
    // TODO: does not throw error with wrong password!
    return transporter;
  } catch (error) {
    console.error('smtp error');
  }
};

function sendEmail(to, subject, text) {
  // email data
  let mail = {
    from: `"Ticketsystem" <${config.get('testReceiverEmail')}>`, // from ticketsystem
    to: to, // to admin, but for testing purposes implemented in form
    subject: subject,
    text: text,
  };
  // send mail with defined transport object
  let transporter = smtpConfig();
  const response = transporter.sendMail(mail, (error, info) => {
    //TODO: error handling
  });
}

module.exports = sendEmail;
