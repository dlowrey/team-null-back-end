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
                                 params,(err, response, fields) => {
                                    callback(err, response, fields);
                                 });
  console.log('Ran query: ' + query.sql); // Log query that was run
}

module.exports = {createApp, modifyApp}; // export all methods here
