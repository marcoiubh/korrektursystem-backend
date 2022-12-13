const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');

router.get('/', (req, res) => {
  res.json('Yeiii!');
});

module.exports = router;
