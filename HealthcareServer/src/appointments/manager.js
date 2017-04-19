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



const modifyApp = (req, callback) => {
  let body = req.body;
  let uid = { id : req.params.uid };
  let params = {
    employee_id  : body.employee_id,
    patient_id   : body.patient_id,
    date_time    : new Date(body.date_time),
    completed    : body.completed
  };
  db.modifyApp([params, uid], (err, response, fields) => {
    if (err) throw err;
    callback(params);
  });
}

const deleteApp = (req, callback) => {
  let appointment_id = { id : req.params.uid };
  db.deleteApp(appointment_id, (err, response, fields) => {
    if (err) throw err;
    callback(response);
  });
}

const getUncompApps = (req, callback) => {
  let month = parseInt(req.params.month) + 1; // Front end passes 0 idx months
  let completed = {completed : 0 };
  db.getUncompApps([month, completed], (err, response, fields) => {
    if (err) throw err;
    callback(response);
  });
}

const getAppsByPatient = (req, callback) => {
  let patient_id = { patient_id : req.params.uid };
  db.getAppsByPatient(patient_id, (err, response, fields) => {
    if (err) throw err;
    callback(response);
  });
}

const getUncompAppsByPatient = (req, callback) => {
  let month = parseInt(req.params.month) + 1; // Front end passes 0 idx months
  let patient_id = { patient_id : req.params.uid };
  let completed = { completed : 0 };
  db.getUncompAppsByPatient([month, patient_id, completed],
     (err, response, fields) => {
    if (err) throw err;
    callback(response);
  });
}
module.exports = {createApp, modifyApp, deleteApp,
                  getUncompApps, getAppsByPatient, getUncompAppsByPatient};
