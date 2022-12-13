const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const server = require('../startup/startServer');
const config = require('config');
const jwt = require('jsonwebtoken');
let token = {};

describe('/tickets', () => {
  describe('GET', () => {
    it('should return 401 "Unauthorized" without passing a valid token', async () => {
      const res = await request(app).get('/tickets').expect(401);
    });

    it('should return 200 "OK" when authentification succeeds', async () => {
      const res = await request(app)
        .get('/tickets')
        .set('x-auth-token', token)
        .expect(200);
    });

    it('should return true with at least one _id in the database', async () => {
      const res = await request(app)
        .get('/tickets')
        .set('x-auth-token', token);
      expect(res.body.some(({ _id }) => _id)).toBe(true);
    });
  });

  describe('POST', () => {
    it('should return 401 "Unauthorized" without passing a valid token', async () => {
      const res = await request(app).post('/tickets').expect(401);
    });

    it('should return 200 "OK" when authentification succeeds', async () => {
      const res = await request(app)
        .post('/tickets')
        .set('x-auth-token', token)
        .expect(200);
    });
    it('should return new object with an _id property', async () => {
      const res = await request(app)
        .post('/tickets')
        .set('x-auth-token', token);
      expect(res.body).toHaveProperty('_id');
    });
    it('should return new object with the title "title01" when an object with that title has been saved', async () => {
      const res = await request(app)
        .post('/tickets')
        .set('x-auth-token', token)
        .send({ title: 'title01' });
      expect(res.body).toEqual(
        expect.objectContaining({ title: 'title01' })
      );
    });
  });

  describe('PUT', () => {
    it('should return 401 "Unauthorized"  without passing a valid token', async () => {
      const res = await request(app)
        .put('/tickets/639863a90faa1b48a59a1a2d')
        .expect(401);
    });

    it('should return 200 "OK" when authentification succeeds', async () => {
      const res = await request(app)
        .put('/tickets/639863a90faa1b48a59a1a2d')
        .set('x-auth-token', token)
        .expect(200);
    });
    it('should update the objects status to "Closed"', async () => {
      const res = await request(app)
        .put('/tickets/639863a90faa1b48a59a1a2d')
        .set('x-auth-token', token)
        .send({ status: 'Closed' });

      expect(res.body).toEqual(
        expect.objectContaining({ status: 'Closed' })
      );
    });
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
