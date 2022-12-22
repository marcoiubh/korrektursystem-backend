const httplog = require('debug')('http');

module.exports = (app) => {
  if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      httplog(`listening on port ${port}...`);
    });
  }
};
