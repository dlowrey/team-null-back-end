const db = require('../db-connection.js'); // Get connection to MySQL

/**
* getPaymentById: get invoice payment information by id
* arg params: a JSONObject with {id}
**/
const getPaymentById = (params, callback) => {
  db.executeSQL("SELECT * FROM payments WHERE ? AND ?;",
                params, (err, response, fields) => {
                        callback(err, response[0], fields);
                });
}

/**
* getCopayByApp: get copay payment information by appointment_id
* arg params: a JSONArray with [{appointment_id}, {type}]
**/
const getCopayByApp = (params, callback) => {
  db.executeSQL("SELECT * FROM payments WHERE ? and ?",
                params, (err, response, fields) => {
                        callback(err, response[0], fields);
                });
}

/**
* modifyCopay: update a payment by id
* arg params: a JSONArray with [{updateParams}, {appointment_id}, {type},
*                                {appointment_id}, {type}]
**/
const modifyCopay = (params, callback) => {
  // Modify payment
  db.executeSQL("UPDATE payments SET ? WHERE ? AND ?;" +
                "SELECT * FROM payments WHERE ? AND ?;",
                params, (err,response,fields) => {
                        callback(err, response[1], fields);
                });
}

/**
* modifyInvoice: update a payment by appointment_id
* arg params: a JSONArray with [{updateParams}, {appointment_id}, {type},
                                {appointment_id}, {type}]
**/
const modifyPaymentById = (params, callback) => {
  // Modify payment
  db.executeSQL("UPDATE payments SET ? WHERE ?;" +
                "SELECT * FROM payments WHERE ?;",
                params, (err,response,fields) => {
                         callback(err, response[1], fields);
                });
}

const sendReceipt = (params, callback) => {
  db.executeSQL("SELECT CONCAT(p.first_name,' ', p.last_name) as name, " +
                "pa.amount, pa.date_paid, p.email " +
                "FROM appointments as a INNER JOIN patients as p " +
                "ON a.patient_id = p.id INNER JOIN payments as pa " +
                "ON pa.appointment_id = a.id WHERE ? AND ?", params,
                (err, response, fields) => {
                  callback(response[0]);
                });
}

// Export all functions so that router.js can find/use them in endpoints.
module.exports = {getPaymentById, getCopayByApp, modifyCopay,
                  modifyPaymentById, sendReceipt};
