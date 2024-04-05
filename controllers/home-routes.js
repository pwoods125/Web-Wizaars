const router = require('express').Router();
const { Games } = require('../models');
const Profile = require('../models/Profile');
// Import the custom middleware
const withAuth = require('../utils/auth');

router.get('/games', async (req, res) => {
  try {
    const gameData = await Games.findAll({});

    const gamesLogged = gameData.map((game) => game.get({ plain: true }));
    console.log(gamesLogged);
    return res.render('gamelibrary', {
      gamesLogged,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/addgame', withAuth, async (req, res) => {
  res.render('addgame');
});

router.get('/profile', async (req, res) => {
  res.render('profile', {
    loggedIn: req.session.loggedIn,
  });
});

router.get('/profiles', withAuth, async (req, res) => {
  try {
    const profileData = await Profile.findAll({});
    const profilePost = profileData.values((profile) =>
      profile.get({ plain: true }),
    );
    console.log(profilePost);
    return res.render('landing', { profilePost });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/qrcode', async (req, res) => {
  res.render('qrcode', {
    loggedIn: req.session.loggedIn,
  });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/landing');
    return;
  }

  res.render('login');
});

module.exports = router;
