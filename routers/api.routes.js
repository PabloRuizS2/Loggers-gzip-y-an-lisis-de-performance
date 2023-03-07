const express = require('express');
const numberGenerator = require('../utils/numberGenerator.js');
const { fork } = require('child_process');
const logger = require('../middlewares/logger');

const router = express.Router();

router.get('/random', (req, res) => {
  logger.info('[get] => /api/random');
  const { qty = 100000000 } = req.query;

  /* const calc = fork('./utils/numberGenerator.js'); */
  /* calc.send(qty); */
  /* calc.on('message', (result) => { */
  /*   res.json(result); */
  /* }); */

  const createRandomNumbers = require('../utils/numberGenerator');
  const result = createRandomNumbers(qty);
  res.json(result);
});

module.exports = router;
