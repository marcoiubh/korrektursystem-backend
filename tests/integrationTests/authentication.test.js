const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index');
const server = require('../../startup/startServer');
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('/authentication', () => {
  it('should return 400 "Bad Request" without login credentials', async () => {
    const result = await request(app).post('/authentication');

    expect(result).to.have.status(400);
  });
  it('should return 400 "Bad Request" without valid email', async () => {
    const result = await request(app)
      .post('/authentication')
      .send({ email: 'wrong', password: 'correct' });

    expect(result).to.have.status(400);
  });
  it('should return 400 "Bad Request" without valid password', async () => {
    const result = await request(app)
      .post('/authentication')
      .send({ email: 'correct', password: 'wrong' });

    expect(result).to.have.status(400);
  });
  it('should return 200 "OK" with valid credentials', async () => {
    const result = await request(app)
      .post('/authentication')
      .send({ email: 'student_a@iubh.de', password: 'student_a' });
    expect(result).to.have.status(200);
  });
  it('should return a token starting with eyJh...', async () => {
    const result = await request(app)
      .post('/authentication')
      .send({ email: 'student_a@iubh.de', password: 'student_a' });

    expect(result.body).to.match(
      /^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9?/
    );
  });
});

before(async () => {});

after(async () => {
  // mongoose.disconnect();
  // server.close();
});
