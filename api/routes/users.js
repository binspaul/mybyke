var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const MONGO_URI = `mongodb://localhost:27017/swiggy`;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  active: Boolean,
});

const User = mongoose.model('User', userSchema);

/* GET users listing. */
router.get('/', async function(req, res, next) {
  console.log('Users list');

  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET user details. */
router.get('/details', async function(req, res, next) {
 console.log('User details');

 console.log('Users list');

 try {
   const users = await User.find({ active: { $eq: true } });
   res.json(users);
 } catch (err) {
   res.status(500).json({ message: err.message });
 }
});

/* POST user details. */
router.post('/', async function(req, res, next) {
  console.log('Insert user details');
 
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    });
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
 });

module.exports = router;
