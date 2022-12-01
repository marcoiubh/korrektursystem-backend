const cors = require('cors');
module.exports = function (app) {
  app.use(
    cors({
      origin: [
        'https://www.korrektursystem.live',
        'http://localhost:3000',
      ],
    })
  );
};
