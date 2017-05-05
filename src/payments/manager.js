const db = require('./db.js'); // to connect to MySQL
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); // To parse HTML post body
const mailer = require('../mailer.js'); // to send emails
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
* getPaymentById: get  payment information by appointment_id
*
**/
const getPaymentById = (req, callback) => {
  let id = { id : req.params.uid };
  let type = { type : 2 };
  db.getPaymentById([id, type], (err, response, fields) => {
    if (err) console.log(err);
    callback(response); // send payment information
  });
}

/**
* getCopayByApp: get copay payment information by appointment_id
*
**/
const getCopayByApp = (req, callback) => {
  let appointment_id = { appointment_id : req.params.appointment_id };
  let type = { type : 1 };
  db.getCopayByApp([appointment_id, type], (err, response, fields) => {
    if (err) console.log(err);
    callback(response); // send payment information
  });
}

/**
* modifyCopay: Update a copayment by appointment_id
*
**/
const modifyCopay = (req, callback) => {
  let body = req.body; // Get body of request
  let appointment_id = { appointment_id : req.params.appointment_id };
  let type = { type : 1 }; // type of payment (1 = copay)
  let fields = { // Get values to update to
    method           : body.method,
    date_paid        : new Date(),
  };
  // params for two queries in db.js
  let params = [fields, appointment_id, type, appointment_id, type];
  // Pass uid and params as a JSONArray (order matters)
  db.modifyCopay(params, (err, response, fields) => {
    if (err) console.log(err);
    callback(response); // send back the updated payment object
  });
}

/**
* modifyInvoice: Update a payment by id
*
**/
const modifyPaymentById = (req, callback) => {
  let body = req.body; // Get body of request
  let id = { id : req.params.uid };
  let fields = { // Get values to update to
    method           : body.method,
    date_paid        : new Date(),
  };
  let params = [fields, id, id];
  // Pass uid and params as a JSONArray (order matters)
  db.modifyPaymentById(params, (err, response, fields) => {
    if (err) console.log(err);
    callback(response); // send back the updated payment object
  });

  db.sendReceipt([appointment_id, type],(response) => {
      mailer.sendReceipt(response); // send the fields to the mailer
    });

}
// Export all functions so that router.js can find/use them in endpoints.
module.exports = {getPaymentById, getCopayByApp, modifyCopay, modifyPaymentById};
