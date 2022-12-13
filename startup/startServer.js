module.exports = function (app) {
  const port = process.env.PORT || 4000;
  module.exports = app.listen(port, () => {
    console.log(`listening on port ${port}...`);
  });
};
