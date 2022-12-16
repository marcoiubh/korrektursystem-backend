const sinon = require('sinon');
const saveTicket = require('../../middleware/saveTicket');
const httpMocks = require('node-mocks-http');
const { default: mongoose } = require('mongoose');
const { expect } = require('chai');

function testTicketObject() {
  return {
    comment: 'test',
    date: 'test',
    module: 'test',
    priority: 'test',
    source: 'test',
    status: 'test',
    student: 'test',
    title: 'test',
    type: 'test',
    readProfessor: 'test',
    readStudent: 'test',
    history: ['test'],
  };
}

describe('saveTicket', () => {
  let stub;
  let req;
  let res;
  let next;

  beforeEach(() => {
    stub = sinon.stub(mongoose.Model.prototype, 'save');
    req = httpMocks.createRequest({ body: testTicketObject() });
    res = httpMocks.createResponse();
    next = () => {};
  });

  afterEach(() => {
    stub.restore();
  });

  describe('when ticket details transmitted in request body', () => {
    it('should create a ticket object', async () => {
      stub.returns(Promise.resolve());

      await saveTicket(req, res, next);

      expect(req.ticket).to.have.property('comment');
      expect(req.ticket).to.have.property('date');
      expect(req.ticket).to.have.property('module');
      expect(req.ticket).to.have.property('priority');
      expect(req.ticket).to.have.property('source');
      expect(req.ticket).to.have.property('status');
      expect(req.ticket).to.have.property('student');
      expect(req.ticket).to.have.property('title');
      expect(req.ticket).to.have.property('type');
      expect(req.ticket).to.have.property('readProfessor');
      expect(req.ticket).to.have.property('readStudent');
      expect(req.ticket).to.have.property('history');
      expect(req.ticket).to.have.property('_id');
    });
  });
});
