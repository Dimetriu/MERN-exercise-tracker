const router = require('express').Router();
const User = require('../models/user.model');

/* GET all users */
router.route('/').get((_, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json(`Error: ${err}`))
});

/* POST create new User */
router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json(`Error: ${err}`))
});

module.exports = router;