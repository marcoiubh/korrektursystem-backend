const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const server = require('../startup/startServer');
const config = require('config');
const jwt = require('jsonwebtoken');
let token = {};
const expect = require('chai').expect;

describe('/issue', () => {
  it('should return 401 "Unauthorized"  without passing a valid token', async () => {
    await request(app)
      .post('/issue')
      .then((res) => {
        expect(res).to.have.status(401);
      })
      .catch((err) => {
        throw err;
      });
  });

  it('should return 200 "OK" when authentification succeeds', async () => {
    await request(app)
      .post('/issue')
      .set('x-auth-token', token)
      .then((res) => {
        expect(res).to.have.status(200);
      })
      .catch((err) => {
        throw err;
      });
  });
  it('should return "Email has been sent."', async () => {
    await request(app)
      .post('/issue')
      .set('x-auth-token', token)
      .send({ issue: 'issue', description: 'description' })
      .then((res) => {
        expect(res.body).to.equal('Email has been sent.');
      })
      .catch((err) => {
        throw err;
      });
  });
});

before(async () => {
  token = jwt.sign(
    { email: 'student_a@iubh.de', role: 'student' },
    config.get('jwtPrivateKey'),
    { expiresIn: '30m' }
  );
});

after(async () => {
  mongoose.disconnect();
  server.close();
});
