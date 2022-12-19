const { expect } = require('chai');

const { Ticket } = require('../../models/ticket');

describe('Ticket Model', () => {
  it('should be invalid if required field is missing', () => {
    let ticket = new Ticket({});
    ticket.validate((error) => {
      expect(error.errors.title).to.exist;
      expect(error.errors.comment).to.exist;
      expect(error.errors.date).to.exist;
      expect(error.errors.module).to.exist;
      expect(error.errors.source).to.exist;
      expect(error.errors.student).to.exist;
      expect(error.errors.type).to.exist;
    });
  });

  it('should be valid if title is a string', () => {
    let ticket = new Ticket({ title: 'test' });
    ticket.validate(() => {
      expect(ticket.title).to.equal('test');
    });
  });
});
