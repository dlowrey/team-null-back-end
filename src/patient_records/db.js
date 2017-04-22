const connection = require('../db-connection.js'); // Get connection to MySQL


/**
* modifyRecord: update a patient record by appointment_id
* arg params: a JSONArray with [{updateParams}, {uid}]
**/
const modifyRecord = (params, callback) => {
  // Modify patient record
  let query = connection.query("UPDATE PATIENTRECORDS SET ? WHERE ?",
                                 params, (err, response, fields) => {
                                    callback(err, response, fields);
                                 });
  console.log('Ran query: ' + query.sql); // Log executed sql
}

/**
* getRecordById: retreieve a patient record by appointment_id
* arg params: a JSONobject with {appointment_id}
**/
const getRecordById = (params, callback) => {
  // get record by id
  let query = connection.query("SELECT * FROM PATIENTRECORDS WHERE ?",
                                params, (err, response, fields) => {
                                  callback(err, response[0], fields);
                                });
  console.log('Ran query: ' + query.sql);
}

module.exports = {modifyRecord, getRecordById};
