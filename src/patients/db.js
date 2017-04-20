const connection = require('../db-connection.js'); // Get connection to MySQL

/**
* createPatient: create a patient
* args params: a JSON with {patientParams}
**/
const createPatient = (params, callback) => {
  // Create a patient
  let query = connection.query("INSERT INTO PATIENTS SET ?",
                                params, (err, response, fields) => {
                                  callback(err, response, fields);
                                });
  console.log('Ran query: ' + query.sql); // Log executed sql
}

/**
* getAllPatients: get a list of all patients
*
**/
const getAllPatients = (callback) => {
  let query = connection.query("SELECT * FROM PATIENTS",
                                (err, response, fields) => {
                                  callback(err, response, fields);
                                });
  console.log('Ran query: ' + query.sql); // Log executed sql
}

module.exports = {createPatient, getAllPatients};