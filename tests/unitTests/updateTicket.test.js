const sinon = require('sinon');
const updateTicket = require('../../middleware/updateTicket');
const httpMocks = require('node-mocks-http');
const { default: mongoose } = require('mongoose');
const { expect } = require('chai');

function testTicketObject() {
  return {
    date: 'test',
    priority: 'test',
    statement: 'test',
    status: 'test',
    readProfessor: 'test',
    readStudent: 'test',
    history: ['test'],
  };
}

describe('updateTicket', () => {
  let stub;
  let req;
  let res;
  let next;

  beforeEach(() => {
    stub = sinon.stub(mongoose.Model, 'findOneAndUpdate');
    req = httpMocks.createRequest({ body: testTicketObject() });
    res = httpMocks.createResponse();
    next = () => {};
  });

  afterEach(() => {
    stub.restore();
  });

  describe('when ticket details transmitted in request body', () => {
    it('should save the updated ticket in req.ticket', async () => {
      stub.returns(Promise.resolve(testTicketObject()));

      await updateTicket(req, res, next);

      expect(req.ticket).to.have.property('date');
      expect(req.ticket).to.have.property('priority');
      expect(req.ticket).to.have.property('status');
      expect(req.ticket).to.have.property('readProfessor');
      expect(req.ticket).to.have.property('readStudent');
      expect(req.ticket).to.have.property('history');
    });
  });
});
