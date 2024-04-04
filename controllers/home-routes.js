const router = require('express').Router();
const { Games } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

router.get('/games', withAuth, async (req, res) => {
  try {
    const gameData = await Games.findAll({});

    const gamesLogged = gameData.map((game) => game.get({ plain: true }));
    console.log(gamesLogged);
    return res.render('gamelibrary', { gamesLogged });
  } catch (err) {
    return res.status(500).json(err);
  }
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
