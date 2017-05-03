const db = require('../db-connection.js'); // Get connection to MySQL


/**
* modifyRecord: update a patient record by appointment_id
* arg params: a JSONArray with [{updateParams}, {uid}]
**/
const modifyRecord = (params, callback) => {
  // Modify patient record
  db.executeSQL("UPDATE patientrecords SET ? WHERE ?",
                params, (err, response, fields) => {
                        callback(err, response, fields);
                });
}

/**
* getRecordById: retreieve a patient record by appointment_id
* arg params: a JSONobject with {appointment_id}
**/
const getRecordById = (params, callback) => {
  // get record by id
  db.executeSQL("SELECT * FROM patientrecords WHERE ?",
                params, (err, response, fields) => {
                        callback(err, response[0], fields);
                });
}

module.exports = {modifyRecord, getRecordById};
