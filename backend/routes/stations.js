const router = require('express').Router();
let Station = require('../models/station.model');

router.route('/').get((req, res) => {
  Station.find()
    .then(stations => res.json(stations))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const numberstation = Number(req.body.numberstation);

  const newStation = new Station({
    username,
    description,
    numberstation,
  });

  newStation.save()
  .then(() => res.json('Station added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Station.findById(req.params.id)
    .then(station => res.json(station))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Station.findByIdAndDelete(req.params.id)
    .then(() => res.json('Station deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Station.findById(req.params.id)
    .then(station => {
      station.username = req.body.username;
      station.description = req.body.description;
      station.numberstation = Number(req.body.numberstation);

      station.save()
        .then(() => res.json('Station updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;