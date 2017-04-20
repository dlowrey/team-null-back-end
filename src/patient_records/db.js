const connection = require('../db-connection.js'); // Get connection to MySQL


/**
* modifyRecord: update a patient record by appointment_id
* arg params: a JSONArray with [{updateParams}, {uid}]
**/
const modifyRecord = (params, callback) => {
  // Modify appointments
  let query = connection.query("UPDATE PATIENTRECORDS SET ? WHERE ?",
                                 params, (err, response, fields) => {
                                    callback(err, response, fields);
                                 });
  console.log('Ran query: ' + query.sql); // Log executed sql
}


module.exports = {modifyRecord};
