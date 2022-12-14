const validatePassword = require('../../middleware/validatePassword');
const httpMocks = require('node-mocks-http');
const { expect } = require('chai');

function validPasswords() {
  return {
    body: { password: 'test' },
    user: {
      password:
        '$2b$10$HiV6F8ikDtk4bBPgfCys6uyHqGndQvw2hT2I4CaAGNadFDzDI3/Sm',
    },
  };
}

function invalidPasswords() {
  return {
    body: { password: 'wrong' },
    user: {
      password:
        '$2b$10$HiV6F8ikDtk4bBPgfCys6uyHqGndQvw2hT2I4CaAGNadFDzDI3/Sm',
    },
  };
}

describe('validatePassword', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    res = httpMocks.createResponse();
    next = () => {};
  });

  afterEach(() => {});

  describe('when passwords from database and user input are the same', () => {
    it('should resolve', async () => {
      req = httpMocks.createRequest(validPasswords());

      expect(await validatePassword(req, res, next)).to.be.true;
    });
  });

  describe('when passwords from database and user input are different', () => {
    it('should reject', async () => {
      req = httpMocks.createRequest(invalidPasswords());
      await validatePassword(req, res, next).then(() => {
        expect(res.statusCode).to.be.equal(400);
        expect(res._getData()).to.be.equal(
          'Invalid email or password.'
        );
      });
    });
  });
});
