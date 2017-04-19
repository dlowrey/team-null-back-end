const connection = require('../db-connection.js'); // Get connection to MySQL

const createApp = (params, callback) => {
  // Insert appointments
  let query = connection.query("INSERT INTO APPOINTMENTS SET ?",
                                params, (err, response, fields) => {
                                  callback(err, response, fields);
                                });
  console.log('Ran query: ' + query.sql); // Log query that was run
}

const modifyApp = (params, callback) => {
  // Modify appointments
  let query = connection.query("UPDATE APPOINTMENTS SET ? WHERE ?",
                                 params, (err, response, fields) => {
                                    callback(err, response, fields);
                                 });
  console.log('Ran query: ' + query.sql); // Log query that was run
}

const deleteApp = (params, callback) => {
  // Delete appointments
  let query = connection.query("DELETE FROM APPOINTMENTS WHERE ?",
                                params, (err, response, fields) => {
                                  callback(err, response, fields);
                                });
  console.log('Ran query: ' + query.sql); // Log query that was run
}


const getUncompApps = (params, callback) => {
  // Get all incomplete appointments for month in params
  let query = connection.query("SELECT * FROM APPOINTMENTS WHERE " +
                                " MONTH(date_time) = ? AND ?",
                                params, (err, response, fields) => {
                                  callback(err, response, fields);
                                });
  console.log('Ran query: ' + query.sql); // Log query that was run
}


const getAppsByPatient = (params, callback) => {
  // Get all appointments by patient_id
  let query = connection.query("SELECT * FROM APPOINTMENTS WHERE ?",
                                params, (err, response, fields) => {
                                  callback(err, response, fields);
                                });
  console.log('Ran query: ' + query.sql); // Log query that was run
}

const getUncompAppsByPatient = (params, callback) => {
  // Get all incomplete appointments for a patient by month
  let query = connection.query("SELECT * FROM APPOINTMENTS WHERE " +
                                " MONTH(date_time) = ? AND ? AND ?",
                                params, (err, response, fields) => {
                                  callback(err, response, fields);
                                });
  console.log('Ran query: ' + query.sql); // Log query that was run
}

module.exports = {createApp, modifyApp, deleteApp,
                  getUncompApps, getAppsByPatient, getUncompAppsByPatient}; // export all methods here
