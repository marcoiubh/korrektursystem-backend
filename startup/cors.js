const cors = require('cors');

module.exports = (app) => {
  app.use(
    cors({
      // declare origins allowed to get requests from
      origin: [
        'https://www.korrektursystem.live',
        'https://korrektursystem.live',
        'http://localhost:3000',
      ],
    })
  );
};
