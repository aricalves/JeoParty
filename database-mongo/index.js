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
  return getUsersInfo()
    .then(results => results.filter(user => user.name === name))
    .then(user => user)
    .catch(err => console.log('error', err))
}
module.exports.insertNewUser = function(name) {
  const user = new User({name: name, score: 0});
  return user.save();
}

module.exports.updateUserScore = function(name, change) {
  User.find({name: name})
    .then((userInfo) => {
      change = change += userInfo[0].score
      console.log(change)
      // return User.update({name: name}, {score: change})
    })
    .then(() => console.log(`${name}'s score updated`))
    .catch(err => console.log(err));
}

module.exports.populateScoreBoard = function() {
  return User.find()
    .sort('-score')
    .limit(5)
    .then(res => res)
    .catch(err => err)
}
