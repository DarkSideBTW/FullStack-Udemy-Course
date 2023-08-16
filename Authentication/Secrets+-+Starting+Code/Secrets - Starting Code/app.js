//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

const app = express();
const port = 3000;

console.log(process.env.SECRET);

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/userDB');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.plugin(encrypt, { secret: process.env.SECRET , encryptedFields: ['password'] });

const User = new mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
  });

  const saveNewUser = await newUser.save();

  if (saveNewUser.email === req.body.username) {
    res.render('secrets');
  } else {
    console.log(saveNewUser);
  }
});

app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const foundUser = await User.findOne({ email: username });

  if (foundUser) {
    if (foundUser.password === password) {
      res.render('secrets');
    }
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
