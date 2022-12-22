const cors = require('cors');
module.exports = (app) => {
  app.use(
    cors({
      origin: [
        'https://www.korrektursystem.live',
        'https://korrektursystem.live',
        'http://localhost:3000',
      ],
    })
  );
};
