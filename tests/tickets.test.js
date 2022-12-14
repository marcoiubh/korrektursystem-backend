const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const server = require('../startup/startServer');
const config = require('config');
const jwt = require('jsonwebtoken');
const expect = require('chai').expect;
let token = {};

describe('/tickets', () => {
  describe('GET', () => {
    it('should return 401 "Unauthorized" without passing a valid token', async () => {
      const res = await request(app)
        .get('/tickets')
        .then((res) => {
          expect(res).to.have.status(401);
        })
        .catch((err) => {
          throw err;
        });
    });

    it('should return 200 "OK" when authentification succeeds', async () => {
      const res = await request(app)
        .get('/tickets')
        .set('x-auth-token', token)
        .then((res) => {
          expect(res).to.have.status(200);
        })
        .catch((err) => {
          throw err;
        });
    });

    it('should return true with at least one _id in the database', async () => {
      const res = await request(app)
        .get('/tickets')
        .set('x-auth-token', token)
        .then((res) => {
          expect(res.body.some(({ _id }) => _id)).to.equal(true);
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  describe('POST', () => {
    it('should return 401 "Unauthorized" without passing a valid token', async () => {
      const res = await request(app)
        .post('/tickets')
        .then((res) => {
          expect(res).to.have.status(401);
        })
        .catch((err) => {
          throw err;
        });
    });

    it('should return 200 "OK" when authentification succeeds', async () => {
      const res = await request(app)
        .post('/tickets')
        .set('x-auth-token', token)
        .then((res) => {
          expect(res).to.have.status(200);
        })
        .catch((err) => {
          throw err;
        });
    });
    it('should return new object with an _id property', async () => {
      const res = await request(app)
        .post('/tickets')
        .set('x-auth-token', token)
        .then((res) => {
          expect(res.body).to.have.property('_id');
        })
        .catch((err) => {
          throw err;
        });
    });
    it('should return new object with the title "title01" when an object with that title has been saved', async () => {
      const res = await request(app)
        .post('/tickets')
        .set('x-auth-token', token)
        .send({ title: 'title01' })
        .then((res) => {
          expect(res.body).to.include({ title: 'title01' });
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  describe('PUT', () => {
    it('should return 401 "Unauthorized"  without passing a valid token', async () => {
      const res = await request(app)
        .put('/tickets/639863a90faa1b48a59a1a2d')
        .then((res) => {
          expect(res).to.have.status(401);
        })
        .catch((err) => {
          throw err;
        });
    });

    it('should return 200 "OK" when authentification succeeds', async () => {
      const res = await request(app)
        .put('/tickets/639863a90faa1b48a59a1a2d')
        .set('x-auth-token', token)
        .then((res) => {
          expect(res).to.have.status(200);
        })
        .catch((err) => {
          throw err;
        });
    });
    it('should update the objects status to "Closed"', async () => {
      const res = await request(app)
        .put('/tickets/639863a90faa1b48a59a1a2d')
        .set('x-auth-token', token)
        .send({ status: 'Closed' })
        .then((res) => {
          expect(res.body).include.keys('status');
        })
        .catch((err) => {
          throw err;
        });
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
