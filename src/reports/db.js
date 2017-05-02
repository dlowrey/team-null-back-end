const db = require('../db-connection.js'); // Get connection to MySQL

/**
* getAllDailyReports: get all daily reports
* arg params: a JSONObject with {type}
**/
const getAllDailyReports = (params, callback) => {
  // let query = connection.query("SELECT * FROM reports WHERE ?",
  //                               params, (err, response, fields) => {
  //                                 callback(err, response, fields);
  //                               });
  // console.log('Ran query: ' + query.sql); // Log executed sql
  let sql = "SELECT * FROM reports WHERE ?";
  db.executeSQL(sql, params, callback);
}

/**
* getAllMonthlyReports: get all monthly reports
* arg params: a JSONObject with {type}
**/
const getAllMonthlyReports = (params, callback) => {
  let query = connection.query("SELECT * FROM reports WHERE ?",
                                params, (err, response, fields) => {
                                  callback(err, response, fields);
                                });
  console.log('Ran query: ' + query.sql); // Log executed sql
}



module.exports = {getAllDailyReports, getAllMonthlyReports};
