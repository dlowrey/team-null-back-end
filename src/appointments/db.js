const db = require('../db-connection.js'); // Get connection to MySQL
const connection = db.connection;

/**
* createApp: create an appointment
* args params: a JSON with {appointmentParams}
**/
const createApp = (params, callback) => {
  // Insert appointments
  db.executeSQL("INSERT INTO appointments SET ?",
                params, (err, response, fields) => {
                        callback(err, response, fields);
                });
}

/**
* modifyApp: update an appointment by id
* arg params: a JSONArray with [{updateParams}, {uid}]
**/
const modifyApp = (params, callback) => {
  // Modify appointments
  db.executeSQL("UPDATE appointments SET ? WHERE ?",
                params, (err, response, fields) => {
                        callback(err, response, fields);
                });
}

/**
* deleteApp: delete an appointment by id
* arg params: JSONArray with [{id}, {appointment_id}]
* this function deletes the record in appointments and in patinetrecords
**/
const deleteApp = (params, callback) => {
  // Delete appointments
  db.executeSQL("DELETE FROM appointments WHERE ?;" ,
                params, (err, response, fields) => {
                        callback(err, response, fields);
                });
}

/**
* getUncompApps: get all uncompleted appointments for a month
* arg params: a JSONArray with [month, {completed}]
**/
const getUncompApps = (params, callback) => {
  // Get all incomplete appointments for month in params
  db.executeSQL("SELECT * FROM appointments WHERE " +
                " MONTH(date_time) = ? AND ?",
                params, (err, response, fields) => {
                        callback(err, response, fields);
                });
}

/**
* getAppsByPatient: get all appointments for a patient (completed or uncomplete)
* arg params: a JSONArray with [{patient_id}]
**/
const getAppsByPatient = (params, callback) => {
  db.executeSQL("SELECT * FROM appointments WHERE ?",
                params, (err, response, fields) => {
                        callback(err, response, fields);
                });
}

/**
* getUncompAppsByPatient: get all uncompleted appointments for a patient during
*                         a specified month (available in params).
* arg params: a JSONArray with [month, {patient_id}, {completed}]
**/
const getUncompAppsByPatient = (params, callback) => {
  db.executeSQL("SELECT * FROM appointments WHERE " +
                " MONTH(date_time) = ? AND ? AND ?",
                params, (err, response, fields) => {
                        callback(err, response, fields);
                });
}

/**
* getUncompAppsByDoctor: get all uncompleted appointments for a doctor during
*                         a specified month (available in params).
* arg params: a JSONArray with [month, {employee_id}, {completed}]
**/
const getUncompAppsByDoctor = (params, callback) => {
  db.executeSQL("SELECT * FROM appointments WHERE " +
                " MONTH(date_time) = ? AND ? AND ?",
                params, (err, response, fields) => {
                        callback(err, response, fields);
                });
}

// Export all functions so that manager.js can find/use them in functions.
module.exports = {createApp, modifyApp, deleteApp,
                  getUncompApps, getAppsByPatient, getUncompAppsByPatient,
                  getUncompAppsByDoctor}; // export all methods here
