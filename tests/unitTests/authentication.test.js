const {
  getTokenFromHeader,
} = require('../../middleware/authentication');
const httpMocks = require('node-mocks-http');
const { expect } = require('chai');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

function validPasswords() {
  return {};
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
    describe.skip('when token is valid', () => {
      it('should save its payload in req.user', async () => {
        req = httpMocks.createRequest({
          headers: { 'x-auth-token': 'test' },
        });
        const token = getTokenFromHeader(req, res);
        expect(token).to.be.equal('test');
      });
    });

    describe.skip('when token is not provided in the header', () => {
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

  // describe('when passwords from database and user input are different', () => {
  //   it('should reject', async () => {
  //     req = httpMocks.createRequest(invalidPasswords());

  //     await expect(
  //       authentication(req, res, next)
  //     ).to.be.rejected.then(() => {
  //       expect(res.statusCode).to.be.equal(400);
  //       expect(res._getData()).to.be.equal(
  //         'Invalid email or password.'
  //       );
  //     });
  //   });
  // });
});
