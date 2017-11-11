const express = require('express');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const users = require('../database-mongo');

const app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/users', function (req, res) {

});


app.listen(3000, function() {
  console.log('3000ノ( ゜-゜ノ)');
});


