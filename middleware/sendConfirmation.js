const config = require('config');
const sendEmail = require('../services/emailService');

const ticketCreated = async (req, res, next) => {
  // get dynamic content from the form
  const { student, module, comment, title } = req.ticket;

  // send emails if configuration is enabled only
  if (config.get('emailServiceEnabled')) {
    // email text content
    const emailText = `
      ${student} has created a ticket.
      –––––––––––––––––––––––––––––––––––––––
      Module: ${module}
      Title: ${title}
      Message: ${comment}
  `;
    // send email to professor with ticket title and email text
    try {
      await sendEmail(
        config.get('email.professor'),
        title,
        emailText
      );
      next();
    } catch (error) {
      res
        .status(503)
        .send(
          'Ticket has been created, but email service is currently not available.'
        );
    }
  } else next();
};

const ticketUpdated = async (req, res, next) => {
  // get dynamic content from the form
  const { statement, module, title } = req.ticket;

  // send emails if configuration is enabled only
  // avoid sending email when only read status has been changed by checking email flag
  // see updateTicket
  if (config.get('emailServiceEnabled') && req.email) {
    // email text content
    const emailText = `
        Your ticket has been updated.
        –––––––––––––––––––––––––––––––––––––––
        Module: ${module}
        Title: ${title}
        Message: ${statement}
    `;

    // send email to student with ticket title and email text
    try {
      await sendEmail(config.get('email.student'), title, emailText);
      next();
    } catch (error) {
      res
        .status(503)
        .send(
          'Changes have been saved, but email service is currently not available.'
        );
    }
  } else next();
};

const issueCreated = async (req, res, next) => {
  // get dynamic content from the form
  const { title, description } = req.body;
  // get user email from authorization middleware
  const { email } = req.user;

  // send emails if configuration is enabled only
  if (config.get('emailServiceEnabled')) {
    // email text content
    const emailText = `
  An issue has been reported by ${email}.
  ––––––––––––––––––––––––––––––
  Issue: ${title}
  Description: 
  
  ${description}
`;
    // send email to sys admin with ticket title and email text
    try {
      await sendEmail(config.get('email.server'), title, emailText);
      next();
    } catch (error) {
      res.status(503).send('Email service not available');
    }
  } else next();
};

module.exports = { issueCreated, ticketCreated, ticketUpdated };
