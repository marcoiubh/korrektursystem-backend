const {
  getTokenFromHeader,
} = require('../../middleware/authentication');
const httpMocks = require('node-mocks-http');
const { expect } = require('chai');
const config = require('config');
const jwt = require('jsonwebtoken');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

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

describe('authentication', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    res = httpMocks.createResponse();
    next = () => {};
  });

  afterEach(() => {});

  describe('authentication', () => {
    describe('when token is valid', () => {
      it('should resolve', async () => {
        req = httpMocks.createRequest({
          headers: { 'x-auth-token': validToken() },
        });
        authentication(req, res, next);
        expect(req.user).to.include({
          email: 'student_a@iubh.de',
          role: 'student',
        });
      });
    });

    describe('when token is not valid', () => {
      it('should reject', async () => {
        req = httpMocks.createRequest({});

        expect(() => authentication(req, res, next)).to.throw();
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

        expect(() => getTokenFromHeader(req, res)).to.throw();
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

    describe('when token is not present', () => {
      it('should reject with 400 - Invalid email or password.', async () => {
        req = httpMocks.createRequest({
          token: '',
        });

        expect(() => validateToken(req, res)).to.throw();
        expect(res.statusCode).to.be.equal(400);
        expect(res._getData()).to.be.equal(
          'JsonWebTokenError: jwt must be provided'
        );
      });
    });

    describe('when token is expired', () => {
      it('should reject with 401 - Token expired.', async () => {
        req = httpMocks.createRequest({ token: expiredToken() });

        expect(() => validateToken(req, res)).to.throw();
        expect(res.statusCode).to.be.equal(401);
        expect(res._getData()).to.be.equal('Token expired.');
      });
    });

    describe('when token is invalid', () => {
      it('should reject with 400 - jwt malformed', async () => {
        req = httpMocks.createRequest({ token: 'wrong' });

        expect(() => validateToken(req, res)).to.throw();
        expect(res.statusCode).to.be.equal(400);
        expect(res._getData()).to.be.equal(
          'JsonWebTokenError: jwt malformed'
        );
      });
    });
  });
});
