const router = require('express').Router();
const { Profile } = require('../../models');
const withAuth = require('../utils/auth');

router.get('/profile', withAuth, async (req, res) => {
  try {
    const profileData = await Profile.findAll({});
    const profilePost = profileData.map((profile) =>
      profile.get({ plain: true }),
    );
    return res.render('landing', { profilePost });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
