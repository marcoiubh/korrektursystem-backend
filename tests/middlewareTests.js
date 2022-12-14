const httpMocks = require('node-mocks-http'); // mocks req or res objects
const expect = require('chai').expect;

beforeEach((done) => {
  const req = httpMocks.createRequest(),
    res = httpMocks.createResponse();
});

// add, remove, modify req
// add, remove, modify res
// express-mocks-http more specific to express apps
it('should call next ()', function (done) {
  middleware(reg, res);
  expect(reg.foo).to.equal('bar');
});

// method call on req
// method call on res
// next was called -> next has to be called !!!
it('should call next ()', function (done) {
  middleware(req, res, function () {
    done();
  });
});

// basic example using chaiAsPromised
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
describe('middleware', () => {
  it('resolves', () => {
    return expect(middleware(req, res)).to.be.fulfilled.then(() => {
      // Assert
    });
  });
  it('rejects', () => {
    return expect(middleware(req, res)).to.be.rejectedWith(
      'Error String'
    );
  });
});

// use promises as link between async middleware and endpoints
// define behavior in middleware and return resolve or reject
// endpoint should reply to the client
const middleware = require(' ./middleware,js');
app.get(
  'example/uri',
  function (reg, res, next) {
    middleware
      .first(reg, res)
      .then(function () {
        next();
      })
      .catch(res.json)
      .done();
  },
  function (req, res, next) {
    middleware
      .second(reg, res)
      .then(function () {
        next();
      })
      .catch(res.json)
      .done();
  }
);

// MOCKGOOSE to mock data
const mongoose = require('mongoose');
const mockgoose = require('mockgoose');
mockgoose(mongoose);

// creating fixtures
module.exports.User = {
  name: 'TestUser',
};

// using fixtures with pow-mongoose-fixtures
const loader = require('pow-mongoose-fixtures');
const user = requrire('users.js');

beforeEach((done) => {
  loader.load(user);
  done();
});
