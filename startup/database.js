const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
  // choosing database depends on the current environment
  let environment = process.env.NODE_ENV;
  if (typeof environment === 'undefined') environment = 'development';
  console.log(`environment: ${environment}`);

  const configuration = 'database.' + environment;
  const database = config.get(configuration);
  mongoose
    .connect(database)
    .then(() => console.log(`connected to ${database}`))
    .catch((error) =>
      console.error(`connection to ${database} failed`, error)
    );
};
