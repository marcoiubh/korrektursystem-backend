const config = require('config');
const checkPrivateKeys = () => {
  if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: JWT private key not defined');
    process.exit(1);
  }
  if (!config.get('emailPrivateKey')) {
    console.error(
      'FATAL ERROR: email server private key not defined'
    );
    process.exit(1);
  }
};

module.exports = checkPrivateKeys;
