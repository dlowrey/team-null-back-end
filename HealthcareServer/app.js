var express = require('express');
var app = express();
var mysql = require('mysql');

// body-parser is required to use req.body;
// use 'npm install --save body-parser' to install
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpasswordhere',
  database: 'healthcaredb'
});
connection.connect();

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

app.post('/createAppointment', function(req, res) {
  var body = req.body;
  var params = {
    employee_id : body.employee_id,
    patient_id  : body.patient_id,
    date_time : new Date(body.date_time),
    completed : 0
  };

  var sql = "INSERT INTO APPOINTMENTS SET ?;"
  var query = connection.query(sql, params, function(err, result, fields) {
    if (err) throw err;
    console.log('1 Row Affected: ' + query.sql);
  });
  res.send('Completed');

});
