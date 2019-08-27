const router = require('express').Router();
const Exercise = require('../models/exercise.model');

/* GET all exercises */
router.route('/').get((_, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json(`Error: ${err}`))
});

/* POST create an Exercise */
router.route('/add').post((req, res) => {
  const { username, description } = req.body;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

/* GET the Exercise */
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

/* DELETE the Exercise */
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

/* PUT update the Exercise */
router.route('/update/:id').put((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = req.body.duration;
      exercise.date = req.body.date;

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;