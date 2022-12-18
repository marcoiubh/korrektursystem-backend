const sinon = require('sinon');
const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');

// import module
const ticketsByMail = require('../../middleware/getTicketsByRole');

describe('find tickets of users', () => {
  let req;
  let res;
  let next;

  let stubByModule;
  let spyProfessor;
  let spyStudent;

  // information based on login token
  let loginProfessor1 = { email: 'user1', role: 'professor' };
  let loginProfessor2 = { email: 'user2', role: 'professor' };
  let loginStudent = { email: 'user3', role: 'student' };
  let invalidRole = { email: 'user4', role: 'invalid' };

  // user information based on database
  let professorWithModules1 = {
    email: 'user1',
    modules: [{ title: 'module1' }, { title: 'module2' }],
  };
  let professorWithModules2 = {
    email: 'user2',
    modules: [{ title: 'module3' }],
  };

  // ticket information based on database
  let ticket1 = {
    title: 'ticketUser3',
    module: 'module1',
    student: 'user3',
  };
  let ticket2 = {
    title: 'ticketUser4',
    module: 'module2',
    student: 'user4',
  };
  let ticket3 = {
    title: 'ticketUser3',
    module: 'module3',
    student: 'user3',
  };

  describe('getTickets', () => {
    beforeEach(() => {
      req = httpMocks.createRequest();
      res = httpMocks.createResponse();
      next = () => {};

      spyProfessor = sinon.spy(
        ticketsByMail.find,
        'ticketsOfProfessor'
      );
      spyStudent = sinon.spy(ticketsByMail.find, 'ticketsOfStudent');
    });

    afterEach(() => {
      spyProfessor.restore();
      spyStudent.restore();
      req = {};
    });

    describe('if user is a professor', () => {
      beforeEach(() => {
        req = httpMocks.createRequest({ user: loginProfessor1 });
      });
      it('should call ticketsOfProfessor', async () => {
        await ticketsByMail.getTickets(req, res, next);
        expect(spyProfessor.withArgs(loginProfessor1.email).called).to
          .be.true;
      });
      it('should not call ticketsOfStudent', async () => {
        await ticketsByMail.getTickets(req, res, next);
        expect(spyStudent.withArgs(loginProfessor1.email).called).to
          .be.false;
      });
    });

    describe('if user is a student', () => {
      beforeEach(() => {
        req = httpMocks.createRequest({ user: loginStudent });
      });
      it('should call ticketsOfStudent', async () => {
        await ticketsByMail.getTickets(req, res, next);
        expect(spyStudent.withArgs(loginStudent.email).called).to.be
          .true;
      });
      it('should not call ticketsOfProfessor', async () => {
        await ticketsByMail.getTickets(req, res, next);
        expect(spyProfessor.withArgs(loginStudent.email).called).to.be
          .false;
      });
    });
    describe.skip('if user has no valid role', () => {
      it('should throw "invalid role"', () => {
        expect(
          async () => await ticketsByMail.getTickets(req, res, next)
        ).to.throw();
      });
    });
  });

  describe('utility functions', () => {
    beforeEach(() => {
      stubByModule = sinon.stub(ticketsByMail.find, 'byModule');
      stubByModule.withArgs({ title: 'module1' }).returns(ticket1);
      stubByModule.withArgs({ title: 'module2' }).returns(ticket2);
      stubByModule.withArgs({ title: 'module3' }).returns(ticket3);

      stubEmailToUser = sinon.stub(ticketsByMail.find, 'emailToUser');
      stubEmailToUser
        .withArgs(loginProfessor1)
        .returns(professorWithModules1);
      stubEmailToUser
        .withArgs(loginProfessor2)
        .returns(professorWithModules2);

      stubTicketsOfStudent = sinon.stub(
        ticketsByMail.find,
        'ticketsOfStudent'
      );
      stubTicketsOfStudent
        .withArgs(loginStudent)
        .returns([ticket1, ticket3]);
    });

    afterEach(() => {
      stubByModule.restore();
      stubEmailToUser.restore();
      stubTicketsOfStudent.restore();
    });

    describe('ticketsOfStudent - if the student has tickets associated with his email', () => {
      it('should return these tickets', async () => {
        expect(
          await ticketsByMail.find.ticketsOfStudent(loginStudent)
        ).to.eql([ticket1, ticket3]);
      });
    });
    describe('ticketsOfProfessor - if the professor has tickets associated with his modules', () => {
      it('should return these tickets', async () => {
        expect(
          await ticketsByMail.find.ticketsOfProfessor(loginProfessor1)
        ).to.eql([ticket1, ticket2]);
        expect(
          await ticketsByMail.find.ticketsOfProfessor(loginProfessor2)
        ).to.eql([ticket3]);
      });
    });
    describe('findWithModulesPopulated ', () => {
      it('should return user details with modules', () => {
        expect(
          ticketsByMail.find.emailToUser(loginProfessor1)
        ).to.equal(professorWithModules1);
        expect(
          ticketsByMail.find.emailToUser(loginProfessor2)
        ).to.equal(professorWithModules2);
      });
    });
    describe('findAllTickets ', () => {
      it('should return all tickets based on user modules', async () => {
        expect(
          await ticketsByMail.find.allTickets(professorWithModules1)
        ).to.eql([ticket1, ticket2]);
        expect(
          await ticketsByMail.find.allTickets(professorWithModules2)
        ).to.eql([ticket3]);
      });
    });

    describe('find by module', () => {
      it('should return tickets with reference to that module', () => {
        expect(
          ticketsByMail.find.byModule({ title: 'module1' })
        ).to.equal(ticket1);
        expect(
          ticketsByMail.find.byModule({ title: 'module2' })
        ).to.equal(ticket2);
        expect(
          ticketsByMail.find.byModule({ title: 'module3' })
        ).to.equal(ticket3);
      });
    });

    describe('full run STUDENT', () => {
      beforeEach(() => {
        req = httpMocks.createRequest({ user: loginStudent });
      });
      it('should return ticket 1 & 3', async () => {
        const result = await ticketsByMail.getTickets(req, res, next);
        // await expect().to.eql(
        //   [ticket1, ticket3]
        // );
      });
    });
  });
});

// user1 (professor) modules [module1, module2] tickets [ticket1, ticket2]
// user2 (professor) modules [module3] tickets [ticket3]
