const express = require('express');
const authRoutes = require('./auth.routes');
const apiRoutes = require('./api.routes');
const auth = require('../middlewares/auth');
const args = require('../utils/minimist');
const os = require('os');
const clusterMode = require('../utils/clusterMode.js');
const compression = require('compression');
const logger = require('../middlewares/logger');

const router = express.Router();

// Routes
router.use('/auth', authRoutes);
router.use('/api', apiRoutes);
// router.use(pino);

router.get('/', async (req, res) => {
  logger.info('[GET] => /index');
  const user = req.user;
  if (user) {
    res.render('home.hbs', { username: user.email, args: args });
  } else {
    res.redirect('/login');
  }
});

router.get('/login', async (req, res) => {
  logger.info('[GET] => /login');
  res.sendFile('login.html', { root: 'public' });
});

router.get('/register', async (req, res) => {
  logger.info('[GET] => /register');
  res.sendFile('register.html', { root: 'public' });
});

router.get('/logout', async (req, res) => {
  logger.info('[GET] => /logout');
  try {
    await req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.clearCookie('my-session');
      } else {
        res.clearCookie('my-session');
        res.send('Hasta luego');
        // res.redirect('/login');
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/info', compression(), async (req, res) => {
  logger.info('[GET] => /info');
  let cpus = 1;
  clusterMode && (cpus = os.cpus().length);

  const info = {
    args: process.argv.slice(2).join(', '),
    platform: process.platform,
    version: process.version,
    rss: process.memoryUsage().rss,
    path: process.execPath,
    pid: process.pid,
    folder: process.cwd(),
    cpus: cpus,
  };

  // console.log(info);
  res.render('info.hbs', { info });
});

router.get('/signin-error', async (req, res) => {
  logger.info('[GET] => /signin-error');
  res.render('login-error.hbs', {});
});

router.get('/signup-error', async (req, res) => {
  logger.info('[GET] => /signup-error');
  res.render('register-error.hbs', {});
});

router.get('/*', async (req, res) => {
  logger.warn('[GET] => 404 not found');
  res.status(404).render('errors/not-found.hbs');
});

module.exports = router;
