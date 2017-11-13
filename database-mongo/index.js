const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Users', { useMongoClient: true });
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
  name: { type: String, unique: true }
});

const User = mongoose.model('User', userSchema);

const getUsersInfo = function() {
  return User.find();
}

module.exports.getUser = function(name) {
  return User.find({name: name})
    .then(res => res)
    .catch(err => console.log(err))
}

module.exports.insertNewUser = function(name) {
  const user = new User({name: name, score: 0});
  return user.save();
}

module.exports.updateUserScore = function(name, change) {
  User.find({name: name})
    .then((userInfo) => {
      let difference = Number(change) + userInfo[0].score;
      return User.update({name: name}, {score: difference})
    })
    .catch(err => console.log(err));
}

module.exports.populateScoreBoard = function() {
  return User.find()
    .sort('-score')
    .limit(5)
    .then(res => res)
    .catch(err => err)
}
