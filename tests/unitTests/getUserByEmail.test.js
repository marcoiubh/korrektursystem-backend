const sinon = require('sinon');
const getUserByEmail = require('../../middleware/getUserByEmail');
const httpMocks = require('node-mocks-http');
const { default: mongoose } = require('mongoose');
const { expect } = require('chai');

function testUserObject() {
  return { email: 'test', role: 'student' };
}

describe('getUserByEmail', () => {
  let stub;
  let req;
  let res;
  let next;

  beforeEach(() => {
    stub = sinon.stub(mongoose.Model, 'findOne');
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = () => {};
  });

  afterEach(() => {
    stub.restore();
  });

  describe('when user exists', () => {
    it('should save user details in req.user', async () => {
      stub.returns(Promise.resolve(testUserObject()));

      await getUserByEmail(req, res, next);

      expect(req.user).to.be.deep.equal(testUserObject());
    });
  });

  describe('when user does not exist', () => {
    it('should return with status 400', async () => {
      stub.returns(Promise.resolve(undefined));

      await getUserByEmail(req, res, next);
      expect(res._getStatusCode()).to.be.equal(400);
      expect(res._getData()).to.be.equal(
        'Invalid email or password.'
      );
    });
  });
});
