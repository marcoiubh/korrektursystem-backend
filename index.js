const express = require('express');
const config = require('config');
const app = express();

// making sure the environment variable is set or quit
// if (!config.get("jwtPrivateKey")) {
//   console.error("FATAL ERROR: JWT private key not defined");
//   process.exit(1);
// }
require('./startup/cors')(app);
require('./startup/routes')(app);
// require('./startup/database')();

const port = 4000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
