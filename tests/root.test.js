const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const server = require('../startup/startServer');

describe('/', () => {
  it('should return "Yeiii!"', async () => {
    const res = await request(app).get('/').expect(200);
    expect(res.text).toEqual('"Yeiii!"');
  });
});

beforeAll(async () => {});

afterAll(async () => {
  mongoose.disconnect();
  server.close();
});
