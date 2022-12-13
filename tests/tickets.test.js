const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const config = require('config');
const jwt = require('jsonwebtoken');
let token = {};

describe('GET /tickets', () => {
  it('should return all tickets', async () => {
    const res = await request(app)
      .get('/tickets')
      .set('x-auth-token', token)
      .expect(200)
      .expect(function (res) {
        res.body.name = 'ticket01';
      });
    // .end(function (err, res) {
    //   if (err) throw err;
    // });
  });
});

beforeAll(async () => {
  token = jwt.sign(
    { email: 'student_a@iubh.de', role: 'student' },
    config.get('jwtPrivateKey'),
    { expiresIn: '30m' }
  );
});

afterAll(async () => {});
