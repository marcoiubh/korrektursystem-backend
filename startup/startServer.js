const errorlog = require('debug')('error');
const infolog = require('debug')('info');

module.exports = (app) => {
  if (process.env.NODE_ENV !== 'test') {
    // choose port from environment variable or fixed
    const port = process.env.PORT || 4000;

    // start server
    app
      .listen(port, () => {
        infolog(`listening on port ${port}...`);
      })
      .on('error', (error) => {
        errorlog(`Server error: ${error.message}`);
      });
  }
};
