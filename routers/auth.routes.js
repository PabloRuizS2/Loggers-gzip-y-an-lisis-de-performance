const express = require('express');
const passport = require('../middlewares/passport');
const logger = require('../middlewares/logger');

const router = express.Router();

router.post(
  '/register',
  passport.authenticate('signup', {
    failureRedirect: '/signup-error',
    successRedirect: '/',
  })
);

router.post(
  '/login',
  passport.authenticate('signin', {
    failureRedirect: '/signin-error',
    successRedirect: '/',
  })
);

module.exports = router;
