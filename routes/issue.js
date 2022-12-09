const express = require('express');
const sendEmail = require('../services/emailService');
const router = express.Router();
const config = require('config');
const userDetails = require('../middleware/userDetails');
const authentication = require('../middleware/authentication');

const sendTo = (role) => {
  if (role === 'student') {
    return config.get('email.student');
  } else return config.get('email.professor');
};

router.post('/', [authentication], async (req, res) => {
  // get dynamic content of the form
  const { issue, description } = req.body;
  // get user details from authentication middleware
  const { email, role } = req.user;
  // set email content
  const emailText = `
    An issue has risen by ${email}.
    ––––––––––––––––––––––––––––––
    Issue: ${issue}
    Description: 
    
    ${description}
  `;

  await sendEmail(sendTo(role), issue, emailText);
  res.json('Email has been sent.');
});
module.exports = router;
