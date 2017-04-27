const connection = require('../db-connection.js'); // Get connection to MySQL

/**
* getPaymentById: get copay payment information by id
* arg params: a JSONObject with {id}
**/
const getPaymentById = (params, callback) => {
  let query = connection.query("SELECT * FROM payments WHERE ?;",
                                params, (err, response, fields) => {
                                  callback(err, response[0], fields);
                                });
  console.log('Ran query: ' + query.sql); // Log executed sql
}

/**
* getCopayByApp: get copay payment information by appointment_id
* arg params: a JSONArray with [{appointment_id}, {type}]
**/
const getCopayByApp = (params, callback) => {
  let query = connection.query("SELECT * FROM payments WHERE ? and ?",
                                params, (err, response, fields) => {
                                  callback(err, response[0], fields);
                                });
  console.log('Ran query: ' + query.sql); // Log executed sql
}

/**
* modifyCopay: update a payment by id
* arg params: a JSONArray with [{updateParams}, {appointment_id}, {type},
*                                {appointment_id}, {type}]
**/
const modifyCopay = (params, callback) => {
  // Modify payment
  let query = connection.query("UPDATE payments SET ? WHERE ? AND ?;" +
                               "SELECT * FROM payments WHERE ? AND ?;",
                                 params, (err,response,fields) => {
                                   callback(err, response[1], fields);
                                 });
  console.log('Ran query: ' + query.sql); // Log executed sql
}

/**
* modifyInvoice: update a payment by appointment_id
* arg params: a JSONArray with [{updateParams}, {appointment_id}, {type},
                                {appointment_id}, {type}]
**/
const modifyInvoice = (params, callback) => {
  // Modify payment
  let query = connection.query("UPDATE payments SET ? WHERE ? AND ?;" +
                               "SELECT * FROM payments WHERE ? AND ?;",
                                 params, (err,response,fields) => {
                                   callback(err, response[1], fields);
                                 });
  console.log('Ran query: ' + query.sql); // Log executed sql
}

// Export all functions so that router.js can find/use them in endpoints.
module.exports = {getPaymentById, getCopayByApp, modifyCopay, modifyInvoice};
