const config = require('config');
const express = require('express');
const app = express();

// make sure environment variable is set or quit
// export kms_jwtPrivateKey='#'
// export kms_emailPrivateKey='#'
if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: JWT private key not defined');
  process.exit(1);
}
if (!config.get('emailPrivateKey')) {
  console.error('FATAL ERROR: email server private key not defined');
  process.exit(1);
}
require('./startup/cors')(app);
require('./startup/database')();
require('./startup/routes')(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
