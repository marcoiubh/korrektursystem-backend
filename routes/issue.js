const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const _ = require('lodash');
const config = require('config');

router.post('/', (req, res) => {
  // SMTP
  const setSmtpOptions = () => {
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

  // email data
  let mailOptions = {
    from: '"Ticketsystem" <marco.koll@iubh-fernstudium.de>', // from ticketsystem
    to: req.body.email, // to admin, but for testing purposes implemented in form
    subject: req.body.issue,
    text: `
    Date: ${req.body.date}
    Email: ${req.body.user}
    Issue: ${req.body.issue}
    Description: ${req.body.description}
  `,
  };
  // send mail with defined transport object
  let transporter = setSmtpOptions();
  transporter.sendMail(mailOptions, (error, info) => {
    res.json('Email has been sent');
  });
});
module.exports = router;
