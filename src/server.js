var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var appointments = require('./appointments/router');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// router for appointments
app.use('/appointments', appointments);
