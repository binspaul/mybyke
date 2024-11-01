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

const hubsSchema = new mongoose.Schema({
  name: String,
  location: String,
  capacity: Number,
  available: Number,
});


const Hub = mongoose.model('hubs', hubsSchema);

/* GET hubs listing. */
router.get('/', async function(req, res, next) {
  console.log('Hubs list');
  
  try {
    const hubs = await Hub.find();

    res.json(hubs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET hub details. */
router.get('/details', async function(req, res, next) {
  console.log('Hub details');

  console.log(req.query);

  try {
    const hubs = await Hub.findOne({_id: req.query.id});
    
    res.json(hubs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* POST hub details. */
router.post('/', async function(req, res, next) {
  console.log('Add hub: ', req.body);
   
  try {
    const newHub = await Hub.create({
      name: req.body.name,
      location: req.body.location,
      capacity: req.body.capacity,
      available: req.body.available
    });
    
    res.json(newHub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* PATCH hub details. */
router.patch('/', async function(req, res, next) {
  res.send('Update hub');
});

/* DELETE hub details. */
router.delete('/', async function(req, res, next) {
  res.send('Delete hub');
});

module.exports = router;
