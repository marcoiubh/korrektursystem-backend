const config = require('config');
const sendEmail = require('../services/emailService');
const debug = require('debug')('error');

const ticketCreated = async (req, res, next) => {
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
      next();
    } catch (error) {
      debug('Mail could not be sent.', error);
      res.status(503).send('Email service not available');
    }
  } else next();
};

const ticketUpdated = async (req, res, next) => {
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
      next();
    } catch (error) {
      debug('Mail could not be sent.', error);
      res.status(503).send('Email service not available');
    }
  } else next();
};
const issueCreated = async (req, res, next) => {
  // get dynamic content of the form
  const { title, description } = req.body;
  // get user details from authentication middleware
  const { email } = req.user;
  // set email content
  if (config.get('testEmail')) {
    const emailText = `
  An issue has been reported by ${email}.
  ––––––––––––––––––––––––––––––
  Issue: ${title}
  Description: 
  
  ${description}
`;

    try {
      await sendEmail(config.get('email.server'), title, emailText);
      next();
    } catch (error) {
      debug('Mail could not be sent.', error);
      res.status(503).send('Email service not available');
    }
  } else next();
};

module.exports = { issueCreated, ticketCreated, ticketUpdated };
