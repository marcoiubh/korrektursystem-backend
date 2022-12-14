const express = require('express');
const checkPrivateKeys = require('./services/checkPrivateKeys');
const app = express();

// make sure environment variable is set or quit
try {
  checkPrivateKeys();
} catch (error) {
  console.log(error.message);
}

require('./startup/cors')(app);
require('./startup/database')();
require('./startup/routes')(app);
// require('./startup/startServer')(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

module.exports = app;
