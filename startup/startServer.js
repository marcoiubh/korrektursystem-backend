const debug = require('debug')('http');

module.exports = function (app) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    debug(`listening on port ${port}...`);
  });
};
