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

/**
* modifyPayment: update a payment by id
* arg params: a JSONArray with [{updateParams}, {uid}]
**/
const modifyPayment = (params, uid, callback) => {
  // Modify payment
  let query = connection.query("UPDATE PAYMENT SET ? WHERE ?",   //Updates based on the request
                                 params);
  console.log('Ran query: ' + query.sql); // Log executed sql
  let query2 = connection.query("SELECT * FROM PAYMENT WHERE ?",   //Runs another query that returns
                                 uid, (err, response, fields) => { //what the API requested.
                                    callback(err, response, fields);
                                 });
  console.log('Ran query: ' + query2.sql); // Log executed sql
}

// Export all functions so that router.js can find/use them in endpoints.
module.exports = {getPaymentById, modifyPayment};