var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); // To parse HTML post body
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var connection = require('./database.js'); // MySQL connection

// .../appointments GET
router.get('/', (req, res) => {
  var query = connection.query("SELECT * FROM APPOINTMENTS",
                                (err, response, fields) => {
                                  if (err) throw err;
                                  res.send(response);
                                });
});

// .../appointments POST
router.post('/', (req, res) => {
  var body = req.body;
  var params = {
     employee_id  : body.employee_id,
     patient_id   : body.patient_id,
     date_time    : new Date(body.date_time),
     completed    : false
   };
   console.log(params);
   var query = connection.query("INSERT INTO APPOINTMENTS SET ?",
                                 params, (err, response, fields) => {
                                   if (err) throw err;
                                   res.send('Appointement added!');
                                 });
});


router.put('/:uid', (req, res) => {
    var body = req.body;
    var uid = { appointment_id : req.params.uid };
    var params = {
      employee_id : body.employee_id,
      patient_id  : body.patient_id,
      date_time   : new Date(body.date_time),
      completed   : body.completed
    };
    var query = connection.query("UPDATE APPOINTMENTS SET ? WHERE ?", [params, uid],
                                 (err, response, fields) => {
                                   if (err) throw err;
                                   res.send('Appointment updated');
                                 });
    console.log(query.sql);
});


router.delete('/:uid', (req, res) => {
    var uid = { appointment_id : req.params.uid };
    var query = connection.query("DELETE FROM APPOINTMENTS WHERE ?", uid,
                                 (err, response, fields) => {
                                   if (err) throw err;
                                   res.send('Appointment deleted');
                                 });
});

module.exports = router
