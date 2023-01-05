const {
  getTokenFromHeader,
  validateToken,
  authorization,
} = require('../../middleware/authorization');
const httpMocks = require('node-mocks-http');
const { expect } = require('chai');
const config = require('config');
const jwt = require('jsonwebtoken');

function validToken() {
  return jwt.sign(
    { email: 'student_a@iubh.de', role: 'student' },
    config.get('jwtPrivateKey'),
    { expiresIn: '30m' }
  );
}

function expiredToken() {
  return jwt.sign(
    { exp: 0, email: 'student_a@iubh.de', role: 'student' },
    config.get('jwtPrivateKey')
  );
}

describe('authorization', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    res = httpMocks.createResponse();
    next = () => {};
  });

  afterEach(() => {});

  describe('authorization', () => {
    describe('when token is valid', () => {
      it('should resolve', async () => {
        req = httpMocks.createRequest({
          headers: { 'x-auth-token': validToken() },
        });
        authorization(req, res, next);
        expect(req.user).to.include({
          email: 'student_a@iubh.de',
          role: 'student',
        });
      });
    });

    describe('when token is not valid', () => {
      it('should reject', async () => {
        req = httpMocks.createRequest({});
        authorization(req, res, next);
        expect(res.statusCode).to.be.equal(401);
      });
    });
  });

  describe('getTokenFromHeader', () => {
    describe('when token is provided in the header', () => {
      it('should resolve', async () => {
        req = httpMocks.createRequest({
          headers: { 'x-auth-token': 'test' },
        });
        getTokenFromHeader(req, res);
        expect(req.token).to.be.equal('test');
      });
    });

    describe('when token is not provided in the header', () => {
      it('should reject', async () => {
        req = httpMocks.createRequest({});
        getTokenFromHeader(req, res);
        expect(res.statusCode).to.be.equal(401);
        expect(res._getData()).to.be.equal(
          'Access denied. No token provided.'
        );
      });
    });
  });

  describe('validateToken', () => {
    describe('when token is valid', () => {
      it('should save its payload in req.user', async () => {
        req = httpMocks.createRequest({
          token: validToken(),
        });
        validateToken(req, res, next);

        expect(req.user).to.have.property('email');
        expect(req.user).to.have.property('role');
        expect(req.user).to.have.property('exp');
      });
    });

    describe('when token is expired', () => {
      it('should reject with 401 - TokenExpiredError: jwt expired.', async () => {
        req = httpMocks.createRequest({ token: expiredToken() });

        expect(validateToken(req, res)).to.be.not.ok;
        expect(res.statusCode).to.be.equal(401);
        expect(res._getData()).to.be.equal(
          'TokenExpiredError: jwt expired'
        );
      });
    });

    describe('when token is invalid', () => {
      it('should reject with 401 - JsonWebTokenError: jwt malformed', async () => {
        req = httpMocks.createRequest({ token: 'wrong' });

        expect(validateToken(req, res)).to.be.not.ok;
        expect(res.statusCode).to.be.equal(401);
        expect(res._getData()).to.be.equal(
          'JsonWebTokenError: jwt malformed'
        );
      });
    });
  });
});
