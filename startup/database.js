const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  const database = config.get("database");
  mongoose
    .connect(database)
    .then(() => console.log(`connected to ${database}`))
    .catch((error) => console.error(`connection to ${database} failed`, error));
};
