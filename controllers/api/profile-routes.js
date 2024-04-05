const router = require('express').Router();
const Profile = require('../../models/Profile');

router.post('/', async (req, res) => {
  try {
    const profileData = await Profile.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      aboutme: req.body.aboutme,
      usernamepsn: req.body.usernamepsn,
      usernamexbox: req.body.usernamexbox,
      usernamesteam: req.body.usernamesteam,
      usernamenintendo: req.body.usernamenintendo,
    });
    res.status(200).json(profileData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
