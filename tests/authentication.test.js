const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const server = require('../startup/startServer');

describe('/authentication', () => {
  it('should return 400 "Bad Request" without login credentials', async () => {
    const res = await request(app)
      .post('/authentication')
      .expect(400);
  });
  it('should return 400 "Bad Request" without valid email', async () => {
    const res = await request(app)
      .post('/authentication')
      .send({ email: 'wrong', password: 'correct' })
      .expect(400);
  });
  it('should return 400 "Bad Request" without valid password', async () => {
    const res = await request(app)
      .post('/authentication')
      .send({ email: 'correct', password: 'wrong' })
      .expect(400);
  });
  it('should return 200 "OK" with valid credentials', async () => {
    const res = await request(app)
      .post('/authentication')
      .send({ email: 'correct', password: 'correct' })
      .expect(200);
  });
  it('should return a token starting with eyJh...', async () => {
    const res = await request(app)
      .post('/authentication')
      .send({ email: 'correct', password: 'correct' });
    expect(res.body).toMatch(
      new RegExp(`^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9?`)
    );
  });
});

beforeAll(async () => {});

afterAll(async () => {
  mongoose.disconnect();
  server.close();
});
