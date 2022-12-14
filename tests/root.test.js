const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const server = require('../startup/startServer');
const expect = require('chai').expect;

describe('/', () => {
  it('should return "Yeiii!"', async () => {
    await request(app)
      .get('/')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.equal('Yeiii!');
      })
      .catch((err) => {
        throw err;
      });
  });
});

before(async () => {});

after(async () => {
  mongoose.disconnect();
  server.close();
});
