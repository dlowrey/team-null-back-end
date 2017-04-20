const db = require('./db.js');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); // To parse HTML post body
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
* createPatient: Creates a patient
*
**/
const createPatient = (req, callback) => {
  let body = req.body; // get post body
  let params = { // get parameters of patient to be created
    last_name          : body.last_name,
    first_name         : body.first_name,
    address            : body.address,
    phone_number       : body.phone_number,
    email              : body.email,
    ssn                : body.ssn,
    insurance_provider : body.insurance_provider
  };
  db.createPatient(params, (err, response, fields) => {
    if (err) throw err;
    callback(response); // send response info from query back
  });
}

/**
* getAllPatients: get all patients
*
**/
const getAllPatients = (req, callback) => {
  db.getAllPatients((err, response, fields) => {
    if (err) throw err;
    callback(response); // send response info from query back
  });
}



// Export all functions so that router.js can find/use them in endpoints.
module.exports = {createPatient, getAllPatients};