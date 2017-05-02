const db = require('../db-connection.js'); // Get connection to MySQL

/**
* getAllDailyReports: get all daily reports
* arg params: a JSONObject with {type}
**/
const getAllDailyReports = (params, callback) => {
  db.executeSQL("SELECT * FROM reports WHERE ?",
                                params, (err, response, fields) => {
                                  callback(err, response, fields);
                                });
}

/**
* getAllMonthlyReports: get all monthly reports
* arg params: a JSONObject with {type}
**/
const getAllMonthlyReports = (params, callback) => {
  db.executeSQL("SELECT * FROM reports WHERE ?",
                params, (err, response, fields) => {
                  callback(err, response, fields);
                });
}

module.exports = {getAllDailyReports, getAllMonthlyReports};
