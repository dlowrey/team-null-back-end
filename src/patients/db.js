const db = require('../db-connection.js'); // Get connection to MySQL

/**
* createPatient: create a patient
* args params: a JSON with {patientParams}
**/
const createPatient = (params, callback) => {
  // Create a patient
  db.executeSQL("INSERT INTO patients SET ?",
                params, (err, response, fields) => {
                        callback(err, response, fields);
                });
}

/**
* getAllPatients: get a list of all patients
*
**/
const getAllPatients = (callback) => {
  db.executeSQL("SELECT * FROM patients",
                (err, response, fields) => {
                      callback(err, response, fields);
                });
}

/**
* getPatientById: get patient information by id
* arg params: a JSONArray with [{id}]
**/
const getPatientById = (params, callback) => {
  db.executeSQL("SELECT * FROM patients WHERE ?",
                params, (err, response, fields) => {
                        callback(err, response[0], fields);
                });
}

// Export all functions so that manager.js can find/use them in functions.
module.exports = {createPatient, getAllPatients, getPatientById};
