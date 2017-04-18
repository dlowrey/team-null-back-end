var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); // To parse HTML post body
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var connection = require('./db.js'); // MySQL connection


/**
* endpoint: xxxx/appointments/
* Creates an appointment from the Appointments table
**/
router.post('/', (req, res) => {
  var body = req.body; // get the POST body
  var params = {  // Create the SQL parameters
     employee_id  : body.employee_id,
     patient_id   : body.patient_id,
     date_time    : new Date(body.date_time),
     completed    : false
   };
   var query = connection.query("INSERT INTO APPOINTMENTS SET ?",
                                 params, (err, response, fields) => {
                                   if (err) throw err;
                                   res.status(201);
                                   res.location(response.insertId);
                                   res.send();
                                 });
});

/**
* endpoint: xxxx/appointments/[appointment UID]
* Updates a specified appointment from the Appointments table
**/
router.put('/:uid', (req, res) => {
    var body = req.body; // get the POST body
    var uid = { appointment_id : req.params.uid }; // Create SQL parameters
    var params = {
      employee_id : body.employee_id,
      patient_id  : body.patient_id,
      date_time   : new Date(body.date_time),
      completed   : body.completed
    };
    var query = connection.query("UPDATE APPOINTMENTS SET ? WHERE ?", [params, uid],
                                 (err, response, fields) => {
                                   if (err) throw err;
                                   res.status(200);
                                   res.send(params);
                                 });
});

/**
* endpoint: xxxx/appointments/[appointment UID]
* Deletes a specified appointment from the Appointments table
**/
router.delete('/:uid', (req, res) => {
    var uid = { appointment_id : req.params.uid }; // get the query string arg
    var query = connection.query("DELETE FROM APPOINTMENTS WHERE ?", uid,
                                 (err, response, fields) => {
                                   if (err) throw err;
                                   res.status(204);
                                   res.send();
                                 });
});

// export
module.exports = router
