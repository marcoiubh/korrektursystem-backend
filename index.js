const express = require('express');
const checkPrivateKeys = require('./services/checkPrivateKeys');
const app = express();

// make sure environment variable is set or quit
checkPrivateKeys();

require('./startup/cors')(app);
require('./startup/database')();
require('./startup/routes')(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
