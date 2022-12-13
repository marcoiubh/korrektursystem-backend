const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const server = require('../startup/startServer');
const config = require('config');
const jwt = require('jsonwebtoken');
let token = {};

describe('/tickets', () => {
  it('should return 401 "Unauthorized"', async () => {
    const res = await request(app).get('/tickets').expect(401);
  });

  it('should return 200 "OK"', async () => {
    const res = await request(app)
      .get('/tickets')
      .set('x-auth-token', token)
      .expect(200);
  });

  // it('should return at least one required ticket property', async () => {
  //   const res = await request(app)
  //     .get('/tickets')
  //     .set('x-auth-token', token);
  //   // expect(res.body).toEqual(except.arrayContaining).toHaveProperty('title');
  //   expect(res.body).toEqual(
  //     expect.arrayContaining([
  //       expect.objectContaining({ title: 'title01' }),
  //     ])
  //   );
  // });

  it('should return true with at least one _id in the database', async () => {
    const res = await request(app)
      .get('/tickets')
      .set('x-auth-token', token);
    expect(res.body.some(({ _id }) => _id)).toBe(true);
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
