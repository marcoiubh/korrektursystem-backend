const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index');
const server = require('../../startup/startServer');
const config = require('config');
const jwt = require('jsonwebtoken');
const expect = require('chai').expect;
const { Ticket } = require('../../models/ticket');
let token = {};
const _ = require('lodash');

describe('/tickets', () => {
  describe('GET', () => {
    it('should return 401 "Unauthorized" without passing a valid token', async () => {
      const result = await request(app).get('/tickets');

      expect(result.status).to.be.equal(401);
    });

    it('should return 200 "OK" when authentification succeeds', async () => {
      const result = await request(app)
        .get('/tickets')
        .set('x-auth-token', token);

      expect(result.status).to.be.equal(200);
    });

    it('should return true with at least one _id in the database', async () => {
      const result = await request(app)
        .get('/tickets')
        .set('x-auth-token', token);

      expect(result.status).to.be.equal(200);
      expect(result.body[0]).to.have.property('title');
    });
  });

  describe('POST', () => {
    it('should return 401 "Unauthorized" without passing a valid token', async () => {
      const result = await request(app).post('/tickets');

      expect(result.status).to.be.equal(401);
    });

    it('should return 200 "OK" when authentification succeeds', async () => {
      const result = await request(app)
        .post('/tickets')
        .set('x-auth-token', token);

      expect(result.status).to.be.equal(200);
    });
    it('should return new object with an _id property', async () => {
      const result = await request(app)
        .post('/tickets')
        .set('x-auth-token', token);

      expect(result.body).to.have.property('_id');
    });
    it('should return new object with the title "title01" when an object with that title has been saved', async () => {
      const result = await request(app)
        .post('/tickets')
        .set('x-auth-token', token)
        .send({ title: 'title01' });

      expect(result.body).to.include({ title: 'title01' });
    });
  });

  describe('PUT', () => {
    it('should return 401 "Unauthorized"  without passing a valid token', async () => {
      const result = await request(app).put(
        '/tickets/aaaaaaaaaaaaaaaaaaaaaaaa'
      );

      expect(result.status).to.be.equal(401);
    });

    it('should return 200 "OK" when authentification succeeds', async () => {
      const result = await request(app)
        .put('/tickets/aaaaaaaaaaaaaaaaaaaaaaaa')
        .set('x-auth-token', token);

      expect(result.status).to.be.equal(200);
    });
    it('should update the objects status to "Closed"', async () => {
      const result = await request(app)
        .put('/tickets/aaaaaaaaaaaaaaaaaaaaaaaa')
        .set('x-auth-token', token)
        .send({ status: 'Closed' });

      expect(result.body).include.keys('status');
      expect(result.body.status).to.be.equal('Closed');
    });
  });

  beforeEach(async () => {
    await clearDatabase();
    await setDatabase();
  });
  afterEach(async () => {});

  before(async () => {
    createToken();
  });
  after(async () => {
    await mongoose.disconnect();
    // server.close();
  });
});
clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  const collection = collections['tickets'];

  await collection.deleteMany();
};

setDatabase = async () => {
  const testTicket = new Ticket({
    _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
    title: 'testTicket',
    student: 'student_a@iubh.de',
  });
  await testTicket.save();
};

createToken = () => {
  token = jwt.sign(
    { email: 'student_a@iubh.de', role: 'student' },
    config.get('jwtPrivateKey'),
    { expiresIn: '30m' }
  );
};
