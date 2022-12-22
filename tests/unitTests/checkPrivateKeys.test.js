const config = require('config');
const proxyquire = require('proxyquire').noPreserveCache();
const expect = require('chai').expect;
const checkPrivateKeys = require('../../services/checkPrivateKeys');

describe('checkPrivateKeys', () => {
  it('should fail if environment variable for jwtPrivateKey is not set', () => {
    process.env.kms_jwtPrivateKey = '';
    process.env.kms_emailPrivateKey = 'test';
    const checkPrivateKeys = proxyquire(
      '../../services/checkPrivateKeys',
      {}
    );
    expect(checkPrivateKeys()).to.be.not.ok;
  });
  it('should fail if environment variable for emailPrivateKey is not set', () => {
    process.env.kms_jwtPrivateKey = 'test';
    process.env.kms_emailPrivateKey = '';
    const checkPrivateKeys = proxyquire(
      '../../services/checkPrivateKeys',
      {}
    );
    expect(checkPrivateKeys()).to.be.not.ok;
  });
  it('should pass if environment variables are both set', () => {
    process.env.kms_jwtPrivateKey = 'test';
    process.env.kms_emailPrivateKey = 'test';
    const checkPrivateKeys = proxyquire(
      '../../services/checkPrivateKeys',
      {}
    );
    expect(checkPrivateKeys()).to.be.true;
  });

  beforeEach(() => {
    intialJwt = process.env.kms_jwtPrivateKey;
    intialEmail = process.env.kms_emailPrivateKey;
  });
  afterEach(() => {
    process.env.kms_jwtPrivateKey = intialJwt;
    process.env.kms_emailPrivateKey = intialEmail;
  });
});
