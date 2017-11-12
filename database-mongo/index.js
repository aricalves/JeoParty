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

module.exports.insertNewUser = function(name) {
  const user = new User({name: name, score: 0});
  return user.save();
}

// insertNewUser('aric')
//   .then(() => {console.log('new user added')})
//   .catch(err => console.log(err))

module.exports.updateUserScore = function(conditions, cb) {
  User.update({name: conditions.name}, {score: conditions.score + 100}, null, cb);
}

const getUsersInfo = function() {
  return User.find();
}

module.exports.getUser = function(name) {
  return getUsersInfo()
    .then(results => results.filter(user => user.name === name))
    .then(user => user)
    .catch(err => console.log('error', err))
}
