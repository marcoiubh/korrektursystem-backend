const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('yeiii!');
});

module.exports = router;
