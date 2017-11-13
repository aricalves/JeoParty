const express = require('express');
const bodyParser = require('body-parser');
const users = require('../database-mongo');

const app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/users', function (req, res){
  users.getUser(req.query.name)
    .then(user => res.send(user))
    .catch(err => res.statusCode(404).send(['User not found', err]));
});

app.get('/scores', function(req, res) {
  return users.populateScoreBoard()
    .then(topScores => res.send(topScores))
    .catch(err => res.send(err));
});

app.post('/scores/:name/:change', function(req, res) {
  users.updateUserScore(req.params.name, req.params.change);
  res.end();
});

app.post('/users/:name', function(req, res) {
  users.insertNewUser(req.params.name)
    .then(() => res.send(`${req.params.name} added`))
    .catch(err => res.send(err));
});

app.listen(3000, function() {
  console.log('3000ノ( ゜-゜ノ)');
});

