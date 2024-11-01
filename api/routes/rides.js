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

const ridesSchema = new mongoose.Schema({
  userId: String,
  bikeId: String,
  startingHubId: String,
  startDateTime: String,
  endingHubId: String,
  endDateTime: String ,
  status: String,
  duration: Number,
  cost: Number
});

const Ride = mongoose.model('rides', ridesSchema);

/* GET rides listing. */
router.get('/', async function(req, res, next) {
  console.log('Rides list');
  
  try {
    const rides = await Ride.find();

    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET ride details. */
router.get('/details', async function(req, res, next) {
  console.log('Ride details');

  console.log(req.query);

  try {
    const ride = await Ride.find({_id: req.query.id});
    
    res.json(ride);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* POST ride details. */
router.post('/', async function(req, res, next) {
  console.log('Add ride: ', req.body);
   
  try {
    const newRide = await Ride.create({
      userId: req.body.userId,
      bikeId: req.body.bikeId,
      startingHubId: req.body.startingHubId,
      startDateTime: req.body.startDateTime,
      endingHubId: req.body.endingHubId,
      endDateTime: req.body.endDateTime,
      status: req.body.status,
      duration: req.body.duration,
      cost: req.body.cost
    });
    
    res.json(newRide);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* PATCH ride details. */
router.patch('/', async function(req, res, next) {
  res.send('Update ride');
});

/* DELETE ride details. */
router.delete('/', async function(req, res, next) {
  res.send('Delete ride');
});

module.exports = router;
