const express = require('express');
const sendEmail = require('../services/emailService');
const router = express.Router();
const config = require('config');
const authentication = require('../middleware/authentication');

router.post('/', [authentication], async (req, res) => {
  // get dynamic content of the form
  const { issue, description } = req.body;
  // get user details from authentication middleware
  const { email } = req.user;
  // set email content
  const emailText = `
    An issue has been reported by ${email}.
    ––––––––––––––––––––––––––––––
    Issue: ${issue}
    Description: 
    
    ${description}
  `;

  await sendEmail(config.get('email.server'), issue, emailText);
  res.json('Email has been sent.');
});
module.exports = router;
