const db = require('./db.js');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); // To parse HTML post body
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


/**
* modifyRecord: Update a patient record by appointment id
*
**/
const modifyRecord = (req, callback) => {
  let body = req.body; // Get body of request
  let appointment_id = { appointment_id : req.params.uid }; // uid of appointment in URL
  let params = { // Get field values to update to
    weight          : body.weight,
    height          : body.height,
    blood_pressure  : body.blood_pressure,
    reason          : body.reason,
    treatment_content : body.treatment_content,
    prescription      : body.prescription
  };
  // Pass uid and params as a JSONArray (order matters)
  db.modifyRecord([params, appointment_id], (err, response, fields) => {
    if (err) console.log(err);
    params.appointment_id = req.params.uid; // add appointment_id to response
    callback(params); // send back the updated appointment fields
  });
}


/**
* getRecordById: get the record for a specific appointment id
*
**/
const getRecordById = (req, callback) => {
  let appointment_id = { appointment_id : req.params.uid };
  db.getRecordById(appointment_id, (err, response, fields) => {
    if (err) console.log(err);
    callback(response); // send back fields related to appointment_id
  });
}


module.exports = {modifyRecord, getRecordById};
