const db = require('../db-connection.js'); // Get connection to MySQL

/**
* createApp: create an appointment
* args params: a JSON with {appointmentParams}
**/
const createApp = (params, callback) => {
  // Insert appointments
  const sql = 'INSERT INTO appointments SET ?';
  db.executeSQL(sql, params, callback);
};

/**
* modifyApp: update an appointment by id
* arg params: a JSONArray with [{updateParams}, {uid}]
**/
const modifyApp = (params, callback) => {
  // Modify appointments
  const sql = 'UPDATE appointments SET ? WHERE ?';
  db.executeSQL(sql, params, callback);
};

/**
* deleteApp: delete an appointment by id
* arg params: JSONArray with [{id}, {appointment_id}]
* this function deletes the record in appointments and in patinetrecords
**/
const deleteApp = (params, callback) => {
  // Delete appointments
  const sql = 'DELETE FROM appointments WHERE ?';
  db.executeSQL(sql, params, callback);
};

/**
* getUncompApps: get all uncompleted appointments for a month
* arg params: a JSONArray with [month, {completed}]
**/
const getUncompApps = (params, callback) => {
  // Get all incomplete appointments for month in params
  const sql = 'SELECT * FROM appointments WHERE MONTH(date_time) = ? AND ?';
  db.executeSQL(sql, params, callback);
};

/**
* getAppsByPatient: get all appointments for a patient (completed or uncomplete)
* arg params: a JSONArray with [{patient_id}]
**/
const getAppsByPatient = (params, callback) => {
  // get all appointments for a patient
  const sql = 'SELECT * FROM appointments WHERE ?';
  db.executeSQL(sql, params, callback);
};

/**
* getUncompAppsByPatient: get all uncompleted appointments for a patient during
*                         a specified month (available in params).
* arg params: a JSONArray with [month, {patient_id}, {completed}]
**/
const getUncompAppsByPatient = (params, callback) => {
  // get uncompleted appointments for a patient
  const sql = 'SELECT * FROM appointments WHERE MONTH(date_time) = ? AND ? AND ?';
  db.executeSQL(sql, params, callback);
};

/**
* getUncompAppsByDoctor: get all uncompleted appointments for a doctor during
*                         a specified month (available in params).
* arg params: a JSONArray with [month, {employee_id}, {completed}]
**/
const getUncompAppsByDoctor = (params, callback) => {
  // get uncompleted appointmets for a doctor
  const sql = 'SELECT * FROM appointments WHERE MONTH(date_time) = ? AND ? AND ?';
  db.executeSQL(sql, params, callback);
};

const sendInvoice = (params, callback) => {
  const sql = 'SELECT pa.amount, pa.id, p.email FROM appointments as a ' +
    'INNER JOIN patients as p ON a.patient_id = p.id ' +
    'INNER JOIN payments as pa ON pa.appointment_id = a.id WHERE type = 2 AND ?;';
  db.executeSQL(sql, params, callback);
};

// Export all functions so that manager.js can find/use them in functions.
module.exports = {
  createApp,
  modifyApp,
  deleteApp,
  getUncompApps,
  getAppsByPatient,
  getUncompAppsByPatient,
  getUncompAppsByDoctor,
  sendInvoice,
}; // export all methods here
