const connection = require('../db-connection.js'); // Get connection to MySQL

/**
* createApp: create an appointment
* args params: a JSON with {appointmentParams}
**/
const createApp = (params, callback) => {
  // Insert appointments
  let query = connection.query("INSERT INTO APPOINTMENTS SET ?",
                                params, (err, response, fields) => {
                                  callback(err, response, fields);
                                });
  console.log('Ran query: ' + query.sql); // Log executed sql
}

/**
* modifyApp: update an appointment by id
* arg params: a JSONArray with [{updateParams}, {uid}]
**/
const modifyApp = (params, callback) => {
  // Modify appointments
  let query = connection.query("UPDATE APPOINTMENTS SET ? WHERE ?",
                                 params, (err, response, fields) => {
                                    callback(err, response, fields);
                                 });
  console.log('Ran query: ' + query.sql); // Log executed sql
}

/**
* deleteApp: delete an appointment by id
* arg params: JSON with {id}
**/
const deleteApp = (params, callback) => {
  // Delete appointments
  let query = connection.query("DELETE FROM APPOINTMENTS WHERE ?",
                                params, (err, response, fields) => {
                                  callback(err, response, fields);
                                });
  console.log('Ran query: ' + query.sql); // Log executed sql
}

/**
* getUncompApps: get all uncompleted appointments for a month
* arg params: a JSONArray with [month, {completed}]
**/
const getUncompApps = (params, callback) => {
  // Get all incomplete appointments for month in params
  let query = connection.query("SELECT * FROM APPOINTMENTS WHERE " +
                                " MONTH(date_time) = ? AND ?",
                                params, (err, response, fields) => {
                                  callback(err, response, fields);
                                });
  console.log('Ran query: ' + query.sql); // Log executed sql
}

/**
* getAppsByPatient: get all appointments for a patinet (completed or uncomplete)
* arg params: a JSONArray with [{patient_id}]
**/
const getAppsByPatient = (params, callback) => {
  let query = connection.query("SELECT * FROM APPOINTMENTS WHERE ?",
                                params, (err, response, fields) => {
                                  callback(err, response, fields);
                                });
  console.log('Ran query: ' + query.sql); // Log executed sql
}

/**
* getUncompAppsByPatient: get all uncompleted appointments for a patient during
*                         a specified month (available in params).
* arg params: a JSONArray with [month, {patient_id}, {completed}]
**/
const getUncompAppsByPatient = (params, callback) => {
  let query = connection.query("SELECT * FROM APPOINTMENTS WHERE " +
                                " MONTH(date_time) = ? AND ? AND ?",
                                params, (err, response, fields) => {
                                  callback(err, response, fields);
                                });
  console.log('Ran query: ' + query.sql); // Log executed sql
}

/**
* getUncompAppsByDoctor: get all uncompleted appointments for a doctor during
*                         a specified month (available in params).
* arg params: a JSONArray with [month, {employee_id}, {completed}]
**/
const getUncompAppsByDoctor = (params, callback) => {
  let query = connection.query("SELECT * FROM APPOINTMENTS WHERE " +
                                " MONTH(date_time) = ? AND ? AND ?",
                                params, (err, response, fields) => {
                                  callback(err, response, fields);
                                });
  console.log('Ran query: ' + query.sql); // Log executed sql
}

// Export all functions so that manager.js can find/use them in functions.
module.exports = {createApp, modifyApp, deleteApp,
                  getUncompApps, getAppsByPatient, getUncompAppsByPatient,
                  getUncompAppsByDoctor}; // export all methods here
