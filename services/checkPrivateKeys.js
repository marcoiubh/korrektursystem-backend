const errorlog = require('debug')('error');
const infolog = require('debug')('info');

const checkPrivateKeys = () => {
  infolog('Private keys checked.');
  try {
    // private key JSON web token
    if (!process.env.kms_jwtPrivateKey) {
      throw new Error(
        'FATAL ERROR: no private key provided to sign token.'
      );
    }

    // private key email server
    if (!process.env.kms_emailPrivateKey) {
      throw new Error(
        'FATAL ERROR: no private key provided to access email server.'
      );
    }
    return true;
  } catch (error) {
    errorlog(error.message);
  }
};

module.exports = checkPrivateKeys;
