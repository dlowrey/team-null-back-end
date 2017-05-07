const db = require('./db.js');
const express = require('express');
const bodyParser = require('body-parser'); // To parse HTML post body
const mailer = require('../mailer.js');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
* createApp: create an appointment
* create an appointment by passing the employee_id, patient_id, date_time for the appointment
**/
const createApp = (req, callback) => {
  const body = req.body; // HTTP POST body
  const params = { // Attributes of the appointment to create (preserve order)
    employee_id: body.employee_id,
    patient_id: body.patient_id,
    date_time: new Date(body.date_time),
    completed: false, // default non-completed appointment
  };
  db.createApp(params, (err, response, fields) => {
    if (err) console.log(err);
    callback(response); // send JSONArray
  });
};

/**
* modifyApp: Update an appointment with id = uid;
* modify an appointment by passing employee_id, patient_id, date_time, completed.
* if the modified appointment is marked completed = 1, send an invoice email
**/
const modifyApp = (req, callback) => {
  const body = req.body; // HTTP POST body
  const uid = { id: req.params.uid }; // ID of appointment
  const params = { // Attributes of appointment to modify (preserve order)
    employee_id: body.employee_id,
    patient_id: body.patient_id,
    date_time: new Date(body.date_time),
    completed: body.completed,
  };

  db.modifyApp([params, uid], (err, response, fields) => {
    if (err) console.log(err);
    params.id = req.params.uid; // Put ID in the response object
    callback(params); // send JSONObject
  });

  if (body.completed === 1) {
    const data = { appointment_id: req.params.uid }; // get email receipient & info
    db.sendInvoice(data, (err, response, fields) => {
      mailer.sendInvoice(response[0]); // send JSONObject
    });
  }
};

/**
* deleteApp: delete an appointment by id
*
**/
const deleteApp = (req, callback) => {
  const params = { id: req.params.uid }; // ID of appointment (preserve order)
  db.deleteApp(params, (err, response, fields) => {
    if (err) console.log(err);
    callback(response); // send JSONArray
  });
};

/**
* getUncompApps: get all uncompleted appointments by month
* get all uncompleted appointments for a certain month
**/
const getUncompApps = (req, callback) => {
  const month = parseInt(req.params.month, 10) + 1; // Front end passes 0 idx months
  const completed = { completed: 0 }; // specify uncompleted
  const params = [month, completed]; // Attributes of appointments to get (preserve order)
  db.getUncompApps(params, (err, response, fields) => {
    if (err) console.log(err);
    callback(response); // send JSONArray
  });
};

/**
* getAppsByPatient: get all appointments by patient
* get all appointments for a certain patiend ID
**/
const getAppsByPatient = (req, callback) => {
  const params = { patient_id: req.params.uid }; // ID of patient (preserve order)
  db.getAppsByPatient(params, (err, response, fields) => {
    if (err) console.log(err);
    callback(response); // send JSONArray
  });
};

/**
* getUncompAppsByPatient: get uncompleted appointments by patient and month
* get uncompleted appointments for a certain patient ID in a certain month
**/
const getUncompAppsByPatient = (req, callback) => {
  const month = parseInt(req.params.month, 10) + 1; // Front end passes 0 idx months
  const patientId = { patient_id: req.params.uid };
  const completed = { completed: 0 }; // specify uncompleted
  const params = [month, patientId, completed]; // Attributes of appointments to get (preserve order)
  db.getUncompAppsByPatient(params, (err, response, fields) => {
    if (err) console.log(err);
    callback(response); // send JSONArray
  });
};

/**
* getUncompAppsByDoctor: get uncompleted appointments by doctor and month
* get uncompleted appointments for a certain employee_id and month
**/
const getUncompAppsByDoctor = (req, callback) => {
  const month = parseInt(req.params.month, 10) + 1; // Front end passes 0 idx months
  const employeeId = { employee_id: req.params.uid };
  const completed = { completed: 0 }; // specify uncompleted
  const params = [month, employeeId, completed]; // Attributes of appointments to get (preserve order)
  db.getUncompAppsByDoctor(params, (err, response, fields) => {
    if (err) console.log(err);
    callback(response); // send JSONArray
  });
};

// Export all functions so that router.js can find/use them in endpoints.
module.exports = {
  createApp,
  modifyApp,
  deleteApp,
  getUncompApps,
  getAppsByPatient,
  getUncompAppsByPatient,
  getUncompAppsByDoctor,
};
