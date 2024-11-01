var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const MONGO_URI = `mongodb://localhost:27017/mybyke`;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

const bikesSchema = new mongoose.Schema({
  name: String,
  number: String,
  hubId: String
});

const Bike = mongoose.model('bikes', bikesSchema);

/* GET bikes listing. */
router.get('/', async function(req, res, next) {
  console.log('Bikes list');
  
  try {
    const bikes = await Bike.find();

    res.json(bikes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET bike details. */
router.get('/details', async function(req, res, next) {
  console.log('Bike details');

  console.log(req.query);

  try {
    const bike = await Bike.find({_id: req.query.id});
    
    res.json(bike);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* POST bike details. */
router.post('/', async function(req, res, next) {
  console.log('Add bike: ', req.body);
   
  try {
    const newBike = await Bike.create({
      name: req.body.name,
      number: req.body.number,
      hubId: req.body.hubId
    });
    
    res.json(newBike);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* PATCH bike details. */
router.patch('/', async function(req, res, next) {
  res.send('Update bike');
});

/* DELETE bike details. */
router.delete('/', async function(req, res, next) {
  res.send('Delete bike');
});

module.exports = router;
