const generateAuthToken = require('../../middleware/generateAuthToken');
const httpMocks = require('node-mocks-http');
const { expect } = require('chai');

function testUserObject01() {
  return {
    email: 'test',
    role: 'student',
  };
}
function testUserObject02() {
  return { email: 'test' };
}

describe('generateAuthToken', () => {
  let req;
  let res;
  let next;

  describe('when user exists', () => {
    beforeEach(() => {
      req = httpMocks.createRequest({ user: testUserObject01() });
      res = httpMocks.createResponse();
      next = () => {};
    });

    afterEach(() => {});

    it('should save a token in req.token', async () => {
      await generateAuthToken(req, res, next);

      expect(req.token).to.be.ok;
    });

    it('should return a valid token', async () => {
      await generateAuthToken(req, res, next);

      expect(req.token).to.matches(
        /^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/
      );
    });

    it.skip('should have an expiration date', async () => {});
  });

  describe('when user details are missing', () => {
    beforeEach(() => {
      req = httpMocks.createRequest({ user: testUserObject02() });
      res = httpMocks.createResponse();
      next = () => {};
    });

    afterEach(() => {});

    it.skip('should throw an error', async () => {
      // expect(function () {
      //   throwError(true);
      // }).to.throw('error');
    });
  });
});

// throwError = (val) => {
//   try {
//     if (val === true) throw new Error();
//   } catch (error) {
//     console.log('error');
//   }
// };
