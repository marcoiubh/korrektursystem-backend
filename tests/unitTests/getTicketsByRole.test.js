const sinon = require('sinon');
const getTicketsByRole = require('../../middleware/getTicketsByRole');
const httpMocks = require('node-mocks-http');
const mongoose = require('mongoose');
const { expect } = require('chai');

function testStudentObject() {
  return {
    user: { email: 'test', role: 'student', modules: ['A', 'B'] },
  };
}
function testProfessorObject() {
  return {
    user: { email: 'test', role: 'professor', modules: ['A', 'B'] },
  };
}

function userWithPopulatedModules() {
  return {
    _id: new ObjectId('63760a4b08edfccf49df9270'),
    email: 'professor_a@iubh.de',
    password:
      '$2b$10$2hytUSbU36gzt8fYpVO8PeP8lclMdOBnLMe7ZwFtZDKEsPlmml23q',
    role: 'professor',
    modules: [
      {
        _id: new ObjectId('6376ae9a78ec5f732de5e89e'),
        title: 'BSTA01-01',
        users: [Array],
        __v: 0,
      },
      {
        _id: new ObjectId('6376b0d23ef6cb9aaa4de810'),
        title: 'IOBP02',
        users: [Array],
        __v: 0,
      },
      {
        _id: new ObjectId('63777c3ce0c1e049f8e2f337'),
        title: 'IGIS01',
        users: [Array],
        __v: 0,
      },
    ],
  };
}

function ticketArray() {
  return [
    [
      {
        _id: new ObjectId('639863a90faa1b48a59a1a2d'),
        comment: 'dsfdsf',
        date: '2022-12-15T09:34:02.276Z',
        module: 'BSTA01-01',
        source: 'Vodcast',
        status: 'Closed',
        student: 'student_a@iubh.de',
        title: 'sfsdf',
        type: 'Error',
        readStudent: true,
        readProfessor: true,
        history: [Array],
        priority: 'Major',
        statement: 'Statement 01',
      },
      {
        _id: new ObjectId('639b12735381f4611c213ea7'),
        comment: 'sdfdfsfdf',
        date: '2022-12-15T12:26:27.008Z',
        module: 'IOBP02',
        source: 'Vodcast',
        status: 'New',
        student: 'student_a@iubh.de',
        title: 'sfsddfsdf',
        type: 'Proposal',
        readStudent: true,
        readProfessor: false,
        history: [Array],
      },
    ],
    [],
  ];
}

function testTicketObject() {
  return { title: 'testTicket' };
}

describe('getTicketsByRole', () => {
  let stub;
  let req;
  let res;
  let next;

  describe('findTicketsOfStudent', () => {
    beforeEach(() => {
      stub = sinon.stub(mongoose.Model, 'find');
      req = httpMocks.createRequest(testStudentObject());
      res = httpMocks.createResponse();
      next = () => {};
    });

    afterEach(() => {
      stub.restore();
    });

    describe('when user is a student', () => {
      it('should save his tickets in req.ticket', async () => {
        stub.returns(Promise.resolve(testTicketObject()));

        await getTicketsByMail(req, res, next);

        expect(req.ticket).to.be.deep.equal(testTicketObject());
      });
    });
  });

  describe('findTicketsOfProfessor', () => {
    beforeEach(() => {
      stub = sinon.stub(getTicketsByRole, 'findAllTickets');
      req = httpMocks.createRequest(testProfessorObject());
      res = httpMocks.createResponse();
      next = () => {};
    });

    afterEach(() => {
      stub.restore();
    });

    describe('when user is a student', () => {
      it('should save his tickets in req.ticket', async () => {
        stub.returns(Promise.resolve(testProfessorObject()));

        await getTicketsByMail(req, res, next);

        // expect(req.ticket).to.be.deep.equal(testTicketObject());
      });
    });
  });
});
