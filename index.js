const config = require('config');
const express = require('express');
const app = express();

// making sure the environment variable is set or quit
// export kms_jwtPrivateKey=1234
if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: JWT private key not defined');
  process.exit(1);
}
require('./startup/cors')(app);
require('./startup/database')();
require('./startup/routes')(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
