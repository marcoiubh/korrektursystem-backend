const debug = require('debug')('http');

module.exports = function (app) {
  if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      debug(`listening on port ${port}...`);
    });
  }
};
