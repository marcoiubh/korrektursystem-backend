const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const server = require('../startup/startServer');
const config = require('config');
const jwt = require('jsonwebtoken');
let token = {};

describe('/issue', () => {
  it('should return 401 "Unauthorized"  without passing a valid token', async () => {
    const res = await request(app).post('/issue').expect(401);
  });

  it('should return 200 "OK" when authentification succeeds', async () => {
    const res = await request(app)
      .post('/issue')
      .set('x-auth-token', token)
      .expect(200);
  });
  it('should return "Email has been sent."', async () => {
    const res = await request(app)
      .post('/issue')
      .set('x-auth-token', token)
      .send({ issue: 'issue', description: 'description' });

    expect(res.body).toEqual('Email has been sent.');
  });
});

beforeAll(async () => {
  token = jwt.sign(
    { email: 'student_a@iubh.de', role: 'student' },
    config.get('jwtPrivateKey'),
    { expiresIn: '30m' }
  );
});

afterAll(async () => {
  mongoose.disconnect();
  server.close();
});
