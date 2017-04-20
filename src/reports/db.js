const connection = require('../db-connection.js'); // Get connection to MySQL


/**
* getAllDailyReports: get all daily reports
* arg params: a JSONObject with {type}
**/
const getAllDailyReports = (params, callback) => {
  let query = connection.query("SELECT * FROM REPORTS WHERE ?",
                                params, (err, response, fields) => {
                                  callback(err, response, fields);
                                });
  console.log('Ran query: ' + query.sql); // Log executed sql
}

/**
* getAllMonthlyReports: get all monthly reports
* arg params: a JSONObject with {type}
**/
const getAllMonthlyReports = (params, callback) => {
  let query = connection.query("SELECT * FROM REPORTS WHERE ?",
                                params, (err, response, fields) => {
                                  callback(err, response, fields);
                                });
  console.log('Ran query: ' + query.sql); // Log executed sql
}



module.exports = {getAllDailyReports, getAllMonthlyReports};
