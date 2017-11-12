const express = require('express');
const bodyParser = require('body-parser');
const users = require('../database-mongo');

const app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/users', function (req, res) {
  users.getUser(req.query.name)
    .then(user => res.send(user))
    .catch(err => res.statusCode(404).send(['User not found', err]));
});

app.listen(3000, function() {
  console.log('3000ノ( ゜-゜ノ)');
});

