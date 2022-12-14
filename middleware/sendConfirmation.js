const { Ticket } = require('../models/ticket');
const config = require('config');
const sendEmail = require('../services/emailService');

module.exports.ticketCreated = async function (req, res, next) {
  const { student, module, comment, title } = req.ticket;
  if (config.get('testEmail')) {
    const emailText = `
      ${student} has created a ticket.
      –––––––––––––––––––––––––––––––––––––––
      Module: ${module}
      Title: ${title}
      Message: ${comment}
  `;
    try {
      await sendEmail(
        config.get('email.professor'),
        title,
        emailText
      );
    } catch (error) {
      console.log('Mail could not be sent.', error);
    }
  }
  next();
};

module.exports.ticketUpdated = async function (req, res, next) {
  const { statement, module, title } = req.ticket;
  // set email confirmation based on config
  // avoid sending email when only read status has changed by checking statement
  if (config.get('testEmail') && statement) {
    const emailText = `
        Your ticket has been updated.
        –––––––––––––––––––––––––––––––––––––––
        Module: ${module}
        Title: ${title}
        Message: ${statement}
    `;
    try {
      await sendEmail(config.get('email.student'), title, emailText);
    } catch (error) {
      console.log('Mail could not be sent.', error);
    }
  }
  next();
};
module.exports.issueCreated = async function (req, res, next) {
  // get dynamic content of the form
  const { issue, description } = req.body;
  // get user details from authentication middleware
  const { email } = req.user;
  // set email content
  if (config.get('testEmail')) {
    const emailText = `
  An issue has been reported by ${email}.
  ––––––––––––––––––––––––––––––
  Issue: ${issue}
  Description: 
  
  ${description}
`;

    try {
      await sendEmail(config.get('email.server'), issue, emailText);
    } catch (error) {
      console.log('Mail could not be sent.', error);
    }
  }
  next();
};
