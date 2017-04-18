const connection = require('../db-connection.js'); // Get connection to MySQL

const createApp = (params, callBack) => {
  // Insert appointments
  let query = connection.query("INSERT INTO APPOINTMENTS SET ?",
                                params, (err, response, fields) => {
                                  callBack(err, response, fields);
                                });
  console.log('Ran query: ' + query.sql); // Log query that was run
}

const modifyApp = (uid, params, callBack) => {
  // Modify appointments
  let query = connection.query("UPDATE APPOINTMENTS SET ? WHERE ?",
                                 [params, uid],(err, response, fields) => {
                                    callback(err, response, fields);
                                 });
  console.log('Ran query: ' + query.sql); // Log query that was run
}

module.exports = {createApp}; // export all methods here
