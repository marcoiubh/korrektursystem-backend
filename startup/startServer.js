const errorlog = require('debug')('error');
const infolog = require('debug')('info');

module.exports = (app) => {
  if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 4000;
    app
      .listen(port, () => {
        infolog(`listening on port ${port}...`);
      })
      .on('error', (error) => {
        errorlog(`Server error: ${error.message}`);
      });
  }
};
