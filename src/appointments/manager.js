const db = require('./db.js');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); // To parse HTML post body
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


const createApp = (req, callback) => {
  let body = req.body;
  let params = { // get parameters for the query
    employee_id  : body.employee_id,
    patient_id   : body.patient_id,
    date_time    : new Date(body.date_time),
    completed    : false
  };
  db.createApp(params, (err, response, fields) => {
    if (err) throw err;
    callback(response); // send db response back to router
  });
}

/**
* modifyApp: Update an appointment with id = uid;
*
**/
const modifyApp = (req, callback) => {
  let body = req.body; // Get body of request
  let uid = { id : req.params.uid }; // uid of appointment in URL
  let params = { // Get field values to update to
    employee_id  : body.employee_id,
    patient_id   : body.patient_id,
    date_time    : new Date(body.date_time),
    completed    : body.completed
  };
  // Pass uid and params as a JSONArray (order matters)
  db.modifyApp([params, uid], (err, response, fields) => {
    if (err) throw err;
    callback(params); // send back the updated appointment fields
  });
}

/**
* deleteAPp: delete an appointment by id
*
**/
const deleteApp = (req, callback) => {
  let uid = { id : req.params.uid }; // uid of appointment in URL
  db.deleteApp(uid, (err, response, fields) => {
    if (err) throw err;
    callback(response); // send response back, response is unused for delete
  });
}

/**
* getUncompApps: get all uncompleted appointments by month
*
**/
const getUncompApps = (req, callback) => {
  let month = parseInt(req.params.month) + 1; // Front end passes 0 idx months
  let completed = {completed : 0 }; // specify completed = 0 for uncompleted
  // pass month and completed as JSONArray (order matters)
  db.getUncompApps([month, completed], (err, response, fields) => {
    if (err) throw err;
    callback(response); // send JSONArray of all uncompleted apps for [month]
  });
}

/**
* getAppsByPatient: get all appointments by patient
*
**/
const getAppsByPatient = (req, callback) => {
  let patient_id = { patient_id : req.params.uid }; // patient_id
  db.getAppsByPatient(patient_id, (err, response, fields) => {
    if (err) throw err;
    callback(response); // send JSONArray of all appointments for [patient_id]
  });
}

/**
* getUncompAppsByPatient: get uncompleted appointments by patient and month
*
**/
const getUncompAppsByPatient = (req, callback) => {
  let month = parseInt(req.params.month) + 1; // Front end passes 0 idx months
  let patient_id = { patient_id : req.params.uid }; // patient_id
  let completed = { completed : 0 }; // specify completed = 0 for uncompleted
  // pass month, patient_id, and completed as JSONArray (order matters)
  db.getUncompAppsByPatient([month, patient_id, completed],
     (err, response, fields) => {
    if (err) throw err;
    callback(response); // send JSONArray of all uncompleted appointments for
                        // [patient_id] and [month]
  });
}


// Export all functions so that router.js can find/use them in endpoints.
module.exports = {createApp, modifyApp, deleteApp,
                  getUncompApps, getAppsByPatient, getUncompAppsByPatient};
