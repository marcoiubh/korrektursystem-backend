const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const server = require('../startup/startServer');
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('/authentication', () => {
  it('should return 400 "Bad Request" without login credentials', async () => {
    await request(app)
      .post('/authentication')
      .then((res) => {
        expect(res).to.have.status(400);
      })
      .catch((err) => {
        throw err;
      });
  });
  it('should return 400 "Bad Request" without valid email', async () => {
    await request(app)
      .post('/authentication')
      .send({ email: 'wrong', password: 'correct' })
      .then((res) => {
        expect(res).to.have.status(400);
      })
      .catch((err) => {
        throw err;
      });
  });
  it('should return 400 "Bad Request" without valid password', async () => {
    await request(app)
      .post('/authentication')
      .send({ email: 'correct', password: 'wrong' })
      .then((res) => {
        expect(res).to.have.status(400);
      })
      .catch((err) => {
        throw err;
      });
  });
  it('should return 200 "OK" with valid credentials', async () => {
    await request(app)
      .post('/authentication')
      .send({ email: 'correct', password: 'correct' })
      .then((res) => {
        expect(res).to.have.status(200);
      })
      .catch((err) => {
        throw err;
      });
  });
  it('should return a token starting with eyJh...', async () => {
    await request(app)
      .post('/authentication')
      .send({ email: 'correct', password: 'correct' })
      .then((res) => {
        expect(res.body).to.match(
          /^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9?/
        );
      })
      .catch((err) => {
        throw err;
      });
  });
});

before(async () => {});

after(async () => {
  mongoose.disconnect();
  // server.close();
});
