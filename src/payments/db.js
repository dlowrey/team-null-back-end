const connection = require('../db-connection.js'); // Get connection to MySQL

/**
* getPaymentById: get payment information by payment id
* arg params: a JSONArray with [{id}]
**/
const getPaymentById = (params, callback) => {
  let query = connection.query("SELECT * FROM PAYMENT WHERE ?",
                                params, (err, response, fields) => {
                                  callback(err, response, fields);
                                });
  console.log('Ran query: ' + query.sql); // Log executed sql
}

// Export all functions so that router.js can find/use them in endpoints.
module.exports = {getPaymentById};