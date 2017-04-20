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
    if (err) throw err;
    callback(response); // send payment information
  });
}

// Export all functions so that router.js can find/use them in endpoints.
module.exports = {getPaymentById};