const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const server = require('../startup/startServer');
const httpMocks = require('node-mocks-http'); // mocks req or res objects
const getTicketsByRole = require('../middleware/getTicketsByRole');
const expect = require('chai').expect;

describe('getTicketsByRole', () => {
  let req = httpMocks.createRequest({
    user: { mail: 'student_a@iubh.de', role: 'student' },
  });
  let res = httpMocks.createResponse();
  let next = () => {};

  it.skip('returns a ticket', () => {
    getTicketsByRole(req, res, next);
    expect(req.ticket.title).toBe({
      title: 'title',
    });
  });
  // it('rejects', () => {
  //   return expect(getTicketsByRole(req, res)).to.be.rejectedWith(
  //     'Error String'
  //   );
  // });
});

// describe('getTicketsByRole', () => {
//   let req = {};
//   let res = {};

//   beforeEach((done) => {
//     req = httpMocks.createRequest();
//     res = httpMocks.createResponse();
//   });

//   it('should return modules of the student', async () => {
//     getTicketsByRole(req, res);
//     expect(req.user).toEqual({
//       email: 'student_a@iubh.de',
//       role: 'student',
//     });
//   });
// });

// before(async () => {});

after(async () => {
  await mongoose.disconnect();
  server.close();
});
