const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('  m o n g o d');
});

const userSchema = mongoose.Schema({
  score: Number,
  name: String
});

const User = mongoose.model('User', userSchema);

let test = new User({score: 100, name: 'Aric'});