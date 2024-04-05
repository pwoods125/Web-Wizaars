const router = require('express').Router();
const gameRoutes = require('./game-routes');
const userRoutes = require('./user-routes');
const profileRoutes = require('./profile-routes');

router.use('/games', gameRoutes);
router.use('/users', userRoutes);
router.use('/profiles', profileRoutes);

module.exports = router;
