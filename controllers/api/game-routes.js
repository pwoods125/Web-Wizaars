const router = require('express').Router();
const { Games } = require('../../models');

// router.get('/', async (req, res) => {
//   try {
//     const gameData = await Games.findAll(req.body);
//     return res.status(200).json(gameData);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

router.get('/:id', async (req, res) => {
  try {
    const gameData = await Games.findByPk(req.params.id);

    if (!gameData) {
      return res.status(404).json({ message: 'No games found with that id!' });
    }

    return res.status(200).json(gameData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const gameData = await Games.create({
      game_name: req.body.game_name,
      console: req.body.console,
      genre: req.body.genre,
      game_comments: req.body.game_comments,
      completed: req.body.completed,
      favorite: req.body.favorite,
    });
    res.status(200).json(gameData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/games/:id', async (req, res) => {
  try {
    const gameData = await Games.update(
      {
        game_name: req.body.game_name,
        console: req.body.console,
        genre: req.body.genre,
        game_comments: req.body.game_comments,
        completed: req.body.completed,
        favorite: req.body.favorite,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    res.status(200).json(gameData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
