const db = require('../db-connection.js'); // Get connection to MySQL

/**
* getAllDoctors: get a list of all doctors
* arg params: a JSONArray with [{type}]
**/
const getAllDoctors = (params, callback) => {
  // Gets a list of all doctors
  db.executeSQL("SELECT * FROM employees WHERE ?",
                params, (err, response, fields) => {
                        callback(err, response, fields);
                });
}

module.exports = {getAllDoctors};
