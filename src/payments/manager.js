const db = require('./db.js');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); // To parse HTML post body
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
* getPaymentById: get payment information by payment ID
*
**/
const getPaymentById = (req, callback) => {
  let id = { id : req.params.uid }; // id in the Payment table
  db.getPaymentById(id, (err, response, fields) => {
    if (err) console.log(err);
    callback(response); // send payment information
  });
}

/**
* modifyPayment: Update a payment with id = uid
*
**/
const modifyPayment = (req, callback) => {
  let body = req.body; // Get body of request
  let uid = { id : req.params.uid }; // uid of payment in URL
  let params = { // Get field values to update to
    amount           : body.amount,
    method           : body.method,
    type             : body.type,
    date_paid        : new Date(body.date_paid),
    reference_number : body.reference_number
  };
  // Pass uid and params as a JSONArray (order matters)
  db.modifyPayment([params, uid, uid], (err, response, fields) => { //Sent uid again as another parameter
    if (err) console.log(err);                                             //for the second query
    callback(response); // send back the updated payment fields
  });
}

// Export all functions so that router.js can find/use them in endpoints.
module.exports = {getPaymentById, modifyPayment};