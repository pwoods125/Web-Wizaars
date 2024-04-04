const router = require('express').Router();
// Import the custom middleware
const withAuth = require('../utils/auth');

router.get('/games', withAuth, async (req, res) => {
  res.render('gamelibrary');
});

router.get('/addgame', withAuth, async (req, res) => {
  res.render('addgame');
});

router.get('/profile', withAuth, async (req, res) => {
  res.render('profile');
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/landing');
    return;
  }

  res.render('login');
});

module.exports = router;
