const config = require('config');

const checkPrivateKeys = () => {
  if (!process.env.kms_jwtPrivateKey) {
    throw new Error(
      'FATAL ERROR: no private key provided to decode token'
    );
  }
  if (!process.env.kms_emailPrivateKey) {
    throw new Error(
      'FATAL ERROR: no private key to access email server provided.'
    );
  }
  return true;
};

module.exports = checkPrivateKeys;
